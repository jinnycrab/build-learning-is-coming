import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Button, Container, Eyebrow, Page, SiteLink } from "@/components/site/Layout";
import {
  MAccordion,
  MCard,
  MCarousel,
  MChecks,
  MHead,
  MPage,
  MPhoto,
  MSection,
  firstSentence,
  mt,
} from "@/components/site/Mobile";
import { useScrollProgress } from "@/components/site/hooks";
import { programs, programsPage as PG, settings, type Program } from "@/content/site";

export const Route = createFileRoute("/programs")({
  head: () =>
    pageHead({
      path: "/programs",
      title: "Programs — Build Learning",
      description:
        "Our flagship Passion Project Studio, plus competitions, immersions and school programs throughout the year.",
      image: "/img/og/programs.jpg",
    }),
  component: Programs,
});

function Programs() {
  const upcoming = programs.filter((p) => p.upcoming);
  const past = programs.filter((p) => !p.upcoming);
  return (
    <Page>
      <MobilePrograms />
      <div className="hidden md:block">
      <section className="relative border-b border-bl-line">
        <img
          src={PG.heroImage}
          alt={PG.heroAlt}
          className="block h-[420px] w-full object-cover sm:h-[560px]"
          style={{ objectPosition: "center 45%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bl-bg/15 via-bl-bg/35 to-bl-bg/95" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="flex flex-col gap-4 pb-12">
            <h1 className="disp m-0 text-[length:calc(clamp(2.75rem,6vw,5rem)*var(--bl-hscale))] leading-none">
              {PG.title}
            </h1>
            <p className="m-0 max-w-[600px] text-lg leading-relaxed text-[#D4D7DC]">{PG.text}</p>
          </Container>
        </div>
      </section>

      <Studio />

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-12 py-16 md:py-24">
          <div className="flex max-w-[760px] flex-col gap-4">
            <Eyebrow>{PG.events.eyebrow}</Eyebrow>
            <h2 className="h2">{PG.events.title}</h2>
          </div>
          {upcoming.length > 0 && <ProgramGroup label={PG.events.upcomingLabel} list={upcoming} />}
          {past.length > 0 && <ProgramGroup label={PG.events.pastLabel} list={past} />}
        </Container>
      </section>
      </div>
    </Page>
  );
}

function MobilePrograms() {
  const S = PG.studio;
  const upcoming = programs.filter((p) => p.upcoming);
  const past = programs.filter((p) => !p.upcoming);
  return (
    <MPage>
      <section className="flex flex-col gap-6">
        <MHead as="h1" title={PG.title} text={firstSentence(PG.text)} />
        <MPhoto src={PG.heroImage} alt={PG.heroAlt} />
      </section>

      <MSection eyebrow={S.eyebrow} title={S.title} text={S.text}>
        <MCarousel items={S.gallery} label={S.title}>
          {(g) => <img src={g.src} alt={g.alt} loading="lazy" className="block aspect-[4/3] w-full rounded-xl object-cover" />}
        </MCarousel>
        <MAccordion
          items={[
            { title: S.factsLabel, body: <MChecks items={S.facts} /> },
            { title: S.outcomesLabel, body: <MChecks items={S.outcomes} /> },
          ]}
        />
      </MSection>

      <MSection eyebrow={PG.events.eyebrow} title={PG.events.title}>
        {upcoming.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className={`${mt.statLabel} px-5`}>{PG.events.upcomingLabel}</span>
            <MCarousel items={upcoming} label={PG.events.upcomingLabel}>
              {(p) => <MCard img={p.img} eyebrow={p.status} title={p.title} meta={`${p.when} · ${p.where}`} href={p.href} />}
            </MCarousel>
          </div>
        )}
        {past.length > 0 && (
          <div className="flex flex-col gap-4">
            <span className={`${mt.statLabel} px-5`}>{PG.events.pastLabel}</span>
            <MAccordion
              items={past.map((p) => ({
                title: p.title,
                text: `${p.when} · ${p.where}`,
                thumb: p.img,
                body: <p className={mt.body}>{p.body}</p>,
              }))}
            />
          </div>
        )}
      </MSection>

    </MPage>
  );
}

function Studio() {
  const S = PG.studio;
  const { ref, p } = useScrollProgress<HTMLDivElement>();
  return (
    <section className="border-b border-bl-line">
      <Container className="grid items-start gap-10 pb-14 pt-14 md:gap-16 md:pt-20 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Eyebrow>{S.eyebrow}</Eyebrow>
          <h2 className="disp m-0 text-[length:calc(clamp(2.25rem,4vw,3.25rem)*var(--bl-hscale))] leading-[1.05]">
            {S.title}
          </h2>
          <p className="m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
            {S.text}
          </p>
          <div className="eyebrow flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2">
            {S.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <div className="pt-2">
            {/* Always opens an email to Build Learning, with the subject filled in. */}
            <Button href={`mailto:${settings.email}?subject=${encodeURIComponent(S.button.emailSubject)}`}>
              {S.button.label}
            </Button>
          </div>
        </div>
        <ol className="m-0 list-none border-b border-white/15 p-0">
          {S.outcomes.map((o) => (
            <li key={o} className="grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-3 border-t border-white/15 py-5">
              <span aria-hidden="true" className="text-bl-accent">
                →
              </span>
              <span className="text-lg leading-snug">{o}</span>
            </li>
          ))}
        </ol>
      </Container>
      {/* Photos shown uncropped; the strip slides left as you scroll. */}
      <div ref={ref} className="overflow-hidden pb-16 md:pb-24">
        <div
          className="flex w-max gap-3.5 pl-5 pr-10 will-change-transform sm:pl-10 lg:pl-[max(40px,calc((100vw-1320px)/2+40px))]"
          style={{ transform: `translateX(${(-p * 45).toFixed(2)}%)` }}
        >
          {S.gallery.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="block h-[260px] w-auto shrink-0 rounded-2xl border border-bl-line sm:h-[380px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramGroup({ label, list }: { label: string; list: Program[] }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2">{label}</span>
      <div className="m-swipe grid auto-rows-fr gap-4 md:grid-cols-2">
        {list.map((p) => (
          <SiteLink
            key={p.title}
            href={p.href}
            className="grid min-h-[260px] grid-rows-[auto_1fr] overflow-hidden rounded-[20px] border border-white/15 bg-bl-surface md:min-h-[360px] md:grid-cols-[0.9fr_1.1fr] md:grid-rows-1"
          >
            <img
              src={p.img}
              alt=""
              loading="lazy"
              className="h-[180px] w-full object-cover md:h-0 md:min-h-full"
              style={{ filter: p.upcoming ? "none" : "grayscale(1) brightness(.8)" }}
            />
            <div className="flex flex-col gap-3 p-6">
              <div className="eyebrow flex justify-between gap-2 text-[length:calc(10px*var(--bl-scale))]">
                <span style={{ color: p.upcoming ? "var(--bl-accent)" : "var(--bl-ink-3)" }}>● {p.status}</span>
                <span className="text-bl-ink-3">{p.type}</span>
              </div>
              <span className="disp text-[length:calc(20px*var(--bl-scale))] leading-tight">{p.title}</span>
              <span className="text-sm leading-relaxed text-[#B4B9C1]">{p.body}</span>
              <div className="eyebrow mt-auto flex flex-wrap justify-between gap-2 border-t border-bl-line pt-3 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2">
                <span>{p.when}</span>
                <span>{p.where}</span>
              </div>
            </div>
          </SiteLink>
        ))}
      </div>
    </div>
  );
}
