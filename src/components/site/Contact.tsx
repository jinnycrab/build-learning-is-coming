/**
 * Contact section: details and social links beside an enquiry form.
 *
 * The form emails enquiries through Web3Forms when settings.formKey is set;
 * without a key it opens the visitor's email app with the message filled in.
 */
import { useState, type FormEvent } from "react";
import { about, settings } from "@/content/site";
import { Container, Eyebrow, SiteLink } from "./Layout";
import { Icon, MSection, mt } from "./Mobile";

const C = () => about.contact;
const social = () =>
  settings.footer.social.map((s) => ({
    ...s,
    icon: /linkedin/i.test(s.label + s.href) ? "linkedin" : /instagram/i.test(s.label + s.href) ? "instagram" : "external",
  }));
/** Phone numbers from Brand & contact; each opens a WhatsApp chat. */
const phones = () =>
  settings.phones.map((p) => p.trim()).filter(Boolean).map((label) => ({ label, href: `https://wa.me/${label.replace(/\D/g, "")}` }));

function ContactForm({ idPrefix, phone = false }: { idPrefix: string; phone?: boolean }) {
  const F = C().form;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("botcheck")) return; // filled only by spam bots
    const name = String(d.get("name") ?? "");
    const email = String(d.get("email") ?? "");
    const message = String(d.get("message") ?? "");
    if (!settings.formKey.trim()) {
      const body = `${message}\n\n${name}\n${email}`;
      window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(F.emailSubject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: settings.formKey.trim(),
          subject: F.emailSubject,
          from_name: "Build Learning website",
          name,
          email,
          message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("not sent");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }
  const label = phone
    ? `${mt.statLabel} !text-bl-ink-2`
    : "text-[length:calc(14px*var(--bl-scale))] font-medium text-bl-ink-2";
  const field = phone
    ? `m-card w-full rounded-xl border-0 px-4 py-3 ${mt.body} !text-bl-ink outline-none focus:ring-2 focus:ring-bl-accent`
    : "w-full rounded-xl border border-bl-line bg-bl-surface px-4 py-3 text-[length:calc(16px*var(--bl-scale))] text-bl-ink outline-none focus:border-bl-accent";
  if (state === "sent")
    return (
      <p role="status" className={phone ? `${mt.body} m-card rounded-2xl p-4 !text-bl-ink` : "m-0 rounded-2xl border border-bl-line p-6 text-lg leading-relaxed"}>
        {F.sentText}
      </p>
    );
  return (
    <form onSubmit={submit} className={`flex flex-col ${phone ? "gap-4" : "gap-6"}`}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor={`${idPrefix}-name`} className="flex flex-col gap-2">
        <span className={label}>{F.nameLabel}</span>
        <input id={`${idPrefix}-name`} name="name" required autoComplete="name" className={field} />
      </label>
      <label htmlFor={`${idPrefix}-email`} className="flex flex-col gap-2">
        <span className={label}>{F.emailLabel}</span>
        <input id={`${idPrefix}-email`} name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label htmlFor={`${idPrefix}-message`} className="flex flex-col gap-2">
        <span className={label}>{F.messageLabel}</span>
        <textarea id={`${idPrefix}-message`} name="message" required rows={phone ? 5 : 6} className={`${field} resize-y`} />
      </label>
      {state === "error" && (
        <p role="alert" className={phone ? `${mt.meta} !text-bl-accent` : "m-0 text-sm text-bl-accent"}>
          {F.errorText.replaceAll("{email}", settings.email)}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className={
          phone
            ? "flex h-[50px] w-full cursor-pointer items-center justify-center rounded-full border-0 bg-bl-accent text-[length:calc(16px*var(--bl-scale))] font-semibold text-[#07080b] disabled:opacity-60"
            : "inline-flex min-h-11 cursor-pointer items-center justify-center self-start rounded-full border-0 bg-bl-accent px-7 py-3 text-[length:calc(15px*var(--bl-scale))] font-semibold text-[#07080b] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        }
      >
        {state === "sending" ? F.sendingLabel : F.submitLabel}
      </button>
    </form>
  );
}

/** Desktop and tablet (768px and up). */
export function ContactSection({ id }: { id?: string | undefined }) {
  const c = C();
  const row = "inline-flex min-h-11 items-center gap-4 text-[length:calc(18px*var(--bl-scale))] text-bl-ink no-underline hover:!text-bl-yellow";
  return (
    <section id={id} className="bl-light scroll-mt-24">
      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {c.eyebrow && <Eyebrow>{c.eyebrow}</Eyebrow>}
            <h2 className="h2">{c.title}</h2>
            {c.text && <p className="m-0 text-[length:calc(18px*var(--bl-scale))] text-bl-ink-2">{c.text}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <SiteLink href={`mailto:${settings.email}`} className={row}>
              <Icon name="mail" size={24} className="text-bl-accent" />
              {settings.email}
            </SiteLink>
            {phones().map((p) => (
              <SiteLink key={p.label} href={p.href} className={row}>
                <Icon name="chat" size={24} className="text-bl-accent" />
                {p.label}
              </SiteLink>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-bl-line pt-6">
            <span className="disp text-[length:calc(20px*var(--bl-hscale))]">{c.followLabel}</span>
            <div className="flex flex-wrap gap-6">
              {social().map((s) => (
                <SiteLink key={s.href} href={s.href} className="eyebrow inline-flex min-h-11 items-center gap-2 text-[length:calc(13px*var(--bl-scale))] text-bl-ink-2 no-underline">
                  <Icon name={s.icon} size={18} />
                  {s.label}
                </SiteLink>
              ))}
            </div>
          </div>
        </div>
        <ContactForm idPrefix="contact-d" />
      </Container>
    </section>
  );
}

/** Phone layout. */
export function MobileContactSection({ id }: { id?: string | undefined }) {
  const c = C();
  const rows = [
    { title: settings.email, href: `mailto:${settings.email}`, icon: "mail" },
    ...phones().map((p) => ({ title: p.label, href: p.href, icon: "chat" })),
  ];
  return (
    // White band to the end of the page (it cancels the page's bottom padding).
    <div className="bl-light -mb-12 pb-[max(48px,env(safe-area-inset-bottom))] pt-12">
    <MSection id={id} eyebrow={c.eyebrow} title={c.title} text={c.text}>
      <div className="px-5">
        <div className="m-card overflow-hidden rounded-2xl">
          {rows.map((r, i) => (
            <div key={r.title} className="relative">
              {i > 0 && <span aria-hidden="true" className="m-sep absolute left-[60px] right-0 top-0" />}
              <SiteLink href={r.href} className="flex min-h-[56px] items-center gap-3 px-4 py-3 text-bl-ink no-underline">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bl-accent/15 text-bl-accent">
                  <Icon name={r.icon} size={18} />
                </span>
                <span className={`${mt.card} min-w-0 flex-1 break-words`}>{r.title}</span>
              </SiteLink>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-6 px-5">
        {social().map((s) => (
          <SiteLink key={s.href} href={s.href} className={`inline-flex min-h-11 items-center gap-2 ${mt.body} no-underline`}>
            <Icon name={s.icon} size={18} className="text-bl-ink-3" />
            {s.label}
          </SiteLink>
        ))}
      </div>
      <div className="px-5">
        <ContactForm idPrefix="contact-m" phone />
      </div>
    </MSection>
    </div>
  );
}
