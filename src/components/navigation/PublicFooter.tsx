import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0052cc] flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">{t.nav.brandName}</span>
                <span className="text-xs text-sky-400 font-semibold">{t.nav.brandTagline}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{t.footer.description}</p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full System Integration Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.footer.quickLinksTitle}</h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { label: t.footer.home, path: '/' },
                { label: t.footer.aboutUs, path: '/about' },
                { label: t.footer.services, path: '/services' },
                { label: t.footer.contact, path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.footer.portalsTitle}</h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { label: t.footer.doctorPortal, path: '/login/doctor' },
                { label: t.footer.staffPortal, path: '/login/staff' },
                { label: t.footer.patientPortal, path: '/login/patient' },
                { label: 'Phase 6 Integration Tests', path: '/integration-tests' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">{t.footer.supportTitle}</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{t.footer.emailLabel}</span>
                  <code className="text-[11px] font-mono">{t.footer.emailVal}</code>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{t.footer.phoneLabel}</span>
                  <span>{t.footer.phoneVal}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-slate-300 font-semibold">{t.footer.addressLabel}</span>
                  <span>{t.footer.addressVal}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-center md:text-left text-slate-400">{t.footer.medicalDisclaimer}</p>
          <div className="flex items-center gap-4 shrink-0">
            <button type="button" onClick={() => navigate('/about')} className="hover:text-slate-300 transition-colors cursor-pointer">{t.footer.privacy}</button>
            <span>·</span>
            <button type="button" onClick={() => navigate('/about')} className="hover:text-slate-300 transition-colors cursor-pointer">{t.footer.terms}</button>
            <span>·</span>
            <span>{t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
