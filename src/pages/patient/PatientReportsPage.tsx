import React from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Download,
  Clock,
  FileCheck2,
} from 'lucide-react';

export const PatientReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const reports = patientStore.getTestReports();
  const availableReports = reports.filter((r) => r.status === 'Completed');
  const pendingReports = reports.filter((r) => r.status !== 'Completed');

  const handleDownload = (testName: string) => {
    alert(`Downloading verified diagnostic PDF report for: ${testName} (Demo Document)`);
  };

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.reportsPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.reportsPageSubtitle}</p>
        </div>

        {/* Section 1: Completed Available Reports */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">
            {tp.availableReportsTitle} ({availableReports.length})
          </h2>

          <div className="space-y-3">
            {availableReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base">{report.testName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                        {report.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-mono font-medium">
                      Result: {report.resultSummary}
                    </p>

                    {report.doctorComments && (
                      <p className="text-xs text-emerald-800 italic">
                        "{report.doctorComments}"
                      </p>
                    )}

                    <p className="text-[11px] text-slate-400 pt-1">
                      Completed: {report.completedDate} • Ordered: {report.orderedDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(report.testName)}
                  className="px-4 py-2 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-end sm:self-center shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{tp.downloadReportBtn}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Pending Test Orders */}
        {pendingReports.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-base font-extrabold text-slate-900">
              {tp.pendingReportsTitle} ({pendingReports.length})
            </h2>

            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-amber-50/60 rounded-3xl border border-amber-200 p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 animate-spin" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{report.testName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-amber-900">{report.resultSummary}</p>
                    <p className="text-[11px] text-slate-500">{tp.pendingNotice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};
