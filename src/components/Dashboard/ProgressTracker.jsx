import { useTranslation } from 'react-i18next';
import { Flame, CheckCircle, BookOpen, TrendingUp } from 'lucide-react';

const SKILLS_DONE = [
  { name: 'Git Branching & Pull Requests', date: 'Oct 28' },
  { name: 'React Component Architecture & Props', date: 'Oct 24' },
  { name: 'Tailwind CSS Grid & Responsive Design', date: 'Oct 20' },
];

const WEEKLY_DATA = [45, 60, 50, 85, 75, 95, 40];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ProgressTracker() {
  const { t } = useTranslation();

  const stats = [
    { icon: TrendingUp, label: t('progress.overall'), value: '45%' },
    { icon: Flame, label: t('progress.streak'), value: '7 days' },
    { icon: CheckCircle, label: t('progress.completed'), value: '16' },
    { icon: BookOpen, label: t('progress.skillsLearned'), value: '3' },
  ];

  const maxVal = Math.max(...WEEKLY_DATA);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e2019] mb-1">{t('progress.title')}</h1>
        <p className="text-[#636659] text-sm">{t('progress.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center mb-3">
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-[#1e2019] mb-1">{value}</div>
            <div className="text-xs text-[#7d8270] font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Learning velocity chart */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
        <h3 className="text-[#1e2019] font-bold text-base mb-1">Weekly Learning Minutes</h3>
        <p className="text-[#7d8270] text-xs mb-6">Time spent engaged in practical courses and quizzes</p>
        <div className="flex items-end gap-3 h-36">
          {WEEKLY_DATA.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-[#556b2f] rounded-t-lg transition-all hover:bg-[#445625]"
                style={{ height: `${(val / maxVal) * 100}%` }} />
              <span className="text-[#7d8270] text-xs font-medium">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills learned */}
      <div className="bg-white border border-[#e2dfd4] rounded-2xl p-6 shadow-xs">
        <h3 className="text-[#1e2019] font-bold text-base mb-4">{t('progress.skillsLearned')} ✅</h3>
        <div className="space-y-3">
          {SKILLS_DONE.map((s) => (
            <div key={s.name} className="flex items-center gap-3 bg-[#faf9f5] border border-[#e2dfd4] rounded-xl px-4 py-3">
              <CheckCircle size={18} className="text-[#556b2f] flex-shrink-0" />
              <span className="text-[#1e2019] text-sm font-semibold flex-1">{s.name}</span>
              <span className="text-[#7d8270] text-xs">{s.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive insight */}
      <div className="bg-[#edf1e6] border border-[#d6dec8] rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-[#556b2f] flex items-center justify-center flex-shrink-0 shadow-xs">
          <Flame size={20} />
        </div>
        <div>
          <p className="text-[#1e2019] font-bold text-sm mb-1">🧠 Adaptive Retention Analysis</p>
          <p className="text-[#4b4e43] text-sm leading-relaxed">
            Your retention peaks during <strong className="text-[#1e2019]">Friday mini-project sessions</strong>. 
            Keep focusing on shipping 1 working component before moving to the next lesson.
          </p>
        </div>
      </div>
    </div>
  );
}
