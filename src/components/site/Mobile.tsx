/**
 * Phone layout (screens below 768px).
 *
 * Every phone page is built from these pieces so spacing and type stay on one
 * system: a 20px side edge, an 8px spacing grid, 48px between sections, and a
 * fixed type scale. Desktop pages never render them.
 */
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { nav, partners, people, settings, type Partner } from "@/content/site";
import { SiteLink } from "./Layout";
import { useIsPhone } from "./hooks";

/* ───────── Type scale ───────── */

export const mt = {
  title: "disp m-0 text-[length:calc(32px*var(--bl-hscale))] leading-[1.15]",
  h2: "disp m-0 text-[length:calc(24px*var(--bl-hscale))] leading-[1.2]",
  card: "m-0 text-[length:calc(17px*var(--bl-scale))] font-semibold leading-[1.3]",
  body: "m-0 text-[length:calc(16px*var(--bl-scale))] leading-[1.5] text-bl-ink-2",
  eyebrow:
    "text-[length:calc(12px*var(--bl-scale))] font-semibold uppercase leading-[1.3] tracking-[0.08em] text-bl-accent",
  meta: "text-[length:calc(13px*var(--bl-scale))] leading-[1.4] text-bl-ink-3",
  stat: "disp text-[length:calc(28px*var(--bl-hscale))] leading-none tabular-nums",
  statLabel:
    "text-[length:calc(12px*var(--bl-scale))] font-semibold uppercase tracking-[0.08em] text-bl-ink-3",
};

/** The first sentence of a paragraph, for one-line intros on phones. */
export function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

/** The anchor id for an element that exists in both layouts: only the visible one gets it. */
export function useAnchor(id: string, layout: "phone" | "desktop") {
  const phone = useIsPhone();
  const mine = (layout === "phone") === phone;
  // A page opened straight at "#id" on a phone: the browser looked before the
  // phone copy had the id, so jump once it does.
  useEffect(() => {
    if (mine && layout === "phone" && window.location.hash === `#${id}`) document.getElementById(id)?.scrollIntoView();
  }, [mine, layout, id]);
  return mine ? id : undefined;
}

/* ───────── Icons ───────── */

const ICONS: Record<string, string> = {
  chevron: "M9 6l6 6-6 6",
  down: "M6 9l6 6 6-6",
  external: "M7 17L17 7M8 7h9v9",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 9h16M4 15h16",
  check: "M5 12.5l4.5 4.5L19 7.5",
  studio: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M10 17h4v4h-4z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  school: "M3 21h18M5 21V10l7-5 7 5v11M9.5 21v-5h5v5",
  chat: "M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 20 12z",
  mail: "M4 6h16v12H4zM4.5 6.5l7.5 6 7.5-6",
  instagram: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.3 6.7h.01",
  linkedin: "M4.5 9.5v10M4.5 5.2v.1M9 19.5v-10M9 13.5c0-2.5 1.6-4.2 3.8-4.2 2.3 0 3.7 1.5 3.7 4.3v5.9",
  heart: "M12 20s-7.5-4.5-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.5 12 20 12 20z",
  users:
    "M15 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 3 18.5V20M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 20v-1.5a3.5 3.5 0 0 0-2.5-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12.5v-1",
  sparkles: "M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9zM18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z",
  cpu: "M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
};

export function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d={ICONS[name] ?? ICONS["sparkles"]} />
    </svg>
  );
}

const isExternal = (href: string) => /^https?:/.test(href);
/** Labels in the CMS sometimes carry their own arrow; phones draw icons instead. */
export const plain = (label: string) => label.replace(/\s*[→↗]\s*$/, "");

/* ───────── Layout pieces ───────── */

/** A phone page: 24px under the top bar, 48px between sections. */
export function MPage({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-12 pb-12 pt-6 md:hidden">{children}</div>;
}

/** Section heading block: eyebrow, 8px, heading, 8px, optional one-line text. */
export function MHead({
  eyebrow,
  title,
  text,
  as = "h2",
}: {
  eyebrow?: string | undefined;
  title?: ReactNode;
  text?: string | undefined;
  as?: "h1" | "h2";
}) {
  // The desktop layout carries the page's <h1>; the phone title is a level-1 heading for screen readers.
  const H = as === "h1" ? "div" : "h2";
  const level = as === "h1" ? { role: "heading", "aria-level": 1 } : {};
  return (
    <div className="flex flex-col gap-2 px-5">
      {eyebrow?.trim() && <span className={mt.eyebrow}>{eyebrow}</span>}
      {title && (
        <H className={as === "h1" ? mt.title : mt.h2} {...level}>
          {title}
        </H>
      )}
      {text?.trim() && <p className={mt.body}>{text}</p>}
    </div>
  );
}

export function MSection({
  id,
  eyebrow,
  title,
  text,
  children,
}: {
  id?: string | undefined;
  eyebrow?: string | undefined;
  title?: ReactNode;
  text?: string | undefined;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-6">
      {(eyebrow || title || text) && <MHead eyebrow={eyebrow} title={title} text={text} />}
      {children}
    </section>
  );
}

/** Full-width 50px button: orange for the main action, outline for a quieter one. */
export function MButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: string;
  variant?: "primary" | "outline";
}) {
  if (!children.trim()) return null;
  const look = variant === "primary" ? "bg-bl-accent !text-bl-bg" : "border border-white/30 !text-bl-ink";
  return (
    <div className="px-5">
      <SiteLink
        href={href}
        className={`flex h-[50px] w-full items-center justify-center rounded-full text-[length:calc(16px*var(--bl-scale))] font-semibold no-underline ${look}`}
      >
        {plain(children)}
      </SiteLink>
    </div>
  );
}

/** Text link in the accent colour, 44px tall for thumbs. */
export function MLink({ href, children, center = false }: { href: string; children: string; center?: boolean }) {
  if (!children.trim()) return null;
  return (
    <div className={`flex px-5 ${center ? "justify-center" : ""}`}>
      <SiteLink
        href={href}
        className="inline-flex min-h-11 items-center gap-1 text-[length:calc(16px*var(--bl-scale))] font-medium !text-bl-accent"
      >
        {plain(children)}
        <Icon name={isExternal(href) ? "external" : "chevron"} size={16} />
      </SiteLink>
    </div>
  );
}

/** A 4:3 photo on the 20px edge. */
export function MPhoto({ src, alt = "" }: { src: string; alt?: string }) {
  if (!src) return null;
  return (
    <div className="px-5">
      <img src={src} alt={alt} className="block aspect-[4/3] w-full rounded-xl object-cover" />
    </div>
  );
}

/* ───────── Grouped list (iOS Settings style) ───────── */

export type MRow = {
  title: string;
  text?: string | undefined;
  href?: string | undefined;
  icon?: string | undefined;
  photo?: string | undefined;
  /** A small square photo in place of an icon. */
  thumb?: string | undefined;
  value?: string | undefined;
  active?: boolean;
};

function RowInner({ r }: { r: MRow }) {
  return (
    <>
      {r.icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bl-accent/15 text-bl-accent">
          <Icon name={r.icon} size={18} />
        </span>
      )}
      {r.photo && (
        <img
          src={r.photo}
          alt=""
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
          style={{ objectPosition: "center 22%" }}
        />
      )}
      {r.thumb && <img src={r.thumb} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={`${mt.card} ${r.active ? "text-bl-accent" : ""}`}>{r.title}</span>
        {r.text && <span className={`${mt.meta} line-clamp-2`}>{r.text}</span>}
      </span>
      {r.value && <span className={`${mt.body} shrink-0 text-right !text-bl-ink-3`}>{r.value}</span>}
      {r.href && <Icon name={isExternal(r.href) ? "external" : "chevron"} size={18} className="text-bl-ink-3" />}
    </>
  );
}

export function MList({ rows, divided = true }: { rows: MRow[]; divided?: boolean }) {
  if (!rows.length) return null;
  return (
    <div className="px-5">
      <div className="m-card overflow-hidden rounded-2xl">
        {rows.map((r, i) => {
          const cls = "relative flex min-h-[56px] items-center gap-3 px-4 py-3 text-bl-ink no-underline";
          return (
            <div key={r.title + i} className="relative">
              {i > 0 && divided && (
                <span
                  aria-hidden="true"
                  className="m-sep absolute right-0 top-0"
                  style={{ left: r.icon ? 60 : r.photo ? 76 : r.thumb ? 84 : 16 }}
                />
              )}
              {r.href ? (
                <SiteLink href={r.href} className={cls}>
                  <RowInner r={r} />
                </SiteLink>
              ) : (
                <div className={cls}>
                  <RowInner r={r} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Key facts: label on the left, value on the right. */
export function MFacts({ rows }: { rows: Array<[string, string]> }) {
  const list = rows.filter(([, v]) => v?.trim());
  if (!list.length) return null;
  return (
    <div className="px-5">
      <dl className="m-card m-0 overflow-hidden rounded-2xl">
        {list.map(([k, v], i) => (
          <div key={k + i} className="relative flex min-h-[52px] items-center justify-between gap-4 px-4 py-3">
            {i > 0 && <span aria-hidden="true" className="m-sep absolute left-4 right-0 top-0" />}
            {k && <dt className={`${mt.body} shrink-0 !text-bl-ink`}>{k}</dt>}
            <dd className={`${mt.body} m-0 min-w-0 ${k ? "text-right !text-bl-ink-3" : "!text-bl-ink"}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Long details folded away; each row opens on tap. */
export function MAccordion({
  items,
}: {
  items: Array<{
    title: string;
    text?: string | undefined;
    photo?: string | undefined;
    thumb?: string | undefined;
    body: ReactNode;
  }>;
}) {
  const list = items.filter((x) => x.title.trim());
  if (!list.length) return null;
  return (
    <div className="px-5">
      <div className="m-card overflow-hidden rounded-2xl">
        {list.map((it, i) => (
          <details key={it.title + i} className="m-acc group relative">
            {i > 0 && <span aria-hidden="true" className="m-sep absolute left-4 right-0 top-0" />}
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
              {it.photo && (
                <img
                  src={it.photo}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                  style={{ objectPosition: "center 22%" }}
                />
              )}
              {it.thumb && <img src={it.thumb} alt="" loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className={mt.card}>{it.title}</span>
                {it.text && <span className={mt.meta}>{it.text}</span>}
              </span>
              <Icon name="down" size={18} className="text-bl-ink-3 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">{it.body}</div>
          </details>
        ))}
      </div>
    </div>
  );
}

/** A list that shows its first rows; "Show all" grows the same list in place. */
export function MMore({ rows, first, label }: { rows: MRow[]; first: number; label: string }) {
  const [open, setOpen] = useState(false);
  const more = rows.length > first;
  return (
    <div className="flex flex-col gap-2">
      <MList rows={open || !more ? rows : rows.slice(0, first)} divided={false} />
      {more && !open && (
        <div className="px-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 items-center gap-1 text-[length:calc(16px*var(--bl-scale))] font-medium text-bl-accent"
          >
            {label}
            <Icon name="down" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/** Ticked lines, for lists of outcomes inside an accordion. */
export function MChecks({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((t) => (
        <li key={t} className={`${mt.body} flex gap-3`}>
          <Icon name="check" size={18} className="mt-[3px] text-bl-accent" />
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────── Swipe carousel: one card at a time ───────── */

export function MCarousel<T>({
  items,
  label,
  children,
}: {
  items: T[];
  label: string;
  children: (item: T, i: number) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    const first = el?.querySelector<HTMLElement>("[data-slide]");
    if (!el || !first) return;
    const step = first.offsetWidth + 20;
    setActive(Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / step))));
  };
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-4">
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="m-carousel flex snap-x snap-mandatory gap-5 overflow-x-auto"
      >
        {items.map((it, i) => (
          <div
            key={i}
            data-slide
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="flex w-[calc(100%-40px)] shrink-0 snap-center"
          >
            {children(it, i)}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div aria-hidden="true" className="flex justify-center gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-bl-accent" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** A carousel card: 4:3 photo, eyebrow, title, meta and optional text. */
export function MCard({
  img,
  eyebrow,
  title,
  meta,
  text,
  href,
  grey = false,
}: {
  img?: string | undefined;
  eyebrow?: string | undefined;
  title: string;
  meta?: string | undefined;
  text?: string | undefined;
  href?: string | undefined;
  grey?: boolean;
}) {
  const inner = (
    <>
      {img && (
        <img
          src={img}
          alt=""
          loading="lazy"
          className="block aspect-[4/3] w-full object-cover"
          style={grey ? { filter: "grayscale(1) brightness(.85)" } : undefined}
        />
      )}
      <span className="flex flex-1 flex-col gap-2 p-4">
        {eyebrow?.trim() && <span className={mt.eyebrow}>{eyebrow}</span>}
        <span className={mt.card}>{title}</span>
        {meta?.trim() && <span className={mt.meta}>{meta}</span>}
        {text?.trim() && <span className={`${mt.body} line-clamp-3`}>{text}</span>}
      </span>
    </>
  );
  const cls = "m-card flex w-full flex-col overflow-hidden rounded-2xl text-bl-ink no-underline";
  return href ? (
    <SiteLink href={href} className={cls}>
      {inner}
    </SiteLink>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ───────── Shared blocks ───────── */

/** 2×2 stat tiles at the final numbers (no count-up, so they never read "0+"). */
export function MStats({ items }: { items: Array<{ value: number | string; suffix?: string; label: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-2 px-5">
      {items.map((s) => (
        <div key={s.label} className="m-card flex flex-col gap-2 rounded-2xl p-4">
          <span className={mt.stat}>
            {s.value}
            {s.suffix}
          </span>
          <span className={mt.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/** One slow-moving row of logos, about 28px tall. */
export function MLogos({ list = partners, label }: { list?: Partner[]; label: string }) {
  const loop = [...list, ...list];
  return (
    <section aria-label={label} className="flex flex-col gap-4">
      {label.trim() && <span className={`${mt.statLabel} px-5`}>{label}</span>}
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="m-marquee flex w-max items-center gap-10 pl-10"
          style={{ animationDuration: `${Math.max(1, list.length) * (70 / Math.max(1, partners.length))}s` }}
        >
          {loop.map((p, i) => (
            <img
              key={i}
              src={p.logo}
              alt={i < list.length ? p.name : ""}
              aria-hidden={i >= list.length || undefined}
              style={{ height: Math.min(p.height, 28) }}
              className="w-auto shrink-0 opacity-60 brightness-0 invert"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** People as list rows: round photo, name, organisation. */
export function peopleRows(keys: Array<string | { key: string; role?: string }>): MRow[] {
  return keys.flatMap((k) => {
    const key = typeof k === "string" ? k : k.key;
    const p = people[key];
    if (!p) return [];
    return [{ title: p.name, text: (typeof k === "string" ? undefined : k.role) ?? p.role, photo: p.photo }];
  });
}

/* ───────── Top bar, menu sheet and footer ───────── */

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  // Slide the bar away while scrolling down; bring it back on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y < 56) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      if (Math.abs(y - last) > 6 || y < 56) last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  useEffect(() => setHidden(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const close = () => setOpen(false);
  const items = nav.filter((n) => n.href !== "/");
  const btn = settings.mobile.menuButton;
  return (
    <>
      <header className={`m-bar sticky top-0 z-40 md:hidden ${hidden && !open ? "m-bar-away" : ""}`}>
        <div className="flex h-14 items-center justify-between pl-5 pr-2.5">
          <Link to="/" aria-label="Build Learning — home" className="flex h-11 items-center">
            <img src={settings.logo} alt="Build Learning" className="h-6 w-auto brightness-0 invert" />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-bl-ink"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="m-menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>
      {open && (
        <div id="m-menu" role="dialog" aria-modal="true" aria-label="Menu" className="m-sheet fixed inset-0 z-50 flex flex-col bg-bl-bg md:hidden">
          <div className="flex h-14 shrink-0 items-center justify-between pl-5 pr-2.5">
            <Link to="/" aria-label="Build Learning — home" onClick={close} className="flex h-11 items-center">
              <img src={settings.logo} alt="Build Learning" className="h-6 w-auto brightness-0 invert" />
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center text-bl-ink"
              aria-label="Close menu"
              onClick={close}
              autoFocus
            >
              <Icon name="close" size={24} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pt-4">
            {items.map((n, i) => {
              const active = !n.external && pathname.startsWith(n.href);
              return (
                <div key={n.label} className="relative">
                  {i > 0 && <span aria-hidden="true" className="m-sep absolute left-0 right-0 top-0" />}
                  <SiteLink
                    href={n.href}
                    onClick={close}
                    className={`flex h-14 items-center justify-between gap-3 text-[length:calc(20px*var(--bl-scale))] no-underline ${active ? "!text-bl-accent" : "text-bl-ink"}`}
                  >
                    {plain(n.label)}
                    <Icon name={n.external ? "external" : "chevron"} size={20} className="text-bl-ink-3" />
                  </SiteLink>
                </div>
              );
            })}
          </nav>
          <div className="shrink-0 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4">
            <SiteLink
              href={btn.href}
              onClick={close}
              className="flex h-[50px] w-full items-center justify-center rounded-full bg-bl-accent text-[length:calc(16px*var(--bl-scale))] font-semibold !text-bl-bg"
            >
              {plain(btn.label)}
            </SiteLink>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileFooter() {
  const f = settings.footer;
  const contactId = useAnchor("contact", "phone");
  const link = `inline-flex min-h-11 items-center ${mt.body} no-underline`;
  return (
    <footer id={contactId} className="flex scroll-mt-20 flex-col gap-4 px-5 pb-[max(32px,env(safe-area-inset-bottom))] pt-12 md:hidden">
      <img src={settings.logo} alt="Build Learning" className="h-6 w-fit brightness-0 invert" />
      <div className="flex flex-col">
        <SiteLink href={`mailto:${settings.email}`} className={link}>
          {settings.email}
        </SiteLink>
        <div className="flex gap-6">
          {f.social.map((l) => (
            <SiteLink key={l.label + l.href} href={l.href} className={link}>
              {l.label}
            </SiteLink>
          ))}
        </div>
      </div>
      <span className={mt.meta}>{f.copyright.replaceAll("{year}", String(new Date().getFullYear()))}</span>
    </footer>
  );
}
