import { supabase } from "@/integrations/supabase/client";
import { SECTIONS, getDefault } from "@/content/cms";

export const BUCKET = "site-media";

const IMG_RE = /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i;
export const IMAGE_KEYS = new Set([
  "img",
  "src",
  "photo",
  "logo",
  "cover",
  "hero",
  "heroImage",
  "image",
  "flag",
]);
export const IMAGE_LIST_KEYS = new Set(["imgs", "heroImages", "images"]);

export function looksLikeImage(v: unknown) {
  return (
    typeof v === "string" && (v.startsWith("/img/") || (/^https?:\/\//.test(v) && IMG_RE.test(v)))
  );
}

/** Every image the built-in site already uses, so admins can pick them again. */
export function siteImages(): string[] {
  const out = new Set<string>();
  const walk = (v: unknown) => {
    if (looksLikeImage(v)) out.add(v as string);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  SECTIONS.forEach((s) => walk(getDefault(s.key)));
  return [...out].sort();
}

/** Shrink large photos to WebP before upload so pages stay fast. Logos and SVGs are left as they are. */
async function optimise(file: File): Promise<{ blob: Blob; ext: string; type: string }> {
  const keep = {
    blob: file as Blob,
    ext: (file.name.split(".").pop() || "bin").toLowerCase(),
    type: file.type,
  };
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return keep;
  try {
    const bmp = await createImageBitmap(file);
    const max = 2400;
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 600_000) return keep;
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/webp", 0.86));
    return blob ? { blob, ext: "webp", type: "image/webp" } : keep;
  } catch {
    return keep;
  }
}

export async function uploadImage(file: File): Promise<string> {
  const { blob, ext, type } = await optimise(file);
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50) || "image";
  const path = `${new Date().toISOString().slice(0, 10)}/${base}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: type, cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export type MediaItem = {
  path: string;
  url: string;
  size?: number | undefined;
  created?: string | null | undefined;
};

export async function listUploads(): Promise<MediaItem[]> {
  const { data: folders, error } = await supabase.storage
    .from(BUCKET)
    .list("", { limit: 200, sortBy: { column: "name", order: "desc" } });
  if (error || !folders) return [];
  const items: MediaItem[] = [];
  for (const f of folders) {
    if (f.id) {
      items.push({
        path: f.name,
        url: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
        size: f.metadata?.["size"],
        created: f.created_at,
      });
      continue;
    }
    const { data: files } = await supabase.storage
      .from(BUCKET)
      .list(f.name, { limit: 500, sortBy: { column: "created_at", order: "desc" } });
    for (const x of files ?? []) {
      const path = `${f.name}/${x.name}`;
      items.push({
        path,
        url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl,
        size: x.metadata?.["size"],
        created: x.created_at,
      });
    }
  }
  return items;
}

export async function deleteUpload(path: string) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
