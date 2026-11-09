"use client";
import { useEffect, useRef } from "react";
import styles from "./LegacyPortfolio.module.css";

type Props = { path?: string };
const ROUTES = new Set(["/", "/projects", "/blog", "/research", "/experience", "/playground", "/contributions"]);
function normalize(route: string): string {
  const clean = route.split("?")[0];
  if (["/about", "/coding", "/create"].includes(clean)) return "/";
  if (ROUTES.has(clean) || /^\/(projects|blog|research|contributions)\/[a-z0-9-]+$/.test(clean)) return clean;
  return "/";
}
/** Temporary fidelity adapter; never read iframe DOM or window properties. */
export default function LegacyPortfolio({ path = "/" }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (!event.data || event.data.channel !== "portfolio-navigation-v2" || event.data.kind !== "route" || typeof event.data.path !== "string") return;
      const route = normalize(event.data.path);
      if (route !== window.location.pathname) window.history.pushState({ portfolio: true }, "", route);
    }
    function onHistory() {
      // Posting is safe even if the frame has navigated to a different origin.
      frame.current?.contentWindow?.postMessage({ channel: "portfolio-navigation-v2", kind: "navigate", path: normalize(location.pathname) }, location.origin);
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("popstate", onHistory);
    return () => { window.removeEventListener("message", onMessage); window.removeEventListener("popstate", onHistory); };
  }, []);
  const initial = normalize(path);
  return <iframe ref={frame} className={styles.frame} title="Gaurav N.V. portfolio" src={`/legacy.html#${initial}`} referrerPolicy="strict-origin-when-cross-origin" />;
}
