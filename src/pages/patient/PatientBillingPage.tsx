import React, { useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { PatientLayout } from '../../layouts/PatientLayout';
import { patientStore } from '../../services/patientStore';
import {
  Receipt,
  FileText,
  Download,
  AlertTriangle,
} from 'lucide-react';

export const PatientBillingPage: React.FC = () => {
  const { t } = useLanguage();
  const tp = t.patientPortal;

  const [activeTab, setActiveTab] = useState<'bills' | 'discharge'>('bills');
  const bills = patientStore.getBills();
  const discharge = patientStore.getDischargeSummary();

  const handleDownloadInvoice = (invNum: string) => {
    alert(`Downloading receipt for ${invNum} (Demonstration Document)`);
  };

  const handleDownloadDischarge = () => {
    alert('Downloading Discharge Summary PDF (Demonstration Document)');
  };

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {tp.billingPageTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{tp.billingPageSubtitle}</p>
        </div>

        {/* Prototype Billing Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-950 mr-2">
              Demonstration Records
            </span>
            <span>{tp.demoBillingNotice}</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-3xl p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('bills')}
            className={`flex-1 py-3 text-xs font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'bills'
                ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>{tp.tabBills}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discharge')}
            className={`flex-1 py-3 text-xs font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'discharge'
                ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{tp.tabDischarge}</span>
          </button>
        </div>

        {/* Tab 1: Invoices and Bills */}
        {activeTab === 'bills' && (
          <div className="bg-white rounded-b-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="space-y-4">
              {bills.map((bill) => (
                <div
                  key={bill.id}
                  className="p-5 rounded-3xl border border-slate-200 bg-slate-50/70 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        {tp.invoiceNumber}
                      </span>
                      <p className="text-base font-extrabold text-slate-900">{bill.invoiceNumber}</p>
                      <p className="text-xs text-slate-500">
                        Date: {bill.date} • {bill.department}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          bill.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {bill.paymentStatus === 'Paid' ? tp.statusPaid : tp.statusPending}
                      </span>
                      <p className="text-xl font-black text-slate-900 mt-1">
                        ₹{bill.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-1.5 text-xs">
                    {bill.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-slate-700">
                        <span>• {item.description}</span>
                        <span className="font-mono font-bold">₹{item.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(bill.invoiceNumber)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-800 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Receipt (PDF)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Discharge Summary */}
        {activeTab === 'discharge' && (
          <div className="bg-white rounded-b-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Official Medical Summary
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Discharge Summary Document
                </h3>
                <p className="text-xs text-slate-500">
                  {tp.dischargeDate}: <strong>{discharge.dischargeDate}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadDischarge}
                className="px-4 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Summary</span>
              </button>
            </div>

            {/* Structured Discharge Details */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  {tp.finalDiagnosis}
                </span>
                <p className="text-sm font-extrabold text-slate-900">{discharge.finalDiagnosis}</p>
                <p className="text-slate-500 mt-0.5">
                  Consultant: {discharge.treatingConsultant}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  Summary of Inpatient Stay
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {discharge.summaryOfHospitalStay}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                  {tp.dischargeMedications}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 font-medium">
                  {discharge.dischargeMedications.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block mb-1">
                  {tp.followUpPlan}
                </span>
                <p className="text-emerald-950 font-medium">{discharge.followUpPlan}</p>
                <p className="text-slate-600 mt-1">{discharge.dietaryAndActivityAdvice}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
                <span className="font-bold text-rose-900 uppercase text-[10px] block mb-1">
                  {tp.emergencyWarnings}
                </span>
                <p className="text-rose-950 font-medium leading-relaxed">
                  {discharge.emergencyContactInstructions}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};
