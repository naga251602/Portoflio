import { SkillMeta, skillsConfig, detailsData } from "./data";

const iconHints: Record<string, string> = {
  python: "devicon-python-plain",
  go: "devicon-go-plain",
  javascript: "devicon-javascript-plain",
  typescript: "devicon-typescript-plain",
  react: "devicon-react-original",
  "next.js": "devicon-nextjs-plain",
  "node.js": "devicon-nodejs-plain",
  docker: "devicon-docker-plain",
  kubernetes: "devicon-kubernetes-plain",
  postgresql: "devicon-postgresql-plain",
  mongodb: "devicon-mongodb-plain",
  redis: "devicon-redis-plain",
  sqlite: "devicon-sqlite-plain",
  pytorch: "devicon-pytorch-plain",
  pandas: "devicon-pandas-plain",
  numpy: "devicon-numpy-plain",
  "scikit-learn": "devicon-scikitlearn-plain",
  fastapi: "devicon-fastapi-plain",
  flask: "devicon-flask-original",
  graphql: "devicon-graphql-plain",
  "tailwind css": "devicon-tailwindcss-plain",
  "html/css": "devicon-html5-plain",
  aws: "devicon-amazonwebservices-plain-wordmark",
  linux: "devicon-linux-plain",
  nginx: "devicon-nginx-original",
  "github actions": "devicon-githubactions-plain",
  "c++": "devicon-cplusplus-plain",
  c: "devicon-c-plain",
  sql: "devicon-sqldeveloper-plain",
};

function guessMeta(name: string): SkillMeta {
  const lower = name.toLowerCase();
  if (iconHints[lower]) return { name, icon: iconHints[lower], level: 70 };
  if (lower.includes("ml") || lower.includes("machine learning") || lower.includes("deep learning"))
    return { name, icon: "fa-brain", isFa: true, level: 70 };
  if (lower.includes("llm") || lower.includes("gpt") || lower.includes("ai"))
    return { name, icon: "fa-robot", isFa: true, level: 70 };
  if (lower.includes("api") || lower.includes("rest"))
    return { name, icon: "fa-code", isFa: true, level: 70 };
  if (lower.includes("database") || lower.includes("db") || lower.includes("sql"))
    return { name, icon: "fa-database", isFa: true, level: 70 };
  if (lower.includes("graph") || lower.includes("network"))
    return { name, icon: "fa-network-wired", isFa: true, level: 70 };
  if (lower.includes("nlp") || lower.includes("bert") || lower.includes("text"))
    return { name, icon: "fa-comment", isFa: true, level: 70 };
  if (lower.includes("vision") || lower.includes("image") || lower.includes("densenet"))
    return { name, icon: "fa-eye", isFa: true, level: 70 };
  if (lower.includes("algorithm") || lower.includes("struct"))
    return { name, icon: "fa-microchip", isFa: true, level: 70 };
  if (lower.includes("concurr") || lower.includes("thread") || lower.includes("async"))
    return { name, icon: "fa-code-branch", isFa: true, level: 70 };
  if (lower.includes("design") || lower.includes("architecture") || lower.includes("system"))
    return { name, icon: "fa-layer-group", isFa: true, level: 70 };
  if (lower.includes("auth") || lower.includes("oauth") || lower.includes("jwt") || lower.includes("security"))
    return { name, icon: "fa-shield-halved", isFa: true, level: 70 };
  if (lower.includes("open source") || lower.includes("cli"))
    return { name, icon: "fa-globe", isFa: true, level: 70 };
  if (lower.includes("simulation") || lower.includes("monte"))
    return { name, icon: "fa-shuffle", isFa: true, level: 70 };
  if (lower.includes("web") || lower.includes("socket"))
    return { name, icon: "fa-bolt", isFa: true, level: 70 };
  if (lower.includes("data") || lower.includes("analytics") || lower.includes("pipeline"))
    return { name, icon: "fa-chart-bar", isFa: true, level: 70 };
  if (lower.includes("test") || lower.includes("ci") || lower.includes("cd"))
    return { name, icon: "fa-circle-check", isFa: true, level: 70 };
  return { name, icon: "fa-code", isFa: true, level: 70 };
}

function buildSkillMetaMap(): Record<string, SkillMeta> {
  const map: Record<string, SkillMeta> = {};

  // From skillsConfig
  for (const arr of Object.values(skillsConfig)) {
    for (const s of arr) {
      map[s.name] = s;
    }
  }

  // Extra overrides
  const extras: Record<string, SkillMeta> = {
    "System Architecture": { name: "System Architecture", icon: "fa-layer-group", isFa: true, level: 85 },
    NLP: { name: "NLP", icon: "fa-comment", isFa: true, level: 80 },
    "Computer Vision": { name: "Computer Vision", icon: "fa-eye", isFa: true, level: 80 },
    "Open Source": { name: "Open Source", icon: "fa-globe", isFa: true, level: 85 },
    GPT: { name: "GPT", icon: "fa-robot", isFa: true, level: 85 },
    "OAuth 2.0": { name: "OAuth 2.0", icon: "fa-shield-halved", isFa: true, level: 80 },
    "Graph Attention Networks": { name: "Graph Attention Networks", icon: "fa-network-wired", isFa: true, level: 75 },
    "Monte Carlo Simulation": { name: "Monte Carlo Simulation", icon: "fa-shuffle", isFa: true, level: 75 },
    Concurrency: { name: "Concurrency", icon: "fa-code-branch", isFa: true, level: 90 },
  };
  Object.assign(map, extras);

  // Auto-register missing from data
  for (const type of Object.values(detailsData)) {
    for (const item of Object.values(type)) {
      for (const skillName of item.stack || []) {
        if (!map[skillName]) {
          map[skillName] = guessMeta(skillName);
        }
      }
    }
  }

  return map;
}

export const skillMetaMap = buildSkillMetaMap();

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim();
}
