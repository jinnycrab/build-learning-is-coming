import type { ReactNode } from "react";
import { logo, partners, people, settings, stats as defaultStats, type Partner } from "@/content/site";
import { useCountProgress, useCountdown, useInViewOnce } from "./hooks";

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
