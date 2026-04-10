"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFolderOpen, faBriefcase, faBookOpen, faLayerGroup, faUpRightFromSquare, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { detailsData, citations } from "@/lib/data";
import { stripHtml } from "@/lib/skillMetaMap";
import { SkillPillsWithOverflow } from "./SkillPill";
import { useDrawer } from "@/lib/DrawerContext";
import { useToast } from "./Toast";

const TYPE_CONFIG: Record<string, { label: string; icon: typeof faStar }> = {
  project:     { label: "Project",     icon: faFolderOpen },
  experience:  { label: "Experience",  icon: faBriefcase },
  publication: { label: "Publication", icon: faBookOpen },
  other:       { label: "Other",       icon: faLayerGroup },
};

export default function FeaturedSection() {
  const { openDetails } = useDrawer();
  const { showToast } = useToast();

  const allFeatured: { type: string; id: string; d: (typeof detailsData.project)[string] }[] = [];
  for (const [type, items] of Object.entries(detailsData)) {
    for (const [id, d] of Object.entries(items)) {
      if (d.featured) allFeatured.push({ type, id, d });
    }
  }
  const items = allFeatured.slice(0, 3);

  const copyCitation = (id: string) => {
    const text = citations[id] || "";
    navigator.clipboard.writeText(text)
      .then(() => showToast("Citation copied to clipboard."))
      .catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
        showToast("Citation copied to clipboard.");
      });
  };

  return (
    <section id="featured" className="scroll-mt-32 fade-up">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-violet-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-sm">
          <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5" />Picks
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-parent">
        {items.map(({ type, id, d }, idx) => {
          const { label, icon } = TYPE_CONFIG[type] || { label: type, icon: faLayerGroup };
          const isExp = type === "experience";
          const isPub = type === "publication";

          return (
            <div key={id}
              className="featured-card group interactive cursor-none flex flex-col gap-4 p-5 border border-[var(--border)] rounded-xl hover:border-[var(--fg)]/30 hover:bg-[var(--hover-bg)] transition-all duration-200 relative"
              style={{ animationDelay: `${idx * 0.08}s` }}
              onClick={() => openDetails(type, id)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] border border-[var(--border)] px-2 py-0.5 rounded-sm">
                  <FontAwesomeIcon icon={icon} className="w-3 h-3" />{label}
                </span>
                {isExp && <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">{d.period}</span>}
                {isPub && <span className="font-mono text-xs text-[var(--fg)] bg-[var(--border)] px-2 py-0.5 rounded-sm whitespace-nowrap">{d.venue}</span>}
              </div>

              <div className="pointer-events-none">
                {isExp ? (
                  <h3 className="text-xl font-semibold text-[var(--fg)] group-hover:underline flex flex-wrap items-center gap-1.5">
                    {d.title}
                    <span className="text-[var(--border)] mx-1">|</span>
                    <span className="text-[var(--muted)] font-normal inline-flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />{d.company}
                    </span>
                  </h3>
                ) : (
                  <h3 className="text-xl font-semibold text-[var(--fg)] group-hover:underline flex items-center gap-1.5">
                    {d.title}
                    {!isPub && <FontAwesomeIcon icon={faUpRightFromSquare} className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors shrink-0" />}
                  </h3>
                )}
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2 pointer-events-none">{stripHtml(d.description)}</p>

              {(d.stack || []).length > 0 && (
                <div onClick={(e) => e.stopPropagation()}>
                  <SkillPillsWithOverflow stack={d.stack} max={3} />
                </div>
              )}

              {(d.link || isPub) && (
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--border)] relative z-20 pointer-events-auto mt-auto">
                  {d.link ? (
                    <a href={d.link} target="_blank" onClick={(e) => e.stopPropagation()}
                      className="interactive cursor-none inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
                      <FontAwesomeIcon icon={faUpRightFromSquare} className="w-3.5 h-3.5" />{d.linkText}
                    </a>
                  ) : <span />}
                  {isPub && (
                    <button
                      className="interactive cursor-none text-[var(--muted)] hover:text-[var(--fg)] font-mono text-xs uppercase tracking-wider transition-colors border border-[var(--border)] px-3 py-1.5 rounded-md hover:bg-[var(--hover-bg)]"
                      onClick={(e) => { e.stopPropagation(); copyCitation(id); }}
                    >Cite</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
