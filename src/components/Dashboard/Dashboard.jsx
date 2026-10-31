import { useState } from 'react';
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
    { id: 'projects', icon: FolderGit2, label: t('dashboard.tabs.projects') || 'Portfolio Projects' },
    { id: 'mockInterview', icon: Mic, label: t('dashboard.tabs.mockInterview') },
    { id: 'applications', icon: SendHorizonal, label: t('dashboard.tabs.applications') },
    { id: 'progress', icon: TrendingUp, label: t('dashboard.tabs.progress') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview setActiveTab={setActiveTab} />;
      case 'skillGap': return <SkillGapMap />;
      case 'weeklyPlan': return <WeeklyPlan />;
      case 'projects': return <PortfolioProjects />;
      case 'mockInterview': return <MockInterview />;
      case 'applications': return <ApplicationTracker />;
      case 'progress': return <ProgressTracker />;
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex text-[#1e2019] selection:bg-[#556b2f]/20">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#f0ede4] border-r border-[#e2dfd4] flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-[#e2dfd4]">
          <div className="w-8 h-8 bg-[#556b2f] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
            <Compass size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-sm tracking-tight text-[#1e2019]">CareerPivot</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-[#7d8270] hover:text-[#1e2019] transition-colors">
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
            <div className="flex items-center gap-1 bg-[#e4e1d6] rounded-xl p-1">
              <Globe size={14} className="text-[#636659] ml-1 flex-shrink-0" />
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLang(lang.code)}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                    currentLang === lang.code ? 'bg-white text-[#1e2019] shadow-xs' : 'text-[#636659] hover:text-[#1e2019]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
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
        <div className="border-b border-[#e2dfd4] px-8 py-4 flex items-center justify-between bg-white/70 backdrop-blur sticky top-0 z-10">
          <div>
            <h2 className="text-[#1e2019] font-bold text-base">{t('dashboard.greeting')}, {user?.name?.split(' ')[0]} 👋</h2>
            <p className="text-[#636659] text-xs">{t('dashboard.subtitle')}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#f0eee6] border border-[#dcd8cb] px-3 py-1.5 rounded-xl">
              <span className="text-xs text-[#636659] font-medium">Target Role:</span>
              <select
                value={user?.prefs?.role || 'Full Stack Developer'}
                onChange={(e) => {
                  const newRole = e.target.value;
                  const users = JSON.parse(localStorage.getItem('cpc_users') || '[]');
                  const idx = users.findIndex((u) => u.id === user.id);
                  const updatedPrefs = { ...user.prefs, role: newRole, isBeginner: false };
                  if (idx !== -1) {
                    users[idx] = { ...users[idx], prefs: updatedPrefs };
                    localStorage.setItem('cpc_users', JSON.stringify(users));
                  }
                  const session = { ...user, prefs: updatedPrefs };
                  localStorage.setItem('cpc_session', JSON.stringify(session));
                  window.location.reload();
                }}
                className="bg-transparent text-[#3f5022] font-semibold text-xs focus:outline-none cursor-pointer"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="UX Designer">UX Designer</option>
              </select>
            </div>

            {user?.prefs?.isBeginner && (
              <span className="bg-[#edf1e6] text-[#455633] border border-[#d6dec8] text-xs font-semibold px-3 py-1 rounded-full">
                🌱 Beginner Path
              </span>
            )}
          </div>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
