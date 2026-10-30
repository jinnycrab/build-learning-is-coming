/**
 * Search engines, AI answer engines and link previews.
 *
 * SITE_URL is the site's public address. When the custom domain is live,
 * change this one line; the canonical tags, sitemap, robots.txt, share
 * previews and structured data all follow it.
 */
import { about, people, settings } from "@/content/site";

export const SITE_URL = "https://buildlearning.co";

/** Public pages, in the order they appear in the sitemap. */
export const PUBLIC_PAGES = ["/", "/programs", "/competitions", "/immersion", "/partners", "/about"];

const abs = (path: string) => (/^https?:/.test(path) ? path : SITE_URL + path);

/** Title, description, canonical address and share preview for one page. */
export function pageHead({
  path,
  title,
  description,
  image,
}: {
  path: string;
  title: string;
  description: string;
  /** A 1200×630 share image under /public. */
  image: string;
}) {
  const url = abs(path);
  const img = abs(image);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "Build Learning" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** A schema.org block as a head script. "<" is escaped so text can't close the tag. */
export function jsonLd(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data).replace(/</g, "\\u003c") };
}

/** Who Build Learning is, for search engines and AI assistants. */
export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Build Learning",
    url: SITE_URL,
    logo: abs(settings.logo),
    email: settings.email,
    description: about.intro,
    address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
    founder: about.founders.flatMap((f) => (people[f.key] ? [{ "@type": "Person", name: people[f.key]!.name }] : [])),
    sameAs: settings.footer.social.map((s) => s.href),
  };
}

/** An event listing, skipped when its dates are missing. */
export function event({
  name,
  description,
  startDate,
  endDate,
  url,
  image,
  online,
  place,
  price,
  currency,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  image: string;
  online: boolean;
  place?: string;
  price?: string;
  currency?: string;
}) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(startDate) || !/^\d{4}-\d{2}-\d{2}/.test(endDate)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name,
    description,
    startDate,
    endDate,
    url: abs(url),
    image: abs(image),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: online
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: online
      ? { "@type": "VirtualLocation", url: abs(url) }
      : { "@type": "Place", name: place ?? "Singapore", address: { "@type": "PostalAddress", addressLocality: place ?? "Singapore", addressCountry: "SG" } },
    organizer: { "@id": `${SITE_URL}/#organization` },
    ...(price?.trim()
      ? { offers: { "@type": "Offer", price: price.trim(), priceCurrency: currency || "USD", url: abs(url), availability: "https://schema.org/InStock" } }
      : {}),
  };
}
