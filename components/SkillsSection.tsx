"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { skillsConfig } from "@/lib/data";
import { SkillPill } from "./SkillPill";

const PREVIEW = 5;

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-32 fade-up">
      <div className="border-b border-[var(--border)] pb-4 mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Stack</h2>
        <p className="text-xs text-[var(--muted)] font-mono flex items-center gap-1.5">
          <FontAwesomeIcon icon={faArrowPointer} className="w-3.5 h-3.5 text-violet-400" />
          Click any pill to see every project, role and paper where I used it
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 text-sm stagger-parent pb-4 overflow-visible">
        {Object.entries(skillsConfig).map(([cat, arr], ci) => (
          <SkillCategory key={cat} cat={cat} arr={arr} delay={ci * 0.05} />
        ))}
      </div>
    </section>
  );
}

function SkillCategory({ cat, arr, delay }: { cat: string; arr: { name: string }[]; delay: number }) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = arr.length > PREVIEW;
  const visible = arr.slice(0, PREVIEW);
  const hidden = arr.slice(PREVIEW);

  return (
    <div className="stagger-item overflow-visible" style={{ transitionDelay: `${delay}s` }}>
      <span className="block text-[var(--muted)] mb-3 font-mono text-xs uppercase tracking-wider">{cat}</span>
      <div className="overflow-visible pt-10 -mt-10">
        <div className="flex flex-wrap gap-2.5 overflow-visible">
          {visible.map((s) => <SkillPill key={s.name} skillName={s.name} showFill />)}
          {expanded && hidden.map((s) => <SkillPill key={s.name} skillName={s.name} showFill />)}
        </div>
      </div>
      {needsToggle && (
        <button
          className="interactive cursor-none mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Show less" : `+${hidden.length} more`}
        </button>
      )}
    </div>
  );
}
