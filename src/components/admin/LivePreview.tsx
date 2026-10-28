import { useEffect, useRef, useState } from "react";
import { PREVIEW_CHANNEL, PREVIEW_PAGES, previewPath } from "@/lib/cms-preview";
import type { Overrides } from "@/content/cms";

export function LivePreview({ overrides, page }: { overrides?: Overrides; page?: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const snapshot = useRef<Overrides>({});
  const [path, setPath] = useState("/");
  const [size, setSize] = useState({ width: 1280, height: 800, scale: 1 });
  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const available = stage.current?.clientWidth ?? width;
      setSize({ width, height, scale: Math.min(1, available / width) });
    };
    const observer = new ResizeObserver(measure);
    if (stage.current) observer.observe(stage.current);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  useEffect(() => {
    if (!overrides) return;
    snapshot.current = overrides;
    frame.current?.contentWindow?.postMessage({ type: "cms-draft", overrides }, window.location.origin);
  }, [overrides]);
  useEffect(() => { if (page) setPath(previewPath(page)); }, [page]);
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
    <div className="flex h-full min-h-0 flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div className="min-w-0"><h2 className="text-base font-semibold">Live preview</h2><span className="text-xs text-muted-foreground">{size.width} × {size.height} · {Math.round(size.scale * 100)}%</span></div>
        <select aria-label="Preview page" className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={path} onChange={(e) => setPath(previewPath(e.target.value))}>
          {PREVIEW_PAGES.map((page) => <option key={page} value={page}>{page === "/" ? "Home" : page.slice(1)}</option>)}
        </select>
      </header>
      <div ref={stage} className="min-h-0 flex-1 overflow-auto bg-muted">
        <div className="relative overflow-hidden" style={{ height: size.height * size.scale }}>
          <iframe ref={frame} title="CMS live preview" src={`${path}?cmsPreview=1`} className="absolute left-0 top-0 origin-top-left border-0 bg-background" style={{ width: size.width, height: size.height, transform: `scale(${size.scale})` }} />
        </div>
      </div>
    </div>
  );
}