'use client';
/** Native React skill dock and v7.7 skill-pill markup; no injected HTML. */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelated } from '@/lib/data_loader';
import { detailHref } from '@/lib/urls';
import { Icon } from './Icons';
const DockContext = createContext(null);
export function useSkillDock() { const ctx = useContext(DockContext); return ctx?.open || (() => { }); }
const names = { experience: 'Experience', research: 'Research', projects: 'Projects', others: 'Others' };
export function SkillProvider({ children }) {
  const [skill, setSkill] = useState(null), pathname = usePathname();
  const matches = useMemo(() => skill ? getRelated(skill) : [], [skill]);
  useEffect(() => setSkill(null), [pathname]);
  useEffect(() => { const onKey = e => { if(e.key === 'Escape') setSkill(null) }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }, []);
  return <DockContext.Provider value={{ open: setSkill }}>{children}<div id="skill-dock" className={`skill-dock ${skill ? 'open' : ''}`} role="dialog" aria-label="Related work by skill" aria-hidden={!skill} onClick={e => e.stopPropagation()}>
    {skill && <><div className="dock-head"><div><span className="font-mono text-[10px] text-hot">SKILL EXPLORER</span><div className="dock-title">{skill} <span className="text-dim font-normal">· related work</span></div></div><button type="button" className="dock-close" aria-label="Close related work" onClick={() => setSkill(null)}>×</button></div><div className="mt-2 max-h-[45vh] overflow-y-auto">{matches.length ? ['experience', 'research', 'projects', 'others'].map(cat => { const group = matches.filter(x => x.category === cat); return group.length > 0 ? <div className="dock-group" key={cat}><div className="dock-group-label">{names[cat].toUpperCase()} · {group.length}</div>{group.map(item => <Link key={`${cat}-${item.id}`} className="dock-item" href={detailHref(cat, item)} onClick={() => setSkill(null)}><span>{item.title || item.role}</span><Icon name="arrow" className="w-3 h-3" /></Link>)}</div> : null }) : <p className="text-sm text-dim py-3">No related entries yet.</p>}</div></>}
  </div>{skill && <button className="dock-dismiss" aria-label="Dismiss skill dock" onClick={() => setSkill(null)} style={{ position: 'fixed', inset: 0, background: 'transparent', border: 0, zIndex: 79, cursor: 'default' }} />}</DockContext.Provider>
}
export function SkillPill({ name }) { const open = useSkillDock(); return <button type="button" className="click-skill font-mono text-[10px] text-dim border border-line rounded-full px-2 py-0.5" data-skill={name} title={`Show related work using ${name}`} onClick={() => open(name)}>{name}</button> }
export function SkillWrap({ skills = [] }) {  
const [expanded, setExpanded] = useState(false); return <div className="flex flex-wrap gap-1.5 items-center skill-wrap" data-expanded={expanded}>
    {skills.slice(0, 3).map((name, i) => <SkillPill key={`${name}-${i}`} name={name} />)}
    {skills.length > 3 && <><span className={`extra-skills ${expanded ? 'inline-flex flex-wrap gap-1.5' : 'hidden contents-off'}`}>{skills.slice(3).map((name, i) => <SkillPill key={`${name}-${i}`} name={name} />)}</span><button type="button" className="skill-more" aria-expanded={expanded} aria-label={`Show ${skills.length - 3} additional skills`} onClick={() => setExpanded(x => !x)}>{expanded ? 'Show less' : `+${skills.length - 3} more`}</button></>}
  </div>
}
export function DetailSkillWrap({ skills = [] }) {
  const [expanded, setExpanded] = useState(false), [count, setCount] = useState(skills.length); const row = useMemo(() => skills, [skills]);
  // Preserve original two-row wrapping behavior, including viewport recalculation.
  const ref = useRefPlaceholder();
  useEffect(() => { if(!ref.current) return; const element = ref.current; const reflow = () => { const pills = [...element.children]; pills.forEach(x => x.hidden = false); if(expanded) { setCount(pills.length); return; } const tops = [...new Set(pills.map(p => p.offsetTop))].sort((a, b) => a - b); const max = tops[1] ?? tops[0] ?? 0; let visible = 0; pills.forEach(p => { if(p.offsetTop > max) p.hidden = true; else visible++ }); setCount(visible) }; requestAnimationFrame(reflow); const observer = new ResizeObserver(reflow); observer.observe(element); return () => observer.disconnect() }, [expanded, skills]);
  return <div className="detail-skill-wrap" data-detail-skills><div ref={ref} className="detail-skill-tags">{row.map((name, i) => <SkillPill key={`${name}-${i}`} name={name} />)}</div>{skills.length > count && <button type="button" className="detail-skill-more" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : `+${skills.length - count} more`}</button>}{expanded && count === skills.length && skills.length > 2 && <button type="button" className="detail-skill-more" onClick={() => setExpanded(false)}>Show less</button>}</div>
}
import { useRef } from 'react';
function useRefPlaceholder() { return useRef(null) }
