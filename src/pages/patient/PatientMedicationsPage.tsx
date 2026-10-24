import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import type { MedicationReminder } from '../../types/patient';
import {
  Pill,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const PatientMedicationsPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [medications, setMedications] = useState<MedicationReminder[]>(
    patientStore.getMedicationReminders()
  );

  const handleToggle = (id: string) => {
    patientStore.toggleMedicationTaken(id);
    setMedications(patientStore.getMedicationReminders());
  };

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.medicationsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.medicationsPageSubtitle}</p>
        </div>

        {/* Doctor Instruction Caution */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
          <Pill className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{tp.medsNotice}</p>
        </div>

        {/* Medication Cards List */}
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${
                med.takenToday
                  ? 'bg-slate-50/80 border-slate-200 opacity-90'
                  : 'bg-white border-emerald-200 ring-2 ring-emerald-500/10'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      med.takenToday ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">{med.medicineName}</h2>
                    <span className="text-xs font-bold text-emerald-800">
                      Dosage: {med.dosage} • {med.frequency}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pl-1">
                  <p className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tp.timing}: {med.timing}</span>
                  </p>
                  <p className="text-slate-500 italic">Instructions: "{med.instructions}"</p>
                  <p className="text-[11px] text-slate-400">Prescribed by {med.prescribingDoctor}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle(med.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                    med.takenToday
                      ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{med.takenToday ? tp.takenTodayBadge : tp.markAsTakenBtn}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PatientLayout>
  );
};
