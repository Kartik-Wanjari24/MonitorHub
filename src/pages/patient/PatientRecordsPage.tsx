import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Pill,
  Activity,
  FileText,
  Clock,
  Calendar,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

export const PatientRecordsPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const patient = patientStore.getCurrentPatient();
  const [activeTab, setActiveTab] = useState<'diagnoses' | 'meds' | 'visits' | 'reports' | 'notes'>('diagnoses');

  if (!patient) {
    return (
      <PatientLayout>
        <div className="p-12 text-center text-slate-400 text-sm">No records found.</div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.recordsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.recordsPageSubtitle}</p>
        </div>

        {/* Clinical Transparency Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{tp.plainLanguageDisclaimer}</p>
        </div>

        {/* Known Allergies Alert */}
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>{tp.allergiesSectionTitle}</span>
          </div>
          {patient.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((a, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300"
                >
                  ⚠ {a}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-600">{tp.noAllergiesRecorded}</p>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto bg-white rounded-t-3xl p-1 shadow-2xs">
          {[
            { id: 'diagnoses', label: tp.tabDiagnoses, icon: Activity },
            { id: 'meds', label: tp.tabPrescriptions, icon: Pill },
            { id: 'visits', label: tp.tabHistory, icon: Clock },
            { id: 'reports', label: tp.tabReports, icon: FileText },
            { id: 'notes', label: tp.tabDoctorNotes, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-2xl whitespace-nowrap transition-all ${
                  isAct
                    ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-b-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          {/* Diagnoses */}
          {activeTab === 'diagnoses' && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {tp.activeConditions} ({patient.diagnoses.length})
              </h3>
              {patient.diagnoses.map((d, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{d.condition}</span>
                    <span className="text-xs text-slate-400">{d.diagnosedDate}</span>
                  </div>
                  {d.notes && <p className="text-xs text-slate-600">{d.notes}</p>}
                  <p className="text-[11px] text-emerald-700 font-bold pt-1">
                    Confirmed by {d.doctorName}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Prescriptions */}
          {activeTab === 'meds' && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {tp.prescribedMeds} ({patient.prescriptions.length})
              </h3>
              {patient.prescriptions.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm">{p.medicineName}</span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Dosage: <strong>{p.dosage}</strong> • Timing: {p.frequency}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Prescribed by {p.doctorName} on {p.prescribedDate}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 self-start sm:self-center">
                    Active Prescription
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Previous Visits */}
          {activeTab === 'visits' && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {tp.previousVisits} ({patient.previousVisits.length})
              </h3>
              {patient.previousVisits.map((v, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                      {v.department}
                    </span>
                    <span className="text-xs text-slate-400">{v.date}</span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm mt-1">{v.reason}</p>
                  <p className="text-xs text-slate-500">Seen by {v.doctorName}</p>
                </div>
              ))}
            </div>
          )}

          {/* Lab Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Diagnostic Tests & Lab Findings
              </h3>
              {patient.labReports.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{lab.testName}</span>
                    <p className="text-xs text-slate-600 font-mono mt-1">{lab.result}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Report Date: {lab.date}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      lab.status === 'Normal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {lab.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Doctor Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Attending Doctor Observations
              </h3>
              {patient.doctorNotes.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{n.doctorName}</span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">"{n.note}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};
