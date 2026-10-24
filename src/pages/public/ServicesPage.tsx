import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { PublicLayout } from '../../layouts/PublicLayout';
import {
  UserPlus,
  FolderOpen,
  CalendarCheck,
  Users,
  Activity,
  AlertCircle,
  Globe,
  CheckCircle2,
  ArrowRight,
  Info,
  Sparkles,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const ts = t.services;

  const services = [
    {
      id: 1,
      title: ts.s1Title,
      desc: ts.s1Desc,
      details: [ts.s1Detail1, ts.s1Detail2, ts.s1Detail3],
      icon: UserPlus,
      iconBg: 'bg-blue-100 text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Registration',
    },
    {
      id: 2,
      title: ts.s2Title,
      desc: ts.s2Desc,
      details: [ts.s2Detail1, ts.s2Detail2, ts.s2Detail3],
      icon: FolderOpen,
      iconBg: 'bg-indigo-100 text-indigo-700',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'Records',
    },
    {
      id: 3,
      title: ts.s3Title,
      desc: ts.s3Desc,
      details: [ts.s3Detail1, ts.s3Detail2, ts.s3Detail3],
      icon: CalendarCheck,
      iconBg: 'bg-sky-100 text-sky-700',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      badge: 'Scheduling',
    },
    {
      id: 4,
      title: ts.s4Title,
      desc: ts.s4Desc,
      details: [ts.s4Detail1, ts.s4Detail2, ts.s4Detail3],
      icon: Users,
      iconBg: 'bg-violet-100 text-violet-700',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      badge: 'Queue',
    },
    {
      id: 5,
      title: ts.s5Title,
      desc: ts.s5Desc,
      details: [ts.s5Detail1, ts.s5Detail2, ts.s5Detail3],
      icon: Activity,
      iconBg: 'bg-emerald-100 text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Monitoring',
    },
    {
      id: 6,
      title: ts.s6Title,
      desc: ts.s6Desc,
      details: [ts.s6Detail1, ts.s6Detail2, ts.s6Detail3],
      icon: AlertCircle,
      iconBg: 'bg-rose-100 text-rose-700',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badge: 'Emergency',
    },
    {
      id: 7,
      title: ts.s7Title,
      desc: ts.s7Desc,
      details: [ts.s7Detail1, ts.s7Detail2, ts.s7Detail3],
      icon: Globe,
      iconBg: 'bg-amber-100 text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'Bilingual',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{ts.pageBadge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {ts.heroHeadline}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {ts.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{ts.sectionBadge}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ts.sectionTitle}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{ts.sectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${svc.iconBg} flex items-center justify-center shadow-xs`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${svc.badgeBg}`}>
                        {svc.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{svc.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{svc.desc}</p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-slate-200/60">
                    {svc.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prototype Notice */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 border border-blue-200/80 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{ts.noticeTitle}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{ts.noticeText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-white">{ts.ctaTitle}</h2>
          <button
            type="button"
            onClick={() => navigate('/portal')}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-blue-900 bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <span>{ts.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};
