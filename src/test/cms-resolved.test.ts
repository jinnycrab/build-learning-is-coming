import { describe, expect, it } from "vitest";
import { resolved } from "@/content/cms";

describe("CMS resolved content", () => {
  it("keeps saved edits but drops fields the page no longer uses", () => {
    const home = resolved("home", { eyebrow: "Saved", build: [{ letter: "B" }] }) as Record<
      string,
      unknown
    >;
    expect(home["eyebrow"]).toBe("Saved");
    expect(home).not.toHaveProperty("build");
    expect(home).toHaveProperty("method");
  });

  it("drops removed fields inside saved objects too", () => {
    const page = resolved("partnersPage", {
      hero: { title: "Saved title", primary: { label: "I’m a school", href: "#schools" } },
    }) as { hero: Record<string, unknown> };
    expect(page.hero["title"]).toBe("Saved title");
    expect(page.hero).not.toHaveProperty("primary");
    expect(page.hero).toHaveProperty("text");
  });
});

describe("CMS list items", () => {
  it("adds fields new in code to items saved before they existed", () => {
    const saved = [{ category: "C", title: "T", by: "B", cover: "/x.webp" }];
    const work = resolved("studentWork", saved) as Record<string, unknown>[];
    expect(work).toHaveLength(1);
    expect(work[0]).toEqual({ ...saved[0], href: "" });
  });

  it("keeps a saved link", () => {
    const saved = [{ category: "C", title: "T", by: "B", cover: "/x.webp", href: "https://a.b" }];
    const work = resolved("studentWork", saved) as Record<string, unknown>[];
    expect(work[0]?.["href"]).toBe("https://a.b");
  });
});
