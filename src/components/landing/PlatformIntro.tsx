import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import {
  Layers,
  ArrowRight,
  ClipboardCheck,
  Stethoscope,
  HeartHandshake,
  Info,
} from 'lucide-react';

export const PlatformIntro: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: t.platformIntro.staffStepTitle,
      description: t.platformIntro.staffStepDesc,
      icon: ClipboardCheck,
      color: 'bg-[#F4F7FB] text-slate-800 border-slate-200',
    },
    {
      step: '02',
      title: t.platformIntro.doctorStepTitle,
      description: t.platformIntro.doctorStepDesc,
      icon: Stethoscope,
      color: 'bg-[#E6F0FF] text-[#0052cc] border-[#BFDBFE]',
    },
    {
      step: '03',
      title: t.platformIntro.patientStepTitle,
      description: t.platformIntro.patientStepDesc,
      icon: HeartHandshake,
      color: 'bg-[#EDE9FE] text-purple-700 border-[#DDD6FE]',
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#E6F0FF] text-[#0052cc]">
            <Layers className="w-3.5 h-3.5" />
            <span>{t.platformIntro.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.platformIntro.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.platformIntro.sectionSubtitle}
          </p>
        </div>

        {/* 3 Step Flow with Reference Rounded Cards */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                {/* Step Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>

                {!isLast && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prototype Safeguard / Medical Notice Card */}
        <div className="mt-14 p-6 rounded-[2rem] bg-[#E6F0FF] border border-[#BFDBFE] flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#0052cc] text-white flex items-center justify-center shrink-0 shadow-md">
            <Info className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-blue-950">
              {t.platformIntro.disclaimerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-blue-900/80 leading-relaxed font-medium">
              {t.platformIntro.disclaimerText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
