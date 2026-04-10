"use client";
import { useEffect } from "react";

export default function ScrollAnimationProvider() {
  useEffect(() => {
    // Small delay to ensure full hydration + layout
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(".fade-up, .stagger-parent");

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target); // unobserve THIS element only, not all
            }
          });
        },
        { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => {
        // If already in viewport (above the fold), make visible immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        } else {
          obs.observe(el);
        }
      });

      return () => obs.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
