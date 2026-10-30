import { createFileRoute } from "@tanstack/react-router";
import { event, jsonLd, pageHead } from "@/lib/seo";
import { seo } from "@/content/site";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import {
  MAccordion,
  MButton,
  MCard,
  MCarousel,
  MFacts,
  MHead,
  MList,
  MPage,
  MPhoto,
  MSection,
  firstSentence,
  mt,
  peopleRows,
  useAnchor,
} from "@/components/site/Mobile";
import { CountdownChips, EventLogos, MoreCue, PersonCard, useDaysLeft } from "@/components/site/Shared";
import { competitions as C, settings } from "@/content/site";

export const Route = createFileRoute("/competitions")({
  head: () => {
    const O = C.open;
    const listing = event({
      name: O.title,
      description: O.body,
      startDate: O.schema.startDate,
      endDate: O.schema.endDate,
      url: "/competitions",
      image: O.img,
      online: true,
      price: O.schema.price,
      currency: O.schema.currency,
    });
    return {
      ...pageHead({
        path: "/competitions",
        ...seo.pages.competitions,
      }),
      scripts: listing ? [jsonLd(listing)] : [],
    };
  },
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
    <article className="grid content-start items-center gap-5 border-t border-white/15 pt-6 md:gap-8 md:pt-10 lg:grid-cols-2">
      {photosFull ? (
        // Main photo shown uncropped on top; two smaller photos below.
        <div className={`grid grid-cols-2 gap-2 ${i % 2 ? "lg:order-2" : ""}`}>
          {a && <img src={a} alt="" loading="lazy" className="col-span-2 block h-[200px] w-full rounded-2xl object-cover md:h-auto md:object-fill" />}
          {b && <img src={b} alt="" loading="lazy" className="h-[110px] w-full rounded-2xl object-cover md:h-[170px]" />}
          {c && <img src={c} alt="" loading="lazy" className="h-[110px] w-full rounded-2xl object-cover md:h-[170px]" />}
        </div>
      ) : (
        <div className={`grid grid-cols-[1.5fr_1fr] grid-rows-[120px_120px] gap-2 md:grid-rows-[170px_170px] ${i % 2 ? "lg:order-2" : ""}`}>
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
        <h3 className="disp m-0 text-[length:calc(24px*var(--bl-hscale))] leading-tight md:text-[length:calc(30px*var(--bl-hscale))]">{e.title}</h3>
        <p className={body}>{e.body}</p>
        {children}
      </div>
    </article>
  );
}

function Competitions() {
  const seriesId = useAnchor("series", "desktop");
  return (
    <Page>
      <MobileCompetitions />
      <div className="hidden md:block">
      {/* Hero */}
      <section className="border-b border-bl-line">
        <Container className="grid items-end gap-8 pb-14 pt-14 md:gap-12 md:pt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="disp m-0 text-[length:calc(clamp(2.75rem,6vw,5.25rem)*var(--bl-hscale))] leading-none">
              {C.hero.title}
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-bl-ink-2">{C.hero.text}</p>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[130px_130px] gap-2.5 md:grid-rows-[200px_200px]">
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
      <section id={seriesId} className="border-b border-bl-line">
        <Container className="flex flex-col gap-12 py-16 md:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Eyebrow>{C.series.eyebrow}</Eyebrow>
              <h2 className="h2">{C.series.title}</h2>
            </div>
            <p className={`${body} lg:pt-8`}>{C.series.text}</p>
          </div>

          <div className="grid items-center overflow-hidden rounded-3xl border border-bl-accent bg-bl-surface lg:grid-cols-2">
            <img src={C.open.img} alt="" className="h-[200px] w-full object-cover sm:h-[440px]" style={{ objectPosition: "center 55%" }} />
            <div className="flex flex-col gap-4 p-6 sm:gap-5 sm:p-10">
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

          <Eyebrow className="md:pt-6">{C.seriesPastLabel}</Eyebrow>
          <div className="m-swipe flex flex-col gap-12">
            {C.seriesPast.map((e, i) => (
              <EventRow key={e.title} e={e} i={i}>
                <div className="pt-1">
                  <Button href={e.button.href} variant="ghost">
                    {e.button.label}
                  </Button>
                </div>
              </EventRow>
            ))}
          </div>
        </Container>
      </section>

      {/* Hackathons */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-12 py-16 md:py-24">
          <SectionHead eyebrow={C.moreHead.eyebrow} title={C.moreHead.title} />
          <div className="m-swipe flex flex-col gap-12">
            {C.hackathons.map((e, i) => (
              <EventRow key={e.title} e={e} i={i} photosFull>
                <EventLogos label={C.logosLabel} names={e.logos} extraNames={e.extraNames} />
              </EventRow>
            ))}
          </div>
        </Container>
      </section>

      {/* After the finals */}
      <section className="border-b border-bl-line">
        <Container className="grid items-center gap-8 py-16 md:gap-12 md:py-24 lg:grid-cols-2">
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
        <Container className="flex flex-col gap-10 py-16 md:py-24">
          <SectionHead eyebrow={C.judgesHead.eyebrow} title={C.judgesHead.title} />
          <div className="m-swipe m-swipe-sm grid grid-cols-2 gap-5 lg:grid-cols-4">
            {C.judges.slice(0, 8).map((j) => (
              <PersonCard key={j.key} personKey={j.key} role={j.role} />
            ))}
          </div>
          <MoreCue label={C.judgesMore.label} />
        </Container>
      </section>
      </div>
    </Page>
  );
}

function MobileCompetitions() {
  const O = C.open;
  const days = useDaysLeft(O.deadline);
  const seriesId = useAnchor("series", "phone");
  const facts = O.facts.map((f, i) => [O.factLabels[i] ?? "", f] as [string, string]);
  return (
    <MPage>
      <section className="flex flex-col gap-6">
        <MHead as="h1" title={C.hero.title} text={firstSentence(C.hero.text)} />
        <MPhoto src={C.hero.images[0] ?? ""} />
      </section>

      <MSection id={seriesId} eyebrow={C.series.eyebrow} title={C.series.title} text={firstSentence(C.series.text)}>
        <div className="px-5">
          <SiteLink href={O.button.href} className="m-card flex flex-col overflow-hidden rounded-2xl text-bl-ink no-underline">
            <img src={O.img} alt="" className="block aspect-[4/3] w-full object-cover" />
            <span className="flex flex-col gap-2 p-4">
              <span className={mt.eyebrow}>{O.label}</span>
              <span className={mt.card}>{O.title}</span>
              <span className={`${mt.body} line-clamp-3`}>{O.body}</span>
            </span>
          </SiteLink>
        </div>
        <MFacts rows={[...facts, [O.countdownLabel, `${days} ${settings.countdown.days.toLowerCase()}`]]} />
        <MButton href={O.button.href}>{O.button.label}</MButton>
      </MSection>

      <MSection eyebrow={C.seriesPastLabel}>
        <MCarousel items={C.seriesPast} label={C.seriesPastLabel}>
          {(e) => <MCard img={e.imgs[0]} eyebrow={e.when} title={e.title} meta={e.where} text={e.body} href={e.button.href} />}
        </MCarousel>
      </MSection>

      <MSection eyebrow={C.moreHead.eyebrow} title={C.moreHead.title}>
        <MCarousel items={C.hackathons} label={C.moreHead.title}>
          {(e) => <MCard img={e.imgs[0]} eyebrow={e.when} title={e.title} meta={e.where} text={e.body} />}
        </MCarousel>
      </MSection>

      <MSection eyebrow={C.afterHead.eyebrow} title={C.afterHead.title}>
        <MAccordion items={C.after.map((a) => ({ title: a.title, body: <p className={mt.body}>{a.body}</p> }))} />
      </MSection>

      <MSection eyebrow={C.judgesHead.eyebrow} title={C.judgesHead.title}>
        <MList rows={peopleRows(C.judges.slice(0, 4))} divided={false} />
        {C.mobileJudgesLink.trim() && <p className={`${mt.body} px-5`}>{C.mobileJudgesLink}</p>}
      </MSection>

    </MPage>
  );
}
