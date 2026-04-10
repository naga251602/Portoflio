"use client";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  type?: "fade-up" | "stagger";
};

export default function AnimatedSection({ id, className = "", children, type = "fade-up" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.disconnect(); } }),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-32 ${type} ${className}`}
    >
      {children}
    </section>
  );
}
