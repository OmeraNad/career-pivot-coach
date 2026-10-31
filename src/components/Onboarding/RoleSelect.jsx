import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const POPULAR_ROLES = [
  'Full Stack Developer', 'Software Engineer', 'Data Analyst', 'UX Designer',
  'Product Manager', 'Marketing Manager', 'Business Analyst', 'DevOps Engineer',
  'Project Manager',
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
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-8 h-2 bg-[#556b2f] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2019] mb-2 text-center tracking-tight">{t('role.title')}</h1>
        <p className="text-[#636659] text-center mb-8 text-sm md:text-base">{t('role.subtitle')}</p>

        {/* Search input */}
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c907f]" />
          <input
            type="text"
            value={role}
            onChange={(e) => { setRole(e.target.value); setIsBeginner(false); }}
            placeholder={t('role.placeholder')}
            className="w-full bg-white border border-[#dcd8cb] rounded-2xl pl-12 pr-4 py-4 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 transition-all shadow-sm"
          />
        </div>

        {/* Popular roles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {POPULAR_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChip(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${
                role === r && !isBeginner
                  ? 'bg-[#556b2f] border-[#556b2f] text-white'
                  : 'bg-white border-[#e4e1d6] text-[#4b4e43] hover:border-[#b8c2a4] hover:bg-[#faf9f5]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#e4e1d6]" />
          <span className="text-[#8c907f] text-xs font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[#e4e1d6]" />
        </div>

        {/* Beginner option */}
        <button
          onClick={handleBeginner}
          className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all mb-8 text-left ${
            isBeginner
              ? 'bg-[#edf1e6] border-[#556b2f] shadow-sm'
              : 'bg-white border-[#e4e1d6] hover:border-[#b8c2a4] hover:bg-[#faf9f5]'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBeginner ? 'bg-[#556b2f] text-white' : 'bg-[#edf1e6] text-[#556b2f]'}`}>
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-[#1e2019] font-bold text-sm md:text-base">{t('role.beginner')}</div>
            <div className="text-[#636659] text-xs md:text-sm">We'll help you discover the perfect role based on your strengths & interests</div>
          </div>
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group w-full flex items-center justify-center gap-3 bg-[#556b2f] hover:bg-[#445625] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-sm"
        >
          {t('role.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
