import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead } from "@/components/site/Layout";
import { CountUpStats, PersonCard } from "@/components/site/Shared";
import { about as A, people, ARCHIVES_URL } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About — Build Learning" }, { name: "description", content: A.intro }],
  }),
  component: About,
});

function About() {
  return (
    <Page>
      <section className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-20 lg:py-24">
          <div className="flex max-w-[1000px] flex-col gap-6">
            <Eyebrow>// About Build Learning</Eyebrow>
            <h1 className="disp m-0 text-[length:calc(clamp(2.5rem,5.5vw,4.75rem)*var(--bl-hscale))] leading-[1.02]">
              {A.headline}
            </h1>
            <p className="m-0 max-w-[680px] text-lg leading-relaxed text-bl-ink-2">{A.intro}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {A.photos.map((ph) => (
              <img
                key={ph.src}
                src={ph.src}
                alt={ph.alt}
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
          <CountUpStats />
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow="01 — Founders" title="Born at Stanford. Built in Singapore." />
          <div className="grid gap-6 md:grid-cols-2">
            {A.founders.map((f) => {
              const p = people[f.key];
              if (!p) return null;
              return (
                <div
                  key={f.key}
                  className="grid gap-6 rounded-[22px] border border-white/15 bg-bl-surface p-5 sm:grid-cols-[200px_minmax(0,1fr)]"
                >
                  <img
                    src={p.photo}
                    alt={`Portrait of ${p.name}`}
                    className="aspect-square w-full rounded-2xl object-cover"
                    style={{ objectPosition: "center 22%" }}
                  />
                  <div className="flex flex-col gap-2.5 py-1">
                    <span className="text-xl font-semibold">{p.name}</span>
                    <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
                      {f.role}
                    </span>
                    <p className="m-0 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
                      {f.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead
            eyebrow="02 — Mentors, speakers & judges"
            title="Our network"
            aside={
              <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">
                {A.mentors.length}+ and growing
              </span>
            }
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {A.mentors.map((k) => (
              <PersonCard key={k} personKey={k} square />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow="03 — What we believe" title="Our values" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {A.values.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col gap-3 rounded-[18px] border border-white/15 p-6"
              >
                <span
                  className="disp text-4xl"
                  style={{
                    color: [
                      "var(--bl-accent)",
                      "var(--bl-blue)",
                      "var(--bl-green)",
                      "var(--bl-yellow)",
                    ][i % 4],
                  }}
                >
                  0{i + 1}
                </span>
                <span className="text-lg font-semibold">{v.title}</span>
                <span className="text-sm leading-relaxed text-bl-ink-3">{v.body}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="gridbg">
        <Container className="flex flex-col items-start gap-6 py-24 lg:py-28">
          <h2 className="h2 max-w-[820px]">
            Join a program, bring us to your school, or explore student work.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/programs">See programs →</Button>
            <Button href="/partners#contact" variant="ghost">
              Partner with us
            </Button>
            <Button href={ARCHIVES_URL} variant="ghost">
              The Global Archives ↗
            </Button>
          </div>
        </Container>
      </section>
    </Page>
  );
}
