import { useEffect, useRef, useState, type ReactNode } from "react";
import { logo, partners, people, settings, stats as defaultStats, type Partner } from "@/content/site";
import { useCountProgress, useCountdown, useInViewOnce } from "./hooks";
import { SiteLink } from "./Layout";

export function CountUpStats({ items = defaultStats }: { items?: typeof defaultStats }) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  const p = useCountProgress(seen);
  return (
    <div ref={ref} className="grid grid-cols-2 border-t border-bl-line lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="min-w-0 py-8 pr-6 lg:py-10">
          <div className="disp text-[length:calc(48px*var(--bl-hscale))] leading-none tabular-nums">
            {Math.round(s.value * p)}
            {s.suffix}
          </div>
          <div className="eyebrow mt-2 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A row of partner logos sitting on one shared baseline, with a label above. */
export function EventLogos({
  label,
  names,
  extraNames = [],
}: {
  label: string;
  names: string[];
  extraNames?: string[];
}) {
  const list = names.map((n) => logo(n)).filter((l): l is Partner => !!l);
  if (!list.length && !extraNames.length) return null;
  return (
    <div className="flex flex-col gap-3.5 border-t border-bl-line pt-3.5">
      <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] leading-none text-[#8C929C]">
        {label}
      </span>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        {list.map((l) => (
          <span key={l.name} className="inline-flex h-10 items-end">
            <img
              src={l.logo}
              alt={l.name}
              className="block w-auto opacity-80 brightness-0 invert"
              style={{
                height: Math.min(l.name === "Liminal" ? 36 : l.height * 0.85, 40),
                marginBottom: l.name === "Coupang" ? -5 : 0,
              }}
            />
          </span>
        ))}
        {extraNames.map((n) => (
          <span key={n} className="inline-flex h-10 items-end">
            <span className="disp text-[length:calc(15px*var(--bl-scale))] leading-none text-bl-ink-2">{n}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee({
  list = partners,
  label,
  heading,
}: {
  list?: Partner[];
  label?: string;
  heading?: ReactNode;
}) {
  const loop = [...list, ...list];
  return (
    <section
      className="border-b border-bl-line"
      aria-label={label ?? "Partners, sponsors and judges"}
    >
      {heading ??
        (label?.trim() ? (
          <div className="mx-auto max-w-[1320px] px-5 pt-7 text-center sm:px-10">
            <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">{label}</span>
          </div>
        ) : null)}
      <div
        className="overflow-hidden py-7"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div className="marquee flex w-max items-center gap-[72px] pl-[72px]">
          {loop.map((p, i) => (
            <img
              key={i}
              src={p.logo}
              alt={i < list.length ? p.name : ""}
              aria-hidden={i >= list.length}
              title={`${p.name} · ${p.role}`}
              style={{ height: p.height }}
              className="w-auto shrink-0 opacity-75 brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PersonCard({
  personKey,
  role,
  square = false,
}: {
  personKey: string;
  role?: string;
  square?: boolean;
}) {
  const p = people[personKey];
  if (!p) return null;
  return (
    <div className="flex flex-col gap-2.5">
      <img
        src={p.photo}
        alt={`Portrait of ${p.name}`}
        loading="lazy"
        className={`w-full rounded-2xl object-cover ${square ? "aspect-square" : "aspect-[4/5]"}`}
        style={{ objectPosition: "center 22%" }}
      />
      <span className="text-base font-semibold">{p.name}</span>
      <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
        {role ?? p.role}
      </span>
      <span className="text-[length:calc(13px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
        {p.bio}
      </span>
    </div>
  );
}

export function CountdownChips({ iso, compact = false }: { iso: string; compact?: boolean }) {
  const c = useCountdown(iso);
  const L = settings.countdown;
  const parts: Array<[string, string]> = [
    [c.days, compact ? (L.short[0] ?? "") : L.days],
    [c.hours, compact ? (L.short[1] ?? "") : L.hours],
    [c.mins, compact ? (L.short[2] ?? "") : L.mins],
    [c.secs, compact ? (L.short[3] ?? "") : L.secs],
  ];
  return (
    <div
      role="timer"
      aria-label="Time left to register"
      className="flex flex-wrap items-center gap-1.5"
    >
      {parts.map(([v, l]) => (
        <span
          key={l}
          className="inline-flex items-baseline gap-1 rounded-[10px] border border-white/15 bg-bl-bg px-3 py-2"
        >
          <span className="disp text-[length:calc(22px*var(--bl-scale))] tabular-nums">
            {c.ready ? v : "--"}
          </span>
          <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
            {l}
          </span>
        </span>
      ))}
    </div>
  );
}

export function useDaysLeft(iso: string) {
  const c = useCountdown(iso);
  return c.ready
    ? String(parseInt(c.days, 10) + (c.hours !== "00" || c.mins !== "00" ? 1 : 0))
    : "--";
}

/** Heading text with a closing "?", "." or "!" in the accent colour. */
export function AccentEnd({ text }: { text: string }) {
  const end = /[?.!]$/.test(text) ? text.slice(-1) : "";
  return (
    <>
      {end ? text.slice(0, -1) : text}
      {end && <span className="text-bl-accent">{end}</span>}
    </>
  );
}

/** A short line under people grids, e.g. "+ More industry mentors, judges and speakers". */
export function MoreCue({ label }: { label: string; href?: string }) {
  if (!label.trim()) return null;
  return (
    <span className="eyebrow self-center pt-2 text-center text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
      {label}
    </span>
  );
}

/**
 * An email contact that shows the address in a small popup, with Copy and
 * "Open email app", so it also works for visitors without an email app set up.
 */
export function EmailPopup({
  label,
  subject,
  look = "button",
}: {
  label: string;
  subject: string;
  look?: "button" | "link";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLSpanElement>(null);
  const addressRef = useRef<HTMLSpanElement>(null);
  const email = settings.email;
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: select the address so it can be copied by hand.
      const sel = window.getSelection();
      if (sel && addressRef.current) {
        sel.selectAllChildren(addressRef.current);
      }
    }
  };
  if (!label.trim()) return null;
  const trigger =
    look === "button"
      ? "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border-0 bg-bl-accent px-6 py-3 text-[length:calc(15px*var(--bl-scale))] font-semibold text-bl-bg transition-transform hover:-translate-y-0.5"
      : "cursor-pointer border-0 bg-transparent p-0 text-sm text-bl-accent hover:text-bl-yellow";
  return (
    <span ref={box} className="relative inline-block">
      <button type="button" className={trigger} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}
      </button>
      {open && (
        <span
          role="dialog"
          aria-label="Email Build Learning"
          className="absolute left-0 top-full z-30 mt-2 flex w-[min(320px,calc(100vw-40px))] flex-col gap-3 rounded-2xl border border-white/15 bg-bl-bg p-4 shadow-[0_12px_40px_rgba(0,0,0,.6)]"
        >
          <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">Email us at</span>
          <span ref={addressRef} className="select-all break-all text-[length:calc(17px*var(--bl-scale))] font-semibold text-bl-ink">
            {email}
          </span>
          <span className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-transparent px-4 text-sm font-semibold text-bl-ink hover:border-bl-yellow"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
              className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-bl-accent px-4 text-sm font-semibold !text-bl-bg"
            >
              Open email app
            </a>
          </span>
        </span>
      )}
    </span>
  );
}
