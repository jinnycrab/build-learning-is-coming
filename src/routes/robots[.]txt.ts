import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

/** Every search and AI crawler is welcome; the editor pages carry their own noindex tags. */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
