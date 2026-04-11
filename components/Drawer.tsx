"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark, faArrowLeft, faUpRightFromSquare, faBuilding, faCalendar,
  faMapPin, faImage, faCodeBranch, faChevronLeft, faChevronRight,
  faMaximize, faLayerGroup, faFolderOpen, faBriefcase, faBookOpen, faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useDrawer } from "@/lib/DrawerContext";
import { detailsData } from "@/lib/data";
import { skillMetaMap, stripHtml } from "@/lib/skillMetaMap";
import { skillsConfig } from "@/lib/data";
import { SkillPillsWithOverflow } from "./SkillPill";
import Image from "next/image";

const DRAWER_TYPE_CONFIG: Record<string, { label: string; icon: typeof faXmark; accent: string }> = {
  project:     { label: "Project",     icon: faFolderOpen, accent: "#6d28d9" },
  experience:  { label: "Experience",  icon: faBriefcase,  accent: "#2563eb" },
  publication: { label: "Publication", icon: faBookOpen,   accent: "#059669" },
  other:       { label: "Other",       icon: faLayerGroup,     accent: "#d97706" },
  skill:       { label: "Skill",       icon: faMicrochip,  accent: "#7c3aed" },
};

export default function Drawer() {
  const { isOpen, history, goBack, close, slideDir } = useDrawer();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerActionsVisible, setHeaderActionsVisible] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [sliderIndexes, setSliderIndexes] = useState<Record<string, number>>({});

  const current = history[history.length - 1];

  // Slide animation on history change
  useEffect(() => {
    const sc = scrollRef.current;
    if (!sc || slideDir === "none") return;
    const outX = slideDir === "forward" ? "-20px" : "20px";
    const inX  = slideDir === "forward" ? "20px"  : "-20px";
    sc.style.transition = "opacity 0.18s ease, transform 0.18s ease";
    sc.style.opacity    = "0";
    sc.style.transform  = `translateX(${outX})`;
    const t = setTimeout(() => {
      sc.scrollTop       = 0;
      sc.style.transition = "none";
      sc.style.transform  = `translateX(${inX})`;
      sc.style.opacity    = "0";
      void sc.offsetWidth;
      sc.style.transition = "opacity 0.22s ease, transform 0.22s ease";
      sc.style.opacity    = "1";
      sc.style.transform  = "translateX(0)";
    }, 180);
    return () => clearTimeout(t);
  }, [current, slideDir]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else        document.body.style.overflow = "";
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setHeaderActionsVisible(e.currentTarget.scrollTop > 60);
  };

  const sliderGo = (key: string, idx: number, total: number) => {
    setSliderIndexes((s) => ({ ...s, [key]: Math.max(0, Math.min(idx, total - 1)) }));
  };

  if (!isOpen || !current) return null;

  const isSkill = current.type === "skill";
  const typeCfg = isSkill
    ? DRAWER_TYPE_CONFIG.skill
    : DRAWER_TYPE_CONFIG[current.type === "details" ? current.dataType : "project"] || DRAWER_TYPE_CONFIG.project;

  const d = !isSkill ? detailsData[current.dataType as keyof typeof detailsData]?.[current.id] : null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[var(--fg)]/10 backdrop-blur-sm z-[90] opacity-100 transition-opacity interactive cursor-none"
        onClick={close}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-3xl h-[90vh] md:h-[80vh] bg-[var(--bg)] border-t md:border-x border-[var(--border)] z-[100] flex flex-col overflow-hidden md:rounded-t-2xl shadow-2xl translate-y-0 transition-transform duration-500">
        {/* Accent bar */}
        <div className="h-0.5 w-full shrink-0" style={{ background: typeCfg.accent }} />

        {/* Header */}
        <div className="px-5 h-12 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg)] shrink-0 gap-3">
          <div className="flex items-center gap-1.5 min-w-0">
            {history.length > 1 && (
              <button
                onClick={goBack}
                className="shrink-0 p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--hover-bg)] transition-colors interactive cursor-none"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[var(--border)] text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--muted)] bg-[var(--hover-bg)]">
              <FontAwesomeIcon icon={typeCfg.icon} className="w-3 h-3" />
              {typeCfg.label}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {/* Header actions (link btn) — fade in on scroll */}
            {d?.link && (
              <div className={`flex items-center gap-1 transition-opacity duration-200 ${headerActionsVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <a
                  href={d.link}
                  target="_blank"
                  className="interactive cursor-none p-1.5 border border-[var(--border)] rounded-md hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors"
                >
                  <FontAwesomeIcon icon={d.linkIcon === "github" ? faGithub : faUpRightFromSquare} className="w-4 h-4" />
                </a>
              </div>
            )}
            <button
              onClick={close}
              className="p-1.5 rounded-md text-[var(--muted)] hover:text-[var(--fg)] hover:bg-[var(--hover-bg)] transition-colors interactive cursor-none"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto"
          onScroll={handleScroll}
        >
          <br />
          {isSkill ? (
            <SkillPane skill={(current as { type: "skill"; skill: string }).skill} />
          ) : d ? (
            <DetailsPane
              d={d}
              type={current.dataType}
              headerActionsVisible={headerActionsVisible}
              sliderIndexes={sliderIndexes}
              sliderGo={sliderGo}
              openLightbox={setLightboxSrc}
            />
          ) : null}
          <div className="h-16" /><br />
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[200] bg-[var(--fg)]/80 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-200"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 p-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--fg)] hover:opacity-70 transition-opacity interactive cursor-none"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxSrc} alt="Full size" className="max-w-full max-h-full object-contain rounded-md shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function DetailsPane({
  d, type, headerActionsVisible, sliderIndexes, sliderGo, openLightbox,
}: {
  d: typeof detailsData.project[string];
  type: string;
  headerActionsVisible: boolean;
  sliderIndexes: Record<string, number>;
  sliderGo: (key: string, idx: number, total: number) => void;
  openLightbox: (src: string) => void;
}) {
  return (
    <>
      <div className="px-6 md:px-8 pt-10 pb-7">
        <h2 className="text-xl font-bold text-[var(--fg)] leading-snug mb-5">
          {d.title}
          {type === "project" && (
            <FontAwesomeIcon icon={faUpRightFromSquare} className="w-5 h-5 text-[var(--muted)] inline-block align-middle ml-1.5" />
          )}
        </h2>

        {/* Meta strip */}
        {(d.company || d.period || d.venue) && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5">
            {d.company && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono">
                <FontAwesomeIcon icon={faBuilding} className="w-3.5 h-3.5 shrink-0" />{d.company}
              </span>
            )}
            {d.period && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono">
                <FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5 shrink-0" />{d.period}
              </span>
            )}
            {d.venue && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono">
                <FontAwesomeIcon icon={faMapPin} className="w-3.5 h-3.5 shrink-0" />{d.venue}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        {(d.link || d.deployedLink) && (
          <div className={`flex flex-wrap gap-3 mb-6 transition-opacity duration-200 ${headerActionsVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {d.link && (
              <a
                href={d.link}
                target="_blank"
                className="interactive cursor-none inline-flex items-center gap-2 px-4 py-2 bg-[var(--fg)] text-[var(--bg)] hover:opacity-85 transition-opacity font-medium text-sm rounded-lg shadow-sm"
              >
                <FontAwesomeIcon icon={d.linkIcon === "github" ? faGithub : faUpRightFromSquare} className="w-4 h-4" />
                {d.linkText}
              </a>
            )}
            {d.deployedLink && (
              <a
                href={d.deployedLink}
                target="_blank"
                className="interactive cursor-none inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--hover-bg)] transition-colors font-medium text-sm rounded-lg"
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        )}

        {/* Stack */}
        {d.stack?.length > 0 && (
          <div className="mb-4">
            <p className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest mb-3">Stack</p>
            <SkillPillsWithOverflow stack={d.stack} max={3} />
            <br />
          </div>
        )}
      </div>

      <div className="px-6 md:px-8 my-2"><div className="border-t border-[var(--border)]" /></div>

      {/* Description */}
      <div
        className="px-6 md:px-8 py-7 text-sm text-[var(--fg)] leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: d.description }}
      />

      {/* Screenshots */}
      {d.screenshots && d.screenshots.length > 0 && (
        <div className="px-6 md:px-8 pb-8">
          <div className="border-t border-[var(--border)] pt-8 mt-2">
            <div className="flex items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faImage} className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">Screenshots</span>
            </div>
            <ScreenshotSlider
              imgs={d.screenshots}
              sliderKey={d.title}
              sliderIndexes={sliderIndexes}
              sliderGo={sliderGo}
              openLightbox={openLightbox}
            />
          </div>
        </div>
      )}

      {/* Architecture */}
      {d.visual && (
        <div className="px-6 md:px-8 pb-8">
          <div className="border-t border-[var(--border)] pt-8 mt-2">
            <div className="flex items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faCodeBranch} className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest">Architecture</span>
            </div>
            <div
              className="text-sm font-mono text-[var(--muted)] leading-loose bg-[var(--hover-bg)] rounded-xl p-5"
              dangerouslySetInnerHTML={{ __html: d.visual }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function ScreenshotSlider({
  imgs, sliderKey, sliderIndexes, sliderGo, openLightbox,
}: {
  imgs: string[];
  sliderKey: string;
  sliderIndexes: Record<string, number>;
  sliderGo: (key: string, idx: number, total: number) => void;
  openLightbox: (src: string) => void;
}) {
  const idx = sliderIndexes[sliderKey] ?? 0;

  if (imgs.length === 1) {
    return (
      <div
        className="relative group/sc cursor-zoom-in"
        onClick={() => openLightbox(imgs[0])}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgs[0]} alt="Screenshot" className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] object-contain" style={{ maxHeight: 460 }} />
        <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover/sc:opacity-100 transition-opacity bg-[var(--fg)]/10 backdrop-blur-[1px]">
          <span className="inline-flex items-center gap-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs font-mono text-[var(--fg)]">
            <FontAwesomeIcon icon={faMaximize} className="w-3.5 h-3.5" /> Full size
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {imgs.map((src, i) => (
            <div key={i} className="shrink-0 w-full relative group/sc cursor-zoom-in" onClick={() => openLightbox(src)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Screenshot ${i + 1}`} className="w-full rounded-xl border border-[var(--border)] bg-[var(--hover-bg)] object-contain select-none" style={{ maxHeight: 460 }} />
              <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover/sc:opacity-100 transition-opacity bg-[var(--fg)]/10 backdrop-blur-[1px]">
                <span className="inline-flex items-center gap-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md px-3 py-1.5 text-xs font-mono text-[var(--fg)]">
                  <FontAwesomeIcon icon={faMaximize} className="w-3.5 h-3.5" /> Full size
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => sliderGo(sliderKey, idx - 1, imgs.length)} className="interactive cursor-none absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors shadow-md">
        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
      </button>
      <button onClick={() => sliderGo(sliderKey, idx + 1, imgs.length)} className="interactive cursor-none absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-[var(--bg)]/80 backdrop-blur-sm border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors shadow-md">
        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
      </button>
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="font-mono text-[10px] text-[var(--muted)]">{idx + 1} / {imgs.length}</span>
        <div className="flex items-center gap-1.5">
          {imgs.map((_, i) => (
            <button key={i} onClick={() => sliderGo(sliderKey, i, imgs.length)} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 interactive cursor-none ${i === idx ? "bg-[var(--fg)] scale-125" : "bg-[var(--border)] hover:bg-[var(--muted)]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillPane({ skill }: { skill: string }) {
  const { openDetails } = useDrawer();
  const barRef = useRef<HTMLDivElement>(null);
  const meta = skillMetaMap[skill] || { name: skill, icon: "fa-code", isFa: true, level: 70 };

  const usageMap: Record<string, [string, typeof detailsData.project[string]][]> = {
    project: [], experience: [], publication: [], other: []
  };
  for (const [type, dict] of Object.entries(detailsData)) {
    for (const [k, v] of Object.entries(dict)) {
      if (v.stack?.includes(skill)) usageMap[type]?.push([k, v]);
    }
  }
  const totalUsage = Object.values(usageMap).reduce((s, a) => s + a.length, 0);

  // Animate bar
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.width = `${meta.level}%`;
    }));
  }, [meta.level]);

  const sections = [
    { key: "project",     label: "Projects",      icon: faFolderOpen },
    { key: "experience",  label: "Experience",     icon: faBriefcase },
    { key: "publication", label: "Publications",   icon: faBookOpen },
    { key: "other",       label: "Others",         icon: faLayerGroup },
  ];

  return (
    <div className="px-6 md:px-8 pt-10 pb-7">
      <h2 className="text-xl font-bold text-[var(--fg)] leading-snug mb-8 flex items-center gap-2.5">
        <span className="p-1.5 border border-[var(--border)] rounded-md bg-[var(--hover-bg)] text-[var(--fg)]">
          <FontAwesomeIcon icon={faMicrochip} className="w-5 h-5" />
        </span>
        {skill}
      </h2>

      {/* Proficiency */}
      <div className="mb-8 p-4 border border-[var(--border)] rounded-xl bg-[var(--hover-bg)]/50">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">Proficiency</span>
          <span className="font-mono text-xs font-bold text-[var(--fg)]">{meta.level}%</span>
        </div>
        <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
            style={{ width: "0%", transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted)] font-mono">
          <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5" />
          Used in <strong className="text-[var(--fg)] mx-1">{totalUsage}</strong> {totalUsage === 1 ? "item" : "items"} across the portfolio
        </div>
      </div>

      {/* Usage sections */}
      {sections.map(({ key, label, icon }) => {
        const matches = usageMap[key];
        if (!matches?.length) return null;
        return (
          <div key={key} className="mb-6">
            <h4 className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />{label}
            </h4>
            <div className="flex flex-col gap-2">
              {matches.map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => openDetails(key, k)}
                  className="text-left p-4 border border-[var(--border)] rounded-xl hover:bg-[var(--hover-bg)] hover:border-[var(--fg)]/20 transition-all interactive cursor-none group/item"
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    <h5 className="font-medium text-[var(--fg)] text-sm group-hover/item:underline">{v.title}</h5>
                    {v.featured && (
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-violet-500 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">Featured</span>
                    )}
                    {v.isNew && (
                      <span className="new-badge inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">New</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {stripHtml(v.description).slice(0, 90)}{stripHtml(v.description).length > 90 ? "…" : ""}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {totalUsage === 0 && (
        <p className="text-[var(--muted)] text-sm">Nothing logged for <strong className="text-[var(--fg)]">{skill}</strong> yet.</p>
      )}
    </div>
  );
}
