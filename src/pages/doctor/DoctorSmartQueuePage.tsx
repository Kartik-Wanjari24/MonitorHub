import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { staffStore } from '../../services/staffStore';
import { doctorStore } from '../../services/doctorStore';
import type { QueueItem } from '../../types/staff';
import {
  AlertOctagon,
  Filter,
  CheckCircle2,
  PlayCircle,
  AlertTriangle,
} from 'lucide-react';

export const DoctorSmartQueuePage: React.FC = () => {
  const { t } = useLanguage();
  const td = t.doctorPortal;
  const navigate = useNavigate();

  const [queue, setQueue] = useState<QueueItem[]>(staffStore.getQueue());
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'critical' | 'urgent' | 'normal'>('all');
  const alerts = doctorStore.getAlerts();

  // Filtered queue with Emergency cases prioritized
  const filteredQueue = useMemo(() => {
    return queue.filter((item) => {
      if (priorityFilter === 'all') return true;
      return item.priority === priorityFilter;
    });
  }, [queue, priorityFilter]);

  const handleStartConsult = (item: QueueItem) => {
    staffStore.updateQueueStatus(item.id, 'In Consultation');
    setQueue(staffStore.getQueue());
    navigate(`/doctor/consultations?patientId=${item.patientId}`);
  };

  const handleMarkComplete = (item: QueueItem) => {
    staffStore.updateQueueStatus(item.id, 'Completed');
    setQueue(staffStore.getQueue());
  };

  return (
    <DoctorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {td.smartQueueTitle}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{td.smartQueueSubtitle}</p>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{td.emergencyTriageNotice}</span>
          </div>
        </div>

        {/* Triage Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase">Triage Filter:</span>
            {(['all', 'critical', 'urgent', 'normal'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setPriorityFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  priorityFilter === lvl
                    ? lvl === 'critical'
                      ? 'bg-rose-600 text-white'
                      : lvl === 'urgent'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl === 'all'
                  ? td.allTriageFilter
                  : lvl === 'critical'
                  ? td.criticalOnly
                  : lvl === 'urgent'
                  ? td.urgentOnly
                  : td.routineOnly}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {filteredQueue.length} patient(s) in queue
          </span>
        </div>

        {/* Smart Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 text-xs uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">{td.tokenNumber}</th>
                  <th className="py-3 px-4">{td.patientCol}</th>
                  <th className="py-3 px-4">{td.checkInTimeCol}</th>
                  <th className="py-3 px-4">{td.triagePriorityCol}</th>
                  <th className="py-3 px-4">{td.alertsCol}</th>
                  <th className="py-3 px-4 text-right">{td.actionsCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                      No patients in this category.
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((item) => {
                    const patientAlerts = alerts.filter(
                      (a) => a.patientId === item.patientId && !a.acknowledged
                    );

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          item.isEmergency ? 'bg-rose-50/30' : ''
                        }`}
                      >
                        {/* Token */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`w-9 h-9 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center border ${
                              item.isEmergency
                                ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                                : item.status === 'In Consultation'
                                ? 'bg-sky-600 text-white border-sky-700'
                                : 'bg-slate-100 text-slate-900 border-slate-300'
                            }`}
                          >
                            #{item.tokenNumber}
                          </span>
                        </td>

                        {/* Patient Details */}
                        <td className="py-3.5 px-4">
                          <Link
                            to={`/doctor/profiles?id=${item.patientId}`}
                            className="font-bold text-slate-900 hover:text-blue-600 text-sm block"
                          >
                            {item.patientName}
                          </Link>
                          <span className="text-xs text-blue-700 font-mono">{item.patientId}</span>
                        </td>

                        {/* Check-in Time */}
                        <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                          {item.checkInTime}
                        </td>

                        {/* Triage Priority */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                              item.priority === 'critical'
                                ? 'bg-rose-600 text-white animate-pulse'
                                : item.priority === 'urgent'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </td>

                        {/* Clinical Alerts */}
                        <td className="py-3.5 px-4">
                          {patientAlerts.length > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <AlertTriangle className="w-3 h-3" />
                              {patientAlerts.length} Active Alert(s)
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">Clear</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* One-Tap Profile Button */}
                            <Link
                              to={`/doctor/profiles?id=${item.patientId}`}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all shadow-2xs"
                            >
                              {td.openProfileBtn}
                            </Link>

                            {item.status === 'Waiting' && (
                              <button
                                type="button"
                                onClick={() => handleStartConsult(item)}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center gap-1"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span>{td.startConsultationBtn}</span>
                              </button>
                            )}

                            {item.status === 'In Consultation' && (
                              <button
                                type="button"
                                onClick={() => handleMarkComplete(item)}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{td.markCompletedBtn}</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};
