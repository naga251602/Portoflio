import json, re, subprocess, pathlib
from bs4 import BeautifulSoup
root=pathlib.Path(__file__).resolve().parents[1]
scripts=[x.get_text() for x in BeautifulSoup((root/'source/legacy.html').read_text(),'html.parser').find_all('script')]
def json_array(src,marker):
 pos=src.index(marker)+len(marker)
 return json.JSONDecoder().raw_decode(src[pos:].lstrip())[0]
def js_expr(src,marker):
 p=src.index(marker)+len(marker);p+=len(src[p:])-len(src[p:].lstrip());a=p
 opener=src[p];close={ '[':']','{':'}'}[opener]; depth=0;quote=None;escape=False;comment=False
 for i in range(p,len(src)):
  c=src[i]
  if quote:
   if escape:escape=False
   elif c=='\\':escape=True
   elif c==quote:quote=None
  elif c in ('"',"'",'`'):quote=c
  elif c==opener:depth+=1
  elif c==close:
   depth-=1
   if depth==0:return src[a:i+1]
 raise ValueError(marker)
projects=json_array(scripts[11],'const P =')
research=json_array(scripts[12],'research:')
experience=json_array(scripts[12],'experience:')
expr=js_expr(scripts[12],'POSTS =')
node='const vm=require("vm");const fs=require("fs");const s=fs.readFileSync(0,"utf8");process.stdout.write(JSON.stringify(vm.runInNewContext("("+s+")",{}, {timeout:1500})));'
posts=json.loads(subprocess.run(['node','-e',node],input=expr,text=True,capture_output=True,check=True).stdout)
print('Extracted',len(projects),'projects',len(posts),'posts',len(research),'papers',len(experience),'experience')
(root/'migration/legacy-data').mkdir(exist_ok=True)
for key,data in [('projects',projects),('posts',posts),('research',research),('experience',experience)]: (root/'migration/legacy-data'/f'{key}.json').write_text(json.dumps(data,indent=2,ensure_ascii=False))
for p in projects:
 def slug(x):return str(x).lower().replace(' ','-')
 meta={'id':p['id'],'title':p['t'],'summary':p.get('d',''),'details':p.get('dl',''),'stack':p.get('st',[]),'category':p.get('tg','tools'),'level':p.get('lv','side project'),'github':p.get('repo',''),'githubSlug':p.get('g',''),'date':str(p.get('date','')),'emoji':'','related':[]}
 body=p.get('body','') or p.get('dl','') or p.get('d','')
 (root/'content/projects'/f"{p['id']}.mdx").write_text('---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---\n\n'+body+'\n')
for p in posts:
 slug=p['slug'];body=p.get('body','') or p.get('content','') or ''
 meta={'slug':slug,'title':p.get('title',slug),'date':p.get('date',''),'tags':p.get('tags',[]),'takeaways':p.get('takeaways',[]),'summary':p.get('summary','') or (body[:230].replace('\n',' ').strip()),'project':p.get('project',''),'draft':False}
 (root/'content/blog'/f'{slug}.mdx').write_text('---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---\n\n'+body+'\n')
for p in research:
 slug=p['slug'];meta={k:p.get(k,'') for k in ['slug','title','short','abstract','question','method','findings','url','bibtex']};meta.update({'skills':p.get('skills',[]),'venue':p.get('status',''),'year':'','award':'','citations':'','diagram':'','diagramCaption':''})
 body='## Research question\n\n'+p.get('question','')+'\n\n## Method\n\n'+p.get('method','')+'\n\n## Findings\n\n'+p.get('findings','')
 (root/'content/research'/f'{slug}.mdx').write_text('---\n'+json.dumps(meta,ensure_ascii=False,indent=2)+'\n---\n\n'+body+'\n')
(root/'content/experience.json').write_text(json.dumps([{'role':p.get('role',''),'company':p.get('company',''),'dates':p.get('dates',''),'description':p.get('description',''),'points':p.get('highlights',[]),'skills':p.get('skills',[])} for p in experience],indent=2))
(root/'content/site.ts').write_text('export const site = {name:"Naga",role:"Software Engineer",headline:"Software, data, and systems engineering",description:"Building thoughtful software, storage systems, and machine learning tools.",socials:[{label:"GitHub",href:"https://github.com/naga251602"},{label:"LinkedIn",href:"https://www.linkedin.com/in/gauravnv"},{label:"Email",href:"mailto:nagalapu@usc.edu"}]};\n')
tags=sorted(set([t for p in posts for t in p.get('tags',[])]+[t for p in projects for t in p.get('st',[])]+[t for p in research for t in p.get('skills',[])]))
(root/'content/tags.ts').write_text('export const tags = '+json.dumps(tags,ensure_ascii=False,indent=2)+' as const;\nexport const aliases: Record<string,string> = {};\n')
