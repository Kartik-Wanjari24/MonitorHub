import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import {
  FileText,
  UsersRound,
  Activity,
  AlertTriangle,
  Network,
  CheckCircle,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: 1,
      title: t.features.feature1Title,
      description: t.features.feature1Desc,
      icon: FileText,
      iconBg: 'bg-[#E6F0FF] text-[#0052cc]',
      badge: 'Zero Redundancy',
      softBg: 'bg-[#E6F0FF]/30 border-[#BFDBFE]/60',
    },
    {
      id: 2,
      title: t.features.feature2Title,
      description: t.features.feature2Desc,
      icon: UsersRound,
      iconBg: 'bg-indigo-100 text-indigo-700',
      badge: 'Real-Time OPD',
      softBg: 'bg-white border-slate-200/90',
    },
    {
      id: 3,
      title: t.features.feature3Title,
      description: t.features.feature3Desc,
      icon: Activity,
      iconBg: 'bg-emerald-100 text-emerald-700',
      badge: 'Chronological Vitals',
      softBg: 'bg-white border-slate-200/90',
    },
    {
      id: 4,
      title: t.features.feature4Title,
      description: t.features.feature4Desc,
      icon: AlertTriangle,
      iconBg: 'bg-rose-100 text-rose-700',
      badge: 'Rapid Triage',
      softBg: 'bg-white border-slate-200/90',
    },
    {
      id: 5,
      title: t.features.feature5Title,
      description: t.features.feature5Desc,
      icon: Network,
      iconBg: 'bg-purple-100 text-purple-700',
      badge: 'Care Team Sync',
      softBg: 'bg-[#EDE9FE]/30 border-[#DDD6FE]/60',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#F4F7FB] relative border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#E6F0FF] text-[#0052cc]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{t.features.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.features.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.features.sectionSubtitle}
          </p>
        </div>

        {/* Feature Cards Grid (Rounded 2rem cards with subtle borders) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLast = idx === features.length - 1;
            return (
              <div
                key={feature.id}
                className={`rounded-[2rem] p-8 border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${feature.softBg} ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-xs`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600 bg-white px-3 py-1 rounded-full border shadow-2xs">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center gap-1.5 text-xs font-bold text-[#0052cc]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Standardized Clinical Workflow</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
