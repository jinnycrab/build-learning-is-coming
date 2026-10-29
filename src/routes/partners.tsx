import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Button, Container, Eyebrow, Page, SectionHead } from "@/components/site/Layout";
import { EventLogos, LogoMarquee } from "@/components/site/Shared";
import { partnersPage as PP } from "@/content/site";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Schools & Partners — Build Learning" },
      {
        name: "description",
        content:
          "Workshops, AI camps, hackathons and immersions for schools, plus ways for organisations to sponsor, set briefs, judge and mentor.",
      },
      { property: "og:title", content: "Schools & Partners — Build Learning" },
      { property: "og:description", content: "Workshops, AI camps, hackathons and immersions for schools, plus ways for organisations to sponsor, set briefs, judge and mentor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partners,
});

function Partners() {
  const H = PP.hero;
  return (
    <Page>
      <section className="relative overflow-hidden border-b border-bl-line">
        <img src={H.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bl-bg/95 via-bl-bg/75 to-bl-bg/30" />
        <Container className="relative flex min-h-[460px] flex-col justify-center gap-6 py-14 md:min-h-[560px] md:py-20">
          {H.eyebrow && <Eyebrow>{H.eyebrow}</Eyebrow>}
          <h1 className="disp m-0 max-w-[820px] text-[length:calc(clamp(2.5rem,5.5vw,4.75rem)*var(--bl-hscale))] leading-[1.02]">
            {H.title}
          </h1>
          <p className="m-0 max-w-[560px] text-lg leading-relaxed text-[#D4D7DC]">{H.text}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={H.primary.href}>{H.primary.label}</Button>
            <Button href={H.secondary.href} variant="ghost">
              {H.secondary.label}
            </Button>
          </div>
        </Container>
      </section>

      <LogoMarquee label={PP.logoStripLabel} />

      <section id="pca" className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
          <SectionHead eyebrow={PP.pca.eyebrow} title={PP.pca.title}>
            <p className="m-0 max-w-[640px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-2">
              {PP.pca.intro}
            </p>
          </SectionHead>
          <div className="m-swipe grid auto-rows-[200px] grid-cols-2 gap-3 lg:grid-cols-4">
            {PP.pca.imgs.map((src, i) => (
              <div key={src} className={`h-[220px] overflow-hidden rounded-2xl md:h-auto ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={src} alt={PP.pca.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="m-swipe grid gap-4 md:grid-cols-2">
            {PP.pca.programs.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 rounded-[18px] border border-white/15 bg-bl-surface p-6">
                <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">{p.tag}</span>
                <h3 className="m-0 text-xl font-semibold">{p.title}</h3>
                <p className="m-0 flex-1 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-bl-ink-3">{p.body}</p>
                <EventLogos label={PP.logosLabel} names={p.logos} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="schools" className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
          <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
              <Eyebrow>{PP.schoolsHead.eyebrow}</Eyebrow>
              <h2 className="h2">{PP.schoolsHead.title}</h2>
            </div>
            <p className="m-0 max-w-[560px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-2">
              {PP.schoolsHead.text}
            </p>
          </div>
          {/* Columns follow the number of formats in the CMS, so removing one never leaves a gap. */}
          <div
            className="m-swipe grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
            style={{ "--cols": Math.min(Math.max(PP.schools.length, 1), 5) } as CSSProperties}
          >
            {PP.schools.map((s) => (
              <div key={s.title} className="flex flex-col overflow-hidden rounded-[18px] border border-white/15 bg-bl-surface">
                <img src={s.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="m-0 text-lg font-semibold">{s.title}</h3>
                  <p className="m-0 flex-1 text-sm leading-relaxed text-bl-ink-3">{s.body}</p>
                  <div className="eyebrow flex justify-between gap-2 border-t border-bl-line pt-3 text-[length:calc(10px*var(--bl-scale))]">
                    <span className="text-bl-accent">{s.format}</span>
                    <span className="text-bl-ink-3">{s.who}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </Page>
  );
}
