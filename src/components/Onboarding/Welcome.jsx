import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function Welcome() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="max-w-lg w-full text-center">
        {/* Animated icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-[#556b2f]/10 rounded-full absolute inset-0 animate-ping opacity-40" />
            <div className="w-24 h-24 bg-[#edf1e6] border border-[#d6dec8] rounded-full flex items-center justify-center relative shadow-sm">
              <Compass size={44} className="text-[#556b2f]" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={18} className="text-[#556b2f]" />
          <span className="text-[#556b2f] font-semibold text-xs uppercase tracking-widest">Personal Career Navigator</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1e2019] mb-4 tracking-tight">
          {t('welcome.title')}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
        </h1>
        <p className="text-[#636659] text-base md:text-lg mb-10 leading-relaxed max-w-md mx-auto">{t('welcome.subtitle')}</p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-2 bg-[#556b2f] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
          <div className="w-2 h-2 bg-[#dcd8cb] rounded-full" />
        </div>

        <button
          onClick={() => navigate('/onboarding/language')}
          className="group inline-flex items-center gap-3 bg-[#556b2f] hover:bg-[#445625] text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-sm text-base md:text-lg"
        >
          {t('welcome.continue')}
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
