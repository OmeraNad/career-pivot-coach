export const ROLE_DATA = {
  // 1. FULL STACK DEVELOPER / SOFTWARE ENGINEER
  fullstack: {
    title: 'Full Stack Developer',
    overview: 'Build complete web applications from modern UI (React/Next.js) to server backends (Node.js/Express) and production databases.',
    skills: {
      critical: [
        {
          skill: 'Frontend & Modern React',
          yourLevel: 25,
          required: 85,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Component architecture, State (useState/useEffect), Hooks, and Tailwind CSS.',
          tip: 'Build a real CRUD app (like a Task Manager or E-commerce cart) rather than watching endless tutorials.',
          mentorNote: 'Recruiters want to see that you can fetch data from an API, handle loading and error states cleanly, and render responsive UI.',
          videos: [
            { title: 'React JS Full Course 2026', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: '12 hrs (Focus on core hooks)' },
            { title: 'React in 100 Seconds + Practical Crash Course', source: 'Fireship (YouTube)', url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM', duration: '15 mins' },
            { title: 'Build and Deploy 5 Real React Projects', source: 'JavaScript Mastery (YouTube)', url: 'https://www.youtube.com/results?search_query=javascript+mastery+react+projects', duration: '2 hrs' }
          ],
          courses: [
            { name: 'The Odin Project - Full Stack JavaScript', type: 'Open-Source Curriculum', url: 'https://www.theodinproject.com/', badge: '100% Free' },
            { name: 'FullStackOpen (University of Helsinki)', type: 'Deep Modern Web Development', url: 'https://fullstackopen.com/en/', badge: '100% Free' },
            { name: 'React Official Documentation (Learn by Doing)', type: 'Official Interactive Docs', url: 'https://react.dev/learn', badge: 'Interactive' }
          ],
          lessonSteps: [
            { title: 'State & Reactivity', desc: 'State is memory inside a component that triggers a UI re-render when changed.', code: 'const [items, setItems] = useState([]);\nconst addItem = (item) => setItems([...items, item]);' },
            { title: 'Effects & Async Fetching', desc: 'Fetch data cleanly when the component mounts with proper dependency arrays.', code: 'useEffect(() => {\n  fetch("/api/data").then(r => r.json()).then(setData);\n}, []);' }
          ],
          quiz: {
            question: 'What happens when state is updated using its setter function in React?',
            options: ['The entire browser page refreshes', 'The component re-renders with the new value', 'The database is automatically deleted', 'Nothing until the user clicks save'],
            correctIndex: 1
          }
        },
        {
          skill: 'Node.js, Express & REST APIs',
          yourLevel: 15,
          required: 80,
          time: '4 weeks',
          priority: 'Critical',
          shortDesc: 'Build HTTP web servers, route handling, JWT authentication, and RESTful CRUD endpoints.',
          tip: 'Master Express middleware and how to structure MVC (Models, Controllers, Routes).',
          mentorNote: '90% of technical interviews test whether you can design clean API routes (GET, POST, PUT, DELETE) with status codes (200, 201, 400, 404, 500).',
          videos: [
            { title: 'Node.js and Express.js - Full Course', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', duration: '8 hrs' },
            { title: 'Build a REST API from scratch in 30 mins', source: 'Web Dev Simplified (YouTube)', url: 'https://www.youtube.com/watch?v=fgTGADljAeg', duration: '30 mins' }
          ],
          courses: [
            { name: 'Node.js Official Getting Started Guides', type: 'Official Guides', url: 'https://nodejs.org/en/learn', badge: '100% Free' },
            { name: 'Postman Student Expert Certification', type: 'API Testing & Design', url: 'https://academy.postman.com/', badge: 'Free Badge' }
          ],
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
          yourLevel: 20,
          required: 75,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Schema modeling, relational SQL joins, indexing, and ORMs (Prisma / Mongoose).',
          tip: 'Learn how to use Prisma ORM — it provides type-safety and makes database work intuitive.',
          mentorNote: 'Never store plain text passwords. Always hash with bcrypt, and understand 1-to-many vs many-to-many relationships.',
          videos: [
            { title: 'SQL vs NoSQL Explained in 100 Seconds', source: 'Fireship (YouTube)', url: 'https://www.youtube.com/watch?v=QwevGzVu_dc', duration: '2 mins' },
            { title: 'PostgreSQL Tutorial for Beginners', source: 'Amigoscode (YouTube)', url: 'https://www.youtube.com/results?search_query=postgresql+tutorial+for+beginners', duration: '2 hrs' }
          ],
          courses: [
            { name: 'Prisma ORM Quickstart Tutorial', type: 'Interactive ORM Guide', url: 'https://www.prisma.io/docs/getting-started', badge: '100% Free' },
            { name: 'MongoDB University Free Developer Path', type: 'Official Certification Course', url: 'https://learn.mongodb.com/', badge: '100% Free' }
          ]
        }
      ],
      important: [
        {
          skill: 'Git, GitHub & CI/CD Deployment',
          yourLevel: 45,
          required: 80,
          time: '1 week',
          priority: 'Important',
          shortDesc: 'Branching, PRs, resolving merge conflicts, and deploying to Vercel/Render.',
          tip: 'Make sure your GitHub profile shows green commit squares and meaningful commit messages.',
          mentorNote: 'A recruiter judges a junior engineer in 10 seconds by looking at their pinned GitHub repositories and live demo links.',
          videos: [
            { title: 'Git and GitHub for Beginners - Crash Course', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', duration: '1 hr' }
          ],
          courses: [
            { name: 'GitHub Skills: First Day on GitHub', type: 'Hands-on Repository Practice', url: 'https://skills.github.com/', badge: '100% Free' }
          ]
        },
        {
          skill: 'Authentication & Web Security (JWT, OAuth)',
          yourLevel: 10,
          required: 70,
          time: '2 weeks',
          priority: 'Important',
          shortDesc: 'Cookies, tokens, password hashing, CORS, and SQL injection prevention.',
          tip: 'Understand how access tokens and refresh tokens work to keep users logged in securely.',
          videos: [
            { title: 'JWT Authentication Tutorial', source: 'Web Dev Simplified (YouTube)', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration: '20 mins' }
          ]
        }
      ],
      niceToHave: [
        {
          skill: 'TypeScript Basics',
          yourLevel: 5,
          required: 60,
          time: '2 weeks',
          priority: 'Nice to Have',
          shortDesc: 'Add type safety to prevent JavaScript runtime bugs before shipping.',
          tip: 'Most tech startups in 2026 write TypeScript. Learning interfaces and types puts you ahead of 70% of junior candidates.',
          videos: [
            { title: 'TypeScript Course for Beginners', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', duration: '1.5 hrs' }
          ]
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'Frontend & Modern React Mastery',
        days: [
          { day: 'Mon', task: 'Setup Vite + React + Tailwind CSS project (1.5 hrs)', done: true },
          { day: 'Tue', task: 'Build interactive UI components with useState & props (2 hrs)', done: true },
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
          { day: 'Wed', task: 'Deploy backend to Render/Railway & frontend to Vercel/GitHub Pages (2 hrs)', done: false },
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
        rubric: ['Explains real DOM vs Virtual DOM', 'Mentions diffing algorithm and reconciliation', 'Explains batching DOM updates']
      },
      {
        id: 2,
        question: 'Walk me through how you would architect a secure user authentication system from frontend to database.',
        type: 'System Design',
        rubric: ['Mentions password hashing with salt', 'Explains JWT or session tokens', 'Covers token storage (httpOnly cookies)', 'Discusses expired token handling']
      },
      {
        id: 3,
        question: 'Tell me about a challenging bug you encountered in a project and how you diagnosed and resolved it.',
        type: 'Behavioral',
        rubric: ['Structured with STAR method', 'Mentions debugging tools (DevTools, console, network tab)', 'Highlights personal problem-solving skill']
      }
    ]
  },

  // 2. DATA ANALYST
  data: {
    title: 'Data Analyst',
    overview: 'Extract business insights from raw data using SQL, Python/Excel, and modern dashboards.',
    skills: {
      critical: [
        {
          skill: 'SQL & Data Querying',
          yourLevel: 20,
          required: 80,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Extract and transform data using SELECT, GROUP BY, and JOINs.',
          tip: 'Start with MODE SQL Tutorial — free and beginner-friendly',
          mentorNote: 'For interviews, 90% of questions test just SELECT, WHERE, GROUP BY, and JOINs.',
          videos: [
            { title: 'SQL Tutorial - Full Database Course for Beginners', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4', duration: '4.5 hrs' },
            { title: 'Learn SQL in 60 Minutes', source: 'Web Dev Simplified (YouTube)', url: 'https://www.youtube.com/watch?v=p3qvj9hO_Bo', duration: '60 mins' }
          ],
          courses: [
            { name: 'Mode Analytics Interactive SQL School', type: 'Hands-on Sandbox', url: 'https://mode.com/sql-tutorial/', badge: '100% Free' },
            { name: 'SQLBolt - Interactive Lessons', type: 'Interactive', url: 'https://sqlbolt.com/', badge: '100% Free' }
          ]
        },
        {
          skill: 'Python for Data Analysis (Pandas)',
          yourLevel: 10,
          required: 75,
          time: '4 weeks',
          priority: 'Critical',
          shortDesc: 'Clean messy spreadsheets and run automated analysis.',
          tip: 'Use Kaggle Learn — free bite-sized lessons with live Jupyter notebooks',
          videos: [
            { title: 'Pandas Data Analysis Tutorial', source: 'Keith Galli (YouTube)', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration: '1 hr' }
          ],
          courses: [
            { name: 'Kaggle Learn - Pandas & Python', type: 'Interactive Notebooks', url: 'https://www.kaggle.com/learn/pandas', badge: '100% Free' }
          ]
        },
        {
          skill: 'Data Visualization (Power BI / Tableau)',
          yourLevel: 15,
          required: 70,
          time: '3 weeks',
          priority: 'Critical',
          shortDesc: 'Turn numbers into executive charts and dashboards.',
          tip: 'Tableau Public and Power BI Desktop are completely free.',
          videos: [
            { title: 'Tableau for Beginners - Step by Step', source: 'Alex The Analyst (YouTube)', url: 'https://www.youtube.com/watch?v=TPPlX_JbTj8', duration: '50 mins' }
          ],
          courses: [
            { name: 'Microsoft Power BI Guided Learning', type: 'Official Guides', url: 'https://learn.microsoft.com/en-us/power-bi/', badge: '100% Free' }
          ]
        }
      ],
      important: [
        {
          skill: 'Statistical Analysis & A/B Testing',
          yourLevel: 30,
          required: 65,
          time: '3 weeks',
          priority: 'Important',
          shortDesc: 'Understand averages, standard deviation, and hypothesis testing.',
          tip: 'Khan Academy Statistics builds visual intuition.',
          videos: [{ title: 'Statistics for Data Science', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration: '8 hrs' }]
        }
      ],
      niceToHave: [
        {
          skill: 'Machine Learning Basics',
          yourLevel: 5,
          required: 40,
          time: '4 weeks',
          priority: 'Nice to Have',
          shortDesc: 'High-level knowledge of regression and clustering.',
          videos: [{ title: 'Machine Learning for Everybody', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', duration: '3 hrs' }]
        }
      ]
    },
    weeklyPlan: [
      {
        week: 1, title: 'SQL & Database Foundations',
        days: [
          { day: 'Mon', task: 'Complete MODE SQL Tutorial: Basics (2 hrs)', done: true },
          { day: 'Tue', task: 'Practice SELECT, WHERE, GROUP BY (1.5 hrs)', done: true },
          { day: 'Wed', task: 'JOINs deep dive — inner, left, right (2 hrs)', done: false },
          { day: 'Thu', task: 'Window functions: ROW_NUMBER, RANK (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Mini project: Analyze a sample business dataset (2 hrs)', done: false }
        ]
      },
      {
        week: 2, title: 'Python for Data Analysis with Pandas',
        days: [
          { day: 'Mon', task: 'Python basics: data types, lists, dictionaries (2 hrs)', done: false },
          { day: 'Tue', task: 'Pandas: DataFrames, read_csv, filtering (2 hrs)', done: false },
          { day: 'Wed', task: 'Data cleaning: handle nulls, duplicates, formatting (1.5 hrs)', done: false },
          { day: 'Thu', task: 'Data aggregation & groupby metrics (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Mini project: Clean and summarize messy sales data (2 hrs)', done: false }
        ]
      },
      {
        week: 3, title: 'Executive Dashboards & Storytelling',
        days: [
          { day: 'Mon', task: 'Tableau / Power BI installation & data import (1 hr)', done: false },
          { day: 'Tue', task: 'Build your first executive KPI dashboard (2 hrs)', done: false },
          { day: 'Wed', task: 'Advanced charts: scatter plots & time trends (2 hrs)', done: false },
          { day: 'Thu', task: 'Write an executive summary report from findings (1.5 hrs)', done: false },
          { day: 'Fri', task: 'Publish your portfolio project on GitHub (2 hrs)', done: false }
        ]
      }
    ],
    mockInterview: [
      {
        id: 1,
        question: 'Walk me through a time you used data to influence a business decision.',
        type: 'Behavioral',
        rubric: ['Clear situation setup', 'Specific data mentioned', 'Measurable outcome', 'Personal contribution']
      },
      {
        id: 2,
        question: 'You notice company revenue dropped 15% this week. How would you investigate this anomaly?',
        type: 'Case',
        rubric: ['Structured approach', 'Identifies multiple hypotheses (seasonality, checkout bugs, marketing)', 'Defines validation metrics']
      },
      {
        id: 3,
        question: 'What is the difference between a LEFT JOIN and an INNER JOIN in SQL? Give an example.',
        type: 'Technical',
        rubric: ['Correct definition', 'Explains NULL handling in unmatched rows', 'Practical business example']
      }
    ]
  }
};

export function getRoleKey(roleString) {
  if (!roleString) return 'fullstack';
  const lower = roleString.toLowerCase();
  if (lower.includes('full') || lower.includes('stack') || lower.includes('web') || lower.includes('software') || lower.includes('frontend') || lower.includes('backend') || lower.includes('developer') || lower.includes('engineer')) {
    return 'fullstack';
  }
  if (lower.includes('data') || lower.includes('analyst') || lower.includes('business') || lower.includes('sql') || lower.includes('intelligence')) {
    return 'data';
  }
  return 'fullstack'; // Default to fullstack
}
