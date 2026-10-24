import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { authService } from '../services/auth';
import { staffStore } from '../services/staffStore';
import type { StaffRole } from '../types/staff';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  CalendarDays,
  ListOrdered,
  AlertOctagon,
  Bell,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  ChevronRight,
  Calendar,
  Lock,
} from 'lucide-react';

interface StaffLayoutProps {
  children: React.ReactNode;
}

export const StaffLayout: React.FC<StaffLayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const ts = t.staffPortal;

  const [activeRole, setActiveRole] = useState<StaffRole>(staffStore.getActiveRole());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifications = staffStore.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (role: StaffRole) => {
    setActiveRole(role);
    staffStore.setActiveRole(role);
  };

  const handleLogout = () => {
    authService.clearSession();
    navigate('/login/staff');
  };

  const navItems = [
    {
      to: '/staff',
      end: true,
      label: ts.dashboard,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/staff/registration',
      end: false,
      label: ts.patientRegistration,
      icon: UserPlus,
      badge: null,
    },
    {
      to: '/staff/records',
      end: false,
      label: ts.patientRecords,
      icon: Users,
      badge: null,
    },
    {
      to: '/staff/appointments',
      end: false,
      label: ts.appointments,
      icon: CalendarDays,
      badge: null,
    },
    {
      to: '/staff/queue',
      end: false,
      label: ts.queueManagement,
      icon: ListOrdered,
      badge: null,
    },
    {
      to: '/staff/emergency',
      end: false,
      label: ts.emergencyCases,
      icon: AlertOctagon,
      badge: 'ALERT',
    },
    {
      to: '/staff/notifications',
      end: false,
      label: ts.notifications,
      icon: Bell,
      badge: unreadCount > 0 ? `${unreadCount}` : null,
    },
    {
      to: '/staff/settings',
      end: false,
      label: ts.settings,
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

  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );
  const pageTitle = currentNav?.label || ts.dashboard;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Desktop Sidebar (Reference Design Royal Blue) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0052cc] text-white shrink-0 select-none shadow-xl relative z-20">
          {/* Brand Header */}
          <div className="p-6 pb-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <h1 className="font-extrabold text-white leading-tight text-lg tracking-tight">
                  Trails<br /><span className="font-semibold text-sky-200">Monitor</span>
                </h1>
                <p className="text-[9px] font-semibold tracking-wider text-sky-200/80 uppercase mt-0.5">
                  Staff Operations
                </p>
              </div>
            </Link>

            {/* Active Staff Member Card */}
            <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold text-sky-200 uppercase tracking-wider">
                  Staff Designation
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {activeRole === 'compounder' ? 'Compounder' : 'Receptionist'}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">
                {activeRole === 'compounder' ? 'Amit Gupta (Compounder)' : 'Neha Pawar (Receptionist)'}
              </p>
              {/* Role Toggle Pill inside Sidebar */}
              <div className="mt-2.5 grid grid-cols-2 gap-1 bg-black/20 p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => handleRoleChange('receptionist')}
                  className={`py-1 text-[10px] font-bold rounded-full transition-all ${
                    activeRole === 'receptionist'
                      ? 'bg-white text-[#0052cc] shadow-xs'
                      : 'text-sky-200 hover:text-white'
                  }`}
                >
                  Reception
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('compounder')}
                  className={`py-1 text-[10px] font-bold rounded-full transition-all ${
                    activeRole === 'compounder'
                      ? 'bg-white text-[#0052cc] shadow-xs'
                      : 'text-sky-200 hover:text-white'
                  }`}
                >
                  Compounder
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Section Label */}
          <div className="px-6 pt-2 pb-2">
            <span className="text-[10px] font-extrabold tracking-widest text-sky-200/60 uppercase">
              Operations Menu
            </span>
          </div>

          {/* Navigation Links */}
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
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        item.badge === 'ALERT'
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
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
                <span>{language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
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
              <span>{ts.logout}</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden bg-[#0052cc] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <Link to="/staff" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-white text-sm block leading-none">
                Trails Staff
              </span>
              <span className="text-[10px] font-semibold text-sky-200 uppercase">
                {activeRole === 'compounder' ? 'Compounder' : 'Receptionist'}
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
              to="/staff/notifications"
              className="relative p-2 rounded-lg text-white hover:bg-white/15"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
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
                {ts.logout}
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area with Reference Top Navbar Header */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 py-4 sticky top-0 z-10 hidden lg:flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-0.5">
                <span>Hospital Operations</span>
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
                <span>Staff Session Active</span>
              </div>

              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-black flex items-center justify-center text-sm shadow-sm ring-2 ring-sky-100">
                  {activeRole === 'compounder' ? 'AG' : 'NP'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-slate-900 leading-tight">
                    {activeRole === 'compounder' ? 'Amit Gupta' : 'Neha Pawar'}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400">
                    {activeRole === 'compounder' ? 'Triage Compounder' : 'Desk Receptionist'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
