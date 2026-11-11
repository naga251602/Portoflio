'use client';
import Link from 'next/link';
import { Icon } from './Icons';
import { SkillWrap } from './SkillDock';
import { cardExcerpt } from '@/lib/card_excerpt';
import { detailHref } from '@/lib/urls';
export default function Experience({ items = [] }) { return <div className="home-experience-timeline">{items.slice(0, 2).map((entry, i) => <article key={entry.id} className="home-exp-entry"><span className="home-exp-node" /><div className="home-exp-content"><div className="home-exp-top"><span className="font-mono text-xs text-hot">{entry.period || 'Experience'}</span><Link href={detailHref('experience', entry)} aria-label={`View ${entry.role}`}><Icon name="arrow" /></Link></div><h3>{entry.role}</h3><p className="home-exp-org">{entry.org}</p><p className="home-exp-intro">{cardExcerpt(entry.intro)}</p><SkillWrap skills={entry.skills} /></div></article>)}</div> }
export function ExperienceCard({ item }) { return <article className="exp-timeline"><div className="flex items-start justify-between gap-2 px-4 pt-4"><div><div className="text-base font-medium">{item.role}</div><div className="text-sm text-[#a4bed0] mt-1">{item.org}</div></div><span className="font-mono text-xs text-dim">{item.period || ''}</span></div><p className="text-sm text-dim px-4 pt-3 leading-relaxed">{cardExcerpt(item.intro)}</p><div className="px-4 py-3"><SkillWrap skills={item.skills} /></div><div className="px-4 pb-4"><Link className="action-btn action-primary inline-flex items-center gap-2" href={detailHref('experience', item)}>View experience <Icon name="arrow" /></Link></div></article> }
