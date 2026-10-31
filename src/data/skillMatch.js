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

const RESUME_SKILL_ALIASES = {
  'project planning': ['project plan', 'project timeline', 'project scope', 'work breakdown structure', 'wbs'],
  'task and schedule tracking': ['task tracking', 'task tracker', 'tracked tasks', 'schedule tracking', 'project schedule', 'milestone tracking', 'tracked milestones', 'deadline tracking', 'trello', 'asana', 'microsoft project', 'gantt chart', 'gantt'],
  'stakeholder communication': ['stakeholder management', 'status updates', 'client communication', 'cross-functional communication', 'communicated with stakeholders'],
  'risk and issue management': ['risk management', 'risk register', 'risk log', 'risk mitigation', 'issue management', 'issue log', 'issue tracker', 'raid log'],
  'meeting coordination': ['meeting scheduling', 'meeting facilitation', 'meeting minutes', 'meeting agenda', 'action items', 'facilitated meetings'],
  'project documentation': ['project report', 'project brief', 'project charter', 'project records', 'status report'],
  'agile fundamentals': ['agile methodology', 'scrum', 'kanban', 'sprint planning', 'sprint retrospective', 'agile'],
  'microsoft excel': ['excel', 'google sheets', 'spreadsheet', 'pivot table', 'vlookup', 'xlookup'],
  'resource coordination': ['resource allocation', 'capacity planning', 'staffing coordination', 'vendor coordination', 'team allocation', 'resource planning'],
};

const ACTION_VERB = /\b(?:coordinat\w*|manag\w*|track\w*|plan\w*|schedul\w*|facilitat\w*|maintain\w*|creat\w*|develop\w*|deliver\w*|prepar\w*|document\w*|organ\w*|monitor\w*|updat\w*|lead|led|support\w*|build\w*|implement\w*|assign\w*|communicat\w*|mitigat\w*|resolv\w*|analyz\w*|analys\w*|improv\w*|us(?:e|ed|ing)|appl(?:y|ied|ying))\b/i;
const BEGINNER_CUE = /\b(?:basic|beginner|familiar with|learning|introductory|entry.level|limited experience|needs? improvement|developing)\b/i;
const RESULT_CUE = /\b(?:increased|reduced|improved|completed|delivered|on time|under budget|successfully|resulting in|outcome|percent|percentage|team(?:s)?|stakeholders|milestones|status report|tracker|register|dashboard|schedule|minutes|action items|documentation|plan|charter|retrospective\w*)\b|\b\d+(?:\.\d+)?%?\b/i;

function normalizeEvidenceText(value) {
  return value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function phraseIsPresent(text, phrase) {
  const normalizedText = ` ${normalizeEvidenceText(text)} `;
  const normalizedPhrase = normalizeEvidenceText(phrase);
  return normalizedPhrase.length > 1 && normalizedText.includes(` ${normalizedPhrase} `);
}

function evidenceForSkill(skill, sources) {
  const name = skill.skill.toLowerCase();
  const aliases = RESUME_SKILL_ALIASES[name] || [];
  const phrases = [skill.skill, ...aliases];
  return sources.flatMap((source) => {
    const matches = String(source.value || '')
      .split(/[\n.!?;]+/)
      .map((text) => text.trim())
      .filter((text) => text && phrases.some((phrase) => phraseIsPresent(text, phrase)));
    return matches.map((text) => ({ ...source, text }));
  });
}

function hasSubstantiveProfile(sources) {
  return sources.some(({ type, value }) => {
    const text = String(value || '').trim();
    return (type === 'resume' && text.length >= 120)
      || (type === 'experience' && text.length >= 40)
      || (type === 'projects' && text.length >= 40)
      || (type === 'education' && text.length >= 80);
  });
}

export function assessResumeSkills(roleSkills, sources = []) {
  const substantiveProfile = hasSubstantiveProfile(sources);
  const categories = {
    strengths: [],
    partial: [],
    missing: [],
    improvement: [],
    notAssessed: [],
  };
  const evidenceScores = {
    strength: 1,
    partial: 0.5,
    improvement: 0.25,
    missing: 0,
    notAssessed: 0,
  };

  roleSkills.forEach((skill) => {
    const evidence = evidenceForSkill(skill, sources);
    const excerpts = [...new Set(evidence.map(({ text }) => text))];
    const practicalEvidence = evidence.filter(({ type, text }) =>
      ['experience', 'projects', 'resume'].includes(type) && ACTION_VERB.test(text),
    );
    const hasBeginnerCue = evidence.some(({ type, text }) =>
      !['certifications', 'education'].includes(type) && BEGINNER_CUE.test(text),
    );
    const hasStrongEvidence = practicalEvidence.length > 0
      && (practicalEvidence.length > 1 || practicalEvidence.some(({ text }) => RESULT_CUE.test(text)));
    let category;
    let explanation;

    if (hasBeginnerCue) {
      category = 'improvement';
      explanation = 'The information describes basic, developing, or limited proficiency; it does not establish independent practical proficiency.';
    } else if (hasStrongEvidence) {
      category = 'strengths';
      explanation = 'A practical action is described in work, project, or resume evidence, with a concrete deliverable, result, or repeated example.';
    } else if (evidence.length) {
      category = 'partial';
      const sourceTypes = new Set(evidence.map(({ type }) => type));
      explanation = sourceTypes.has('certifications') && !practicalEvidence.length
        ? 'A course or certification mentions this skill, which supports familiarity but does not demonstrate practical proficiency.'
        : 'This skill is listed or mentioned, but the supplied details do not show enough applied work or outcomes to establish practical proficiency.';
    } else if (substantiveProfile) {
      category = 'missing';
      explanation = 'No supporting example was found in the substantive information provided. This means it is missing from the supplied evidence, not proof that you cannot do it.';
    } else {
      category = 'notAssessed';
      explanation = 'There is not enough resume or profile detail to assess this skill. Add a relevant example or explicitly note your experience level.';
    }

    categories[category === 'strengths' ? 'strengths'
      : category === 'partial' ? 'partial'
        : category === 'missing' ? 'missing'
          : category === 'improvement' ? 'improvement' : 'notAssessed'].push({
      ...skill,
      category,
      evidence: excerpts,
      explanation,
    });
  });

  const totalWeight = roleSkills.reduce((sum, skill) => sum + (Number(skill.required) || 1), 0);
  const scoredWeight = roleSkills.reduce((sum, skill) => {
    const category = Object.keys(categories).find((key) =>
      categories[key].some((item) => item.skill === skill.skill),
    );
    const scoreKey = category === 'strengths' ? 'strength'
      : category === 'partial' ? 'partial'
        : category === 'improvement' ? 'improvement'
          : category === 'missing' ? 'missing' : 'notAssessed';
    return sum + (Number(skill.required) || 1) * evidenceScores[scoreKey];
  }, 0);

  return {
    categories,
    coverage: totalWeight ? Math.round((scoredWeight / totalWeight) * 100) : 0,
    substantiveProfile,
  };
}

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
