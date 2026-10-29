import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import { CountUpStats, LogoMarquee, MoreCue, PersonCard, useDaysLeft } from "@/components/site/Shared";
import { useScrollProgress } from "@/components/site/hooks";
import { ARCHIVES_URL, home, stats, studentWork } from "@/content/site";
import {
  MAccordion,
  MButton,
  MCard,
  MCarousel,
  MLink,
  MList,
  MLogos,
  MPage,
  MSection,
  MStats,
  mt,
  peopleRows,
} from "@/components/site/Mobile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Learning — Portfolio building with industry mentors" },
      {
        name: "description",
        content:
          "Programs, global competitions and learning immersions where students build real projects with industry mentors — and the human skills AI can’t replace.",
      },
      { property: "og:title", content: "Build Learning — Portfolio building with industry mentors" },
      {
        property: "og:description",
        content:
          "Programs, global competitions and learning immersions where students build real projects with industry mentors — and the human skills AI can’t replace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Page>
      <MobileHome />
      <div className="hidden md:block">
      <Hero />
      <Filmstrip />
      <LogoMarquee
        heading={
          <Container className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-2 pt-7 text-center">
            <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
              {home.logoStrip.label}
            </span>
            {home.logoStrip.link.label.trim() && <SiteLink
              href={home.logoStrip.link.href}
              className="eyebrow text-[length:calc(11px*var(--bl-scale))]"
            >
              {home.logoStrip.link.label}
            </SiteLink>}
          </Container>
        }
      />
      <Pathways />
      <HumanStack />
      <Method />
      <StudentWork />
      <WorldMap />
      <Team />
      </div>
    </Page>
  );
}

/* ───────── Phone layout ───────── */

/** The desktop photo rows, sized for phones: two rows drifting on their own, in opposite directions. */
function PhoneFilmstrip() {
  return (
    <section aria-label="Moments from our programs" className="flex flex-col gap-2 overflow-hidden">
      {home.filmstrip.map((row, r) => (
        <div key={r} className={`m-film flex w-max gap-2 pr-2 will-change-transform ${r % 2 ? "rev" : ""}`}>
          {[...row, ...row].map((im, k) => (
            <img
              key={k}
              src={im.src}
              alt={k < row.length ? im.alt : ""}
              aria-hidden={k >= row.length || undefined}
              loading="lazy"
              className="h-[132px] shrink-0 rounded-xl object-cover"
              style={{ width: Math.round(im.w * 0.55) }}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
function MobileHome() {
  const M = home.mobile;
  const days = useDaysLeft(home.nextUp.deadline);
  const words = home.headline.filter(Boolean);
  const works = studentWork.slice(0, Math.max(1, M.studentWorkLimit));
  return (
    <MPage>
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-5">
          {home.eyebrow && <span className={mt.eyebrow}>{home.eyebrow}</span>}
          <h1 className={mt.title}>
            {words.map((w, i) => (
              <span key={w + i} className={i === words.length - 1 ? "text-bl-accent" : ""}>
                {w}{" "}
              </span>
            ))}
          </h1>
          <p className={`${mt.body} line-clamp-3`}>{M.intro}</p>
        </div>
        <div className="flex flex-col gap-2">
          <MButton href={M.primary.href}>{M.primary.label}</MButton>
          <MLink href={M.secondary.href} center>
            {M.secondary.label}
          </MLink>
        </div>
      </section>

      <PhoneFilmstrip />

      {/* Next up */}
      <div className="px-5">
        <SiteLink href={home.nextUp.href} className="m-card flex flex-col gap-4 rounded-2xl p-4 text-bl-ink no-underline">
          <span className="flex flex-col gap-2">
            <span className={mt.eyebrow}>{home.nextUp.tag}</span>
            <span className={mt.card}>{home.nextUp.title}</span>
            <span className={mt.meta}>{home.nextUp.meta}</span>
          </span>
          <span className="grid grid-cols-2 gap-4">
            <span className="flex flex-col gap-2">
              <span className={mt.stat}>{days}</span>
              <span className={mt.statLabel}>{home.nextUp.daysLabel}</span>
            </span>
            <span className="flex flex-col gap-2">
              <span className={mt.stat}>{home.nextUp.award}</span>
              <span className={mt.statLabel}>{home.nextUp.awardLabel}</span>
            </span>
          </span>
        </SiteLink>
      </div>

      <MStats items={stats} />

      <MLogos label={home.logoStrip.label} />

      <MSection eyebrow={M.programs.eyebrow} title={M.programs.title}>
        <MList
          rows={M.programs.items.map((it, i) => ({
            title: it.title,
            text: it.text,
            href: it.href,
            thumb: it.img || home.pathways[i]?.img,
          }))}
        />
      </MSection>

      <MSection eyebrow={home.studentWorkHead.eyebrow} title={home.studentWorkHead.title}>
        <MCarousel items={works} label={home.studentWorkHead.title}>
          {(w) => (
            <MCard img={w.cover} eyebrow={w.category} title={w.title} meta={w.by} href={w.href || ARCHIVES_URL} />
          )}
        </MCarousel>
        <MLink href={M.studentWorkLink.href}>{M.studentWorkLink.label}</MLink>
      </MSection>

      <MSection eyebrow={M.skills.eyebrow} title={M.skills.title}>
        <MAccordion items={home.humanStack.map((s) => ({ title: s.title, body: <p className={mt.body}>{s.body}</p> }))} />
      </MSection>

      <MSection eyebrow={home.method.eyebrow} title={home.method.title}>
        <div className="flex flex-col gap-4 px-5">
          {home.method.paragraphs.map((t, i) => (
            <p key={i} className={mt.body}>
              {t}
            </p>
          ))}
        </div>
        <MCarousel items={home.method.photos} label={home.method.title}>
          {(ph) => <img src={ph.src} alt={ph.alt} loading="lazy" className="block aspect-[4/3] w-full rounded-xl object-cover" />}
        </MCarousel>
      </MSection>

      <MSection eyebrow={home.teamHead.eyebrow} title={home.teamHead.title}>
        <MList rows={peopleRows(home.team.slice(0, Math.max(1, M.mentorsLimit)))} divided={false} />
        {M.mentorsMore.trim() && <p className={`${mt.body} px-5`}>{M.mentorsMore}</p>}
      </MSection>
    </MPage>
  );
}

const body17 = "m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]";

/* ───────── Hero ───────── */
function Hero() {
  const days = useDaysLeft(home.nextUp.deadline);
  const words = home.headline.filter(Boolean);
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="grid items-center gap-8 pb-8 pt-10 sm:gap-10 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10 lg:pb-10 lg:pt-14">
        <div className="relative flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-start-1 lg:row-start-1">
          {home.eyebrow && <Eyebrow muted>{home.eyebrow}</Eyebrow>}
          <h1
            className="disp home-headline m-0 text-[length:calc(2.25rem*var(--bl-hscale))] leading-[1.08] sm:text-[length:calc(3rem*var(--bl-hscale))] lg:text-[length:calc(3.5rem*var(--bl-hscale))] xl:text-[length:calc(4rem*var(--bl-hscale))]"
            aria-label={words.join(" ")}
          >
            {words.map((w, i) => (
              <span key={w + i} aria-hidden="true">
                <span
                  className={`w max-w-full ${i === words.length - 1 ? "text-bl-accent" : ""}`}
                  style={{ animationDelay: `${0.05 + i * 0.17}s` }}
                >
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>
        <div className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          <p
            className="fade-up m-0 max-w-[560px] text-base leading-relaxed text-bl-ink-2 sm:text-lg"
            style={{ animationDelay: ".85s" }}
          >
            {home.intro}
          </p>
          <div className="grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Button href={home.heroButtons.primary.href}>{home.heroButtons.primary.label}</Button>
            <Button href={home.heroButtons.secondary.href} variant="ghost">
              {home.heroButtons.secondary.label}
            </Button>
          </div>
        </div>
        <div className="relative w-full min-w-0 lg:col-start-2 lg:row-start-1">
          <img
            src={home.heroImage}
            alt={home.heroAlt}
            className="block h-auto w-full rounded-lg border border-bl-line"
          />
        </div>
        <SiteLink
          href={home.nextUp.href}
          className="flex w-full min-w-0 flex-col gap-2.5 rounded-lg border border-bl-line bg-bl-surface/95 p-5 lg:col-start-2 lg:row-start-2 lg:self-start"
        >
          <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-accent">
            ● {home.nextUp.tag}
          </span>
          <span className="disp text-lg leading-tight">{home.nextUp.title}</span>
          <span className="text-[length:calc(13px*var(--bl-scale))] text-bl-ink-3">
            {home.nextUp.meta}
          </span>
          <span className="flex gap-8 border-t border-bl-line pt-2.5">
            <span>
              <span className="disp block text-[length:calc(28px*var(--bl-scale))] tabular-nums">
                {days}
              </span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                {home.nextUp.daysLabel}
              </span>
            </span>
            <span>
              <span className="disp block text-[length:calc(28px*var(--bl-scale))]">
                {home.nextUp.award}
              </span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                {home.nextUp.awardLabel}
              </span>
            </span>
          </span>
        </SiteLink>
      </Container>
      <Container>
        <CountUpStats />
      </Container>
    </section>
  );
}

/* ───────── Filmstrip (glides right on scroll) ───────── */
function Filmstrip() {
  const { ref, p } = useScrollProgress<HTMLElement>();
  return (
    <section
      ref={ref}
      aria-label="Moments from our programs"
      className="flex flex-col gap-2.5 overflow-hidden border-b border-bl-line py-2.5"
    >
      {home.filmstrip.map((row, r) => (
        <div
          key={r}
          className="flex w-max gap-2.5 pl-2.5 will-change-transform"
          style={{
            transform: `translateX(${(r === 0 ? -34 + 30 * p : -22 + 20 * p).toFixed(2)}%)`,
          }}
        >
          {row.map((im, k) => (
            <img
              key={k}
              src={im.src}
              alt={im.alt}
              loading="lazy"
              className="h-[200px] shrink-0 rounded-[14px] object-cover sm:h-[260px]"
              style={{ width: im.w }}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

/* ───────── Pathways (sticky stacking cards) ───────── */
function Pathways() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-12 py-16 md:py-24 lg:py-28">
        <SectionHead
          eyebrow={home.pathwaysHead.eyebrow}
          title={home.pathwaysHead.title}
          aside={<p className={`${body17} max-w-[520px]`}>{home.pathwaysHead.text}</p>}
        />
        <div className="m-swipe flex flex-col gap-7">
          {home.pathways.map((c, i) => (
            <SiteLink
              key={c.title + i}
              href={c.href}
              className="stack-card grid gap-5 rounded-3xl md:min-h-[420px] md:gap-7 border border-white/15 bg-bl-surface p-3.5 shadow-[0_-20px_40px_rgba(0,0,0,.45)] md:sticky md:grid-cols-2"
              style={{ top: 96 + i * 28 }}
            >
              <div className="pv min-h-[200px] rounded-2xl md:min-h-[380px]">
                <img
                  className="pv-a absolute inset-0 h-full w-full object-cover"
                  src={c.img}
                  alt=""
                  loading="lazy"
                />
                <img className="pv-b h-full w-full object-cover" src={c.img2} alt="" loading="lazy" />
              </div>
              <div className="flex flex-col justify-start gap-3 p-3 md:justify-center md:gap-4 md:p-5 md:pl-1">
                <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-accent">
                  {c.tag}
                </span>
                <span className="disp text-[length:calc(clamp(1.75rem,3vw,2.4rem)*var(--bl-hscale))] leading-[1.08]">
                  {c.title}
                </span>
                <span className="text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#B4B9C1] md:text-[length:calc(17px*var(--bl-scale))]">
                  {c.body}
                </span>
                <span className="eyebrow border-t border-bl-line pt-3.5 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2">
                  {c.meta}
                </span>
                <span className="text-[length:calc(15px*var(--bl-scale))] font-semibold text-bl-accent">
                  {home.pathwaysLinkLabel}
                </span>
              </div>
            </SiteLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Human skills ───────── */
function HumanStack() {
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="grid items-start gap-x-16 gap-y-8 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Eyebrow>{home.humanStackHead.eyebrow}</Eyebrow>
          <h2 className="h2">{home.humanStackHead.title}</h2>
        </div>
        <div className="flex flex-col gap-5">
          <p className={body17}>{home.humanStackHead.text}</p>
          {home.humanStackPhoto.src && (
            <img
              src={home.humanStackPhoto.src}
              alt={home.humanStackPhoto.alt}
              loading="lazy"
              className="mt-2 block h-auto w-full rounded-2xl border border-white/10"
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          {home.humanStack.map((l) => (
            <div
              key={l.title}
              className="grid items-center gap-2 rounded-[14px] border border-white/15 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-4"
            >
              <span className="disp text-lg">{l.title}</span>
              <span className="text-sm leading-snug text-[#B4B9C1]">{l.body}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Method (photo collage) ───────── */
function Method() {
  const m = home.method;
  const [big, ...rest] = m.photos;
  const tile = "overflow-hidden rounded-[14px] border border-bl-line";
  const img = "h-full w-full object-cover";
  // Positions for the five smaller photos around the large one.
  const spots = [
    "col-start-3 row-start-1",
    "col-start-3 row-start-2",
    "col-start-3 row-start-3",
    "col-span-2 col-start-1 row-start-4",
    "col-start-3 row-start-4",
  ];
  return (
    <section className="border-b border-bl-line">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex max-w-[520px] flex-col gap-6">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 className="h2">{m.title}</h2>
          {m.paragraphs.map((t, i) => (
            <p key={i} className={body17}>
              {t}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-[repeat(4,110px)] gap-2.5 sm:grid-rows-[repeat(4,150px)]">
          {big && (
            <div className={`${tile} col-span-2 row-span-3`}>
              <img src={big.src} alt={big.alt} loading="lazy" className={img} style={{ objectPosition: "center 62%" }} />
            </div>
          )}
          {rest.slice(0, 5).map((p, i) => (
            <div key={p.src + i} className={`${tile} ${spots[i]}`}>
              <img src={p.src} alt={p.alt} loading="lazy" className={img} style={{ objectPosition: "center 35%" }} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Student work (glides right, settles in view) ───────── */
function StudentWork() {
  const { ref, p } = useScrollProgress<HTMLDivElement>("enter");
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="flex flex-col gap-10 pb-10 pt-16 md:pt-24 lg:pt-28">
        <SectionHead
          eyebrow={home.studentWorkHead.eyebrow}
          title={home.studentWorkHead.title}
          aside={
            <Button href={home.studentWorkHead.button.href} variant="ghost">
              {home.studentWorkHead.button.label}
            </Button>
          }
        />
      </Container>
      <div className="overflow-x-auto pb-16 md:pb-24 [scrollbar-width:none] lg:overflow-hidden lg:pb-28">
        <div
          ref={ref}
          className="flex w-max gap-4 pl-5 pr-5 will-change-transform sm:pl-10 lg:pl-[max(40px,calc((100vw-1320px)/2+40px))]"
          style={{ transform: `translateX(${(-(1 - p) * 30).toFixed(2)}%)` }}
        >
          {studentWork.map((w) => (
            <SiteLink key={w.title} href={w.href || ARCHIVES_URL} className="flex w-[320px] shrink-0 flex-col gap-3 sm:w-[400px]">
              <img
                src={w.cover}
                alt={`Cover of ${w.title}`}
                loading="lazy"
                className="block h-[208px] w-full rounded-2xl border border-white/10 object-cover sm:h-[260px]"
              />
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
                {w.category}
              </span>
              <span className="disp text-[length:calc(17px*var(--bl-scale))] leading-tight">{w.title}</span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">{w.by}</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── World map with flags ───────── */
// The map image covers longitude -135…160 and latitude 64…-24.
const MAP = { lon0: -135, lon1: 160, lat0: 64, lat1: -24 };

function WorldMap() {
  const count = home.pins.length;
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{home.pinsHead.eyebrow}</Eyebrow>
            <h2 className="h2">{home.pinsHead.title}</h2>
          </div>
          <div className="flex flex-col gap-3.5">
            <p className={body17}>{home.pinsHead.text.replaceAll("{count}", String(count))}</p>
            <div className="eyebrow grid gap-3 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2 sm:flex sm:gap-5">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-bl-accent" />
                {home.pinsHead.hubLabel}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-bl-green" />
                {home.pinsHead.countryLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="relative my-3 aspect-[2400/715] w-full">
          <img src="/img/worldmap.png" alt="" className="absolute inset-0 h-full w-full" />
          {home.pins.map((p) => {
            const c = p.hub ? "var(--bl-accent)" : "var(--bl-green)";
            return (
              <span
                key={p.name}
                className={`pin absolute h-0 w-0 ${p.hub ? "hub" : ""}`}
                title={p.name}
                style={{
                  left: `${((p.lon - MAP.lon0) / (MAP.lon1 - MAP.lon0)) * 100}%`,
                  top: `${((MAP.lat0 - p.lat) / (MAP.lat0 - MAP.lat1)) * 100}%`,
                }}
              >
                <span className="ring" style={{ background: c }} />
                <img
                  src={p.flag}
                  alt=""
                  className={`absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ${p.hub ? "h-9 w-9 sm:h-[58px] sm:w-[58px]" : "h-6 w-6 sm:h-[42px] sm:w-[42px]"}`}
                  style={{ boxShadow: `0 0 0 2px ${c}, 0 0 0 5px var(--bl-bg), 0 6px 18px rgba(0,0,0,.6)` }}
                />
                <span
                  className={`lbl eyebrow absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-bl-bg/90 px-2 py-1 text-[length:calc(10px*var(--bl-scale))] sm:block ${p.hub ? "top-[37px]" : "top-[27px]"}`}
                >
                  {p.name}
                </span>
              </span>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Team ───────── */
function Team() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
        <SectionHead eyebrow={home.teamHead.eyebrow} title={home.teamHead.title} />
        <div className="m-swipe m-swipe-sm grid grid-cols-2 gap-5 lg:grid-cols-4">
          {home.team.map((k) => (
            <PersonCard key={k} personKey={k} />
          ))}
        </div>
        <MoreCue label={home.teamMore.label} href={home.teamMore.href} />
      </Container>
    </section>
  );
}
