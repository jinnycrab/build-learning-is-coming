/**
 * CMS layer.
 *
 * The defaults in ./site.ts are the starting content. Anything an admin saves
 * in /admin is stored in the `site_content` table (one JSON document per
 * section) and replaces the matching default here before pages render.
 */
import * as site from "./site";

export type SectionKey =
  | "settings"
  | "nav"
  | "stats"
  | "partners"
  | "people"
  | "studentWork"
  | "home"
  | "programsPage"
  | "programs"
  | "competitions"
  | "immersion"
  | "partnersPage"
  | "about";

export type SectionDef = {
  key: SectionKey;
  label: string;
  group: "Brand & site" | "Shared" | "Pages";
  description: string;
  page?: string;
  /** People are stored by ID (e.g. "karin") so pages can refer to them. */
  record?: boolean;
};

export const SECTIONS: SectionDef[] = [
  {
    key: "settings",
    label: "Brand & contact",
    group: "Brand & site",
    description: "Colours, fonts, text sizes, logo, contact details, footer text and countdown labels.",
  },
  {
    key: "nav",
    label: "Navigation",
    group: "Brand & site",
    description: "Menu links in the header and footer.",
  },
  {
    key: "stats",
    label: "Headline numbers",
    group: "Shared",
    description: "The count-up numbers on Home.",
  },
  {
    key: "partners",
    label: "Partner logos",
    group: "Shared",
    description: "Logos in the scrolling strip and on hackathon / partner cards.",
  },
  {
    key: "people",
    label: "People",
    group: "Shared",
    description: "Founders, mentors, speakers and judges. Pages pick people by their ID.",
    record: true,
  },
  {
    key: "studentWork",
    label: "Student work",
    group: "Shared",
    description: "Project covers shown on Home.",
  },
  {
    key: "home",
    label: "Home",
    group: "Pages",
    description:
      "Hero, photo strip, partner strip label, pathways, human skills, The Method, student work, Our Reach map and team.",
    page: "/",
  },
  {
    key: "programsPage",
    label: "Programs page text",
    group: "Pages",
    description: "Hero, Passion Project Studio and Events & Group Programs headings.",
    page: "/programs",
  },
  {
    key: "programs",
    label: "Programs list",
    group: "Pages",
    description: "Event and group program cards (Upcoming / Past) on Programs.",
    page: "/programs",
  },
  {
    key: "competitions",
    label: "Competitions",
    group: "Pages",
    description: "Hero, Global Series (open challenge + past editions), hackathons and judges.",
    page: "/competitions",
  },
  {
    key: "immersion",
    label: "Immersion",
    group: "Pages",
    description: "Hero collage, key facts, outcomes, experience themes, your stay, mentors, dates and what’s included.",
    page: "/immersion",
  },
  {
    key: "partnersPage",
    label: "Schools & Partners",
    group: "Pages",
    description: "Hero, logo strip, PCA Seoul, school formats and the enquiry form.",
    page: "/partners",
  },
  {
    key: "about",
    label: "About",
    group: "Pages",
    description: "Headline, photos, university logos, founders, mentors and closing.",
    page: "/about",
  },
];

type Json = unknown;
export type Overrides = Partial<Record<SectionKey, Json>>;

const live: Record<SectionKey, Json> = {
  settings: site.settings,
  nav: site.nav,
  stats: site.stats,
  partners: site.partners,
  people: site.people,
  studentWork: site.studentWork,
  home: site.home,
  programsPage: site.programsPage,
  programs: site.programs,
  competitions: site.competitions,
  immersion: site.immersion,
  partnersPage: site.partnersPage,
  about: site.about,
};

/** Untouched copies of the defaults, so removed edits can be restored. */
const defaults = JSON.parse(JSON.stringify(live)) as Record<SectionKey, Json>;

export function getDefault(key: SectionKey): Json {
  return JSON.parse(JSON.stringify(defaults[key]));
}

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function blankOf(v: unknown): unknown {
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (Array.isArray(v)) return [];
  if (isObj(v)) return {};
  return "";
}

/**
 * Saved list items get any field that every default item has but they lack,
 * as a blank value, so fields added in code show up in the editor.
 */
function fillItems(base: unknown[], over: unknown[]): unknown[] {
  if (!base.length || !base.every(isObj)) return over;
  const shared = Object.keys(base[0] as Record<string, unknown>).filter((k) =>
    base.every((b) => k in (b as Record<string, unknown>)),
  );
  return over.map((item) => {
    if (!isObj(item)) return item;
    const missing = shared.filter((k) => !(k in item));
    if (!missing.length) return item;
    const first = base[0] as Record<string, unknown>;
    return { ...item, ...Object.fromEntries(missing.map((k) => [k, blankOf(first[k])])) };
  });
}

/** Objects merge field by field (so new fields added in code keep their defaults); lists are replaced whole. */
function merge(base: unknown, over: unknown): unknown {
  if (over === undefined || over === null) return base;
  if (isObj(base) && isObj(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  if (Array.isArray(base) && Array.isArray(over)) return fillItems(base, over);
  if (Array.isArray(base) && !Array.isArray(over)) return base;
  if (isObj(base) && !isObj(over)) return base;
  return over;
}

export function resolved(key: SectionKey, over: unknown): Json {
  const sec = SECTIONS.find((s) => s.key === key);
  if (sec?.record) return isObj(over) ? over : getDefault(key);
  const def = getDefault(key);
  // Drop saved fields the page no longer uses, so removed sections don't linger in the editor.
  if (isObj(def) && isObj(over))
    over = Object.fromEntries(Object.entries(over).filter(([k]) => k in def));
  return merge(def, over);
}

function writeInto(target: unknown, value: unknown) {
  if (Array.isArray(target) && Array.isArray(value)) {
    target.splice(0, target.length, ...value);
  } else if (isObj(target) && isObj(value)) {
    for (const k of Object.keys(target)) if (!(k in value)) delete target[k];
    Object.assign(target, value);
  }
}

let lastApplied = "";

/**
 * Apply saved content to the shared content objects. Safe to call repeatedly;
 * it only does work when the saved content changed.
 */
export function applyOverrides(over: Overrides | undefined) {
  const sig = JSON.stringify(over ?? {});
  if (sig === lastApplied) return;
  lastApplied = sig;
  for (const s of SECTIONS) writeInto(live[s.key], resolved(s.key, over?.[s.key]));
}

export type Brand = typeof site.settings.brand;

export const FONT_CHOICES = [
  "Inter",
  "Montserrat",
  "DM Sans",
  "Manrope",
  "Plus Jakarta Sans",
  "Poppins",
  "Outfit",
  "Sora",
  "Space Grotesk",
  "Work Sans",
  "Lexend",
  "Nunito Sans",
  "IBM Plex Sans",
  "Roboto",
  "Open Sans",
  "Lato",
  "Fraunces",
  "Playfair Display",
  "Libre Baskerville",
];

export function fontHref(brand: Pick<Brand, "fontDisplay" | "fontBody">) {
  const fams = Array.from(new Set([brand.fontDisplay, brand.fontBody].filter(Boolean)));
  const q = fams
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700;800`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

const hex = (v: unknown, fallback: string) =>
  typeof v === "string" && /^#[0-9a-fA-F]{3,8}$/.test(v.trim()) ? v.trim() : fallback;
const num = (v: unknown, lo: number, hi: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : 1;
const font = (v: unknown, fallback: string) =>
  typeof v === "string" && /^[\w -]{1,40}$/.test(v) ? v : fallback;

/** CSS that turns brand settings into the variables the whole site uses. */
export function brandCss(b: Partial<Brand>) {
  const d = defaults.settings as typeof site.settings;
  const D = d.brand;
  const vars = [
    `--bl-accent:${hex(b.accent, D.accent)}`,
    `--bl-green:${hex(b.green, D.green)}`,
    `--bl-yellow:${hex(b.yellow, D.yellow)}`,
    `--bl-blue:${hex(b.blue, D.blue)}`,
    `--bl-cream:${hex(b.cream, D.cream)}`,
    `--bl-bg:${hex(b.background, D.background)}`,
    `--bl-ink:${hex(b.ink, D.ink)}`,
    `--bl-surface:color-mix(in srgb, var(--bl-bg), var(--bl-ink) 3%)`,
    `--bl-ink-2:color-mix(in srgb, var(--bl-ink), var(--bl-bg) 18%)`,
    `--bl-ink-3:color-mix(in srgb, var(--bl-ink), var(--bl-bg) 36%)`,
    `--bl-font-display:"${font(b.fontDisplay, D.fontDisplay)}", system-ui, sans-serif`,
    `--bl-font-body:"${font(b.fontBody, D.fontBody)}", system-ui, sans-serif`,
    `--bl-scale:${num(b.textScale, 0.8, 1.3)}`,
    `--bl-hscale:${num(b.headingScale, 0.7, 1.3)}`,
  ];
  let css = `:root{${vars.join(";")}}`;
  if (b.showGrid === false) css += `.gridbg{background-image:none!important}`;
  if (b.motion === false)
    css += `.marquee,.pin .ring,.hero-col{animation:none!important}.w,.fade-up{animation:none!important;opacity:1!important;transform:none!important;filter:none!important}.pv img,.reel-slide{transition:none!important}`;
  return css;
}
