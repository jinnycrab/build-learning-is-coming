import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import { PersonCard } from "@/components/site/Shared";
import { about as A, people } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Build Learning" },
      { name: "description", content: A.intro },
      { property: "og:title", content: "About — Build Learning" },
      { property: "og:description", content: A.intro },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const logos = A.universities.logos;
  return (
    <Page>
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-20 lg:py-24">
          <div className="flex max-w-[1000px] flex-col gap-6">
            {A.eyebrow && <Eyebrow>{A.eyebrow}</Eyebrow>}
            <h1 className="disp m-0 text-[length:calc(clamp(2.5rem,5.5vw,4.75rem)*var(--bl-hscale))] leading-[1.02]">
              {A.headline}
            </h1>
            <p className="m-0 max-w-[680px] text-lg leading-relaxed text-bl-ink-2">{A.intro}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {A.photos.map((ph) => (
              <img key={ph.src} src={ph.src} alt={ph.alt} className="aspect-[3/2] w-full rounded-2xl object-cover" />
            ))}
          </div>
        </Container>
      </section>

      {/* Where students go next — moving university logo strip */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-3 pt-20">
          <h2 className="h2">{A.universities.title}</h2>
          <p className="m-0 max-w-[640px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
            {A.universities.text}
          </p>
        </Container>
        <div className="overflow-hidden py-14 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="marquee flex w-max items-center gap-20 pr-20">
            {[...logos, ...logos].map((u, i) => (
              <img
                key={u.name + i}
                src={u.logo}
                alt={i < logos.length ? u.name : ""}
                aria-hidden={i >= logos.length || undefined}
                style={{ height: u.height }}
                className="w-auto shrink-0 opacity-90"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow={A.foundersHead.eyebrow} title={A.foundersHead.title} />
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
                    <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">{f.role}</span>
                    <p className="m-0 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-bl-ink-3">{f.bio}</p>
                    {f.link && (
                      <SiteLink href={f.link} className="mt-1 text-sm text-bl-ink-2 no-underline hover:text-bl-accent">
                        {A.founderLinkLabel}
                      </SiteLink>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead
            eyebrow={A.mentorsHead.eyebrow}
            title={A.mentorsHead.title}
            aside={
              <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">{A.mentorsHead.note}</span>
            }
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {A.mentors.map((k) => (
              <PersonCard key={k} personKey={k} square />
            ))}
            <SiteLink
              href={A.joinCard.link.href}
              className="flex aspect-square flex-col justify-center gap-2 rounded-2xl border border-dashed border-white/25 p-5 text-bl-ink no-underline hover:border-bl-accent"
            >
              <span className="text-lg font-semibold">{A.joinCard.title}</span>
              <span className="text-sm text-bl-ink-3">{A.joinCard.text}</span>
              <span className="text-sm text-bl-accent">{A.joinCard.link.label}</span>
            </SiteLink>
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col items-start gap-6 py-24 lg:py-28">
          <h2 className="h2 max-w-[820px]">{A.closing.title}</h2>
          <div className="flex flex-wrap gap-3">
            {A.closing.buttons.map((b, i) => (
              <Button key={b.label + i} href={b.href} variant={i === 0 ? "primary" : "ghost"}>
                {b.label}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </Page>
  );
}
