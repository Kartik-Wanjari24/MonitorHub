import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import type { PatientRecord } from '../../types/staff';
import {
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  FileText,
  Activity,
  AlertTriangle,
  Pill,
  ClipboardList,
  X,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

export const PatientRecordsPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;
  const [searchParams] = useSearchParams();

  const [patients, setPatients] = useState<PatientRecord[]>(staffStore.getPatients());
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filterType, setFilterType] = useState<'all' | 'normal' | 'emergency' | 'provisional'>('all');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(() => {
    const searchId = searchParams.get('search');
    if (searchId) {
      const match = staffStore.getPatientById(searchId);
      if (match) return match;
    }
    return patients[0] || null;
  });

  const [activeTab, setActiveTab] = useState<'demographics' | 'visits' | 'diagnoses' | 'prescriptions' | 'labReports' | 'notes'>('demographics');

  // Modal to complete provisional details
  const [isUpdatingProvisional, setIsUpdatingProvisional] = useState(false);
  const [provAddress, setProvAddress] = useState('');
  const [provPhone, setProvPhone] = useState('');
  const [provEmergContact, setProvEmergContact] = useState('');

  // Filtered patients
  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesSearch =
        !term ||
        p.fullName.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        p.contactNumber.includes(term);

      if (!matchesSearch) return false;

      if (filterType === 'normal') return p.registrationType === 'normal';
      if (filterType === 'emergency') return p.registrationType === 'emergency';
      if (filterType === 'provisional') return p.isProvisional;
      return true;
    });
  }, [patients, searchTerm, filterType]);

  const handleSelectPatient = (patient: PatientRecord) => {
    setSelectedPatient(patient);
    setIsUpdatingProvisional(false);
  };

  const handleSaveProvisional = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const updated = staffStore.updatePatient(selectedPatient.id, {
      address: provAddress || selectedPatient.address,
      contactNumber: provPhone || selectedPatient.contactNumber,
      emergencyContact: {
        ...selectedPatient.emergencyContact,
        phone: provEmergContact || selectedPatient.emergencyContact.phone,
      },
      isProvisional: false, // Mark fully completed
    });

    if (updated) {
      setSelectedPatient(updated);
      setPatients(staffStore.getPatients());
      setIsUpdatingProvisional(false);
    }
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {ts.recordsTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{ts.recordsSubtitle}</p>
          </div>

          <Link
            to="/staff/registration"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{ts.quickRegPatient}</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={ts.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 hidden sm:inline" />
            {(['all', 'normal', 'emergency', 'provisional'] as const).map((ft) => (
              <button
                key={ft}
                type="button"
                onClick={() => setFilterType(ft)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === ft
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ft === 'all'
                  ? ts.filterAll
                  : ft === 'normal'
                  ? ts.filterNormal
                  : ft === 'emergency'
                  ? ts.filterEmergency
                  : ts.filterProvisional}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Patient Directory List (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col max-h-[750px]">
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {filteredPatients.length} {ts.totalRecordsCount}
              </span>
              <span className="text-[11px] text-slate-400">Select to inspect</span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
              {filteredPatients.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">{ts.noData}</div>
              ) : (
                filteredPatients.map((patient) => {
                  const isSelected = selectedPatient?.id === patient.id;
                  return (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => handleSelectPatient(patient)}
                      className={`w-full p-4 text-left transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-sky-50/80 border-l-4 border-sky-600'
                          : 'hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-bold text-slate-900 text-sm truncate">
                            {patient.fullName}
                          </p>
                          {patient.isProvisional && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Provisional
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-sky-700 font-semibold mt-0.5">{patient.id}</p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {patient.age} yrs • {patient.gender} • {patient.contactNumber}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                          isSelected ? 'text-sky-600 translate-x-0.5' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Detailed Record View (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
            {selectedPatient ? (
              <div>
                {/* Header Card */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-sky-950 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-sky-500 text-white font-mono text-xs font-bold tracking-wide">
                          {selectedPatient.id}
                        </span>
                        {selectedPatient.isProvisional && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 text-xs font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {ts.provisionalBadge}
                          </span>
                        )}
                        {selectedPatient.registrationType === 'emergency' && (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold">
                            Emergency Intake
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-extrabold text-white mt-2">
                        {selectedPatient.fullName}
                      </h2>
                      <p className="text-xs text-sky-200 mt-1">
                        {selectedPatient.age} years • {selectedPatient.gender} • Registered on{' '}
                        {selectedPatient.registrationDate.split('T')[0]}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                      <Link
                        to={`/staff/appointments?patientId=${selectedPatient.id}`}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all text-center"
                      >
                        {ts.scheduleAptForPatient}
                      </Link>
                      {selectedPatient.isProvisional && (
                        <button
                          type="button"
                          onClick={() => {
                            setProvAddress(selectedPatient.address || '');
                            setProvPhone(selectedPatient.contactNumber || '');
                            setProvEmergContact(selectedPatient.emergencyContact.phone || '');
                            setIsUpdatingProvisional(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold transition-all text-center"
                        >
                          {ts.completeRecordBtn}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Updating Provisional Info Inline Form */}
                {isUpdatingProvisional && (
                  <form
                    onSubmit={handleSaveProvisional}
                    className="p-5 bg-amber-50/70 border-b border-amber-200 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        {ts.completeRecordTitle}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsUpdatingProvisional(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Updated Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={provPhone}
                          onChange={(e) => setProvPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Residential Address
                        </label>
                        <input
                          type="text"
                          value={provAddress}
                          onChange={(e) => setProvAddress(e.target.value)}
                          placeholder="Complete Address"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Emergency Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={provEmergContact}
                          onChange={(e) => setProvEmergContact(e.target.value)}
                          placeholder="+91 98765 00000"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsUpdatingProvisional(false)}
                        className="px-3 py-1 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700"
                      >
                        {ts.cancel}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        {ts.save}
                      </button>
                    </div>
                  </form>
                )}

                {/* Tabs Navigation */}
                <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/50">
                  {[
                    { id: 'demographics', label: ts.demographicsTab, icon: ClipboardList },
                    { id: 'visits', label: ts.visitsTab, icon: Clock },
                    { id: 'diagnoses', label: ts.diagnosesTab, icon: Activity },
                    { id: 'prescriptions', label: ts.prescriptionsTab, icon: Pill },
                    { id: 'labReports', label: ts.labReportsTab, icon: FileText },
                    { id: 'notes', label: ts.notesTab, icon: Calendar },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                          isActive
                            ? 'border-sky-600 text-sky-800 bg-white font-bold'
                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Panels */}
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Demographics Tab */}
                  {activeTab === 'demographics' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Contact Information
                          </span>
                          <p className="text-sm font-semibold text-slate-900">
                            {selectedPatient.contactNumber}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Email: {selectedPatient.email || 'None provided'}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Address: {selectedPatient.address || 'Not on file'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Emergency Contact
                          </span>
                          <p className="text-sm font-semibold text-slate-900">
                            {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship})
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Phone: {selectedPatient.emergencyContact.phone}
                          </p>
                        </div>
                      </div>

                      {/* Known Allergies */}
                      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                        <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block mb-2">
                          {ts.allergiesLabel}
                        </span>
                        {selectedPatient.allergies.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.allergies.map((allergy, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200"
                              >
                                ⚠ {allergy}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500">{ts.noAllergiesRecorded}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Visits Tab */}
                  {activeTab === 'visits' && (
                    <div className="space-y-3">
                      {selectedPatient.previousVisits.length > 0 ? (
                        selectedPatient.previousVisits.map((visit, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                                  {visit.department}
                                </span>
                                <span className="text-xs text-slate-400">{visit.date}</span>
                              </div>
                              <p className="text-sm font-bold text-slate-900 mt-1">{visit.reason}</p>
                              <p className="text-xs text-slate-500">Seen by {visit.doctorName}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-4 text-center">{ts.noVisitsRecorded}</p>
                      )}
                    </div>
                  )}

                  {/* Diagnoses Tab */}
                  {activeTab === 'diagnoses' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-900">
                        {ts.sensitiveClinicalNotice}
                      </div>

                      {selectedPatient.diagnoses.length > 0 ? (
                        <div className="space-y-3">
                          {selectedPatient.diagnoses.map((diag, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-2xs"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-900 text-sm">
                                  {diag.condition}
                                </span>
                                <span className="text-xs text-slate-400">{diag.diagnosedDate}</span>
                              </div>
                              <p className="text-xs text-slate-600">{diag.notes}</p>
                              <p className="text-[11px] text-sky-700 font-medium mt-2">
                                Attending: {diag.doctorName}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 py-4 text-center">
                          {ts.noDiagnosesRecorded}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Prescriptions Tab */}
                  {activeTab === 'prescriptions' && (
                    <div className="space-y-3">
                      {selectedPatient.prescriptions.length > 0 ? (
                        selectedPatient.prescriptions.map((rx) => (
                          <div
                            key={rx.id}
                            className="p-4 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{rx.medicineName}</p>
                              <p className="text-xs text-slate-600 mt-0.5">
                                Dosage: <strong>{rx.dosage}</strong> • Frequency: {rx.frequency}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-1">
                                Prescribed by {rx.doctorName} on {rx.prescribedDate}
                              </p>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Active
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-4 text-center">
                          {ts.noPrescriptionsRecorded}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Lab Reports Tab */}
                  {activeTab === 'labReports' && (
                    <div className="space-y-3">
                      {selectedPatient.labReports.length > 0 ? (
                        selectedPatient.labReports.map((lab) => (
                          <div
                            key={lab.id}
                            className="p-4 rounded-xl border border-slate-200/80 bg-white flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900 text-sm">{lab.testName}</p>
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
                              <p className="text-xs text-slate-600 mt-1 font-mono">{lab.result}</p>
                              <p className="text-[11px] text-slate-400 mt-1">Date: {lab.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-4 text-center">
                          {ts.noLabReportsRecorded}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Doctor Notes Tab */}
                  {activeTab === 'notes' && (
                    <div className="space-y-3">
                      {selectedPatient.doctorNotes.length > 0 ? (
                        selectedPatient.doctorNotes.map((note) => (
                          <div
                            key={note.id}
                            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-slate-900">
                                {note.doctorName}
                              </span>
                              <span className="text-xs text-slate-400">{note.date}</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed italic">
                              "{note.note}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 py-4 text-center">
                          {ts.noDoctorNotesRecorded}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold">{ts.noData}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};
