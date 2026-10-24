import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import type { PatientHelpRequest } from '../../types/patient';
import {
  Send,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

export const PatientHelpPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [requests, setRequests] = useState<PatientHelpRequest[]>(
    patientStore.getHelpRequests()
  );
  const [category, setCategory] = useState<PatientHelpRequest['category']>(
    'Water / Refreshment'
  );
  const [urgency, setUrgency] = useState<PatientHelpRequest['urgency']>('Routine');
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patientStore.createHelpRequest(category, urgency);
    setRequests(patientStore.getHelpRequests());
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 5000);
  };

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.helpPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.helpPageSubtitle}</p>
        </div>

        {/* Life-Threat Emergency Banner Warning */}
        <div className="p-5 rounded-3xl bg-rose-600 text-white shadow-md space-y-2">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-rose-200 shrink-0 animate-pulse" />
            <h2 className="text-base font-extrabold tracking-wide uppercase">
              Emergency Guidance Notice
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
            {tp.helpBannerWarning}
          </p>
          <p className="text-xs text-rose-200 italic font-semibold">
            {tp.urgentNoticeLifeThreat}
          </p>
        </div>

        {/* Success Alert */}
        {successNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{tp.requestSentSuccess}</span>
          </div>
        )}

        {/* Quick Help Request Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Request Hospital Staff Assistance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select what you need below and ward staff will be notified at your location.
            </p>
          </div>

          {/* Assistance Category */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {tp.assistanceCategoryLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'Water / Refreshment', label: tp.catWater },
                { id: 'Nurse Assistance', label: tp.catNurse },
                { id: 'Pain Relief', label: tp.catPain },
                { id: 'Emergency Discomfort', label: tp.catDiscomfort },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id as PatientHelpRequest['category'])}
                  className={`p-3.5 rounded-2xl border text-xs text-left font-bold transition-all ${
                    category === item.id
                      ? 'bg-rose-50 text-rose-900 border-rose-400 ring-2 ring-rose-400/20 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {tp.urgencyLabel}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUrgency('Routine')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  urgency === 'Routine'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tp.urgencyRoutine}
              </button>
              <button
                type="button"
                onClick={() => setUrgency('Urgent')}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                  urgency === 'Urgent'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {tp.urgencyImmediate}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{tp.sendHelpRequestBtn}</span>
            </button>
          </div>
        </form>

        {/* Recent Assistance Requests History */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            {tp.activeRequestsTitle}
          </h3>

          <div className="space-y-2">
            {requests.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between gap-3 text-xs shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{r.category}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                      {r.urgency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Logged at {r.timestamp} • {r.location}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    r.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : r.status === 'Acknowledged'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}
                >
                  {r.status === 'Resolved'
                    ? tp.requestStatusResolved
                    : r.status === 'Acknowledged'
                    ? tp.requestStatusAcknowledged
                    : tp.requestStatusPending}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};
