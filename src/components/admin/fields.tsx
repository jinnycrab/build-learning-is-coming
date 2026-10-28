import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  IMAGE_KEYS,
  IMAGE_LIST_KEYS,
  listUploads,
  looksLikeImage,
  siteImages,
  uploadImage,
  type MediaItem,
} from "./media";

/* ───────── Shared bits ───────── */

export type Path = (string | number)[];

export const EditorCtx = createContext<{ peopleKeys: string[]; enums: Record<string, string[]> }>({
  peopleKeys: [],
  enums: {},
});

const LABELS: Record<string, string> = {
  img: "Image",
  imgs: "Images",
  src: "Image",
  href: "Link",
  cta: "Button text",
  q: "Question",
  a: "Answer",
  n: "Day",
  am: "Morning",
  pm: "Afternoon",
  alt: "Image description (for screen readers)",
  key: "Person",
  heroImage: "Hero image",
  heroImages: "Hero images",
  headerCta: "Header button",
  fontDisplay: "Heading font",
  fontBody: "Body font",
  textScale: "Body text size",
  headingScale: "Heading size",
  pastJudges: "Past judges (text)",
  partnersPage: "Schools & Partners",
  iso: "Date & time",
  deadline: "Deadline (ISO date-time, UTC)",
  upcoming: "Upcoming (unticked = past)",
  big: "Large tile",
  eyebrow: "Small label above the heading",
  text: "Text",
  primary: "Main button",
  secondary: "Second button",
};

export function labelFor(k: string | number) {
  if (typeof k === "number") return `#${k + 1}`;
  if (LABELS[k]) return LABELS[k];
  const s = k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const inputCls =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-[14px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10";
const smallBtn =
  "inline-flex h-8 items-center gap-1 rounded-md border border-zinc-300 bg-white px-2.5 text-[12px] font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
          {label}
        </span>
      )}
      {children}
      {hint && <span className="text-[12px] text-zinc-500">{hint}</span>}
    </label>
  );
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** An empty item with the same shape as an existing one. */
export function blankLike(v: unknown): unknown {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v))
    return v.length && v.every((x) => typeof x === "string") && v.length <= 3
      ? v.map(() => "")
      : [];
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  return "";
}

function summary(v: unknown, i: number): { title: string; thumb?: string | undefined } {
  if (Array.isArray(v))
    return { title: v.filter((x) => typeof x === "string").join(" · ") || `Item ${i + 1}` };
  if (!isObj(v)) return { title: String(v ?? "") || `Item ${i + 1}` };
  const t = ["title", "name", "label", "q", "key", "word", "city", "body", "quote", "when"]
    .map((k) => v[k])
    .find((x) => typeof x === "string" && x);
  const thumb = ["img", "src", "photo", "logo", "cover", "flag"]
    .map((k) => v[k])
    .find(looksLikeImage) as string | undefined;
  return { title: (t as string) || `Item ${i + 1}`, thumb };
}

/* ───────── Image field ───────── */

const PickerCtx = createContext<(onPick: (url: string) => void) => void>(() => {});

export function MediaPickerHost({ children }: { children: ReactNode }) {
  const [cb, setCb] = useState<((url: string) => void) | null>(null);
  return (
    <PickerCtx.Provider value={(fn) => setCb(() => fn)}>
      {children}
      {cb && (
        <MediaPicker
          onClose={() => setCb(null)}
          onPick={(u) => {
            cb(u);
            setCb(null);
          }}
        />
      )}
    </PickerCtx.Provider>
  );
}

function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState<"uploads" | "site">("uploads");
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [q, setQ] = useState("");
  const site = useMemo(siteImages, []);
  useEffect(() => {
    listUploads().then(setItems);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const list = (tab === "uploads" ? (items ?? []).map((i) => i.url) : site).filter((u) =>
    u.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose an image"
        className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 p-4">
          <div className="flex rounded-lg bg-zinc-100 p-1 text-[13px]">
            {(["uploads", "site"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1.5 font-medium ${tab === t ? "bg-white shadow-sm" : "text-zinc-500"}`}
              >
                {t === "uploads" ? "Your uploads" : "Images already on the site"}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search file names"
            className={`${inputCls} max-w-[240px]`}
          />
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-sm text-zinc-500 hover:text-zinc-900"
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 overflow-y-auto p-4 sm:grid-cols-5">
          {tab === "uploads" && items === null && (
            <p className="col-span-full text-sm text-zinc-500">Loading…</p>
          )}
          {list.length === 0 && items !== null && (
            <p className="col-span-full text-sm text-zinc-500">
              Nothing here yet. Use “Upload” on any image field.
            </p>
          )}
          {list.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => onPick(u)}
              className="group flex flex-col gap-1 text-left"
            >
              <span className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-[repeating-conic-gradient(#d4d4d8_0_25%,#f4f4f5_0_50%)] bg-[length:16px_16px] group-hover:ring-2 group-hover:ring-orange-500">
                <img
                  src={u}
                  alt=""
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <span className="truncate text-[11px] text-zinc-500">{u.split("/").pop()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const pick = useContext(PickerCtx);
  const file = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function upload(f: File) {
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(f));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Field label={label}>
      <div
        className="flex items-start gap-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files[0];
          if (f) upload(f);
        }}
      >
        <div className="flex h-[84px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-[repeating-conic-gradient(#d4d4d8_0_25%,#f4f4f5_0_50%)] bg-[length:16px_16px]">
          {value ? (
            <img src={value} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-[11px] text-zinc-400">No image</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={smallBtn}
              disabled={busy}
              onClick={() => file.current?.click()}
            >
              {busy ? "Uploading…" : "Upload"}
            </button>
            <button type="button" className={smallBtn} onClick={() => pick(onChange)}>
              Choose existing
            </button>
          </div>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} text-[12px]`}
            placeholder="…or paste an image link"
          />
          {err && <span className="text-[12px] text-red-600">{err}</span>}
          <input
            ref={file}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </Field>
  );
}

/* ───────── Generic editor ───────── */

type Props = {
  k: string | number;
  value: unknown;
  onChange: (v: unknown) => void;
  template?: unknown;
  parentKey?: string;
};

export function ValueEditor({ k, value, onChange, template, parentKey }: Props) {
  const { peopleKeys, enums } = useContext(EditorCtx);
  const key = typeof k === "string" ? k : (parentKey ?? "");
  // Items in a simple list don't need their own "#1, #2" labels.
  const label = typeof k === "string" ? labelFor(k) : "";

  if (typeof value === "boolean")
    return (
      <label className="flex items-center gap-2.5 text-[14px] text-zinc-800">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-zinc-900"
        />
        {label}
      </label>
    );

  if (typeof value === "number")
    return (
      <Field label={label}>
        <input
          type="number"
          value={value}
          step="any"
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`${inputCls} max-w-[160px]`}
        />
      </Field>
    );

  if (typeof value === "string" || value === null || value === undefined) {
    const v = value ?? "";
    const inList = typeof k === "number";
    if (IMAGE_KEYS.has(key) || (inList && IMAGE_LIST_KEYS.has(key)) || looksLikeImage(v))
      return <ImageField label={label} value={v} onChange={onChange} />;
    if ((key === "key" || (inList && (key === "team" || key === "mentors"))) && peopleKeys.length)
      return (
        <Field label={typeof k === "number" ? label : "Person"}>
          <select value={v} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            {!peopleKeys.includes(v) && <option value={v}>{v || "— choose —"}</option>}
            {peopleKeys.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      );
    if (enums[key])
      return (
        <Field label={label}>
          <select value={v} onChange={(e) => onChange(e.target.value)} className={inputCls}>
            {enums[key]!.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      );
    if (/^#[0-9a-f]{6}$/i.test(v))
      return (
        <Field label={label}>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={v}
              onChange={(e) => onChange(e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-zinc-300"
            />
            <input
              value={v}
              onChange={(e) => onChange(e.target.value)}
              className={`${inputCls} max-w-[140px] font-mono`}
            />
          </div>
        </Field>
      );
    const long =
      v.length > 70 ||
      v.includes("\n") ||
      ["body", "intro", "bio", "quote", "a", "note", "pastJudges"].includes(key);
    return (
      <Field label={label}>
        {long ? (
          <textarea
            value={v}
            rows={Math.min(8, Math.max(3, Math.ceil(v.length / 90)))}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputCls} resize-y leading-relaxed`}
          />
        ) : (
          <input value={v} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        )}
      </Field>
    );
  }

  if (Array.isArray(value))
    return (
      <ListEditor
        label={label}
        listKey={key}
        value={value}
        onChange={onChange}
        template={template}
      />
    );

  if (isObj(value)) {
    const tpl = isObj(template) ? template : undefined;
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(value).map(([ck, cv]) => {
          const wide =
            Array.isArray(cv) ||
            isObj(cv) ||
            (typeof cv === "string" && (cv.length > 40 || IMAGE_KEYS.has(ck))) ||
            ["body", "intro", "bio", "quote", "a"].includes(ck);
          const nested = Array.isArray(cv) || isObj(cv);
          return (
            <div key={ck} className={wide ? "sm:col-span-2" : ""}>
              {nested && !Array.isArray(cv) ? (
                <fieldset className="rounded-xl border border-zinc-200 p-4">
                  <legend className="px-1 text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
                    {labelFor(ck)}
                  </legend>
                  <ValueEditor
                    k={ck}
                    value={cv}
                    template={tpl?.[ck]}
                    onChange={(nv) => onChange({ ...value, [ck]: nv })}
                  />
                </fieldset>
              ) : (
                <ValueEditor
                  k={ck}
                  value={cv}
                  template={tpl?.[ck]}
                  parentKey={key}
                  onChange={(nv) => onChange({ ...value, [ck]: nv })}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

function move<T>(arr: T[], i: number, j: number) {
  const a = arr.slice();
  const [x] = a.splice(i, 1);
  a.splice(j, 0, x as T);
  return a;
}

export function ListEditor({
  label,
  listKey,
  value,
  onChange,
  template,
}: {
  label: string;
  listKey: string;
  value: unknown[];
  onChange: (v: unknown) => void;
  template?: unknown;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const simple =
    value.every((x) => typeof x !== "object" || x === null) &&
    (value.length > 0 || (Array.isArray(template) && template.every((x) => typeof x !== "object")));
  const tpl = value[0] ?? (Array.isArray(template) ? template[0] : undefined);
  const add = () => {
    onChange([...value, tpl === undefined ? "" : blankLike(tpl)]);
    setOpen(value.length);
  };
  const tools = (i: number) => (
    <div className="flex shrink-0 gap-1">
      <button
        type="button"
        className={smallBtn}
        disabled={i === 0}
        onClick={() => onChange(move(value, i, i - 1))}
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className={smallBtn}
        disabled={i === value.length - 1}
        onClick={() => onChange(move(value, i, i + 1))}
        aria-label="Move down"
      >
        ↓
      </button>
      <button
        type="button"
        className={smallBtn}
        onClick={() =>
          onChange([
            ...value.slice(0, i + 1),
            JSON.parse(JSON.stringify(value[i])),
            ...value.slice(i + 1),
          ])
        }
        aria-label="Duplicate"
      >
        ⧉
      </button>
      <button
        type="button"
        className={`${smallBtn} text-red-600`}
        onClick={() => {
          if (confirm("Remove this item?")) onChange(value.filter((_, j) => j !== i));
        }}
        aria-label="Remove"
      >
        ✕
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
          {label} <span className="font-normal normal-case text-zinc-400">({value.length})</span>
        </span>
        <button type="button" className={smallBtn} onClick={add}>
          + Add
        </button>
      </div>
      {simple ? (
        <div className="flex flex-col gap-2">
          {value.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <ValueEditor
                  k={i}
                  parentKey={listKey}
                  value={v}
                  onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))}
                />
              </div>
              {tools(i)}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white">
          {value.map((v, i) => {
            const s = summary(v, i);
            const isOpen = open === i;
            return (
              <div key={i}>
                <div className="flex items-center gap-3 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="w-4 text-zinc-400">{isOpen ? "▾" : "▸"}</span>
                    {s.thumb && (
                      <img
                        src={s.thumb}
                        alt=""
                        className="h-9 w-12 shrink-0 rounded bg-[repeating-conic-gradient(#d4d4d8_0_25%,#f4f4f5_0_50%)] bg-[length:16px_16px] object-cover"
                      />
                    )}
                    <span className="truncate text-[14px] font-medium text-zinc-800">
                      {s.title}
                    </span>
                  </button>
                  {tools(i)}
                </div>
                {isOpen && (
                  <div className="border-t border-zinc-100 bg-zinc-50/60 p-4">
                    {Array.isArray(v) ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {v.map((x, j) => (
                          <ValueEditor
                            key={j}
                            k={j}
                            parentKey={listKey}
                            value={x}
                            onChange={(nx) =>
                              onChange(
                                value.map((y, yi) =>
                                  yi === i
                                    ? (v as unknown[]).map((z, zj) => (zj === j ? nx : z))
                                    : y,
                                ),
                              )
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <ValueEditor
                        k={listKey}
                        value={v}
                        template={tpl}
                        onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {value.length === 0 && <p className="p-4 text-sm text-zinc-500">No items yet.</p>}
        </div>
      )}
    </div>
  );
}

/* ───────── People (stored by ID) ───────── */

export function RecordEditor({
  value,
  onChange,
}: {
  value: Record<string, unknown>;
  onChange: (v: unknown) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const keys = Object.keys(value).filter((k) => {
    const v = value[k] as Record<string, unknown>;
    return (
      !q || `${k} ${v?.["name"] ?? ""} ${v?.["role"] ?? ""}`.toLowerCase().includes(q.toLowerCase())
    );
  });
  const first = Object.values(value)[0];
  function add() {
    const name = prompt("Full name of the new person?");
    if (!name) return;
    let id =
      name
        .toLowerCase()
        .replace(/^(dr|prof)\.?\s+/, "")
        .split(/\s+/)[0]!
        .replace(/[^a-z0-9]/g, "") || "person";
    while (id in value) id += "2";
    const blank = { ...(blankLike(first) as Record<string, unknown>), name };
    onChange({ ...value, [id]: blank });
    setOpen(id);
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search people"
          className={`${inputCls} max-w-[280px]`}
        />
        <button type="button" onClick={add} className={`${smallBtn} ml-auto`}>
          + Add person
        </button>
      </div>
      <div className="flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {keys.map((id) => {
          const v = value[id] as Record<string, unknown>;
          const isOpen = open === id;
          return (
            <div key={id}>
              <div className="flex items-center gap-3 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="w-4 text-zinc-400">{isOpen ? "▾" : "▸"}</span>
                  {looksLikeImage(v?.["photo"]) && (
                    <img
                      src={v["photo"] as string}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                  )}
                  <span className="truncate text-[14px] font-medium text-zinc-800">
                    {String(v?.["name"] ?? id)}
                  </span>
                  <span className="truncate text-[12px] text-zinc-500">
                    {String(v?.["role"] ?? "")}
                  </span>
                  <code className="ml-auto shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-500">
                    ID: {id}
                  </code>
                </button>
                <button
                  type="button"
                  className={`${smallBtn} text-red-600`}
                  onClick={() => {
                    if (
                      confirm(
                        `Remove ${String(v?.["name"] ?? id)}? Any page that lists this person will skip them.`,
                      )
                    ) {
                      const { [id]: _drop, ...rest } = value;
                      onChange(rest);
                    }
                  }}
                >
                  ✕
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-zinc-100 bg-zinc-50/60 p-4">
                  <ValueEditor
                    k="person"
                    value={v}
                    onChange={(nv) => onChange({ ...value, [id]: nv })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
