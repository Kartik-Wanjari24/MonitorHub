import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Stethoscope, ClipboardList, HeartPulse, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';

export const PortalSelectPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const tp = t.portalSelect;

  const portals = [
    {
      id: 'doctor',
      title: tp.doctorTitle,
      desc: tp.doctorDesc,
      cta: tp.doctorCta,
      path: '/login/doctor',
      icon: Stethoscope,
      bgCard: 'bg-[#E6F0FF]',
      borderCard: 'border-[#BFDBFE] hover:border-[#0052cc]',
      iconBg: 'bg-[#0052cc] text-white',
      buttonBg: 'bg-[#0052cc] hover:bg-[#0043a8]',
      badgeColor: 'bg-white text-[#0052cc]',
      credEmail: 'doctor@demo.com',
      credPass: 'Doctor123',
      sampleIdentity: 'Dr. Aarav Sharma',
    },
    {
      id: 'staff',
      title: tp.staffTitle,
      desc: tp.staffDesc,
      cta: tp.staffCta,
      path: '/login/staff',
      icon: ClipboardList,
      bgCard: 'bg-[#F4F7FB]',
      borderCard: 'border-slate-200 hover:border-slate-400',
      iconBg: 'bg-slate-800 text-white',
      buttonBg: 'bg-slate-900 hover:bg-slate-800',
      badgeColor: 'bg-white text-slate-800',
      credEmail: 'staff@demo.com',
      credPass: 'Staff123',
      sampleIdentity: 'Neha Pawar / Amit Gupta',
    },
    {
      id: 'patient',
      title: tp.patientTitle,
      desc: tp.patientDesc,
      cta: tp.patientCta,
      path: '/login/patient',
      icon: HeartPulse,
      bgCard: 'bg-[#EDE9FE]',
      borderCard: 'border-[#DDD6FE] hover:border-purple-500',
      iconBg: 'bg-purple-600 text-white',
      buttonBg: 'bg-purple-700 hover:bg-purple-800',
      badgeColor: 'bg-white text-purple-900',
      credEmail: 'patient@demo.com',
      credPass: 'Patient123',
      sampleIdentity: 'Rahul Verma (Token #02)',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#E6F0FF] via-[#F4F7FB] to-white pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#0052cc]/10 text-[#0052cc] border border-[#0052cc]/20">
            <KeyRound className="w-3.5 h-3.5" />
            <span>{tp.pageBadge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {tp.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {tp.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-12 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.id}
                  className={`flex flex-col justify-between rounded-[2rem] p-7 sm:p-8 border transition-all duration-300 hover:shadow-xl group ${portal.bgCard} ${portal.borderCard}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${portal.iconBg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border shadow-2xs ${portal.badgeColor}`}>
                        {portal.sampleIdentity}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-2">{portal.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">{portal.desc}</p>

                    {/* Credentials preview */}
                    <div className="bg-white rounded-2xl border border-black/5 p-4 space-y-1.5 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <KeyRound className="w-3 h-3 text-[#0052cc]" />
                        <span>Demo Account</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 font-mono">{portal.credEmail}</p>
                      <p className="text-xs font-bold text-slate-800 font-mono">{portal.credPass}</p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/5">
                    <button
                      type="button"
                      onClick={() => navigate(portal.path)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-extrabold text-sm text-white transition-all shadow-md focus:outline-none focus-visible:ring-2 active:scale-95 cursor-pointer ${portal.buttonBg}`}
                    >
                      <span>{portal.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Notice */}
          <div className="mt-10 p-5 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 shadow-2xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">{tp.demoNotice}</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
