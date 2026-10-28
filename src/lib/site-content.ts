import { supabase } from "@/integrations/supabase/client";
import { SECTIONS, type Overrides, type SectionKey } from "@/content/cms";

const KEYS = new Set<string>(SECTIONS.map((s) => s.key));

/**
 * Read everything saved in the CMS. Never throws: if the database is not set
 * up yet or unreachable, the site simply shows its built-in content.
 */
export async function fetchOverrides(): Promise<Overrides> {
  try {
    const { data, error } = await supabase.from("site_content").select("key,data");
    if (error || !data) return {};
    const out: Overrides = {};
    for (const row of data) if (KEYS.has(row.key)) out[row.key as SectionKey] = row.data;
    return out;
  } catch {
    return {};
  }
}
