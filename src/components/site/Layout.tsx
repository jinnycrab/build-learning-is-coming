import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { nav, settings, ARCHIVES_URL } from "@/content/site";

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
}) {
  const external = /^https?:|^mailto:/.test(href);
  if (external)
    return (
      <a href={href} className={className} style={style} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...rest}>
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
    <Link to={path || "/"} {...(hash ? { hash } : {})} className={className} style={style} {...rest}>
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, muted = false, className = "" }: { children: ReactNode; muted?: boolean; className?: string }) {
  return <span className={`eyebrow ${muted ? "text-bl-ink-3" : "text-bl-accent"} ${className}`}>{children}</span>;
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
  const base = "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:-translate-y-0.5";
  const v =
    variant === "primary"
      ? "bg-bl-accent !text-bl-bg"
      : variant === "light"
        ? "bg-bl-ink !text-bl-bg"
        : "border border-white/30 hover:border-bl-yellow";
  return (
    <SiteLink href={href} className={`${base} ${v} ${className}`}>
      {children}
    </SiteLink>
  );
}

export function SectionHead({ eyebrow, title, aside, children }: { eyebrow: string; title: ReactNode; aside?: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex max-w-[860px] flex-col gap-4">
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
  const crumb = nav.find((n) => n.href !== "/" && !n.external && pathname.startsWith(n.href));
  return (
    <header className="sticky top-0 z-40 border-b border-bl-line bg-bl-bg/85 backdrop-blur-md">
      <Container className="flex items-center gap-6 py-4">
        <Link to="/" aria-label="Build Learning — home" title="Home" className="flex shrink-0 items-center">
          <img src={settings.logo} alt="Build Learning" className="h-7 w-auto brightness-0 invert" />
        </Link>
        <nav aria-label="Primary" className="hidden flex-1 justify-center gap-7 text-sm text-bl-ink-2 lg:flex">
          {nav.map((n) => {
            const active = !n.external && (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href));
            return (
              <SiteLink key={n.label} href={n.href} className={active ? "!text-bl-accent" : ""}>
                {n.label}
              </SiteLink>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Button href={settings.headerCta.href} className="!min-h-10 !px-5 !py-2 text-sm">
            {settings.headerCta.label}
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>
      {open && (
        <nav aria-label="Mobile" className="border-t border-bl-line lg:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((n) => (
              <SiteLink key={n.label} href={n.href} className="border-b border-bl-line py-3 text-base last:border-0">
                {n.label}
              </SiteLink>
            ))}
          </Container>
        </nav>
      )}
      {crumb && (
        <nav aria-label="Breadcrumb" className="hidden lg:block">
          <Container className="pb-3">
            <ol className="eyebrow flex gap-2.5 text-[11px] text-bl-ink-3">
              <li>
                <Link to="/" className="text-bl-ink-2">
                  ← Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-bl-ink">
                {crumb.label}
              </li>
            </ol>
          </Container>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-bl-line">
      <Container className="grid gap-8 py-12 text-sm text-bl-ink-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <img src={settings.logo} alt="Build Learning" className="h-7 w-fit brightness-0 invert" />
          <span>Singapore · Seoul · San Francisco</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-[11px] text-bl-ink-3">Explore</span>
          <SiteLink href="/programs">Programs</SiteLink>
          <SiteLink href="/competitions">Competitions</SiteLink>
          <SiteLink href="/immersion">Immersions</SiteLink>
          <SiteLink href="/partners">Schools & Partners</SiteLink>
          <SiteLink href={ARCHIVES_URL}>The Global Archives ↗</SiteLink>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-[11px] text-bl-ink-3">Contact</span>
          <SiteLink href={`mailto:${settings.email}`}>{settings.email}</SiteLink>
          {settings.phones.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="eyebrow text-[11px] text-bl-ink-3">Follow</span>
          <SiteLink href={settings.instagram}>Instagram</SiteLink>
          <SiteLink href={settings.linkedin}>LinkedIn</SiteLink>
        </div>
      </Container>
      <Container className="pb-10">
        <span className="eyebrow text-[11px] text-bl-ink-3">© {new Date().getFullYear()} Build Learning</span>
      </Container>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bl-bg text-bl-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-bl-ink focus:px-3 focus:py-2 focus:text-bl-bg">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
