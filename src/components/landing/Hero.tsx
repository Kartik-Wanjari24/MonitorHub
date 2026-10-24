import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Activity,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  Stethoscope,
  Building2,
  UserCheck,
} from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreServices }) => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#E6F0FF] via-[#F4F7FB] to-white"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-50">
        <div className="absolute -top-16 left-10 w-96 h-96 bg-blue-200/60 rounded-full blur-3xl"></div>
        <div className="absolute -top-12 right-12 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#0052cc]/10 text-[#0052cc] border border-[#0052cc]/20 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t.hero.supportingText}
            </p>

            {/* Call To Action Buttons (Rounded Pill Buttons as per Reference) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-extrabold text-white bg-[#0052cc] hover:bg-[#0043a8] rounded-full shadow-lg shadow-blue-600/25 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052cc] active:scale-95 cursor-pointer"
              >
                <span>{t.hero.getStarted}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-extrabold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-xs hover:border-slate-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052cc] cursor-pointer"
              >
                <span>{t.hero.exploreServices}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>{t.hero.securityBadge}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0052cc]" />
                <span>{t.hero.activeUsersText}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Healthcare Preview Styled after Reference Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-[2rem] p-6 shadow-2xl border border-blue-100 space-y-4">
              {/* Header Box */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-black text-slate-800 tracking-wider uppercase">
                    Care, With Clarity
                  </span>
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#E6F0FF] text-[#0052cc]">
                  Indian Healthcare Hub
                </span>
              </div>

              {/* Doctor Mini Card (Reference Plum Style) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#504068] via-[#46365C] to-[#392B4E] text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] text-purple-200 font-semibold block">Attending Consultant</span>
                  <h4 className="text-sm font-extrabold mt-0.5">Dr. Aarav Sharma</h4>
                  <p className="text-[10px] text-purple-200/90 font-medium">Cardiology • Apollo Memorial</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-xs border border-white/20">
                  AS
                </div>
              </div>

              {/* Patient Flow Items */}
              <div className="space-y-2.5">
                {/* 1. Reception / Staff intake */}
                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0052cc]/10 text-[#0052cc] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">Hospital Intake</p>
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        ID: TMH-2026-001
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      Rahul Verma registered & assigned to OPD Smart Queue
                    </p>
                  </div>
                </div>

                {/* 2. Live Consultation */}
                <div className="p-3 rounded-2xl bg-[#E6F0FF] border border-[#BFDBFE] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0052cc] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-blue-950">Clinical Queue</p>
                      <span className="text-[10px] text-blue-800 font-bold bg-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0052cc]" /> In Room
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-900/80 truncate mt-0.5">
                      3D anatomy model & real-time telemetry active
                    </p>
                  </div>
                </div>

                {/* 3. Patient App */}
                <div className="p-3 rounded-2xl bg-[#EDE9FE] border border-[#DDD6FE] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-purple-950">Patient App</p>
                      <span className="text-[10px] text-purple-900 font-bold bg-white px-2 py-0.5 rounded-full">
                        Token #02
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-900/80 truncate mt-0.5">
                      Health diary, medication schedule & SOS help
                    </p>
                  </div>
                </div>
              </div>

              {/* Vitals Telemetry Preview Bar */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#F4F7FB] p-2.5 rounded-2xl border border-slate-100">
                  <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500" /> Pulse
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">72 bpm</div>
                </div>
                <div className="bg-[#F4F7FB] p-2.5 rounded-2xl border border-slate-100">
                  <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
                    <Activity className="w-3 h-3 text-[#0052cc]" /> SpO₂
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">99 %</div>
                </div>
                <div className="bg-[#F4F7FB] p-2.5 rounded-2xl border border-slate-100">
                  <div className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> BP
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">120/80</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
