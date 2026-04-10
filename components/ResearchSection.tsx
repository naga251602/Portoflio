"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { detailsData, citations } from "@/lib/data";
import { stripHtml } from "@/lib/skillMetaMap";
import { FeaturedBadge, NewBadge } from "./Badges";
import { useDrawer } from "@/lib/DrawerContext";
import { useModal } from "@/lib/ModalContext";
import { useToast } from "./Toast";

export default function ResearchSection() {
  const { openDetails } = useDrawer();
  const { open } = useModal();
  const { showToast } = useToast();

  const sorted = Object.entries(detailsData.publication)
    .filter(([, d]) => !d.featured)
    .sort(([, a], [, b]) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    .slice(0, 2);

  const copyCitation = (id: string) => {
    const text = citations[id] || "";
    navigator.clipboard.writeText(text).then(() => showToast("Citation copied to clipboard.")).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
      showToast("Citation copied to clipboard.");
    });
  };

  return (
    <section id="research" className="scroll-mt-32 fade-up">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Research &amp; Publications</h2>
      </div>
      <div className="flex flex-col border-t border-[var(--border)] stagger-parent">
        {sorted.map(([id, d]) => (
          <div key={id}
            className="stagger-item group border-b border-[var(--border)] py-6 px-2 -mx-2 list-item-hover relative cursor-none interactive"
            onClick={() => openDetails("publication", id)}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2 pointer-events-none">
                <h3 className="text-lg font-medium text-[var(--fg)] group-hover:underline">{d.title}</h3>
                {d.featured && <FeaturedBadge />}
                {d.isNew && <NewBadge />}
              </div>
              <span className="font-mono text-xs text-[var(--fg)] bg-[var(--border)] px-2 py-0.5 rounded-sm pointer-events-none shrink-0 w-fit">{d.venue}</span>
            </div>
            <p className="text-sm text-[var(--muted)] line-clamp-2 pr-8 mb-4 pointer-events-none">{stripHtml(d.description)}</p>
            <div className="flex justify-end pointer-events-auto relative z-20">
              <button
                className="interactive cursor-none text-[var(--muted)] hover:text-[var(--fg)] font-mono text-xs uppercase tracking-wider transition-colors border border-[var(--border)] px-3 py-1.5 rounded-md hover:bg-[var(--hover-bg)] shadow-sm"
                onClick={(e) => { e.stopPropagation(); copyCitation(id); }}
              >Cite</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 flex justify-end">
        <button onClick={() => open("publications")}
          className="interactive group flex items-center gap-1 font-mono text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors cursor-none">
          View all publications
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
