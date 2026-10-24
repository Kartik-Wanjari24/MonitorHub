import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { Info, X, CalendarCheck, ShieldCheck } from 'lucide-react';

interface PhaseNoticeModalProps {
  featureName: string | null;
  onClose: () => void;
}

export const PhaseNoticeModal: React.FC<PhaseNoticeModalProps> = ({
  featureName,
  onClose,
}) => {
  const { t } = useLanguage();

  if (!featureName) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {featureName}
              </h3>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                Phase 2 Roadmap Item
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {t.common.phaseNoticeDesc}
        </p>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Phase 1 Deliverable: Core Landing Page & Design System (Complete)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Phase 2 Deliverable: About Us, Services, Contact & Dedicated Logins</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
        >
          {t.common.okButton}
        </button>
      </div>
    </div>
  );
};
