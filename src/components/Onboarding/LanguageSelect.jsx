import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { ArrowRight, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷', comingSoon: true },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪', comingSoon: true },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦', comingSoon: true },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇧🇷', comingSoon: true },
  { code: 'zh', label: 'Chinese', native: '中文', flag: '🇨🇳', comingSoon: true },
];

export default function LanguageSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(i18n.language || 'en');

  const handleSelect = (code, comingSoon) => {
    if (comingSoon) return;
    setSelected(code);
    i18n.changeLanguage(code);
    localStorage.setItem('preferredLanguage', code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-purple-500/40 rounded-full" />
          <div className="w-8 h-2 bg-purple-500 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2 text-center">{t('language.title')}</h1>
        <p className="text-slate-400 text-center mb-8">{t('language.subtitle')}</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code, lang.comingSoon)}
              disabled={lang.comingSoon}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                selected === lang.code
                  ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-600/20'
                  : lang.comingSoon
                  ? 'bg-white/3 border-white/5 opacity-40 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div>
                <div className="text-white font-semibold text-sm">{lang.native}</div>
                <div className="text-slate-400 text-xs">{lang.label}</div>
              </div>
              {lang.comingSoon && (
                <span className="absolute top-2 right-2 text-xs bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">Soon</span>
              )}
              {selected === lang.code && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/onboarding/role')}
          className="group w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/30"
        >
          {t('language.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
