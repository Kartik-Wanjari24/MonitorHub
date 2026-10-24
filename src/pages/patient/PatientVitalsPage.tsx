import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Heart,
  Activity,
  Thermometer,
  Gauge,
  AlertTriangle,
} from 'lucide-react';

export const PatientVitalsPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const vitals = patientStore.getPatientVitals();

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.vitalsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.vitalsPageSubtitle}</p>
        </div>

        {/* Prototype Non-continuous Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-950 mr-2">
              Demonstration Readings
            </span>
            <span>{tp.vitalsDisclaimer}</span>
          </div>
        </div>

        {/* Multi-Parameter Vitals Display (Large High-Readability Cards) */}
        {vitals ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Heart Rate */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {tp.heartRate}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {vitals.heartRate.value}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{vitals.heartRate.unit}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Recorded: {vitals.heartRate.timestamp}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-7 h-7" />
              </div>
            </div>

            {/* Blood Oxygen SpO2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {tp.oxygenLevel}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">{vitals.spo2.value}</span>
                  <span className="text-sm font-semibold text-slate-500">{vitals.spo2.unit}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Recorded: {vitals.spo2.timestamp}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Activity className="w-7 h-7" />
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {tp.bloodPressure}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {vitals.bloodPressure.unit}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Recorded: {vitals.bloodPressure.timestamp}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Gauge className="w-7 h-7" />
              </div>
            </div>

            {/* Temperature */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {tp.bodyTemp}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">
                    {vitals.temperature.value}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    {vitals.temperature.unit}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Recorded: {vitals.temperature.timestamp}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Thermometer className="w-7 h-7" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">No vitals on record.</div>
        )}
      </div>
    </PatientLayout>
  );
};
