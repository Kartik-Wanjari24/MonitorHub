import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import type { EmergencyCase } from '../../types/staff';
import {
  AlertOctagon,
  AlertTriangle,
  History,
  ArrowRight,
  X,
} from 'lucide-react';

export const StaffEmergencyPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;

  const [cases, setCases] = useState<EmergencyCase[]>(staffStore.getEmergencyCases());
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(cases[0] || null);

  // Status Update Modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<EmergencyCase['status']>('Under Observation');
  const [statusNote, setStatusNote] = useState('');

  const activeRole = staffStore.getActiveRole();
  const staffName = activeRole === 'compounder' ? 'Sunil Kumar (Compounder)' : 'Pooja Rawat (Receptionist)';

  const handleOpenUpdate = (emg: EmergencyCase) => {
    setSelectedCase(emg);
    setNewStatus(emg.status);
    setStatusNote('');
    setIsUpdateModalOpen(true);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    staffStore.updateEmergencyStatus(selectedCase.id, newStatus, staffName, statusNote);
    const updatedCases = staffStore.getEmergencyCases();
    setCases(updatedCases);
    setSelectedCase(updatedCases.find((c) => c.id === selectedCase.id) || null);
    setIsUpdateModalOpen(false);
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {ts.emgTitle}
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">{ts.emgSubtitle}</p>
          </div>

          <Link
            to="/staff/registration?mode=emergency"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-sm transition-all shrink-0"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{ts.newEmergencyBtn}</span>
          </Link>
        </div>

        {/* Prototype Clinical Non-Reliance Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{ts.nonRelianceNotice}</span>
        </div>

        {/* Grid Layout: Active Cases Table + Detail / History Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Active Cases (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {cases.length} {ts.activeCasesCount}
              </span>
              <span className="text-[11px] text-slate-400">Chronological arrival</span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto">
              {cases.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">{ts.noData}</div>
              ) : (
                cases.map((emg) => {
                  const isSelected = selectedCase?.id === emg.id;
                  return (
                    <div
                      key={emg.id}
                      onClick={() => setSelectedCase(emg)}
                      className={`p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-rose-50/60 border-l-4 border-rose-600'
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-extrabold text-slate-900 text-sm">
                            {emg.patientName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                              emg.priority === 'critical'
                                ? 'bg-rose-600 text-white animate-pulse'
                                : emg.priority === 'urgent'
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-600 text-white'
                            }`}
                          >
                            {emg.priority}
                          </span>
                          {emg.isProvisional && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Provisional
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-rose-950 font-medium line-clamp-1">
                          {emg.chiefComplaint}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          ID: <span className="font-mono text-sky-700 font-semibold">{emg.patientId}</span> •
                          Arrived: {emg.arrivalTime} • Staff: {emg.responsibleStaff}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            emg.status === 'Triage Pending'
                              ? 'bg-rose-100 text-rose-800'
                              : emg.status === 'Under Observation'
                              ? 'bg-sky-100 text-sky-800'
                              : emg.status === 'Stabilized'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {emg.status}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenUpdate(emg);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Case Details & History Timeline (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {selectedCase ? (
              <div className="p-5 sm:p-6 space-y-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      Case Tracking
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {selectedCase.id}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenUpdate(selectedCase)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {ts.updateStatusBtn}
                  </button>
                </div>

                {/* Case Info */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                      Patient & Triage Details
                    </span>
                    <p className="text-sm font-bold text-slate-900">{selectedCase.patientName}</p>
                    <p className="text-slate-600 mt-0.5">
                      Patient ID: <span className="font-mono">{selectedCase.patientId}</span>
                    </p>
                    <p className="text-slate-600">Assigned Doctor: {selectedCase.assignedDoctor}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200">
                    <span className="font-bold text-rose-900 uppercase text-[10px] block mb-1">
                      Chief Complaint
                    </span>
                    <p className="text-xs text-rose-950 font-medium leading-relaxed">
                      {selectedCase.chiefComplaint}
                    </p>
                    {selectedCase.provisionalNotes && (
                      <p className="text-[11px] text-rose-800 mt-1 italic">
                        "{selectedCase.provisionalNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Update History Timeline */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <History className="w-4 h-4 text-slate-500" />
                    {ts.statusHistoryTitle}
                  </h3>

                  <div className="space-y-3 border-l-2 border-slate-200 pl-3 ml-2">
                    {selectedCase.statusHistory.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute -left-[18px] top-1 border-2 border-white" />
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{step.status}</span>
                            <span className="text-[10px] text-slate-400">{step.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">By {step.updatedBy}</p>
                          {step.note && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-1 border border-slate-100">
                              {step.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/staff/records?search=${selectedCase.patientId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                  >
                    <span>View full patient record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select an emergency case to view clinical tracking.
              </div>
            )}
          </div>
        </div>

        {/* Modal: Update Emergency Status */}
        {isUpdateModalOpen && selectedCase && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertOctagon className="w-5 h-5" />
                  <h2 className="font-extrabold text-slate-900 text-base">
                    Update Status: {selectedCase.id}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Patient: <strong>{selectedCase.patientName}</strong> ({selectedCase.patientId})
              </p>

              <form onSubmit={handleSaveStatus} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Clinical Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as EmergencyCase['status'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                  >
                    <option value="Triage Pending">{ts.emgTriagePending}</option>
                    <option value="Under Observation">{ts.emgUnderObservation}</option>
                    <option value="Stabilized">{ts.emgStabilized}</option>
                    <option value="Transferred to ICU">{ts.emgTransferredICU}</option>
                    <option value="Discharged">{ts.emgDischarged}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Update Clinical Note
                  </label>
                  <textarea
                    rows={3}
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="e.g. Vitals stabilized after nebulization, shifted to Step-down unit..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {ts.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                  >
                    Log Status Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};
