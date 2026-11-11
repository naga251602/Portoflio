/** v7.7 schema and visibility rules, now using Next bundler JSON imports. */
import projects from '@/data/projects/index.json';
import experience from '@/data/experience/index.json';
import research from '@/data/research/index.json';
import contributions from '@/data/contributions/index.json';
import links from '@/data/socials/index.json';
import { SITE } from '@/config/site';
import { extractSkills } from '@/lib/extract_skill';
import { SKILL_DESCRIPTIONS } from '@/config/skill_descriptions';
const visible = entries => entries.filter(x => (x.status ?? 'published') === 'published').sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
const collections = { projects: visible(projects), experience: visible(experience), research: visible(research), contributions: visible(contributions) };
export function getAll(category) { return [...(collections[category] || [])]; }
export function getById(category, id) { return getAll(category).find(x => x.id === id) ?? null; }
export function getOthers() { return getAll('contributions').filter(x => x.display_group === 'others'); }
export function getNotable() { return getAll('contributions').filter(x => x.display_group === 'notable'); }
export function getSocials() { return links; }
export function getFeatured() { return Object.entries(collections).flatMap(([category, items]) => items.filter(x => x.is_featured).map(x => ({ ...x, category }))).sort((a, b) => (a.order ?? 999) - (b.order ?? 999)); }
export function getRelated(skill) { const key = String(skill).toLowerCase().replace(/[^a-z0-9]/g, ''); return Object.entries({ ...collections, others: getOthers() }).filter(([category]) => category !== 'contributions').flatMap(([category, items]) => items.filter(x => (x.skills || []).some(s => s.toLowerCase().replace(/[^a-z0-9]/g, '') === key)).map(x => ({ ...x, category }))).sort((a, b) => ['experience', 'research', 'projects', 'others'].indexOf(a.category) - ['experience', 'research', 'projects', 'others'].indexOf(b.category)); }
export function getRelatedForItem(item) { return Object.entries({ ...collections, others: getOthers() }).filter(([cat]) => cat !== 'contributions').flatMap(([category, items]) => items.filter(x => x.id !== item.id && (x.skills || []).some(s => (item.skills || []).includes(s))).map(x => ({ ...x, category }))).filter((x, i, a) => a.findIndex(y => y.id === x.id) === i).slice(0, 4); }
export function getPortfolio() { return { ...SITE, ...collections, others: getOthers(), notable: getNotable(), links, featured: getFeatured(), skills: extractSkills({ ...collections, others: getOthers() }, SKILL_DESCRIPTIONS) }; }
