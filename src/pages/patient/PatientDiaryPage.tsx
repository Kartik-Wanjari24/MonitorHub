import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import type { HealthDiaryEntry } from '../../types/doctor';
import {
  BookOpen,
  PlusCircle,
  CheckCircle2,
  Info,
  X,
} from 'lucide-react';

export const PatientDiaryPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [diaryEntries, setDiaryEntries] = useState<HealthDiaryEntry[]>(
    patientStore.getHealthDiary()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [activity, setActivity] = useState('');
  const [severity, setSeverity] = useState<1 | 2 | 3 | 4 | 5>(2);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    patientStore.addHealthDiaryEntry(symptoms.trim(), activity.trim() || 'Resting at home', severity);
    setDiaryEntries(patientStore.getHealthDiary());
    setSymptoms('');
    setActivity('');
    setSeverity(2);
    setIsModalOpen(false);
  };

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {tp.diaryPageTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{tp.diaryPageSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{tp.addNoteBtn}</span>
          </button>
        </div>

        {/* Private Diary Guidance Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{tp.diaryNotice}</p>
        </div>

        {/* Chronological Timeline Entries */}
        <div className="space-y-4">
          {diaryEntries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-400 text-xs">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p>{tp.noDiaryEntries}</p>
            </div>
          ) : (
            diaryEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {entry.date} at {entry.time}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      Severity: {entry.severity}/5
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tp.sharedWithDoctorBadge}</span>
                  </span>
                </div>

                <p className="text-base font-extrabold text-slate-900 leading-snug">
                  "{entry.symptoms}"
                </p>

                {entry.mealsOrActivity && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    Activity & Context: {entry.mealsOrActivity}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal: Add Diary Entry */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">{tp.addNoteBtn}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEntry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Describe Symptoms or How You Feel *
                  </label>
                  <textarea
                    rows={3}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={tp.symptomsPlaceholder}
                    required
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    What were you doing / what did you eat?
                  </label>
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    placeholder={tp.activityPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {tp.severityLabel}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {([1, 2, 3, 4, 5] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSeverity(lvl)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          severity === lvl
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                  >
                    {tp.saveDiaryNoteBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};
