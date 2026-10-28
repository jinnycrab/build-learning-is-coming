import { SECTIONS, type Overrides } from "@/content/cms";

export const PREVIEW_CHANNEL = "build-learning-cms-preview";
export const PREVIEW_PAGES = ["/", "/programs", "/competitions", "/immersion", "/partners", "/about"] as const;
export function previewPath(value: unknown): string {
  return PREVIEW_PAGES.find((path) => path === value) ?? "/";
}
export function previewOverrides(saved: Partial<Record<string, { data: unknown }>>, drafts: Overrides): Overrides {
  const result: Overrides = {};
  for (const { key } of SECTIONS) {
    if (saved[key]) result[key] = saved[key]?.data;
    if (drafts[key] !== undefined) result[key] = drafts[key];
  }
  return result;
}