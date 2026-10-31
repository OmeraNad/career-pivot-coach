import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import { ArrowRight, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Portuguese', native: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: 'Chinese', native: '中文', flag: '🇨🇳' },
];

export default function LanguageSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(i18n.language || 'en');

  const handleSelect = (code) => {
    setSelected(code);
    i18n.changeLanguage(code);
    localStorage.setItem('preferredLanguage', code);
  };

  return (
    <div className="min-h-screen bg-[#F6F3EB] flex items-center justify-center p-4 selection:bg-[#68734A]/20">
      <div className="max-w-xl w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-8 h-2 bg-[#68734A] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
          <div className="w-2 h-2 bg-[#D9D3C4] rounded-full" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#292923] mb-2 text-center tracking-tight">{t('language.title')}</h1>
        <p className="text-[#626153] text-center mb-8 text-sm md:text-base">{t('language.subtitle')}</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                selected === lang.code
                  ? 'bg-[#E9EBDD] border-[#68734A] shadow-sm'
                  : 'bg-white border-[#D9D3C4] hover:border-[#A6AA8B] hover:bg-[#FFFDF7]'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div>
                <div className="text-[#292923] font-semibold text-sm">{lang.native}</div>
                <div className="text-[#626153] text-xs">{lang.label}</div>
              </div>
              {selected === lang.code && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-[#68734A] rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/onboarding/role')}
          className="group w-full flex items-center justify-center gap-3 bg-[#68734A] hover:bg-[#515D3A] text-white font-semibold py-4 rounded-2xl transition-all shadow-sm"
        >
          {t('language.continue')}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
