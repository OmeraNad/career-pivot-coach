import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Check, Heart } from 'lucide-react';

const INTEREST_ICONS = {
  technology: '💻', design: '🎨', business: '💼', data: '📊',
  marketing: '📣', writing: '✍️', finance: '💰', healthcare: '🏥',
  education: '📚', law: '⚖️',
};

export default function InterestSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [selected, setSelected] = useState([]);
  const [noInterest, setNoInterest] = useState(false);

  const interests = Object.keys(INTEREST_ICONS);

  const toggleInterest = (key) => {
    setNoInterest(false);
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const handleNoInterest = () => {
    setSelected([]);
    setNoInterest(true);
  };

  const handleContinue = () => {
    const role = sessionStorage.getItem('onboarding_role') || 'Full Stack Developer';
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    completeOnboarding({
      role: role === 'beginner' ? 'Full Stack Developer' : role,
      isBeginner: true,
      interests: noInterest ? [] : selected,
      language: lang,
    });
    navigate('/dashboard');
  };

  const canContinue = selected.length > 0 || noInterest;

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-8 h-2 bg-[#556b2f] rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart size={18} className="text-[#556b2f]" />
          <span className="text-[#556b2f] text-xs font-bold uppercase tracking-widest">Beginner Exploration</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2019] mb-2 text-center tracking-tight">{t('interests.title')}</h1>
        <p className="text-[#636659] text-center mb-8 text-sm md:text-base">{t('interests.subtitle')}</p>

        {/* Interest grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {interests.map((key) => (
            <button
              key={key}
              onClick={() => toggleInterest(key)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                selected.includes(key)
                  ? 'bg-[#edf1e6] border-[#556b2f] shadow-sm'
                  : 'bg-white border-[#e4e1d6] hover:border-[#b8c2a4] hover:bg-[#faf9f5]'
              }`}
            >
              <span className="text-2xl">{INTEREST_ICONS[key]}</span>
              <span className="text-[#1e2019] text-sm font-medium">{t(`interests.options.${key}`)}</span>
              {selected.includes(key) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-[#556b2f] rounded-full flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* No interest option */}
        <button
          onClick={handleNoInterest}
          className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all mb-8 ${
            noInterest
              ? 'bg-[#e7e5de] border-[#7d8270] text-[#1e2019] font-medium'
              : 'bg-white border-[#e4e1d6] text-[#636659] hover:bg-[#faf9f5]'
          }`}
        >
          <span className="text-xl">🤷</span>
          <span className="text-sm font-medium">{t('interests.none')}</span>
          {noInterest && (
            <div className="ml-auto w-5 h-5 bg-[#556b2f] rounded-full flex items-center justify-center">
              <Check size={11} className="text-white" />
            </div>
          )}
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group w-full flex items-center justify-center gap-3 bg-[#556b2f] hover:bg-[#445625] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-sm"
        >
          {t('interests.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
