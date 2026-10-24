import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import { staffStore } from '../../services/staffStore';
import {
  User,
  Phone,
  HeartHandshake,
  CheckCircle2,
  Save,
} from 'lucide-react';

export const PatientProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const patient = patientStore.getCurrentPatient();

  const [phone, setPhone] = useState(patient?.contactNumber || '');
  const [email, setEmail] = useState(patient?.email || '');
  const [address, setAddress] = useState(patient?.address || '');
  const [emergName, setEmergName] = useState(patient?.emergencyContact.name || '');
  const [emergPhone, setEmergPhone] = useState(patient?.emergencyContact.phone || '');
  const [emergRel, setEmergRel] = useState(patient?.emergencyContact.relationship || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    staffStore.updatePatient(patient.id, {
      contactNumber: phone,
      email,
      address,
      emergencyContact: {
        name: emergName,
        phone: emergPhone,
        relationship: emergRel,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!patient) {
    return (
      <PatientLayout>
        <div className="p-12 text-center text-slate-400 text-xs">No profile available.</div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.profilePageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.profilePageSubtitle}</p>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Registered Identity (Read-Only) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-emerald-700" />
              <h2 className="font-extrabold text-slate-900 text-base">{tp.personalDetails}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {tp.fullName}
                </span>
                <p className="text-base font-extrabold text-slate-900">{patient.fullName}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {patient.id}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {tp.ageAndGender}
                </span>
                <p className="text-base font-extrabold text-slate-900">
                  {patient.age} years • {patient.gender}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Registered: {patient.registrationDate.split('T')[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Information (Editable) */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Phone className="w-5 h-5 text-emerald-700" />
              <h2 className="font-extrabold text-slate-900 text-base">{tp.contactDetails}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{tp.phone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{tp.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{tp.address}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Section 3: Emergency Contacts */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HeartHandshake className="w-5 h-5 text-rose-600" />
              <h2 className="font-extrabold text-slate-900 text-base">{tp.emergencyContact}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{tp.contactName}</label>
                <input
                  type="text"
                  value={emergName}
                  onChange={(e) => setEmergName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{tp.relationship}</label>
                <input
                  type="text"
                  value={emergRel}
                  onChange={(e) => setEmergRel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{tp.phone}</label>
                <input
                  type="tel"
                  value={emergPhone}
                  onChange={(e) => setEmergPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-300 text-xs text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{tp.saveProfileChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </PatientLayout>
  );
};
