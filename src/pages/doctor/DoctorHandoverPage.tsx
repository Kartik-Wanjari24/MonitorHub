import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import type { PatientHandoverNote } from '../../types/doctor';
import {
  PlusCircle,
  X,
} from 'lucide-react';

export const DoctorHandoverPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;

  const [handovers, setHandovers] = useState<PatientHandoverNote[]>(doctorStore.getHandovers());
  const patients = doctorStore.getAllDoctorPatients();

  // Create Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [shift, setShift] = useState<'Morning' | 'Evening' | 'Night'>('Evening');
  const [targetDoctor, setTargetDoctor] = useState('Dr. Priya Desai (Duty Physician)');
  const [recentChanges, setRecentChanges] = useState('');
  const [activeConcerns, setActiveConcerns] = useState('');
  const [pendingReviews, setPendingReviews] = useState('');
  const [outstandingTasks, setOutstandingTasks] = useState('');

  const handleCreateHandover = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = doctorStore.getDoctorPatient(selectedPatientId);
    if (!patient) return;

    doctorStore.addHandover({
      patientId: patient.id,
      patientName: patient.fullName,
      authorDoctor: 'Dr. Aarav Sharma',
      shift,
      targetDoctor,
      recentClinicalChanges: recentChanges.trim() || 'No acute events during shift.',
      activeConcerns: activeConcerns.trim() || 'Stable, monitor vitals.',
      pendingReviewsAndTests: pendingReviews.split(',').map((s) => s.trim()).filter(Boolean),
      outstandingTasks: outstandingTasks.split(',').map((s) => s.trim()).filter(Boolean),
    });

    setHandovers(doctorStore.getHandovers());
    setIsCreateOpen(false);
    setRecentChanges('');
    setActiveConcerns('');
    setPendingReviews('');
    setOutstandingTasks('');
  };

  const handleToggleResolve = (id: string) => {
    doctorStore.toggleHandoverResolved(id);
    setHandovers(doctorStore.getHandovers());
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {td.handoverTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{td.handoverSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{td.newHandoverNoteBtn}</span>
          </button>
        </div>

        {/* Handover Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {handovers.map((h) => (
            <div
              key={h.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
                h.isResolved ? 'border-slate-200 opacity-80' : 'border-blue-200 ring-2 ring-blue-500/10'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">{h.patientName}</span>
                    <span className="text-xs font-mono font-semibold text-blue-700">
                      ({h.patientId})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Shift: <strong>{h.shift}</strong> • Author: {h.authorDoctor} • {h.timestamp}
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    h.isResolved
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-blue-100 text-blue-900 animate-pulse'
                  }`}
                >
                  {h.isResolved ? td.resolvedBadge : td.pendingBadge}
                </span>
              </div>

              {/* Handover Content Sections */}
              <div className="space-y-3 text-xs">
                {/* Recent Changes */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-700 uppercase text-[10px] block mb-1">
                    {td.recentChangesCol}
                  </span>
                  <p className="text-slate-800 leading-relaxed">{h.recentClinicalChanges}</p>
                </div>

                {/* Active Concerns */}
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200">
                  <span className="font-bold text-rose-900 uppercase text-[10px] block mb-1">
                    {td.activeConcernsCol}
                  </span>
                  <p className="text-rose-950 font-medium leading-relaxed">{h.activeConcerns}</p>
                </div>

                {/* Pending Tests / Reviews */}
                {h.pendingReviewsAndTests.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 uppercase text-[10px] block mb-1">
                      {td.pendingReviewsCol}
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {h.pendingReviewsAndTests.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outstanding Tasks */}
                {h.outstandingTasks.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 uppercase text-[10px] block mb-1">
                      {td.outstandingTasksCol}
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {h.outstandingTasks.map((task, idx) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Handed over to: <strong>{h.targetDoctor || 'Duty Team'}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleResolve(h.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    h.isResolved
                      ? 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {h.isResolved ? 'Re-open Handover' : td.markResolvedBtn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Create Shift Handover Note */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base">{td.newHandoverNoteBtn}</h3>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateHandover} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Patient *</label>
                    <select
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    >
                      {patients.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.fullName} ({p.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Shift *</label>
                    <select
                      value={shift}
                      onChange={(e) => setShift(e.target.value as typeof shift)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                    >
                      <option value="Morning">{td.shiftMorning}</option>
                      <option value="Evening">{td.shiftEvening}</option>
                      <option value="Night">{td.shiftNight}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {td.targetDoctorLabel}
                  </label>
                  <input
                    type="text"
                    value={targetDoctor}
                    onChange={(e) => setTargetDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {td.recentChangesCol} *
                  </label>
                  <textarea
                    rows={2}
                    value={recentChanges}
                    onChange={(e) => setRecentChanges(e.target.value)}
                    placeholder="Vitals response, loaded meds, symptom changes during shift..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {td.activeConcernsCol} *
                  </label>
                  <input
                    type="text"
                    value={activeConcerns}
                    onChange={(e) => setActiveConcerns(e.target.value)}
                    placeholder="Risk of deterioration, airway watch, telemetry monitor alarm thresholds..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {td.pendingReviewsCol} (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={pendingReviews}
                    onChange={(e) => setPendingReviews(e.target.value)}
                    placeholder="e.g. 4-hour Troponin delta, Senior Echocardiogram review"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {td.outstandingTasksCol} (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={outstandingTasks}
                    onChange={(e) => setOutstandingTasks(e.target.value)}
                    placeholder="e.g. Call ICU bed manager at 2 PM, re-check IV cannula site"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    Post Handover Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
};
