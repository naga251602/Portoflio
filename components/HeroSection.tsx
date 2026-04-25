"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faArrowRight,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { statsData } from "@/lib/data";
import { useModal } from "@/lib/ModalContext";

export default function HeroSection() {
  const { open } = useModal();

  return (
    <section id="about" className="scroll-mt-32 fade-up">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--border)] rounded-full text-xs font-mono bg-[var(--fg)]/5 text-[var(--fg)] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Seeking Summer 2026 Internships
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] rounded-full text-xs font-mono bg-[var(--fg)]/5 text-[var(--muted)]">
          <FontAwesomeIcon icon={faMapPin} className="w-3 h-3" />
          Los Angeles, CA
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
        Software Engineer | Full Stack & Backend
      </h1>

      <p className="text-sm md:text-base text-[var(--muted)] mt-4 mb-8 leading-relaxed">
        Python &nbsp;·&nbsp; Go &nbsp;·&nbsp; React &nbsp;·&nbsp; JavaScript &
        TypeScript &nbsp;·&nbsp; Full Stack &nbsp;·&nbsp; Backend Systems
        &nbsp;·&nbsp; Databases
      </p>

      <div className="text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed mb-8">
        MS Applied Data Science @ USC. Software engineer focused on full stack
        and backend systems — building fast APIs, performant frontends, and
        ML-integrated platforms in Go, Python, TypeScript, and React.
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="interactive cursor-none magnetic inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--fg)] text-[var(--bg)] hover:opacity-85 transition-opacity font-medium text-sm rounded-md shadow-sm"
          >
            <FontAwesomeIcon
              icon={faFileText}
              className="w-4 h-4 pointer-events-none"
            />
            Resume
          </a>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/naga251602"
              target="_blank"
              className="interactive cursor-none magnetic p-2.5 border border-[var(--border)] rounded-md hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors text-[var(--fg)]"
              aria-label="GitHub"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="w-4 h-4 pointer-events-none"
              />
            </a>
            <a
              href="https://linkedin.com/in/gauravnv"
              target="_blank"
              className="interactive cursor-none magnetic p-2.5 border border-[var(--border)] rounded-md hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors text-[var(--fg)]"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-4 h-4 pointer-events-none"
              />
            </a>
            <a
              href="mailto:nv.gau16@gmail.com"
              className="interactive cursor-none magnetic p-2.5 border border-[var(--border)] rounded-md hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors text-[var(--fg)]"
              aria-label="Email"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="w-4 h-4 pointer-events-none"
              />
            </a>
          </div>
        </div>
        <div>
          <button
            onClick={() => open("about")}
            className="interactive cursor-none group inline-flex items-center gap-2 font-mono text-xs md:text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            Read more about me &amp; education
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-[var(--border)] stagger-parent">
        {statsData.map((s, i) => (
          <div
            key={s.label}
            className="stagger-item flex flex-col"
            style={{ transitionDelay: i > 0 ? `${i * 0.1}s` : undefined }}
          >
            <span className="text-4xl font-bold text-[var(--fg)]">
              {s.value}
            </span>
            <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mt-1">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
