import { useTranslation } from 'react-i18next';
import { Flame, CheckCircle, BookOpen, TrendingUp } from 'lucide-react';

const SKILLS_DONE = [
  { name: 'SQL Basics', date: 'Oct 28' },
  { name: 'Python Fundamentals', date: 'Oct 24' },
  { name: 'Excel Advanced', date: 'Oct 20' },
];

const WEEKLY_DATA = [40, 65, 55, 80, 70, 90, 45];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ProgressTracker() {
  const { t } = useTranslation();

  const stats = [
    { icon: TrendingUp, label: t('progress.overall'), value: '42%', color: 'purple' },
    { icon: Flame, label: t('progress.streak'), value: '7 days', color: 'orange' },
    { icon: CheckCircle, label: t('progress.completed'), value: '14', color: 'green' },
    { icon: BookOpen, label: t('progress.skillsLearned'), value: '3', color: 'blue' },
  ];

  const colorMap = {
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  };

  const maxVal = Math.max(...WEEKLY_DATA);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">{t('progress.title')}</h1>
        <p className="text-slate-400 text-sm">{t('progress.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className={`rounded-2xl border p-5 ${colorMap[color]}`}>
            <Icon size={22} className="mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs opacity-70">{label}</div>
          </div>
        ))}
      </div>

      {/* Learning velocity chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">This Week's Learning Activity</h3>
        <p className="text-slate-400 text-xs mb-6">Minutes spent learning per day</p>
        <div className="flex items-end gap-3 h-32">
          {WEEKLY_DATA.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-purple-600/80 rounded-t-lg transition-all hover:bg-purple-500"
                style={{ height: `${(val / maxVal) * 100}%` }} />
              <span className="text-slate-500 text-xs">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills learned */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">{t('progress.skillsLearned')} ✅</h3>
        <div className="space-y-3">
          {SKILLS_DONE.map((s) => (
            <div key={s.name} className="flex items-center gap-3 bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3">
              <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
              <span className="text-white text-sm font-medium flex-1">{s.name}</span>
              <span className="text-slate-400 text-xs">{s.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive insight */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 flex items-start gap-4">
        <Flame size={20} className="text-orange-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-white font-semibold text-sm mb-1">🧠 Adaptive Insight</p>
          <p className="text-slate-400 text-sm">
            You learn fastest on <strong className="text-white">Thursdays and Fridays</strong> — we've scheduled your hardest topics for those days. 
            Your pace slowed in Week 2 (SQL JOINs) so we've added extra practice sessions and video walkthroughs to your plan.
          </p>
        </div>
      </div>
    </div>
  );
}
