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
    const role = sessionStorage.getItem('onboarding_role') || 'beginner';
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    completeOnboarding({
      role,
      isBeginner: role === 'beginner',
      interests: noInterest ? [] : selected,
      language: lang,
    });
    navigate('/dashboard');
  };

  const canContinue = selected.length > 0 || noInterest;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-8 h-2 bg-purple-500 rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart size={18} className="text-pink-400" />
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">Beginner Path</span>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2 text-center">{t('interests.title')}</h1>
        <p className="text-slate-400 text-center mb-8">{t('interests.subtitle')}</p>

        {/* Interest grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {interests.map((key) => (
            <button
              key={key}
              onClick={() => toggleInterest(key)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                selected.includes(key)
                  ? 'bg-purple-600/20 border-purple-500 shadow-md shadow-purple-600/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{INTEREST_ICONS[key]}</span>
              <span className="text-white text-sm font-medium">{t(`interests.options.${key}`)}</span>
              {selected.includes(key) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
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
              ? 'bg-slate-600/20 border-slate-400 text-slate-300'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
          }`}
        >
          <span className="text-xl">🤷</span>
          <span className="font-medium">{t('interests.none')}</span>
          {noInterest && (
            <div className="ml-auto w-5 h-5 bg-slate-500 rounded-full flex items-center justify-center">
              <Check size={11} className="text-white" />
            </div>
          )}
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="group w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/30"
        >
          {t('interests.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
