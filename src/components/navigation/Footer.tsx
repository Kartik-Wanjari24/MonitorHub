import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import {
  Activity,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface FooterProps {
  onOpenPhaseNotice: (featureName: string) => void;
  onNavigateToPortals: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPhaseNotice,
  onNavigateToPortals,
}) => {
  const { t } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    onOpenPhaseNotice(label);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {t.nav.brandName}
                </span>
                <span className="text-xs text-blue-400 font-medium">
                  {t.nav.brandTagline}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/80 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Phase 1 Verification Complete</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={handleHomeClick}
                  className="hover:text-white transition-colors"
                >
                  {t.footer.home}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, t.footer.aboutUs)}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{t.footer.aboutUs}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, t.footer.services)}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{t.footer.services}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, t.footer.contact)}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>{t.footer.contact}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.portalsTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onNavigateToPortals}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.doctorPortal}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToPortals}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.staffPortal}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateToPortals}
                  className="hover:text-white transition-colors text-left"
                >
                  {t.footer.patientPortal}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support Placeholders */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t.footer.supportTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">
                    {t.footer.emailLabel}
                  </span>
                  <code className="text-slate-400 text-[11px]">{t.footer.emailVal}</code>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">
                    {t.footer.phoneLabel}
                  </span>
                  <span>{t.footer.phoneVal}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-medium">
                    {t.footer.addressLabel}
                  </span>
                  <span>{t.footer.addressVal}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Prototype Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-center md:text-left text-slate-400">
            {t.footer.medicalDisclaimer}
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>{t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
