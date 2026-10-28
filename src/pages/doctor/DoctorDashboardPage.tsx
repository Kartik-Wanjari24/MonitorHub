import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import { staffStore } from '../../services/staffStore';
import {
  Search,
  Sparkles,
  ChevronRight,
  Quote,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { ProfileImage } from '../../components/common/ProfileImage';

export const DoctorDashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;

  // Store data
  const patients = doctorStore.getAllDoctorPatients();
  const queue = staffStore.getQueue();
  const emergencyCases = staffStore.getEmergencyCases();
  const alerts = doctorStore.getAlerts();

  // Metrics
  const totalAssigned = patients.length;
  const activeEmergencies = emergencyCases.filter((e) => e.status !== 'Discharged').length;
  const activeConsultations = queue.filter((q) => q.status === 'In Consultation').length;
  const pendingReviews = alerts.filter((a) => a.type === 'pending_review' || a.type === 'abnormal_lab').length;

  // Filter unacknowledged alerts
  const priorityAlerts = alerts.filter((a) => !a.acknowledged).slice(0, 3);

  // Active / Current Patient in consultation (from reference screenshot)
  const currentConsultation = queue.find((q) => q.status === 'In Consultation') || queue[0];
  const patientInConsult = currentConsultation
    ? doctorStore.getDoctorPatient(currentConsultation.patientId)
    : patients[0];

  // Quick Find Patient state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleAcknowledge = (id: string) => {
    doctorStore.acknowledgeAlert(id);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = patients.find(
      (p) =>
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSearchResult(`Found: ${found.fullName} (${found.id})`);
    } else {
      setSearchResult('No patient found with that ID or name.');
    }
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Main Reference 2-Column Clinical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Doctor Welcome Card + Current Patient + Queue (4 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Doctor Greeting Card (Muted Purple/Plum gradient from Reference Screenshot) */}
            <div className="rounded-[1.75rem] p-6 bg-gradient-to-br from-[#504068] via-[#46365C] to-[#392B4E] text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-purple-200 font-medium block">
                    A good day to make a difference.
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                    Hello,<br />{td.drName}
                  </h3>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-200/90 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Cardiology & General Medicine</span>
                  </div>
                </div>

                {/* Doctor Avatar / Photo Frame */}
                <ProfileImage
                  type="doctor"
                  identifier={td.drName}
                  name={td.drName}
                  size="xl"
                  className="rounded-2xl shadow-md"
                />
              </div>
            </div>

            {/* 2. Current Patient Card (Reference Design Card) */}
            <div className="bg-white rounded-[1.75rem] p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Current patient</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In consultation
                </span>
              </div>

              {patientInConsult ? (
                <div className="flex items-center gap-3 py-1">
                  <ProfileImage
                    type="patient"
                    identifier={patientInConsult.id}
                    name={patientInConsult.fullName}
                    size="md"
                    className="shadow-sm"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                      {patientInConsult.fullName}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Patient ID • {patientInConsult.id}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active patient</p>
              )}

              {/* Reference Pill Button: Next Patient To Address */}
              <Link
                to={patientInConsult ? `/doctor/profiles?id=${patientInConsult.id}` : '/doctor/queue'}
                className="w-full py-3 px-4 rounded-full bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Next Patient To Address</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. Patient Queue Snapshot (Reference Sidebar Widget) */}
            <div className="bg-white rounded-[1.75rem] p-5 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Patient queue</span>
                <span className="text-xs font-semibold text-slate-400">
                  {queue.length} patients
                </span>
              </div>

              {/* Search bar inside queue widget as in reference */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name or patient ID"
                  className="w-full pl-8 pr-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2 pt-1 max-h-56 overflow-y-auto">
                {queue.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    to={`/doctor/profiles?id=${item.patientId}`}
                    className="flex items-center justify-between p-2.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ProfileImage
                        type="patient"
                        identifier={item.patientId}
                        name={item.patientName}
                        size="xs"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                          {item.patientName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Token #{item.tokenNumber} • {item.patientId}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Soft Pastel Workspace (8 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-5">
            {/* Big Soft Blue Hero Card (Reference: "A little care goes a long way.") */}
            <div className="rounded-[2rem] p-6 sm:p-8 bg-[#E6F0FF] border border-[#BFDBFE] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0052cc]">
                    Patient Care, Connected
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    A little care goes a long way.
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white text-blue-700 border border-blue-200/80 shadow-2xs">
                  INDIAN CLINICAL DATA
                </span>
              </div>

              {/* Reference Quote Card */}
              <div className="bg-white rounded-[1.5rem] p-5 border border-blue-100/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                    "Wherever the art of medicine is loved, there is also a love of humanity."
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">— Hippocrates</p>
                </div>
              </div>

              {/* 4 Quick Clinical KPI Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-blue-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Assigned</span>
                  <span className="text-2xl font-black text-slate-900">{totalAssigned}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Patients</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-rose-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-rose-600 uppercase block">Emergency</span>
                  <span className="text-2xl font-black text-rose-600">{activeEmergencies}</span>
                  <span className="text-[10px] text-rose-500 block mt-0.5">In triage</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-blue-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-blue-700 uppercase block">In Consult</span>
                  <span className="text-2xl font-black text-blue-700">{activeConsultations}</span>
                  <span className="text-[10px] text-blue-600 block mt-0.5">Active rooms</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 border border-amber-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">Pending</span>
                  <span className="text-2xl font-black text-amber-700">{pendingReviews}</span>
                  <span className="text-[10px] text-amber-600 block mt-0.5">Lab reviews</span>
                </div>
              </div>
            </div>

            {/* Lavender Card 1: Find a Patient (Reference: "Find a patient") */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-[#EDE9FE] border border-[#DDD6FE] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-200/80 text-purple-800 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-purple-950">Find a patient</h4>
                  <p className="text-xs text-purple-700">Pick up where their care left off.</p>
                </div>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-purple-900 mb-1">
                      Patient ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TMH-2026-001"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-white text-slate-800 text-xs border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-purple-900 mb-1">
                      Patient name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-full bg-white text-slate-800 text-xs border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {searchResult && (
                  <p className="text-xs font-bold text-purple-900 bg-white/70 p-2.5 rounded-xl border border-purple-200">
                    {searchResult}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-purple-700 flex items-center gap-1">
                    <Search className="w-3 h-3" /> Find by name or unique patient ID.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Find patient</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Lavender Card 2: Enroll a New Patient shortcut (Reference: "Enroll a new patient") */}
            <div className="rounded-[2rem] p-6 sm:p-7 bg-[#EDE9FE] border border-[#DDD6FE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-200/80 text-purple-800 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-purple-950">Enroll a new patient</h4>
                  <p className="text-xs text-purple-700">Great care starts with knowing your patient.</p>
                </div>
              </div>

              <Link
                to="/staff/registration"
                className="px-6 py-2.5 rounded-full bg-[#0052cc] hover:bg-[#0043a8] text-white text-xs font-bold shadow-md transition-all shrink-0 text-center"
              >
                Go to Registration Desk →
              </Link>
            </div>

            {/* Priority Clinical Alerts Panel */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{td.activeAlertsSection}</h4>
                  <p className="text-xs text-slate-500">Telemetry thresholds and abnormal labs</p>
                </div>
                <Link
                  to="/doctor/alerts"
                  className="text-xs font-bold text-[#0052cc] hover:underline"
                >
                  View All Alerts →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {priorityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between ${
                      alert.severity === 'critical'
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white text-slate-800 border">
                          {alert.severity}
                        </span>
                        <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 leading-tight">
                        {alert.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {alert.message}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-700 truncate">
                        {alert.patientName}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-2.5 py-1 rounded-full bg-white text-slate-800 text-[10px] font-bold border border-slate-300 shadow-2xs hover:bg-slate-50"
                      >
                        {td.acknowledgeBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};
