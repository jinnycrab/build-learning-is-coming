import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Learning — Coming soon" },
      { name: "description", content: "Build Learning is coming soon." },
      { property: "og:title", content: "Build Learning — Coming soon" },
      { property: "og:description", content: "Build Learning is coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Build Learning
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
        Coming soon
      </h1>
    </main>
  );
}
