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
  'task and schedule tracking': ['task tracking', 'task tracker', 'tracked tasks', 'schedule tracking', 'project schedule', 'milestone tracking', 'tracked milestones', 'deadline tracking', 'time management', 'time management skills', 'trello', 'asana', 'microsoft project', 'gantt chart', 'gantt'],
  'stakeholder communication': ['stakeholder management', 'status updates', 'client communication', 'cross-functional communication', 'communicated with stakeholders', 'teamwork', 'team work', 'team player', 'team collaboration', 'collaborative teamwork'],
  'risk and issue management': ['risk management', 'risk register', 'risk log', 'risk mitigation', 'issue management', 'issue log', 'issue tracker', 'raid log'],
  'meeting coordination': ['meeting scheduling', 'meeting facilitation', 'meeting minutes', 'meeting agenda', 'action items', 'facilitated meetings', 'event coordination', 'event planning', 'coordinated events', 'event logistics', 'event support', 'registration desk', 'event registration', 'event announcements', 'participant list', 'event updates'],
  'project documentation': ['project report', 'project brief', 'project charter', 'project records', 'status report'],
  'agile fundamentals': ['agile methodology', 'scrum', 'kanban', 'sprint planning', 'sprint retrospective', 'agile'],
  'microsoft excel': ['excel', 'google sheets', 'spreadsheet', 'pivot table', 'vlookup', 'xlookup'],
  'resource coordination': ['resource allocation', 'capacity planning', 'staffing coordination', 'vendor coordination', 'team allocation', 'resource planning'],
};

const ACTION_VERB = /\b(?:coordinat(?:e|es|ed|ing)|manag(?:e|es|ed|ing)|track(?:s|ed)|plan(?:ned|s)|schedul(?:e|es|ed|ing)|facilitat(?:e|es|ed|ing)|maintain(?:s|ed)|creat(?:e|es|ed|ing)|develop(?:s|ed|ing)|deliver(?:s|ed|ing)|prepar(?:e|es|ed|ing)|document(?:s|ed|ing)|organiz(?:e|es|ed|ing)|monitor(?:s|ed|ing)|updat(?:e|es|ed|ing)|lead|led|supported|build|built|implement(?:s|ed|ing)|assign(?:s|ed|ing)|communicat(?:e|es|ed|ing)|mitigat(?:e|es|ed|ing)|resolv(?:e|es|ed|ing)|analyz(?:e|es|ed|ing)|analys(?:e|es|ed|ing)|improv(?:e|es|ed|ing)|us(?:e|es|ed|ing)|appl(?:y|ies|ied|ying))\b/i;
const BASIC_CUE = /\b(?:basic|beginner|familiar with|learning|introductory|entry.level|limited experience|needs? improvement|developing|assisted with|supported)\b/i;
const ADVANCED_CUE = /\b(?:advanced|expert|proficient|independently|led|owned|specialist|senior)\b/i;
const RESULT_CUE = /\b(?:increased|reduced|improved|completed|delivered|on time|under budget|successfully|resulting in|outcome|percent|percentage|stakeholders|milestones|status report|tracker|register|dashboard|schedule|minutes|action items|documentation|plan|charter|retrospective\w*)\b|\b\d+(?:\.\d+)?%?\b/i;
const PROFICIENCY_SCORE = { basic: 0.25, intermediate: 0.65, advanced: 0.9, missing: 0, notAssessed: 0 };

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
    advanced: PROFICIENCY_SCORE.advanced,
    intermediate: PROFICIENCY_SCORE.intermediate,
    basic: PROFICIENCY_SCORE.basic,
    missing: PROFICIENCY_SCORE.missing,
    notAssessed: PROFICIENCY_SCORE.notAssessed,
  };

  roleSkills.forEach((skill) => {
    const evidence = evidenceForSkill(skill, sources);
    const excerpts = [...new Set(evidence.map(({ text }) => text))];
    const resumeEvidence = [...new Set(evidence
      .filter(({ type }) => type === 'resume')
      .map(({ text }) => text))];
    const practicalEvidence = evidence.filter(({ type, text }) =>
      ['experience', 'projects', 'resume'].includes(type) && ACTION_VERB.test(text),
    );
    const hasBasicCue = evidence.some(({ type, text }) =>
      !['certifications', 'education'].includes(type) && BASIC_CUE.test(text),
    );
    const independentPracticalEvidence = practicalEvidence.filter(({ text }) => !BASIC_CUE.test(text));
    const hasAdvancedEvidence = independentPracticalEvidence.some(({ text }) =>
      ADVANCED_CUE.test(text) && RESULT_CUE.test(text),
    );
    let category;
    let proficiency;
    let explanation;

    if (hasAdvancedEvidence) {
      category = 'strengths';
      proficiency = 'advanced';
      explanation = 'The evidence describes independent or advanced practical work and a concrete result or deliverable.';
    } else if (independentPracticalEvidence.length) {
      category = 'strengths';
      proficiency = 'intermediate';
      explanation = 'The evidence describes applying this skill in work or a project; it supports practical proficiency but does not establish advanced mastery.';
    } else if (hasBasicCue || practicalEvidence.length) {
      category = 'improvement';
      proficiency = 'basic';
      explanation = 'The information describes basic, developing, supported, or limited proficiency; it does not establish independent practical proficiency.';
    } else if (evidence.length) {
      category = 'partial';
      proficiency = 'basic';
      const sourceTypes = new Set(evidence.map(({ type }) => type));
      explanation = sourceTypes.has('certifications') && !practicalEvidence.length
        ? 'A course or certification mentions this skill, which supports basic familiarity but does not demonstrate practical proficiency.'
        : 'This skill or related tool is listed or mentioned, which supports basic familiarity but does not establish practical proficiency.';
    } else if (substantiveProfile) {
      category = 'missing';
      proficiency = 'missing';
      explanation = 'No supporting example was found in the substantive information provided. This means it is missing from the supplied evidence, not proof that you cannot do it.';
    } else {
      category = 'notAssessed';
      proficiency = 'notAssessed';
      explanation = 'There is not enough resume or profile detail to assess this skill. Add a relevant example or explicitly note your experience level.';
    }

    categories[category].push({
      ...skill,
      category,
      proficiency,
      proficiencyScore: PROFICIENCY_SCORE[proficiency],
      evidence: excerpts,
      resumeEvidence,
      explanation,
    });
  });

  const totalWeight = roleSkills.reduce((sum, skill) => sum + (Number(skill.required) || 1), 0);
  const scoredWeight = roleSkills.reduce((sum, skill) => {
    const category = Object.keys(categories).find((key) =>
      categories[key].some((item) => item.skill === skill.skill),
    );
    const assessedSkill = categories[category].find((item) => item.skill === skill.skill);
    return sum + (Number(skill.required) || 1) * evidenceScores[assessedSkill.proficiency];
  }, 0);

  const allAssessedSkills = Object.values(categories).flat();
  return {
    categories,
    coverage: totalWeight ? Math.round((scoredWeight / totalWeight) * 100) : 0,
    substantiveProfile,
    diagnostics: {
      extractedSkills: allAssessedSkills.filter((skill) => skill.resumeEvidence.length > 0),
      matchedSkills: allAssessedSkills.filter((skill) => skill.evidence.length > 0),
      partialSkills: [...categories.partial, ...categories.improvement],
      missingSkills: categories.missing,
      notAssessedSkills: categories.notAssessed,
    },
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

export function getProfileSkillLevels(roleKey, prefs = {}) {
  return {
    ...getSkillLevels(roleKey, prefs.knownSkills, prefs.skillConfidence),
    ...(prefs.resumeSkillLevels?.[roleKey] || {}),
  };
}

export function analyzeGaps(roleKey, knownSkills, confidence) {
  const levels = getSkillLevels(roleKey, knownSkills, confidence);
  const all = allSkillsFor(roleKey);
  const known = all.filter((s) => levels[s.skill] !== undefined);
  const missing = all.filter((s) => (levels[s.skill] || 0) < s.required - 5);
  const weeks = missing.reduce((sum, s) => sum + (parseInt(s.time, 10) || 1), 0);
  return { levels, known, missing, weeks };
}
