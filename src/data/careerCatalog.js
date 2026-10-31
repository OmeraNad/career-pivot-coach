const RESOURCE_LINKS = {
  data: [
    { name: 'Microsoft Learn: Power BI', url: 'https://learn.microsoft.com/training/powerplatform/power-bi/' },
    { name: 'SQLBolt interactive SQL lessons', url: 'https://sqlbolt.com/' },
    { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' },
  ],
  business: [
    { name: 'Atlassian Agile Coach', url: 'https://www.atlassian.com/agile' },
    { name: 'IIBA Business Analysis resources', url: 'https://www.iiba.org/business-analysis-blogs/' },
    { name: 'Google Workspace Learning Center', url: 'https://support.google.com/a/users/' },
  ],
  finance: [
    { name: 'Corporate Finance Institute resources', url: 'https://corporatefinanceinstitute.com/resources/' },
    { name: 'Microsoft Excel help and learning', url: 'https://support.microsoft.com/excel' },
    { name: 'AccountingCoach', url: 'https://www.accountingcoach.com/' },
  ],
  design: [
    { name: 'Figma Learn', url: 'https://help.figma.com/hc/en-us/categories/360002051613-Learn-design' },
    { name: 'Nielsen Norman Group articles', url: 'https://www.nngroup.com/articles/' },
    { name: 'W3C accessibility standards', url: 'https://www.w3.org/WAI/standards-guidelines/' },
  ],
  marketing: [
    { name: 'Google Skillshop', url: 'https://skillshop.withgoogle.com/' },
    { name: 'Google Search Central SEO guides', url: 'https://developers.google.com/search/docs' },
    { name: 'HubSpot Academy', url: 'https://academy.hubspot.com/' },
  ],
  writing: [
    { name: 'Google Technical Writing courses', url: 'https://developers.google.com/tech-writing' },
    { name: 'Write the Docs guide', url: 'https://www.writethedocs.org/guide/' },
    { name: 'Markdown Guide', url: 'https://www.markdownguide.org/' },
  ],
};

const CATEGORY_DEFINITIONS = [
  {
    id: 'data',
    title: 'Data and Analytics',
    description: 'Turn spreadsheets and datasets into clear, useful decisions.',
    icon: 'chart',
    roles: [
      { title: 'Data Analyst', skills: ['Excel and Google Sheets', 'SQL', 'Python and pandas', 'Statistics and Probability', 'Data Cleaning', 'Data Visualization', 'Power BI / Tableau'], projects: ['Sales Performance Dashboard', 'Customer Segmentation Analysis', 'Financial Data Visualization'] },
      { title: 'Business Intelligence Analyst', skills: ['SQL and Data Modeling', 'Power BI / Tableau', 'Dashboard Design', 'DAX or Calculated Fields', 'Data Warehousing Fundamentals', 'Requirements Gathering', 'Data Storytelling'], projects: ['Executive KPI Dashboard', 'Retail Inventory BI Model', 'Customer Retention Report'] },
      { title: 'Junior Data Associate', skills: ['Spreadsheet Fundamentals', 'Data Entry Quality Control', 'Data Cleaning', 'SQL Fundamentals', 'Data Validation', 'Documentation', 'Attention to Detail'], projects: ['Clean and Validate a Public Dataset', 'Data Quality Rules Checklist', 'Structured Data Entry Workflow'] },
      { title: 'Reporting Analyst', skills: ['Advanced Excel', 'SQL Reporting', 'KPI Definition', 'Recurring Report Automation', 'Data Visualization', 'Quality Assurance', 'Stakeholder Communication'], projects: ['Monthly Operations Reporting Pack', 'Automated KPI Report', 'Report Accuracy Audit'] },
    ],
  },
  {
    id: 'business',
    title: 'Business and Management',
    description: 'Coordinate people, processes, and projects to solve business problems.',
    icon: 'briefcase',
    roles: [
      { title: 'Business Analyst', skills: ['Business Communication', 'Excel', 'SQL Fundamentals', 'Business Process Modeling', 'Requirements Gathering', 'Data Interpretation', 'Problem Solving'], projects: ['Order Fulfillment Process Improvement', 'Business Requirements Specification', 'Operations KPI Analysis'] },
      { title: 'Project Coordinator', skills: ['Project Planning', 'Task and Schedule Tracking', 'Stakeholder Communication', 'Risk and Issue Management', 'Meeting Coordination', 'Project Documentation', 'Agile Fundamentals', 'Microsoft Excel', 'Resource Coordination'], projects: ['Project Plan and Status Dashboard', 'Risk Register and Mitigation Plan', 'Sprint Coordination Playbook'] },
      { title: 'Operations Associate', skills: ['Process Mapping', 'Spreadsheet Reporting', 'Workflow Documentation', 'Quality Control', 'Root Cause Analysis', 'Inventory or Service Operations', 'Cross-functional Communication'], projects: ['Operations Process Improvement', 'Service-Level Tracking Dashboard', 'Standard Operating Procedure Set'] },
      { title: 'HR Associate', skills: ['HR Information Systems', 'Recruiting Coordination', 'Employee Record Confidentiality', 'Employment Lifecycle Basics', 'Spreadsheet Reporting', 'Policy Documentation', 'Employee Communication'], projects: ['Candidate Pipeline Tracker', 'Employee Onboarding Checklist', 'Anonymized HR Metrics Report'] },
      { title: 'Management Trainee', skills: ['Business Fundamentals', 'Business Communication', 'Excel and Reporting', 'Customer Service', 'Team Coordination', 'Problem Solving', 'Presentation Skills'], projects: ['Department Performance Review', 'Customer Service Improvement Plan', 'Cross-team Project Brief'] },
    ],
  },
  {
    id: 'finance',
    title: 'Finance and Accounting',
    description: 'Build confidence with financial records, analysis, and planning.',
    icon: 'coins',
    roles: [
      { title: 'Financial Analyst', skills: ['Financial Accounting', 'Advanced Excel', 'Financial Modeling', 'Financial Statement Analysis', 'Budgeting and Forecasting', 'Financial Data Interpretation', 'Presentation of Findings'], projects: ['Three-Statement Financial Model', 'Company Financial Statement Analysis', 'Budget vs. Actual Dashboard'] },
      { title: 'Accounts Assistant', skills: ['Bookkeeping Fundamentals', 'Accounts Payable and Receivable', 'Invoice Processing', 'Reconciliation', 'Spreadsheet Skills', 'Accounting Software Basics', 'Accuracy and Recordkeeping'], projects: ['Invoice and Payment Reconciliation', 'Accounts Payable Aging Report', 'Month-end Close Checklist'] },
      { title: 'Junior Accountant', skills: ['Double-Entry Bookkeeping', 'Journal Entries', 'General Ledger', 'Bank Reconciliation', 'Financial Statements', 'Accounting Software', 'Tax and Compliance Basics'], projects: ['Bookkeeping Cycle for a Sample Business', 'Trial Balance and Adjusting Entries', 'Monthly Financial Statements'] },
      { title: 'Financial Operations Associate', skills: ['Transaction Processing', 'Reconciliation', 'Advanced Spreadsheets', 'Financial Controls', 'Payment Operations', 'Exception Investigation', 'Process Documentation'], projects: ['Payment Reconciliation Workflow', 'Financial Operations Controls Matrix', 'Exception Trends Dashboard'] },
      { title: 'Tax Associate', skills: ['Tax Fundamentals', 'Tax Return Preparation', 'Tax Research', 'Accounting Records', 'Spreadsheet Analysis', 'Compliance Documentation', 'Client Communication'], projects: ['Sample Individual Tax Return Walkthrough', 'Tax Document Readiness Checklist', 'Tax Rule Research Brief'] },
    ],
  },
  {
    id: 'design',
    title: 'Design and User Experience',
    description: 'Research user needs and create accessible, intuitive digital experiences.',
    icon: 'palette',
    roles: [
      { title: 'UI Designer', skills: ['Visual Design Principles', 'Figma', 'Typography and Color', 'Responsive Layouts', 'Component Libraries', 'Accessibility Fundamentals', 'Developer Handoff'], projects: ['Responsive SaaS Interface', 'Accessible Design System', 'Mobile Banking UI Kit'] },
      { title: 'UX Designer', skills: ['User Research', 'Information Architecture', 'User Flows', 'Wireframing', 'Prototyping in Figma', 'Usability Testing', 'Accessibility'], projects: ['End-to-end UX Case Study', 'E-commerce Checkout Redesign', 'Usability Test and Iteration Report'] },
      { title: 'Product Design Intern', skills: ['Design Thinking', 'User Research Basics', 'Figma', 'Wireframing and Prototyping', 'Visual Design', 'Design Critique', 'Product Collaboration'], projects: ['Mobile Banking App Redesign', 'E-commerce Website Prototype', 'Feature Discovery Case Study'] },
      { title: 'Visual Designer', skills: ['Composition and Hierarchy', 'Typography', 'Color Theory', 'Figma or Adobe Creative Tools', 'Brand Systems', 'Image Editing', 'Design Presentation'], projects: ['Brand Identity and Campaign Kit', 'Social Content Visual System', 'Marketing Landing Page Design'] },
      { title: 'UX Research Assistant', skills: ['Research Ethics', 'Interview Moderation', 'Usability Testing', 'Survey Fundamentals', 'Research Note-taking', 'Qualitative Synthesis', 'Insight Presentation'], projects: ['Moderated Usability Study', 'Interview Synthesis and Affinity Map', 'Research Findings Presentation'] },
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing and Growth',
    description: 'Reach the right audiences and measure what helps a business grow.',
    icon: 'megaphone',
    roles: [
      { title: 'Social Media Manager', skills: ['Social Media Strategy', 'Content Planning', 'Copywriting', 'Canva / Design Fundamentals', 'SEO Basics', 'Social Media Analytics', 'Campaign Management'], projects: ['Social Media Growth Campaign', '30-day Content Calendar', 'Community Engagement Analysis'] },
      { title: 'SEO Associate', skills: ['Keyword Research', 'On-page SEO', 'Technical SEO Fundamentals', 'Search Console and Analytics', 'Content Optimization', 'SEO Reporting', 'Search Intent Analysis'], projects: ['Small-business SEO Audit', 'Keyword Map and Content Briefs', 'Organic Search Performance Report'] },
      { title: 'Digital Marketing Executive', skills: ['Digital Campaign Planning', 'Google Ads Fundamentals', 'Analytics and Conversion Tracking', 'Email Marketing', 'Landing Page Optimization', 'Budget Pacing', 'Campaign Reporting'], projects: ['Cross-channel Campaign Plan', 'Paid Search Campaign Simulation', 'Marketing Performance Dashboard'] },
      { title: 'Growth Marketing Associate', skills: ['Growth Experiment Design', 'Funnel Analytics', 'A/B Testing Fundamentals', 'Customer Acquisition Metrics', 'Lifecycle Marketing', 'Spreadsheet Analysis', 'Experiment Reporting'], projects: ['Activation Funnel Analysis', 'Growth Experiment Backlog', 'Customer Onboarding Test Plan'] },
      { title: 'Content Marketing Associate', skills: ['Content Strategy', 'Editorial Planning', 'SEO Writing', 'Copywriting', 'Content Management Systems', 'Content Analytics', 'Brand Voice'], projects: ['SEO Content Cluster', 'Editorial Calendar and Briefs', 'Content Performance Review'] },
    ],
  },
  {
    id: 'writing',
    title: 'Writing and Technical Communication',
    description: 'Make complex information clear, useful, and easy to navigate.',
    icon: 'pen',
    roles: [
      { title: 'Copywriter', skills: ['Audience and Brand Voice', 'Persuasive Copywriting', 'Headlines and Calls to Action', 'Research and Fact Checking', 'Editing and Proofreading', 'Conversion Fundamentals', 'Content Collaboration'], projects: ['Landing Page Copy Makeover', 'Multi-channel Product Launch Copy', 'Email Campaign with A/B Variants'] },
      { title: 'Content Writer', skills: ['Research and Fact Checking', 'Clear Long-form Writing', 'Editorial Structure', 'SEO Fundamentals', 'Interviewing Subject-matter Experts', 'Editing and Proofreading', 'Content Management Systems'], projects: ['Expert-backed Topic Guide', 'SEO Article Cluster', 'Editorial Brief and Published Article'] },
      { title: 'Technical Writer', skills: ['Technical Documentation', 'Written Communication', 'Markdown', 'API Documentation', 'Information Architecture', 'Git and GitHub Basics', 'Documentation Tools'], projects: ['API Documentation Project', 'Software User Guide', 'Open-source Documentation Contribution'] },
      { title: 'Documentation Associate', skills: ['Documentation Standards', 'Markdown and Formatting', 'Content Quality Assurance', 'Information Architecture', 'Knowledge Base Tools', 'Version Control Basics', 'Process Documentation'], projects: ['Knowledge Base Information Architecture', 'Process Documentation Set', 'Documentation Quality Audit'] },
      { title: 'Communication Specialist', skills: ['Audience-focused Communication', 'Editorial Planning', 'Internal Communications', 'Copyediting', 'Presentation Writing', 'Channel Planning', 'Communication Measurement'], projects: ['Internal Change Communication Plan', 'Executive Briefing and FAQ', 'Multi-channel Communications Calendar'] },
    ],
  },
];

const CATEGORY_TOOLS = {
  data: ['Excel or Google Sheets', 'SQL practice environment', 'Power BI or Tableau'],
  business: ['Google Sheets or Excel', 'Miro or diagrams.net', 'Notion or Jira'],
  finance: ['Excel or Google Sheets', 'Accounting practice workbook', 'Presentation software'],
  design: ['Figma', 'FigJam or Miro', 'Accessibility checker'],
  marketing: ['Google Analytics demo account', 'Google Search Console', 'Canva or a spreadsheet'],
  writing: ['Markdown editor', 'GitHub', 'Google Docs or a documentation platform'],
};

const roleSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function createRoleConfig(role, category) {
  const skills = role.skills.map((name, index) => ({
    skill: name,
    yourLevel: 0,
    required: index < 3 ? 85 : index < 5 ? 75 : 65,
    time: `${index < 2 ? 2 : 1} week${index === 0 || index === 1 ? 's' : ''}`,
    priority: index < 3 ? 'Critical' : index < 5 ? 'Important' : 'Nice to Have',
    stepNumber: index + 1,
    shortDesc: `Build practical ${name.toLowerCase()} skills for day-to-day ${role.title} work.`,
    tip: `Practice ${name.toLowerCase()} using a small example related to ${role.title.toLowerCase()} responsibilities.`,
    suggestedResources: [RESOURCE_LINKS[category.id][index % RESOURCE_LINKS[category.id].length]],
    suggestedSearch: `${name} beginner learning guide for ${role.title}`,
  }));
  const weekTitles = [
    'Fundamentals and prerequisites',
    'Core role skills',
    'Tools and applied practice',
    'Intermediate concepts',
    'Portfolio development',
    'Interview and job preparation',
  ];
  const weeklyPlan = weekTitles.map((title, index) => {
    const focus = skills.filter((skill) => (skill.stepNumber - 1) % weekTitles.length === index);
    const weekSkills = focus.length ? focus : [skills[index % skills.length]];
    return {
      week: index + 1,
      title: `Step ${index + 1}: ${title} for ${role.title}`,
      objective: `Develop role-specific skills for ${role.title}.`,
      estimatedTime: '3 sessions · about 3 hours',
      days: weekSkills.map((skill, dayIndex) => ({
        day: `Day ${dayIndex + 1}`,
        task: `Learn and practice ${skill.skill} with a ${role.title.toLowerCase()} example`,
        resource: skill.suggestedResources[0],
        done: false,
      })),
    };
  });
  const projectTitles = role.projects;
  const portfolioProjects = projectTitles.map((title, index) => {
    const projectSkills = skills.slice(index * 2, index * 2 + 3);
    return {
      id: `${roleSlug(role.title)}-project-${index + 1}`,
      title,
      difficulty: index === 0 ? 'Beginner' : index === 1 ? 'Intermediate' : 'Intermediate',
      timeToBuild: index === 0 ? '1 week' : '1-2 weeks',
      requiredSkills: projectSkills.map((skill) => skill.skill),
      description: `Create a practical ${role.title.toLowerCase()} portfolio piece using a realistic brief. Document your process, decisions, and outcome without presenting practice work as paid experience.`,
      whyRecruitersLoveIt: `Demonstrates role-relevant ${projectSkills.map((skill) => skill.skill).join(', ')} through a concrete, reviewable artifact.`,
      techStack: CATEGORY_TOOLS[category.id],
      keyFeatures: [
        `Define the goal and audience for a ${role.title.toLowerCase()} brief`,
        `Apply ${projectSkills.map((skill) => skill.skill).join(' and ')}`,
        'Present the result with a concise process and reflection',
      ],
      expectedOutcome: 'A shareable case study or work sample with clear context and supporting evidence.',
      githubTemplate: `https://github.com/topics/${roleSlug(role.title)}`,
      presentationGuidance: 'Explain the brief, your approach, the decisions you made, and what you would improve next. Label hypothetical or sample data clearly.',
    };
  });
  const mockInterview = [
    {
      id: 1,
      question: `What interests you about working as a ${role.title}, and how have you started building relevant skills?`,
      type: 'Behavioral',
      keywords: [role.title.toLowerCase(), skills[0].skill.toLowerCase(), 'learn'],
      rubric: ['Connects motivation to the role', 'Provides a truthful example or learning activity', 'Explains a next step'],
      idealAnswer: `A strong answer connects a genuine interest to a specific ${role.title.toLowerCase()} skill, gives a truthful example of practicing it, and explains what you learned.`,
    },
    {
      id: 2,
      question: `How would you approach a task that requires ${skills[0].skill} when the requirements are not fully clear?`,
      type: 'Situational',
      keywords: [skills[0].skill.toLowerCase(), 'clarify', 'approach'],
      rubric: ['Clarifies the goal', 'Describes a practical method', 'Checks the result'],
      idealAnswer: `First clarify the intended outcome and constraints. Then use ${skills[0].skill} to create a small, verifiable first step, ask for feedback, and check that the result meets the agreed requirements.`,
    },
    {
      id: 3,
      question: `Describe how you would use ${skills[Math.min(2, skills.length - 1)].skill} in a ${role.title} project.`,
      type: 'Technical',
      keywords: [skills[Math.min(2, skills.length - 1)].skill.toLowerCase(), 'example', 'result'],
      rubric: ['Explains the skill accurately', 'Uses a relevant example', 'Describes how success is checked'],
      idealAnswer: `A good response explains the purpose of ${skills[Math.min(2, skills.length - 1)].skill}, walks through a relevant example, and describes how you would verify the outcome.`,
    },
  ];
  return {
    title: role.title,
    categoryId: category.id,
    categoryTitle: category.title,
    skills: {
      critical: skills.filter((skill) => skill.priority === 'Critical'),
      important: skills.filter((skill) => skill.priority === 'Important'),
      niceToHave: skills.filter((skill) => skill.priority === 'Nice to Have'),
    },
    weeklyPlan,
    portfolioProjects,
    mockInterview,
    jobRequirementsLabel: 'Curated role baseline — not live job postings',
    jobRequirementsNote: `These commonly relevant skills are a curated learning baseline for ${role.title}. No live job listings or employer-specific requirements are being represented.`,
  };
}

export const CAREER_CATEGORIES = CATEGORY_DEFINITIONS.map((category) => ({
  ...category,
  roles: category.roles.map((role) => ({
    ...role,
    key: roleSlug(role.title),
    categoryId: category.id,
    categoryTitle: category.title,
  })),
}));

export const CAREER_ROLES = CAREER_CATEGORIES.flatMap((category) =>
  category.roles.map((role) => ({
    ...role,
    config: createRoleConfig(role, category),
  })),
);

export function getCareerCategoriesForInterests(interests = []) {
  const selectedInterests = new Set(interests);
  return CAREER_CATEGORIES.filter((category) => selectedInterests.has(category.id));
}

export const CAREER_ROLE_DATA = Object.fromEntries(
  CAREER_ROLES.map((role) => [role.key, role.config]),
);

export function getCareerRole(roleTitle) {
  const normalized = (roleTitle || '').trim().toLowerCase();
  return CAREER_ROLES.find((role) => role.title.toLowerCase() === normalized) || null;
}

export function createWeeklyPlan(roleKey, knownSkills = []) {
  const role = CAREER_ROLES.find((item) => item.key === roleKey);
  if (!role) return [];
  const known = (knownSkills || []).map((skill) => skill.trim().toLowerCase()).filter(Boolean);
  const skills = role.config.skills.critical
    .concat(role.config.skills.important, role.config.skills.niceToHave)
    .filter((skill) => !known.some((entry) => entry === skill.skill.toLowerCase()
      || skill.skill.toLowerCase().includes(entry)
      || entry.includes(skill.skill.toLowerCase())));
  const weekTitles = [
    'Fundamentals and prerequisites',
    'Core role skills',
    'Tools and applied practice',
    'Intermediate concepts',
    'Portfolio development',
    'Interview and job preparation',
  ];
  if (!skills.length) {
    return weekTitles.map((title, index) => {
      const project = role.projects[index % role.projects.length];
      return {
        week: index + 1,
        title: `Step ${index + 1}: Advanced practice for ${role.title}`,
        objective: `Extend your ${role.title} portfolio with ${project}.`,
        estimatedTime: '3 sessions · about 3 hours',
        days: [
          {
            day: `Day ${index * 5 + 1}`,
            task: `Define a more ambitious brief and success measures for ${project}`,
            done: false,
          },
          {
            day: `Day ${index * 5 + 2}`,
            task: `Build an advanced version of ${project} and document your decisions`,
            done: false,
          },
          {
            day: `Day ${index * 5 + 3}`,
            task: `Review ${project} against your success measures and identify a next iteration`,
            done: false,
          },
        ],
      };
    });
  }
  const skillsByWeek = weekTitles.map(() => []);
  skills.forEach((skill, index) => {
    const weekIndex = Math.min(Math.floor((index * weekTitles.length) / skills.length), weekTitles.length - 1);
    skillsByWeek[weekIndex].push(skill);
  });
  return weekTitles.map((title, index) => {
    const weekSkills = skillsByWeek[index].length ? skillsByWeek[index] : [skills[skills.length - 1]];
    const days = weekSkills.flatMap((skill, skillIndex) => [
      {
        day: `Day ${skillIndex * 3 + 1}`,
        task: `Study ${skill.skill} and note three key concepts`,
        resource: skill.suggestedResources[0],
        done: false,
      },
      {
        day: `Day ${skillIndex * 3 + 2}`,
        task: `Practice ${skill.skill} with a ${role.title.toLowerCase()} scenario`,
        resource: skill.suggestedResources[0],
        done: false,
      },
      {
        day: `Day ${skillIndex * 3 + 3}`,
        task: `Apply ${skill.skill} and review your work against the role requirements`,
        resource: skill.suggestedResources[0],
        done: false,
      },
    ]);
    return {
      week: index + 1,
      title: `Step ${index + 1}: ${title} for ${role.title}`,
      objective: `Build practical ${weekSkills.map((skill) => skill.skill).join(' and ')} proficiency for ${role.title}.`,
      estimatedTime: `${days.length} sessions · about ${days.length} hours`,
      days,
    };
  });
}
