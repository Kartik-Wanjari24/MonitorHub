import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import { AVAILABLE_DOCTORS } from '../../services/mockStaffData';
import type { QueueItem, QueueStatus, PriorityLevel } from '../../types/staff';
import {
  ListOrdered,
  PlusCircle,
  Clock,
  AlertOctagon,
  CheckCircle2,
  Stethoscope,
  X,
  PlayCircle,
  CheckCircle,
} from 'lucide-react';

export const StaffQueuePage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;

  const [queue, setQueue] = useState<QueueItem[]>(staffStore.getQueue());
  const patients = staffStore.getPatients();

  // Add to Queue Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [selectedDoctor, setSelectedDoctor] = useState(AVAILABLE_DOCTORS[0].name);
  const [priority, setPriority] = useState<PriorityLevel>('normal');
  const [isEmergency, setIsEmergency] = useState(false);

  // Status Filter
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredQueue = queue.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  // Metrics
  const totalInQueue = queue.length;
  const waitingCount = queue.filter((q) => q.status === 'Waiting').length;
  const inConsultCount = queue.filter((q) => q.status === 'In Consultation').length;

  const handleAddToQueue = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = staffStore.getPatientById(selectedPatientId);
    if (!patient) return;

    const doctorObj = AVAILABLE_DOCTORS.find((d) => d.name === selectedDoctor);
    const department = doctorObj ? doctorObj.department : 'General OPD';

    staffStore.addToQueue({
      patientId: patient.id,
      patientName: patient.fullName,
      assignedDoctor: selectedDoctor,
      department,
      status: 'Waiting',
      priority: isEmergency ? 'critical' : priority,
      isEmergency,
    });

    setQueue(staffStore.getQueue());
    setIsAddOpen(false);
  };

  const handleUpdateStatus = (id: string, newStatus: QueueStatus) => {
    staffStore.updateQueueStatus(id, newStatus);
    setQueue(staffStore.getQueue());
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ts.queueTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{ts.queueSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{ts.addToQueueBtn}</span>
          </button>
        </div>

        {/* Queue Metrics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">{ts.totalInQueue}</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalInQueue}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <ListOrdered className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase">{ts.waitingCount}</p>
              <p className="text-2xl font-extrabold text-amber-900 mt-1">{waitingCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-sky-200/80 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-sky-700 uppercase">{ts.inConsultCount}</p>
              <p className="text-2xl font-extrabold text-sky-900 mt-1">{inConsultCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-2 text-xs text-sky-900">
          <AlertOctagon className="w-4 h-4 text-sky-700 shrink-0" />
          <span>{ts.queueOrderNotice}</span>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          {(['all', 'Waiting', 'In Consultation', 'Completed'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s === 'all'
                ? ts.all
                : s === 'Waiting'
                ? ts.statusWaiting
                : s === 'In Consultation'
                ? ts.statusInConsultation
                : ts.statusCompleted}
            </button>
          ))}
        </div>

        {/* Queue Tokens Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">{ts.tokenCol}</th>
                  <th className="py-3 px-4">Patient Name & ID</th>
                  <th className="py-3 px-4">Assigned Doctor</th>
                  <th className="py-3 px-4">{ts.checkInTimeCol}</th>
                  <th className="py-3 px-4">{ts.currentStatusCol}</th>
                  <th className="py-3 px-4 text-right">{ts.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                      {ts.noData}
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.isEmergency ? 'bg-rose-50/40' : ''
                      }`}
                    >
                      {/* Token */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-9 h-9 rounded-xl font-extrabold text-sm flex items-center justify-center border ${
                              item.isEmergency
                                ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                                : item.status === 'In Consultation'
                                ? 'bg-sky-600 text-white border-sky-700'
                                : 'bg-slate-100 text-slate-900 border-slate-300'
                            }`}
                          >
                            #{item.tokenNumber}
                          </span>
                          {item.isEmergency && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900 animate-pulse">
                              Emergency
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Patient Info */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/staff/records?search=${item.patientId}`}
                          className="font-bold text-slate-900 hover:text-sky-700 text-sm block"
                        >
                          {item.patientName}
                        </Link>
                        <span className="text-xs text-sky-700 font-mono">{item.patientId}</span>
                      </td>

                      {/* Doctor & Dept */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900 text-sm">
                          {item.assignedDoctor}
                        </p>
                        <span className="text-xs text-slate-500">{item.department}</span>
                      </td>

                      {/* Check-in Time */}
                      <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {item.checkInTime}
                      </td>

                      {/* Queue Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            item.status === 'In Consultation'
                              ? 'bg-sky-600 text-white'
                              : item.status === 'Waiting'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {item.status === 'In Consultation' && (
                            <Stethoscope className="w-3 h-3" />
                          )}
                          {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {item.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.status === 'Waiting' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(item.id, 'In Consultation')}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-all shadow-xs flex items-center gap-1"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>{ts.startConsultationBtn}</span>
                            </button>
                          )}

                          {item.status === 'In Consultation' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(item.id, 'Completed')}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{ts.markCompletedBtn}</span>
                            </button>
                          )}

                          {item.status === 'Completed' && (
                            <span className="text-xs text-slate-400 font-medium">Done</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add Patient to Queue */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-sky-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">{ts.addToQueueBtn}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddToQueue} className="space-y-4">
                {/* Select Patient */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Patient *
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} ({p.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Consulting Doctor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Consulting Doctor *
                  </label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                  >
                    {AVAILABLE_DOCTORS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} — {d.department}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['normal', 'urgent', 'critical'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`py-1.5 text-xs font-bold rounded-lg border uppercase transition-all ${
                          priority === p
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {p === 'normal' ? ts.normal : p === 'urgent' ? ts.urgent : ts.critical}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emergency Flag */}
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="rounded border-rose-400 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-xs font-bold text-rose-900">
                      Tag as Emergency (Jump to top of queue)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {ts.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Generate Token & Queue
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
