import { cmsSupabase as supabase } from "@/lib/cms-client";
import { SECTIONS, type Overrides, type SectionKey } from "@/content/cms";

const KEYS = new Set<string>(SECTIONS.map((s) => s.key));

/**
 * Read everything saved in the CMS. Never throws: if the database is not set
 * up yet or unreachable, the site simply shows its built-in content.
 */
export async function fetchOverrides(): Promise<Overrides> {
  try {
    // Never let a slow or unreachable database hold up the page.
    const timeout = new Promise<{ data: null; error: Error }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error("timeout") }), 4000),
    );
    const { data, error } = await Promise.race([
      supabase.from("site_content").select("key,data"),
      timeout,
    ]);
    if (error || !data) return {};
    const out: Overrides = {};
    for (const row of data) if (KEYS.has(row.key)) out[row.key as SectionKey] = row.data;
    return out;
  } catch {
    return {};
  }
}
