import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import type { DoctorVisitStatus } from '../../types/patient';
import {
  Stethoscope,
  Info,
} from 'lucide-react';

export const PatientDoctorVisitPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [visitInfo, setVisitInfo] = useState(patientStore.getDoctorVisitStatus());

  const getStatusColor = (status: DoctorVisitStatus) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse';
      case 'Completed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Delayed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: DoctorVisitStatus) => {
    switch (status) {
      case 'Upcoming':
        return tp.statusUpcoming;
      case 'In Progress':
        return tp.statusInProgress;
      case 'Completed':
        return tp.statusCompleted;
      case 'Delayed':
        return tp.statusDelayed;
    }
  };

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.visitPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.visitPageSubtitle}</p>
        </div>

        {/* Inpatient Guidance Card */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-center gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>{tp.inpatientNote}</span>
        </div>

        {/* Visit Status Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-indigo-600" />
              <h2 className="font-extrabold text-slate-900 text-base">{tp.consultantRounds}</h2>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                visitInfo.status
              )}`}
            >
              {getStatusLabel(visitInfo.status)}
            </span>
          </div>

          {/* Clinician and Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Attending Physician
              </span>
              <p className="text-base font-extrabold text-slate-900">{visitInfo.doctorName}</p>
              <p className="text-xs text-indigo-700 font-semibold">{visitInfo.department}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {tp.scheduledTime}
              </span>
              <p className="text-base font-extrabold text-slate-900">{visitInfo.estimatedTime}</p>
              <p className="text-xs text-slate-400">Updated: {visitInfo.lastUpdated}</p>
            </div>
          </div>

          {/* Round Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {tp.roundDetails}
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {visitInfo.notes}
            </p>
          </div>

          {/* Prototype Simulation Selector (Allowed in demo mode to test 4 states) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Demo Prototype Status Simulation:
            </span>
            <div className="flex flex-wrap gap-2">
              {(['Upcoming', 'In Progress', 'Completed', 'Delayed'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    patientStore.setDoctorVisitStatus(s);
                    setVisitInfo(patientStore.getDoctorVisitStatus());
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    visitInfo.status === s
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};
