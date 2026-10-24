import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { Activity, Globe, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenPhaseNotice: (featureName: string) => void;
  onNavigateToPortals: () => void;
  onNavigateToServices: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPhaseNotice,
  onNavigateToPortals,
  onNavigateToServices,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateToServices();
    setMobileMenuOpen(false);
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigateToPortals();
    setMobileMenuOpen(false);
  };

  const handlePlaceholderClick = (e: React.MouseEvent, pageName: string) => {
    e.preventDefault();
    onOpenPhaseNotice(pageName);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#home"
            onClick={handleHomeClick}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors block">
                {t.nav.brandName}
              </span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {t.nav.brandTagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="px-3.5 py-2 text-sm font-semibold text-blue-600 bg-blue-50/80 rounded-lg transition-colors"
            >
              {t.nav.home}
            </a>
            <a
              href="#about"
              onClick={(e) => handlePlaceholderClick(e, t.nav.aboutUs)}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {t.nav.aboutUs}
            </a>
            <a
              href="#services"
              onClick={handleServicesClick}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#contact"
              onClick={(e) => handlePlaceholderClick(e, t.nav.contact)}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Right Controls: Language Switcher & Login CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              title={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
              aria-label={t.nav.languageToggle}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.nav.languageToggle}</span>
            </button>

            {/* Login / Portal Select Button */}
            <button
              onClick={handleLoginClick}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95"
            >
              <span>{t.nav.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger & Quick Lang Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-md"
              aria-label={t.nav.languageToggle}
            >
              <Globe className="w-3 h-3 text-blue-600" />
              <span>{language === 'en' ? 'हि' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Menu Navigation
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
              {t.nav.phaseBadge}
            </span>
          </div>

          <div className="grid gap-1">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50"
            >
              {t.nav.home}
            </a>
            <a
              href="#about"
              onClick={(e) => handlePlaceholderClick(e, t.nav.aboutUs)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t.nav.aboutUs}
            </a>
            <a
              href="#services"
              onClick={handleServicesClick}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t.nav.services}
            </a>
            <a
              href="#contact"
              onClick={(e) => handlePlaceholderClick(e, t.nav.contact)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t.nav.contact}
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={handleLoginClick}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              <span>{t.nav.login}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={toggleLanguage}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Switch language to {language === 'en' ? 'Hindi (हिंदी)' : 'English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
