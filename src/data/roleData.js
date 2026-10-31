import { CAREER_ROLE_DATA, getCareerRole } from './careerCatalog';

export const INTEREST_TO_BOOMING_ROLE = {
  technology: 'Junior Software & Web Engineer',
  healthcare: 'Junior Health Data & Informatics Specialist',
  data: 'Business Intelligence & Data Analyst',
  design: 'UI/UX & Product Designer',
  business: 'Product Manager',
  marketing: 'Growth & Performance Marketing Specialist',
  finance: 'Financial & Revenue Operations Analyst',
  writing: 'Technical Writer & Documentation Specialist',
};

export const ROLE_DATA = {
  // 1. PRODUCT MANAGER
  productManager: {
    title: 'Product Manager',
    boomingReason: 'AI product management and digital transformation have made PMs one of the highest-paying business-tech roles globally in 2026.',
    beginnerPhilosophy: 'Product management is not about writing code—it is about identifying customer pain points, defining product specifications (PRDs), aligning engineering and design teams, and measuring business impact.',
    portfolioProjects: [
      {
        id: 'pm-proj-1',
        title: 'End-to-End Product Requirement Document (PRD) & Prototype',
        difficulty: 'Beginner (Step 1-2)',
        timeToBuild: '1 week',
        requiredSkills: ['Product Discovery & User Research', 'Writing PRDs & User Stories'],
        description: 'A comprehensive PRD for a new feature (e.g., Airbnb Group Booking or Spotify Social Jam), complete with user problem statement, functional specifications, success metrics, and low-fi wireframes.',
        whyRecruitersLoveIt: 'A PRD is the primary artifact a PM produces. Recruiters judge entry PMs by how clearly they define problem statements, edge cases, and North Star metrics.',
        techStack: ['Notion / Google Docs', 'Figma Wireframes', 'Miro User Journey'],
        keyFeatures: [
          'Detailed Customer Problem Statement and target user personas',
          'Epics, prioritized User Stories with clear Acceptance Criteria',
          'North Star metric definition and secondary guardrail metrics',
          'Release phases: MVP (v1), Fast-follow (v2), and Future Vision'
        ],
        githubTemplate: 'https://github.com/topics/product-management-templates'
      },
      {
        id: 'pm-proj-2',
        title: 'Feature Experimentation & A/B Testing Strategy Deck',
        difficulty: 'Intermediate (Step 3-4)',
        timeToBuild: '2 weeks',
        requiredSkills: ['Product Metrics, KPIs & Funnel Analytics', 'Feature Prioritization (RICE/Kano) & Roadmapping'],
        description: 'A data-driven case study analyzing a drop in checkout conversion rate, formulating testable hypotheses, designing an A/B test variant, and building an executive presentation.',
        whyRecruitersLoveIt: 'Shows you think like an owner who connects user experience to business revenue rather than just guessing features.',
        techStack: ['Mixpanel / Amplitude Concepts', 'Google Slides / Pitch', 'Excel Funnel Calculator'],
        keyFeatures: [
          'Conversion funnel drop-off analysis identifying the friction point',
          'RICE prioritization scoring matrix (Reach, Impact, Confidence, Effort)',
          'Statistical A/B test parameter setup: sample size, MDE, and duration',
          'Executive presentation deck explaining trade-offs to engineering leadership'
        ],
        githubTemplate: 'https://github.com/topics/product-case-study'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Product Discovery & User Research',
          yourLevel: 0,
          required: 85,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 1,
          shortDesc: 'Conduct customer interviews, uncover unarticulated pain points, and map user journey workflows.',
          tip: 'Read "The Mom Test" by Rob Fitzpatrick—the gold standard on asking questions that do not bias customer answers.',
          mentorNote: 'Great PMs do not ask customers "what feature do you want?" They ask "tell me the last time you struggled with this problem."',
          suggestedResources: [
            { name: 'The Mom Test Framework Guide', type: 'Customer Discovery Methodology', topic: 'How to talk to customers and validate demand when everyone is lying to you' },
            { name: 'Nielsen Norman Group UX Research Foundations', type: 'Industry Benchmark', topic: 'Qualitative interview synthesis and persona creation' }
          ],
          suggestedSearch: 'Product discovery user interviews methodology for PMs',
          lessonSteps: [
            { title: 'The Problem vs Solution Trap', desc: 'Customers describe solutions; great PMs dig into the underlying root problem.', code: '// Anti-pattern: "Do you want a calendar sync button?"\n// Best practice: "How do you coordinate meetings with your team today?"' },
            { title: 'Customer Journey Mapping', desc: 'Chart every step: Trigger -> Discovery -> First Value -> Habit -> Retention.' }
          ],
          quiz: {
            question: 'According to modern product discovery, which question is best to ask a potential user?',
            options: ['Tell me about the last time you tried to solve this problem and what went wrong', 'Would you buy this app if I built it for $10?', 'Don\'t you think our new design looks amazing?', 'What features should we add to our software?'],
            correctIndex: 0
          }
        },
        {
          skill: 'Writing PRDs & User Stories',
          yourLevel: 0,
          required: 85,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 2,
          shortDesc: 'Author clear Product Requirement Documents with scope boundaries, user stories, and acceptance criteria.',
          tip: 'A user story always follows: As a [persona], I want [action], so that [outcome].',
          mentorNote: 'If engineering is constantly confused about what to build, the PRD was poorly written. Clarity is the PM superpower.',
          suggestedResources: [
            { name: 'Lenny Rachitsky Product Spec Templates', type: 'Battle-Tested Tech Specs', topic: 'Real PRD formats used at Airbnb, Stripe, and Figma' }
          ],
          suggestedSearch: 'How to write a product requirements document PRD template'
        },
        {
          skill: 'Feature Prioritization (RICE/Kano) & Roadmapping',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Evaluate feature trade-offs using RICE (Reach x Impact x Confidence / Effort) scoring.',
          tip: 'Saying "no" to 90% of ideas is how PMs protect engineering bandwidth for high-impact bets.',
          suggestedResources: [
            { name: 'Intercom RICE Prioritization Framework', type: 'Practical Scoring Model', topic: 'Quantifying roadmap decisions across stakeholder requests' }
          ],
          suggestedSearch: 'RICE framework feature prioritization product management'
        }
      ],
      important: [
        {
          skill: 'Product Metrics, KPIs & Funnel Analytics',
          yourLevel: 0,
          required: 75,
          time: '3 weeks',
          priority: 'Important',
          stepNumber: 4,
          shortDesc: 'North Star metrics, conversion funnels, retention cohorts, CAC, and LTV.',
          suggestedResources: [
            { name: 'Amplitude Product Analytics Playbook', type: 'Retention Guide', topic: 'Cohort behavioral analysis and identifying product stickiness' }
          ],
          suggestedSearch: 'North Star metric definition and cohort retention analysis'
        },
        {
          skill: 'Agile & Scrum Sprint Execution',
          yourLevel: 0,
          required: 75,
          time: '1 week',
          priority: 'Important',
          stepNumber: 5,
          shortDesc: 'Sprint planning, backlog grooming, daily standups, and retrospective cadence with engineering teams.',
          suggestedResources: [
            { name: 'Atlassian Agile Coach Guide', type: 'Interactive Guide', topic: 'Story pointing, velocity calculation, and backlog refinement' }
          ],
          suggestedSearch: 'Agile sprint planning and backlog grooming best practices'
        }
      ],
      niceToHave: [
        {
          skill: 'Technical Fluency for PMs (APIs & System Architecture)',
          yourLevel: 0,
          required: 65,
          time: '2 weeks',
          priority: 'Nice to Have',
          stepNumber: 6,
          shortDesc: 'Understand HTTP endpoints, databases, microservices, and tech debt to communicate seamlessly with engineers.',
          suggestedResources: [
            { name: 'Technology for Product Managers (Mind the Product)', type: 'Executive Overview', topic: 'API payloads, latency considerations, and technical trade-offs' }
          ],
          suggestedSearch: 'Technical concepts every product manager should know'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Step 1: Product Discovery & User Needs',
        days: [
          { day: 'Mon', task: 'Study Customer Discovery principles & the Mom Test framework (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Formulate non-leading user interview questions for a target problem (2 hrs)', done: false },
          { day: 'Wed', task: 'Conduct or analyze 3 recorded customer discovery interviews (2 hrs)', done: false },
          { day: 'Thu', task: 'Synthesize pain points into an Opportunity Solution Tree (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Build User Personas & Journey Map from interview insights (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Step 2: PRDs, User Stories & Roadmapping',
        days: [
          { day: 'Mon', task: 'Study real PRD templates from top tech companies (Airbnb, Stripe) (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Write Problem Statement, Target Audience, and Out-of-Scope boundaries (2 hrs)', done: false },
          { day: 'Wed', task: 'Draft 5 core User Stories with strict Gherkin Acceptance Criteria (2 hrs)', done: false },
          { day: 'Thu', task: 'Score 10 competing backlog feature requests using RICE framework (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Complete End-to-End PRD portfolio project and export to PDF (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Step 3: Metrics, A/B Testing & Mock Interviews',
        days: [
          { day: 'Mon', task: 'Define North Star metric and 3 guardrail metrics for your feature (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Design an A/B test hypothesis with sample size calculations (2 hrs)', done: false },
          { day: 'Wed', task: 'Analyze a simulated funnel conversion drop in product analytics (2 hrs)', done: false },
          { day: 'Thu', task: 'Prepare Product Design and Metric Trade-off case interview answers (2 hrs)', done: false },
          { day: 'Fri', task: 'Complete PM mock interview practice session (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'How do you decide what feature to build next when engineering, sales, and design all want different things?',
        type: 'Prioritization & Strategy',
        keywords: ['rice', 'prioritize', 'framework', 'customer', 'data', 'objective', 'north star', 'impact', 'trade-off'],
        rubric: ['Anchors decisions to company objectives and the North Star metric', 'Uses a structured prioritization framework (e.g. RICE)', 'Explains how to communicate transparently with stakeholders whose requests are deprioritized'],
        idealAnswer: 'I align the decision directly to our current company goal and North Star metric. I evaluate competing requests using the RICE framework (Reach, Impact, Confidence, Effort), partnering with engineering to estimate effort and data to validate reach. Crucially, I communicate the "why" transparently to sales and design, showing them where their ideas sit on the prioritized roadmap and what trade-offs were made.'
      },
      {
        id: 2,
        question: 'Imagine you are the Product Manager for Instagram Stories. Engagement dropped 10% week-over-week. How do you diagnose it?',
        type: 'Analytical Root Cause',
        keywords: ['metric', 'segment', 'cohort', 'geography', 'app version', 'technical', 'outage', 'external', 'funnel', 'root cause'],
        rubric: ['Validates tracking instrumentation first (not a logging bug)', 'Segments by platform, app version, geography, and user cohort', 'Investigates internal factors (recent releases) vs external factors (seasonality, competitor launches)'],
        idealAnswer: 'First, I verify the data pipeline with analytics engineering to rule out tracking or logging errors. Next, I segment the 10% drop across dimensions: by geography, OS (iOS vs Android), app release versions, and user cohorts (new vs power users). If concentrated on iOS, it suggests a technical crash; if widespread, I check recent A/B test rollouts, notifications delivery rates, or external seasonality.'
      },
      {
        id: 3,
        question: 'Pick your favorite consumer product and tell me how you would improve it.',
        type: 'Product Sense & Design',
        keywords: ['user', 'problem', 'pain point', 'solution', 'metric', 'trade-off', 'prioritize'],
        rubric: ['Identifies a specific user segment and unaddressed pain point', 'Proposes a thoughtful creative solution rather than superficial tweaks', 'Defines how to measure success and discusses risks/trade-offs'],
        idealAnswer: 'I love Spotify, but discovering live local concerts from favorite artists remains fragmented. I would introduce "Concert Radar"—integrating Spotify listening history with localized event alerts and calendar sync. Success would be measured by ticket link click-through rate and 30-day retention among concert-goers, with the main trade-off being ensuring the UI remains music-focused without clutter.'
      }
    ]
  },

  // 2. UI/UX & PRODUCT DESIGNER
  design: {
    title: 'UI/UX & Product Designer',
    boomingReason: 'Every modern software team needs dedicated product designers to transform complex AI and web features into simple, intuitive user interfaces.',
    beginnerPhilosophy: 'UX design begins with empathy and user research, moves into wireframing and information architecture, and culminates in Figma component systems and interactive prototypes.',
    portfolioProjects: [
      {
        id: 'ux-proj-1',
        title: 'Mobile App Redesign Case Study & Figma Prototype',
        difficulty: 'Beginner (Step 1-2)',
        timeToBuild: '1-2 weeks',
        requiredSkills: ['Design Thinking & User Research', 'Wireframing & Information Architecture', 'Figma Auto-Layout & Component Design Systems'],
        description: 'Complete end-to-end UX case study identifying usability friction in an existing mobile app, conducting user testing, and designing high-fidelity Figma screens with interactive prototypes.',
        whyRecruitersLoveIt: 'Recruiters hire designers based on their portfolio case studies. Showing your thought process from user problem to wireframes to final prototype is essential.',
        techStack: ['Figma', 'FigJam', 'Notion Case Study', 'UsabilityHub'],
        keyFeatures: [
          'User research findings, heuristic evaluation, and pain point matrix',
          'Low-fidelity paper wireframes demonstrating iterative layout testing',
          'High-fidelity interactive Figma prototype with animations and transitions',
          'Component system with color styles, typography tokens, and auto-layout'
        ],
        githubTemplate: 'https://github.com/topics/ux-case-study'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Design Thinking & User Research',
          yourLevel: 0,
          required: 85,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 1,
          shortDesc: 'Empathize, Define, Ideate, Prototype, and Test. Heuristic evaluation and qualitative interviews.',
          tip: 'Learn the 10 Usability Heuristics by Jakob Nielsen—every design critique references them.',
          suggestedResources: [
            { name: 'Nielsen Norman Group 10 Usability Heuristics', type: 'Design Gold Standard', topic: 'Visibility of system status, error prevention, and user control' }
          ],
          suggestedSearch: 'Design thinking methodology for UI UX beginners'
        },
        {
          skill: 'Wireframing & Information Architecture',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 2,
          shortDesc: 'Site maps, user flows, navigation hierarchies, and rapid low-fidelity paper wireframing.',
          suggestedResources: [
            { name: 'Information Architecture Institute Guides', type: 'Hierarchy Principles', topic: 'Card sorting, site trees, and navigation taxonomy' }
          ],
          suggestedSearch: 'Information architecture and wireframing best practices'
        },
        {
          skill: 'Figma Auto-Layout & Component Design Systems',
          yourLevel: 0,
          required: 85,
          time: '3 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Master Auto-Layout, variants, design tokens (colors, typography, spacing), and interactive components.',
          tip: 'Auto-layout in Figma mirrors CSS Flexbox. If you understand auto-layout, engineers love working with your files.',
          suggestedResources: [
            { name: 'Figma Official Auto-Layout Interactive Playground', type: 'Official Hands-on File', topic: 'Constraints, resizing properties, and nested auto-layouts' }
          ],
          suggestedSearch: 'Figma auto layout and component design system tutorial'
        }
      ],
      important: [
        {
          skill: 'Usability Testing & Micro-Interactions',
          yourLevel: 0,
          required: 75,
          time: '2 weeks',
          priority: 'Important',
          stepNumber: 4,
          shortDesc: 'Prototype testing with real users, task success rates, and interactive component animations.',
          suggestedResources: [
            { name: 'Maze User Testing Guides', type: 'Remote Testing', topic: 'Unmoderated usability testing and heatmap analysis' }
          ],
          suggestedSearch: 'How to conduct usability testing for prototype'
        }
      ],
      niceToHave: [
        {
          skill: 'Design-to-Code Handoff & Web Accessibility (WCAG)',
          yourLevel: 0,
          required: 70,
          time: '1 week',
          priority: 'Nice to Have',
          stepNumber: 5,
          shortDesc: 'Color contrast standards (WCAG AA), screen reader considerations, and engineering spec annotations.',
          suggestedResources: [
            { name: 'WebAIM WCAG Contrast Checker', type: 'Accessibility Tool', topic: 'Accessible color ratios and keyboard navigation' }
          ],
          suggestedSearch: 'WCAG accessibility guidelines for product designers'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Step 1: User Empathy & Problem Definition',
        days: [
          { day: 'Mon', task: 'Study Jakob Nielsen 10 Usability Heuristics with real product examples (2 hrs)', done: false },
          { day: 'Tue', task: 'Audit an existing confusing mobile app and document 5 usability flaws (2 hrs)', done: false },
          { day: 'Wed', task: 'Map out the ideal User Flow from signup to primary task completion (2 hrs)', done: false },
          { day: 'Thu', task: 'Sketch 10 rapid low-fidelity paper wireframes exploring different layouts (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Organize sketches into a cohesive low-fi digital wireframe in Figma (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Step 2: Figma Mastery, Auto-Layout & UI Systems',
        days: [
          { day: 'Mon', task: 'Master Figma Auto-Layout: padding, gap, and hug/fill sizing properties (2 hrs)', done: false },
          { day: 'Tue', task: 'Build a Design Token library: typography scales, color palettes, spacing (2 hrs)', done: false },
          { day: 'Wed', task: 'Create reusable button variants: default, hover, active, disabled states (2 hrs)', done: false },
          { day: 'Thu', task: 'Design high-fidelity screens for onboarding, dashboard, and settings (2 hrs)', done: false },
          { day: 'Fri', task: 'Connect screens with smart animate prototyping and micro-interactions (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Step 3: User Testing & Portfolio Case Study',
        days: [
          { day: 'Mon', task: 'Conduct unmoderated usability test with 3 users navigating the prototype (2 hrs)', done: false },
          { day: 'Tue', task: 'Document user friction points and implement design iterations (2 hrs)', done: false },
          { day: 'Wed', task: 'Write UX Case Study: Problem, Process, Iterations, and Final Prototype (2 hrs)', done: false },
          { day: 'Thu', task: 'Check WCAG AA accessibility color contrast across all screens (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Mock interview practice: App critique and design challenge questions (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'Walk me through your design process from when you first receive a vague problem statement to final handoff.',
        type: 'Process & Methodology',
        keywords: ['research', 'empathy', 'problem', 'wireframe', 'iterate', 'test', 'prototype', 'engineering', 'handoff'],
        rubric: ['Does not jump immediately into Figma', 'Begins with user research and problem definition', 'Covers rapid low-fidelity iteration and user validation', 'Mentions developer collaboration'],
        idealAnswer: 'I follow a double-diamond approach: 1) Understand & Discover: I speak with users and stakeholders to define the true root problem; 2) Define: I synthesize findings into user flows and requirements; 3) Develop: I sketch low-fidelity wireframes rapidly to test layout concepts before committing to pixels; 4) Deliver: I build high-fidelity interactive prototypes in Figma, validate with usability testing, and annotate specs with design tokens for seamless engineering handoff.'
      }
    ]
  },

  // 3. BUSINESS INTELLIGENCE & DATA ANALYST
  data: {
    title: 'Business Intelligence & Data Analyst',
    boomingReason: 'Every modern company is swimming in customer data. BI Analysts bridge business leadership and raw databases to drive revenue and operational decisions.',
    beginnerPhilosophy: 'We start with analytical business math and Excel spreadsheet modeling, advance to SQL database querying, and build interactive Power BI / Tableau dashboards.',
    portfolioProjects: [
      {
        id: 'data-proj-1',
        title: 'Executive Revenue & Customer Retention Cohort Dashboard',
        difficulty: 'Beginner (Step 1-2)',
        timeToBuild: '1-2 weeks',
        requiredSkills: ['Spreadsheet Modeling & Pivot Analysis', 'Relational Database SQL Querying', 'Business Intelligence Dashboards (Power BI / Tableau)'],
        description: 'An interactive executive dashboard showing subscriber churn rates, customer lifetime value (LTV), and monthly cohort retention curves.',
        whyRecruitersLoveIt: 'Shows you understand how data connects directly to revenue, profit margins, and executive business decisions.',
        techStack: ['SQL / PostgreSQL', 'Tableau Public / Power BI', 'Advanced Excel'],
        keyFeatures: [
          'Cohort analysis tracking 12-month customer retention curves',
          'Drill-down filters by acquisition channel and plan tier',
          'Executive KPI summary card for monthly recurring revenue'
        ],
        githubTemplate: 'https://github.com/topics/customer-churn-analysis'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Spreadsheet Modeling & Pivot Analysis',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 1,
          shortDesc: 'Excel / Google Sheets: XLOOKUP, Nested IFs, Pivot Tables, and cohort tables.',
          tip: 'Master dynamic array formulas and keyboard shortcuts to navigate datasets instantly.',
          suggestedResources: [
            { name: 'Excel Easy Interactive Masterclass', type: 'Hands-on Practice', topic: 'Formulas, pivot tables, and data modeling' }
          ],
          suggestedSearch: 'Excel data modeling pivot tables tutorial for analysts'
        },
        {
          skill: 'Relational Database SQL Querying',
          yourLevel: 0,
          required: 85,
          time: '3 weeks',
          priority: 'Critical',
          stepNumber: 2,
          shortDesc: 'SELECT, WHERE, GROUP BY, aggregations, multi-table JOINs, and window functions (ROW_NUMBER, RANK).',
          tip: 'SQL is required in 95% of data analyst job interviews.',
          suggestedResources: [
            { name: 'Mode Analytics Interactive SQL School', type: 'Interactive Query Sandbox', topic: 'Querying databases, joins, and window functions' }
          ],
          suggestedSearch: 'SQL tutorial for business intelligence and data analyst'
        },
        {
          skill: 'Business Intelligence Dashboards (Power BI / Tableau)',
          yourLevel: 0,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Connect datasets, build interactive KPI cards, time-series charts, and publish dashboards.',
          suggestedResources: [
            { name: 'Microsoft Power BI Official Guided Learning', type: 'Free Certification Course', topic: 'Data modeling, DAX formulas, and dashboard design' }
          ],
          suggestedSearch: 'Power BI beginner dashboard tutorial step by step'
        }
      ],
      important: [
        {
          skill: 'Statistical Thinking & A/B Test Interpretation',
          yourLevel: 0,
          required: 70,
          time: '2 weeks',
          priority: 'Important',
          stepNumber: 4,
          shortDesc: 'P-values, confidence intervals, sample sizes, and distinguishing correlation from causation.',
          suggestedResources: [
            { name: 'Khan Academy College Statistics', type: 'Self-paced Exercises', topic: 'Hypothesis testing, distributions, and variance' }
          ],
          suggestedSearch: 'Statistics for data analysts made simple'
        }
      ],
      niceToHave: [
        {
          skill: 'Python for Automated Data Cleaning (Pandas)',
          yourLevel: 0,
          required: 65,
          time: '3 weeks',
          priority: 'Nice to Have',
          stepNumber: 5,
          shortDesc: 'Clean messy CSVs and automate scheduled data extraction with Pandas.',
          suggestedResources: [
            { name: 'Kaggle Learn Pandas', type: 'Interactive Notebooks', topic: 'DataFrame indexing, grouping, and aggregations' }
          ],
          suggestedSearch: 'Pandas data analysis crash course beginners'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Step 1: Excel Mastery & Spreadsheet Analysis',
        days: [
          { day: 'Mon', task: 'Clean raw unformatted sales data: text-to-columns, deduplication (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Master XLOOKUP and multi-criteria SUMIFS for reporting (2 hrs)', done: false },
          { day: 'Wed', task: 'Build interactive Pivot Tables with calculated fields and slicers (2 hrs)', done: false },
          { day: 'Thu', task: 'Format an executive monthly P&L financial summary sheet (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Calculate customer retention cohorts over 6 quarters in Excel (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Step 2: SQL Database Querying & Joins',
        days: [
          { day: 'Mon', task: 'SQL basics: SELECT, WHERE, ORDER BY, LIMIT on customer tables (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Aggregations: COUNT, SUM, AVG grouped by product category (2 hrs)', done: false },
          { day: 'Wed', task: 'Multi-table JOINs: INNER, LEFT, and FULL JOINs on Orders to Customers (2 hrs)', done: false },
          { day: 'Thu', task: 'Window functions: ROW_NUMBER and RANK to find top customers (2 hrs)', done: false },
          { day: 'Fri', task: 'Complete comprehensive business SQL query assessment (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Step 3: Interactive Dashboards & Mock Interviews',
        days: [
          { day: 'Mon', task: 'Install Power BI Desktop or Tableau Public & import database tables (1 hr)', done: false },
          { day: 'Tue', task: 'Model relational data schema with primary and foreign keys (2 hrs)', done: false },
          { day: 'Wed', task: 'Create executive KPI cards, monthly revenue charts, and category maps (2 hrs)', done: false },
          { day: 'Thu', task: 'Publish Customer Retention & Revenue portfolio dashboard (2 hrs)', done: false },
          { day: 'Fri', task: 'Complete Data Analyst mock interview practice session (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'What is the difference between a LEFT JOIN and an INNER JOIN in SQL? When would you choose one over the other?',
        type: 'Technical SQL',
        keywords: ['inner', 'left', 'null', 'match', 'table', 'rows', 'both', 'unmatched'],
        rubric: ['Accurately defines INNER JOIN as returning only matching rows from both tables', 'Accurately defines LEFT JOIN as returning all rows from the left table and matched rows from the right table with NULLs', 'Provides a concrete business example (e.g. customers without orders)'],
        idealAnswer: 'An INNER JOIN returns only rows where there is a match in both tables. A LEFT JOIN returns all rows from the left table, plus matched rows from the right table—filling in NULLs for any right-table columns where no match exists. For example, if we want to list all customers and see their purchases, a LEFT JOIN ensures customers who have never made a purchase are still included, whereas an INNER JOIN would omit them.'
      }
    ]
  },

  // 4. JUNIOR SOFTWARE & WEB ENGINEER (TECHNOLOGY)
  technology: {
    title: 'Junior Software & Web Engineer',
    boomingReason: 'Software engineering remains the #1 high-demand digital profession globally, with over 1.4 million open roles in web and cloud platforms in 2026.',
    beginnerPhilosophy: 'Instead of rushing directly into complex frameworks like React, we start with raw programming logic and web foundations (HTML, CSS, JavaScript) so you understand how software actually works.',
    portfolioProjects: [
      {
        id: 'tech-proj-1',
        title: 'Accessible Semantic Portfolio & Developer Card',
        difficulty: 'Beginner (Step 1-2)',
        timeToBuild: '3-4 days',
        requiredSkills: ['Programming Logic & Computer Fundamentals', 'HTML5 Semantic Foundations', 'CSS3 & Responsive Layouts'],
        description: 'A responsive multi-page personal portfolio website built with pure semantic HTML5 and modern CSS Grid/Flexbox without relying on templates.',
        whyRecruitersLoveIt: 'Shows clean semantic markup, accessibility (a11y) standards, and solid responsive layout mastery across mobile and desktop.',
        techStack: ['HTML5', 'CSS3 (Flexbox & Grid)', 'Git / GitHub Pages'],
        keyFeatures: [
          'Semantic HTML elements (<header>, <nav>, <main>, <section>, <footer>)',
          'Responsive design adapting from mobile phones to 4K displays',
          'Clean contact form with input validation attributes',
          'Deployed publicly on GitHub Pages'
        ],
        githubTemplate: 'https://github.com/topics/html5-portfolio'
      },
      {
        id: 'tech-proj-2',
        title: 'Interactive Task & Budget Manager (DOM & JS)',
        difficulty: 'Intermediate (Step 3-4)',
        timeToBuild: '1-2 weeks',
        requiredSkills: ['HTML5 Semantic Foundations', 'CSS3 & Responsive Layouts', 'JavaScript Interactivity & DOM Manipulation'],
        description: 'An interactive browser task and expense calculator with local storage persistence, category filtering, and dynamic DOM rendering.',
        whyRecruitersLoveIt: 'Proves you master pure JavaScript fundamentals—events, array methods, and state persistence—before relying on frameworks.',
        techStack: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Browser LocalStorage'],
        keyFeatures: [
          'Add, edit, delete, and filter items dynamically in the DOM',
          'Saves items to browser LocalStorage so data persists on refresh',
          'Calculates real-time running budget totals and status badges'
        ],
        githubTemplate: 'https://github.com/topics/javascript-todo'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Programming Logic & Computer Fundamentals',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 1,
          shortDesc: 'Variables, data types, conditional branching, loops, functions, and memory basics.',
          tip: 'Beginners who learn algorithmic logic first pick up all other languages 5x faster.',
          mentorNote: 'Do not jump into React yet! Master if/else statements, loops, and breaking complex problems into simple steps.',
          suggestedResources: [
            { name: 'CS50: Introduction to Computer Science (Harvard)', type: 'World Standard Course', topic: 'Algorithms, memory concepts, and foundational logic' }
          ],
          suggestedSearch: 'Computer programming fundamentals for beginners logic loops functions',
          lessonSteps: [
            { title: 'Variables & Data Types', desc: 'Variables store data in memory (integers, strings, booleans).', code: 'let score = 100;\nlet playerName = "Alex";\nlet isGameOver = false;' }
          ],
          quiz: {
            question: 'What is the primary purpose of a loop in programming?',
            options: ['To repeat a block of code multiple times until a condition is met', 'To shut down the computer', 'To change the screen color permanently', 'To delete files'],
            correctIndex: 0
          }
        },
        {
          skill: 'HTML5 Semantic Foundations',
          yourLevel: 0,
          required: 85,
          time: '1 week',
          priority: 'Critical',
          stepNumber: 2,
          shortDesc: 'Structure web documents using standard semantic tags (<header>, <nav>, <article>, <form>).',
          suggestedResources: [
            { name: 'MDN Web Docs: HTML Basics', type: 'Official Industry Reference', topic: 'Document structure, text formatting, hyperlinks, and forms' }
          ],
          suggestedSearch: 'HTML5 semantic tags tutorial for beginners'
        },
        {
          skill: 'CSS3 & Responsive Layouts',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Box model (margins/padding), Flexbox alignment, CSS Grid, and mobile media queries.',
          suggestedResources: [
            { name: 'Flexbox Froggy - Interactive Game', type: 'Game-based Learning', topic: 'Master justify-content, align-items, and flex-direction' }
          ],
          suggestedSearch: 'CSS Flexbox and Grid crash course beginners'
        },
        {
          skill: 'JavaScript Interactivity & DOM Manipulation',
          yourLevel: 0,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          stepNumber: 4,
          shortDesc: 'Select elements, listen to button clicks, update the page dynamically, and fetch API data.',
          suggestedResources: [
            { name: 'JavaScript30 by Wes Bos', type: '30-Day Practical Coding Challenge', topic: 'Build 30 vanilla JS projects without frameworks' }
          ],
          suggestedSearch: 'JavaScript DOM manipulation tutorial beginner'
        }
      ],
      important: [
        {
          skill: 'Modern Component Frameworks (React)',
          yourLevel: 0,
          required: 75,
          time: '3 weeks',
          priority: 'Important',
          stepNumber: 5,
          shortDesc: 'Component reuse, props, useState, and useEffect hooks.',
          suggestedResources: [
            { name: 'Official React Documentation (react.dev)', type: 'Interactive Guided Docs', topic: 'Component thinking and reactive state' }
          ],
          suggestedSearch: 'React beginner tutorial step by step'
        }
      ],
      niceToHave: [
        {
          skill: 'Backend Web Servers & REST APIs (Node.js)',
          yourLevel: 0,
          required: 70,
          time: '3 weeks',
          priority: 'Nice to Have',
          stepNumber: 6,
          shortDesc: 'Handle HTTP requests, routing in Express, and database storage.',
          suggestedResources: [
            { name: 'The Odin Project - NodeJS Curriculum', type: 'Open-Source Learning', topic: 'Servers, routing, authentication, and databases' }
          ],
          suggestedSearch: 'Node.js Express REST API beginner guide'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Step 1: Programming Logic & Computer Fundamentals',
        days: [
          { day: 'Mon', task: 'Variables, data types (numbers, strings, booleans) & memory (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Conditional statements: if, else if, else logic (1.5 hrs)', done: false },
          { day: 'Wed', task: 'Loops: for and while loops with practice problems (2 hrs)', done: false },
          { day: 'Thu', task: 'Functions: inputs (parameters) and outputs (return values) (2 hrs)', done: false },
          { day: 'Fri', task: 'Mini challenge: Build a text-based guessing game in code (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Step 2: Semantic HTML5 & Web Structure',
        days: [
          { day: 'Mon', task: 'How browsers work & basic HTML document structure (1 hr)', done: false },
          { day: 'Tue', task: 'Semantic tags: header, nav, main, section, article, footer (1.5 hrs)', done: false },
          { day: 'Wed', task: 'Text formatting, links, lists, and images with alt text (1.5 hrs)', done: false },
          { day: 'Thu', task: 'HTML Forms: text inputs, buttons, checkboxes, radio options (2 hrs)', done: false },
          { day: 'Fri', task: 'Mini project: Build a multi-section personal biography webpage (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Step 3: CSS3 Layouts, Flexbox & Responsive Styling',
        days: [
          { day: 'Mon', task: 'CSS Selectors, colors, fonts, and the Box Model (padding/margin) (2 hrs)', done: false },
          { day: 'Tue', task: 'Flexbox fundamentals: justify-content, align-items, flex-direction (2 hrs)', done: false },
          { day: 'Wed', task: 'CSS Grid: columns, rows, and responsive card layouts (2 hrs)', done: false },
          { day: 'Thu', task: 'Mobile responsiveness: @media queries for phone & tablet screens (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Portfolio Milestone: Polish and deploy Accessible Portfolio website (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'What is the difference between semantic HTML and non-semantic HTML? Why does it matter?',
        type: 'Web Foundations',
        keywords: ['semantic', 'meaning', 'accessibility', 'screen reader', 'seo', 'div', 'nav', 'header'],
        rubric: ['Explains that semantic tags convey meaning about content', 'Mentions screen readers and accessibility (a11y)', 'Cites SEO and search crawler benefits'],
        idealAnswer: 'Semantic HTML uses tags that clearly describe their meaning to both the browser and developer (like <header>, <nav>, <article>, and <footer>), rather than generic tags like <div> or <span>. This is crucial for accessibility—allowing screen readers to navigate effortlessly—and improves search engine indexing (SEO).'
      }
    ]
  },

  // 5. HEALTHCARE INFORMATICS
  healthcare: {
    title: 'Junior Health Data & Informatics Specialist',
    boomingReason: 'Healthcare informatics is expanding at 28% annual growth due to the nationwide modernization of Electronic Health Records (EHR) and AI-driven clinical operations.',
    beginnerPhilosophy: 'Beginners start with healthcare privacy (HIPAA) and medical terminology, followed by Excel patient sheets, before advancing to clinical databases and dashboards.',
    portfolioProjects: [
      {
        id: 'hc-proj-1',
        title: 'Patient Intake & Clinical Spreadsheet Tracker',
        difficulty: 'Beginner (Step 1-2)',
        timeToBuild: '4-5 days',
        requiredSkills: ['Healthcare Privacy, HIPAA & Medical Coding (ICD-10)', 'Clinical Spreadsheets & Patient Cohort Analysis'],
        description: 'An audited patient intake spreadsheet modeling clinic appointments, insurance authorization status, and ICD-10 diagnosis categories.',
        whyRecruitersLoveIt: 'Shows mastery of medical terminology, Excel formulas (VLOOKUP, IF, SUMIFS), and compliance with patient privacy protocols.',
        techStack: ['Excel / Google Sheets', 'HIPAA Guidelines', 'ICD-10 Codes'],
        keyFeatures: [
          'De-identified patient intake records following HIPAA Safe Harbor rules',
          'Automated formula verification for missing insurance policy numbers',
          'Pivot summary showing top 5 clinical diagnoses per age bracket'
        ],
        githubTemplate: 'https://github.com/topics/healthcare-excel'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Healthcare Privacy, HIPAA & Medical Coding (ICD-10)',
          yourLevel: 0,
          required: 85,
          time: '1 week',
          priority: 'Critical',
          stepNumber: 1,
          shortDesc: 'Protected Health Information (PHI), 18 Safe Harbor identifiers, and diagnostic coding hierarchies.',
          suggestedResources: [
            { name: 'HHS.gov HIPAA Privacy Rule Overview', type: 'Official US Dept of Health', topic: 'Safe Harbor de-identification rules and patient data safeguards' }
          ],
          suggestedSearch: 'HIPAA compliance rules and ICD-10 coding guide for beginners'
        },
        {
          skill: 'Clinical Spreadsheets & Patient Cohort Analysis',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 2,
          shortDesc: 'Excel / Google Sheets: VLOOKUP/XLOOKUP, Pivot Tables, conditional formatting, and cohort cleaning.',
          suggestedResources: [
            { name: 'Excel for Healthcare Professionals', type: 'Practical Guides', topic: 'Pivot tables, cohort categorization, and data sanitization' }
          ],
          suggestedSearch: 'Excel data cleaning and pivot tables tutorial for healthcare'
        },
        {
          skill: 'Healthcare SQL & Electronic Health Records (EHR)',
          yourLevel: 0,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Query patient encounters, lab results, and billing tables using relational SQL.',
          suggestedResources: [
            { name: 'Synthea Open Synthetic Patient Data Generator', type: 'Synthetic Health Dataset', topic: 'Practice SQL queries on realistic EHR patient tables' }
          ],
          suggestedSearch: 'SQL queries for healthcare EHR and claims data analysis'
        }
      ],
      important: [
        {
          skill: 'Hospital Quality & Clinical Dashboards (Tableau/Power BI)',
          yourLevel: 0,
          required: 75,
          time: '3 weeks',
          priority: 'Important',
          stepNumber: 4,
          shortDesc: 'Visualize CMS hospital metrics: 30-day readmissions, average length of stay (ALOS), and ER wait times.',
          suggestedResources: [
            { name: 'CMS.gov Hospital Quality Data Portal', type: 'Public Data', topic: 'Real hospital quality and clinical performance metrics' }
          ],
          suggestedSearch: 'Hospital quality dashboard design Tableau Power BI'
        }
      ],
      niceToHave: [
        {
          skill: 'Healthcare Interoperability (HL7 & FHIR Standards)',
          yourLevel: 0,
          required: 60,
          time: '2 weeks',
          priority: 'Nice to Have',
          stepNumber: 5,
          shortDesc: 'How medical records transfer between disparate clinics, labs, and pharmacies.',
          suggestedResources: [
            { name: 'HL7 International FHIR Overview', type: 'Industry Standard', topic: 'RESTful healthcare data transfer protocols' }
          ],
          suggestedSearch: 'FHIR and HL7 healthcare interoperability explained simply'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Step 1: Healthcare Ecosystem, HIPAA & Coding',
        days: [
          { day: 'Mon', task: 'Study the healthcare data journey: clinics, hospitals, insurers, labs (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Master the 18 HIPAA Safe Harbor identifiers to de-identify records (2 hrs)', done: false },
          { day: 'Wed', task: 'Understand diagnosis coding: ICD-10 chapters and structure (1.5 hrs)', done: false },
          { day: 'Thu', task: 'Learn procedure coding: CPT and billing claims basics (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Case study: Audit a mock medical chart for HIPAA compliance (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Step 2: Excel for Clinical Patient Spreadsheets',
        days: [
          { day: 'Mon', task: 'Load and inspect sample clinical records in Excel / Google Sheets (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Clean patient data: trim spaces, fix date formats, handle blanks (2 hrs)', done: false },
          { day: 'Wed', task: 'Master XLOOKUP to match patients with diagnostic categories (2 hrs)', done: false },
          { day: 'Thu', task: 'Build Pivot Tables calculating patient volumes per clinic department (2 hrs)', done: false },
          { day: 'Fri', task: 'Complete Patient Intake & Clinical Spreadsheet portfolio project (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Step 3: Healthcare SQL & Patient Queries',
        days: [
          { day: 'Mon', task: 'Download Synthea synthetic patient SQLite database (1 hr)', done: false },
          { day: 'Tue', task: 'Query patients diagnosed with Chronic Conditions in SQL (2 hrs)', done: false },
          { day: 'Wed', task: 'JOIN patients table with encounters and medications tables (2 hrs)', done: false },
          { day: 'Thu', task: 'Write SQL query to flag emergency visits within 30 days of discharge (2 hrs)', done: false },
          { day: 'Fri', task: 'Mock interview practice: Clinical data compliance and case questions (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'What are the HIPAA Safe Harbor requirements, and how do you ensure patient data privacy before analysis?',
        type: 'Compliance',
        keywords: ['hipaa', 'safe harbor', '18 identifiers', 'phi', 'names', 'dates', 'masking', 'de-identify'],
        rubric: ['Identifies PHI and the 18 direct identifiers', 'Explains Safe Harbor de-identification method', 'Mentions masking or removing geographic/date precision'],
        idealAnswer: 'Under the HIPAA Safe Harbor method, all 18 direct personal identifiers must be removed or masked—including names, phone numbers, SSNs, medical record numbers, and any date elements more specific than a year. Only after these identifiers are stripped and verified can the dataset be safely used for analytical research.'
      }
    ]
  }
};

Object.assign(ROLE_DATA, CAREER_ROLE_DATA);

export function getRoleKey(roleString) {
  if (!roleString) return 'technology';
  const careerRole = getCareerRole(roleString);
  if (careerRole) return careerRole.key;
  const lower = roleString.toLowerCase();
  
  if (lower.includes('product manager') || lower.includes('product') || lower.includes('operations manager') || lower.includes('pm')) {
    return 'productManager';
  }
  if (lower.includes('design') || lower.includes('ux') || lower.includes('ui')) {
    return 'design';
  }
  if (lower.includes('health') || lower.includes('clinic') || lower.includes('care') || lower.includes('med')) {
    return 'healthcare';
  }
  if (lower.includes('data') || lower.includes('analyst') || lower.includes('business intelligence') || lower.includes('bi')) {
    return 'data';
  }
  return 'technology';
}
