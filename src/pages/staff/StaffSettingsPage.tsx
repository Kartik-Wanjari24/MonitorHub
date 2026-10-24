import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { StaffLayout } from '../../layouts/StaffLayout';
import { staffStore } from '../../services/staffStore';
import { authService } from '../../services/auth';
import type { StaffRole } from '../../types/staff';
import {
  User,
  Shield,
  Globe,
  Bell,
  RotateCcw,
  LogOut,
  CheckCircle2,
  Building2,
} from 'lucide-react';

export const StaffSettingsPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const ts = t.staffPortal;
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState<StaffRole>(staffStore.getActiveRole());
  const [resetSuccess, setResetSuccess] = useState(false);

  // Preference switches
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifEmergencyAudio, setNotifEmergencyAudio] = useState(true);
  const [notifQueueWait, setNotifQueueWait] = useState(true);

  const handleRoleToggle = (role: StaffRole) => {
    setActiveRole(role);
    staffStore.setActiveRole(role);
  };

  const handleResetData = () => {
    if (window.confirm(ts.resetDemoConfirm)) {
      staffStore.resetAllDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const handleSignOut = () => {
    authService.clearSession();
    navigate('/login/staff');
  };

  return (
    <StaffLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ts.settingsTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{ts.settingsSubtitle}</p>
        </div>

        {resetSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Prototype demo data has been reset to default state.</span>
          </div>
        )}

        {/* Section 1: Staff Profile & Designation */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-sky-600" />
            <h2 className="font-bold text-slate-900 text-base">{ts.profileSection}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {ts.staffName}
              </label>
              <p className="text-sm font-bold text-slate-900">
                {activeRole === 'compounder' ? 'Amit Gupta' : 'Neha Pawar'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {ts.staffEmail}
              </label>
              <p className="text-sm font-semibold text-slate-900">staff@demo.com</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {ts.assignedHospital}
              </label>
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                Trails Apollo Memorial Hospital (Delhi NCR)
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {ts.staffRoleLabel}
              </label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => handleRoleToggle('receptionist')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    activeRole === 'receptionist'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ts.roleReceptionist}
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleToggle('compounder')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    activeRole === 'compounder'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ts.roleCompounder}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Role Permissions Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-base">{ts.rolePermissionsTitle}</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div
              className={`p-3.5 rounded-xl border ${
                activeRole === 'receptionist'
                  ? 'bg-sky-50/70 border-sky-300'
                  : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">
                  Receptionist Role Permissions
                </span>
                {activeRole === 'receptionist' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white">
                    Currently Active
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">{ts.receptionistPerms}</p>
            </div>

            <div
              className={`p-3.5 rounded-xl border ${
                activeRole === 'compounder'
                  ? 'bg-sky-50/70 border-sky-300'
                  : 'bg-slate-50 border-slate-200/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm">
                  Compounder / Triage Nurse Role Permissions
                </span>
                {activeRole === 'compounder' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-600 text-white">
                    Currently Active
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed">{ts.compounderPerms}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Interface Language */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-900 text-base">{ts.languageSection}</h2>
          </div>
          <p className="text-xs text-slate-500">{ts.languageDesc}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                language === 'en'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
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
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              हिंदी (HI)
            </button>
          </div>
        </div>

        {/* Section 4: Notification Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-slate-900 text-base">{ts.notificationsSection}</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">{ts.notifEmailAlerts}</span>
              <input
                type="checkbox"
                checked={notifEmail}
                onChange={(e) => setNotifEmail(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">{ts.notifEmergencyAlerts}</span>
              <input
                type="checkbox"
                checked={notifEmergencyAudio}
                onChange={(e) => setNotifEmergencyAudio(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">{ts.notifQueueAlerts}</span>
              <input
                type="checkbox"
                checked={notifQueueWait}
                onChange={(e) => setNotifQueueWait(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
            </label>
          </div>
        </div>

        {/* Section 5: Demo Data Reset & Sign Out */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <RotateCcw className="w-5 h-5 text-slate-600" />
            <h2 className="font-bold text-slate-900 text-base">Development Prototype Actions</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-xs font-bold text-slate-900">{ts.resetDemoDataBtn}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{ts.resetDemoDataDesc}</p>
            </div>
            <button
              type="button"
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all shrink-0"
            >
              {ts.resetDemoDataBtn}
            </button>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>{ts.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};
