import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import {
  MAccordion,
  MCarousel,
  MHead,
  MLogos,
  MMore,
  MPage,
  MSection,
  firstSentence,
  mt,
  peopleRows,
} from "@/components/site/Mobile";
import { PersonCard } from "@/components/site/Shared";
import { about as A, people } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About — Build Learning",
      description: A.intro,
      image: "/img/og/about.jpg",
    }),
  component: About,
});

function About() {
  const logos = A.universities.logos;
  return (
    <Page>
      <MobileAbout />
      <div className="hidden md:block">
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-14 md:py-20 lg:py-24">
          <div className="flex max-w-[1000px] flex-col gap-6">
            {A.eyebrow && <Eyebrow>{A.eyebrow}</Eyebrow>}
            <h1 className="disp m-0 text-[length:calc(clamp(2.5rem,5.5vw,4.75rem)*var(--bl-hscale))] leading-[1.02]">
              {A.headline}
            </h1>
            <p className="m-0 max-w-[680px] text-lg leading-relaxed text-bl-ink-2">{A.intro}</p>
          </div>
          <div className="m-swipe grid gap-3 sm:grid-cols-3">
            {A.photos.map((ph) => (
              <img key={ph.src} src={ph.src} alt={ph.alt} className="aspect-[3/2] w-full rounded-2xl object-cover" />
            ))}
          </div>
        </Container>
      </section>

      {/* Where students go next — moving university logo strip */}
      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-3 pt-14 md:pt-20">
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
        <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
          <SectionHead eyebrow={A.foundersHead.eyebrow} title={A.foundersHead.title} />
          <div className="m-swipe grid gap-6 md:grid-cols-2">
            {A.founders.map((f) => {
              const p = people[f.key];
              if (!p) return null;
              return (
                <div
                  key={f.key}
                  className="grid content-start gap-5 rounded-[22px] border border-white/15 bg-bl-surface p-4 md:grid-cols-[200px_minmax(0,1fr)] md:gap-6 md:p-5"
                >
                  <img
                    src={p.photo}
                    alt={`Portrait of ${p.name}`}
                    className="aspect-[4/3] w-full rounded-2xl object-cover md:aspect-square"
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
        <Container className="flex flex-col gap-10 py-16 md:py-24 lg:py-28">
          <SectionHead
            eyebrow={A.mentorsHead.eyebrow}
            title={A.mentorsHead.title}
            aside={
              <span className="eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3">{A.mentorsHead.note}</span>
            }
          />
          <div className="m-swipe m-swipe-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
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

      </div>
    </Page>
  );
}

function MobileAbout() {
  const unis = A.universities.logos.map((u) => ({ ...u, role: "" }));
  return (
    <MPage>
      <section className="flex flex-col gap-6">
        <MHead as="h1" eyebrow={A.eyebrow} title={A.headline} text={firstSentence(A.intro)} />
        <MCarousel items={A.photos} label={A.eyebrow || A.headline}>
          {(ph) => <img src={ph.src} alt={ph.alt} loading="lazy" className="block aspect-[4/3] w-full rounded-xl object-cover" />}
        </MCarousel>
      </section>

      <MSection title={A.universities.title} text={A.universities.text}>
        <MLogos list={unis} label="" />
      </MSection>

      <MSection eyebrow={A.foundersHead.eyebrow} title={A.foundersHead.title}>
        <MAccordion
          items={A.founders.flatMap((f) => {
            const p = people[f.key];
            if (!p) return [];
            return [
              {
                title: p.name,
                text: f.role,
                photo: p.photo,
                body: (
                  <div className="flex flex-col gap-2">
                    <p className={mt.body}>{f.bio}</p>
                    {f.link && (
                      <SiteLink href={f.link} className="inline-flex min-h-11 items-center !text-bl-accent">
                        {A.founderLinkLabel}
                      </SiteLink>
                    )}
                  </div>
                ),
              },
            ];
          })}
        />
      </MSection>

      <MSection eyebrow={A.mentorsHead.eyebrow} title={A.mentorsHead.title} text={A.mentorsHead.note}>
        <MMore rows={peopleRows(A.mentors)} first={6} label={A.mobileShowAll} />
      </MSection>

    </MPage>
  );
}

