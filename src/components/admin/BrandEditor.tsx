import { useEffect } from "react";
import { FONT_CHOICES, fontHref, type Brand } from "@/content/cms";
import { inputCls } from "./fields";

const COLOURS: Array<[keyof Brand, string, string]> = [
  ["accent", "Main accent", "Buttons, highlights, eyebrows"],
  ["blue", "Blue", "Secondary brand colour"],
  ["green", "Green", "Tags and accents"],
  ["yellow", "Yellow", "Link hover, accents"],
  ["cream", "Cream", "Light accents"],
  ["background", "Page background", "Behind everything"],
  ["ink", "Text", "Main text colour; softer greys are mixed from this"],
];

export function BrandEditor({ value, onChange }: { value: Brand; onChange: (b: Brand) => void }) {
  const set = <K extends keyof Brand>(k: K, v: Brand[K]) => onChange({ ...value, [k]: v });

  // Load the chosen fonts so the preview shows them.
  useEffect(() => {
    const id = "admin-font-preview";
    let l = document.getElementById(id) as HTMLLinkElement | null;
    if (!l) {
      l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      document.head.appendChild(l);
    }
    l.href = fontHref(value);
  }, [value.fontDisplay, value.fontBody]); // eslint-disable-line react-hooks/exhaustive-deps

  const fontPicker = (k: "fontDisplay" | "fontBody", label: string) => {
    const v = value[k];
    const custom = !FONT_CHOICES.includes(v);
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
          {label}
        </span>
        <select
          value={custom ? "__custom" : v}
          onChange={(e) => set(k, e.target.value === "__custom" ? "" : e.target.value)}
          className={inputCls}
          style={{ fontFamily: `"${v}", system-ui` }}
        >
          {FONT_CHOICES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
          <option value="__custom">Other Google Font…</option>
        </select>
        {custom && (
          <input
            value={v}
            onChange={(e) => set(k, e.target.value)}
            placeholder="Exact Google Fonts name, e.g. Rubik"
            className={inputCls}
          />
        )}
      </label>
    );
  };

  const slider = (k: "textScale" | "headingScale", label: string, lo: number, hi: number) => (
    <label className="flex flex-col gap-1.5">
      <span className="flex justify-between text-[12px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}{" "}
        <span className="font-mono normal-case text-zinc-700">{Math.round(value[k] * 100)}%</span>
      </span>
      <input
        type="range"
        min={lo}
        max={hi}
        step={0.01}
        value={value[k]}
        onChange={(e) => set(k, Number(e.target.value))}
        className="accent-zinc-900"
      />
    </label>
  );

  const pv = {
    background: value.background,
    color: value.ink,
    fontFamily: `"${value.fontBody}", system-ui, sans-serif`,
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="flex flex-col gap-6">
        <div className="grid gap-3 2xl:grid-cols-2">
          {COLOURS.map(([k, label, hint]) => (
            <div
              key={k}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3"
            >
              <input
                type="color"
                value={String(value[k])}
                onChange={(e) => set(k, e.target.value as never)}
                className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border border-zinc-300 p-0.5"
                aria-label={label}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[14px] font-medium leading-tight text-zinc-900">{label}</span>
                <span className="text-[12px] leading-snug text-zinc-500">{hint}</span>
              </div>
              <input
                value={String(value[k])}
                onChange={(e) => set(k, e.target.value as never)}
                style={{ width: 92 }}
                className="shrink-0 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 font-mono text-[12px] text-zinc-900 outline-none focus:border-zinc-900"
                aria-label={`${label} hex code`}
              />
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fontPicker("fontDisplay", "Heading font")}
          {fontPicker("fontBody", "Body font")}
          {slider("headingScale", "Heading size", 0.7, 1.3)}
          {slider("textScale", "Body text size", 0.85, 1.25)}
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2.5 text-[14px] text-zinc-800">
            <input
              type="checkbox"
              checked={value.showGrid}
              onChange={(e) => set("showGrid", e.target.checked)}
              className="h-4 w-4 accent-zinc-900"
            />
            Show background grid pattern
          </label>
          <label className="flex items-center gap-2.5 text-[14px] text-zinc-800">
            <input
              type="checkbox"
              checked={value.motion}
              onChange={(e) => set("motion", e.target.checked)}
              className="h-4 w-4 accent-zinc-900"
            />
            Animations (scrolling logos, count-ups, reveals)
          </label>
        </div>
      </div>

      <div className="sticky top-4 self-start overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
        <div className="bg-zinc-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          Preview
        </div>
        <div style={pv} className="flex flex-col gap-4 p-7">
          <span
            style={{
              color: value.accent,
              fontSize: 11 * value.textScale,
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            // HUMAN SKILLS FOR AN AI WORLD
          </span>
          <span
            style={{
              fontFamily: `"${value.fontDisplay}", system-ui`,
              fontWeight: 700,
              fontSize: 40 * value.headingScale,
              lineHeight: 1,
              letterSpacing: "-0.025em",
            }}
          >
            Build what AI can’t.
          </span>
          <span style={{ fontSize: 15 * value.textScale, lineHeight: 1.6, opacity: 0.8 }}>
            Programs, competitions and immersions where students build real projects with industry
            mentors.
          </span>
          <div className="flex gap-2">
            <span
              style={{
                background: value.accent,
                color: value.background,
                fontSize: 14 * value.textScale,
              }}
              className="rounded-full px-4 py-2 font-semibold"
            >
              Apply now
            </span>
            <span
              style={{ border: `1px solid ${value.ink}44`, fontSize: 14 * value.textScale }}
              className="rounded-full px-4 py-2 font-semibold"
            >
              Explore
            </span>
          </div>
          <div className="flex gap-1.5 pt-2">
            {[value.accent, value.blue, value.green, value.yellow, value.cream].map((c, i) => (
              <span key={i} style={{ background: c }} className="h-6 flex-1 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
