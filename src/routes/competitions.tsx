import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead } from "@/components/site/Layout";
import { CountdownChips, PersonCard } from "@/components/site/Shared";
import { ARCHIVES_URL, LUMA_URL, competitions as C, logo } from "@/content/site";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: "Competitions & Hackathons — Build Learning" },
      {
        name: "description",
        content:
          "Hackathons in Singapore and Seoul and virtual competitions with students from every continent. Register for the Global Innovation Challenge 2026.",
      },
    ],
  }),
  component: Competitions,
});

const ICONS: Record<string, React.ReactNode> = {
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z" />
      <path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" />
    </>
  ),
  heart: (
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2.5" />
      <path d="M9 6h6M9 18h6M10 12l2 2 3-4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3.5" />
      <path d="M2.5 21v-1.5A5.5 5.5 0 0 1 8 14h2a5.5 5.5 0 0 1 5.5 5.5V21" />
      <circle cx="17.5" cy="8.5" r="2.5" />
      <path d="M18 14a4 4 0 0 1 3.5 4v2" />
    </>
  ),
};

function Competitions() {
  const [h1, h2, h3] = C.heroImages;
  return (
    <Page>
      <section className="gridbg border-b border-bl-line">
        <Container className="grid items-end gap-12 pb-14 pt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Eyebrow>// Competitions & hackathons</Eyebrow>
            <h1 className="disp m-0 text-[length:calc(clamp(2.75rem,6vw,5.25rem)*var(--bl-hscale))] leading-none">
              Where students compete to build what matters.
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-bl-ink-2">
              In-person hackathons in Singapore and Seoul, and virtual competitions with students
              from every continent — judged by founders, researchers and industry experts.
            </p>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] grid-rows-[200px_200px] gap-2.5">
            <img
              src={h1}
              alt="Build for Impact 2026 champions on stage"
              className="row-span-2 h-full w-full rounded-2xl object-cover"
            />
            <img
              src={h2}
              alt="Build for Impact Seoul participants"
              className="h-full w-full rounded-2xl object-cover"
            />
            <img
              src={h3}
              alt="Students building together at Build for Impact"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </Container>
        <Container className="pb-12">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-bl-bg lg:grid-cols-4">
            {C.stats.map((s) => (
              <div key={s.label} className="border-r border-bl-line px-6 py-5">
                <div className="disp text-[length:calc(32px*var(--bl-scale))]">{s.value}</div>
                <div className="eyebrow mt-1.5 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Now open */}
      <section className="border-b border-bl-line">
        <Container className="py-16">
          <div className="grid overflow-hidden rounded-3xl border border-bl-accent bg-bl-surface md:grid-cols-2">
            <img
              src={C.open.img}
              alt="Global Innovation Challenge 2026 artwork"
              className="h-full min-h-[320px] w-full object-cover"
            />
            <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
              <Eyebrow>● Now open · Next competition</Eyebrow>
              <span className="disp text-[length:calc(clamp(1.75rem,3vw,2.25rem)*var(--bl-hscale))] leading-tight">
                {C.open.title}
              </span>
              <span className="text-base leading-relaxed text-[#B4B9C1]">{C.open.body}</span>
              <div className="eyebrow flex flex-wrap gap-x-5 gap-y-2 text-[length:calc(11px*var(--bl-scale))] text-[#D4D7DC]">
                {C.open.facts.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-2 text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                  Closes in
                </span>
                <CountdownChips iso={C.open.deadline} compact />
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href={LUMA_URL}>Register on Luma →</Button>
                <Button href="#how" variant="ghost">
                  How it works
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Past */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-14 py-24 lg:py-28">
          <SectionHead
            eyebrow="01 — Past competitions"
            title="2026 so far"
            aside={
              <Button href={ARCHIVES_URL} variant="ghost">
                See every entry on The Global Archives ↗
              </Button>
            }
          />
          {C.past.map((c, i) => (
            <article
              key={c.title}
              className="grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-2"
            >
              <div
                className={`grid grid-cols-[1.5fr_1fr] grid-rows-[170px_170px] gap-2 ${i % 2 ? "lg:order-2" : ""}`}
              >
                <img
                  src={c.imgs[0]}
                  alt=""
                  loading="lazy"
                  className="row-span-2 h-full w-full rounded-2xl object-cover"
                />
                <img
                  src={c.imgs[1]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <img
                  src={c.imgs[2]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="eyebrow flex flex-wrap gap-x-4 gap-y-2 text-[length:calc(11px*var(--bl-scale))]">
                  <span className="text-bl-accent">{c.when}</span>
                  <span className="text-bl-ink-3">{c.where}</span>
                </div>
                <h3 className="disp m-0 text-[length:calc(30px*var(--bl-scale))] leading-tight">
                  {c.title}
                </h3>
                <p className="m-0 text-base leading-relaxed text-[#B4B9C1]">{c.body}</p>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-bl-line bg-bl-line">
                  {c.facts.map(([v, l]) => (
                    <div key={l} className="bg-bl-bg px-4 py-3.5">
                      <div className="disp text-xl">{v}</div>
                      <div className="eyebrow mt-1 text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">
                    Winners
                  </span>
                  <span className="text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#E6E8EB]">
                    {c.winners}
                  </span>
                </div>
                {c.logos.length > 0 && (
                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">
                      With
                    </span>
                    {c.logos.map((n) => {
                      const l = logo(n);
                      return (
                        <img
                          key={n}
                          src={l.logo}
                          alt={n}
                          style={{ height: Math.min(l.height, 26) }}
                          className="w-auto opacity-80 brightness-0 invert"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="grid gap-3 py-12 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
          <span className="eyebrow text-xs text-bl-ink-3">Also run by Build Learning</span>
          <div className="flex flex-wrap gap-3">
            {C.also.map((a) => (
              <div key={a.title} className="rounded-2xl border border-white/15 px-6 py-5">
                <div className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
                  {a.when}
                </div>
                <div className="disp mt-2 text-[length:calc(19px*var(--bl-scale))]">{a.title}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How */}
      <section id="how" className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead
            eyebrow="02 — The brief"
            title="If you could solve one problem in society, what would it be?"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {C.ideas.map((it, i) => (
              <div
                key={it.title}
                className="flex items-center gap-4 rounded-[18px] border border-white/15 bg-bl-bg p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] border border-bl-accent">
                  <svg
                    aria-hidden="true"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--bl-accent)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[it.icon]}
                  </svg>
                </span>
                <div className="flex flex-col gap-1">
                  <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                    0{i + 1}
                  </span>
                  <span className="text-[length:calc(17px*var(--bl-scale))] font-semibold leading-snug">
                    {it.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-5">
            {C.flow.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 pr-5">
                <div className="flex items-center">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-bl-accent" />
                  <span className="h-px flex-1 bg-white/20" />
                </div>
                <span className="disp text-[length:calc(17px*var(--bl-scale))]">{f.title}</span>
                <span className="text-sm leading-relaxed text-[#B4B9C1]">{f.body}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* After */}
      <section className="border-b border-bl-line">
        <Container className="grid items-center gap-12 py-24 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-4">
            <Eyebrow>03 — It doesn’t end at the pitch</Eyebrow>
            <h2 className="h2">Pathways after the finals.</h2>
            <p className="m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
              Winners don’t just get a certificate. We connect them with real organisations so their
              ideas keep growing.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {C.after.map((a, i) => (
              <div
                key={a.title}
                className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 rounded-2xl border border-white/15 px-6 py-5"
              >
                <span className="eyebrow text-xs text-bl-accent">0{i + 1}</span>
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
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead
            eyebrow="04 — Mentors & judges"
            title="Learn from people who build for a living"
          />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {C.judges.map((j) => (
              <PersonCard key={j.key} personKey={j.key} role={j.role} square />
            ))}
          </div>
          <p className="m-0 border-t border-bl-line pt-5 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">
            <span className="eyebrow mr-3 text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">
              Past judges include
            </span>
            {C.pastJudges}
          </p>
        </Container>
      </section>

      <section className="gridbg">
        <Container className="flex flex-wrap items-end justify-between gap-8 py-24">
          <h2 className="disp m-0 max-w-[760px] text-[length:calc(clamp(2.5rem,5vw,4.5rem)*var(--bl-hscale))] leading-none">
            Ready to compete<span className="text-bl-accent">?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href={LUMA_URL}>Register for GIC 2026 →</Button>
            <Button href="/partners" variant="ghost">
              Bring a competition to your school
            </Button>
          </div>
        </Container>
      </section>
    </Page>
  );
}
