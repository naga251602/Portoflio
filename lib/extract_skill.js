/**
 * Usage: Derives and deduplicates skill descriptors from the published content collections.
 * Edit guidance: see /llm-guide.md; preserve public exports, IDs and class hooks.
 */
/**
 * Derive the Skills section from the tags actually used in portfolio data.
 * Preserves manually authored skills and enriches it with any missing tags.
 * No DOM access, side effects, requests or runtime dependencies.
 */
const clean = value => String(value ?? '').trim().replace(/\s+/g, ' ');
const keyOf = value => clean(value).toLocaleLowerCase('en-US');
const LANGUAGES = new Set(['python', 'sql', 'c++', 'java', 'javascript', 'typescript', 'go', 'rust', 'pyspark']);
const TOOLS = new Set(['git', 'docker', 'linux', 'rocksdb', 'wal', 'b+ trees', 'tcp/udp']);
const AREA_DESCRIPTIONS = {
  'storage': 'Storage systems and persistent data structures.',
  'optimization': 'Methods and experiments for improving objective functions.',
  'neural networks': 'Exploring neural network behavior and architectures.',
  'visualization': 'Communicating technical ideas through visual models.',
  'microservices': 'Building and integrating distributed application services.',
};

export function classifySkill(name) {
  const key = keyOf(name);
  if(LANGUAGES.has(key)) return 'Languages';
  if(TOOLS.has(key)) return 'Tools';
  return 'Areas';
}

/** @param {Object} collections - named arrays: experience, projects, research, others, featured
 * @param {Array} existingSkills - hand-written skills (name, group, d)
 * @returns {Array<{name:string,group:string,d:string}>}
 */
export function extractSkills(collections = {}, existingSkills = []) {
  const output = [];
  const seen = new Map();
  for(const skill of existingSkills) {
    const name = clean(skill?.name);
    if(!name || seen.has(keyOf(name))) continue;
    seen.set(keyOf(name), output.length);
    output.push({ ...skill, name });
  }
  const occurrences = new Map();
  for(const [category, entries] of Object.entries(collections)) {
    if(!Array.isArray(entries)) continue;
    for(const entry of entries) {
      const unique = new Set();
      for(const raw of entry?.skills ?? entry?.stack ?? []) {
        const name = clean(raw), key = keyOf(name);
        if(!name || unique.has(key)) continue;
        unique.add(key);
        if(!occurrences.has(key)) occurrences.set(key, { name, categories: new Set() });
        occurrences.get(key).categories.add(category);
      }
    }
  }
  for(const [key, { name, categories }] of occurrences) {
    if(seen.has(key)) continue;
    const group = classifySkill(name);
    const context = [...categories].map(x => x === 'featured' ? 'featured work' : x).join(', ');
    output.push({ name, group, d: AREA_DESCRIPTIONS[key] ?? `Used in ${context}.` });
    seen.set(key, output.length - 1);
  }
  return output;
}
