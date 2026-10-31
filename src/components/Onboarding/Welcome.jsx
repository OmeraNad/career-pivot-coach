import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BrainCircuit, ArrowRight, Rocket } from 'lucide-react';

export default function Welcome() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-purple-600/20 rounded-full absolute inset-0 animate-ping opacity-30" />
            <div className="w-24 h-24 bg-purple-600/30 rounded-full flex items-center justify-center relative">
              <BrainCircuit size={44} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket size={20} className="text-purple-400" />
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Career Pivot Coach</span>
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          {t('welcome.title')}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! 👋
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">{t('welcome.subtitle')}</p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-2 bg-purple-500 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
          <div className="w-2 h-2 bg-white/20 rounded-full" />
        </div>

        <button
          onClick={() => navigate('/onboarding/language')}
          className="group inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/30 text-lg"
        >
          {t('welcome.continue')}
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
