import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const POPULAR_ROLES = [
  'Product Manager', 'Data Analyst', 'UX Designer', 'Software Engineer',
  'Marketing Manager', 'Business Analyst', 'DevOps Engineer', 'Content Strategist',
  'Cybersecurity Analyst', 'Project Manager',
];

export default function RoleSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [role, setRole] = useState('');
  const [isBeginner, setIsBeginner] = useState(false);

  const handleBeginner = () => {
    setIsBeginner(true);
    setRole('');
  };

  const handleRoleChip = (r) => {
    setIsBeginner(false);
    setRole(r);
  };

  const handleContinue = () => {
    if (isBeginner) {
      sessionStorage.setItem('onboarding_role', 'beginner');
      navigate('/onboarding/interests');
    } else {
      const lang = localStorage.getItem('preferredLanguage') || 'en';
      completeOnboarding({
        role: role.trim(),
        isBeginner: false,
        interests: [],
        language: lang,
      });
      navigate('/dashboard');
    }
  };

  const canContinue = isBeginner || role.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-8 h-2 bg-purple-500 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2 text-center">{t('role.title')}</h1>
        <p className="text-slate-400 text-center mb-8">{t('role.subtitle')}</p>

        {/* Search input */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={role}
            onChange={(e) => { setRole(e.target.value); setIsBeginner(false); }}
            placeholder={t('role.placeholder')}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Popular roles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {POPULAR_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChip(r)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                role === r && !isBeginner
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Beginner option */}
        <button
          onClick={handleBeginner}
          className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all mb-8 text-left ${
            isBeginner
              ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-600/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBeginner ? 'bg-purple-500' : 'bg-white/10'}`}>
            <Sparkles size={20} className={isBeginner ? 'text-white' : 'text-slate-400'} />
          </div>
          <div>
            <div className="text-white font-semibold">{t('role.beginner')}</div>
            <div className="text-slate-400 text-sm">We'll help you discover the perfect role based on your interests</div>
          </div>
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/30"
        >
          {t('role.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
