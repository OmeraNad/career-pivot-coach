import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Map, CalendarDays, Mic, SendHorizonal, TrendingUp, ArrowRight, Star, BookOpen, Compass, FolderGit2 } from 'lucide-react';
import { CAREER_CATEGORIES } from '../../data/careerCatalog';

const BASICS = [
  { icon: '📝', title: 'Write a Professional Resume', desc: 'Learn how to structure your resume from scratch without fluff' },
  { icon: '💬', title: 'Professional Communication', desc: 'Email etiquette, LinkedIn networking, Slack communication' },
  { icon: '🔍', title: 'How Job Searching Works', desc: 'ATS systems, recruiters, and applying with high response rates' },
  { icon: '🧠', title: 'How to Learn Effectively', desc: 'Spaced repetition, project-based learning, building portfolio pieces' },
  { icon: '💻', title: 'Digital Literacy', desc: 'Google Workspace, modern productivity and collaboration tools' },
];

export default function Overview({ setActiveTab }) {
  const { t } = useTranslation();
  const { user, updatePrefs } = useAuth();
  const isBeginner = user?.prefs?.isBeginner;
  const role = user?.prefs?.role || 'Full Stack Developer';
  const interests = user?.prefs?.interests?.length
    ? user.prefs.interests
    : user?.prefs?.interestKey ? [user.prefs.interestKey] : [];
  const recommendedCategories = CAREER_CATEGORIES.filter((category) => interests.includes(category.id));

  const quickActions = [
    { id: 'skillGap', icon: Map, label: t('dashboard.tabs.skillGap'), desc: 'See what skills you are missing & watch top tutorials' },
    { id: 'weeklyPlan', icon: CalendarDays, label: t('dashboard.tabs.weeklyPlan'), desc: 'View your step-by-step weekly roadmap' },
    { id: 'projects', icon: FolderGit2, label: 'Portfolio Projects', desc: 'Real projects matched to close your specific skill gaps' },
    { id: 'mockInterview', icon: Mic, label: t('dashboard.tabs.mockInterview'), desc: 'Practice role-calibrated interview questions' },
    { id: 'applications', icon: SendHorizonal, label: t('dashboard.tabs.applications'), desc: 'Track applications & learn response patterns' },
    { id: 'progress', icon: TrendingUp, label: t('dashboard.tabs.progress'), desc: 'Track learning pace & mastered skills' },
  ];

  return (
    <div className="space-y-8">
      {/* Target Role Banner */}
      <div className="bg-white border border-[#e2dfd4] rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#edf1e6] border border-[#d6dec8] rounded-2xl flex items-center justify-center text-[#556b2f]">
            <Compass size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7d8270] uppercase tracking-wider">Active Target Role</span>
              {isBeginner && <span className="text-xs bg-[#edf1e6] text-[#455633] px-2 py-0.5 rounded-full font-medium">Beginner</span>}
            </div>
            <h2 className="text-xl font-bold text-[#1e2019]">{role}</h2>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('skillGap')}
          className="bg-[#556b2f] hover:bg-[#445625] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
        >
          View Skill Gap Map <ArrowRight size={14} />
        </button>
      </div>

      {/* Beginner: recommended roles */}
      {isBeginner && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-[#8a6b18]" />
            <h2 className="text-[#1e2019] font-bold text-lg">{t('beginner.title')}</h2>
          </div>
          <p className="text-[#636659] text-sm mb-5">
            {recommendedCategories.length
              ? `Starting roles matched to ${recommendedCategories.map((category) => category.title).join(', ')}.`
              : 'Choose a role from the target-role menu to see a personalized career path.'}
          </p>
          {recommendedCategories.length > 0 && (
            <div className="space-y-4">
              {recommendedCategories.map((category) => (
                <div key={category.id} className="bg-white border border-[#e2dfd4] rounded-2xl p-5 shadow-xs">
                  <h3 className="text-[#1e2019] font-bold text-sm mb-3">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.roles.map((recommendedRole) => {
                      const isSelected = role === recommendedRole.title;
                      return (
                        <button
                          key={recommendedRole.key}
                          onClick={() => updatePrefs({ role: recommendedRole.title, isBeginner: true })}
                          aria-pressed={isSelected}
                          className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'bg-[#556b2f] border-[#556b2f] text-white'
                              : 'bg-[#faf9f5] border-[#e2dfd4] text-[#4b4e43] hover:border-[#9fa88c]'
                          }`}
                        >
                          {recommendedRole.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Beginner: learn first */}
      {isBeginner && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={18} className="text-[#556b2f]" />
            <h2 className="text-[#1e2019] font-bold text-lg">{t('beginner.learnFirst')}</h2>
          </div>
          <p className="text-[#636659] text-sm mb-5">{t('beginner.learnFirstSubtitle')}</p>
          <div className="space-y-3">
            {BASICS.map((b, i) => (
              <div key={b.title} className="bg-white border border-[#e2dfd4] rounded-2xl p-4 flex items-center gap-4 hover:border-[#b8c2a4] transition-all shadow-xs">
                <div className="w-10 h-10 bg-[#edf1e6] border border-[#d6dec8] rounded-xl flex items-center justify-center text-xl flex-shrink-0">{b.icon}</div>
                <div>
                  <div className="text-[#1e2019] font-semibold text-sm">{b.title}</div>
                  <div className="text-[#636659] text-xs mt-0.5">{b.desc}</div>
                </div>
                <div className="ml-auto w-6 h-6 bg-[#f0eee6] rounded-full flex items-center justify-center text-[#7d8270] text-xs font-bold">{i + 1}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section>
        <h2 className="text-[#1e2019] font-bold text-lg mb-4">
          {isBeginner ? '🌿 Core Pivot Modules' : '⚡ Your Career Roadmap'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(({ id, icon: Icon, label, desc }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex items-start gap-4 p-5 rounded-2xl border border-[#e2dfd4] bg-white hover:border-[#556b2f] hover:bg-[#faf9f5] transition-all text-left group shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#edf1e6] text-[#556b2f] flex items-center justify-center flex-shrink-0 group-hover:bg-[#556b2f] group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#1e2019] text-sm mb-1">{label}</div>
                <div className="text-[#636659] text-xs leading-relaxed">{desc}</div>
              </div>
              <ArrowRight size={16} className="mt-1 text-[#b8c2a4] group-hover:text-[#556b2f] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
