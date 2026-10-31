import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Compass, LayoutDashboard, Map, CalendarDays, Mic,
  SendHorizonal, TrendingUp, LogOut, User, Globe, Menu, X, ChevronDown, FolderGit2
} from 'lucide-react';
import SkillGapMap from './SkillGapMap';
import WeeklyPlan from './WeeklyPlan';
import PortfolioProjects from './PortfolioProjects';
import MockInterview from './MockInterview';
import ApplicationTracker from './ApplicationTracker';
import ProgressTracker from './ProgressTracker';
import Overview from './Overview';
import i18n from '../../i18n';
import { CAREER_ROLES } from '../../data/careerCatalog';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, logout, updatePrefs } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const switchLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('preferredLanguage', code);
    setCurrentLang(code);
  };

  const tabs = [
    { id: 'overview', icon: LayoutDashboard, label: t('dashboard.tabs.overview') },
    { id: 'skillGap', icon: Map, label: t('dashboard.tabs.skillGap') },
    { id: 'weeklyPlan', icon: CalendarDays, label: t('dashboard.tabs.weeklyPlan') },
    { id: 'projects', icon: FolderGit2, label: t('dashboard.tabs.projects') || 'Portfolio Projects' },
    { id: 'mockInterview', icon: Mic, label: t('dashboard.tabs.mockInterview') },
    { id: 'applications', icon: SendHorizonal, label: t('dashboard.tabs.applications') },
    { id: 'progress', icon: TrendingUp, label: t('dashboard.tabs.progress') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview setActiveTab={setActiveTab} />;
      case 'skillGap': return <SkillGapMap key={`${user?.id}-${user?.prefs?.role}`} />;
      case 'weeklyPlan': return <WeeklyPlan key={`${user?.id}-${user?.prefs?.role}-${(user?.prefs?.knownSkills || []).join('|')}`} />;
      case 'projects': return <PortfolioProjects key={`${user?.id}-${user?.prefs?.role}`} />;
      case 'mockInterview': return <MockInterview key={`${user?.id}-${user?.prefs?.role}-${(user?.prefs?.knownSkills || []).join('|')}`} />;
      case 'applications': return <ApplicationTracker key={user?.id} />;
      case 'progress': return <ProgressTracker key={`${user?.id}-${user?.prefs?.role}`} />;
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex text-[#1e2019] selection:bg-[#556b2f]/20">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64 max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-30 max-md:shadow-xl' : 'w-16'} shrink-0 transition-all duration-300 bg-[#f0ede4] border-r border-[#e2dfd4] flex flex-col`}>
        {/* Logo */}
        <div className={`p-4 flex items-center border-b border-[#e2dfd4] ${sidebarOpen ? 'gap-3' : 'justify-center'}`}>
          {sidebarOpen && (
            <>
              <div className="w-8 h-8 bg-[#556b2f] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Compass size={18} className="text-white" />
              </div>
              <span className="font-bold text-sm tracking-tight text-[#1e2019]">Career Compass</span>
            </>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Collapse navigation' : 'Expand navigation'}
            className={`${sidebarOpen ? 'ml-auto' : ''} text-[#7d8270] hover:text-[#1e2019] transition-colors`}
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav tabs */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                activeTab === id
                  ? 'bg-[#556b2f] text-white shadow-sm'
                  : 'text-[#5a5d4f] hover:bg-[#e4e1d6] hover:text-[#1e2019]'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Language switcher */}
        {sidebarOpen && (
          <div className="p-3 border-t border-[#e2dfd4]">
            <div className="flex items-center gap-2 bg-white border border-[#e2dfd4] rounded-xl px-2.5 py-1.5 shadow-xs">
              <Globe size={14} className="text-[#556b2f] flex-shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => switchLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#1e2019] focus:outline-none w-full cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white text-[#1e2019]">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* User + Logout */}
        <div className="p-3 border-t border-[#e2dfd4]">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#556b2f]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-[#556b2f]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#1e2019] text-xs font-semibold truncate">{user?.name}</div>
                <div className="text-[#7d8270] text-xs truncate">{user?.email}</div>
              </div>
              <button onClick={handleLogout} className="text-[#7d8270] hover:text-[#ba3c3c] transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center text-[#7d8270] hover:text-[#ba3c3c] transition-colors p-2">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-[#e2dfd4] px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur sticky top-0 z-10">
          <div>
            <h2 className="text-[#1e2019] font-bold text-base">{t('dashboard.greeting')}, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-[#636659] text-xs">{t('dashboard.subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex min-w-0 items-center gap-2 bg-[#f0eee6] border border-[#dcd8cb] px-3 py-1.5 rounded-xl">
              <span className="text-xs text-[#636659] font-medium">Target Role:</span>
              <select
                value={user?.prefs?.role || 'Product Manager'}
                onChange={(e) => {
                  updatePrefs({ role: e.target.value, isBeginner: false });
                }}
                className="bg-transparent text-[#3f5022] font-semibold text-xs focus:outline-none cursor-pointer max-w-[42vw] md:max-w-none"
              >
                <optgroup label="Curated career roles">
                  {CAREER_ROLES.map((careerRole) => (
                    <option key={careerRole.key} value={careerRole.title}>{careerRole.title}</option>
                  ))}
                </optgroup>
                <optgroup label="Other roles">
                  {['Product Manager', 'Junior Software & Web Engineer', 'Junior Health Data & Informatics Specialist', 'Business Intelligence & Data Analyst', 'UI/UX & Product Designer', 'Software Engineer', 'Full Stack Developer']
                    .filter((name) => !CAREER_ROLES.some((careerRole) => careerRole.title === name))
                    .map((name) => <option key={name} value={name}>{name}</option>)}
                  {user?.prefs?.role && !CAREER_ROLES.some((careerRole) => careerRole.title === user.prefs.role) && !['Product Manager', 'Junior Software & Web Engineer', 'Junior Health Data & Informatics Specialist', 'Business Intelligence & Data Analyst', 'UI/UX & Product Designer', 'Software Engineer', 'Full Stack Developer'].includes(user.prefs.role) && (
                    <option value={user.prefs.role}>{user.prefs.role}</option>
                  )}
                </optgroup>
              </select>
            </div>

            {user?.prefs?.isBeginner && (
              <span className="bg-[#edf1e6] text-[#455633] border border-[#d6dec8] text-xs font-semibold px-3 py-1 rounded-full">
                🌱 Beginner Path
              </span>
            )}
          </div>
        </div>

        <div className="px-4 py-5 md:p-8 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
