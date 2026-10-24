import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import type { Appointment } from '../../types/staff';
import {
  Clock,
  CheckCircle2,
  CalendarX,
} from 'lucide-react';

export const PatientAppointmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [appointments, setAppointments] = useState<Appointment[]>(
    patientStore.getMyAppointments()
  );
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const upcomingApts = appointments.filter((a) => a.status === 'Scheduled' || a.status === 'Checked In');
  const pastApts = appointments.filter((a) => a.status === 'Completed' || a.status === 'Cancelled');

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    patientStore.requestCancelAppointment(cancelTarget.id);
    setAppointments(patientStore.getMyAppointments());
    setCancelTarget(null);
    setNotice(tp.cancelSuccessNotice);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.appointmentsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.appointmentsPageSubtitle}</p>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Section 1: Upcoming Appointments */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">
            {tp.upcomingListTitle} ({upcomingApts.length})
          </h2>

          <div className="space-y-3">
            {upcomingApts.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-400 text-xs">
                {tp.noUpcomingAppointments}
              </div>
            ) : (
              upcomingApts.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-emerald-700 mb-0.5" />
                      <span className="text-xs font-black text-emerald-900">{apt.time}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{apt.date}</span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            apt.status === 'Checked In'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {apt.doctorName} • <span className="text-emerald-700">{apt.department}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Type: {apt.type} {apt.notes ? `• ${apt.notes}` : ''}
                      </p>
                    </div>
                  </div>

                  {apt.status === 'Scheduled' && (
                    <button
                      type="button"
                      onClick={() => setCancelTarget(apt)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-all self-end sm:self-center"
                    >
                      {tp.requestCancellationBtn}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 2: Past Appointments */}
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-extrabold text-slate-900">
            {tp.pastListTitle} ({pastApts.length})
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200/80 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {pastApts.map((apt) => (
              <div key={apt.id} className="p-4 sm:p-5 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">
                    {apt.date} at {apt.time}
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    {apt.doctorName} ({apt.department})
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    apt.status === 'Completed'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Confirm Cancellation */}
        {cancelTarget && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-600">
                <CalendarX className="w-6 h-6" />
                <h3 className="font-extrabold text-slate-900 text-base">Cancel Appointment?</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to cancel your appointment with <strong>{cancelTarget.doctorName}</strong> on <strong>{cancelTarget.date}</strong> at <strong>{cancelTarget.time}</strong>?
              </p>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCancelTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};
