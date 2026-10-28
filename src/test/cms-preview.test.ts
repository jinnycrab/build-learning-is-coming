import { describe, expect, it } from "vitest";
import { previewOverrides, previewPath } from "@/lib/cms-preview";

describe("CMS preview", () => {
  it("shows unsaved edits ahead of saved content without mutating it", () => {
    const saved = { home: { data: { headline: "Published" } } };
    expect(previewOverrides(saved, { home: { headline: "Draft" } }).home).toEqual({ headline: "Draft" });
    expect(saved.home.data.headline).toBe("Published");
  });
  it("restores saved content when a draft is discarded", () => {
    expect(previewOverrides({ home: { data: { headline: "Published" } } }, {}).home).toEqual({ headline: "Published" });
  });
  it("rejects external preview destinations", () => {
    expect(previewPath("https://example.com")).toBe("/");
    expect(previewPath("/about")).toBe("/about");
  });
});