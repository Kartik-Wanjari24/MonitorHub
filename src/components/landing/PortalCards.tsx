import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { type UserRole } from '../../services/auth';
import {
  Stethoscope,
  ClipboardList,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PortalCardsProps {
  onNavigateToLogin?: (role: UserRole) => void;
}

export const PortalCards: React.FC<PortalCardsProps> = ({ onNavigateToLogin }) => {
  const { t } = useLanguage();

  const portals = [
    {
      id: 'doctor' as UserRole,
      title: t.portals.doctorTitle,
      badge: t.portals.doctorBadge,
      description: t.portals.doctorDesc,
      cta: t.portals.doctorCta,
      icon: Stethoscope,
      bgCard: 'bg-[#E6F0FF]',
      borderCard: 'border-[#BFDBFE] hover:border-[#0052cc]',
      iconBg: 'bg-[#0052cc] text-white',
      badgeColor: 'bg-white text-[#0052cc] border-blue-200',
      buttonBg: 'bg-[#0052cc] hover:bg-[#0043a8] text-white shadow-md shadow-blue-600/20',
      demoUser: 'Dr. Aarav Sharma',
    },
    {
      id: 'staff' as UserRole,
      title: t.portals.staffTitle,
      badge: t.portals.staffBadge,
      description: t.portals.staffDesc,
      cta: t.portals.staffCta,
      icon: ClipboardList,
      bgCard: 'bg-[#F4F7FB]',
      borderCard: 'border-slate-200 hover:border-slate-400',
      iconBg: 'bg-slate-800 text-white',
      badgeColor: 'bg-white text-slate-800 border-slate-200',
      buttonBg: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20',
      demoUser: 'Neha Pawar (Reception) / Amit Gupta',
    },
    {
      id: 'patient' as UserRole,
      title: t.portals.patientTitle,
      badge: t.portals.patientBadge,
      description: t.portals.patientDesc,
      cta: t.portals.patientCta,
      icon: HeartPulse,
      bgCard: 'bg-[#EDE9FE]',
      borderCard: 'border-[#DDD6FE] hover:border-purple-500',
      iconBg: 'bg-purple-600 text-white',
      badgeColor: 'bg-white text-purple-900 border-purple-200',
      buttonBg: 'bg-purple-700 hover:bg-purple-800 text-white shadow-md shadow-purple-700/20',
      demoUser: 'Rahul Verma (Token #02)',
    },
  ];

  return (
    <section id="portals" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#E6F0FF] text-[#0052cc]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.portals.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.portals.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.portals.sectionSubtitle}
          </p>
        </div>

        {/* 3 Portal Cards Grid Styled after Reference Soft Pastel Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className={`flex flex-col justify-between rounded-[2rem] p-8 border transition-all duration-300 hover:shadow-xl group ${portal.bgCard} ${portal.borderCard}`}
              >
                <div>
                  {/* Top Bar: Icon & Role Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${portal.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${portal.badgeColor}`}
                    >
                      {portal.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {portal.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mb-3">
                    Sample identity: {portal.demoUser}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium mb-6">
                    {portal.description}
                  </p>
                </div>

                {/* Bottom Action Pill Button */}
                <div className="pt-4 border-t border-black/5">
                  <button
                    type="button"
                    onClick={() => onNavigateToLogin?.(portal.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-extrabold text-sm transition-all focus:outline-none focus-visible:ring-2 active:scale-95 cursor-pointer ${portal.buttonBg}`}
                  >
                    <span>{portal.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
