"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/lib/ModalContext";
import { detailsData, citations } from "@/lib/data";
import { stripHtml } from "@/lib/skillMetaMap";
import { SkillPillsWithOverflow } from "./SkillPill";
import { FeaturedBadge, NewBadge } from "./Badges";
import { useDrawer } from "@/lib/DrawerContext";
import { useToast } from "./Toast";

function ModalWrapper({ id, title, children, open, onClose }: {
  id: string; title: string; children: React.ReactNode; open: boolean; onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg)] z-40 overflow-y-auto transition-opacity duration-300">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors interactive cursor-none p-1.5 rounded-md hover:bg-[var(--hover-bg)]"
          >
            <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---- ABOUT MODAL ----
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium text-sm text-[var(--fg)] interactive cursor-none"
      >
        {title}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`w-4 h-4 transition-transform duration-200 text-[var(--muted)] ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pt-4 text-sm text-[var(--muted)]">{children}</div>}
    </div>
  );
}

export function AboutModal() {
  const { openModal, close } = useModal();
  return (
    <ModalWrapper id="about" title="About Me." open={openModal === "about"} onClose={close}>
      <div className="text-[var(--muted)] text-sm leading-relaxed mb-20 space-y-6">
        <p>I am an MS Applied Data Science candidate at the University of Southern California (USC), driven by a passion for designing high-performance systems and turning complex data into actionable insights.</p>
        <p>With over 2 years of experience in backend engineering and full-stack development, I have honed my skills in building robust APIs, scalable architectures, and efficient data pipelines. My journey spans from optimizing frontend load times by 75% to architecting custom in-memory columnar query engines that outperform traditional analytical tools.</p>
        <p>I thrive in environments where performance and reliability are critical, and I&apos;m actively seeking Summer 2026 internship opportunities where I can tackle challenging engineering problems at scale.</p>
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-10">Education.</h2>

      {/* USC */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
          <h3 className="text-xl font-medium text-[var(--fg)]">University of Southern California</h3>
          <span className="font-mono text-xs text-[var(--muted)]">Jan 2025 - Dec 2026</span>
        </div>
        <p className="text-sm text-[var(--muted)] mb-2 font-mono uppercase tracking-wide">MS Applied Data Science</p>
        <p className="text-xs text-[var(--muted)] mb-8 italic">GPA: 3.6 / 4.0</p>
        <div className="border-t border-[var(--border)]">
          <Accordion title="Courses">
            <ul className="list-disc pl-4 space-y-2">
              <li>Python Programming</li>
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Foundations of Data Management</li>
            </ul>
          </Accordion>
        </div>
      </div>

      {/* RMK */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
          <h3 className="text-xl font-medium text-[var(--fg)]">R.M.K. Engineering College</h3>
          <span className="font-mono text-xs text-[var(--muted)]">Aug 2020 - Apr 2024</span>
        </div>
        <p className="text-sm text-[var(--muted)] mb-2 font-mono uppercase tracking-wide">B.Tech in Information Technology</p>
        <p className="text-xs text-[var(--muted)] mb-8 italic">CGPA: 8.75 / 10.0 | First Class</p>
        <div className="border-t border-[var(--border)]">
          <Accordion title="Courses">
            <ul className="list-disc pl-4 space-y-2">
              <li>Data Structures &amp; Algorithms</li>
              <li>Operating Systems</li>
              <li>Computer Networks &amp; Database Management Systems</li>
              <li>Cloud Computing &amp; Big Data Analytics</li>
              <li>AI &amp; Machine Learning</li>
              <li>DevOps &amp; Microservice Architecture</li>
            </ul>
          </Accordion>
        </div>
      </div>
    </ModalWrapper>
  );
}

// ---- FULL LIST MODAL (shared by Projects, Publications, Others) ----
function FullListModal({
  id, title, dataType, open, onClose,
}: {
  id: string; title: string; dataType: "project" | "publication" | "other"; open: boolean; onClose: () => void;
}) {
  const { openDetails } = useDrawer();
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAllFilters, setShowAllFilters] = useState(false);

  const raw = Object.entries(detailsData[dataType] || {});
  const items = [...raw].sort(([, a], [, b]) => {
    const fa = a.featured ? 2 : a.isNew ? 1 : 0;
    const fb = b.featured ? 2 : b.isNew ? 1 : 0;
    return fb - fa;
  });

  const allSkills = Array.from(new Set(items.flatMap(([, v]) => v.stack || []))).sort();

  const filteredItems = activeFilter === "all"
    ? items
    : items.filter(([, v]) => v.stack?.includes(activeFilter));

  const copyCitation = (cid: string) => {
    const text = citations[cid] || "";
    navigator.clipboard.writeText(text).then(() => showToast("Citation copied to clipboard.")).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
      showToast("Citation copied to clipboard.");
    });
  };

  const filterBtns = ["all", ...allSkills];
  const visibleFilters = showAllFilters ? filterBtns : filterBtns.slice(0, 6);

  return (
    <ModalWrapper id={id} title={title} open={open} onClose={onClose}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {visibleFilters.map((skill) => (
          <button
            key={skill}
            onClick={() => setActiveFilter(skill)}
            className={`interactive cursor-none px-4 py-1.5 border rounded-full text-xs font-mono transition-colors shrink-0 ${activeFilter === skill
              ? "border-[var(--border)] bg-[var(--fg)] text-[var(--bg)] shadow-sm"
              : "border-[var(--border)] bg-[var(--hover-bg)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            }`}
          >
            {skill === "all" ? "All" : skill}
          </button>
        ))}
        {filterBtns.length > 6 && (
          <button
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="interactive cursor-none shrink-0 px-4 py-1.5 border border-[var(--border)] rounded-full text-xs font-mono text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors"
          >
            {showAllFilters ? "Hide filters" : `Show all filters (${allSkills.length})`}
          </button>
        )}
      </div>

      {/* Items */}
      <div className="flex flex-col border-t border-[var(--border)]">
        {filteredItems.map(([itemId, d]) => {
          const isPub = dataType === "publication";
          const isOther = dataType === "other";

          return (
            <div
              key={itemId}
              className="group interactive cursor-none border-b border-[var(--border)] py-8 list-item-hover px-4 -mx-4 relative flex flex-col"
              onClick={() => openDetails(dataType, itemId)}
            >
              {isOther && (
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-[var(--muted)] border border-[var(--border)] px-2 py-0.5 rounded-sm uppercase tracking-widest bg-[var(--bg)]">{d.subtitle}</span>
                  {d.isNew && <NewBadge />}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-[var(--fg)] group-hover:underline flex items-center gap-1.5">
                  {d.title}
                  {!isPub && <FontAwesomeIcon icon={faUpRightFromSquare} className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--fg)] transition-colors" />}
                </h3>
                {d.featured && <FeaturedBadge />}
                {!isOther && d.isNew && <NewBadge />}
              </div>

              <p className="text-sm text-[var(--muted)] line-clamp-2 pr-8 mb-5 pointer-events-none">{stripHtml(d.description)}</p>

              <div onClick={(e) => e.stopPropagation()}>
                <SkillPillsWithOverflow stack={d.stack} max={4} />
              </div>

              {isPub && (
                <div className="flex justify-end mt-4 pointer-events-auto relative z-20">
                  <button
                    className="interactive cursor-none text-[var(--muted)] hover:text-[var(--fg)] font-mono text-xs uppercase tracking-wider transition-colors border border-[var(--border)] px-3 py-1.5 rounded-md hover:bg-[var(--hover-bg)] shadow-sm"
                    onClick={(e) => { e.stopPropagation(); copyCitation(itemId); }}
                  >
                    Cite
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ModalWrapper>
  );
}

export function ProjectsModal() {
  const { openModal, close } = useModal();
  return <FullListModal id="projects" title="All Projects." dataType="project" open={openModal === "projects"} onClose={close} />;
}

export function PublicationsModal() {
  const { openModal, close } = useModal();
  return <FullListModal id="publications" title="All Publications." dataType="publication" open={openModal === "publications"} onClose={close} />;
}

export function OthersModal() {
  const { openModal, close } = useModal();
  return <FullListModal id="others" title="All Others." dataType="other" open={openModal === "others"} onClose={close} />;
}
