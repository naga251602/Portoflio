"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { detailsData } from "@/lib/data";
import { stripHtml } from "@/lib/skillMetaMap";
import { SkillPillsWithOverflow } from "./SkillPill";
import { FeaturedBadge, NewBadge } from "./Badges";
import { useDrawer } from "@/lib/DrawerContext";
import { useModal } from "@/lib/ModalContext";

export default function ProjectsSection() {
  const { openDetails } = useDrawer();
  const { open } = useModal();

  const sorted = Object.entries(detailsData.project)
    .filter(([, d]) => !d.featured)
    .sort(([, a], [, b]) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    .slice(0, 2);

  return (
    <section id="projects" className="scroll-mt-32 fade-up">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
      </div>
      <div className="flex flex-col border-t border-[var(--border)] stagger-parent">
        {sorted.map(([id, d]) => (
          <div key={id}
            className="stagger-item group interactive cursor-none border-b border-[var(--border)] py-6 list-item-hover px-2 -mx-2 relative flex flex-col"
            onClick={() => openDetails("project", id)}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3 pointer-events-none">
              <h3 className="text-lg font-medium text-[var(--fg)] group-hover:underline flex items-center gap-1.5">
                {d.title}
                <FontAwesomeIcon icon={faUpRightFromSquare} className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors" />
              </h3>
              {d.featured && <FeaturedBadge />}
              {d.isNew && <NewBadge />}
            </div>
            <p className="text-sm text-[var(--muted)] line-clamp-2 pr-8 mb-4 pointer-events-none">{stripHtml(d.description)}</p>
            <div onClick={(e) => e.stopPropagation()}>
              <SkillPillsWithOverflow stack={d.stack} max={4} />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 flex justify-end">
        <button onClick={() => open("projects")}
          className="interactive group flex items-center gap-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors cursor-none">
          View all projects
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
