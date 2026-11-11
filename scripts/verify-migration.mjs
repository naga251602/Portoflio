/** No npm dependencies. Static 1:1 fidelity and module-structure audit. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mustExist=['app/layout.jsx','app/page.jsx','app/about/page.jsx','app/projects/page.jsx','app/research/page.jsx','app/experience/page.jsx','app/others/page.jsx','app/detail/[category]/[id]/page.jsx','components/Details.jsx','components/Cards.jsx','components/SkillDock.jsx','components/SkillsSection.jsx','components/CodingSection.jsx','components/Hero.jsx','components/Collection.jsx','components/Shell.jsx','lib/data_loader.js','lib/extract_skill.js','lib/card_excerpt.js','lib/urls.js','lib/plugin_registry.js','scripts/v77-reference-checksums.json'];
for(const rel of mustExist)if(!fs.existsSync(path.join(root,rel)))throw Error(`Missing file ${rel}`);
const checks=JSON.parse(fs.readFileSync(path.join(root,'scripts/v77-reference-checksums.json'),'utf8'));
for(const [file,expected] of Object.entries(checks)){
 const rel=file.startsWith('data/')||file.startsWith('plugin/')?file:`styles/${file.replace('components/','')}`;
 const found=path.join(root,rel);if(!fs.existsSync(found))throw Error(`Missing original file ${rel}`);
 const digest=crypto.createHash('sha256').update(fs.readFileSync(found)).digest('hex');if(digest!==expected)throw Error(`Source v7.7 fidelity mismatch: ${rel}`);
}
const names=['globe','parallax-title','simulation-3d','single-screenshot','screenshot-carousel','architecture-diagram','code-viewer','interactive-notebook-cell','animated-notebook-output'];
for(const name of names)for(const filename of ['index.jsx','styles.css','README.md'])if(!fs.existsSync(path.join(root,'plugin',name,filename)))throw Error(`Missing ${name}/${filename}`);
const source=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,item.name);if(item.isDirectory())walk(f);else if(/\.(js|jsx|mjs)$/.test(f))source.push(f)}}
for(const sub of ['app','components','lib','plugin','scripts','config'])walk(path.join(root,sub));
const importRe=/(?:from\s*|import\s*\()\s*['"](@\/[^'"]+|\.{1,2}\/[^'"]+)['"]/g;
for(const file of source){const text=fs.readFileSync(file,'utf8');if(!file.endsWith('verify-migration.mjs') && text.includes('dangerouslySetInnerHTML'))throw Error(`Legacy HTML injection: ${file}`);for(const match of text.matchAll(importRe)){const spec=match[1],to=spec.startsWith('@/')?path.join(root,spec.slice(2)):path.resolve(path.dirname(file),spec);if(!['','.js','.jsx','.json','/index.jsx','/index.js'].some(ext=>fs.existsSync(to+ext)))throw Error(`Unresolved module ${spec} in ${file}`)}}
for(const file of ['app.js','index.html','public/index.html','styles/next-overrides.css'])if(fs.existsSync(path.join(root,file)))throw Error(`Legacy compatibility code remains: ${file}`);
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json')));if(pkg.dependencies.tailwindcss||pkg.dependencies['lucide-react'])throw Error('Unused runtime dependency');
const data=['projects','experience','research','contributions'].map(c=>JSON.parse(fs.readFileSync(path.join(root,'data',c,'index.json'))));
if(data.reduce((a,b)=>a+b.length,0)!==40)throw Error('Expected exactly the 40 original records');
const featured=data[0].filter(x=>x.is_featured).map(x=>x.id);if(!featured.includes('subletsafe')||!featured.includes('palate'))throw Error('Missing selected featured projects');
const ids=['intro','featured','experience','coding','work','research','others','skills','contact'];const home=fs.readFileSync(path.join(root,'app/page.jsx'),'utf8');for(const id of ids)if(!home.includes(id))throw Error(`Missing homepage section ${id}`);
console.log(`PASS: ${source.length} JS/JSX source files, ${Object.keys(checks).length} unmodified v7.7 CSS/data assets, ${names.length} rich plugins, 40 JSON records and 9 homepage sections.`);
