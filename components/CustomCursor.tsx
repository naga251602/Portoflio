"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      if (dotRef.current) dotRef.current.style.display = "none";
      if (outlineRef.current) outlineRef.current.style.display = "none";
      return;
    }

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px))`;
      }
    };

    const animate = () => {
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * 0.2;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * 0.2;
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(calc(-50% + ${outlinePos.current.x}px), calc(-50% + ${outlinePos.current.y}px))`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => document.body.classList.add("hovering");
    const onLeave = () => document.body.classList.remove("hovering");

    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>(".interactive, a, button, input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot custom-cursor" />
      <div ref={outlineRef} className="cursor-outline custom-cursor" />
    </>
  );
}
