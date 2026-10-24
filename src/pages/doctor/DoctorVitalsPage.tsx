import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorStore } from '../../services/doctorStore';
import { VitalsMonitoringPanel } from '../../components/doctor/VitalsMonitoringPanel';

export const DoctorVitalsPage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;
  const [searchParams] = useSearchParams();

  const patients = doctorStore.getAllDoctorPatients();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    searchParams.get('id') || patients[0]?.id || ''
  );

  const patient = doctorStore.getDoctorPatient(selectedPatientId);

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {td.vitalsTitle}
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">{td.vitalsSubtitle}</p>
          </div>

          {/* Quick Patient Switcher */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-500">Patient:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="text-xs font-semibold text-slate-900 bg-transparent focus:outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName} ({p.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {patient ? (
          <VitalsMonitoringPanel vitals={patient.vitals} patientName={patient.fullName} />
        ) : (
          <div className="p-12 text-center text-slate-400">No patient selected.</div>
        )}
      </div>
    </DoctorLayout>
  );
};
