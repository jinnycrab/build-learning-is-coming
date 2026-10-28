import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button, Container, Eyebrow, Page, SectionHead, SiteLink } from "@/components/site/Layout";
import { LogoMarquee } from "@/components/site/Shared";
import { partnersPage as PP, settings } from "@/content/site";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Schools & Partners — Build Learning" },
      {
        name: "description",
        content:
          "Workshops, AI camps, hackathons and immersions for schools, plus ways for organisations to sponsor, set briefs, judge and mentor.",
      },
      { property: "og:title", content: "Schools & Partners — Build Learning" },
      { property: "og:description", content: "Workshops, AI camps, hackathons and immersions for schools, plus ways for organisations to sponsor, set briefs, judge and mentor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <Page>
      <section className="gridbg border-b border-bl-line">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="flex flex-col gap-6">
            <Eyebrow>{PP.intro.eyebrow}</Eyebrow>
            <h1 className="disp m-0 text-[length:calc(clamp(2.5rem,5.5vw,4.75rem)*var(--bl-hscale))] leading-[1.02]">
              {PP.intro.title}
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-bl-ink-2">
              {PP.intro.text}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href={PP.intro.primary.href}>{PP.intro.primary.label}</Button>
              <Button href={PP.intro.secondary.href} variant="ghost">
                {PP.intro.secondary.label}
              </Button>
            </div>
          </div>
          <img
            src={PP.hero}
            alt="Students at an industry talk"
            className="aspect-[4/3] w-full rounded-[22px] object-cover"
          />
        </Container>
      </section>

      <LogoMarquee label="Who we’ve worked with" />

      <section id="schools" className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow={PP.schoolsHead.eyebrow} title={PP.schoolsHead.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PP.schools.map((s) => (
              <div
                key={s.title}
                className="flex flex-col overflow-hidden rounded-[18px] border border-white/15 bg-bl-surface"
              >
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="m-0 text-lg font-semibold">{s.title}</h3>
                  <p className="m-0 flex-1 text-sm leading-relaxed text-bl-ink-3">{s.body}</p>
                  <div className="eyebrow flex justify-between border-t border-bl-line pt-3 text-[length:calc(10px*var(--bl-scale))]">
                    <span className="text-bl-accent">{s.format}</span>
                    <span className="text-bl-ink-3">{s.who}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="pca" className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow={PP.pca.eyebrow} title={PP.pca.title}>
            <p className="m-0 max-w-[640px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-2">
              {PP.pca.intro}
            </p>
          </SectionHead>
          <div className="grid auto-rows-[200px] grid-cols-2 gap-3 lg:grid-cols-4">
            {PP.pca.imgs.map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={src}
                  alt="PCA Seoul program"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="grid gap-12 py-24 lg:grid-cols-[1fr_1.4fr] lg:py-28">
          <div className="flex flex-col gap-4">
            <Eyebrow>{PP.orgsHead.eyebrow}</Eyebrow>
            <h2 className="h2">{PP.orgsHead.title}</h2>
            <p className="m-0 text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
              {PP.orgsHead.text}
            </p>
          </div>
          <ol className="m-0 list-none p-0">
            {PP.orgs.map((o, i) => (
              <li
                key={o.title}
                className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-t border-white/15 py-5"
              >
                <span className="eyebrow pt-1 text-xs text-bl-accent">0{i + 1}</span>
                <div>
                  <div className="text-lg font-semibold">{o.title}</div>
                  <div className="mt-1 text-[length:calc(15px*var(--bl-scale))] text-bl-ink-3">
                    {o.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="gridbg border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow={PP.casesHead.eyebrow} title={PP.casesHead.title} />
          <div className="grid gap-4 md:grid-cols-2">
            {PP.cases.map((c) => (
              <SiteLink
                key={c.title}
                href={c.href}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-white/15 bg-bl-bg no-underline transition-colors hover:border-bl-accent"
              >
                <div className="overflow-hidden">
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-accent">
                    {c.kicker} · {c.who}
                  </span>
                  <h3 className="m-0 text-xl font-semibold text-bl-ink">{c.title}</h3>
                  <p className="m-0 text-[length:calc(15px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
                    {c.body}
                  </p>
                  <div className="flex gap-8 border-t border-bl-line pt-4">
                    {c.stats.map(([n, l]) => (
                      <div key={l} className="flex flex-col">
                        <span className="disp text-2xl text-bl-ink">{n}</span>
                        <span className="eyebrow text-[length:calc(10px*var(--bl-scale))] text-bl-ink-3">
                          {l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SiteLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-bl-line">
        <Container className="flex flex-col gap-10 py-24 lg:py-28">
          <SectionHead eyebrow={PP.stepsHead.eyebrow} title={PP.stepsHead.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PP.steps.map((s, i) => (
              <div
                key={s.title}
                className="flex flex-col gap-3 rounded-[18px] border border-white/15 p-6"
              >
                <span className="disp text-4xl text-bl-accent">0{i + 1}</span>
                <span className="text-lg font-semibold">{s.title}</span>
                <span className="text-sm leading-relaxed text-bl-ink-3">{s.body}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Contact />
    </Page>
  );
}

function Contact() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (k: string) =>
    setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name") ?? ""}`,
      `Organisation: ${f.get("org") ?? ""}`,
      `Email: ${f.get("email") ?? ""}`,
      `Interested in: ${picked.join(", ") || "—"}`,
      "",
      String(f.get("msg") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent("Partnership enquiry")}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-bl-bg px-4 py-3 text-[length:calc(15px*var(--bl-scale))] text-bl-ink outline-none placeholder:text-bl-ink-3 focus:border-bl-accent";

  return (
    <section id="contact" className="gridbg">
      <Container className="grid gap-12 py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-5">
          <Eyebrow>{PP.contact.eyebrow}</Eyebrow>
          <h2 className="h2">{PP.contact.title}</h2>
          <p className="m-0 max-w-[460px] text-[length:calc(17px*var(--bl-scale))] leading-relaxed text-bl-ink-3">
            {PP.contact.text}
          </p>
          <div className="mt-2 flex flex-col gap-2 text-[length:calc(15px*var(--bl-scale))] text-bl-ink-2">
            <a
              href={`mailto:${settings.email}`}
              className="text-bl-ink-2 no-underline hover:text-bl-accent"
            >
              {settings.email}
            </a>
          </div>
        </div>
        <form
          onSubmit={submit}
          className="flex flex-col gap-4 rounded-[22px] border border-white/15 bg-bl-surface p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-bl-ink-2">
              Name
              <input name="name" required className={field} autoComplete="name" />
            </label>
            <label className="flex flex-col gap-2 text-sm text-bl-ink-2">
              Organisation
              <input name="org" className={field} autoComplete="organization" />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-bl-ink-2">
            Email
            <input name="email" type="email" required className={field} autoComplete="email" />
          </label>
          <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
            <legend className="mb-2 text-sm text-bl-ink-2">Interested in</legend>
            <div className="flex flex-wrap gap-2">
              {PP.interests.map((k) => {
                const on = picked.includes(k);
                return (
                  <button
                    type="button"
                    key={k}
                    aria-pressed={on}
                    onClick={() => toggle(k)}
                    className={`cursor-pointer rounded-full border px-3.5 py-2 text-[length:calc(13px*var(--bl-scale))] transition-colors ${on ? "border-bl-accent bg-bl-accent text-bl-bg" : "border-white/20 bg-transparent text-bl-ink-2 hover:border-white/40"}`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2 text-sm text-bl-ink-2">
            Message
            <textarea name="msg" rows={4} className={field} />
          </label>
          <button
            type="submit"
            className="mt-1 cursor-pointer rounded-full border-0 bg-bl-accent px-6 py-3.5 text-[length:calc(15px*var(--bl-scale))] font-semibold text-bl-bg hover:brightness-110"
          >
            {PP.contact.submitLabel}
          </button>
        </form>
      </Container>
    </section>
  );
}
