import React, { useState } from 'react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { runIntegrationVerification, type TestResult } from '../../services/integrationVerification';
import {
  CheckCircle2,
  XCircle,
  Play,
  Server,
} from 'lucide-react';

export const IntegrationTestingPage: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>(() => runIntegrationVerification());

  const handleRunTests = () => {
    setResults(runIntegrationVerification());
  };

  const totalTests = results.length;
  const passedTests = results.filter((r) => r.passed).length;
  const failedTests = totalTests - passedTests;

  // Group by suite
  const suites = Array.from(new Set(results.map((r) => r.suite)));

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                Phase 6 Integration
              </span>
              <span className="text-xs text-slate-400">All Portals Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Cross-Portal Integration & Verification Suite
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              End-to-end verification covering Authentication, Registration-to-Consultation, Health Diary synchronization, and Assistance alerts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunTests}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Re-run Full Test Suite</span>
          </button>
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Tests</span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalTests}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-xs">
            <span className="text-xs font-bold text-emerald-700 uppercase">Passed</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">{passedTests}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase">Failed</span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">{failedTests}</p>
          </div>
        </div>

        {/* Test Suites Breakdown */}
        <div className="space-y-6">
          {suites.map((suiteName) => {
            const suiteResults = results.filter((r) => r.suite === suiteName);
            const suitePassed = suiteResults.every((r) => r.passed);

            return (
              <div
                key={suiteName}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
              >
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-500" />
                    <h2 className="font-extrabold text-slate-900 text-sm">{suiteName}</h2>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      suitePassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {suitePassed ? 'All Passing' : 'Issues Detected'}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {suiteResults.map((test, idx) => (
                    <div
                      key={idx}
                      className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {test.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-bold text-slate-900 text-xs sm:text-sm">
                            {test.name}
                          </p>
                          {test.message && (
                            <p className="text-xs text-rose-600 mt-0.5">{test.message}</p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          test.passed
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {test.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
};
