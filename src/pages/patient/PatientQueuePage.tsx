import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Clock,
  Info,
} from 'lucide-react';

export const PatientQueuePage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const queueData = patientStore.getCurrentQueueStatus();
  const { queueItem, queuePosition, patientsAhead, lastUpdated } = queueData;

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.queuePageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.queuePageSubtitle}</p>
        </div>

        {/* Live Token Status Card (Large, High-Contrast for Elderly Patients) */}
        {queueItem ? (
          <div className="bg-white rounded-3xl border border-blue-200 shadow-md p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  {tp.currentQueueStatus}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {tp.lastUpdated}: <strong>{lastUpdated}</strong>
              </span>
            </div>

            {/* Giant Token Display */}
            <div className="text-center py-6 bg-gradient-to-b from-blue-50/80 to-sky-50/30 rounded-3xl border border-blue-100 space-y-2">
              <p className="text-xs font-extrabold text-blue-800 uppercase tracking-widest">
                {tp.yourTokenNumber}
              </p>
              <div className="text-6xl sm:text-7xl font-black text-blue-700 font-mono tracking-tight">
                #{queueItem.tokenNumber}
              </div>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                  queueItem.status === 'In Consultation'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {queueItem.status === 'In Consultation'
                  ? tp.statusInConsult
                  : tp.statusWaiting}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  {tp.positionInLine}
                </span>
                <span className="text-3xl font-extrabold text-slate-900">
                  {queuePosition ? `#${queuePosition}` : 'Next'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  {tp.patientsAhead}
                </span>
                <span className="text-3xl font-extrabold text-slate-900">
                  {patientsAhead ?? 0}
                </span>
              </div>
            </div>

            {/* Consultation Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">{tp.assignedConsultant}:</span>
                <strong className="text-slate-900 font-bold">{queueItem.assignedDoctor}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">{tp.department}:</span>
                <span className="text-blue-700 font-semibold">{queueItem.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">{tp.checkInTime}:</span>
                <span className="text-slate-700">{queueItem.checkInTime}</span>
              </div>
            </div>

            {/* Advice notice */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0" />
              <span>{tp.queueAdvice}</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
            <Clock className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-base font-bold text-slate-800">{tp.noActiveQueue}</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              If you have an appointment today, please check in with the reception desk to generate your live OPD consultation token.
            </p>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};
