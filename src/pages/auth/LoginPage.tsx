import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { PublicLayout } from '../../layouts/PublicLayout';
import { authService, type UserRole, DEMO_CREDENTIALS } from '../../services/auth';
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Info,
  Stethoscope,
  ClipboardList,
  HeartPulse,
} from 'lucide-react';

const ROLE_CONFIG: Record<
  UserRole,
  {
    icon: React.FC<{ className?: string }>;
    accentColor: string;
    buttonBg: string;
    ringColor: string;
    badgeBg: string;
  }
> = {
  doctor: {
    icon: Stethoscope,
    accentColor: 'from-[#0052cc] to-indigo-700',
    buttonBg: 'bg-[#0052cc] hover:bg-[#0043a8] focus-visible:ring-[#0052cc]',
    ringColor: 'focus-visible:ring-[#0052cc]',
    badgeBg: 'bg-white/20 text-white border-white/30',
  },
  staff: {
    icon: ClipboardList,
    accentColor: 'from-slate-800 to-slate-950',
    buttonBg: 'bg-slate-900 hover:bg-slate-800 focus-visible:ring-slate-900',
    ringColor: 'focus-visible:ring-slate-900',
    badgeBg: 'bg-white/20 text-white border-white/30',
  },
  patient: {
    icon: HeartPulse,
    accentColor: 'from-purple-700 to-indigo-900',
    buttonBg: 'bg-purple-700 hover:bg-purple-800 focus-visible:ring-purple-700',
    ringColor: 'focus-visible:ring-purple-700',
    badgeBg: 'bg-white/20 text-white border-white/30',
  },
};

interface LoginPageProps {
  role: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ role }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tl = t.login;
  const cfg = ROLE_CONFIG[role];
  const Icon = cfg.icon;

  const roleTitle = role === 'doctor' ? tl.doctorTitle : role === 'staff' ? tl.staffTitle : tl.patientTitle;
  const roleSubtitle = role === 'doctor' ? tl.doctorSubtitle : role === 'staff' ? tl.staffSubtitle : tl.patientSubtitle;
  const roleBadge = role === 'doctor' ? tl.doctorBadge : role === 'staff' ? tl.staffBadge : tl.patientBadge;
  const demoCreds = DEMO_CREDENTIALS[role];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = tl.errorRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = tl.errorEmail;
    if (!password.trim()) errs.password = tl.errorRequired;
    else if (password.length < 6) errs.password = tl.errorPasswordLen;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setErrors({});

    await new Promise((r) => setTimeout(r, 600));

    const user = authService.validateCredentials(email, password);
    if (!user) {
      setErrors({ general: tl.errorInvalidCreds });
      setIsLoading(false);
      return;
    }

    if (user.role !== role) {
      setErrors({ general: tl.errorInvalidCreds });
      setIsLoading(false);
      return;
    }

    authService.setSession(user);
    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      if (user.role === 'staff') {
        navigate('/staff');
      } else if (user.role === 'doctor') {
        navigate('/doctor');
      } else if (user.role === 'patient') {
        navigate('/patient');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  const fillDemoCreds = () => {
    setEmail(demoCreds.email);
    setPassword(demoCreds.password);
    setErrors({});
  };

  if (isSuccess) {
    return (
      <PublicLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#F4F7FB]">
          <div className="max-w-md w-full text-center space-y-5 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-11 h-11" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">{tl.successTitle}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{tl.successText}</p>
            <div className="flex justify-center pt-2">
              <span className="w-6 h-6 rounded-full border-3 border-blue-200 border-t-[#0052cc] animate-spin block" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#F4F7FB]">
        <div className="w-full max-w-md space-y-6">
          {/* Role Header Card with Pill Badge and Soft Radii */}
          <div className={`rounded-[2rem] p-7 bg-gradient-to-br ${cfg.accentColor} text-white shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">
                {roleBadge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">{roleTitle}</h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed font-medium">{roleSubtitle}</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-lg p-7 sm:p-8 space-y-5">
            {/* Demo Credentials Helper Card with Indian Demo Identities */}
            <div className="bg-[#E6F0FF] rounded-2xl border border-[#BFDBFE] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <KeyRound className="w-3.5 h-3.5 text-[#0052cc]" />
                  <span>{tl.demoCredentials} ({demoCreds.name})</span>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCreds}
                  className="text-[11px] font-extrabold text-[#0052cc] bg-white hover:bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-2xs transition-all cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">{tl.emailLabel}</span>
                  <code className="text-slate-800 font-bold text-[11px]">{demoCreds.email}</code>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">{tl.passwordLabel}</span>
                  <code className="text-slate-800 font-bold text-[11px]">{demoCreds.password}</code>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-blue-900 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>Development prototype credentials • Indian demo user</span>
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-800">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {tl.emailLabel} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder={tl.emailPlaceholder}
                  className={`w-full px-4 py-3 text-sm rounded-full border bg-white transition-colors focus:outline-none focus-visible:ring-2 ${cfg.ringColor} ${
                    errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  {tl.passwordLabel} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder={tl.passwordPlaceholder}
                    className={`w-full px-4 py-3 pr-11 text-sm rounded-full border bg-white transition-colors focus:outline-none focus-visible:ring-2 ${cfg.ringColor} ${
                      errors.password ? 'border-rose-400 bg-rose-50' : 'border-slate-200 focus:border-blue-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? tl.hidePassword : tl.showPassword}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600"
                  />
                  <span className="text-slate-600 font-medium">{tl.rememberMe}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(!showForgotNotice)}
                  className="font-bold text-[#0052cc] hover:underline transition-colors"
                >
                  {tl.forgotPassword}
                </button>
              </div>

              {showForgotNotice && (
                <div className="flex items-start gap-2 text-xs p-3 bg-blue-50 border border-blue-200/80 rounded-2xl text-blue-800">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                  <span>{tl.forgotNotice}</span>
                </div>
              )}

              {/* Submit Pill Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-extrabold text-white rounded-full shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-70 cursor-pointer ${cfg.buttonBg}`}
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>{tl.loggingIn}</span>
                  </>
                ) : (
                  <>
                    <span>{tl.loginButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Links */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{tl.backToHome}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/portal')}
                className="font-bold text-[#0052cc] hover:underline"
              >
                {tl.changePortal}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
