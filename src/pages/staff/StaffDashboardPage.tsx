import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import {
  Users,
  UserCheck,
  CalendarDays,
  AlertOctagon,
  UserPlus,
  Search,
  Clock,
  ArrowRight,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ProfileImage } from '../../components/common/ProfileImage';

export const StaffDashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;

  // Retrieve current store state
  const patients = staffStore.getPatients();
  const appointments = staffStore.getAppointments();
  const queue = staffStore.getQueue();
  const emergencyCases = staffStore.getEmergencyCases();

  // Metrics
  const totalRegistered = patients.length;
  const todayRegCount = patients.filter((p) => p.registrationDate.startsWith('2026-10-24')).length || 2;
  const todayAptCount = appointments.filter((a) => a.date === '2026-10-24').length;
  const activeEmergencies = emergencyCases.filter((e) => e.status !== 'Discharged');

  // Recent 4 registrations
  const recentPatients = patients.slice(0, 4);
  const upcomingApts = appointments.filter((a) => a.date === '2026-10-24' && a.status !== 'Cancelled').slice(0, 3);
  const activeQueue = queue.slice(0, 4);

  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Emergency Alert Banner */}
        {activeEmergencies.length > 0 && (
          <div className="rounded-[1.75rem] p-5 bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm sm:text-base leading-tight">
                  {ts.activeEmergenciesAlert}
                </h2>
                <p className="text-xs text-rose-100 mt-0.5">
                  {activeEmergencies.length} {ts.activeEmergenciesAlertDesc}
                </p>
              </div>
            </div>
            <Link
              to="/staff/emergency"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-rose-700 hover:bg-rose-50 text-xs font-black transition-colors shrink-0 shadow-sm"
            >
              <span>{ts.jumpToEmergency}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* 4 Summary Stat Cards styled with Reference Radii */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-[1.75rem] p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                {ts.statTotalPatients}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">{totalRegistered}</span>
              <span className="text-xs font-semibold text-slate-400 ml-2">records</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Standard + Emergency intake</span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[1.75rem] p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                {ts.statTodayReg}
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">{todayRegCount}</span>
              <span className="text-xs text-emerald-700 font-bold ml-2">new today</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Desk intake active</span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[1.75rem] p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                {ts.statTodayApt}
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <CalendarDays className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">{todayAptCount}</span>
              <span className="text-xs text-slate-400 ml-2">scheduled</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Cardiology & General OPD</span>
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[1.75rem] p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider">
                {ts.statEmergencyCases}
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-rose-600">{activeEmergencies.length}</span>
              <span className="text-xs text-rose-700 font-bold ml-2">in observation</span>
            </div>
            <p className="text-[11px] text-rose-600 mt-2 flex items-center gap-1 font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>Prioritized triage queue</span>
            </p>
          </div>
        </div>

        {/* Quick Actions Pastel Banner */}
        <div className="bg-[#E6F0FF] rounded-[2rem] p-6 border border-[#BFDBFE]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#0052cc]" />
            <h3 className="text-xs font-black text-blue-950 uppercase tracking-wider">
              {ts.quickActions}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/staff/registration"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-blue-200/80 hover:border-[#0052cc] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0052cc]/10 text-[#0052cc] flex items-center justify-center shrink-0 group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
                <UserPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight">{ts.quickRegPatient}</p>
                <p className="text-[10px] text-slate-500">Standard intake</p>
              </div>
            </Link>

            <Link
              to="/staff/registration?mode=emergency"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-rose-200 hover:border-rose-500 hover:shadow-xs transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-rose-950 leading-tight">{ts.quickEmergencyReg}</p>
                <p className="text-[10px] text-rose-600">Provisional intake</p>
              </div>
            </Link>

            <Link
              to="/staff/records"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-blue-200/80 hover:border-[#0052cc] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-[#0052cc] group-hover:text-white transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight">{ts.quickFindPatient}</p>
                <p className="text-[10px] text-slate-500">Search directory</p>
              </div>
            </Link>

            <Link
              to="/staff/appointments"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-blue-200/80 hover:border-[#0052cc] hover:shadow-xs transition-all text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-900 leading-tight">{ts.quickNewApt}</p>
                <p className="text-[10px] text-slate-500">Book slot</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Registrations Card */}
            <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{ts.recentRegistrations}</h3>
                  <p className="text-xs text-slate-500">Recently enrolled Indian patient records</p>
                </div>
                <Link
                  to="/staff/records"
                  className="text-xs font-extrabold text-[#0052cc] hover:underline"
                >
                  {ts.viewAllPatients}
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <ProfileImage
                        type="patient"
                        identifier={patient.id}
                        name={patient.fullName}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-slate-900 text-sm truncate">
                            {patient.fullName}
                          </p>
                          {patient.isProvisional && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Provisional
                            </span>
                          )}
                          {patient.registrationType === 'emergency' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                              Emergency
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {patient.id} • {patient.age} yrs • {patient.contactNumber}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/staff/records?search=${patient.id}`}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-[#0052cc] hover:text-white transition-all shrink-0"
                    >
                      {ts.viewDetails}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Upcoming Appointments */}
            <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{ts.upcomingAppointments}</h3>
                  <p className="text-xs text-slate-500">Consultations scheduled for today</p>
                </div>
                <Link
                  to="/staff/appointments"
                  className="text-xs font-extrabold text-[#0052cc] hover:underline"
                >
                  {ts.viewAllAppointments}
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {upcomingApts.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <ProfileImage
                        type="patient"
                        identifier={apt.patientId}
                        name={apt.patientName}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 text-sm truncate">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          {apt.doctorName} • <span className="text-[#0052cc] font-bold">{apt.department}</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        apt.status === 'Checked In'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Queue Widget */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{ts.liveQueueSummary}</h3>
                  <p className="text-xs text-slate-500">Real-time lobby queue tokens</p>
                </div>
                <Link
                  to="/staff/queue"
                  className="text-xs font-extrabold text-[#0052cc] hover:underline"
                >
                  {ts.viewFullQueue}
                </Link>
              </div>

              <div className="p-4 space-y-3">
                {activeQueue.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      item.isEmergency
                        ? 'bg-rose-50/70 border-rose-200'
                        : item.status === 'In Consultation'
                        ? 'bg-blue-50/70 border-blue-200'
                        : 'bg-slate-50/80 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-900 shadow-2xs">
                        Token #{item.tokenNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'In Consultation'
                            ? 'bg-[#0052cc] text-white'
                            : item.status === 'Waiting'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 truncate">
                      {item.patientName}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {item.assignedDoctor}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100 text-center">
                <Link
                  to="/staff/queue"
                  className="text-xs font-bold text-[#0052cc] inline-flex items-center gap-1 hover:underline"
                >
                  <span>{ts.viewFullQueue}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Prototype Information Box */}
            <div className="bg-[#EDE9FE] rounded-[2rem] p-5 border border-[#DDD6FE]">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider mb-1">
                Indian Healthcare Prototype
              </h4>
              <p className="text-xs text-purple-900/80 leading-relaxed font-medium">
                Hospital staff portal operates on shared session storage. Modifying patients, adding queue tokens, and checking appointments synchronizes across Doctor and Patient portals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};
