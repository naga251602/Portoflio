import fs from 'node:fs';import path from 'node:path';import matter from 'gray-matter';
// Only complete, top-level triple-backtick sim fences are executable inputs.
// Keep this permission narrow: ordinary code examples still prohibit script tags.
function outsideSimulations(content) {
  const lines = content.split(/\r?\n/);
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (fence) {
      const close = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      continue;
    }
    if (/^```sim[ \t]*$/.test(line)) {
      const end = lines.findIndex((value, index) => index > i && /^```[ \t]*$/.test(value));
      if (end !== -1) {
        lines.fill('', i, end + 1);
        i = end;
        continue;
      }
    }
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) fence = open[1];
  }
  return lines.join('\n');
}
const base=path.resolve('content');const ids=new Set(),projects=new Set(),issues=[];
for(const kind of ['projects','blog','research','contributions']){const folder=path.join(base,kind);for(const file of fs.readdirSync(folder).filter(x=>x.endsWith('.mdx'))){try{const raw=fs.readFileSync(path.join(folder,file),'utf8');const {data,content}=matter(raw);const slug=data.slug||data.id;if(!slug||!data.title)issues.push(file+': missing slug/title');if(ids.has(kind+':'+slug))issues.push(file+': duplicate id');ids.add(kind+':'+slug);if(kind==='projects')projects.add(slug);if(data.tags&&!Array.isArray(data.tags))issues.push(file+': invalid tags');if(kind==='blog'&&!data.date)issues.push(file+': missing date');if(/<script\b/i.test(outsideSimulations(content)))issues.push(file+': inline script forbidden');}catch(e){issues.push(file+': '+e.message)}}}
for(const file of fs.readdirSync(path.join(base,'blog')).filter(x=>x.endsWith('.mdx'))){const {data}=matter(fs.readFileSync(path.join(base,'blog',file),'utf8'));if(data.project&&!projects.has(data.project))issues.push(file+': missing project reference '+data.project)}
if(issues.length){console.error(issues.join('\n'));process.exit(1)}console.log('Content checks passed.');
