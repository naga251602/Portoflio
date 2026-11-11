'use client';
/** Original v7.7 homepage section ordering and markup, with native React rendering. */
import Hero from '@/components/Hero';
import { getPortfolio } from '@/lib/data_loader';
import { FeaturedCard, ContentCard, OthersCard, SectionHead } from '@/components/Cards';
import Experience from '@/components/Experience';
import CodingSection from '@/components/CodingSection';
import SkillsSection from '@/components/SkillsSection';
import Contact from '@/components/Contact';
import { useHomeSearch } from '@/components/Shell';
const DATA = getPortfolio();
export default function Home() {  
const { query } = useHomeSearch(); const q = query.trim().toLowerCase(); const matches = (id, content) => !q || (id + ' ' + content).toLowerCase().includes(q);
  const sections = [
    { id: 'featured', content: DATA.featured.map(x => `${x.title || x.role} ${x.intro} ${x.skills.join(' ')}`).join(' ') },
    { id: 'experience', content: DATA.experience.slice(0, 2).map(x => `${x.role} ${x.org} ${x.intro} ${x.skills.join(' ')}`).join(' ') },
    { id: 'coding', content: 'code contributions github codeforces leetcode atcoder' },
    { id: 'work', content: DATA.projects.slice(0, 2).map(x => `${x.title} ${x.intro} ${x.skills.join(' ')}`).join(' ') },
    { id: 'research', content: DATA.research.slice(0, 2).map(x => `${x.title} ${x.intro} ${x.skills.join(' ')}`).join(' ') },
    { id: 'others', content: DATA.others.slice(0, 2).map(x => `${x.title} ${x.intro} ${x.skills.join(' ')}`).join(' ') },
    { id: 'skills', content: DATA.skills.map(x => x.name + ' ' + x.d).join(' ') },
    { id: 'contact', content: 'contact name email message collaboration' }
  ]; const visible = new Set(sections.filter(x => matches(x.id, x.content)).map(x => x.id));
  return <><main id="main">{(!q || matches('intro', DATA.intro.text + ' ' + DATA.intro.sub)) && <Hero />}
    {visible.has('featured') && <SectionHead id="featured" title="Featured"><div className="grid sm:grid-cols-2 gap-4">{DATA.featured.slice(0, 2).map((p, i) => <FeaturedCard item={p} index={i} key={`${p.category}-${p.id}`} />)}</div></SectionHead>}
    {visible.has('experience') && <SectionHead id="experience" title="Experience" viewAll href="/experience"><Experience items={DATA.experience} /></SectionHead>}
    {visible.has('coding') && <CodingSection />}
    {visible.has('work') && <SectionHead id="work" title="Projects" viewAll href="/projects"><div className="grid sm:grid-cols-2 gap-4">{DATA.projects.slice(0, 2).map((p, i) => <ContentCard item={p} category="projects" index={i} key={p.id} />)}</div></SectionHead>}
    {visible.has('research') && <SectionHead id="research" title="Research" viewAll href="/research"><div className="grid sm:grid-cols-2 gap-4">{DATA.research.slice(0, 2).map((p, i) => <ContentCard item={p} category="research" index={i} key={p.id} />)}</div></SectionHead>}
    {visible.has('others') && <SectionHead id="others" title="Others" viewAll href="/others"><div className="grid sm:grid-cols-2 gap-4">{DATA.others.slice(0, 2).map((p, i) => <OthersCard item={p} index={i} key={p.id} />)}</div></SectionHead>}
    {visible.has('skills') && <SectionHead id="skills" title="Skills"><SkillsSection /></SectionHead>}
    {visible.has('contact') && <SectionHead id="contact" title="Contact"><Contact /></SectionHead>}
  </main>{q && visible.size === 0 && !matches('intro', DATA.intro.text + ' ' + DATA.intro.sub) && <p id="hint" className="mt-10 text-sm text-dim">No results.</p>}</>;
}
