import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/cms-preview")({
  ssr: false,
  head: () => ({ meta: [
    { title: "CMS live preview — Build Learning" },
    { name: "description", content: "Private live preview of Build Learning CMS edits." },
    { property: "og:title", content: "CMS live preview — Build Learning" },
    { property: "og:description", content: "Private live preview of Build Learning CMS edits." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: () => <AdminApp previewOnly />,
});