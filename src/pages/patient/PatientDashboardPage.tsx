import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Clock,
  Stethoscope,
  FileText,
  BookOpen,
  CalendarDays,
  LifeBuoy,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const PatientDashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const patient = patientStore.getCurrentPatient();
  const queueStatus = patientStore.getCurrentQueueStatus();
  const appointments = patientStore.getMyAppointments();
  const nextApt = appointments.find((a) => a.status === 'Scheduled' || a.status === 'Checked In');

  const mainActions = [
    {
      title: tp.actionQueueTitle,
      desc: tp.actionQueueDesc,
      icon: Clock,
      to: '/patient/queue',
      color: 'bg-[#E6F0FF] text-[#0052cc] border-[#BFDBFE] hover:border-[#0052cc]',
      badge: queueStatus.queueItem ? `Token #${queueStatus.queueItem.tokenNumber}` : null,
      badgeColor: 'bg-[#0052cc] text-white',
    },
    {
      title: tp.actionDoctorVisitTitle,
      desc: tp.actionDoctorVisitDesc,
      icon: Stethoscope,
      to: '/patient/visit',
      color: 'bg-[#F4F7FB] text-slate-800 border-slate-200 hover:border-slate-400',
      badge: 'Upcoming',
      badgeColor: 'bg-slate-800 text-white',
    },
    {
      title: tp.actionReportsTitle,
      desc: tp.actionReportsDesc,
      icon: FileText,
      to: '/patient/reports',
      color: 'bg-[#EDE9FE] text-purple-900 border-[#DDD6FE] hover:border-purple-500',
      badge: 'Verified',
      badgeColor: 'bg-purple-700 text-white',
    },
    {
      title: tp.actionDiaryTitle,
      desc: tp.actionDiaryDesc,
      icon: BookOpen,
      to: '/patient/diary',
      color: 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400',
      badge: '+ Add Note',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      title: tp.actionAppointmentsTitle,
      desc: tp.actionAppointmentsDesc,
      icon: CalendarDays,
      to: '/patient/appointments',
      color: 'bg-sky-50 text-sky-900 border-sky-200 hover:border-sky-400',
      badge: nextApt ? `${nextApt.time}` : null,
      badgeColor: 'bg-sky-600 text-white',
    },
    {
      title: tp.actionHelpTitle,
      desc: tp.actionHelpDesc,
      icon: LifeBuoy,
      to: '/patient/help',
      color: 'bg-rose-50 text-rose-900 border-rose-300 hover:border-rose-500 ring-2 ring-rose-500/15',
      badge: 'Assistance',
      badgeColor: 'bg-rose-600 text-white animate-pulse',
    },
  ];

  return (
    <PatientLayout>
      <div className="space-y-6">
        {/* Welcome Greeting Banner (Reference Plum Gradient) */}
        <div className="rounded-[2rem] p-7 sm:p-9 bg-gradient-to-br from-[#504068] via-[#46365C] to-[#392B4E] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-purple-200 text-xs font-bold tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Personal Care Dashboard</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {tp.welcomeBack} {patient?.fullName || 'Rahul Verma'}!
            </h1>
            <p className="text-sm text-purple-100/90 leading-relaxed font-medium">
              Check your hospital token, doctor rounds, medication reminders, test reports, and non-emergency help requests anytime.
            </p>
          </div>
        </div>

        {/* Top Highlight Cards: Next Appointment & Live Queue Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Next Appointment */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#0052cc]" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {tp.nextAppointmentCardTitle}
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {nextApt?.status || 'Scheduled'}
              </span>
            </div>

            {nextApt ? (
              <div className="py-4 space-y-1">
                <p className="text-2xl font-black text-slate-900">
                  {nextApt.date} at {nextApt.time}
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {nextApt.doctorName} • <span className="text-[#0052cc]">{nextApt.department}</span>
                </p>
                <p className="text-xs text-slate-400 font-medium">Consultation Type: {nextApt.type}</p>
              </div>
            ) : (
              <div className="py-4 text-slate-500 text-xs font-medium">
                {tp.noUpcomingAppointments}
              </div>
            )}

            <Link
              to="/patient/appointments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] hover:underline pt-2 border-t border-slate-100"
            >
              <span>Manage Appointments</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Live OPD Queue Status */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0052cc]" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {tp.queueStatusCardTitle}
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-900">
                {queueStatus.queueItem?.status || 'Waiting'}
              </span>
            </div>

            {queueStatus.queueItem ? (
              <div className="py-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {tp.tokenNumber}
                  </span>
                  <p className="text-4xl font-black text-[#0052cc] font-mono mt-0.5">
                    #{queueStatus.queueItem.tokenNumber}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Room: <strong>OPD Room 4</strong> ({queueStatus.queueItem.assignedDoctor})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {tp.patientsAhead}
                  </span>
                  <p className="text-4xl font-black text-slate-900 font-mono mt-0.5">
                    {queueStatus.patientsAhead}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">Estimated wait: ~10 mins</p>
                </div>
              </div>
            ) : (
              <div className="py-4 text-slate-500 text-xs font-medium">
                {tp.noActiveQueue}
              </div>
            )}

            <Link
              to="/patient/queue"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] hover:underline pt-2 border-t border-slate-100"
            >
              <span>{tp.actionQueueDesc}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6 Main Action Grid (Elderly & Accessibility Optimized) */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-black text-slate-900">
              Quick Patient Actions
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Large accessible shortcuts designed for easy one-tap health tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mainActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.to}
                  className={`p-6 sm:p-7 rounded-[2rem] border transition-all hover:shadow-xl flex flex-col justify-between group ${action.color}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      {action.badge && (
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${action.badgeColor}`}>
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-xl group-hover:text-[#0052cc] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                        {action.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-extrabold text-slate-800 group-hover:text-[#0052cc]">
                    <span>Open screen</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};
