import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit, LayoutDashboard, Map, CalendarDays, Mic,
  SendHorizonal, TrendingUp, LogOut, User, Globe, Menu, X
} from 'lucide-react';
import SkillGapMap from './SkillGapMap';
import WeeklyPlan from './WeeklyPlan';
import MockInterview from './MockInterview';
import ApplicationTracker from './ApplicationTracker';
import ProgressTracker from './ProgressTracker';
import Overview from './Overview';
import i18n from '../../i18n';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'hi', label: 'हि', flag: '🇮🇳' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

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
    { id: 'mockInterview', icon: Mic, label: t('dashboard.tabs.mockInterview') },
    { id: 'applications', icon: SendHorizonal, label: t('dashboard.tabs.applications') },
    { id: 'progress', icon: TrendingUp, label: t('dashboard.tabs.progress') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview setActiveTab={setActiveTab} />;
      case 'skillGap': return <SkillGapMap />;
      case 'weeklyPlan': return <WeeklyPlan />;
      case 'mockInterview': return <MockInterview />;
      case 'applications': return <ApplicationTracker />;
      case 'progress': return <ProgressTracker />;
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900/80 backdrop-blur border-r border-white/5 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <BrainCircuit size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-sm">CareerPivot</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-slate-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav tabs */}
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                activeTab === id
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {/* Language switcher */}
        {sidebarOpen && (
          <div className="p-3 border-t border-white/5">
            <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
              <Globe size={14} className="text-slate-400 ml-1 flex-shrink-0" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLang(lang.code)}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                    currentLang === lang.code ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User + Logout */}
        <div className="p-3 border-t border-white/5">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600/30 rounded-xl flex items-center justify-center">
                <User size={16} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate">{user?.name}</div>
                <div className="text-slate-500 text-xs truncate">{user?.email}</div>
              </div>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center text-slate-400 hover:text-red-400 transition-colors p-2">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between bg-slate-900/40 backdrop-blur sticky top-0 z-10">
          <div>
            <h2 className="text-white font-bold">{t('dashboard.greeting')}, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-slate-400 text-xs">{t('dashboard.subtitle')}</p>
          </div>
          {user?.prefs?.isBeginner && (
            <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              ✨ Beginner Path
            </span>
          )}
        </div>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
