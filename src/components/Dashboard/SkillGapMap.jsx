import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Zap, AlertTriangle, Info, BookOpen, PlayCircle, Sparkles } from 'lucide-react';
import SkillLearningModal from './SkillLearningModal';

const INITIAL_SKILLS = {
  critical: [
    {
      skill: 'SQL & Data Querying',
      yourLevel: 20,
      required: 80,
      time: '3 weeks',
      priority: 'Critical',
      shortDesc: 'The #1 required skill for pulling and filtering data from databases.',
      tip: 'Start with MODE SQL Tutorial — free and beginner-friendly',
      mentorNote: 'For interviews, 90% of questions test just SELECT, WHERE, GROUP BY, and JOINs. Don\'t stress database administration — master querying.',
      videos: [
        { title: 'SQL Tutorial - Full Database Course for Beginners', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4', duration: '4.5 hrs (Watch first 1.5 hrs)' },
        { title: 'Learn SQL in 60 Minutes - Crash Course', source: 'Web Dev Simplified (YouTube)', url: 'https://www.youtube.com/watch?v=p3qvj9hO_Bo', duration: '60 mins' },
        { title: 'SQL Joins Explained visually', source: 'Alex The Analyst (YouTube)', url: 'https://www.youtube.com/watch?v=0OQJDd3PtSw', duration: '12 mins' }
      ],
      courses: [
        { name: 'Mode Analytics Interactive SQL School', type: 'Hands-on Browser Sandbox', url: 'https://mode.com/sql-tutorial/', badge: '100% Free' },
        { name: 'SQLBolt - Interactive Lessons', type: 'Instant practice in browser', url: 'https://sqlbolt.com/', badge: '100% Free' },
        { name: 'LeetCode / HackerRank SQL 50', type: 'Interview Question Bank', url: 'https://leetcode.com/studyplan/top-sql-50/', badge: 'Practice' }
      ],
      lessonSteps: [
        { title: 'The Anatomy of a Query', desc: 'Every SQL query extracts specific columns from a table matching conditions.', code: 'SELECT name, salary FROM employees WHERE department = \'Sales\' ORDER BY salary DESC;' },
        { title: 'Aggregations with GROUP BY', desc: 'Compute averages, sums, and counts per category.', code: 'SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department;' },
        { title: 'Joining Tables', desc: 'Connect related tables through foreign keys (e.g. Orders to Customers).', code: 'SELECT o.order_id, c.customer_name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;' }
      ],
      quiz: {
        question: 'Which clause is used to filter records based on aggregated values (e.g., total sales > 5000)?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctIndex: 1
      }
    },
    {
      skill: 'Python for Data Analysis',
      yourLevel: 10,
      required: 75,
      time: '5 weeks',
      priority: 'Critical',
      shortDesc: 'Clean messy spreadsheets, automate calculations, and explore data with Pandas.',
      tip: 'Use Kaggle Learn — free bite-sized lessons with live Jupyter notebooks',
      mentorNote: 'You do not need to become a software engineer. You only need Python as a supercharged Excel calculator: loading data, filtering rows, and grouping.',
      videos: [
        { title: 'Python for Beginners - Full Course', source: 'Programming with Mosh (YouTube)', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', duration: '1 hr basics' },
        { title: 'Pandas Data Analysis Tutorial', source: 'Keith Galli (YouTube)', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration: '1 hr' }
      ],
      courses: [
        { name: 'Kaggle Learn - Pandas & Python', type: 'Interactive Notebooks', url: 'https://www.kaggle.com/learn/pandas', badge: '100% Free' },
        { name: 'freeCodeCamp Data Analysis with Python', type: 'Guided Certification', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', badge: 'Free' }
      ],
      lessonSteps: [
        { title: 'Reading Data into a DataFrame', desc: 'Load CSV files into structured tables using pandas.', code: 'import pandas as pd\ndf = pd.read_csv("sales.csv")\nprint(df.head())' },
        { title: 'Filtering & Selecting', desc: 'Find rows meeting specific criteria.', code: 'high_sales = df[df["revenue"] > 1000]' }
      ],
      quiz: {
        question: 'Which Python library is primarily used for table-like data manipulation?',
        options: ['Pandas', 'Flask', 'Django', 'Pygame'],
        correctIndex: 0
      }
    },
    {
      skill: 'Data Visualization (Tableau/Power BI)',
      yourLevel: 15,
      required: 70,
      time: '3 weeks',
      priority: 'Critical',
      shortDesc: 'Turn numbers into executive charts, dashboards, and visual stories.',
      tip: 'Tableau Public and Power BI Desktop are completely free to build your portfolio.',
      mentorNote: 'Recruiters love dashboards they can click on. Build 1 clean dashboard and paste the link on your resume.',
      videos: [
        { title: 'Power BI Full Course for Beginners', source: 'Edureka / Simplilearn (YouTube)', url: 'https://www.youtube.com/results?search_query=power+bi+beginner+course', duration: '2 hrs' },
        { title: 'Tableau for Beginners - Step by Step', source: 'Alex The Analyst (YouTube)', url: 'https://www.youtube.com/watch?v=TPPlX_JbTj8', duration: '50 mins' }
      ],
      courses: [
        { name: 'Microsoft Power BI Guided Learning', type: 'Official Microsoft Learn Docs', url: 'https://learn.microsoft.com/en-us/power-bi/', badge: '100% Free' },
        { name: 'Tableau Free Starter Training', type: 'Official Tableau Videos', url: 'https://www.tableau.com/learn/training', badge: '100% Free' }
      ],
      lessonSteps: [
        { title: 'Connecting Sources', desc: 'Link Excel spreadsheets or SQL servers directly to the canvas.' },
        { title: 'Choosing the Right Chart', desc: 'Trends over time = Line Chart. Comparisons = Bar Chart. Proportions = Donut or Treemap (avoid busy 3D pie charts).' }
      ],
      quiz: {
        question: 'Which chart type is best for showing how a metric changes continuously over months?',
        options: ['Line Chart', 'Pie Chart', 'Scatter plot', 'Heat map'],
        correctIndex: 0
      }
    }
  ],
  important: [
    {
      skill: 'Statistical Analysis & A/B Testing',
      yourLevel: 30,
      required: 65,
      time: '4 weeks',
      priority: 'Important',
      shortDesc: 'Understand averages, medians, standard deviation, and hypothesis testing.',
      tip: 'Khan Academy Statistics is unmatched for building visual intuition without heavy math.',
      mentorNote: 'Interviews will ask: "How do you know if an increase in clicks was genuine or just luck?" Focus on p-values and sample sizes.',
      videos: [
        { title: 'Statistics - A Full University Course on Data Science Basics', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration: '8 hrs' },
        { title: 'A/B Testing Explained Simply', source: 'YouTube', url: 'https://www.youtube.com/results?search_query=ab+testing+explained+simply', duration: '15 mins' }
      ],
      courses: [
        { name: 'Khan Academy: College Statistics', type: 'Self-paced exercises', url: 'https://www.khanacademy.org/math/statistics-probability', badge: '100% Free' }
      ]
    },
    {
      skill: 'Advanced Excel & Google Sheets',
      yourLevel: 55,
      required: 70,
      time: '2 weeks',
      priority: 'Important',
      shortDesc: 'VLOOKUP / XLOOKUP, Pivot Tables, SUMIFS, and quick analysis.',
      tip: 'You are already close! Focus on dynamic array formulas and cleanup tricks.',
      mentorNote: 'Virtually every company uses spreadsheets for rapid reviews. Knowing XLOOKUP and Pivot Tables makes you look like an instant pro.',
      videos: [
        { title: 'Excel for Beginners to Advanced in 30 Minutes', source: 'Kevin Stratvert (YouTube)', url: 'https://www.youtube.com/watch?v=Vl0H-qTclOg', duration: '30 mins' }
      ],
      courses: [
        { name: 'Excel Easy - Free interactive tutorials', type: 'Step-by-step guides', url: 'https://www.excel-easy.com/', badge: '100% Free' }
      ]
    },
    {
      skill: 'Executive Communication & Storytelling',
      yourLevel: 60,
      required: 75,
      time: '1 week',
      priority: 'Important',
      shortDesc: 'Explain technical findings clearly to non-technical managers and leadership.',
      tip: 'Practice the "Bottom Line Up Front" (BLUF) method: state the conclusion first.',
      mentorNote: 'Hiring managers reject candidates who talk in complex jargon. Speak in terms of business impact: revenue, costs, and customer satisfaction.',
      videos: [
        { title: 'How to Speak with Confidence at Work', source: 'Harvard Business Review (YouTube)', url: 'https://www.youtube.com/results?search_query=hbr+executive+communication', duration: '20 mins' }
      ],
      courses: [
        { name: 'Storytelling With Data Blog & Exercises', type: 'Case Studies', url: 'https://www.storytellingwithdata.com/', badge: 'Free Articles' }
      ]
    }
  ],
  niceToHave: [
    {
      skill: 'Machine Learning Basics',
      yourLevel: 5,
      required: 40,
      time: '6 weeks',
      priority: 'Nice to Have',
      shortDesc: 'High-level knowledge of regression, classification, and clustering.',
      tip: 'Andrew Ng\'s Machine Learning specialization is the gold standard worldwide.',
      mentorNote: 'Don\'t let this delay your applications. Most entry roles rarely need complex ML models on day one.',
      videos: [
        { title: 'Machine Learning for Everybody', source: 'freeCodeCamp (YouTube)', url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', duration: '3 hrs' }
      ],
      courses: [
        { name: 'Google Machine Learning Crash Course', type: 'Guided Labs & Quizzes', url: 'https://developers.google.com/machine-learning/crash-course', badge: '100% Free' }
      ]
    }
  ]
};

function SkillCard({ item, onSelectSkill }) {
  const gap = item.required - item.yourLevel;
  return (
    <div 
      onClick={() => onSelectSkill(item)}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-purple-500/50 hover:bg-white/8 transition-all cursor-pointer group shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors flex items-center gap-2">
            {item.skill}
            <span className="opacity-0 group-hover:opacity-100 text-purple-400 text-xs transition-opacity flex items-center gap-1 font-normal">
              Learn <BookOpen size={13} />
            </span>
          </h4>
          <p className="text-slate-400 text-xs mt-1 line-clamp-1">{item.shortDesc || item.tip}</p>
        </div>
        <span className="text-slate-400 text-xs bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
          ⏱ {item.time}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Current Level: <strong className="text-white">{item.yourLevel}%</strong></span>
          <span>Target: <strong className="text-white">{item.required}%</strong></span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all" 
            style={{ width: `${item.yourLevel}%` }} 
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-orange-400 font-medium">Remaining Gap: {gap > 0 ? `${gap}%` : 'Mastered! 🎉'}</span>
          <span className="text-purple-400 font-semibold group-hover:underline flex items-center gap-1">
            Open Lesson & Videos →
          </span>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-purple-300 flex items-center gap-2">
        <Sparkles size={14} className="text-purple-400 flex-shrink-0" />
        <span className="truncate">{item.tip}</span>
      </div>
    </div>
  );
}

export default function SkillGapMap() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [skillsData, setSkillsData] = useState(INITIAL_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [analyzed, setAnalyzed] = useState(true); // default open so user immediately can start learning!
  const [analyzing, setAnalyzing] = useState(false);
  const [resume, setResume] = useState('');
  const role = user?.prefs?.role || 'Data Analyst';

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { 
      setAnalyzing(false); 
      setAnalyzed(true); 
    }, 1200);
  };

  const handleMarkComplete = (skillName) => {
    // Increase progress for that skill by 20%
    setSkillsData((prev) => {
      const updateGroup = (arr) =>
        arr.map((s) => (s.skill === skillName ? { ...s, yourLevel: Math.min(100, s.yourLevel + 20) } : s));
      return {
        critical: updateGroup(prev.critical),
        important: updateGroup(prev.important),
        niceToHave: updateGroup(prev.niceToHave),
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Explainer */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('skillGap.title')}</h1>
          <p className="text-slate-400 text-sm">
            Click on <strong>any skill card</strong> below to watch top free video tutorials, take crash lessons, and access interactive practice websites!
          </p>
        </div>
        <button
          onClick={() => setAnalyzed(false)}
          className="text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3.5 py-2 rounded-xl transition-all"
        >
          Re-Analyze Resume
        </button>
      </div>

      {!analyzed ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5 animate-fadeIn">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Target Role</label>
            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-300 font-semibold flex items-center gap-2">
              <Search size={16} /> {role}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Paste your resume / background</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={5}
              placeholder="Paste your past experience or courses taken here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none text-sm"
            />
          </div>
          <button 
            onClick={handleAnalyze} 
            disabled={analyzing}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing job descriptions & matching videos...</>
            ) : (
              <><Zap size={18} /> Run Skill Gap & Educational Match</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Summary Pill Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <PlayCircle size={22} />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Learning Center Active</div>
                <div className="text-slate-400 text-xs">Each skill includes verified free videos, sandbox playgrounds, and mini quizzes.</div>
              </div>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-full font-medium">
              Target: {role}
            </span>
          </div>

          {/* Critical */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-red-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.critical')} Skills
                <span className="text-slate-400 text-xs font-normal ml-2">(High priority for interviews — click to start learning)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.critical.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Important */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-yellow-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.important')} Skills
                <span className="text-slate-400 text-xs font-normal ml-2">(Differentiators — gives you an edge over other applicants)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.important.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Nice to have */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-blue-400" />
              <h3 className="text-white font-bold text-base">
                {t('skillGap.niceToHave')}
                <span className="text-slate-400 text-xs font-normal ml-2">(Bonus knowledge — learn after job ready)</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.niceToHave.map((g) => (
                <SkillCard key={g.skill} item={g} onSelectSkill={setSelectedSkill} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal when clicking any skill */}
      {selectedSkill && (
        <SkillLearningModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onMarkComplete={handleMarkComplete}
        />
      )}
    </div>
  );
}
