import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const POPULAR_ROLES = [
  'Full Stack Developer', 'Software Engineer', 'Data Analyst', 'UX Designer',
  'Product Manager', 'Marketing Manager', 'Business Analyst', 'DevOps Engineer',
  'Project Manager',
];

export default function RoleSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      sessionStorage.setItem('onboarding_role_name', role.trim());
      navigate('/onboarding/skills');
    }
  };

  const canContinue = isBeginner || role.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F6F3EB] flex items-center justify-center p-4 selection:bg-[#68734A]/20">
      <div className="max-w-xl w-full">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-8 h-2 bg-[#68734A] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#292923] mb-2 text-center tracking-tight">{t('role.title')}</h1>
        <p className="text-[#626153] text-center mb-8 text-sm md:text-base">{t('role.subtitle')}</p>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85836F]" />
          <input
            type="text"
            value={role}
            onChange={(e) => { setRole(e.target.value); setIsBeginner(false); }}
            placeholder={t('role.placeholder')}
            className="w-full bg-white border border-[#D9D3C4] rounded-2xl pl-12 pr-4 py-4 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {POPULAR_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChip(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${
                role === r && !isBeginner
                  ? 'bg-[#68734A] border-[#68734A] text-white'
                  : 'bg-white border-[#D9D3C4] text-[#4D4A3F] hover:border-[#A6AA8B] hover:bg-[#FFFDF7]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#D9D3C4]" />
          <span className="text-[#85836F] text-xs font-medium uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-[#D9D3C4]" />
        </div>

        <button
          onClick={handleBeginner}
          className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all mb-8 text-left ${
            isBeginner
              ? 'bg-[#E9EBDD] border-[#68734A] shadow-sm'
              : 'bg-white border-[#D9D3C4] hover:border-[#A6AA8B] hover:bg-[#FFFDF7]'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isBeginner ? 'bg-[#68734A] text-white' : 'bg-[#E9EBDD] text-[#68734A]'}`}>
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-[#292923] font-bold text-sm md:text-base">{t('role.beginner')}</div>
            <div className="text-[#626153] text-xs md:text-sm">We'll help you discover the perfect role based on your strengths & interests</div>
          </div>
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group w-full flex items-center justify-center gap-3 bg-[#68734A] hover:bg-[#515D3A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-sm"
        >
          {t('role.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
