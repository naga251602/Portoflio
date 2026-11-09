import fs from 'node:fs';
const norm=fs.readFileSync('design_norms/design_norms_sitemap.md','utf8');
const routes={home:'',projects_index:'projects',project_detail:'projects/[id]',blog_index:'blog',blog_detail:'blog/[slug]',research_index:'research',research_detail:'research/[slug]',experience:'experience',simulations_index:'playground',contributions:'contributions',contribution_detail:'contributions/[slug]'};
const errors=[];
for(const [type,folder] of Object.entries(routes)) {
 const route=`src/app/${folder?folder+'/':''}page.tsx`;
 if(!fs.existsSync(route))errors.push(`Missing route: ${route}`);
 if(!norm.includes('`'+type+'`') && !norm.includes('| '+type+' |'))errors.push(`Missing sitemap row: ${type}`);
 const normFile=`design_norms/design_norms_page_${type}.md`;
 if(!fs.existsSync(normFile))errors.push(`Missing page norm: ${normFile}`);
}
const normNames=[...norm.matchAll(/\(design_norms_([a-z_]+)\.md\)/g)].map(x=>`design_norms_${x[1]}.md`);
for(const name of new Set(normNames)) if(!fs.existsSync('design_norms/'+name))errors.push('Missing norm reference: '+name);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Route/page norm and sitemap file references checked. Full symmetric table validation remains manual.');
