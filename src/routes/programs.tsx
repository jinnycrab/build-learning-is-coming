import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Container, Eyebrow, Page, SiteLink } from "@/components/site/Layout";
import { programs, season, type ProgramType } from "@/content/site";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Build Learning" },
      { name: "description", content: "Every Build Learning program, past and upcoming: competitions, immersions, studio and school partnerships." },
    ],
  }),
  component: Programs,
});

const VIEWS = ["All", "Upcoming", "Past"] as const;
const TYPES: Array<"All" | ProgramType> = ["All", "Competitions", "Immersions", "Studio", "Schools"];

function Programs() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("All");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const shown = programs.filter((p) => (view === "All" || (view === "Upcoming") === p.upcoming) && (type === "All" || p.type === type));
  const pct = (d: number) => `${((d / season.days) * 100).toFixed(2)}%`;

  return (
    <Page>
      <section className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-5 pb-14 pt-20">
          <Eyebrow muted>// Programs · {programs.length} listed</Eyebrow>
          <h1 className="disp m-0 text-[clamp(2.75rem,6vw,5rem)] leading-none">
            Every program,
            <br />
            past and upcoming.
          </h1>
          <p className="m-0 max-w-[640px] text-lg leading-relaxed text-bl-ink-2">Competitions, immersions, studios and school partnerships — filter by what you’re looking for.</p>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-5 py-14">
          <div className="flex flex-wrap justify-between gap-3">
            <Eyebrow>{season.label}</Eyebrow>
            <span className="eyebrow text-[11px] text-bl-ink-3">◆ = deadline / session</span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/15">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[260px_30fr_31fr_31fr] border-b border-white/15">
                <span className="eyebrow px-5 py-3.5 text-[11px] text-[#8C929C]">Program</span>
                {["Nov", "Dec", "Jan"].map((m) => (
                  <span key={m} className="eyebrow border-l border-white/[.08] px-3 py-3.5 text-[11px] text-bl-ink-3">
                    {m}
                  </span>
                ))}
              </div>
              {season.rows.map((r) => (
                <div key={r.name} className="grid grid-cols-[260px_minmax(0,1fr)] border-b border-white/[.06] last:border-0">
                  <span className="px-5 py-4 text-sm text-[#D4D7DC]">{r.name}</span>
                  <div className="relative h-[52px] border-l border-white/[.08]">
                    {r.bar && (
                      <div
                        className="absolute top-3.5 flex h-6 items-center overflow-hidden rounded-md border border-bl-accent px-2.5"
                        style={{ left: pct(r.bar[0]), width: pct(r.bar[1] - r.bar[0]), background: r.solid ? "var(--bl-accent)" : "transparent" }}
                      >
                        <span className={`eyebrow whitespace-nowrap text-[10px] ${r.solid ? "text-bl-bg" : "text-bl-ink"}`}>{r.label}</span>
                      </div>
                    )}
                    {r.marks?.map(([d, l]) => (
                      <div key={l} className="absolute top-3 flex -translate-x-1.5 items-center gap-1.5" style={{ left: pct(d) }}>
                        <span className="text-sm text-bl-accent">◆</span>
                        <span className="eyebrow whitespace-nowrap text-[10px] text-bl-ink-2">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-8 pb-28 pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="tablist" aria-label="Status" className="flex gap-1 rounded-full border border-white/15 p-1">
              {VIEWS.map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={v === view}
                  onClick={() => setView(v)}
                  className={`min-h-11 rounded-full px-5 text-sm ${v === view ? "bg-bl-ink text-bl-bg" : "text-bl-ink-2"}`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={t === type}
                  onClick={() => setType(t)}
                  className={`eyebrow min-h-11 rounded-full border px-4 text-[11px] ${t === type ? "border-bl-accent text-bl-accent" : "border-white/20 text-bl-ink-2"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {shown.map((p) => (
              <SiteLink key={p.title} href={p.href} className="grid min-h-[260px] overflow-hidden rounded-[20px] border border-white/15 bg-bl-surface sm:grid-cols-[0.9fr_1.1fr]">
                <img src={p.img} alt="" loading="lazy" className="h-[200px] w-full object-cover sm:h-full" style={{ filter: p.upcoming ? "none" : "grayscale(1) brightness(.8)" }} />
                <div className="flex flex-col gap-3 p-6">
                  <div className="eyebrow flex justify-between gap-2 text-[10px]">
                    <span style={{ color: p.upcoming ? "var(--bl-accent)" : "var(--bl-ink-3)" }}>● {p.status}</span>
                    <span className="text-bl-ink-3">{p.type}</span>
                  </div>
                  <span className="disp text-xl leading-tight">{p.title}</span>
                  <span className="text-sm leading-relaxed text-[#B4B9C1]">{p.body}</span>
                  <div className="eyebrow mt-auto flex flex-wrap justify-between gap-2 border-t border-bl-line pt-3 text-[11px] text-bl-ink-2">
                    <span>{p.when}</span>
                    <span>{p.where}</span>
                  </div>
                </div>
              </SiteLink>
            ))}
          </div>
          {shown.length === 0 && <div className="rounded-2xl border border-dashed border-white/20 p-12 text-center text-bl-ink-3">No programs match these filters</div>}
        </Container>
      </section>

      <section className="border-t border-bl-line">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-10">
          <span className="disp text-[22px]">Want a program for your school?</span>
          <Button href="/partners" variant="light">
            Talk to us →
          </Button>
        </Container>
      </section>
    </Page>
  );
}
