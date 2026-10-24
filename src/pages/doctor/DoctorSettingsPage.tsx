import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { authService } from '../../services/auth';
import {
  User,
  Globe,
  Bell,
  LogOut,
} from 'lucide-react';

export const DoctorSettingsPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const td = t.doctorPortal;
  const navigate = useNavigate();

  const [alertSound, setAlertSound] = useState(true);
  const [criticalVitalsPush, setCriticalVitalsPush] = useState(true);

  const handleSignOut = () => {
    authService.clearSession();
    navigate('/login/doctor');
  };

  return (
    <DoctorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {td.settingsTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{td.settingsSubtitle}</p>
        </div>

        {/* Doctor Credential Profile */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-base">{td.doctorProfileSection}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Full Clinician Name
              </span>
              <p className="text-sm font-bold text-slate-900">{td.drName}</p>
            </div>

            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {td.clinicalSpecialty}
              </span>
              <p className="text-sm font-semibold text-slate-900">{td.drSpecialty}</p>
            </div>

            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {td.medicalLicense}
              </span>
              <p className="text-sm font-mono font-semibold text-blue-800">DMC-REG-2014-99204</p>
            </div>

            <div>
              <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {td.consultingHours}
              </span>
              <p className="text-sm font-semibold text-slate-900">
                Mon - Fri: 09:00 AM – 04:00 PM (OPD Block A)
              </p>
            </div>
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-base">Language Preference / भाषा प्राथमिकता</h2>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              English (EN)
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                language === 'hi'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              हिंदी (HI)
            </button>
          </div>
        </div>

        {/* Clinical Alarms & Telemetry Settings */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-900 text-base">
              Telemetry Alarm & Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">
                Audible chime on telemetry arrhythmia or SpO2 &lt; 90%
              </span>
              <input
                type="checkbox"
                checked={alertSound}
                onChange={(e) => setAlertSound(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">
                Immediate push notification on abnormal lab findings
              </span>
              <input
                type="checkbox"
                checked={criticalVitalsPush}
                onChange={(e) => setCriticalVitalsPush(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Sign Out Action */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>{td.signOut}</span>
          </button>
        </div>
      </div>
    </DoctorLayout>
  );
};
