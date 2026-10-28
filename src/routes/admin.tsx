import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Site editor — Build Learning" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Sign in to manage Build Learning site content, media and editor access.",
      },
      { property: "og:title", content: "Site editor — Build Learning" },
      {
        property: "og:description",
        content: "Sign in to manage Build Learning site content, media and editor access.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminApp,
});
