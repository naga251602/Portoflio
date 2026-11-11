import fs from 'node:fs';
const types=['projects','experience','research','contributions'];let errors=[];let total=0;
for(const type of types){const items=JSON.parse(fs.readFileSync(new URL(`../data/${type}/index.json`,import.meta.url),'utf8'));const ids=new Set();for(const item of items){total++;if(!item.id||ids.has(item.id))errors.push(`${type}: duplicate/missing ID`);ids.add(item.id);if(!Array.isArray(item.details)||item.details.some(p=>!Array.isArray(p)||p.length!==2))errors.push(`${type}/${item.id}: invalid detail tuple`);if(!Array.isArray(item.skills))errors.push(`${type}/${item.id}: invalid skills`)}}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log(`Validated ${total} records across ${types.length} categories`);
