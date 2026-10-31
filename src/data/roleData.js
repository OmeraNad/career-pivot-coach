export const INTEREST_TO_ROLE = {
  healthcare: 'Healthcare Data Analyst',
  technology: 'Full Stack Developer',
  design: 'UX Designer',
  data: 'Data Analyst',
  business: 'Product Manager',
  marketing: 'Growth & Marketing Specialist',
  finance: 'Financial Analyst',
  writing: 'Technical Writer',
  education: 'Instructional Designer',
  law: 'Compliance & Legal Ops Specialist',
};

export const ROLE_DATA = {
  // 1. FULL STACK DEVELOPER
  fullstack: {
    title: 'Full Stack Developer',
    overview: 'Build complete web applications from modern UI (React) to backend web servers (Node.js/Express) and relational databases.',
    portfolioProjects: [
      {
        id: 'proj-1',
        title: 'Production SaaS Task & Sprint Engine',
        difficulty: 'Intermediate',
        timeToBuild: '2 weeks',
        coversGaps: ['Frontend & Modern React', 'Node.js, Express & REST APIs', 'Authentication & Web Security'],
        description: 'A full-stack Kanban project manager with drag-and-drop boards, JWT authentication, and team workspaces.',
        whyRecruitersLoveIt: 'Shows you can manage complex UI state, protect API endpoints with JWT tokens, and structure multi-tenant database relations.',
        techStack: ['React', 'Node.js / Express', 'PostgreSQL / Prisma', 'Tailwind CSS'],
        keyFeatures: [
          'User signup & login with bcrypt hashed passwords and JWT cookies',
          'Drag-and-drop cards between Backlog, In-Progress, and Done columns',
          'Optimistic UI updates for snappy responsiveness',
          'Search and tag filtering across tasks'
        ],
        githubTemplate: 'https://github.com/topics/kanban-react-node'
      },
      {
        id: 'proj-2',
        title: 'E-Commerce Marketplace REST API & Storefront',
        difficulty: 'Advanced',
        timeToBuild: '3 weeks',
        coversGaps: ['Node.js, Express & REST APIs', 'Database Design (PostgreSQL & MongoDB)', 'Git, GitHub & CI/CD Deployment'],
        description: 'Complete e-commerce infrastructure with product catalog, cart persistence, inventory tracking, and mock checkout.',
        whyRecruitersLoveIt: 'Proves database normalization, transactional integrity, and automated cloud deployment.',
        techStack: ['React', 'Express.js', 'PostgreSQL', 'Stripe API Test Mode'],
        keyFeatures: [
          'Relational database schema: Users, Orders, Products, and OrderItems',
          'Paginated product listings with category and price range filters',
          'Persistent shopping cart stored across browser reloads',
          'Automated deployment via GitHub Actions workflow'
        ],
        githubTemplate: 'https://github.com/topics/ecommerce-rest-api'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Frontend & Modern React',
          yourLevel: 10,
          required: 85,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Component architecture, State (useState/useEffect), Hooks, and Tailwind CSS.',
          tip: 'Build a real CRUD app rather than watching passive tutorials.',
          mentorNote: 'Recruiters want to see that you can fetch data from an API, handle loading and error states cleanly, and render responsive UI.',
          suggestedResources: [
            { name: 'Official React Documentation (Interactive)', type: 'Free Hands-on Tutorial', topic: 'Modern component lifecycle and custom hooks' },
            { name: 'The Odin Project Full-Stack Path', type: 'Open-Source Curriculum', topic: 'Building production UI from wireframes' }
          ],
          suggestedSearch: 'React 19 hooks and state management tutorial 2026',
          lessonSteps: [
            { title: 'State & Reactivity', desc: 'State is memory inside a component that triggers a UI re-render when changed.', code: 'const [items, setItems] = useState([]);\nconst addItem = (item) => setItems([...items, item]);' }
          ],
          quiz: {
            question: 'What happens when state is updated using its setter function in React?',
            options: ['The entire browser page refreshes', 'The component re-renders with the new value', 'The database is automatically deleted', 'Nothing until the user clicks save'],
            correctIndex: 1
          }
        },
        {
          skill: 'Node.js, Express & REST APIs',
          yourLevel: 5,
          required: 80,
          time: '4 weeks',
          priority: 'Critical',
          shortDesc: 'Build HTTP web servers, route handling, JWT authentication, and RESTful CRUD endpoints.',
          tip: 'Master Express middleware and how to structure MVC architecture.',
          mentorNote: '90% of technical interviews test whether you can design clean API routes (GET, POST, PUT, DELETE) with status codes.',
          suggestedResources: [
            { name: 'Node.js Official Getting Started Guides', type: 'Official Guides', topic: 'Event loop, asynchronous I/O, and file handling' },
            { name: 'Postman Academy Guided REST Path', type: 'API Testing & Design', topic: 'Designing RESTful request/response cycles' }
          ],
          suggestedSearch: 'Building REST API in Express and Node.js for beginners',
          lessonSteps: [
            { title: 'Creating an Express Endpoint', desc: 'Define routes to accept client requests and return JSON.', code: 'app.post("/api/users", async (req, res) => {\n  const user = await db.create(req.body);\n  res.status(201).json(user);\n});' }
          ],
          quiz: {
            question: 'Which HTTP method should be used to create a new resource on the server?',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
            correctIndex: 1
          }
        },
        {
          skill: 'Database Design (PostgreSQL & MongoDB)',
          yourLevel: 10,
          required: 75,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Schema modeling, relational SQL joins, indexing, and ORMs (Prisma / Mongoose).',
          tip: 'Learn Prisma ORM — it makes database schema updates and queries straightforward.',
          suggestedResources: [
            { name: 'Prisma ORM Quickstart Tutorial', type: 'Interactive ORM Guide', topic: 'Declarative schema modeling and type-safe database queries' },
            { name: 'PostgreSQL Official Documentation', type: 'Reference Guide', topic: 'Relational table normalization and indexing' }
          ],
          suggestedSearch: 'PostgreSQL schema modeling and relations guide'
        }
      ],
      important: [
        {
          skill: 'Git, GitHub & CI/CD Deployment',
          yourLevel: 25,
          required: 80,
          time: '1 week',
          priority: 'Important',
          shortDesc: 'Branching, PRs, resolving merge conflicts, and deploying to GitHub Pages/Vercel.',
          tip: 'Ensure your GitHub profile showcases clear READMEs and live deployment links.',
          suggestedResources: [
            { name: 'GitHub Skills Interactive Courses', type: 'Interactive Labs', topic: 'Branching, pull request reviews, and Actions pipelines' }
          ],
          suggestedSearch: 'Git branch and PR workflow team best practices'
        },
        {
          skill: 'Authentication & Web Security (JWT, OAuth)',
          yourLevel: 5,
          required: 70,
          time: '2 weeks',
          priority: 'Important',
          shortDesc: 'Cookies, tokens, password hashing with bcrypt, CORS, and SQL injection prevention.',
          suggestedResources: [
            { name: 'OWASP Web Security Fundamentals', type: 'Industry Standard', topic: 'Securing cookies, preventing XSS, and CSRF protection' }
          ],
          suggestedSearch: 'Secure JWT authentication in Node and React'
        }
      ],
      niceToHave: [
        {
          skill: 'TypeScript Basics',
          yourLevel: 0,
          required: 60,
          time: '2 weeks',
          priority: 'Nice to Have',
          shortDesc: 'Add type safety to prevent JavaScript runtime bugs before shipping.',
          suggestedResources: [
            { name: 'TypeScript Handbook by Microsoft', type: 'Interactive Handbook', topic: 'Interfaces, generics, and union types' }
          ],
          suggestedSearch: 'TypeScript for React developers quickstart'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Frontend & Modern React Mastery',
        days: [
          { day: 'Mon', task: 'Setup Vite + React + Tailwind CSS project (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Build interactive UI components with useState & props (2 hrs)', done: false },
          { day: 'Wed', task: 'Fetch data from an API using useEffect (2 hrs)', done: false },
          { day: 'Thu', task: 'Handle loading spinners, error banners & empty states (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Mini project: Build a responsive Search & Filter app (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Node.js & Express REST Backend',
        days: [
          { day: 'Mon', task: 'Initialize Node.js + Express server & test with Postman (2 hrs)', done: false },
          { day: 'Tue', task: 'Create CRUD routes (GET, POST, PUT, DELETE) (2 hrs)', done: false },
          { day: 'Wed', task: 'Add request validation and custom error middleware (1.5 hrs)', done: false },
          { day: 'Thu', task: 'Connect PostgreSQL or MongoDB using Prisma/Mongoose (2 hrs)', done: false },
          { day: 'Fri', task: 'Connect React frontend to your Express backend (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Auth, Deployment & Full Stack Polish',
        days: [
          { day: 'Mon', task: 'Implement password hashing (bcrypt) & JWT login flow (2 hrs)', done: false },
          { day: 'Tue', task: 'Protect private routes on both server and client (2 hrs)', done: false },
          { day: 'Wed', task: 'Deploy backend to Render & frontend to GitHub Pages (2 hrs)', done: false },
          { day: 'Thu', task: 'Polish GitHub README with architecture diagram & screenshots (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Full Stack mock interview practice (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'Explain how the virtual DOM works in React and why it improves performance.',
        type: 'Technical',
        keywords: ['virtual dom', 'dom', 'reconciliation', 'diff', 'diffing', 'render', 're-render', 'batch', 'performance'],
        rubric: ['Explains real DOM vs Virtual DOM', 'Mentions diffing algorithm and reconciliation', 'Explains batching DOM updates'],
        idealAnswer: 'The Virtual DOM is a lightweight JavaScript representation of the actual DOM in memory. When state changes, React creates a new Virtual DOM tree, compares (diffs) it against the previous one through reconciliation, and computes the minimal set of changes needed. It then applies these in a single batch to the real DOM, avoiding expensive layout reflows.'
      },
      {
        id: 2,
        question: 'Walk me through how you would architect a secure user authentication system from frontend to database.',
        type: 'System Design',
        keywords: ['hash', 'bcrypt', 'salt', 'jwt', 'token', 'cookie', 'httponly', 'password', 'secure'],
        rubric: ['Mentions password hashing with salt (e.g. bcrypt)', 'Explains JWT or session tokens', 'Covers token storage in httpOnly cookies', 'Discusses expired token handling'],
        idealAnswer: 'On registration, user passwords must be hashed with a unique salt using bcrypt before database storage. On login, credentials are verified and a signed JWT containing user claims is issued. For security, store tokens in httpOnly, SameSite cookies to protect against XSS. API endpoints validate the token via middleware on incoming requests.'
      },
      {
        id: 3,
        question: 'Tell me about a challenging bug you encountered in a project and how you diagnosed and resolved it.',
        type: 'Behavioral',
        keywords: ['situation', 'problem', 'bug', 'debug', 'devtools', 'network', 'console', 'fixed', 'resolved', 'learned'],
        rubric: ['Structured with STAR method (Situation, Task, Action, Result)', 'Mentions debugging tools (DevTools, console, network tab)', 'Highlights personal problem-solving skill'],
        idealAnswer: 'In a recent application, users experienced stale state when rapidly filtering products. I opened Chrome DevTools Network tab and found race conditions where older asynchronous fetch responses resolved after newer ones. I resolved this by utilizing AbortController to cancel in-flight requests when a new filter is selected, guaranteeing up-to-date results.'
      }
    ]
  },

  // 2. HEALTHCARE DATA ANALYST
  healthcare: {
    title: 'Healthcare Data Analyst',
    overview: 'Analyze patient outcomes, hospital operational efficiency, clinical quality metrics, and healthcare compliance using SQL, Excel, and HIPAA-compliant data pipelines.',
    portfolioProjects: [
      {
        id: 'hc-proj-1',
        title: 'Hospital Readmission & Patient Risk Predictor Dashboard',
        difficulty: 'Intermediate',
        timeToBuild: '2 weeks',
        coversGaps: ['Healthcare SQL & Patient Data Extraction', 'Clinical Quality Dashboards (Tableau/Power BI)', 'HIPAA & Healthcare Data Privacy'],
        description: 'An executive clinical dashboard tracking 30-day hospital readmissions, bed occupancy, and patient length-of-stay metrics.',
        whyRecruitersLoveIt: 'Shows you understand healthcare operations, ICD-10 diagnosis codes, and how hospitals avoid CMS readmission penalties.',
        techStack: ['SQL / BigQuery', 'Power BI / Tableau', 'Excel Advanced', 'Synthea Synthetic Patient Data'],
        keyFeatures: [
          '30-day readmission rate tracking categorized by primary ICD-10 diagnosis',
          'Bed utilization rate forecast by department (ICU, ER, General Ward)',
          'Patient de-identification pipeline following HIPAA Safe Harbor rules'
        ],
        githubTemplate: 'https://github.com/topics/healthcare-analytics'
      },
      {
        id: 'hc-proj-2',
        title: 'Clinical Trial Patient Retention & Drug Efficacy Analysis',
        difficulty: 'Advanced',
        timeToBuild: '3 weeks',
        coversGaps: ['Biostatistics & Medical Metrics', 'Python for Health Data Analysis', 'Clinical Quality Dashboards (Tableau/Power BI)'],
        description: 'Analyzes patient drop-off curves and side-effect reporting across clinical trial cohorts using synthetic medical datasets.',
        whyRecruitersLoveIt: 'Proves biostatistical proficiency (survival curves, adverse event incidence rates) needed for pharmaceutical and health-tech teams.',
        techStack: ['Python', 'Pandas', 'Lifelines / SciPy', 'Tableau Public'],
        keyFeatures: [
          'Survival analysis tracking patient retention over 180-day trials',
          'Adverse drug reaction heatmaps cross-referenced by age cohorts',
          'Automated data cleaning for missing patient check-in records'
        ],
        githubTemplate: 'https://github.com/topics/health-data-science'
      }
    ],
    skills: {
      critical: [
        {
          skill: 'Healthcare SQL & Patient Data Extraction',
          yourLevel: 15,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Extract and query Electronic Health Records (EHR) and claims data using relational SQL.',
          tip: 'Practice using Synthea — a free open-source synthetic medical patient database.',
          mentorNote: 'Healthcare interviews heavily test querying longitudinal patient history (e.g. patients diagnosed with Diabetes who had an ER visit within 90 days).',
          suggestedResources: [
            { name: 'Synthea Open Synthetic Patient Data Generator', type: 'Hands-on Health Dataset', topic: 'Realistic EHR database with ICD-10 and SNOMED codes' },
            { name: 'Mode SQL Tutorial for Health Informatics', type: 'Interactive Querying', topic: 'Complex multi-table queries joining encounters to medications' }
          ],
          suggestedSearch: 'SQL queries for healthcare EHR and claims data analysis'
        },
        {
          skill: 'Clinical Quality Dashboards (Tableau/Power BI)',
          yourLevel: 10,
          required: 75,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Visualize hospital KPIs: bed turnover, readmission rates, and ER wait times.',
          tip: 'Build one clean dashboard visualizing CMS (Centers for Medicare & Medicaid) quality metrics.',
          suggestedResources: [
            { name: 'CMS.gov Hospital Quality Data Portal', type: 'Public Health Datasets', topic: 'Real Medicare readmission and patient satisfaction data' },
            { name: 'Tableau Public Healthcare Gallery', type: 'Design Inspiration', topic: 'Clinical dashboard templates and executive scorecards' }
          ],
          suggestedSearch: 'Hospital KPI dashboard design Tableau Power BI'
        },
        {
          skill: 'HIPAA & Healthcare Data Privacy',
          yourLevel: 20,
          required: 85,
          time: '1 week',
          priority: 'Critical',
          shortDesc: 'Master Protected Health Information (PHI) compliance and Safe Harbor de-identification.',
          tip: 'Understand the 18 HIPAA identifiers that must be removed before data can be shared.',
          suggestedResources: [
            { name: 'HHS.gov HIPAA Privacy Rule Guidance', type: 'Official US Dept of Health', topic: 'De-identification methods and Safe Harbor standard' }
          ],
          suggestedSearch: 'HIPAA compliance rules for healthcare data analysts'
        }
      ],
      important: [
        {
          skill: 'Medical Terminology & Coding (ICD-10, CPT)',
          yourLevel: 10,
          required: 70,
          time: '2 weeks',
          priority: 'Important',
          shortDesc: 'Know how diagnoses (ICD-10) and medical procedures (CPT) are structured in claims.',
          suggestedResources: [
            { name: 'WHO ICD-10 Interactive Browser', type: 'Classification Reference', topic: 'Disease classification hierarchies' }
          ],
          suggestedSearch: 'Guide to ICD-10 and CPT codes for data analysts'
        },
        {
          skill: 'Python for Health Data Analysis',
          yourLevel: 5,
          required: 65,
          time: '4 weeks',
          priority: 'Important',
          shortDesc: 'Automate cohort selection and calculate patient metrics using Pandas.',
          suggestedResources: [
            { name: 'Kaggle Health & Medical Datasets', type: 'Interactive Notebooks', topic: 'Analyzing patient lengths-of-stay and vitals' }
          ],
          suggestedSearch: 'Python pandas healthcare analysis tutorial'
        }
      ],
      niceToHave: [
        {
          skill: 'Biostatistics & Health Economics Basics',
          yourLevel: 0,
          required: 50,
          time: '3 weeks',
          priority: 'Nice to Have',
          shortDesc: 'Odds ratios, relative risk, and cost-effectiveness calculations.',
          suggestedResources: [
            { name: 'Johns Hopkins Public Health Coursework', type: 'Free Course Materials', topic: 'Epidemiological measures and risk calculations' }
          ],
          suggestedSearch: 'Biostatistics fundamentals relative risk odds ratio'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Healthcare Data & SQL Fundamentals',
        days: [
          { day: 'Mon', task: 'Study EHR structure: Patients, Encounters, Diagnoses, Medications (2 hrs)', done: false },
          { day: 'Tue', task: 'Download Synthea synthetic patient dataset into SQLite/Postgres (2 hrs)', done: false },
          { day: 'Wed', task: 'Write SQL query to find patients with hypertension and diabetes (2 hrs)', done: false },
          { day: 'Thu', task: 'Calculate 30-day readmission rate per hospital department in SQL (2 hrs)', done: false },
          { day: 'Fri', task: 'Review the 18 HIPAA Safe Harbor identifiers (1.5 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Clinical Quality & Executive Dashboards',
        days: [
          { day: 'Mon', task: 'Connect Tableau / Power BI to patient encounters table (1.5 hrs)', done: false },
          { day: 'Tue', task: 'Build KPI cards: Total Admissions, Average Length of Stay (2 hrs)', done: false },
          { day: 'Wed', task: 'Create readmission rate trend chart by month and diagnosis (2 hrs)', done: false },
          { day: 'Thu', task: 'Add interactive department and age group filter drill-downs (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Publish Hospital Readmissions portfolio dashboard (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Claims Analysis & Mock Interviews',
        days: [
          { day: 'Mon', task: 'Learn billing claims structure and CPT procedure code mappings (2 hrs)', done: false },
          { day: 'Tue', task: 'Analyze denied claims in Python to find root causes (2 hrs)', done: false },
          { day: 'Wed', task: 'Draft executive summary report with recommendations for hospital VP (2 hrs)', done: false },
          { day: 'Thu', task: 'Upload project repo and write healthcare methodology README (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Complete Healthcare Analyst mock interview practice (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'How do you ensure Protected Health Information (PHI) is kept secure and compliant with HIPAA when preparing datasets for analysis?',
        type: 'Compliance & Ethics',
        keywords: ['hipaa', 'phi', 'de-identify', 'safe harbor', 'identifiers', 'encrypt', 'encryption', 'access control', 'compliance'],
        rubric: ['Identifies PHI and the 18 Safe Harbor direct identifiers', 'Mentions de-identification and data masking', 'Covers encryption in transit/at rest and role-based access'],
        idealAnswer: 'To ensure HIPAA compliance, I adhere to the Safe Harbor method by removing or masking all 18 direct identifiers—including patient names, precise dates, SSNs, and medical record numbers. Data must remain encrypted both at rest and in transit. Access is strictly controlled via role-based permissions, and only the minimum necessary dataset is pulled for the analytical scope.'
      },
      {
        id: 2,
        question: 'A chief medical officer asks why the 30-day hospital readmission rate spiked by 12% last month. How do you investigate this?',
        type: 'Case Study',
        keywords: ['diagnosis', 'cohort', 'department', 'discharge', 'follow-up', 'icd', 'seasonality', 'medication', 'root cause'],
        rubric: ['Segments readmissions by department and primary diagnosis (ICD-10)', 'Checks for discharge process or medication reconciliation changes', 'Investigates external factors like community viral outbreaks or bed capacity'],
        idealAnswer: 'I would break down the 12% spike across three key dimensions: 1) Clinical: filter by ICD-10 diagnosis to see if a specific condition (e.g. Congestive Heart Failure or pneumonia) drove the increase; 2) Operational: review discharge protocol changes, staffing ratios, and average length of stay; 3) Follow-up care: check if outpatient follow-up appointment compliance dropped.'
      },
      {
        id: 3,
        question: 'How do you calculate a hospital 30-day readmission metric in SQL?',
        type: 'Technical SQL',
        keywords: ['lead', 'lag', 'window', 'join', 'datediff', 'admission', 'discharge', '30 days', 'patient_id'],
        rubric: ['Explains joining patient visits on patient_id', 'Uses window function (LEAD/LAG) or self-join to compare consecutive visits', 'Filters where next admission date minus current discharge date is between 1 and 30 days'],
        idealAnswer: 'Using a window function like LEAD(admission_date) OVER (PARTITION BY patient_id ORDER BY admission_date), I can find the patient next hospital visit. Then I calculate DATEDIFF between the subsequent admission date and the current discharge date. If that difference is between 1 and 30 days, it is flagged as a 30-day readmission.'
      }
    ]
  },

  // 3. DATA ANALYST (GENERAL)
  data: {
    title: 'Data Analyst',
    overview: 'Extract business insights from raw data using SQL, Python/Excel, and modern dashboards.',
    portfolioProjects: [
      {
        id: 'data-proj-1',
        title: 'Customer Churn & Retention Diagnostic Dashboard',
        difficulty: 'Intermediate',
        timeToBuild: '2 weeks',
        coversGaps: ['SQL & Data Querying', 'Data Visualization (Power BI / Tableau)'],
        description: 'An interactive executive dashboard showing subscriber churn rates, customer lifetime value (LTV), and drop-off cohorts.',
        whyRecruitersLoveIt: 'Shows you understand how data connects directly to revenue, profit margins, and executive business decisions.',
        techStack: ['PostgreSQL', 'Tableau Public / Power BI', 'Excel'],
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
          skill: 'SQL & Data Querying',
          yourLevel: 15,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Extract and transform data using SELECT, GROUP BY, and JOINs.',
          tip: 'Start with MODE SQL Tutorial — free and beginner-friendly',
          mentorNote: 'For interviews, 90% of questions test just SELECT, WHERE, GROUP BY, and JOINs.',
          suggestedResources: [
            { name: 'Mode Analytics Interactive SQL School', type: 'Hands-on Sandbox', topic: 'SQL querying fundamentals and aggregations' }
          ],
          suggestedSearch: 'SQL tutorial for data analysis beginner'
        },
        {
          skill: 'Data Visualization (Power BI / Tableau)',
          yourLevel: 10,
          required: 70,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Turn numbers into executive charts and dashboards.',
          suggestedResources: [
            { name: 'Microsoft Power BI Guided Learning', type: 'Official Guides', topic: 'Creating interactive reports and DAX formulas' }
          ],
          suggestedSearch: 'Power BI beginner dashboard tutorial'
        }
      ],
      important: [
        {
          skill: 'Python for Data Analysis (Pandas)',
          yourLevel: 5,
          required: 75,
          time: '4 weeks',
          priority: 'Important',
          shortDesc: 'Clean messy spreadsheets and run automated analysis.',
          suggestedResources: [
            { name: 'Kaggle Learn - Pandas', type: 'Interactive Notebooks', topic: 'DataFrame indexing, grouping, and aggregations' }
          ],
          suggestedSearch: 'Pandas data analysis crash course'
        }
      ],
      niceToHave: [
        {
          skill: 'Statistical Analysis & A/B Testing',
          yourLevel: 5,
          required: 65,
          time: '3 weeks',
          priority: 'Nice to Have',
          shortDesc: 'Understand averages, standard deviation, and hypothesis testing.',
          suggestedResources: [
            { name: 'Khan Academy: College Statistics', type: 'Self-paced exercises', topic: 'Hypothesis testing, p-values, and distributions' }
          ],
          suggestedSearch: 'Statistics for data analysts made simple'
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'SQL & Database Foundations',
        days: [
          { day: 'Mon', task: 'Complete MODE SQL Tutorial: Basics (2 hrs)', done: false },
          { day: 'Tue', task: 'Practice SELECT, WHERE, GROUP BY (1.5 hrs)', done: false },
          { day: 'Wed', task: 'JOINs deep dive — inner, left, right (2 hrs)', done: false },
          { day: 'Thu', task: 'Window functions: ROW_NUMBER, RANK (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Mini project: Analyze a sample business dataset (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Executive Dashboards with Tableau',
        days: [
          { day: 'Mon', task: 'Tableau / Power BI installation & data import (1 hr)', done: false },
          { day: 'Tue', task: 'Build your first executive KPI dashboard (2 hrs)', done: false },
          { day: 'Wed', task: 'Advanced charts: scatter plots & time trends (2 hrs)', done: false },
          { day: 'Thu', task: 'Write an executive summary report from findings (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Publish your portfolio project on GitHub (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Python Analytics & Mock Practice',
        days: [
          { day: 'Mon', task: 'Python basics: data types, lists, dictionaries (2 hrs)', done: false },
          { day: 'Tue', task: 'Pandas: DataFrames, read_csv, filtering (2 hrs)', done: false },
          { day: 'Wed', task: 'Data cleaning: handle nulls, duplicates, formatting (1.5 hrs)', done: false },
          { day: 'Thu', task: 'Data aggregation & groupby metrics (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Complete Data Analyst mock interview practice (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'Walk me through a time you used data to influence a business decision.',
        type: 'Behavioral',
        keywords: ['situation', 'metric', 'revenue', 'data', 'analysis', 'stakeholder', 'decision', 'result', 'impact'],
        rubric: ['Clear situation setup', 'Specific data mentioned', 'Measurable outcome', 'Personal contribution'],
        idealAnswer: 'At my previous role, I noticed high customer drop-off on our pricing page. I ran a cohort analysis showing users on mobile converted 40% lower than desktop. I shared these findings with the product manager, leading to a streamlined mobile checkout that improved overall conversions by 18%.'
      },
      {
        id: 2,
        question: 'What is the difference between a LEFT JOIN and an INNER JOIN in SQL? Give an example.',
        type: 'Technical SQL',
        keywords: ['inner', 'left', 'null', 'match', 'table', 'rows', 'both'],
        rubric: ['Correct definition of both joins', 'Explains NULL values for non-matching rows in LEFT JOIN', 'Provides clear practical example'],
        idealAnswer: 'An INNER JOIN returns only records that have matching values in both tables. A LEFT JOIN returns all records from the left table, along with matched records from the right table—filling in NULLs for any right-table columns where there is no match. For example, joining Customers to Orders with a LEFT JOIN ensures customers who have placed zero orders are still included.'
      }
    ]
  }
};

export function getRoleKey(roleString) {
  if (!roleString) return 'fullstack';
  const lower = roleString.toLowerCase();
  if (lower.includes('health') || lower.includes('clinic') || lower.includes('care') || lower.includes('med')) {
    return 'healthcare';
  }
  if (lower.includes('data') || lower.includes('analyst') || lower.includes('business intelligence') || lower.includes('bi')) {
    return 'data';
  }
  return 'fullstack';
}
