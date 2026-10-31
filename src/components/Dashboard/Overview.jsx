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
      <div className="bg-white border border-[#D9D3C4] rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E9EBDD] border border-[#D6D9C6] rounded-2xl flex items-center justify-center text-[#68734A]">
            <Compass size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#797762] uppercase tracking-wider">Active Target Role</span>
              {isBeginner && <span className="text-xs bg-[#E9EBDD] text-[#4F5B3D] px-2 py-0.5 rounded-full font-medium">Beginner</span>}
            </div>
            <h2 className="text-xl font-bold text-[#292923]">{role}</h2>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('skillGap')}
          className="bg-[#68734A] hover:bg-[#515D3A] text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
        >
          View Skill Gap Map <ArrowRight size={14} />
        </button>
      </div>

      {/* Beginner: recommended roles */}
      {isBeginner && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-[#866B34]" />
            <h2 className="text-[#292923] font-bold text-lg">{t('beginner.title')}</h2>
          </div>
          <p className="text-[#626153] text-sm mb-5">
            {recommendedCategories.length
              ? `Starting roles matched to ${recommendedCategories.map((category) => category.title).join(', ')}.`
              : 'Choose a role from the target-role menu to see a personalized career path.'}
          </p>
          {recommendedCategories.length > 0 && (
            <div className="space-y-4">
              {recommendedCategories.map((category) => (
                <div key={category.id} className="bg-white border border-[#D9D3C4] rounded-2xl p-5 shadow-xs">
                  <h3 className="text-[#292923] font-bold text-sm mb-3">{category.title}</h3>
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
                              ? 'bg-[#68734A] border-[#68734A] text-white'
                              : 'bg-[#FFFDF7] border-[#D9D3C4] text-[#4D4A3F] hover:border-[#A6AA8B]'
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
            <BookOpen size={18} className="text-[#68734A]" />
            <h2 className="text-[#292923] font-bold text-lg">{t('beginner.learnFirst')}</h2>
          </div>
          <p className="text-[#626153] text-sm mb-5">{t('beginner.learnFirstSubtitle')}</p>
          <div className="space-y-3">
            {BASICS.map((b, i) => (
              <div key={b.title} className="bg-white border border-[#D9D3C4] rounded-2xl p-4 flex items-center gap-4 hover:border-[#A6AA8B] transition-all shadow-xs">
                <div className="w-10 h-10 bg-[#E9EBDD] border border-[#D6D9C6] rounded-xl flex items-center justify-center text-xl flex-shrink-0">{b.icon}</div>
                <div>
                  <div className="text-[#292923] font-semibold text-sm">{b.title}</div>
                  <div className="text-[#626153] text-xs mt-0.5">{b.desc}</div>
                </div>
                <div className="ml-auto w-6 h-6 bg-[#EEEADF] rounded-full flex items-center justify-center text-[#797762] text-xs font-bold">{i + 1}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section>
        <h2 className="text-[#292923] font-bold text-lg mb-4">
          {isBeginner ? '🌿 Core Pivot Modules' : '⚡ Your Career Roadmap'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(({ id, icon: Icon, label, desc }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex items-start gap-4 p-5 rounded-2xl border border-[#D9D3C4] bg-white hover:border-[#68734A] hover:bg-[#FFFDF7] transition-all text-left group shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#E9EBDD] text-[#68734A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#68734A] group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#292923] text-sm mb-1">{label}</div>
                <div className="text-[#626153] text-xs leading-relaxed">{desc}</div>
              </div>
              <ArrowRight size={16} className="mt-1 text-[#A6AA8B] group-hover:text-[#68734A] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
