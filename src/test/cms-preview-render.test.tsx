import { act, cleanup, render, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const fixtures = vi.hoisted(() => ({
  saved: { home: { eyebrow: "Published" } },
  applyOverrides: vi.fn(),
  parent: { postMessage: vi.fn() },
}));

vi.mock("@tanstack/react-router", () => ({
  createRootRouteWithContext: () => (options: unknown) => ({
    options,
    useRouteContext: () => ({ queryClient: new QueryClient() }),
    useLoaderData: () => {
      // The real router hook also consumes React hooks. A conditional call
      // must fail when the preview switches from published content to a draft.
      useState(null);
      return { overrides: fixtures.saved };
    },
  }),
  Outlet: () => null,
  Link: () => null,
  HeadContent: () => null,
  Scripts: () => null,
  useRouter: () => ({}),
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getUser: async () => ({ data: { user: { id: "owner-fixture" } } }) },
    rpc: async () => ({ data: true, error: null }),
  },
}));
vi.mock("@/content/cms", () => ({
  applyOverrides: fixtures.applyOverrides,
  brandCss: () => "",
  fontHref: () => "",
}));
vi.mock("@/lib/site-content", () => ({ fetchOverrides: async () => ({}) }));

import { Route } from "@/routes/__root";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/");
});

describe("Live CMS preview rendering", () => {
  it("continues rendering after the first and subsequent live edits", async () => {
    window.history.replaceState({}, "", "/?cmsPreview=1");
    vi.spyOn(window, "parent", "get").mockReturnValue(fixtures.parent as unknown as Window);
    const Component = Route.options.component;
    if (!Component) throw new Error("Missing root component");
    render(<Component />);
    await waitFor(() => expect(fixtures.parent.postMessage).toHaveBeenCalledWith(
      { type: "cms-ready" }, window.location.origin,
    ));
    for (const eyebrow of ["First live edit", "Second live edit"]) {
      const overrides = { home: { eyebrow } };
      act(() => window.dispatchEvent(new MessageEvent("message", {
        origin: window.location.origin,
        source: fixtures.parent as unknown as Window,
        data: { type: "cms-draft", overrides },
      })));
      expect(fixtures.applyOverrides).toHaveBeenLastCalledWith(overrides);
    }
  });
});