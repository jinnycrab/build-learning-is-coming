import { useEffect, useRef, useState } from "react";
import { PREVIEW_CHANNEL, PREVIEW_PAGES, previewPath } from "@/lib/cms-preview";
import type { Overrides } from "@/content/cms";

export function LivePreview() {
  const frame = useRef<HTMLIFrameElement>(null);
  const snapshot = useRef<Overrides>({});
  const [path, setPath] = useState("/");
  useEffect(() => {
    const channel = new BroadcastChannel(PREVIEW_CHANNEL);
    const send = () => frame.current?.contentWindow?.postMessage({ type: "cms-draft", overrides: snapshot.current }, window.location.origin);
    channel.onmessage = ({ data }) => {
      if (data?.type !== "snapshot") return;
      snapshot.current = data.overrides;
      setPath(previewPath(data.path));
      send();
    };
    const ready = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "cms-ready") return;
      send();
    };
    window.addEventListener("message", ready);
    channel.postMessage({ type: "request" });
    return () => { channel.close(); window.removeEventListener("message", ready); };
  }, []);
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3">
        <h1 className="text-base font-semibold">Live preview</h1>
        <select aria-label="Preview page" className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={path} onChange={(e) => setPath(previewPath(e.target.value))}>
          {PREVIEW_PAGES.map((page) => <option key={page} value={page}>{page === "/" ? "Home" : page.slice(1)}</option>)}
        </select>
      </header>
      <iframe ref={frame} title="CMS live preview" src={`${path}?cmsPreview=1`} className="min-h-0 w-full flex-1 border-0 bg-background" />
    </div>
  );
}