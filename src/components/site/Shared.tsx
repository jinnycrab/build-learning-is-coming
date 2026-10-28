import { partners, people, stats as defaultStats, type Partner } from "@/content/site";
import { useCountProgress, useCountdown, useInViewOnce } from "./hooks";

export function CountUpStats({
  items = defaultStats,
  size = "md",
}: {
  items?: typeof defaultStats;
  size?: "md" | "lg";
}) {
  const { ref, seen } = useInViewOnce<HTMLDivElement>();
  const p = useCountProgress(seen);
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 overflow-hidden rounded-2xl border border-bl-line sm:grid-cols-3 lg:grid-cols-5"
    >
      {items.map((s) => (
        <div key={s.label} className="border-b border-r border-bl-line px-6 py-5 lg:border-b-0">
          <div
            className={`disp tabular-nums ${size === "lg" ? "text-5xl" : "text-[length:calc(30px*var(--bl-scale))]"}`}
          >
            {Math.round(s.value * p)}
            {s.suffix}
          </div>
          <div className="eyebrow mt-1.5 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LogoMarquee({ list = partners, label }: { list?: Partner[]; label?: string }) {
  const loop = [...list, ...list];
  return (
    <section
      className="border-b border-bl-line"
      aria-label={label ?? "Partners, sponsors and judges"}
    >
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
  const parts: Array<[string, string]> = [
    [c.days, compact ? "d" : "Days"],
    [c.hours, compact ? "h" : "Hours"],
    [c.mins, compact ? "m" : "Mins"],
    [c.secs, compact ? "s" : "Secs"],
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
