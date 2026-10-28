import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { LivePreview } from "./LivePreview";
import { PREVIEW_CHANNEL, previewOverrides } from "@/lib/cms-preview";
import type { Session } from "@supabase/supabase-js";
import { cmsSupabase as supabase } from "@/lib/cms-client";
import type { Json } from "@/integrations/supabase/types";
import {
  SECTIONS,
  getDefault,
  resolved,
  type Brand,
  type Overrides,
  type SectionKey,
} from "@/content/cms";
import { BrandEditor } from "./BrandEditor";
import { EditorCtx, MediaPickerHost, RecordEditor, ValueEditor, inputCls } from "./fields";
import { deleteUpload, listUploads, uploadImage, type MediaItem } from "./media";

type View = SectionKey | "media";
type Row = { data: unknown; updated_at: string };

const btn =
  "inline-flex h-9 items-center justify-center rounded-lg px-3.5 text-[13px] font-semibold disabled:opacity-40";
const btnDark = `${btn} bg-zinc-900 text-white hover:bg-zinc-700`;
const btnLight = `${btn} border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50`;

function errMsg(e: unknown) {
  if (e && typeof e === "object" && "message" in e)
    return String((e as { message: unknown }).message);
  return "Something went wrong";
}

export function AdminApp({ previewOnly = false }: { previewOnly?: boolean }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => setSession(null));
    // If the sign-in check stalls, show the sign-in form rather than a blank page.
    const t = setTimeout(() => setSession((s) => (s === undefined ? null : s)), 5000);
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => {
      clearTimeout(t);
      data.subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="min-h-screen bg-zinc-100 font-[Inter,system-ui,sans-serif] text-zinc-900">
      {session === undefined ? (
        <Centered>Loading…</Centered>
      ) : session ? (
        <AdminGate session={session} previewOnly={previewOnly} />
      ) : (
        <Login />
      )}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-[14px] text-zinc-500">
      {children}
    </div>
  );
}

/* ───────── Login ───────── */

function Login() {
  const [mode, setMode] = useState<"in" | "reset">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin`,
        });
        if (error) throw error;
        setMsg({ ok: true, text: "If that email has an account, a reset link is on its way." });
      }
    } catch (err) {
      setMsg({ ok: false, text: errMsg(err) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200"
      >
        <img src="/img/logos/bl_logo.png" alt="Build Learning" className="h-7 w-auto self-start" />
        <h1 className="m-0 text-xl font-bold">
          {mode === "in"
            ? "Sign in to edit the site"
            : "Reset your password"}
        </h1>
        <label className="flex flex-col gap-1.5 text-[13px] font-medium text-zinc-600">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </label>
        {mode !== "reset" && (
          <label className="flex flex-col gap-1.5 text-[13px] font-medium text-zinc-600">
            Password
            <input
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </label>
        )}
        {msg && (
          <p className={`m-0 text-[13px] ${msg.ok ? "text-emerald-700" : "text-red-600"}`}>
            {msg.text}
          </p>
        )}
        <button type="submit" disabled={busy} className={`${btnDark} h-10`}>
          {busy
            ? "Please wait…"
            : mode === "in"
              ? "Sign in"
              : "Send reset link"}
        </button>
        <div className="flex justify-between text-[13px]">
          {mode === "in" && (
            <button
              type="button"
              className="text-zinc-600 underline-offset-2 hover:underline"
              onClick={() => setMode("reset")}
            >
              Forgot password?
            </button>
          )}
          {mode === "reset" && (
            <button
              type="button"
              className="text-zinc-600 underline-offset-2 hover:underline"
              onClick={() => setMode("in")}
            >
              Back to sign in
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ───────── Admin check ───────── */

function AdminGate({ session, previewOnly }: { session: Session; previewOnly: boolean }) {
  const [state, setState] = useState<"checking" | "admin" | "no" | "setup">("checking");
  const [err, setErr] = useState("");
  const [recovery, setRecovery] = useState(false);

  const check = useCallback(async () => {
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: session.user.id,
      _role: "admin",
    });
    if (error) {
      setState("setup");
      setErr(error.message);
      return;
    }
    setState(data ? "admin" : "no");
  }, [session.user.id]);

  useEffect(() => {
    check();
    const { data } = supabase.auth.onAuthStateChange(
      (e) => e === "PASSWORD_RECOVERY" && setRecovery(true),
    );
    return () => data.subscription.unsubscribe();
  }, [check]);

  if (recovery) return <NewPassword onDone={() => setRecovery(false)} />;
  if (state === "checking") return <Centered>Checking access…</Centered>;
  if (state === "admin") return previewOnly ? <LivePreview /> : <Editor session={session} />;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
        <h1 className="m-0 text-xl font-bold">
          {state === "setup"
            ? "The CMS database isn’t set up yet"
            : "You don’t have editing access yet"}
        </h1>
        {state === "setup" ? (
          <p className="m-0 text-[14px] leading-relaxed text-zinc-600">
            Ask Lovable to apply the migration in <code>supabase/migrations</code>, then reload this
            page.
            <br />
            <span className="text-[12px] text-zinc-400">{err}</span>
          </p>
        ) : (
          <>
            <p className="m-0 text-[14px] leading-relaxed text-zinc-600">
              Editing access is restricted to the site owner.
            </p>
            {err && <p className="m-0 text-[13px] text-red-600">{err}</p>}
          </>
        )}
        <button type="button" className={btnLight} onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>
    </div>
  );
}

function NewPassword({ onDone }: { onDone: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabase.auth.updateUser({ password: pw });
          if (error) setErr(error.message);
          else onDone();
        }}
      >
        <h1 className="m-0 text-xl font-bold">Choose a new password</h1>
        <input
          type="password"
          minLength={8}
          required
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={inputCls}
          autoComplete="new-password"
        />
        {err && <p className="m-0 text-[13px] text-red-600">{err}</p>}
        <button type="submit" className={btnDark}>
          Save password
        </button>
      </form>
    </div>
  );
}

/* ───────── Editor ───────── */

function Editor({ session }: { session: Session }) {
  const router = useRouter();
  const [saved, setSaved] = useState<Partial<Record<SectionKey, Row>>>({});
  const [drafts, setDrafts] = useState<Overrides>({});
  const [view, setView] = useState<View>("settings");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("site_content").select("key,data,updated_at");
    if (error) setToast({ ok: false, text: error.message });
    const m: Partial<Record<SectionKey, Row>> = {};
    for (const r of data ?? []) m[r.key as SectionKey] = { data: r.data, updated_at: r.updated_at };
    setSaved(m);
    setLoaded(true);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const current = useCallback(
    (k: SectionKey) => drafts[k] ?? resolved(k, saved[k]?.data),
    [drafts, saved],
  );
  const isDirty = useCallback(
    (k: SectionKey) =>
      drafts[k] !== undefined &&
      JSON.stringify(drafts[k]) !== JSON.stringify(resolved(k, saved[k]?.data)),
    [drafts, saved],
  );
  const anyDirty = SECTIONS.some((s) => isDirty(s.key));
  useEffect(() => {
    const channel = new BroadcastChannel(PREVIEW_CHANNEL);
    const send = () => channel.postMessage({ type: "snapshot", overrides: previewOverrides(saved, drafts), path: SECTIONS.find((s) => s.key === view)?.page ?? "/" });
    channel.onmessage = ({ data }) => { if (data?.type === "request") send(); };
    send();
    return () => channel.close();
  }, [saved, drafts, view]);

  useEffect(() => {
    if (!anyDirty) return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [anyDirty]);

  const peopleKeys = useMemo(
    () => Object.keys((current("people") as Record<string, unknown>) ?? {}).sort(),
    [current],
  );

  async function save(k: SectionKey) {
    setBusy(true);
    const data = current(k) as Json;
    const { error } = await supabase.from("site_content").upsert({ key: k, data });
    setBusy(false);
    if (error) return setToast({ ok: false, text: error.message });
    setDrafts(({ [k]: _d, ...rest }) => rest);
    await load();
    router.invalidate();
    setToast({ ok: true, text: "Saved — it’s live on the site." });
  }

  async function resetToOriginal(k: SectionKey) {
    if (
      !confirm(
        "Put this section back to the original built-in content? Your current version is kept in history, so you can undo this.",
      )
    )
      return;
    setBusy(true);
    const { error } = await supabase.from("site_content").delete().eq("key", k);
    setBusy(false);
    if (error) return setToast({ ok: false, text: error.message });
    setDrafts(({ [k]: _d, ...rest }) => rest);
    await load();
    router.invalidate();
    setToast({ ok: true, text: "Back to the original content." });
  }

  async function undoLastSave(k: SectionKey) {
    const { data, error } = await supabase
      .from("site_content_history")
      .select("data,saved_at")
      .eq("key", k)
      .order("saved_at", { ascending: false })
      .limit(1);
    if (error) return setToast({ ok: false, text: error.message });
    const prev = data?.[0];
    if (!prev) return setToast({ ok: false, text: "No earlier version saved yet." });
    if (!confirm(`Restore the version from ${new Date(prev.saved_at).toLocaleString()}?`)) return;
    setBusy(true);
    const res =
      prev.data === null
        ? await supabase.from("site_content").delete().eq("key", k)
        : await supabase.from("site_content").upsert({ key: k, data: prev.data });
    setBusy(false);
    if (res.error) return setToast({ ok: false, text: res.error.message });
    setDrafts(({ [k]: _d, ...rest }) => rest);
    await load();
    router.invalidate();
    setToast({ ok: true, text: "Previous version restored." });
  }

  const sec = SECTIONS.find((s) => s.key === view);
  const groups = ["Brand & site", "Shared", "Pages"] as const;

  return (
    <MediaPickerHost>
      <div className="flex h-screen overflow-hidden">
        <aside className="flex h-screen w-[168px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-zinc-200 bg-white p-3 xl:w-[208px]">
          <div className="flex items-center gap-2 px-2 pt-1">
            <img src="/img/logos/bl_logo.png" alt="" className="h-6 w-auto" />
            <span className="rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              CMS
            </span>
          </div>
          {groups.map((g) => (
            <nav key={g} className="flex flex-col gap-0.5" aria-label={g}>
              <span className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                {g}
              </span>
              {SECTIONS.filter((s) => s.group === g).map((s) => (
                <NavBtn
                  key={s.key}
                  active={view === s.key}
                  onClick={() => setView(s.key)}
                  dot={isDirty(s.key)}
                  edited={!!saved[s.key]}
                >
                  {s.label}
                </NavBtn>
              ))}
            </nav>
          ))}
          <nav className="flex flex-col gap-0.5" aria-label="Tools">
            <span className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              Tools
            </span>
            <NavBtn active={view === "media"} onClick={() => setView("media")}>
              Media library
            </NavBtn>

          </nav>
          <div className="mt-auto flex flex-col gap-2 border-t border-zinc-200 pt-4 text-[12px] text-zinc-500">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-800 hover:underline"
            >
              View site ↗
            </a>
            <span className="truncate">{session.user.email}</span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="self-start text-zinc-600 hover:underline"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto">
          {sec ? (
            <>
              <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-zinc-100/90 px-4 py-4 backdrop-blur">
                <div className="mr-auto flex min-w-0 flex-col">
                  <h1 className="m-0 text-[20px] font-bold">{sec.label}</h1>
                  <span className="text-[13px] text-zinc-500">
                    {sec.description}
                    {saved[sec.key]
                      ? ` · Last saved ${new Date(saved[sec.key]?.updated_at ?? "").toLocaleString()}`
                      : " · Using original content"}
                  </span>
                </div>
                {sec.page && (
                  <a href={sec.page} target="_blank" rel="noreferrer" className={btnLight}>
                    View page ↗
                  </a>
                )}
                <button
                  type="button"
                  className={btnLight}
                  disabled={busy}
                  onClick={() => undoLastSave(sec.key)}
                >
                  Undo last save
                </button>
                {saved[sec.key] && (
                  <button
                    type="button"
                    className={btnLight}
                    disabled={busy}
                    onClick={() => resetToOriginal(sec.key)}
                  >
                    Reset to original
                  </button>
                )}
                {isDirty(sec.key) && (
                  <button
                    type="button"
                    className={btnLight}
                    onClick={() => setDrafts(({ [sec.key]: _d, ...rest }) => rest)}
                  >
                    Discard changes
                  </button>
                )}
                <button
                  type="button"
                  className={btnDark}
                  disabled={busy || !isDirty(sec.key)}
                  onClick={() => save(sec.key)}
                >
                  {busy ? "Saving…" : isDirty(sec.key) ? "Save & publish" : "Saved"}
                </button>
              </header>
              <div className="mx-auto max-w-[1100px] px-4 py-6">
                {!loaded ? (
                  <p className="text-sm text-zinc-500">Loading…</p>
                ) : (
                  <EditorCtx.Provider
                    value={{
                      peopleKeys,
                      enums:
                        sec.key === "programs"
                          ? { type: ["Competitions", "Immersions", "Studio", "Schools"] }
                          : {},
                    }}
                  >
                    <SectionBody
                      k={sec.key}
                      value={current(sec.key)}
                      onChange={(v) => setDrafts((d) => ({ ...d, [sec.key]: v }))}
                    />
                  </EditorCtx.Provider>
                )}
              </div>
            </>
          ) : view === "media" ? (
            <MediaLibrary onToast={setToast} />
          ) : (
            null
          )}
        </main>
        <aside aria-label="Live website preview" className="h-screen w-[43%] min-w-[260px] shrink-0 border-l border-border">
          <LivePreview overrides={previewOverrides(saved, drafts)} page={sec?.page ?? "/"} />
        </aside>
      </div>
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-[14px] font-medium shadow-lg ${toast.ok ? "bg-zinc-900 text-white" : "bg-red-600 text-white"}`}
        >
          {toast.text}
        </div>
      )}
    </MediaPickerHost>
  );
}

function NavBtn({
  active,
  onClick,
  children,
  dot,
  edited,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: boolean;
  edited?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[14px] ${active ? "bg-zinc-900 font-semibold text-white" : "text-zinc-700 hover:bg-zinc-100"}`}
    >
      <span className="flex-1">{children}</span>
      {dot ? (
        <span className="h-2 w-2 rounded-full bg-orange-500" title="Unsaved changes" />
      ) : edited ? (
        <span className={`text-[10px] ${active ? "text-zinc-300" : "text-zinc-400"}`}>edited</span>
      ) : null}
    </button>
  );
}

/** Top-level fields of a section as separate cards so long pages stay manageable. */
function SectionBody({
  k,
  value,
  onChange,
}: {
  k: SectionKey;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const def = getDefault(k);
  if (k === "people")
    return <RecordEditor value={value as Record<string, unknown>} onChange={onChange} />;
  if (Array.isArray(value))
    return (
      <Card>
        <ValueEditor k={k} value={value} template={def} onChange={onChange} />
      </Card>
    );
  const obj = value as Record<string, unknown>;
  const d = def as Record<string, unknown>;
  return (
    <div className="flex flex-col gap-5">
      {k === "settings" && (
        <Card title="Brand" subtitle="Colours, fonts and sizes used everywhere on the site.">
          <BrandEditor
            value={obj["brand"] as Brand}
            onChange={(b) => onChange({ ...obj, brand: b })}
          />
        </Card>
      )}
      {Object.entries(obj)
        .filter(([ck]) => !(k === "settings" && ck === "brand"))
        .map(([ck, cv]) => (
          <Card key={ck} title={isObject(cv) ? labelOf(ck) : undefined}>
            {typeof cv === "object" && cv !== null && !Array.isArray(cv) ? (
              <ValueEditor
                k={ck}
                value={cv}
                template={d[ck]}
                onChange={(nv) => onChange({ ...obj, [ck]: nv })}
              />
            ) : (
              <ValueEditor
                k={ck}
                value={cv}
                template={d[ck]}
                onChange={(nv) => onChange({ ...obj, [ck]: nv })}
              />
            )}
          </Card>
        ))}
    </div>
  );
}

const SECTION_LABELS: Record<string, string> = {
  filmstrip: "Photo strips",
  pathways: "Pathways (stacking cards)",
  humanStack: "Human skills",
  upcoming: "Upcoming programs",
  build: "B.U.I.L.D method",
  pins: "Map pins",
  heroImages: "Hero photos",
  open: "Open competition",
  past: "Past competitions",
  also: "Also run",
  ideas: "Idea types",
  flow: "How it works",
  after: "After the finals",
  judges: "Judges & mentors",
  bento: "Photo grid",
  info: "Visits, bonding & stay",
  industryLogos: "Industry logos",
  schools: "School formats",
  pca: "PCA Seoul feature",
  orgs: "For organisations",
  steps: "How it works",
  cases: "Case studies",
  interests: "Enquiry form options",
  nextUp: "Next-up card",
  reel: "Play reel slides",
  team: "Team (people IDs)",
  rows: "Rows",
};
function labelOf(k: string) {
  if (SECTION_LABELS[k]) return SECTION_LABELS[k];
  const s = k.replace(/([a-z])([A-Z])/g, "$1 $2");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function isObject(v: unknown) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function Card({
  title,
  subtitle,
  children,
}: {
  title?: string | undefined;
  subtitle?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
      {title && (
        <div className="mb-4">
          <h2 className="m-0 text-[16px] font-bold">{title}</h2>
          {subtitle && <p className="m-0 mt-0.5 text-[13px] text-zinc-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

/* ───────── Media ───────── */

function MediaLibrary({ onToast }: { onToast: (t: { ok: boolean; text: string }) => void }) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [busy, setBusy] = useState(false);
  const refresh = useCallback(() => listUploads().then(setItems), []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-8 py-8">
      <div className="flex items-center gap-3">
        <div className="mr-auto">
          <h1 className="m-0 text-[20px] font-bold">Media library</h1>
          <p className="m-0 text-[13px] text-zinc-500">
            Photos you upload are resized for the web and stored in Lovable Cloud storage. Built-in
            images live with the site code.
          </p>
        </div>
        <label className={`${btnDark} cursor-pointer`}>
          {busy ? "Uploading…" : "Upload images"}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              if (!files.length) return;
              setBusy(true);
              try {
                for (const f of files) await uploadImage(f);
                onToast({
                  ok: true,
                  text: `Uploaded ${files.length} image${files.length > 1 ? "s" : ""}.`,
                });
              } catch (err) {
                onToast({ ok: false, text: errMsg(err) });
              }
              setBusy(false);
              refresh();
            }}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {items === null && <p className="text-sm text-zinc-500">Loading…</p>}
        {items?.length === 0 && (
          <p className="col-span-full text-sm text-zinc-500">No uploads yet.</p>
        )}
        {items?.map((it) => (
          <div
            key={it.path}
            className="flex flex-col gap-1.5 rounded-xl bg-white p-2 ring-1 ring-zinc-200"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-[repeating-conic-gradient(#d4d4d8_0_25%,#f4f4f5_0_50%)] bg-[length:16px_16px]">
              <img
                src={it.url}
                alt=""
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="truncate text-[11px] text-zinc-500" title={it.path}>
              {it.path.split("/").pop()}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                className="flex-1 rounded-md border border-zinc-300 py-1 text-[11px] hover:bg-zinc-50"
                onClick={() =>
                  navigator.clipboard
                    .writeText(it.url)
                    .then(() => onToast({ ok: true, text: "Link copied." }))
                }
              >
                Copy link
              </button>
              <button
                type="button"
                className="rounded-md border border-zinc-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50"
                onClick={async () => {
                  if (
                    !confirm("Delete this image? Any page still using it will show a broken image.")
                  )
                    return;
                  try {
                    await deleteUpload(it.path);
                    refresh();
                  } catch (err) {
                    onToast({ ok: false, text: errMsg(err) });
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

