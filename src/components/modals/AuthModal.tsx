import React, { useState } from 'react';
import { X, Zap, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authMode, 
    setAuthMode, 
    login, 
    signup, 
    sendResetEmail,
    loginWithGoogle
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (authMode === 'reset-password') {
        const res = await sendResetEmail(email.trim());
        if (res.success) {
          setSuccessMessage(res.message);
        } else {
          setErrorMessage(res.message);
        }
      } else if (authMode === 'signup') {
        const res = await signup(email.trim(), password.trim(), name.trim() || 'Beta Tester');
        if (!res.success && res.message) {
          setErrorMessage(res.message);
        }
      } else {
        const res = await login(email.trim(), password.trim(), name.trim());
        if (!res.success && res.message) {
          setErrorMessage(res.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await loginWithGoogle();
      if (!res.success && res.message) {
        setErrorMessage(res.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode: 'signin' | 'signup' | 'reset-password') => {
    setAuthMode(mode);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#13161f] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-glow-sm">
            <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">DelightyLabs</h3>
            <p className="text-xs text-zinc-400">Beta Testing & Evaluation Hub</p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-[#0c0e12] p-1 rounded-xl border border-zinc-800 mb-5">
          <button
            type="button"
            onClick={() => switchMode('signin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Title */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">
            {authMode === 'signin' && 'Sign in to DelightyLabs'}
            {authMode === 'signup' && 'Join the Beta Testing Lab'}
            {authMode === 'reset-password' && 'Reset your password'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {authMode === 'signin' && 'Access published web apps, test sandboxes, and submit feedback in real-time.'}
            {authMode === 'signup' && 'Create your account to receive $40 in tester credits and publish apps.'}
            {authMode === 'reset-password' && 'Enter your registered email to receive a password reset link.'}
          </p>
        </div>

        {/* Inline Feedback Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Google OAuth (Visible for Sign In & Sign Up) */}
        {authMode !== 'reset-password' && (
          <>
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 hover:border-zinc-600 text-zinc-200 font-medium text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Account</span>
              </button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#13161f] px-3 text-zinc-400">Or continue with email</span>
              </div>
            </div>
          </>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e12] border border-zinc-700/80 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0e12] border border-zinc-700/80 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {authMode !== 'reset-password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-zinc-300">Password</label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => switchMode('reset-password')}
                    className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#0c0e12] border border-zinc-700/80 text-zinc-100 placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-glow-sm active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {loading 
                ? 'Processing...' 
                : authMode === 'signin' 
                  ? 'Sign in to Account' 
                  : authMode === 'signup' 
                    ? 'Create Beta Tester Account' 
                    : 'Send Reset Link'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Mode Switch */}
        <div className="mt-5 text-center text-xs text-zinc-400">
          {authMode === 'signin' && (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
              >
                Sign up now
              </button>
            </p>
          )}

          {authMode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          )}

          {authMode === 'reset-password' && (
            <p>
              Remembered your password?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
              >
                Back to Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


