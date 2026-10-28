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
});
