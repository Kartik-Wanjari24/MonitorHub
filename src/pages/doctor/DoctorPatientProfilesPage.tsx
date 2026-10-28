import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import { Interactive3DHumanBody } from '../../components/doctor/Interactive3DHumanBody';
import { VitalsMonitoringPanel } from '../../components/doctor/VitalsMonitoringPanel';
import type { OrganType } from '../../types/doctor';
import {
  Search,
  Activity,
  Pill,
  FileText,
  Clock,
  BookOpen,
  CalendarDays,
  FileEdit,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { ProfileImage } from '../../components/common/ProfileImage';

export const DoctorPatientProfilesPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;
  const [searchParams] = useSearchParams();

  const patients = doctorStore.getAllDoctorPatients();
  const paramId = searchParams.get('id');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    paramId || patients[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<
    'vitals3d' | 'history' | 'diagnoses' | 'labReports' | 'notes' | 'diary'
  >('vitals3d');

  const [activeOrgan, setActiveOrgan] = useState<OrganType>('heart');

  const patient = doctorStore.getDoctorPatient(selectedPatientId);

  const filteredPatients = patients.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term) ||
      p.contactNumber.includes(term)
    );
  });

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {td.profileTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{td.profileSubtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/doctor/consultations?patientId=${selectedPatientId}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <FileEdit className="w-4 h-4" />
              <span>Launch Consultation</span>
            </Link>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Patient Selector List (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col max-h-[850px]">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter patients..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Patients List */}
            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {filteredPatients.map((p) => {
                const isSelected = p.id === selectedPatientId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`w-full p-3.5 text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border-l-4 border-blue-600'
                        : 'hover:bg-slate-50 border-l-4 border-transparent'
                    }`}
                  >
                    <ProfileImage
                      type="patient"
                      identifier={p.id}
                      name={p.fullName}
                      size="sm"
                      className="mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm truncate">
                          {p.fullName}
                        </span>
                        {p.isProvisional && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Provisional
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-blue-700 font-mono mt-0.5">{p.id}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {p.age} yrs • {p.gender} • {p.admissionStatus || 'Outpatient'}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Complete Patient Profile Workspace (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {patient ? (
              <>
                {/* Patient Summary Header Card */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-5 text-white shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <ProfileImage
                        type="patient"
                        identifier={patient.id}
                        name={patient.fullName}
                        size="lg"
                        className="shadow-lg mt-1"
                      />
                      <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono text-xs font-bold">
                          {patient.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                          {patient.admissionStatus} {patient.bedNumber ? `• ${patient.bedNumber}` : ''}
                        </span>
                        {patient.allergies.length > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Allergies: {patient.allergies.join(', ')}
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl font-extrabold text-white mt-2">
                        {patient.fullName}
                      </h2>
                      <p className="text-xs text-blue-200 mt-1">
                        {patient.age} years • {patient.gender} • Emergency Contact:{' '}
                        {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                      </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Link
                        to={`/doctor/consultations?patientId=${patient.id}`}
                        className="px-3.5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs transition-all shadow-xs block text-center"
                      >
                        Start Consultation
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Tabs Bar */}
                <div className="flex border-b border-slate-200 overflow-x-auto bg-white rounded-t-2xl p-1 shadow-2xs">
                  {[
                    { id: 'vitals3d', label: td.tabVitalsAnd3D, icon: Activity },
                    { id: 'history', label: td.tabHistoryAndVisits, icon: Clock },
                    { id: 'diagnoses', label: td.tabDiagnosesAndMeds, icon: Pill },
                    { id: 'labReports', label: td.tabLabReports, icon: FileText },
                    { id: 'notes', label: td.tabDoctorNotes, icon: CalendarDays },
                    { id: 'diary', label: td.tabHealthDiary, icon: BookOpen },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isAct = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                          isAct
                            ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panels */}
                <div className="space-y-6">
                  {/* Tab 1: Vitals & 3D Anatomy (Core Phase 4 Focus) */}
                  {activeTab === 'vitals3d' && (
                    <div className="space-y-6">
                      {/* Vitals Multi-Parameter Stream Panel */}
                      <VitalsMonitoringPanel vitals={patient.vitals} patientName={patient.fullName} />

                      {/* Interactive 3D Human Body Component */}
                      <Interactive3DHumanBody
                        patientId={patient.id}
                        selectedOrgan={activeOrgan}
                        onSelectOrgan={(org) => setActiveOrgan(org)}
                      />
                    </div>
                  )}

                  {/* Tab 2: Medical History & Previous Visits */}
                  {activeTab === 'history' && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Documented Previous Visits ({patient.previousVisits.length})
                      </h3>
                      <div className="space-y-3">
                        {patient.previousVisits.map((v, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-3"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                                  {v.department}
                                </span>
                                <span className="text-xs text-slate-400">{v.date}</span>
                              </div>
                              <p className="font-bold text-slate-900 text-sm mt-1">{v.reason}</p>
                              <p className="text-xs text-slate-500">Attending: {v.doctorName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Diagnoses & Prescriptions */}
                  {activeTab === 'diagnoses' && (
                    <div className="space-y-4">
                      {/* Diagnoses Card */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Clinical Diagnoses
                        </h3>
                        {patient.diagnoses.map((d, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-900 text-sm">{d.condition}</span>
                              <span className="text-xs text-slate-400">{d.diagnosedDate}</span>
                            </div>
                            <p className="text-xs text-slate-600">{d.notes}</p>
                            <p className="text-[10px] text-blue-700 font-semibold mt-1">
                              Confirmed by {d.doctorName}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Prescriptions Card */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Current & Active Medications
                        </h3>
                        {patient.prescriptions.map((rx) => (
                          <div
                            key={rx.id}
                            className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{rx.medicineName}</p>
                              <p className="text-xs text-slate-600">
                                Dosage: <strong>{rx.dosage}</strong> • Frequency: {rx.frequency}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                Prescribed by {rx.doctorName} ({rx.prescribedDate})
                              </p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Active
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Lab Reports */}
                  {activeTab === 'labReports' && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Diagnostic Test Reports & Biometrics
                      </h3>
                      {patient.labReports.map((lab) => (
                        <div
                          key={lab.id}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{lab.testName}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  lab.status === 'Normal'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {lab.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 font-mono mt-1">{lab.result}</p>
                            <p className="text-[10px] text-slate-400 mt-1">Date: {lab.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 5: Doctor Notes */}
                  {activeTab === 'notes' && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Attending Physician Notes
                      </h3>
                      {patient.doctorNotes.map((note) => (
                        <div key={note.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{note.doctorName}</span>
                            <span className="text-[11px] text-slate-400">{note.date}</span>
                          </div>
                          <p className="text-xs text-slate-700 italic">"{note.note}"</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 6: Patient Health Diary */}
                  {activeTab === 'diary' && (
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {td.patientHealthDiaryTitle}
                      </h3>
                      {patient.healthDiary.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">{td.noDiaryNotes}</p>
                      ) : (
                        patient.healthDiary.map((entry) => (
                          <div
                            key={entry.id}
                            className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-900">
                                {entry.date} at {entry.time}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                                Severity: {entry.severity}/5
                              </span>
                            </div>
                            <p className="text-xs text-slate-800 font-medium">"{entry.symptoms}"</p>
                            <p className="text-[11px] text-slate-500">Activity/Context: {entry.mealsOrActivity}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-slate-400">Select a patient to view.</div>
            )}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};
