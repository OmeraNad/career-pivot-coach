import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Compass } from 'lucide-react';

export default function Signup() {
  const { t } = useTranslation();
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError(t('signup.error.mismatch')); return; }
    try {
      await signup(name, email, password);
      navigate('/welcome');
    } catch (err) {
      if (err.message === 'EXISTS') setError(t('signup.error.exists'));
      else setError(t('signup.error.generic'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EB] flex items-center justify-center p-4 selection:bg-[#68734A]/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#68734A] rounded-2xl flex items-center justify-center shadow-md shadow-[#68734A]/20">
            <Compass size={26} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#292923]">Career Compass</span>
        </div>

        <div className="bg-white border border-[#D9D3C4] rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#292923] mb-1">{t('signup.title')}</h1>
          <p className="text-[#626153] mb-8 text-sm">{t('signup.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#292923]">{t('signup.name')}</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85836F]" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl pl-10 pr-4 py-2.5 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 transition-all text-sm"
                  placeholder="John Doe" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#292923]">{t('signup.email')}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85836F]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl pl-10 pr-4 py-2.5 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 transition-all text-sm"
                  placeholder="you@example.com" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#292923]">{t('signup.password')}</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85836F]" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl pl-10 pr-10 py-2.5 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 transition-all text-sm"
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#85836F] hover:text-[#292923] transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-[#292923]">{t('signup.confirm')}</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85836F]" />
                <input type={showPass ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} required
                  className="w-full bg-[#FFFDF7] border border-[#D9D3C4] rounded-xl pl-10 pr-4 py-2.5 text-[#292923] placeholder-[#85836F] focus:outline-none focus:border-[#68734A] focus:ring-2 focus:ring-[#68734A]/15 transition-all text-sm"
                  placeholder="••••••••" />
              </div>
            </div>

            {error && (
              <div className="bg-[#ba3c3c]/10 border border-[#ba3c3c]/30 rounded-xl px-4 py-3 text-sm text-[#ba3c3c]">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-[#68734A] hover:bg-[#515D3A] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {t('signup.button')}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[#EEEADF] pt-5">
            <p className="text-[#626153] text-sm">
              {t('signup.hasAccount')}{' '}
              <Link to="/login" className="text-[#68734A] hover:text-[#3F4A2F] font-semibold underline underline-offset-2 transition-colors">
                {t('signup.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
