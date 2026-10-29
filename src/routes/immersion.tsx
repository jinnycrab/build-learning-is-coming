import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import { PersonCard } from "@/components/site/Shared";
import { immersion as I, logo } from "@/content/site";

export const Route = createFileRoute("/immersion")({
  head: () => ({
    meta: [
      { title: "Build a Portfolio in 8 Days — Singapore Immersion · Build Learning" },
      {
        name: "description",
        content:
          "An 8-day learning immersion in Singapore with eduK8: Stanford innovation methods, tech visits, culture challenges and a pitch to industry judges. Ages 14–18, 9–16 Jan 2027.",
      },
      { property: "og:title", content: "Build a Portfolio in 8 Days — Singapore Immersion · Build Learning" },
      {
        property: "og:description",
        content:
          "An 8-day learning immersion in Singapore with eduK8: Stanford innovation methods, tech visits, culture challenges and a pitch to industry judges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Immersion,
});

const body = "m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]";

function Immersion() {
  const [first, second, ...others] = I.themes;
  return (
    <Page>
      {/* Hero: a slowly drifting collage of the program's photos */}
      <section className="relative overflow-hidden border-b border-bl-line">
        <div aria-hidden="true" className="grid h-[560px] grid-cols-2 gap-3 px-3 sm:h-[680px] md:grid-cols-4">
          {I.heroCollage.map((col, ci) => (
            <div
              key={ci}
              className={`hero-col flex flex-col gap-3 pb-3 ${ci % 2 ? "down" : "up"} ${ci > 1 ? "hidden md:flex" : ""}`}
            >
              {[...col, ...col].map((src, k) => (
                <img key={k} src={src} alt="" className="block h-[300px] w-full rounded-[14px] object-cover" />
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bl-bg/45 via-bl-bg/55 to-bl-bg/95" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="flex flex-col gap-5 pb-12">
            <h1 className="disp m-0 max-w-[1000px] text-[length:calc(clamp(2.5rem,6vw,5.25rem)*var(--bl-hscale))] leading-none">
              {I.title}
            </h1>
            <p className="m-0 max-w-[640px] text-lg leading-relaxed text-[#D4D7DC]">{I.intro}</p>
          </Container>
        </div>
      </section>

      {/* Key facts */}
      <section className="border-b border-bl-line bg-bl-surface">
        <Container className="grid grid-cols-2 items-center lg:grid-cols-5">
          {I.meta.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5 py-6 pr-5">
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">{k}</span>
              <span className="text-[length:calc(17px*var(--bl-scale))] font-medium">{v}</span>
            </div>
          ))}
          <div className="col-span-2 py-5 lg:col-span-1 lg:justify-self-end">
            <Button href="#register">{I.reserveLabel}</Button>
          </div>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="border-b border-bl-line">
        <Container className="grid gap-8 py-16 md:gap-14 md:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>{I.outcomesHead.eyebrow}</Eyebrow>
            <h2 className="h2">{I.outcomesHead.title}</h2>
            <p className={body}>{I.outcomesHead.text}</p>
          </div>
          <ol className="m-0 list-none p-0">
            {I.outcomes.map((o) => (
              <li key={o} className="grid grid-cols-[28px_minmax(0,1fr)] items-baseline gap-3 border-t border-white/15 py-4 md:py-5">
                <span aria-hidden="true" className="text-bl-accent">
                  →
                </span>
                <span className="text-base leading-snug md:text-lg">{o}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* The experience: five themes, two featured */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-16 md:py-24">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <Eyebrow>{I.experienceHead.eyebrow}</Eyebrow>
              <h2 className="h2">{I.experienceHead.title}</h2>
            </div>
            <p className={`${body} lg:pt-8`}>{I.experienceHead.text}</p>
          </div>
          <div className="m-swipe grid gap-3 md:grid-cols-6">
            {[first, second].filter(Boolean).map((t) => (
              <ThemeCard key={t!.title} t={t!} big />
            ))}
            {others.map((t) => (
              <ThemeCard key={t.title} t={t} />
            ))}
          </div>
          <div className="grid overflow-hidden rounded-[18px] border border-white/15 bg-bl-surface md:grid-cols-2">
            <img src={I.stay.img} alt={I.stay.alt} loading="lazy" className="h-full min-h-[200px] w-full object-cover md:min-h-[260px]" />
            <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
              <Eyebrow className="text-[length:calc(11px*var(--bl-scale))]">{I.stay.label}</Eyebrow>
              <span className="disp text-[length:calc(26px*var(--bl-hscale))] leading-tight">{I.stay.title}</span>
              <p className="m-0 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">{I.stay.text}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mentors */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-16 md:py-24">
          <SectionHead eyebrow={I.mentorsHead.eyebrow} title={I.mentorsHead.title} />
          <div className="m-swipe m-swipe-sm grid grid-cols-2 gap-4 lg:grid-cols-4">
            {I.mentors.map((m) => (
              <PersonCard key={m.key} personKey={m.key} role={m.role} square />
            ))}
            <div className="flex flex-col gap-2.5">
              <div className="flex aspect-square flex-col items-center justify-center gap-7 rounded-2xl border border-white/15">
                {I.industryLogos.map((n) => {
                  const l = logo(n);
                  return l ? (
                    <img
                      key={n}
                      src={l.logo}
                      alt={n}
                      style={{ height: Math.min(l.height + 6, 30) }}
                      className="w-auto opacity-90 brightness-0 invert"
                    />
                  ) : null;
                })}
              </div>
              <span className="text-base font-semibold">{I.industryCard.title}</span>
              <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">{I.industryCard.tag}</span>
              <span className="text-[length:calc(13px*var(--bl-scale))] leading-relaxed text-bl-ink-3">{I.industryCard.text}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Dates and fees */}
      <section id="register" className="border-b border-bl-line">
        <Container className="grid items-start gap-8 py-16 md:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Eyebrow>{I.datesLabel}</Eyebrow>
            <ol className="m-0 list-none p-0">
              {I.dates.map(([d, t], i) => (
                <li key={i} className="grid grid-cols-[20px_140px_minmax(0,1fr)] items-baseline gap-4 border-t border-white/15 py-4">
                  <span
                    className="h-2.5 w-2.5 rounded-full border-2 border-bl-accent"
                    style={{ background: i === 0 ? "var(--bl-accent)" : "transparent" }}
                  />
                  <span className="eyebrow text-[length:calc(12px*var(--bl-scale))]">{d}</span>
                  <span className="text-[length:calc(15px*var(--bl-scale))] leading-snug text-bl-ink-2">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-6 rounded-[22px] border border-white/15 bg-bl-surface p-8">
            <Eyebrow>{I.fees.label}</Eyebrow>
            <span className="disp text-[length:calc(28px*var(--bl-hscale))] leading-tight">{I.fees.title}</span>
            <div className="grid gap-5 text-sm leading-relaxed text-bl-ink-2 sm:grid-cols-2">
              <div>
                <div className="eyebrow mb-2 text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">{I.fees.includesLabel}</div>
                {I.fees.includes}
              </div>
              <div>
                <div className="eyebrow mb-2 text-[length:calc(10px*var(--bl-scale))] text-[#8C929C]">{I.fees.excludesLabel}</div>
                {I.fees.excludes}
              </div>
            </div>
            <Button href={I.fees.button.href}>{I.fees.button.label}</Button>
            <SiteLink href={I.fees.infoSession.href} className="text-center text-sm text-bl-ink-2">
              {I.fees.infoSession.label}
            </SiteLink>
          </div>
        </Container>
      </section>
    </Page>
  );
}

function ThemeCard({
  t,
  big = false,
}: {
  t: { title: string; body: string; img: string; alt: string };
  big?: boolean;
}) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-[18px] border border-white/15 bg-bl-surface ${big ? "md:col-span-3" : "md:col-span-2"}`}
    >
      <img
        src={t.img}
        alt={t.alt}
        loading="lazy"
        className={`h-[180px] w-full object-cover ${big ? "md:h-[300px]" : "md:h-[220px]"}`}
      />
      <div className="flex flex-1 flex-col gap-2.5 px-5 pb-6 pt-4 md:px-6 md:pb-7 md:pt-5">
        <span className="disp text-[length:calc(22px*var(--bl-hscale))] leading-tight">{t.title}</span>
        <span className="text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-[#B4B9C1]">{t.body}</span>
      </div>
    </article>
  );
}
