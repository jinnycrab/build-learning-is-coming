import { useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view (fires once). */
export function useInViewOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

/** Eased 0→1 progress that starts once `start` becomes true. */
export function useCountProgress(start: boolean, duration = 1800) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reducedMotion()) {
      setP(1);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const x = Math.min(1, (t - t0) / duration);
      setP(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, duration]);
  return p;
}

/**
 * Scroll progress of an element through the viewport, 0 when its top enters
 * the bottom of the screen and 1 when its bottom leaves the top.
 */
export function useScrollProgress<T extends Element>(mode: "through" | "enter" = "through") {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reducedMotion()) {
      setP(mode === "enter" ? 1 : 0.5);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const v = mode === "through" ? (vh - r.top) / (vh + r.height) : (vh - r.top) / (vh * 0.9);
      setP(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode]);
  return { ref, p };
}

/** Live countdown to an ISO date. */
export function useCountdown(iso: string) {
  const target = new Date(iso).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  let t = Math.max(0, Math.floor((target - (now ?? target)) / 1000));
  const d = Math.floor(t / 86400);
  t -= d * 86400;
  const h = Math.floor(t / 3600);
  t -= h * 3600;
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { ready: now !== null, days: pad(d), hours: pad(h), mins: pad(m), secs: pad(s) };
}

/** True when the visitor asked for less motion, or motion is switched off in the CMS. */
export function reducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.dataset["motion"] === "off" ||
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

let hydrated = false;
const phoneQuery = () => window.matchMedia("(max-width: 767px)").matches;

/**
 * True on phone-width screens (below 768px), where the phone layout shows.
 * False during server rendering and the first hydration, so markup matches;
 * after that, pages opened in the app know the answer from their first render.
 */
export function useIsPhone() {
  const [phone, setPhone] = useState(() => hydrated && phoneQuery());
  useEffect(() => {
    hydrated = true;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setPhone(phoneQuery());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return phone;
}
