import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import type { ConsultationRecord } from '../../types/doctor';
import {
  Trash2,
  CheckCircle2,
  History,
} from 'lucide-react';

export const DoctorConsultationsPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;
  const [searchParams] = useSearchParams();

  const patients = doctorStore.getAllDoctorPatients();
  const [consultations, setConsultations] = useState<ConsultationRecord[]>(
    doctorStore.getConsultations()
  );

  const initialPatientId = searchParams.get('patientId') || patients[0]?.id || '';
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatientId);

  // Form Fields
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [clinicalExam, setClinicalExam] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescriptions, setPrescriptions] = useState<
    Array<{
      medicine: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions: string;
    }>
  >([
    {
      medicine: 'Amlodipine 5mg',
      dosage: '1 tab',
      frequency: 'Once daily morning',
      duration: '30 days',
      instructions: 'After meals',
    },
  ]);
  const [testRequests, setTestRequests] = useState('');
  const [followUpInstructions, setFollowUpInstructions] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('2026-11-07');

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddMedicine = () => {
    setPrescriptions((prev) => [
      ...prev,
      { medicine: '', dosage: '1 tab', frequency: 'Twice daily', duration: '14 days', instructions: '' },
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrescriptionChange = (
    index: number,
    field: keyof (typeof prescriptions)[0],
    val: string
  ) => {
    setPrescriptions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleSave = (status: 'Draft' | 'Finalized') => {
    const patient = doctorStore.getDoctorPatient(selectedPatientId);
    if (!patient) return;

    if (!chiefComplaint.trim() || !diagnosis.trim()) {
      alert('Please fill out Chief Complaint and Clinical Diagnosis.');
      return;
    }

    const testArray = testRequests
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    doctorStore.saveConsultation({
      patientId: patient.id,
      patientName: patient.fullName,
      doctorName: 'Dr. Aarav Sharma',
      consultationDate: new Date().toISOString().split('T')[0],
      status,
      chiefComplaint: chiefComplaint.trim(),
      clinicalExamination: clinicalExam.trim() || 'No abnormalities detected on physical exam.',
      diagnosis: diagnosis.trim(),
      prescriptions: prescriptions.filter((p) => p.medicine.trim()),
      testRequests: testArray,
      followUpInstructions: followUpInstructions.trim() || 'Maintain regular diet and hydration.',
      nextFollowUpDate: nextFollowUpDate || undefined,
    });

    setConsultations(doctorStore.getConsultations());
    setNotification(
      status === 'Finalized'
        ? `Consultation finalized & prescriptions appended to ${patient.fullName}'s medical chart.`
        : 'Consultation saved as draft.'
    );

    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {td.consultationTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{td.consultationSubtitle}</p>
          </div>

          {/* Patient Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-500">Active Patient:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="text-xs font-bold text-blue-900 bg-transparent focus:outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {notification && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Two-Column Grid: Form Left (8 cols) + History Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Clinical Consultation Workspace Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
            {/* 1. Chief Complaint & Examination */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Clinical Examination & Chief Complaint
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {td.chiefComplaintLabel}
                </label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. Acute retrosternal chest heaviness, mild exertional dyspnea"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {td.clinicalExamLabel}
                </label>
                <textarea
                  rows={3}
                  value={clinicalExam}
                  onChange={(e) => setClinicalExam(e.target.value)}
                  placeholder="Physical assessment, S1/S2 heart sounds, chest auscultation, peripheral pulses..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-900 mb-1.5">
                  {td.diagnosisLabel}
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Essential Hypertension Stage 2 with Suboptimal Control"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 bg-blue-50/20 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* 2. Prescriptions */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Prescriptions & Medications
                </h3>
                <button
                  type="button"
                  onClick={handleAddMedicine}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  {td.addMedicineRow}
                </button>
              </div>

              <div className="space-y-3">
                {prescriptions.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        value={p.medicine}
                        onChange={(e) => handlePrescriptionChange(idx, 'medicine', e.target.value)}
                        placeholder="Drug / Generic Name"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={p.dosage}
                        onChange={(e) => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                        placeholder="Dosage"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={p.frequency}
                        onChange={(e) => handlePrescriptionChange(idx, 'frequency', e.target.value)}
                        placeholder="Frequency"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={p.duration}
                        onChange={(e) => handlePrescriptionChange(idx, 'duration', e.target.value)}
                        placeholder="Duration"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-1 text-right">
                      {prescriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicine(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Follow-up and Diagnostics */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Orders & Follow-up Instructions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {td.testsRequestedLabel}
                  </label>
                  <input
                    type="text"
                    value={testRequests}
                    onChange={(e) => setTestRequests(e.target.value)}
                    placeholder="e.g. 2D Echo, Serum Creatinine, HbA1c (comma separated)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {td.nextFollowUpDateLabel}
                  </label>
                  <input
                    type="date"
                    value={nextFollowUpDate}
                    onChange={(e) => setNextFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {td.followUpInstructionsLabel}
                </label>
                <textarea
                  rows={2}
                  value={followUpInstructions}
                  onChange={(e) => setFollowUpInstructions(e.target.value)}
                  placeholder="Low salt diet, morning BP diary, immediately present to ER if chest pain recurs..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500">{td.finalizedNotice}</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave('Draft')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
                >
                  {td.saveAsDraftBtn}
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('Finalized')}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{td.finalizeConsultationBtn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Previous Documented Consultations (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>{td.consultationHistoryTitle}</span>
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {consultations.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No consultations on file.</p>
              ) : (
                consultations.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{c.patientName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.status === 'Finalized'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-blue-900">{c.diagnosis}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{c.chiefComplaint}</p>
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                      {c.consultationDate} • By {c.doctorName}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};
