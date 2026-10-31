export const INTEREST_TO_BOOMING_ROLE = {
  technology: 'Junior Software & Web Engineer',
  healthcare: 'Junior Health Data & Informatics Specialist',
  data: 'Business Intelligence & Data Analyst',
  design: 'UI/UX & Product Designer',
  business: 'Associate Product & Operations Manager',
  marketing: 'Growth & Performance Marketing Specialist',
  finance: 'Financial & Revenue Operations Analyst',
  writing: 'Technical Writer & Documentation Specialist',
};

export const ROLE_DATA = {
  // 1. TECHNOLOGY & CODING: BEGINNER SOFTWARE & WEB ENGINEER
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
        whyRecruitersLoveIt: 'Proves you master pure JavaScript fundamentals—events, array methods (map, filter, reduce), and state persistence—before relying on frameworks.',
        techStack: ['JavaScript ES6+', 'HTML5', 'CSS3', 'Browser LocalStorage'],
        keyFeatures: [
          'Add, edit, delete, and filter items dynamically in the DOM',
          'Saves items to browser LocalStorage so data persists on refresh',
          'Calculates real-time running budget totals and status badges',
          'Keyboard accessibility for fast data entry'
        ],
        githubTemplate: 'https://github.com/topics/javascript-todo'
      },
      {
        id: 'tech-proj-3',
        title: 'Full Stack API & Component Web Application',
        difficulty: 'Advanced (Step 5-6)',
        timeToBuild: '3 weeks',
        requiredSkills: ['JavaScript Interactivity & DOM Manipulation', 'Modern Component Frameworks (React)', 'Backend Web Servers & REST APIs (Node.js)'],
        description: 'Full stack CRUD application with React frontend, Node/Express backend, and persistent relational database storage.',
        whyRecruitersLoveIt: 'Proves complete end-to-end architectural capability needed for professional software engineer hiring.',
        techStack: ['React', 'Node.js', 'Express', 'PostgreSQL / Prisma', 'Tailwind CSS'],
        keyFeatures: [
          'Modular React component hierarchy with reusable UI elements',
          'RESTful API handling GET, POST, PUT, DELETE with error middleware',
          'Database schema with relations and automated migrations',
          'Live production deployment on Render & Vercel'
        ],
        githubTemplate: 'https://github.com/topics/fullstack-app'
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
          mentorNote: 'Do not jump into React or web frameworks yet! Master if/else statements, loops, and breaking complex problems into simple steps.',
          suggestedResources: [
            { name: 'CS50: Introduction to Computer Science (Harvard)', type: 'World Standard Course', topic: 'Algorithms, memory concepts, and foundational logic' },
            { name: 'Exercism.org - Programming Fundamentals', type: 'Hands-on Coding Exercises', topic: 'Solve bite-sized logic puzzles with mentor feedback' }
          ],
          suggestedSearch: 'Computer programming fundamentals for beginners logic loops functions',
          lessonSteps: [
            { title: 'Variables & Data Types', desc: 'Variables store data in memory (integers, strings, booleans).', code: 'let score = 100;\nlet playerName = "Alex";\nlet isGameOver = false;' },
            { title: 'Conditional Branching', desc: 'Direct the computer to take different actions based on conditions.', code: 'if (score >= 100) {\n  console.log("Next Level!");\n} else {\n  console.log("Keep playing");\n}' },
            { title: 'Loops & Iteration', desc: 'Automate repetitive tasks over collections of data.', code: 'for (let i = 1; i <= 5; i++) {\n  console.log("Step: " + i);\n}' }
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
          tip: 'Avoid using generic <div> tags for everything; use semantic tags for accessibility and SEO.',
          mentorNote: 'HTML is the skeleton of the internet. Everything you see in browsers starts as an HTML tree.',
          suggestedResources: [
            { name: 'MDN Web Docs: HTML Basics', type: 'Official Industry Reference', topic: 'Document structure, text formatting, hyperlinks, and forms' },
            { name: 'W3Schools Interactive HTML Playground', type: 'Browser Editor', topic: 'Practice writing tags and viewing live output' }
          ],
          suggestedSearch: 'HTML5 semantic tags tutorial for beginners',
          lessonSteps: [
            { title: 'Document Skeleton', desc: 'Every webpage requires standard DOCTYPE and body structure.', code: '<!DOCTYPE html>\n<html>\n  <head><title>My App</title></head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>' }
          ],
          quiz: {
            question: 'Which HTML tag should be used for the primary navigation links of a website?',
            options: ['<nav>', '<div>', '<span>', '<bold>'],
            correctIndex: 0
          }
        },
        {
          skill: 'CSS3 & Responsive Layouts',
          yourLevel: 0,
          required: 80,
          time: '2 weeks',
          priority: 'Critical',
          stepNumber: 3,
          shortDesc: 'Box model (margins/padding), Flexbox alignment, CSS Grid, and mobile media queries.',
          tip: 'Flexbox Froggy and Grid Garden are free games that teach CSS layouts interactively.',
          suggestedResources: [
            { name: 'Flexbox Froggy - Interactive Game', type: 'Game-based Learning', topic: 'Master justify-content, align-items, and flex-direction' },
            { name: 'MDN CSS Layout & Media Queries Guide', type: 'Official Docs', topic: 'Responsive styling for mobile, tablet, and desktop' }
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
          tip: 'Once you understand document.querySelector and addEventListener, websites come alive.',
          suggestedResources: [
            { name: 'JavaScript30 by Wes Bos', type: '30-Day Practical Coding Challenge', topic: 'Build 30 vanilla JS projects without frameworks' },
            { name: 'javascript.info - Modern Tutorial', type: 'Comprehensive Guide', topic: 'DOM tree traversal, browser events, and asynchronous promises' }
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
        },
        {
          skill: 'Backend Web Servers & REST APIs (Node.js)',
          yourLevel: 0,
          required: 70,
          time: '3 weeks',
          priority: 'Important',
          stepNumber: 6,
          shortDesc: 'Handle HTTP requests, routing in Express, and database storage.',
          suggestedResources: [
            { name: 'The Odin Project - NodeJS Curriculum', type: 'Open-Source Learning', topic: 'Servers, routing, authentication, and databases' }
          ],
          suggestedSearch: 'Node.js Express REST API beginner guide'
        }
      ],
      niceToHave: [
        {
          skill: 'Git & Version Control Fundamentals',
          yourLevel: 0,
          required: 65,
          time: '1 week',
          priority: 'Nice to Have',
          shortDesc: 'Git init, commit, push, and hosting projects on GitHub.',
          suggestedResources: [
            { name: 'GitHub Skills: First Day on GitHub', type: 'Interactive Repository', topic: 'Tracking changes and collaborating' }
          ],
          suggestedSearch: 'Git and GitHub beginner tutorial'
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
      },
      {
        id: 2,
        question: 'Explain the CSS Box Model and how margin, border, padding, and content relate to each other.',
        type: 'CSS Fundamentals',
        keywords: ['content', 'padding', 'border', 'margin', 'box-sizing', 'border-box'],
        rubric: ['Accurately orders from inside out: Content -> Padding -> Border -> Margin', 'Explains that padding is inside the border and margin is outside', 'Mentions box-sizing: border-box'],
        idealAnswer: 'The CSS Box Model is the container that wraps every HTML element. From the inside out, it consists of: 1) Content (text/images), 2) Padding (clears area around content, inside the border), 3) Border (wraps padding and content), and 4) Margin (clears area outside the border between other elements). Using "box-sizing: border-box" ensures padding and border are included in the element total width.'
      },
      {
        id: 3,
        question: 'What is the DOM in web development, and how does JavaScript interact with it?',
        type: 'JavaScript Basics',
        keywords: ['dom', 'document object model', 'tree', 'nodes', 'html', 'queryselector', 'event listener'],
        rubric: ['Defines Document Object Model as a tree representation of HTML', 'Explains how JavaScript selects nodes (e.g. querySelector)', 'Mentions modifying content or listening to user events'],
        idealAnswer: 'The DOM (Document Object Model) is a tree-like representation of an HTML document created by the browser in memory. JavaScript uses the DOM API to dynamically inspect and manipulate the page—such as finding elements using document.querySelector, modifying text or CSS styles, and listening to user events like button clicks.'
      }
    ]
  },

  // 2. HEALTHCARE: BOOMING CLINICAL INFORMATICS & HEALTH DATA
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
      },
      {
        id: 'hc-proj-2',
        title: 'Hospital Readmission & Patient Risk Dashboard',
        difficulty: 'Intermediate (Step 3-4)',
        timeToBuild: '2 weeks',
        requiredSkills: ['Clinical Spreadsheets & Patient Cohort Analysis', 'Healthcare SQL & Electronic Health Records (EHR)', 'Hospital Quality & Clinical Dashboards (Tableau/Power BI)'],
        description: 'An executive clinical dashboard tracking 30-day hospital readmissions, bed occupancy, and patient length-of-stay metrics.',
        whyRecruitersLoveIt: 'Shows you understand healthcare operations, ICD-10 diagnosis codes, and how hospitals avoid CMS readmission penalties.',
        techStack: ['SQL / BigQuery', 'Power BI / Tableau', 'Synthea Synthetic Patient Data'],
        keyFeatures: [
          '30-day readmission rate tracking categorized by primary ICD-10 diagnosis',
          'Bed utilization rate forecast by department (ICU, ER, General Ward)',
          'Patient de-identification pipeline following HIPAA Safe Harbor rules'
        ],
        githubTemplate: 'https://github.com/topics/healthcare-analytics'
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
          tip: 'Understanding HIPAA is the mandatory prerequisite before any healthcare employer grants data access.',
          suggestedResources: [
            { name: 'HHS.gov HIPAA Privacy Rule Overview', type: 'Official US Dept of Health', topic: 'Safe Harbor de-identification rules and patient data safeguards' },
            { name: 'WHO ICD-10 Classification Browser', type: 'Interactive Code Lookup', topic: 'How clinical diagnoses are categorized into alphanumeric codes' }
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
          tip: 'Most clinical audit teams rely on advanced spreadsheets daily for fast reviews.',
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
      },
      {
        id: 2,
        question: 'How do ICD-10 diagnosis codes differ from CPT procedure codes in healthcare records?',
        type: 'Terminology',
        keywords: ['icd-10', 'cpt', 'diagnosis', 'procedure', 'why', 'what', 'billing'],
        rubric: ['Explains ICD-10 identifies the diagnosis (the "why")', 'Explains CPT identifies the medical service or procedure performed (the "what")', 'Mentions how both are required on insurance billing claims'],
        idealAnswer: 'ICD-10 codes represent the diagnosis—the medical condition or disease explaining "why" the patient sought care (e.g. E11 for Type 2 Diabetes). CPT codes represent the medical procedures, tests, or treatments performed—the "what" was done by the provider. Together on an insurance claim, they justify the medical necessity of the treatment.'
      }
    ]
  }
};

export function getRoleKey(roleString) {
  if (!roleString) return 'technology';
  const lower = roleString.toLowerCase();
  if (lower.includes('health') || lower.includes('clinic') || lower.includes('care') || lower.includes('med')) {
    return 'healthcare';
  }
  return 'technology';
}
