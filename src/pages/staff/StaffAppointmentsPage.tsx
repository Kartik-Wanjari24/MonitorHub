import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import { AVAILABLE_DOCTORS } from '../../services/mockStaffData';
import type { Appointment } from '../../types/staff';
import {
  CalendarDays,
  Clock,
  PlusCircle,
  CheckCircle2,
  CalendarX,
  AlertTriangle,
  X,
} from 'lucide-react';

export const StaffAppointmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;
  const [searchParams] = useSearchParams();

  const [appointments, setAppointments] = useState<Appointment[]>(staffStore.getAppointments());
  const patients = staffStore.getPatients();

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');

  // New Appointment Modal
  const [isCreateOpen, setIsCreateOpen] = useState(Boolean(searchParams.get('patientId')));
  const [selectedPatientId, setSelectedPatientId] = useState<string>(searchParams.get('patientId') || '');
  const [selectedDoctor, setSelectedDoctor] = useState(AVAILABLE_DOCTORS[0].name);
  const [aptDate, setAptDate] = useState('2026-10-24');
  const [aptTime, setAptTime] = useState('11:00');
  const [aptType, setAptType] = useState<Appointment['type']>('General OPD');
  const [aptNotes, setAptNotes] = useState('');
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Reschedule Modal
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-10-25');
  const [rescheduleTime, setRescheduleTime] = useState('10:00');

  // Cancel Modal Confirmation
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  // Time Slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:15', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (dateFilter && a.date !== dateFilter) return false;
      if (doctorFilter !== 'all' && a.doctorName !== doctorFilter) return false;
      return true;
    });
  }, [appointments, statusFilter, dateFilter, doctorFilter]);

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const patient = staffStore.getPatientById(selectedPatientId);
    if (!patient) return;

    // Check Conflict
    const hasConflict = staffStore.checkDoctorConflict(selectedDoctor, aptDate, aptTime);
    if (hasConflict) {
      setConflictError(ts.conflictWarningDesc);
      return;
    }

    const doctorObj = AVAILABLE_DOCTORS.find((d) => d.name === selectedDoctor);
    const department = doctorObj ? doctorObj.department : 'General OPD';

    staffStore.addAppointment({
      patientId: patient.id,
      patientName: patient.fullName,
      doctorName: selectedDoctor,
      department,
      date: aptDate,
      time: aptTime,
      status: 'Scheduled',
      type: aptType,
      notes: aptNotes.trim() || undefined,
    });

    setAppointments(staffStore.getAppointments());
    setIsCreateOpen(false);
    setAptNotes('');
  };

  const handleCheckIn = (apt: Appointment) => {
    staffStore.updateAppointmentStatus(apt.id, 'Checked In');

    // Automatically place patient into the OPD queue
    staffStore.addToQueue({
      patientId: apt.patientId,
      patientName: apt.patientName,
      assignedDoctor: apt.doctorName,
      department: apt.department,
      status: 'Waiting',
      priority: 'normal',
      isEmergency: false,
    });

    setAppointments(staffStore.getAppointments());
  };

  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTarget) return;

    const hasConflict = staffStore.checkDoctorConflict(
      rescheduleTarget.doctorName,
      rescheduleDate,
      rescheduleTime,
      rescheduleTarget.id
    );

    if (hasConflict) {
      setConflictError(ts.conflictWarningDesc);
      return;
    }

    staffStore.rescheduleAppointment(rescheduleTarget.id, rescheduleDate, rescheduleTime);
    setAppointments(staffStore.getAppointments());
    setRescheduleTarget(null);
    setConflictError(null);
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    staffStore.cancelAppointment(cancelTarget.id);
    setAppointments(staffStore.getAppointments());
    setCancelTarget(null);
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ts.aptTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{ts.aptSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (patients.length > 0 && !selectedPatientId) {
                setSelectedPatientId(patients[0].id);
              }
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{ts.newAppointmentBtn}</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
              >
                <option value="all">{ts.all}</option>
                <option value="Scheduled">{ts.aptScheduled}</option>
                <option value="Checked In">{ts.aptCheckedIn}</option>
                <option value="Completed">{ts.aptCompleted}</option>
                <option value="Cancelled">{ts.aptCancelled}</option>
                <option value="Delayed">{ts.aptDelayed}</option>
              </select>
            </div>

            {/* Doctor Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Doctor:</span>
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white max-w-[180px] truncate"
              >
                <option value="all">{ts.all} Doctors</option>
                {AVAILABLE_DOCTORS.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500">Date:</span>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
              />
              {dateFilter && (
                <button
                  type="button"
                  onClick={() => setDateFilter('')}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {filteredAppointments.length} appointments listed
          </span>
        </div>

        {/* Appointments Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Time & Date</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Consulting Doctor</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                      {ts.noData}
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      {/* Date & Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-xs flex flex-col items-center justify-center">
                            <Clock className="w-3 h-3 text-indigo-500" />
                            <span>{apt.time}</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{apt.date}</p>
                            <p className="text-[10px] text-slate-400">{apt.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Patient */}
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/staff/records?search=${apt.patientId}`}
                          className="font-bold text-slate-900 hover:text-sky-700 text-sm block"
                        >
                          {apt.patientName}
                        </Link>
                        <span className="text-xs text-sky-700 font-mono">{apt.patientId}</span>
                      </td>

                      {/* Doctor & Dept */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-900 text-sm">{apt.doctorName}</p>
                        <span className="text-xs text-slate-500">{apt.department}</span>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-xs text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded">
                          {apt.type}
                        </span>
                        {apt.notes && (
                          <p className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
                            {apt.notes}
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === 'Checked In'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'Scheduled'
                              ? 'bg-sky-100 text-sky-800'
                              : apt.status === 'Completed'
                              ? 'bg-slate-100 text-slate-700'
                              : apt.status === 'Cancelled'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status === 'Checked In' && <CheckCircle2 className="w-3 h-3" />}
                          {apt.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {apt.status === 'Scheduled' && (
                            <button
                              type="button"
                              onClick={() => handleCheckIn(apt)}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
                            >
                              {ts.checkInBtn}
                            </button>
                          )}

                          {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                            <button
                              type="button"
                              onClick={() => {
                                setRescheduleTarget(apt);
                                setRescheduleDate(apt.date);
                                setRescheduleTime(apt.time);
                              }}
                              className="px-2 py-1 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
                            >
                              {ts.rescheduleBtn}
                            </button>
                          )}

                          {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                            <button
                              type="button"
                              onClick={() => setCancelTarget(apt)}
                              className="px-2 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
                            >
                              {ts.cancelBtn}
                            </button>
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

        {/* Modal 1: Book New Appointment */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-sky-600" />
                  <h2 className="font-extrabold text-slate-900 text-base">{ts.newAppointmentBtn}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {conflictError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{ts.conflictWarningTitle}</p>
                    <p className="mt-0.5">{conflictError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleCreateAppointment} className="space-y-4">
                {/* Select Patient */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {ts.selectPatientLabel}
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} ({p.id}) — {p.contactNumber}
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

                {/* Date & Time Slot */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {ts.aptDateLabel}
                    </label>
                    <input
                      type="date"
                      value={aptDate}
                      onChange={(e) => setAptDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {ts.aptTimeLabel}
                    </label>
                    <select
                      value={aptTime}
                      onChange={(e) => setAptTime(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                    >
                      {timeSlots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {ts.aptTypeLabel}
                  </label>
                  <select
                    value={aptType}
                    onChange={(e) => setAptType(e.target.value as Appointment['type'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                  >
                    <option value="General OPD">General OPD</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Specialist Consultation">Specialist Consultation</option>
                    <option value="Emergency Review">Emergency Review</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {ts.aptNotesLabel}
                  </label>
                  <input
                    type="text"
                    value={aptNotes}
                    onChange={(e) => setAptNotes(e.target.value)}
                    placeholder={ts.aptNotesPlaceholder}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900"
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {ts.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    {ts.confirm}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 2: Reschedule Appointment */}
        {rescheduleTarget && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="font-extrabold text-slate-900 text-base">
                  Reschedule Appointment: {rescheduleTarget.id}
                </h2>
                <button
                  type="button"
                  onClick={() => setRescheduleTarget(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Patient: <strong>{rescheduleTarget.patientName}</strong> • Doctor:{' '}
                <strong>{rescheduleTarget.doctorName}</strong>
              </p>

              {conflictError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {conflictError}
                </div>
              )}

              <form onSubmit={handleConfirmReschedule} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Date *
                  </label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    New Time Slot *
                  </label>
                  <select
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  >
                    {timeSlots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleTarget(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    {ts.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 3: Cancel Appointment Confirmation */}
        {cancelTarget && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-600">
                <CalendarX className="w-5 h-5" />
                <h2 className="font-extrabold text-slate-900 text-base">{ts.confirmCancelTitle}</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {ts.confirmCancelDesc}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700">
                <p>
                  <strong>{cancelTarget.patientName}</strong> ({cancelTarget.id})
                </p>
                <p>
                  Doctor: {cancelTarget.doctorName} • {cancelTarget.date} at {cancelTarget.time}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCancelTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Yes, Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};
