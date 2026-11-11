'use client';
/** Literal v7.7 compact card layout with native Link navigation and React event handlers. */
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from './Icons';
import { artUrl } from './Artwork';
import { SkillWrap } from './SkillDock';
import { detailHref } from '@/lib/urls';
import { cardExcerpt } from '@/lib/card_excerpt';
function urlCategory(item, category) { return category === 'featured' ? item.category : category; }
export function CardActions({ item, category, index = 0 }) {
  const research = category === 'research'; const code = item.code; const [copied, setCopied] = useState(false);
  const copyCitation = async () => { const citation = `${item.title}. Research notebook, Gaurav N V's portfolio. ${window.location.origin}/#research`; try { await navigator.clipboard.writeText(citation); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.prompt('Copy research reference:', citation) } };
  return <div className="card-actions flex flex-wrap items-center mt-3 pt-3 border-t border-line"><Link className="action-btn action-primary detail-open" href={detailHref(category, item)} data-kind={category} data-index={index}>View <Icon name="arrow" /></Link>
    {research ? <button type="button" className="action-btn action-secondary cite-btn" data-title={item.title} onClick={copyCitation}>{copied ? 'Copied!' : 'Cite'} <Icon name="cite" /></button> : code ? <a className="action-btn action-secondary" href={code} target="_blank" rel="noopener noreferrer">Code <Icon name="github" /></a> : null}</div>
}
export function ContentCard({ item, category = 'projects', index = 0 }) {
  const research = category === 'research';
  return <article className={`card compact-card ${research ? 'research-card' : ''} overflow-hidden rounded-xl border border-line bg-card flex flex-col`}>
    {!research && <div className="overflow-hidden h-36 sm:h-40 bg-bg"><img src={artUrl(index + 3, 480, 230)} alt="" className="w-full h-full object-cover" loading="lazy" /></div>}
    <div className={`px-4 py-3.5 flex flex-col flex-1 ${research ? 'research-content' : ''}`}><span className="font-mono text-[10px] text-hot">{item.tag}</span><h3 className="mt-1 font-medium text-sm leading-snug">{item.title}</h3><p className="mt-1.5 text-xs text-dim leading-relaxed flex-1">{cardExcerpt(item.intro)}</p><div className="mt-3"><SkillWrap skills={item.skills} /></div><CardActions item={item} category={category} index={index} /></div></article>
}
export function FeaturedCard({ item, index }) {
  const flat = ['research', 'contributions', 'experience'].includes(item.category), category = item.category;
  return <article className={`card compact-card ${flat ? 'research-card' : ''} rounded-xl border border-line bg-card overflow-hidden flex flex-col`}>
    {!flat && <div className="h-36 sm:h-40 overflow-hidden bg-bg"><img src={artUrl(index + 13, 480, 230)} alt="" className="w-full h-full object-cover" loading="lazy" /></div>}
    <div className={`px-4 py-3.5 flex flex-col flex-1 ${flat ? 'research-content' : ''}`}><div className="text-[10px] tracking-wide font-mono text-hot">{item.tag || item.org || category}</div><h3 className="text-sm font-medium mt-1.5 leading-snug">{item.title || item.role}</h3><p className="text-xs text-dim leading-relaxed mt-1.5 flex-1">{cardExcerpt(item.intro)}</p><div className="mt-3"><SkillWrap skills={item.skills} /></div><CardActions item={item} category={category} index={index} /></div></article>
}
export function OthersCard({ item, index = 0 }) { return <article className="card research-card compact-card others-card rounded-xl border border-line overflow-hidden flex flex-col"><div className="research-content p-4 flex flex-col flex-1"><span className="font-mono text-[10px] text-hot">{item.tag}</span><h3 className="text-sm font-medium mt-2">{item.title}</h3><p className="text-xs text-dim leading-relaxed mt-2 flex-1">{cardExcerpt(item.intro)}</p><div className="mt-3"><SkillWrap skills={item.skills} /></div><CardActions item={item} category="contributions" index={index} /></div></article> }
export function SectionHead({ id, title, children, viewAll = false, href }) { return <section id={id} className="portfolio-section pt-16"><div className="section-editorial-head"><div className="section-editorial-copy"><span className="section-eyebrow">PORTFOLIO / {title.toUpperCase()}</span><h2 className="section-editorial-title">{title}</h2></div>{viewAll && <Link className="view-all ml-auto" href={href || `/${id === 'work' ? 'projects' : id}`} onClick={() => { try { sessionStorage.setItem(`origin:${id === 'work' ? 'projects' : id}`, `/#${id}`) } catch { } }}>View all {title.toLowerCase()} <Icon name="arrow" /></Link>}</div>{children}</section> }
