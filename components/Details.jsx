'use client';
/** v7.7 detail hero + sections reconstructed as native React. */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DetailSkillWrap } from './SkillDock';
import { Icon } from './Icons';
import { getRelatedForItem } from '@/lib/data_loader';
import { detailHref } from '@/lib/urls';
import PluginRenderer from './PluginRenderer';
import { mount as mountParallax } from '@/plugin/parallax-title/engine';
const pretty = { projects: 'Projects', experience: 'Experience', research: 'Research', others: 'Others', contributions: 'Contributions' };
export function DetailActions({ item }) { return <>{item.code && <a className="primary" href={item.code} target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow" /></a>}{item.demo && <a href={item.demo} target="_blank" rel="noopener noreferrer">Demo <Icon name="arrow" /></a>}</> }
export function Details({ item, category }) {
  const root = useRef(null), [contributionOpen, setContributionOpen] = useState(false); const title = item.title || item.role, tags = item.skills || [], related = getRelatedForItem(item); const notes = Array.isArray(item.my_contribution) ? item.my_contribution.join(' · ') : item.my_contribution;
  useEffect(() => { if(root.current) return mountParallax(root.current); return undefined }, [item.id]);
  return <main id="route-root" ref={root} aria-live="polite"><div className="detail-hero"><div className="detail-glow" /><Link className="back-link" href={`/${category === 'contributions' ? 'others' : category}`}><Icon name="arrow" /> Back to all {(pretty[category] || category).toLowerCase()}</Link><div className="detail-kicker">{(pretty[category] || category).toUpperCase()} / FIELD NOTES</div><h1 className="detail-title">{title}</h1><DetailSkillWrap skills={tags} /><div className="detail-actions"><button type="button" id="toggle-contrib" aria-expanded={contributionOpen} onClick={() => setContributionOpen(x => !x)}>My contribution <Icon name="down" /></button><DetailActions item={item} /></div><div className={`my-contrib detail-note ${contributionOpen ? 'open' : ''}`} id="my-contrib">{notes || 'Not documented.'}</div></div>
    <div className="detail-main"><div className="detail-note detail-short-version"><div className="short-note-title"><Icon name="file" /> The short version:</div><p>{item.intro || ''}</p></div><div id="detail-blocks">{(item.details || []).map(([type, props], i) => <section className="detail-section" key={`${type}-${i}`}>{props.heading && <h2>{props.heading}</h2>}{type === 'text' ? <p style={{ whiteSpace: 'pre-line' }}>{props.content || ''}</p> : type === 'list' ? <ul className="list-disc pl-5 text-xs text-dim leading-8">{(props.items || []).map((value, j) => <li key={j}>{typeof value === 'string' ? value : `${value.label || ''}: ${value.value || ''}`}</li>)}</ul> : <PluginRenderer type={type} props={props} />}</section>)}</div>
      <section className="detail-section"><h2>Related work</h2>{related.length ? related.map(x => <Link className="related-item" href={detailHref(x.category, x)} key={`${x.category}-${x.id}`}>{x.title || x.role} · {pretty[x.category] || x.category} <Icon name="arrow" className="w-3 h-3 inline" /></Link>) : <p>No other entries share these tags.</p>}</section><section className="detail-section"><h2>Related links</h2><div className="detail-actions"><DetailActions item={item} />{!item.code && !item.demo && <p>No verified external links listed.</p>}<Link href={`/${category === 'contributions' ? 'others' : category}`}>Browse {pretty[category] || category} <Icon name="arrow" /></Link></div></section></div></main>
}
