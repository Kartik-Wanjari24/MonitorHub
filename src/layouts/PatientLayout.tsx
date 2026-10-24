import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { authService } from '../services/auth';
import { patientStore } from '../services/patientStore';
import {
  LayoutDashboard,
  Clock,
  Stethoscope,
  FolderHeart,
  Activity,
  CalendarDays,
  Pill,
  FileText,
  BookOpen,
  LifeBuoy,
  Receipt,
  User,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Lock,
} from 'lucide-react';

interface PatientLayoutProps {
  children: React.ReactNode;
}

export const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const tp = t.patientPortal;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const patient = patientStore.getCurrentPatient();

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login/patient');
  };

  const navItems = [
    { to: '/patient', end: true, label: tp.navDashboard, icon: LayoutDashboard },
    { to: '/patient/queue', end: false, label: tp.navQueue, icon: Clock },
    { to: '/patient/visit', end: false, label: tp.navDoctorVisit, icon: Stethoscope },
    { to: '/patient/records', end: false, label: tp.navRecords, icon: FolderHeart },
    { to: '/patient/vitals', end: false, label: tp.navVitals, icon: Activity },
    { to: '/patient/appointments', end: false, label: tp.navAppointments, icon: CalendarDays },
    { to: '/patient/medications', end: false, label: tp.navMedications, icon: Pill },
    { to: '/patient/reports', end: false, label: tp.navReports, icon: FileText },
    { to: '/patient/diary', end: false, label: tp.navDiary, icon: BookOpen },
    { to: '/patient/help', end: false, label: tp.navHelp, icon: LifeBuoy, highlight: true },
    { to: '/patient/billing', end: false, label: tp.navBilling, icon: Receipt },
    { to: '/patient/profile', end: false, label: tp.navProfile, icon: User },
  ];

  const [todayFormatted] = useState(() =>
    new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(2026, 9, 24))
  );

  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.label || tp.navDashboard;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Desktop Sidebar (Reference Design Royal Blue) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0052cc] text-white shrink-0 select-none shadow-xl relative z-20">
          {/* Brand Header */}
          <div className="p-6 pb-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h1 className="font-extrabold text-white leading-tight text-lg tracking-tight">
                  Trails<br /><span className="font-semibold text-sky-200">Patient</span>
                </h1>
                <p className="text-[9px] font-semibold tracking-wider text-sky-200/80 uppercase mt-0.5">
                  Personal Health Hub
                </p>
              </div>
            </Link>

            {/* Current Patient Identity Card */}
            <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-[10px] font-extrabold text-sky-200 uppercase tracking-wider block mb-1">
                Welcome back
              </span>
              <p className="text-xs font-bold text-white truncate">
                {patient?.fullName || 'Rahul Verma'}
              </p>
              <p className="text-[10px] text-sky-200/80 font-mono mt-0.5">
                ID • {patient?.id || 'TMH-2026-001'}
              </p>
            </div>
          </div>

          {/* Quick SOS Emergency Button */}
          <div className="px-4 py-2">
            <Link
              to="/patient/help"
              className="w-full py-2.5 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all animate-pulse"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Call For Help (SOS)</span>
            </Link>
          </div>

          <div className="px-6 pt-2 pb-1">
            <span className="text-[10px] font-extrabold tracking-widest text-sky-200/60 uppercase">
              Health Menu
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-1 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-[#0052cc] shadow-md shadow-black/10'
                        : item.highlight
                        ? 'bg-white/15 text-rose-200 hover:bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 space-y-1.5">
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-300" />
                <span>{tp.languageToggle}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {language.toUpperCase()}
              </span>
            </button>

            <Link
              to="/"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>Main Website</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-200 hover:text-white hover:bg-rose-600/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{tp.signOut}</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden bg-[#0052cc] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <Link to="/patient" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-white text-sm block leading-none">
                Trails Patient
              </span>
              <span className="text-[10px] font-semibold text-sky-200 uppercase">
                {patient?.fullName || 'Patient'}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1 text-xs rounded-full bg-white/15 text-white font-bold"
            >
              {language === 'en' ? 'हिंदी' : 'EN'}
            </button>

            <Link
              to="/patient/help"
              className="px-3 py-1 text-xs rounded-full bg-rose-600 text-white font-black animate-pulse"
            >
              SOS
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/15"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0043a8] text-white border-b border-blue-900 p-4 space-y-2 shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold ${
                    isActive
                      ? 'bg-white text-[#0052cc]'
                      : item.highlight
                      ? 'bg-rose-600 text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-white/15 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-sky-200 font-semibold"
              >
                Main Website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs font-bold text-rose-300"
              >
                {tp.signOut}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area with Reference Top Navbar Header */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 py-4 sticky top-0 z-10 hidden lg:flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-0.5">
                <span>Patient Health Portal</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-slate-600 font-bold">{pageTitle}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {pageTitle}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{todayFormatted}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0052cc] text-white text-xs font-bold shadow-xs">
                <Lock className="w-3.5 h-3.5 text-sky-200" />
                <span>Patient Session Active</span>
              </div>

              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-sm shadow-sm ring-2 ring-emerald-100">
                  {patient?.fullName ? patient.fullName.charAt(0) : 'R'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900 leading-tight">
                    {patient?.fullName || 'Rahul Verma'}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 font-mono">
                    {patient?.id || 'TMH-2026-001'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
