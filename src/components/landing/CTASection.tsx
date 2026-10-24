import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onSelectPortal: () => void;
  onOpenDocNotice: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onSelectPortal,
  onOpenDocNotice,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-br from-[#0052cc] via-[#0043a8] to-[#1e1b4b] text-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-sky-200 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.cta.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {t.cta.title}
          </h2>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onSelectPortal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-extrabold text-[#0052cc] bg-white hover:bg-slate-100 rounded-full shadow-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 cursor-pointer"
            >
              <span>{t.cta.primaryButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenDocNotice}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span>{t.cta.secondaryButton}</span>
            </button>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/90 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multi-Role Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Bilingual English & Hindi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Cross-Portal Synchronization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
