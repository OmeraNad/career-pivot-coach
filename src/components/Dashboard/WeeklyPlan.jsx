import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertOctagon, CheckCircle2, Circle, RefreshCw } from 'lucide-react';

const INITIAL_PLAN = [
  {
    week: 1, title: 'SQL Foundations',
    days: [
      { day: 'Mon', task: 'Complete MODE SQL Tutorial: Basics (2 hrs)', done: true },
      { day: 'Tue', task: 'Practice SELECT, WHERE, GROUP BY (1.5 hrs)', done: true },
      { day: 'Wed', task: 'JOINs deep dive — inner, left, right (2 hrs)', done: false },
      { day: 'Thu', task: 'Window functions: ROW_NUMBER, RANK (1.5 hrs)', done: false },
      { day: 'Fri', task: 'Mini project: Analyze a sample dataset (2 hrs)', done: false },
    ],
  },
  {
    week: 2, title: 'Python for Data',
    days: [
      { day: 'Mon', task: 'Python basics: data types, loops, functions (2 hrs)', done: false },
      { day: 'Tue', task: 'Pandas: DataFrames, read_csv, head, describe (2 hrs)', done: false },
      { day: 'Wed', task: 'Data cleaning: nulls, duplicates, dtypes (1.5 hrs)', done: false },
      { day: 'Thu', task: 'Matplotlib: basic charts and plots (1.5 hrs)', done: false },
      { day: 'Fri', task: 'Mini project: Clean and visualize a dataset (2 hrs)', done: false },
    ],
  },
  {
    week: 3, title: 'Data Visualization',
    days: [
      { day: 'Mon', task: 'Tableau Public install + connect to data (1 hr)', done: false },
      { day: 'Tue', task: 'Build your first dashboard (2 hrs)', done: false },
      { day: 'Wed', task: 'Advanced charts: scatter, heat map, treemap (2 hrs)', done: false },
      { day: 'Thu', task: 'Storytelling with data — best practices (1.5 hrs)', done: false },
      { day: 'Fri', task: 'Publish a portfolio dashboard (2 hrs)', done: false },
    ],
  },
];

export default function WeeklyPlan() {
  const { t } = useTranslation();
  const [plan, setPlan] = useState(INITIAL_PLAN);
  const [expanded, setExpanded] = useState(0);
  const [replanning, setReplanning] = useState(false);
  const [replanned, setReplanned] = useState(false);

  const toggleTask = (wi, di) => {
    setPlan((prev) => prev.map((w, wIdx) => wIdx !== wi ? w : {
      ...w, days: w.days.map((d, dIdx) => dIdx !== di ? d : { ...d, done: !d.done })
    }));
  };

  const handleReplan = () => {
    setReplanning(true);
    setTimeout(() => { setReplanning(false); setReplanned(true); }, 2000);
  };

  const totalDays = plan.flatMap((w) => w.days).length;
  const doneDays = plan.flatMap((w) => w.days).filter((d) => d.done).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{t('weeklyPlan.title')}</h1>
          <p className="text-slate-400 text-sm">{t('weeklyPlan.subtitle')}</p>
        </div>
        <button onClick={handleReplan} disabled={replanning}
          className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 font-semibold px-4 py-2 rounded-xl text-sm transition-all">
          {replanning ? <span className="w-3 h-3 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" /> : <AlertOctagon size={15} />}
          {t('weeklyPlan.stuck')}
        </button>
      </div>

      {replanned && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-center gap-3">
          <RefreshCw size={18} className="text-orange-400" />
          <div>
            <div className="text-orange-300 font-semibold text-sm">Plan Adjusted!</div>
            <div className="text-slate-400 text-xs">We detected you were moving slower on Week 2. We've added more video-based resources and broken tasks into smaller pieces.</div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Overall completion</span>
          <span className="text-white font-semibold">{doneDays}/{totalDays} days</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all"
            style={{ width: `${(doneDays / totalDays) * 100}%` }} />
        </div>
      </div>

      {/* Weeks */}
      {plan.map((week, wi) => {
        const weekDone = week.days.filter((d) => d.done).length;
        const isExpanded = expanded === wi;
        return (
          <div key={week.week} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button onClick={() => setExpanded(isExpanded ? -1 : wi)}
              className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  weekDone === week.days.length ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                }`}>W{week.week}</div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{t('weeklyPlan.week')} {week.week}: {week.title}</div>
                  <div className="text-slate-400 text-xs">{weekDone}/{week.days.length} days complete</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(weekDone / week.days.length) * 100}%` }} />
                </div>
                <span className="text-slate-400 text-xs">{isExpanded ? '▲' : '▼'}</span>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-white/5 divide-y divide-white/5">
                {week.days.map((day, di) => (
                  <div key={di} className="flex items-center gap-4 px-5 py-3 hover:bg-white/3 transition-all">
                    <button onClick={() => toggleTask(wi, di)} className="flex-shrink-0">
                      {day.done
                        ? <CheckCircle2 size={20} className="text-green-400" />
                        : <Circle size={20} className="text-slate-600" />}
                    </button>
                    <div className="flex-1">
                      <span className="text-purple-400 text-xs font-semibold mr-2">{day.day}</span>
                      <span className={`text-sm ${day.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{day.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
