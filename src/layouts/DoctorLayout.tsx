import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { authService } from '../services/auth';
import { doctorStore } from '../services/doctorStore';
import {
  LayoutDashboard,
  ListOrdered,
  Users,
  Activity,
  FileEdit,
  Bell,
  ArrowRightLeft,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Lock,
  Box,
} from 'lucide-react';
import { ProfileImage } from '../components/common/ProfileImage';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const td = t.doctorPortal;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const alerts = doctorStore.getAlerts();
  const unreadAlerts = alerts.filter((a) => !a.acknowledged).length;

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login/doctor');
  };

  const navItems = [
    {
      to: '/doctor',
      end: true,
      label: td.dashboard,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/doctor/queue',
      end: false,
      label: td.smartQueue,
      icon: ListOrdered,
      badge: null,
    },
    {
      to: '/doctor/profiles',
      end: false,
      label: td.patientProfiles,
      icon: Users,
      badge: null,
    },
    {
      to: '/doctor/anatomy',
      end: false,
      label: '3D Anatomy',
      icon: Box,
      badge: null,
    },
    {
      to: '/doctor/vitals',
      end: false,
      label: td.vitalsMonitoring,
      icon: Activity,
      badge: null,
    },
    {
      to: '/doctor/consultations',
      end: false,
      label: td.consultations,
      icon: FileEdit,
      badge: null,
    },
    {
      to: '/doctor/alerts',
      end: false,
      label: td.alerts,
      icon: Bell,
      badge: unreadAlerts > 0 ? `${unreadAlerts}` : null,
    },
    {
      to: '/doctor/handover',
      end: false,
      label: td.patientHandover,
      icon: ArrowRightLeft,
      badge: null,
    },
    {
      to: '/doctor/settings',
      end: false,
      label: td.settings,
      icon: Settings,
      badge: null,
    },
  ];

  // Current formatted date in DD MMM YYYY Indian format
  const [todayFormatted] = useState(() =>
    new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(2026, 9, 24))
  );

  // Derive page title & breadcrumb
  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.label || td.dashboard;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Desktop Sidebar (Reference Design Royal Blue) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0052cc] text-white shrink-0 select-none shadow-xl relative z-20">
          {/* Brand Header */}
          <div className="p-6 pb-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                {/* Reference style pulse wave logo */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h1 className="font-extrabold text-white leading-tight text-lg tracking-tight">
                  Trails<br /><span className="font-semibold text-sky-200">Monitor</span>
                </h1>
                <p className="text-[9px] font-semibold tracking-wider text-sky-200/80 uppercase mt-0.5">
                  Patient Care, Connected.
                </p>
              </div>
            </Link>
          </div>

          {/* Sidebar Section Label */}
          <div className="px-6 pt-4 pb-2">
            <span className="text-[10px] font-extrabold tracking-widest text-sky-200/60 uppercase">
              Your Workspace
            </span>
          </div>

          {/* Nav Items (Pill-shaped with white active background as in reference) */}
          <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-[#0052cc] shadow-md shadow-black/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Reference Bottom Card: Care, with clarity */}
          <div className="p-4 mx-4 mb-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <svg className="w-4 h-4 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <h4 className="text-xs font-bold text-white leading-tight">Care, with clarity.</h4>
            </div>
            <p className="text-[11px] text-sky-100/80 leading-relaxed">
              Every small insight makes a difference.
            </p>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-sky-200/90 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-sky-300" /> Made for better care
              </span>
            </div>
          </div>

          {/* Sidebar Footer Actions */}
          <div className="p-4 border-t border-white/10 space-y-1.5">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-300" />
                <span>{language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Back to Public Site */}
            <Link
              to="/"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>Main Website</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-300" />
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-200 hover:text-white hover:bg-rose-600/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{td.signOut}</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden bg-[#0052cc] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <Link to="/doctor" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-white text-sm block leading-none">
                Trails Monitor
              </span>
              <span className="text-[10px] font-semibold text-sky-200 uppercase">
                {td.drName}
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
              to="/doctor/alerts"
              className="relative p-2 rounded-lg text-white hover:bg-white/15"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400" />
              )}
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

        {/* Mobile Navigation Drawer */}
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
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
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
                {td.signOut}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area with Reference Top Navbar Header */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar matching reference: Breadcrumb, Page title, Date, Doctor Sign In Pill, Profile Avatar */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 py-4 sticky top-0 z-10 hidden lg:flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-0.5">
                <span>Workspace</span>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-slate-600 font-bold">{pageTitle}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {pageTitle}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{todayFormatted}</span>
              </div>

              {/* Doctor Sign In / Session Status Pill (From Reference Design) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0052cc] text-white text-xs font-bold shadow-xs">
                <Lock className="w-3.5 h-3.5 text-sky-200" />
                <span>Doctor session active</span>
              </div>

              {/* User Avatar & Name */}
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <ProfileImage
                  type="doctor"
                  identifier={td.drName}
                  name={td.drName}
                  size="sm"
                  className="shadow-sm"
                />
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900 leading-tight">
                    {td.drName}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Cardiologist & Physician
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
