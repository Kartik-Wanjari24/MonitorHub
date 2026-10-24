import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import type { ClinicalAlert } from '../../types/doctor';
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const DoctorAlertsPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;

  const [alerts, setAlerts] = useState<ClinicalAlert[]>(doctorStore.getAlerts());
  const [filterMode, setFilterMode] = useState<'all' | 'unacknowledged' | 'critical'>('all');

  const filteredAlerts = alerts.filter((a) => {
    if (filterMode === 'unacknowledged') return !a.acknowledged;
    if (filterMode === 'critical') return a.severity === 'critical';
    return true;
  });

  const handleAcknowledge = (id: string) => {
    doctorStore.acknowledgeAlert(id);
    setAlerts(doctorStore.getAlerts());
  };

  return (
    <DoctorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {td.alertsTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{td.alertsSubtitle}</p>
          </div>

          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulated Telemetry Alarms</span>
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['all', 'unacknowledged', 'critical'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterMode === mode
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {mode === 'all'
                ? td.filterAllAlerts
                : mode === 'unacknowledged'
                ? td.filterUnacknowledged
                : td.filterCritical}
            </button>
          ))}
        </div>

        {/* Alerts Feed */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-50" />
              <p>{td.noAlertsFound}</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  alert.severity === 'critical'
                    ? 'bg-rose-50/70 border-rose-300'
                    : alert.severity === 'urgent'
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      alert.severity === 'critical'
                        ? 'bg-rose-600 text-white animate-pulse'
                        : alert.severity === 'urgent'
                        ? 'bg-amber-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{alert.title}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          alert.severity === 'critical'
                            ? 'bg-rose-200 text-rose-900'
                            : alert.severity === 'urgent'
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        {alert.isDemo ? td.demoDataBadge : 'VALIDATED'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{alert.message}</p>

                    <p className="text-[11px] text-slate-500 pt-1">
                      Patient: <strong className="text-slate-800">{alert.patientName}</strong> ({alert.patientId}) • {alert.timestamp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {!alert.acknowledged ? (
                    <button
                      type="button"
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-2xs"
                    >
                      {td.markAcknowledged}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{td.acknowledgedText}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};
