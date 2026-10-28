import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead } from "@/components/site/Layout";
import { PersonCard } from "@/components/site/Shared";
import { immersion as I, logo, settings } from "@/content/site";

export const Route = createFileRoute("/immersion")({
  head: () => ({
    meta: [
      { title: "Build a Portfolio in 8 Days — Singapore Immersion · Build Learning" },
      { name: "description", content: "An 8-day learning immersion in Singapore with eduK8: Stanford innovation methods, tech visits, culture challenges and a pitch to industry judges. Ages 14–18, 9–16 Jan 2027." },
    ],
  }),
  component: Immersion,
});

function Immersion() {
  return (
    <Page>
      <section className="relative border-b border-bl-line">
        <img src={I.hero} alt="Students laughing while building together" className="block h-[min(680px,80vh)] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-bl-bg/25 via-bl-bg/40 to-bl-bg" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="flex flex-col gap-5 pb-12">
            <Eyebrow>● {I.status}</Eyebrow>
            <h1 className="disp m-0 max-w-[1000px] text-[clamp(2.5rem,6vw,5.25rem)] leading-none">{I.title}</h1>
            <p className="m-0 max-w-[640px] text-lg leading-relaxed text-[#D4D7DC]">{I.intro}</p>
          </Container>
        </div>
      </section>

      <section className="border-b border-bl-line bg-bl-surface">
        <Container className="grid grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-6">
          {I.meta.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1.5 py-6 pr-5">
              <span className="eyebrow text-[10px] text-[#8C929C]">{k}</span>
              <span className="text-[17px] font-medium">{v}</span>
            </div>
          ))}
          <div className="py-5 lg:justify-self-end">
            <Button href="#register">Reserve a place →</Button>
          </div>
        </Container>
      </section>

      <section className="gridbg border-b border-bl-line">
        <Container className="grid gap-14 py-24 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-4">
            <Eyebrow>01 — You leave with</Eyebrow>
            <h2 className="h2">A portfolio, not a certificate.</h2>
            <p className="m-0 text-[17px] leading-relaxed text-[#B4B9C1]">Everything students make is evidence of the human skills universities and employers look for — communication, empathy, teamwork and critical thinking.</p>
          </div>
          <ol className="m-0 list-none p-0">
            {I.outcomes.map((o, i) => (
              <li key={o} className="grid grid-cols-[56px_minmax(0,1fr)] items-baseline gap-4 border-t border-white/15 py-5">
                <span className="eyebrow text-xs text-bl-accent">0{i + 1}</span>
                <span className="text-lg leading-snug">{o}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow="02 — The 8 days" title="Learn · Apply · Collaborate · Build" aside={<span className="eyebrow text-[11px] text-bl-ink-3">Plan subject to change</span>} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {I.days.map((d) => (
              <div key={d.n} className={`flex flex-col gap-3.5 rounded-[18px] border bg-bl-surface p-3 ${d.key ? "border-bl-accent" : "border-white/15"}`}>
                <img src={d.img} alt="" loading="lazy" className="h-[170px] w-full rounded-[10px] object-cover" />
                <div className="flex flex-col gap-3 px-2 pb-2.5">
                  <div className="eyebrow flex justify-between text-[11px]">
                    <span className="text-bl-accent">
                      Day {d.n} · {d.date}
                    </span>
                    <span className="text-bl-ink-3">{d.theme}</span>
                  </div>
                  <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-2.5 gap-y-2 text-sm leading-snug text-[#D4D7DC]">
                    <span className="eyebrow pt-0.5 text-[10px] text-[#8C929C]">AM</span>
                    <span>{d.am}</span>
                    <span className="eyebrow pt-0.5 text-[10px] text-[#8C929C]">PM</span>
                    <span>{d.pm}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow="03 — Where you’ll go & stay" title="Multicultural. Innovative. Fun." />
          <div className="grid auto-rows-[200px] grid-cols-2 gap-3 lg:grid-cols-4">
            {I.bento.map((b) => (
              <div key={b.label} className={`relative overflow-hidden rounded-2xl ${b.big ? "col-span-2 row-span-2" : ""}`}>
                <img src={b.src} alt={b.label} loading="lazy" className="h-full w-full object-cover" />
                <span className="eyebrow absolute bottom-3 left-3 rounded-full bg-bl-bg/75 px-2.5 py-1.5 text-[10px]">{b.label}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {I.info.map((c) => (
              <div key={c.title} className="flex flex-col gap-3.5 rounded-[18px] border border-white/15 bg-bl-bg p-7">
                <span className="eyebrow text-[11px] text-bl-accent">{c.title}</span>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-[#D4D7DC]">
                      <span className="text-bl-accent">→</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow="04 — Your mentors" title="Stanford mentors & industry experts" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {I.mentors.map((m) => (
              <PersonCard key={m.key} personKey={m.key} role={m.role} square />
            ))}
            <div className="flex flex-col gap-2.5">
              <div className="flex aspect-square flex-col items-center justify-center gap-7 rounded-2xl border border-white/15">
                {I.industryLogos.map((n) => {
                  const l = logo(n);
                  return <img key={n} src={l.logo} alt={n} style={{ height: Math.min(l.height + 6, 30) }} className="w-auto opacity-90 brightness-0 invert" />;
                })}
              </div>
              <span className="text-base font-semibold">Industry experts</span>
              <span className="eyebrow text-[10px] text-bl-accent">To be revealed</span>
              <span className="text-[13px] leading-relaxed text-bl-ink-3">Judges and speakers from brand, consulting, technology and venture capital.</span>
            </div>
          </div>
        </Container>
      </section>

      <section id="register" className="gridbg border-b border-bl-line">
        <Container className="grid items-start gap-8 py-24 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-6">
            <Eyebrow>05 — Key dates</Eyebrow>
            <ol className="m-0 list-none p-0">
              {I.dates.map(([d, t], i) => (
                <li key={d} className="grid grid-cols-[20px_140px_minmax(0,1fr)] items-baseline gap-4 border-t border-white/15 py-4">
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-bl-accent" style={{ background: i === 0 ? "var(--bl-accent)" : "transparent" }} />
                  <span className="eyebrow text-xs">{d}</span>
                  <span className="text-[15px] leading-snug text-bl-ink-2">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-6 rounded-[22px] border border-white/15 bg-bl-surface p-8">
            <Eyebrow>06 — Program fee</Eyebrow>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 rounded-2xl border border-bl-accent p-5">
                <span className="eyebrow text-[10px] text-bl-accent">Early bird · before 4 Dec</span>
                <span className="disp text-[clamp(1.75rem,3vw,2.25rem)]">{I.fees.early}</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-2xl border border-white/15 p-5">
                <span className="eyebrow text-[10px] text-bl-ink-3">Regular</span>
                <span className="disp text-[clamp(1.75rem,3vw,2.25rem)] text-bl-ink-2">{I.fees.regular}</span>
              </div>
            </div>
            <div className="grid gap-5 text-sm leading-relaxed text-bl-ink-2 sm:grid-cols-2">
              <div>
                <div className="eyebrow mb-2 text-[10px] text-[#8C929C]">Includes</div>
                {I.fees.includes}
              </div>
              <div>
                <div className="eyebrow mb-2 text-[10px] text-[#8C929C]">Excludes</div>
                {I.fees.excludes}
              </div>
            </div>
            <Button href={`mailto:${settings.email}?subject=Singapore%20Immersion%20registration`}>Register — 20 places, first come first served</Button>
            <a href={`mailto:${settings.email}?subject=Singapore%20Immersion%20info%20session`} className="text-center text-sm text-bl-ink-2">
              Join a free info session (13 Nov or 4 Dec) →
            </a>
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="grid gap-12 py-24 lg:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-4">
            <Eyebrow>07 — Questions</Eyebrow>
            <h2 className="h2">For parents</h2>
          </div>
          <div>
            {I.faq.map((f) => (
              <details key={f.q} className="border-t border-white/15 py-5">
                <summary className="cursor-pointer text-[17px]">{f.q}</summary>
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-[#B4B9C1]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-wrap items-center gap-4 py-10">
          <span className="eyebrow text-[11px] text-bl-ink-3">Presented by</span>
          <img src={settings.logo} alt="Build Learning" className="h-7 w-auto brightness-0 invert" />
          <span className="text-[#8C929C]">×</span>
          <img src={logo("eduK8").logo} alt="eduK8" className="h-7 w-auto brightness-0 invert" />
        </Container>
      </section>
    </Page>
  );
}
