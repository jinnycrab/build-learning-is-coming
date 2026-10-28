import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import { AccentEnd, CountUpStats, LogoMarquee, PersonCard, useDaysLeft } from "@/components/site/Shared";
import { useScrollProgress } from "@/components/site/hooks";
import { ARCHIVES_URL, home, studentWork } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Learning — Build what AI can’t" },
      {
        name: "description",
        content:
          "Programs, global competitions and learning immersions where students build real projects with industry mentors — and the human skills AI can’t replace.",
      },
      { property: "og:title", content: "Build Learning — Build what AI can’t" },
      { property: "og:description", content: "Programs, global competitions and learning immersions where students build real projects with industry mentors — and the human skills AI can’t replace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <Page>
      <Hero />
      <Filmstrip />
      <LogoMarquee />
      <Pathways />
      <HumanStack />
      <Upcoming />
      <Method />
      <StudentWork />
      <WorldMap />
      <Testimonials />
      <Audiences />
      <Team />
      <ClosingCta />
    </Page>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  const [reel, setReel] = useState(false);
  const closeReel = useCallback(() => setReel(false), []);
  const days = useDaysLeft(home.nextUp.deadline);
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="grid items-center gap-8 pb-8 pt-10 sm:gap-10 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10 lg:pb-10 lg:pt-14">
        <div className="relative flex min-w-0 flex-col gap-5 sm:gap-6 lg:col-start-1 lg:row-start-1">
          {home.eyebrow && <Eyebrow muted className="lg:absolute lg:bottom-full lg:mb-6">{home.eyebrow}</Eyebrow>}
          <h1
            className="disp home-headline m-0 text-[length:calc(2.25rem*var(--bl-hscale))] leading-[1.08] sm:text-[length:calc(3rem*var(--bl-hscale))] lg:text-[length:calc(3.5rem*var(--bl-hscale))] xl:text-[length:calc(4rem*var(--bl-hscale))]"
            aria-label={home.headline.join(" ")}
          >
            {home.headline.map((w, i) => (
              <span key={w} aria-hidden="true">
                <span
                  className={`w max-w-full ${i === home.headline.length - 1 ? "text-bl-accent" : ""}`}
                  style={{
                    animationDelay: `${0.05 + i * 0.17}s`,
                  }}
                >
                  {w}
                </span>
                {" "}
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
            <Button href="/programs">Explore programs →</Button>
            <Button href={ARCHIVES_URL} variant="ghost">
              See student work ↗
            </Button>
          </div>
        </div>
          <div className="relative min-w-0 w-full lg:col-start-2 lg:row-start-1">
          <img
            src={home.heroImage}
            alt="More than a hundred students at the Build for Impact 2026 hackathon"
            className="block h-auto w-full rounded-lg border border-bl-line"
          />
          <button
            type="button"
            onClick={() => setReel(true)}
            className="eyebrow absolute right-3 top-3 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-bl-line bg-bl-bg/75 py-1.5 pl-1.5 pr-4 text-[length:calc(11px*var(--bl-scale))] backdrop-blur hover:border-bl-yellow"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bl-accent">
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3 1.5v9l7.5-4.5z" fill="var(--bl-bg)" />
              </svg>
            </span>
            Play reel
          </button>
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
            <span className="flex gap-5 border-t border-bl-line pt-2.5">
              <span>
                <span className="disp block text-[length:calc(28px*var(--bl-scale))] tabular-nums">
                  {days}
                </span>
                <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                  days to register
                </span>
              </span>
              <span>
                <span className="disp block text-[length:calc(28px*var(--bl-scale))]">
                  {home.nextUp.award}
                </span>
                <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                  seed award
                </span>
              </span>
            </span>
          </SiteLink>
      </Container>
      <Container className="pb-10 pt-6 lg:pt-0">
        <CountUpStats />
      </Container>
      {reel && <Reel onClose={closeReel} />}
    </section>
  );
}

function Reel({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const n = home.reel.length;
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % n), 3200);
    return () => clearInterval(id);
  }, [i, n]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const cur = home.reel[i] ?? home.reel[0]!;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Build Learning highlight reel"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[rgba(4,5,7,.95)] p-6"
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
          Highlight reel · {i + 1} / {n}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reel"
          className="h-11 w-11 rounded-full border border-white/30 text-xl"
        >
          ×
        </button>
      </div>
      <div className="relative aspect-video max-h-[72vh] w-full max-w-[1200px] overflow-hidden rounded-[18px] bg-black">
        {home.reel.map((s, k) => (
          <img
            key={s.src + k}
            src={s.src}
            alt={s.caption}
            className="reel-slide"
            style={{ opacity: k === i ? 1 : 0, transform: `scale(${k === i ? 1.08 : 1})` }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-7 pb-6 pt-16">
          <div className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-accent">
            {cur.tag}
          </div>
          <div className="disp mt-1.5 text-[length:calc(26px*var(--bl-scale))]">{cur.caption}</div>
        </div>
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setI((i - 1 + n) % n)}
          className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-bl-bg/70 text-xl"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setI((i + 1) % n)}
          className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-bl-bg/70 text-xl"
        >
          ›
        </button>
      </div>
      <div className="flex w-full max-w-[1200px] gap-1.5">
        {home.reel.map((_, k) => (
          <button
            key={k}
            type="button"
            aria-label={`Go to slide ${k + 1}`}
            onClick={() => setI(k)}
            className="flex-1 py-2.5"
          >
            <span
              className="block h-[3px] rounded"
              style={{ background: k === i ? "var(--bl-accent)" : "rgba(255,255,255,.25)" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────── Filmstrip (glides right on scroll) ───────── */
function Filmstrip() {
  const { ref, p } = useScrollProgress<HTMLElement>();
  const rows = home.filmstrip;
  return (
    <section
      ref={ref}
      aria-label="Moments from our programs"
      className="flex flex-col gap-2.5 overflow-hidden border-b border-bl-line py-2.5"
    >
      {rows.map((row, r) => (
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

/* ───────── Pathways (sticky stacking cards, hover preview) ───────── */
function Pathways() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-12 py-24 lg:py-28">
        <SectionHead
          eyebrow={home.pathwaysHead.eyebrow}
          title={home.pathwaysHead.title}
          aside={
            <p className="m-0 max-w-[520px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
              {home.pathwaysHead.text}
            </p>
          }
        />
        <div className="flex flex-col gap-7">
          {home.pathways.map((c, i) => (
            <SiteLink
              key={c.title}
              href={c.href}
              className="stack-card grid min-h-[420px] gap-7 rounded-3xl border border-white/15 bg-bl-surface p-3.5 shadow-[0_-20px_40px_rgba(0,0,0,.45)] md:sticky md:grid-cols-2"
              style={{ top: 96 + i * 28 }}
            >
              <div className="pv min-h-[280px] rounded-2xl md:min-h-[380px]">
                <img
                  className="pv-a absolute inset-0 h-full w-full object-cover"
                  src={c.img}
                  alt=""
                  loading="lazy"
                />
                <img
                  className="pv-b h-full w-full object-cover"
                  src={c.img2}
                  alt=""
                  loading="lazy"
                />
                <span className="eyebrow absolute bottom-3.5 left-3.5 rounded-full bg-bl-bg/80 px-3 py-2 text-[length:calc(10px*var(--bl-scale))]">
                  ▶ Hover to preview
                </span>
              </div>
              <div className="flex flex-col justify-center gap-4 p-3 md:p-5 md:pl-1">
                <div className="eyebrow flex justify-between text-[length:calc(12px*var(--bl-scale))]">
                  <span className="text-bl-accent">0{i + 1} / 04</span>
                  <span className="text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                    {c.tag}
                  </span>
                </div>
                <span className="disp text-[length:calc(clamp(1.75rem,3vw,2.4rem)*var(--bl-hscale))] leading-[1.08]">
                  {c.title}
                </span>
                <span className="text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
                  {c.body}
                </span>
                <span className="eyebrow border-t border-bl-line pt-3.5 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2">
                  {c.meta}
                </span>
                <span className="text-[length:calc(15px*var(--bl-scale))] font-semibold text-bl-accent">
                  Explore →
                </span>
              </div>
            </SiteLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Human stack ───────── */
function HumanStack() {
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="grid items-start gap-16 py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-5">
          <Eyebrow>{home.humanStackHead.eyebrow}</Eyebrow>
          <h2 className="h2">{home.humanStackHead.title}</h2>
          <p className="m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
            {home.humanStackHead.text}
          </p>
          <SiteLink
            href={home.humanStackHead.link.href}
            className="text-[length:calc(15px*var(--bl-scale))] !text-bl-accent"
          >
            {home.humanStackHead.link.label}
          </SiteLink>
        </div>
        <div className="flex flex-col gap-2">
          {home.humanStack.map((l) => {
            const base = l.level === "L0";
            return (
              <div
                key={l.level}
                className={`grid grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-[14px] border px-5 py-4 sm:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.3fr)] ${base ? "border-bl-accent bg-white/[.03]" : "border-white/15"}`}
              >
                <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                  {l.level}
                </span>
                <span className={`disp text-lg ${base ? "text-bl-accent" : ""}`}>{l.title}</span>
                <span className="col-span-2 text-sm leading-snug text-[#B4B9C1] sm:col-span-1">
                  {l.body}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Upcoming ───────── */
function Upcoming() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-24 lg:py-28">
        <SectionHead
          eyebrow={home.upcomingHead.eyebrow}
          title={home.upcomingHead.title}
          aside={
            <Button href={home.upcomingHead.button.href} variant="ghost">
              {home.upcomingHead.button.label}
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {home.upcoming.map((u) => (
            <SiteLink
              key={u.title}
              href={u.href}
              className="flex flex-col overflow-hidden rounded-[20px] border border-white/15 bg-bl-surface"
            >
              <img src={u.img} alt="" loading="lazy" className="h-[240px] w-full object-cover" />
              <div className="flex flex-1 flex-col gap-3.5 p-6">
                <div className="eyebrow flex justify-between gap-3 text-[length:calc(11px*var(--bl-scale))]">
                  <span className="text-bl-accent">● {u.status}</span>
                  <span className="text-bl-ink-3">{u.type}</span>
                </div>
                <span className="disp text-[length:calc(22px*var(--bl-scale))] leading-tight">
                  {u.title}
                </span>
                <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-bl-line py-3.5">
                  {[
                    ["When", u.when],
                    ["Where", u.where],
                    ["Who", u.who],
                    ["Fee", u.fee],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">
                        {k}
                      </dt>
                      <dd className="m-0 mt-1 text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[length:calc(13px*var(--bl-scale))] text-bl-ink-3">
                    {u.note}
                  </span>
                  <span className="text-sm font-semibold text-bl-accent">{u.cta} →</span>
                </div>
              </div>
            </SiteLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Method ───────── */
function Method() {
  const m = home.method;
  return (
    <section className="border-b border-bl-line">
      <Container className="grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col gap-5">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 className="h2">{m.title}</h2>
          <p className="m-0 max-w-[520px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
            {m.text}
          </p>
        </div>
        <img
          src={m.img}
          alt={m.alt}
          loading="lazy"
          className="aspect-[4/5] w-full max-w-[460px] rounded-2xl border border-bl-line object-cover lg:justify-self-end"
        />
      </Container>
    </section>
  );
}

/* ───────── Student work (glides right, settles in view) ───────── */
function StudentWork() {
  const { ref, p } = useScrollProgress<HTMLDivElement>("enter");
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="flex flex-col gap-10 pb-10 pt-24 lg:pt-28">
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
      <div className="overflow-x-auto pb-24 [scrollbar-width:none] lg:overflow-hidden lg:pb-28">
        <div
          ref={ref}
          className="flex w-max gap-4 pl-5 pr-5 will-change-transform sm:pl-10 lg:pl-[max(40px,calc((100vw-1320px)/2+40px))]"
          style={{ transform: `translateX(${(-(1 - p) * 30).toFixed(2)}%)` }}
        >
          {studentWork.map((w) => (
            <SiteLink
              key={w.title}
              href={ARCHIVES_URL}
              className="flex w-[320px] shrink-0 flex-col gap-3 sm:w-[400px]"
            >
              <span className="relative block">
                <img
                  src={w.cover}
                  alt={`Cover of ${w.title}`}
                  loading="lazy"
                  className="block h-[208px] w-full rounded-2xl border border-white/10 object-cover sm:h-[260px]"
                />
                {w.award && (
                  <span className="eyebrow absolute left-3 top-3 rounded-full bg-bl-accent px-2.5 py-1.5 text-[length:calc(10px*var(--bl-scale))] text-bl-bg">
                    {w.award}
                  </span>
                )}
              </span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
                {w.category}
              </span>
              <span className="disp text-[length:calc(17px*var(--bl-scale))] leading-tight">
                {w.title}
              </span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                {w.by}
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── World map with flags ───────── */
function WorldMap() {
  const hubs = home.pins.filter((p) => p.hub).length;
  const count = home.pins.length - hubs + 2;
  return (
    <section className="gridbg border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-24 lg:py-28">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{home.pinsHead.eyebrow}</Eyebrow>
            <h2 className="h2">{home.pinsHead.title}</h2>
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
              {home.pinsHead.text.replaceAll("{count}", String(count))}
            </p>
            <div className="eyebrow grid gap-3 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-2 sm:flex sm:gap-5">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border-2 border-bl-accent" />
                Program hubs
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-bl-green" />
                Where students are from
              </span>
            </div>
          </div>
        </div>
        <div className="relative aspect-[1000/420] w-full">
          <img src="/img/worldmap.png" alt="" className="absolute inset-0 h-full w-full" />
          {home.pins.map((p) => {
            const size = p.hub ? 30 : 22;
            const c = p.hub ? "var(--bl-accent)" : "var(--bl-green)";
            return (
              <span
                key={p.name}
                className={`pin absolute h-0 w-0 ${p.hub ? "hub" : ""}`}
                title={p.name}
                style={{
                  left: `${((p.lon + 180) / 360) * 100}%`,
                  top: `${((82 - p.lat) / 140) * 100}%`,
                }}
              >
                <span className="ring" style={{ background: c }} />
                <img
                  src={p.flag}
                  alt=""
                  className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                  style={{
                    width: size,
                    height: size,
                    boxShadow: `0 0 0 2px ${c}, 0 0 0 5px var(--bl-bg)`,
                  }}
                />
                <span className="lbl eyebrow absolute left-5 top-[-26px] hidden whitespace-nowrap rounded-md border border-white/15 bg-bl-bg/85 px-2 py-1 text-[length:calc(10px*var(--bl-scale))] sm:block">
                  {p.name}
                </span>
              </span>
            );
          })}
        </div>
        <p className="eyebrow m-0 text-[length:calc(11px*var(--bl-scale))] leading-loose text-bl-ink-3">
          {home.pins.map((p) => p.name).join(" · ")}
        </p>
      </Container>
    </section>
  );
}

/* ───────── Testimonials ───────── */
function Testimonials() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-24 lg:py-28">
        <Eyebrow>{home.testimonialsHead.eyebrow}</Eyebrow>
        <div className="grid gap-4 md:grid-cols-3">
          {home.testimonials.map((q) => (
            <figure
              key={q.name}
              className="m-0 flex flex-col gap-5 rounded-[20px] border border-white/15 bg-bl-surface p-3.5"
            >
              <img
                src={q.img}
                alt=""
                loading="lazy"
                className="h-[220px] w-full rounded-xl object-cover"
              />
              <blockquote className="m-0 px-2.5 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#E6E8EB]">
                “{q.quote}”
              </blockquote>
              <figcaption className="flex flex-col gap-1 px-2.5 pb-3">
                <span className="text-sm font-semibold">{q.name}</span>
                <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                  {q.school}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Audiences ───────── */
function Audiences() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-24 lg:py-28">
        <SectionHead eyebrow={home.audiencesHead.eyebrow} title={home.audiencesHead.title} />
        <div className="grid gap-4 md:grid-cols-2">
          {home.audiences.map((a) => (
            <div
              key={a.kicker}
              className="flex flex-col gap-5 rounded-[20px] border border-white/15 p-9"
            >
              <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                {a.kicker}
              </span>
              <span className="disp text-[length:calc(28px*var(--bl-scale))] leading-tight">
                {a.title}
              </span>
              <ul className="m-0 list-none p-0">
                {a.items.map((it) => (
                  <li
                    key={it}
                    className="flex gap-3.5 border-t border-bl-line py-3.5 text-[length:calc(15px*var(--bl-scale))] text-[#D4D7DC]"
                  >
                    <span className="text-bl-accent">→</span>
                    {it}
                  </li>
                ))}
              </ul>
              <Button href="/partners" variant="light" className="self-start">
                {a.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────── Team ───────── */
function Team() {
  return (
    <section className="border-b border-bl-line">
      <Container className="flex flex-col gap-10 py-24 lg:py-28">
        <SectionHead
          eyebrow={home.teamHead.eyebrow}
          title={home.teamHead.title}
          aside={
            <SiteLink
              href={home.teamHead.link.href}
              className="text-[length:calc(15px*var(--bl-scale))] !text-bl-accent"
            >
              {home.teamHead.link.label}
            </SiteLink>
          }
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {home.team.map((k) => (
            <PersonCard key={k} personKey={k} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClosingCta() {
  const { title, primary, secondary } = home.closing;
  return (
    <section className="gridbg">
      <Container className="flex flex-wrap items-end justify-between gap-8 py-28">
        <h2 className="disp m-0 min-w-0 whitespace-pre-line break-words text-[length:calc(2.25rem*var(--bl-hscale))] leading-[1.08] sm:text-5xl lg:text-[length:calc(4rem*var(--bl-hscale))]">
          <AccentEnd text={title} />
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button href={primary.href}>{primary.label}</Button>
          <Button href={secondary.href} variant="ghost">
            {secondary.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
