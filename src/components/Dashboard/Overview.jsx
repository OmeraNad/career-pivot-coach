import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Map, CalendarDays, Mic, SendHorizonal, TrendingUp, ArrowRight, Star, BookOpen } from 'lucide-react';

const BEGINNER_ROLES = [
  { title: 'Social Media Manager', emoji: '📱', time: '1-2 months', difficulty: 'Easy', color: 'green' },
  { title: 'QA Tester', emoji: '🧪', time: '1-3 months', difficulty: 'Easy', color: 'green' },
  { title: 'Copywriter', emoji: '✍️', time: '2-3 months', difficulty: 'Easy', color: 'green' },
  { title: 'Junior Web Developer', emoji: '💻', time: '3-5 months', difficulty: 'Medium', color: 'yellow' },
  { title: 'Graphic Designer', emoji: '🎨', time: '2-4 months', difficulty: 'Medium', color: 'yellow' },
  { title: 'Data Analyst', emoji: '📊', time: '4-6 months', difficulty: 'Medium', color: 'orange' },
];

const BASICS = [
  { icon: '📝', title: 'Write a Professional Resume', desc: 'Learn how to structure your resume from scratch' },
  { icon: '💬', title: 'Professional Communication', desc: 'Email etiquette, LinkedIn, Slack basics' },
  { icon: '🔍', title: 'How Job Searching Works', desc: 'ATS systems, recruiters, how to apply effectively' },
  { icon: '🧠', title: 'How to Learn Effectively', desc: 'Spaced repetition, project-based learning tricks' },
  { icon: '💻', title: 'Digital Literacy', desc: 'Google Workspace, basic productivity tools' },
];

const DIFF_COLORS = { Easy: 'text-green-400 bg-green-400/10', Medium: 'text-yellow-400 bg-yellow-400/10', Hard: 'text-red-400 bg-red-400/10' };

export default function Overview({ setActiveTab }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isBeginner = user?.prefs?.isBeginner;
  const role = user?.prefs?.role;

  const quickActions = [
    { id: 'skillGap', icon: Map, label: t('dashboard.tabs.skillGap'), desc: 'See what skills you\'re missing', color: 'purple' },
    { id: 'weeklyPlan', icon: CalendarDays, label: t('dashboard.tabs.weeklyPlan'), desc: 'View your learning roadmap', color: 'blue' },
    { id: 'mockInterview', icon: Mic, label: t('dashboard.tabs.mockInterview'), desc: 'Practice interview questions', color: 'pink' },
    { id: 'applications', icon: SendHorizonal, label: t('dashboard.tabs.applications'), desc: 'Track your job applications', color: 'orange' },
    { id: 'progress', icon: TrendingUp, label: t('dashboard.tabs.progress'), desc: 'See your learning progress', color: 'green' },
  ];

  const colorMap = {
    purple: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/50 text-purple-400',
    blue: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/50 text-blue-400',
    pink: 'bg-pink-500/10 border-pink-500/20 hover:border-pink-500/50 text-pink-400',
    orange: 'bg-orange-500/10 border-orange-500/20 hover:border-orange-500/50 text-orange-400',
    green: 'bg-green-500/10 border-green-500/20 hover:border-green-500/50 text-green-400',
  };

  return (
    <div className="space-y-8">
      {/* Beginner: recommended roles */}
      {isBeginner && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-yellow-400" />
            <h2 className="text-white font-bold text-xl">{t('beginner.title')}</h2>
          </div>
          <p className="text-slate-400 text-sm mb-5">{t('beginner.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEGINNER_ROLES.map((r) => (
              <div key={r.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-all group">
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="text-white font-semibold mb-1">{r.title}</h3>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-slate-400 text-xs">⏱ {r.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[r.difficulty]}`}>{r.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Beginner: learn first */}
      {isBeginner && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-blue-400" />
            <h2 className="text-white font-bold text-xl">{t('beginner.learnFirst')}</h2>
          </div>
          <p className="text-slate-400 text-sm mb-5">{t('beginner.learnFirstSubtitle')}</p>
          <div className="space-y-3">
            {BASICS.map((b, i) => (
              <div key={b.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/8 transition-all">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{b.icon}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{b.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{b.desc}</div>
                </div>
                <div className="ml-auto w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-slate-400 text-xs font-bold">{i + 1}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section>
        <h2 className="text-white font-bold text-xl mb-5">
          {isBeginner ? '🚀 Your Career Tools' : '🎯 Jump Back In'}
        </h2>
        {!isBeginner && role && (
          <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-4 mb-5 flex items-center gap-3">
            <span className="text-purple-400 text-sm">🎯 Target Role:</span>
            <span className="text-white font-semibold">{role}</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(({ id, icon: Icon, label, desc, color }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all text-left group ${colorMap[color]}`}>
              <div className="mt-0.5">
                <Icon size={22} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm mb-1">{label}</div>
                <div className="text-slate-400 text-xs">{desc}</div>
              </div>
              <ArrowRight size={16} className="ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 text-slate-300" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
