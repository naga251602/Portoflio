import fs from 'node:fs';import path from 'node:path';import matter from 'gray-matter';
export type Item={slug:string;id?:string;title:string;summary?:string;date?:string;tags?:string[];stack?:string[];category?:string;level?:string;github?:string;githubSlug?:string;short?:string;abstract?:string;url?:string;skills?:string[];project?:string;takeaways?:string[];related?:string[];body:string;[key:string]:unknown};
type Kind='projects'|'blog'|'research'|'contributions';
const base=path.join(process.cwd(),'content');
export function list(kind:Kind):Item[]{const dir=path.join(base,kind);if(!fs.existsSync(dir))return [];return fs.readdirSync(dir).filter(x=>x.endsWith('.mdx')).map(file=>{const parsed=matter(fs.readFileSync(path.join(dir,file),'utf8'));return {...parsed.data,slug:parsed.data.slug??parsed.data.id??file.replace('.mdx',''),body:parsed.content} as Item})}
export function get(kind:Kind,slug:string){return list(kind).find(x=>x.slug===slug)}
export function href(kind:Kind,item:Item){return `/${kind}/${item.slug}`}
export function allSearch(){return (['projects','blog','research','contributions'] as Kind[]).flatMap(kind=>list(kind).map(x=>({title:x.title,summary:x.summary||x.abstract||'',href:href(kind,x),kind})))}
export function slugify(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
