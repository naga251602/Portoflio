"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { skillMetaMap } from "@/lib/skillMetaMap";
import { useDrawer } from "@/lib/DrawerContext";

library.add(fas, fab);

type Props = {
  skillName: string;
  showFill?: boolean;
};

export function SkillPill({ skillName, showFill = false }: Props) {
  const meta = skillMetaMap[skillName] || { name: skillName, icon: "fa-code", isFa: true, level: 75 };
  const { openSkillDrawer } = useDrawer();

  function getIconName(icon: string): string {
    return icon.replace(/^fa-/, "");
  }

  const iconEl = meta.isFa ? (
    <FontAwesomeIcon
      icon={["fas", getIconName(meta.icon) as import("@fortawesome/fontawesome-svg-core").IconName]}
      className="w-3.5 h-3.5 relative z-10 pointer-events-none"
    />
  ) : (
    <i className={`${meta.icon} text-sm relative z-10 transition-transform group-hover:scale-110 pointer-events-none`} />
  );

  return (
    <span
      className="interactive relative inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono bg-[var(--bg)] text-[var(--fg)] hover:border-[var(--fg)] transition-all cursor-none group overflow-visible"
      onClick={(e) => { e.stopPropagation(); openSkillDrawer(meta.name); }}
      title={showFill ? `Skill Level: ${meta.level}%` : undefined}
    >
      {showFill && (
        <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
          <div
            className="absolute left-0 top-0 bottom-0 skill-fill-bg transition-opacity duration-300 opacity-[0.65] group-hover:opacity-100"
            style={{ width: `${meta.level}%` }}
          />
        </div>
      )}
      {iconEl}
      <span className="relative z-10 font-medium tracking-tight pointer-events-none">{meta.name}</span>
      {showFill && (
        <span className="skill-pill-tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-[var(--fg)] text-[var(--bg)] text-[9px] font-mono rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-30">
          tap to explore
        </span>
      )}
    </span>
  );
}

type PillsWithOverflowProps = {
  stack: string[];
  showFill?: boolean;
  max?: number;
};

export function SkillPillsWithOverflow({ stack, showFill = false, max = 4 }: PillsWithOverflowProps) {
  const [expanded, setExpanded] = useState(false);
  if (!stack || stack.length === 0) return null;

  const visible = stack.slice(0, max);
  const hidden = stack.slice(max);

  return (
    <div className="flex flex-wrap gap-1.5 relative z-20">
      {visible.map((s) => <SkillPill key={s} skillName={s} showFill={showFill} />)}
      {hidden.length > 0 && !expanded && (
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono text-[var(--muted)] bg-[var(--hover-bg)] hover:border-[var(--fg)] hover:text-[var(--fg)] transition-all select-none cursor-none interactive"
          onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
        >
          +{hidden.length} more
        </button>
      )}
      {expanded && hidden.map((s) => <SkillPill key={s} skillName={s} showFill={showFill} />)}
      {expanded && (
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono text-[var(--muted)] bg-[var(--hover-bg)] hover:border-[var(--fg)] hover:text-[var(--fg)] transition-all select-none cursor-none interactive"
          onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
        >
          Show less
        </button>
      )}
    </div>
  );
}
