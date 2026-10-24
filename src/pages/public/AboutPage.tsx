import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { PublicLayout } from '../../layouts/PublicLayout';
import {
  Target,
  Eye,
  BookOpen,
  Users,
  AlertCircle,
  Heart,
  Stethoscope,
  ClipboardList,
  UserCheck,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const ta = t.about;

  const problems = [
    { title: ta.problem1Title, desc: ta.problem1Desc, icon: BookOpen },
    { title: ta.problem2Title, desc: ta.problem2Desc, icon: Users },
    { title: ta.problem3Title, desc: ta.problem3Desc, icon: AlertCircle },
    { title: ta.problem4Title, desc: ta.problem4Desc, icon: UserCheck },
  ];

  const benefits = [
    {
      roleTitle: ta.doctorBenefitTitle,
      icon: Stethoscope,
      iconBg: 'bg-blue-100 text-blue-700',
      headerBg: 'bg-blue-600',
      items: [ta.doctorBenefit1, ta.doctorBenefit2, ta.doctorBenefit3],
    },
    {
      roleTitle: ta.staffBenefitTitle,
      icon: ClipboardList,
      iconBg: 'bg-sky-100 text-sky-700',
      headerBg: 'bg-sky-600',
      items: [ta.staffBenefit1, ta.staffBenefit2, ta.staffBenefit3],
    },
    {
      roleTitle: ta.patientBenefitTitle,
      icon: Heart,
      iconBg: 'bg-emerald-100 text-emerald-700',
      headerBg: 'bg-emerald-600',
      items: [ta.patientBenefit1, ta.patientBenefit2, ta.patientBenefit3],
    },
  ];

  const values = [
    { title: ta.value1Title, desc: ta.value1Desc, icon: UserCheck },
    { title: ta.value2Title, desc: ta.value2Desc, icon: ShieldCheck },
    { title: ta.value3Title, desc: ta.value3Desc, icon: Eye },
    { title: ta.value4Title, desc: ta.value4Desc, icon: Globe },
  ];

  return (
    <PublicLayout>
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200/60">
            <Target className="w-3.5 h-3.5" />
            <span>{ta.pageBadge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {ta.heroHeadline}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {ta.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{ta.overviewBadge}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ta.overviewTitle}</h2>
              <p className="text-base text-slate-600 leading-relaxed">{ta.overviewText1}</p>
              <p className="text-base text-slate-600 leading-relaxed">{ta.overviewText2}</p>
            </div>
            {/* Visual */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 space-y-4">
              {[
                { label: 'Doctor Portal', desc: 'Clinical Assessment & Consultation', color: 'bg-blue-600', icon: Stethoscope },
                { label: 'Hospital Staff Portal', desc: 'Registration, Queue & Appointments', color: 'bg-sky-600', icon: ClipboardList },
                { label: 'Patient Portal', desc: 'Records, Health Diary & Call for Help', color: 'bg-emerald-600', icon: Heart },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
                    <div className={`w-10 h-10 rounded-lg ${item.color} text-white flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              <Target className="w-3.5 h-3.5" />
              <span>{ta.missionBadge}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{ta.missionTitle}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{ta.missionText}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{ta.visionTitle}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{ta.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{ta.problemBadge}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ta.problemTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {problems.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits by Role */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              <Users className="w-3.5 h-3.5" />
              <span>{ta.benefitsBadge}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ta.benefitsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.roleTitle} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
                  <div className={`${b.headerBg} px-6 py-5 flex items-center gap-3`}>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">{b.roleTitle}</h3>
                  </div>
                  <ul className="p-6 space-y-3">
                    {b.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{ta.valueBadge}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{ta.valueTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-extrabold text-white">{ta.ctaTitle}</h2>
          <p className="text-blue-100">{ta.ctaSubtitle}</p>
          <button
            type="button"
            onClick={() => navigate('/portal')}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-blue-900 bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <span>{ta.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </PublicLayout>
  );
};
