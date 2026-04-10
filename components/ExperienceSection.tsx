"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { detailsData } from "@/lib/data";
import { stripHtml } from "@/lib/skillMetaMap";
import { SkillPillsWithOverflow } from "./SkillPill";
import { CurrentBadge } from "./Badges";
import { useDrawer } from "@/lib/DrawerContext";

export default function ExperienceSection() {
  const { openDetails } = useDrawer();
  const [hintVisible, setHintVisible] = useState(true);
  const entries = Object.entries(detailsData.experience);

  return (
    <section id="experience" className="scroll-mt-32 fade-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        {hintVisible && (
          <span className="font-mono text-[10px] text-[var(--muted)] flex items-center gap-1.5 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-400" />
            </span>
            tap a skill pill to explore
          </span>
        )}
      </div>

      <div className="flex flex-col border-t border-[var(--border)] stagger-parent pl-6">
        {entries.map(([id, d], idx) => {
          const isLast = idx === entries.length - 1;
          const dotClass = d.isCurrent
            ? "bg-violet-500 border-violet-400 shadow-[0_0_8px_2px_rgba(139,92,246,0.45)]"
            : "bg-[var(--bg)] border-[var(--border)] group-hover:border-[var(--fg)]";

          return (
            <div key={id}
              className="stagger-item group interactive cursor-none py-7 list-item-hover px-2 -mx-2 relative experience-row"
              onClick={() => { openDetails("experience", id); setHintVisible(false); }}
              style={{ transitionDelay: `${idx * 0.07}s` }}
            >
              <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center pointer-events-none exp-timeline">
                <div className={`w-px flex-1 bg-[var(--border)] group-hover:bg-[var(--fg)]/20 transition-colors duration-300 ${idx === 0 ? "mt-7" : ""}`} />
                <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 transition-all duration-300 ${dotClass}`} />
                <div className={`w-px flex-1 bg-[var(--border)] group-hover:bg-[var(--fg)]/20 transition-colors duration-300 ${isLast ? "opacity-0" : ""}`} />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-1.5 pointer-events-none">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-[var(--fg)] group-hover:underline">{d.title}</h3>
                  {d.isCurrent && <CurrentBadge />}
                </div>
                <span className="font-mono text-[11px] text-[var(--muted)] whitespace-nowrap shrink-0 mt-0.5">{d.period}</span>
              </div>

              <p className="text-sm text-[var(--muted)] mb-3 pointer-events-none inline-flex items-center gap-1.5">
                <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 shrink-0" />{d.company}
              </p>
              <p className="text-sm text-[var(--muted)] line-clamp-2 mb-4 pointer-events-none leading-relaxed">{stripHtml(d.description)}</p>

              <div onClick={(e) => e.stopPropagation()}>
                <SkillPillsWithOverflow stack={d.stack} max={4} />
              </div>

              <span className="absolute right-2 bottom-3 font-mono text-[10px] text-[var(--muted)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center gap-1 pointer-events-none select-none">
                explore <FontAwesomeIcon icon={faUpRightFromSquare} className="w-3 h-3" />
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
