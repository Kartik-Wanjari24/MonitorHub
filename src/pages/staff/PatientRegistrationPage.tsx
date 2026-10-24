import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import { AVAILABLE_DOCTORS } from '../../services/mockStaffData';
import type { PatientRecord, PriorityLevel } from '../../types/staff';
import {
  UserPlus,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const PatientRegistrationPage: React.FC = () => {
  const { t } = useLanguage();
  const ts = t.staffPortal;
  const [searchParams] = useSearchParams();

  // Mode: 'normal' | 'emergency'
  const initialMode = searchParams.get('mode') === 'emergency' ? 'emergency' : 'normal';
  const [mode, setMode] = useState<'normal' | 'emergency'>(initialMode);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactRel, setEmergencyContactRel] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  // Emergency-specific fields
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('critical');
  const [assignedDoctor, setAssignedDoctor] = useState(AVAILABLE_DOCTORS[0].name);

  // Validation & Duplicate Checking
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acknowledgedDuplicates, setAcknowledgedDuplicates] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState<PatientRecord | null>(null);

  // Derived duplicate check when fullName or phone changes
  const duplicateMatches = useMemo(() => {
    if (fullName.trim().length >= 3 || phone.trim().length >= 5) {
      return staffStore.findDuplicates(fullName, phone);
    }
    return [];
  }, [fullName, phone]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = ts.fieldRequired;
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 0 || Number(age) > 130) {
      errs.age = ts.fieldRequired;
    }

    if (mode === 'normal') {
      if (!phone.trim()) {
        errs.phone = ts.fieldRequired;
      } else if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
        errs.phone = ts.invalidPhone;
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errs.email = ts.invalidEmail;
      }
    } else {
      // Emergency mode: only complaint required if non-fatal
      if (!chiefComplaint.trim()) {
        errs.chiefComplaint = ts.fieldRequired;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Check duplicates safeguard
    if (duplicateMatches.length > 0 && !acknowledgedDuplicates) {
      return; // Force user to acknowledge or choose existing record
    }

    const isEmergency = mode === 'emergency';

    const newRecord = staffStore.addPatient({
      fullName: fullName.trim(),
      age: Number(age) || 0,
      gender,
      contactNumber: phone.trim() || (isEmergency ? 'Emergency Walk-in (Pending)' : 'N/A'),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      emergencyContact: {
        name: emergencyContactName.trim() || (isEmergency ? 'Relative (Pending)' : 'N/A'),
        relationship: emergencyContactRel.trim() || (isEmergency ? 'Pending' : 'N/A'),
        phone: emergencyContactPhone.trim() || phone.trim() || 'N/A',
      },
      registrationType: isEmergency ? 'emergency' : 'normal',
      isProvisional: isEmergency, // Emergency intake creates provisional record
      allergies: isEmergency ? ['Unknown (Provisional intake)'] : [],
      diagnoses: isEmergency
        ? [
            {
              condition: chiefComplaint.trim() || 'Acute Emergency Assessment',
              diagnosedDate: new Date().toISOString().split('T')[0],
              doctorName: assignedDoctor,
              notes: 'Immediate emergency presentation triage.',
            },
          ]
        : [],
      prescriptions: [],
      labReports: [],
      doctorNotes: [
        {
          id: `DN-${Date.now().toString().slice(-4)}`,
          date: new Date().toISOString().split('T')[0],
          doctorName: isEmergency ? assignedDoctor : 'Staff Desk',
          note: isEmergency
            ? `Emergency intake initiated: ${chiefComplaint}. Priority: ${priority.toUpperCase()}.`
            : 'Initial patient registration complete.',
        },
      ],
      previousVisits: [
        {
          date: new Date().toISOString().split('T')[0],
          reason: isEmergency ? `Emergency: ${chiefComplaint}` : 'Initial OPD Registration',
          doctorName: isEmergency ? assignedDoctor : 'OPD Intake',
          department: isEmergency ? 'Emergency & Trauma' : 'General OPD',
        },
      ],
    });

    // If emergency, automatically log to Emergency Cases and Queue
    if (isEmergency) {
      const activeRole = staffStore.getActiveRole();
      const staffTitle = activeRole === 'compounder' ? 'Sunil Kumar (Compounder)' : 'Pooja Rawat (Receptionist)';

      staffStore.addEmergencyCase({
        patientId: newRecord.id,
        patientName: newRecord.fullName,
        status: 'Triage Pending',
        priority,
        responsibleStaff: staffTitle,
        assignedDoctor,
        chiefComplaint: chiefComplaint.trim(),
        provisionalNotes: `Provisional admission. Contact: ${phone || 'Unspecified'}. Age: ${age}.`,
        isProvisional: true,
      });

      staffStore.addToQueue({
        patientId: newRecord.id,
        patientName: newRecord.fullName,
        assignedDoctor,
        department: 'Emergency & Triage',
        status: 'Waiting',
        priority,
        isEmergency: true,
      });
    }

    setRegisteredPatient(newRecord);
  };

  const handleResetForm = () => {
    setRegisteredPatient(null);
    setFullName('');
    setAge('');
    setPhone('');
    setEmail('');
    setAddress('');
    setEmergencyContactName('');
    setEmergencyContactRel('');
    setEmergencyContactPhone('');
    setChiefComplaint('');
    setAcknowledgedDuplicates(false);
    setErrors({});
  };

  return (
    <StaffLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ts.regTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{ts.regSubtitle}</p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setMode('normal');
              handleResetForm();
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              mode === 'normal'
                ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  mode === 'normal' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{ts.modeNormal}</h2>
                <span className="text-[11px] font-semibold text-sky-600 uppercase">Routine OPD</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">{ts.modeNormalDesc}</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('emergency');
              handleResetForm();
            }}
            className={`p-4 rounded-2xl border text-left transition-all ${
              mode === 'emergency'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3 mb-1">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  mode === 'emergency' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-rose-900 text-sm">{ts.modeEmergency}</h2>
                <span className="text-[11px] font-semibold text-rose-600 uppercase">Triage Intake</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-2">{ts.modeEmergencyDesc}</p>
          </button>
        </div>

        {/* Success Alert Banner when Registered */}
        {registeredPatient && (
          <div className="rounded-2xl p-6 bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{ts.regSuccessTitle}</h2>
                <p className="text-sm text-emerald-800 mt-1">
                  {ts.regSuccessDesc}{' '}
                  <span className="font-extrabold text-emerald-900 px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300">
                    {registeredPatient.id}
                  </span>
                </p>
                <p className="text-xs text-emerald-700 mt-2">
                  Patient <strong>{registeredPatient.fullName}</strong> ({registeredPatient.age} yrs, {registeredPatient.gender}) has been stored.
                  {registeredPatient.isProvisional && (
                    <span className="block mt-1 font-semibold text-amber-800">
                      ⚠ {ts.emergencyRegNotice}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-200/60">
              <Link
                to={`/staff/records?search=${registeredPatient.id}`}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                {ts.viewDetails} →
              </Link>
              <Link
                to="/staff/appointments"
                className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100/50 text-xs font-bold transition-all"
              >
                {ts.scheduleAptForPatient}
              </Link>
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all ml-auto"
              >
                Register Another Patient
              </button>
            </div>
          </div>
        )}

        {/* Duplicate Warning Dialog / Inline Notice */}
        {duplicateMatches.length > 0 && !registeredPatient && (
          <div className="rounded-2xl p-5 bg-amber-50 border border-amber-300 text-amber-900 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-sm font-bold">{ts.duplicateWarningTitle}</h2>
            </div>
            <p className="text-xs text-amber-800">{ts.duplicateWarningDesc}</p>

            <div className="space-y-2">
              {duplicateMatches.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-xs font-extrabold text-slate-900">{m.fullName}</span>{' '}
                    <span className="text-xs text-amber-800 font-semibold">({m.id})</span>
                    <p className="text-[11px] text-slate-500">
                      Phone: {m.contactNumber} • Age: {m.age} yrs • Registered:{' '}
                      {m.registrationDate.split('T')[0]}
                    </p>
                  </div>
                  <Link
                    to={`/staff/records?search=${m.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shrink-0"
                  >
                    <span>{ts.useExistingPatient}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-medium text-amber-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledgedDuplicates}
                  onChange={(e) => setAcknowledgedDuplicates(e.target.checked)}
                  className="rounded border-amber-400 text-amber-600 focus:ring-amber-500"
                />
                <span>I have reviewed existing matches and confirm this is a new patient.</span>
              </label>
            </div>
          </div>
        )}

        {/* Registration Form */}
        {!registeredPatient && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7 space-y-6"
          >
            {/* Section: Primary Patient Info */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  1. Essential Demographics
                </h2>
                <p className="text-xs text-slate-500">Primary identifying details</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {ts.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={ts.fullNamePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/30'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {ts.ageLabel}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={ts.agePlaceholder}
                    min="0"
                    max="130"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.age
                        ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/30'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.age && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.age}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {ts.genderLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Male', 'Female', 'Other'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          gender === g
                            ? 'bg-sky-50 text-sky-800 border-sky-400 font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {g === 'Male' ? ts.genderMale : g === 'Female' ? ts.genderFemale : ts.genderOther}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {ts.phoneLabel}{' '}
                    {mode === 'emergency' && (
                      <span className="text-slate-400 font-normal">(Optional for acute trauma)</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={ts.phonePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/30'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Mode Specific Section: Triage & Complaint */}
            {mode === 'emergency' && (
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-4">
                <div className="border-b border-rose-200 pb-2">
                  <h2 className="text-sm font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    2. Emergency Triage Intake
                  </h2>
                  <p className="text-xs text-rose-700">Immediate presentation urgency</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-950 mb-1.5">
                    {ts.chiefComplaintLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    placeholder={ts.chiefComplaintPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.chiefComplaint
                        ? 'border-rose-500 focus:ring-rose-500/20 bg-white'
                        : 'border-rose-300 focus:border-rose-600 focus:ring-rose-600/20 bg-white'
                    }`}
                  />
                  {errors.chiefComplaint && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1">
                      {errors.chiefComplaint}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Severity */}
                  <div>
                    <label className="block text-xs font-bold text-rose-950 mb-1.5">
                      {ts.initialPriorityLabel}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['critical', 'urgent', 'normal'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`py-2 text-xs font-bold rounded-xl border uppercase transition-all ${
                            priority === p
                              ? p === 'critical'
                                ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                                : p === 'urgent'
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-slate-600 text-white border-slate-700 shadow-xs'
                              : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-100/50'
                          }`}
                        >
                          {p === 'critical' ? ts.critical : p === 'urgent' ? ts.urgent : ts.normal}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Assign Doctor */}
                  <div>
                    <label className="block text-xs font-bold text-rose-950 mb-1.5">
                      {ts.assignedDoctorLabel}
                    </label>
                    <select
                      value={assignedDoctor}
                      onChange={(e) => setAssignedDoctor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    >
                      {AVAILABLE_DOCTORS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.department})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Mode Extra Sections: Address & Emergency Contacts */}
            {mode === 'normal' && (
              <>
                {/* Section 2: Address & Email */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      2. Communication & Residence
                    </h2>
                    <p className="text-xs text-slate-500">Contact and notification reachability</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {ts.emailLabel}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={ts.emailPlaceholder}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-400/20 bg-rose-50/30'
                            : 'border-slate-300 focus:border-sky-500 focus:ring-sky-500/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 font-semibold mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {ts.addressLabel}
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={ts.addressPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Emergency Contact Details */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      3. Emergency Contact Person
                    </h2>
                    <p className="text-xs text-slate-500">Designated relative or guardian</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {ts.emergencyContactNameLabel}
                      </label>
                      <input
                        type="text"
                        value={emergencyContactName}
                        onChange={(e) => setEmergencyContactName(e.target.value)}
                        placeholder={ts.emergencyContactNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {ts.emergencyContactRelLabel}
                      </label>
                      <input
                        type="text"
                        value={emergencyContactRel}
                        onChange={(e) => setEmergencyContactRel(e.target.value)}
                        placeholder={ts.emergencyContactRelPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {ts.emergencyContactPhoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={emergencyContactPhone}
                        onChange={(e) => setEmergencyContactPhone(e.target.value)}
                        placeholder={ts.emergencyContactPhonePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {mode === 'emergency'
                  ? 'Priority intake bypasses non-essential details to guarantee rapid care.'
                  : 'A unique Patient ID (TMH-2026-XXX) will be assigned immediately.'}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all"
                >
                  {ts.cancel}
                </button>
                <button
                  type="submit"
                  disabled={duplicateMatches.length > 0 && !acknowledgedDuplicates}
                  className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 ${
                    mode === 'emergency'
                      ? 'bg-rose-600 hover:bg-rose-700 focus:ring-2 focus:ring-rose-500/20'
                      : 'bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:ring-sky-500/20'
                  } ${
                    duplicateMatches.length > 0 && !acknowledgedDuplicates
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {mode === 'emergency' ? (
                    <>
                      <AlertOctagon className="w-4 h-4" />
                      <span>{ts.submitEmergencyIntake}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{ts.submitRegistration}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </StaffLayout>
  );
};
