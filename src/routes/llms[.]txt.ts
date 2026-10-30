import { createFileRoute } from "@tanstack/react-router";
import { PUBLIC_PAGES, SITE_URL } from "@/lib/seo";
import { programs, programsPage, seo, settings } from "@/content/site";
import { applyOverrides } from "@/content/cms";
import { fetchOverrides } from "@/lib/site-content";

/**
 * /llms.txt — a plain-text summary for AI answer engines (ChatGPT, Perplexity,
 * Gemini, Claude). Built from the same CMS content as the pages, so it stays
 * current when the site is edited.
 */
const PAGE_KEYS: Record<string, keyof typeof seo.pages> = {
  "/": "home",
  "/programs": "programs",
  "/competitions": "competitions",
  "/immersion": "immersion",
  "/partners": "partners",
  "/about": "about",
};

function build() {
  const lines: string[] = [];
  lines.push(`# ${seo.siteName}`, "", `> ${seo.summary}`, "");
  lines.push("## Pages", "");
  for (const path of PUBLIC_PAGES) {
    const p = seo.pages[PAGE_KEYS[path] ?? "home"];
    lines.push(`- [${p.title}](${SITE_URL}${path}): ${p.description}`);
  }
  lines.push("", "## Flagship program", "");
  lines.push(`- ${programsPage.studio.title}: ${programsPage.studio.text.trim()} (${programsPage.studio.facts.join(" · ")})`);
  lines.push("", "## Upcoming", "");
  for (const p of programs.filter((x) => x.upcoming)) lines.push(`- ${p.title} — ${p.when}, ${p.where}. ${p.body}`);
  lines.push("", "## Past programs", "");
  for (const p of programs.filter((x) => !x.upcoming)) lines.push(`- ${p.title} — ${p.when}, ${p.where}. ${p.body}`);
  lines.push("", "## Contact", "", `- Email: ${settings.email}`, ...settings.phones.map((p) => `- Phone: ${p}`), "");
  return lines.join("\n");
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        try {
          applyOverrides(await fetchOverrides());
        } catch {
          // Fall back to the built-in content if the CMS can't be reached.
        }
        return new Response(build(), { headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
