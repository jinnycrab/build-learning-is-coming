import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead } from "@/components/site/Layout";
import { AccentEnd, CountdownChips, EventLogos, PersonCard } from "@/components/site/Shared";
import { competitions as C } from "@/content/site";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: "Competitions & Hackathons — Build Learning" },
      {
        name: "description",
        content:
          "The Global Series — Global Cultures, Global Impact and Global Innovation — plus in-person hackathons. Register for the Global Innovation Challenge 2026.",
      },
      { property: "og:title", content: "Competitions & Hackathons — Build Learning" },
      {
        property: "og:description",
        content:
          "The Global Series — Global Cultures, Global Impact and Global Innovation — plus in-person hackathons.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Competitions,
});

const body = "m-0 text-[length:calc(16px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]";

/** Event card: photo collage on one side, text on the other. */
function EventRow({
  e,
  i,
  photosFull,
  children,
}: {
  e: { when: string; where: string; title: string; body: string; imgs: string[] };
  i: number;
  photosFull?: boolean;
  children?: React.ReactNode;
}) {
  const [a, b, c] = e.imgs;
  return (
    <article className="grid items-center gap-8 border-t border-white/15 pt-10 lg:grid-cols-2">
      {photosFull ? (
        // Main photo shown uncropped on top; two smaller photos below.
        <div className={`grid grid-cols-2 gap-2 ${i % 2 ? "lg:order-2" : ""}`}>
          {a && <img src={a} alt="" loading="lazy" className="col-span-2 block h-auto w-full rounded-2xl" />}
          {b && <img src={b} alt="" loading="lazy" className="h-[170px] w-full rounded-2xl object-cover" />}
          {c && <img src={c} alt="" loading="lazy" className="h-[170px] w-full rounded-2xl object-cover" />}
        </div>
      ) : (
        <div className={`grid grid-cols-[1.5fr_1fr] grid-rows-[170px_170px] gap-2 ${i % 2 ? "lg:order-2" : ""}`}>
          {a && <img src={a} alt="" loading="lazy" className="row-span-2 h-full w-full min-w-0 rounded-2xl object-cover" />}
          {b && <img src={b} alt="" loading="lazy" className="h-full w-full min-w-0 rounded-2xl object-cover" />}
          {c && <img src={c} alt="" loading="lazy" className="h-full w-full min-w-0 rounded-2xl object-cover" />}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="eyebrow flex flex-wrap gap-x-4 gap-y-2 text-[length:calc(11px*var(--bl-scale))]">
          <span className="text-bl-accent">{e.when}</span>
          <span className="text-bl-ink-3">{e.where}</span>
        </div>
        <h3 className="disp m-0 text-[length:calc(30px*var(--bl-hscale))] leading-tight">{e.title}</h3>
        <p className={body}>{e.body}</p>
        {children}
      </div>
    </article>
  );
}

function Competitions() {
  return (
    <Page>
      {/* Hero */}
      <section className="border-b border-bl-line">
        <Container className="grid items-end gap-12 pb-14 pt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="disp m-0 text-[length:calc(clamp(2.75rem,6vw,5.25rem)*var(--bl-hscale))] leading-none">
              {C.hero.title}
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-bl-ink-2">{C.hero.text}</p>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[200px_200px] gap-2.5">
            {C.hero.images.slice(0, 3).map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className={`h-full w-full min-w-0 rounded-2xl object-cover ${i === 0 ? "row-span-2" : ""}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Global Series */}
      <section id="series" className="border-b border-bl-line">
        <Container className="flex flex-col gap-12 py-24">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Eyebrow>{C.series.eyebrow}</Eyebrow>
              <h2 className="h2">{C.series.title}</h2>
            </div>
            <p className={`${body} lg:pt-8`}>{C.series.text}</p>
          </div>

          <div className="grid items-center overflow-hidden rounded-3xl border border-bl-accent bg-bl-surface lg:grid-cols-2">
            <img src={C.open.img} alt="" className="h-[300px] w-full object-cover sm:h-[440px]" style={{ objectPosition: "center 55%" }} />
            <div className="flex flex-col gap-5 p-8 sm:p-10">
              <Eyebrow>{C.open.label}</Eyebrow>
              <span className="disp text-[length:calc(32px*var(--bl-hscale))] leading-tight">{C.open.title}</span>
              <p className={body}>{C.open.body}</p>
              <div className="eyebrow flex flex-wrap gap-x-5 gap-y-2 text-[length:calc(11px*var(--bl-scale))] text-[#D4D7DC]">
                {C.open.facts.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-2 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                  {C.open.countdownLabel}
                </span>
                <CountdownChips iso={C.open.deadline} compact />
              </div>
              <div className="pt-1">
                <Button href={C.open.button.href}>{C.open.button.label}</Button>
              </div>
            </div>
          </div>

          <Eyebrow className="pt-6">{C.seriesPastLabel}</Eyebrow>
          {C.seriesPast.map((e, i) => (
            <EventRow key={e.title} e={e} i={i}>
              <div className="pt-1">
                <Button href={e.button.href} variant="ghost">
                  {e.button.label}
                </Button>
              </div>
            </EventRow>
          ))}
        </Container>
      </section>

      {/* Hackathons */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-12 py-24">
          <SectionHead eyebrow={C.moreHead.eyebrow} title={C.moreHead.title} />
          {C.hackathons.map((e, i) => (
            <EventRow key={e.title} e={e} i={i} photosFull>
              <EventLogos label={C.logosLabel} names={e.logos} extraNames={e.extraNames} />
            </EventRow>
          ))}
        </Container>
      </section>

      {/* After the finals */}
      <section className="border-b border-bl-line">
        <Container className="grid items-center gap-12 py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{C.afterHead.eyebrow}</Eyebrow>
            <h2 className="h2">{C.afterHead.title}</h2>
            <p className={body}>{C.afterHead.text}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {C.after.map((a) => (
              <div key={a.title} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-2xl border border-white/15 px-6 py-5">
                <span aria-hidden="true" className="text-bl-accent">
                  →
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-lg font-semibold">{a.title}</span>
                  <span className="text-sm leading-relaxed text-[#B4B9C1]">{a.body}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Judges */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24">
          <SectionHead eyebrow={C.judgesHead.eyebrow} title={C.judgesHead.title} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {C.judges.map((j) => (
              <PersonCard key={j.key} personKey={j.key} role={j.role} square />
            ))}
          </div>
          <p className="m-0 border-t border-bl-line pt-5 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
            <span className="eyebrow mr-3 text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">
              {C.pastJudgesLabel}
            </span>
            {C.pastJudges}
          </p>
        </Container>
      </section>

      {/* Closing */}
      <section>
        <Container className="flex flex-wrap items-end justify-between gap-8 py-24">
          <h2 className="disp m-0 max-w-[760px] text-[length:calc(clamp(2.5rem,5vw,4.5rem)*var(--bl-hscale))] leading-[1.02]">
            <AccentEnd text={C.closing.title} />
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={C.closing.primary.href}>{C.closing.primary.label}</Button>
            <Button href={C.closing.secondary.href} variant="ghost">
              {C.closing.secondary.label}
            </Button>
          </div>
        </Container>
      </section>
    </Page>
  );
}
