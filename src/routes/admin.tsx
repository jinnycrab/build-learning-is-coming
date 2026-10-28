import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/admin")({
  // Sign-in lives in the browser, so the editor renders there only.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Site editor — Build Learning" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminApp,
});
