import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { Globe, Menu, X, ArrowRight, ChevronRight } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.aboutUs, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* Brand with pulse icon */}
          <button
            type="button"
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052cc] rounded-2xl p-1 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#0052cc] flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-[#0052cc] transition-colors block leading-none">
                Trails Monitor
              </span>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5 block">
                Unified Healthcare System
              </span>
            </div>
          </button>

          {/* Desktop Nav Items (Pill Style) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F4F7FB] p-1 rounded-full border border-slate-200/60">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  isActive(item.path)
                    ? 'text-[#0052cc] bg-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all cursor-pointer"
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#0052cc]" />
              <span>{t.nav.languageToggle}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/portal')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-[#0052cc] hover:bg-[#0043a8] rounded-full shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
            >
              <span>{t.nav.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-full"
            >
              <Globe className="w-3 h-3 text-[#0052cc]" />
              <span>{language === 'en' ? 'हि' : 'EN'}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-xs font-bold transition-colors ${
                  isActive(item.path)
                    ? 'text-[#0052cc] bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => { navigate('/portal'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-extrabold text-white bg-[#0052cc] rounded-full shadow-md"
            >
              <span>{t.nav.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
