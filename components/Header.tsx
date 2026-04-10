"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/lib/ModalContext";
import { useDrawer } from "@/lib/DrawerContext";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { closeAll: closeAllModals } = useModal();
  const { close: closeDrawer } = useDrawer();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      let current = "";
      document.querySelectorAll<HTMLElement>("main section[id]").forEach((s) => {
        if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.clientHeight) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  const handleNavClick = () => {
    closeAllModals();
    closeDrawer();
    setMobileOpen(false);
  };

  const navLinks = ["about", "experience", "projects", "research", "skills"];

  return (
    <>
      <header className="fixed top-0 w-full bg-[var(--bg)]/90 backdrop-blur-sm z-50 border-b border-[var(--border)] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex justify-between items-center">
          <a href="#" className="font-bold tracking-tight text-[var(--fg)] hover:opacity-70 transition-opacity interactive cursor-none">
            Gaurav N.V.
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm text-[var(--muted)] font-mono">
              {navLinks.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={handleNavClick}
                  className={`hover:text-[var(--fg)] transition-colors interactive cursor-none capitalize ${activeSection === id ? "text-[var(--fg)]" : ""}`}
                >
                  {id === "research" ? "Research" : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              className="text-[var(--fg)] hover:opacity-70 transition-opacity interactive cursor-none"
              aria-label="Toggle Theme"
            >
              <FontAwesomeIcon icon={dark ? faSun : faMoon} className="w-4 h-4" />
            </button>
            <button
              className="md:hidden text-[var(--fg)] interactive cursor-none"
              onClick={() => setMobileOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[var(--bg)] z-[60] flex flex-col justify-start px-8 overflow-y-auto transition-opacity duration-200 ${mobileOpen ? "flex opacity-100" : "hidden opacity-0"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-[var(--fg)] hover:opacity-70 interactive cursor-none"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>
        <nav className="flex flex-col items-center gap-8 text-2xl font-medium w-full text-center mt-[25%] pb-12">
          {navLinks.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleNavClick}
              className="text-[var(--muted)] hover:text-[var(--fg)] interactive cursor-none capitalize"
            >
              {id === "research" ? "Research" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
