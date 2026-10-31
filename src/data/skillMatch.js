import { ROLE_DATA } from './roleData';

// Extra words people might type that mean the same skill.
const ALIASES = {
  'product discovery': ['user research', 'customer interviews', 'customer discovery', 'interviews', 'personas', 'journey map', 'mom test'],
  'prds': ['prd', 'user stories', 'requirements', 'product spec', 'acceptance criteria', 'documentation'],
  'prioritization': ['rice', 'kano', 'roadmap', 'roadmapping', 'prioritisation', 'moscow'],
  'metrics': ['kpi', 'kpis', 'funnel', 'north star', 'amplitude', 'mixpanel', 'google analytics', 'cohort', 'analytics'],
  'agile': ['scrum', 'sprint', 'kanban', 'jira', 'standup'],
  'technical fluency': ['api', 'apis', 'system design', 'architecture', 'rest'],
  'design thinking': ['user research', 'usability', 'heuristics', 'empathy'],
  'wireframing': ['wireframe', 'wireframes', 'information architecture', 'user flows', 'sketching'],
  'figma': ['auto layout', 'components', 'design system', 'prototyping', 'sketch', 'adobe xd'],
  'usability testing': ['user testing', 'maze', 'a/b testing', 'micro-interactions'],
  'handoff': ['wcag', 'accessibility', 'a11y', 'zeplin'],
  'spreadsheet': ['excel', 'google sheets', 'sheets', 'pivot', 'pivot tables', 'xlookup', 'vlookup'],
  'sql': ['mysql', 'postgres', 'postgresql', 'sqlite', 'joins', 'queries', 'database'],
  'dashboards': ['power bi', 'powerbi', 'tableau', 'looker', 'dax'],
  'statistical': ['statistics', 'stats', 'hypothesis testing', 'p-value', 'ab testing'],
  'python': ['pandas', 'numpy', 'jupyter', 'data cleaning'],
  'programming logic': ['programming', 'coding', 'algorithms', 'loops', 'functions', 'c++', 'java', 'python', 'logic'],
  'html5': ['html', 'html5', 'semantic html'],
  'css3': ['css', 'css3', 'flexbox', 'grid', 'tailwind', 'bootstrap', 'sass', 'responsive'],
  'javascript': ['js', 'es6', 'dom', 'typescript', 'ajax', 'fetch'],
  'component frameworks': ['react', 'reactjs', 'vue', 'angular', 'svelte', 'next.js', 'nextjs'],
  'backend': ['node', 'nodejs', 'node.js', 'express', 'rest api', 'django', 'flask', 'spring'],
};

const STOP = new Set([
  'and', 'the', 'for', 'with', 'basics', 'foundations', 'modern', 'core', 'skills',
  'design', 'data', 'analysis', 'systems', 'web', 'user', 'product', 'business',
  'layouts', 'interactivity', 'fundamentals', 'computer', 'semantic',
  'healthcare', 'health', 'clinical', 'india', 'act', 'models', 'quality', 'metrics', 'claims',
  'social', 'media', 'financial', 'finance', 'business', 'marketing', 'content', 'technical',
]);

export const SKILL_SUGGESTIONS = {
  technology: ['HTML', 'CSS', 'JavaScript', 'Git', 'Python', 'React', 'Node.js', 'SQL'],
  productManager: ['Jira', 'Figma', 'Excel', 'SQL', 'User Research', 'Agile', 'Notion', 'Google Analytics'],
  design: ['Figma', 'Wireframing', 'User Research', 'Photoshop', 'Prototyping', 'Adobe XD'],
  data: ['Excel', 'SQL', 'Python', 'Power BI', 'Tableau', 'Statistics'],
  healthcare: ['Excel', 'SQL', 'Medical Terminology', 'ICD-10', 'HIPAA', 'Power BI', 'Tableau', 'Python', 'FHIR', 'Epic'],
};

Object.entries(ROLE_DATA).forEach(([roleKey, role]) => {
  if (!role.skills || SKILL_SUGGESTIONS[roleKey]) return;
  SKILL_SUGGESTIONS[roleKey] = [...role.skills.critical, ...role.skills.important, ...role.skills.niceToHave]
    .map((skill) => skill.skill);
});

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function keywordsFor(skill) {
  const name = skill.skill.toLowerCase();
  const words = name
    .replace(/[()&/,\-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  const extra = Object.entries(ALIASES)
    .filter(([key]) => name.includes(key))
    .flatMap(([, list]) => list);
  const own = (skill.keywords || []).map((k) => k.toLowerCase());
  return [...new Set([...words, ...extra, ...own])];
}

function hit(entry, kw) {
  if (entry === kw) return true;
  const re = new RegExp(`(^|[^a-z0-9])${escapeRe(kw)}([^a-z0-9]|$)`);
  if (re.test(entry)) return true;
  return kw.length > 3 && entry.length > 3 && kw.includes(entry);
}

export function allSkillsFor(roleKey) {
  const s = (ROLE_DATA[roleKey] || ROLE_DATA.productManager).skills;
  return [...s.critical, ...s.important, ...s.niceToHave];
}

// Returns { [skillName]: level } only for skills the user already knows.
export function getSkillLevels(roleKey, knownSkills = [], confidence = 50) {
  const entries = (knownSkills || []).map((k) => k.trim().toLowerCase()).filter(Boolean);
  const levels = {};
  if (entries.length === 0) return levels;
  allSkillsFor(roleKey).forEach((skill) => {
    const kws = keywordsFor(skill);
    if (entries.some((e) => e === skill.skill.toLowerCase() || kws.some((kw) => hit(e, kw)))) {
      levels[skill.skill] = Math.min(skill.required, confidence);
    }
  });
  return levels;
}

export function analyzeGaps(roleKey, knownSkills, confidence) {
  const levels = getSkillLevels(roleKey, knownSkills, confidence);
  const all = allSkillsFor(roleKey);
  const known = all.filter((s) => levels[s.skill] !== undefined);
  const missing = all.filter((s) => (levels[s.skill] || 0) < s.required - 5);
  const weeks = missing.reduce((sum, s) => sum + (parseInt(s.time, 10) || 1), 0);
  return { levels, known, missing, weeks };
}
