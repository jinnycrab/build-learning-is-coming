import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { nav, settings } from "@/content/site";
import { useIsPhone } from "./hooks";
import { MobileFooter, MobileHeader } from "./Mobile";

export function SiteLink({
  href,
  className,
  style,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
  title?: string;
  onClick?: () => void;
}) {
  const external = /^https?:|^mailto:/.test(href);
  if (external)
    return (
      <a
        href={href}
        className={className}
        style={style}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  if (href.startsWith("#"))
    return (
      <a href={href} className={className} style={style} {...rest}>
        {children}
      </a>
    );
  const [path, hash] = href.split("#");
  return (
    <Link
      to={path || "/"}
      {...(hash ? { hash } : {})}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full min-w-0 max-w-[1320px] px-5 sm:px-10 ${className}`}>{children}</div>
  );
}

export function Eyebrow({
  children,
  muted = false,
  className = "",
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <span className={`eyebrow ${muted ? "text-bl-ink-3" : "text-bl-accent"} ${className}`}>
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
}) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-[length:calc(15px*var(--bl-scale))] font-semibold transition-transform hover:-translate-y-0.5";
  const v =
    variant === "primary"
      ? "bg-bl-accent !text-bl-bg"
      : variant === "light"
        ? "bg-bl-ink !text-bl-bg"
        : "border border-white/30 hover:border-bl-yellow";
  // A label cleared in the CMS hides the button instead of leaving an empty pill.
  if (children == null || (typeof children === "string" && !children.trim())) return null;
  return (
    <SiteLink href={href} className={`${base} ${v} ${className}`}>
      {children}
    </SiteLink>
  );
}

export function SectionHead({
  eyebrow,
  title,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="grid min-w-0 items-end gap-6 lg:flex lg:flex-wrap lg:justify-between">
      <div className="flex min-w-0 max-w-[860px] flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h2">{title}</h2>
        {children}
      </div>
      {aside}
    </div>
  );
}

function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 hidden border-b border-bl-line bg-bl-bg/85 backdrop-blur-md md:block">
      <Container className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 xl:flex xl:gap-5">
        <Link
          to="/"
          aria-label="Build Learning — home"
          title="Home"
          className="flex min-w-0 items-center xl:shrink-0"
        >
          <img
            src={settings.logo}
            alt="Build Learning"
            className="h-auto max-h-7 w-auto max-w-full brightness-0 invert"
          />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 justify-end gap-6 whitespace-nowrap text-sm text-bl-ink-2 xl:flex"
        >
          {nav.map((n) => {
            const active =
              !n.external && (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href));
            return (
              <SiteLink key={n.label} href={n.href} className={active ? "!text-bl-accent" : ""}>
                {n.label}
              </SiteLink>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bl-line xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>
      {open && (
        <nav aria-label="Mobile" className="border-t border-bl-line xl:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((n) => (
              <SiteLink
                key={n.label}
                href={n.href}
                className="border-b border-bl-line py-3 text-base last:border-0"
              >
                {n.label}
              </SiteLink>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const f = settings.footer;
  const label = "eyebrow text-[length:calc(11px*var(--bl-scale))] text-bl-ink-3";
  // Only the visible footer carries the "#contact" target (the phone footer has its own).
  const contactId = useIsPhone() ? undefined : "contact";
  return (
    <footer className="hidden border-t border-bl-line md:block">
      <Container className="grid gap-8 py-12 text-sm text-bl-ink-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <img src={settings.logo} alt="Build Learning" className="h-7 w-fit brightness-0 invert" />
          <span>{f.tagline}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className={label}>{f.exploreLabel}</span>
          {f.links.map((l) => (
            <SiteLink key={l.label + l.href} href={l.href}>
              {l.label}
            </SiteLink>
          ))}
        </div>
        {/* Links to "#contact" (e.g. "I'm an organisation") land here now the enquiry form is gone. */}
        <div id={contactId} className="flex scroll-mt-24 flex-col gap-2.5">
          <span className={label}>{f.contactLabel}</span>
          <SiteLink href={`mailto:${settings.email}`}>{settings.email}</SiteLink>
          {settings.phones.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <span className={label}>{f.followLabel}</span>
          {f.social.map((l) => (
            <SiteLink key={l.label + l.href} href={l.href}>
              {l.label}
            </SiteLink>
          ))}
        </div>
      </Container>
      <Container className="pb-10">
        <span className={label}>{f.copyright.replaceAll("{year}", String(new Date().getFullYear()))}</span>
      </Container>
    </footer>
  );
}

export function Page({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <div className="min-h-screen bg-bl-bg text-bl-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bl-ink focus:px-3 focus:py-2 focus:text-bl-bg"
      >
        {settings.skipLink}
      </a>
      <MobileHeader />
      <Header />
      <main id="main">{children}</main>
      {footer && <Footer />}
      {footer && <MobileFooter />}
    </div>
  );
}
