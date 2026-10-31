import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, Compass } from 'lucide-react';

export default function Login() {
  const { t } = useTranslation();
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.onboarded ? '/dashboard' : '/welcome');
    } catch (err) {
      if (err.message === 'NOT_FOUND') setError(t('login.error.notFound'));
      else if (err.message === 'WRONG_PASSWORD') setError(t('login.error.wrongPassword'));
      else setError(t('login.error.generic'));
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-4 selection:bg-[#556b2f]/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#556b2f] rounded-2xl flex items-center justify-center shadow-md shadow-[#556b2f]/20">
            <Compass size={26} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1e2019]">CareerPivot</span>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e4e1d6] rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#1e2019] mb-1">{t('login.title')}</h1>
          <p className="text-[#636659] mb-8 text-sm">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#2b2d27]">{t('login.email')}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c907f]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl pl-10 pr-4 py-3 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#2b2d27]">{t('login.password')}</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c907f]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#faf9f5] border border-[#dcd8cb] rounded-xl pl-10 pr-10 py-3 text-[#1e2019] placeholder-[#9a9e8f] focus:outline-none focus:border-[#556b2f] focus:ring-2 focus:ring-[#556b2f]/15 transition-all text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8c907f] hover:text-[#1e2019] transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#ba3c3c]/10 border border-[#ba3c3c]/30 rounded-xl px-4 py-3 text-sm text-[#ba3c3c]">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#556b2f] hover:bg-[#445625] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {t('login.button')}
            </button>
          </form>

          {/* Create account link */}
          <div className="mt-6 text-center border-t border-[#f0eee6] pt-5">
            <p className="text-[#636659] text-sm">
              {t('login.noAccount')}{' '}
              <Link to="/signup" className="text-[#556b2f] hover:text-[#3f5022] font-semibold underline underline-offset-2 transition-colors">
                {t('login.createAccount')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
