import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import type { VitalsReading } from '../../types/doctor';
import {
  Activity,
  Heart,
  Wind,
  Thermometer,
  Gauge,
  Radio,
  AlertTriangle,
} from 'lucide-react';

interface VitalsMonitoringPanelProps {
  vitals: VitalsReading;
  patientName?: string;
}

export const VitalsMonitoringPanel: React.FC<VitalsMonitoringPanelProps> = ({
  vitals,
}) => {
  const { t } = useLanguage();
  const td = t.doctorPortal;

  // Real-time animation simulation for the ECG rhythm strip
  const [waveformOffset, setWaveformOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformOffset((prev) => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Prominent Simulated Vitals Prototype Disclaimer */}
      <div className="rounded-xl p-3.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 mr-2">
              {td.simulatedVitalsBadge}
            </span>
            <span>{td.simulatedDisclaimer}</span>
          </div>
        </div>
        <span className="text-[10px] text-amber-800 font-mono hidden sm:inline">
          Port: ACM-01
        </span>
      </div>

      {/* Real-time ECG Rhythm Strip Monitor Card */}
      <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 text-emerald-400 font-mono shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-100">{td.ecgStripTitle}</span>
            <span className="text-[10px] text-emerald-500 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              LIVE 25mm/s • 10mm/mV
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Lead II</span>
            <span>HR: <strong className="text-emerald-400 text-sm">{vitals.heartRate.value}</strong> bpm</span>
          </div>
        </div>

        {/* Dynamic ECG Waveform Canvas / SVG */}
        <div className="py-4 relative h-28 overflow-hidden flex items-center">
          {/* Medical Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b25_1px,transparent_1px),linear-gradient(to_bottom,#064e3b25_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Scrolling ECG Line */}
          <svg className="w-full h-24 relative z-10" preserveAspectRatio="none" viewBox="0 0 500 100">
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={`
                0,50 40,50 45,46 50,54 55,50
                70,50 78,50 82,20 86,90 90,40 94,56 98,50
                115,44 130,50 170,50
                175,46 180,54 185,50
                200,50 208,50 212,18 216,92 220,38 224,56 228,50
                245,44 260,50 300,50
                305,46 310,54 315,50
                330,50 338,50 342,20 346,90 350,40 354,56 358,50
                375,44 390,50 430,50
                435,46 440,54 445,50
                460,50 468,50 472,18 476,92 480,38 484,56 488,50 500,50
              `}
              style={{
                transform: `translateX(-${waveformOffset * 1.5}px)`,
                transition: 'transform 0.15s linear',
              }}
            />
          </svg>

          {/* Sweeping Phosphor Line */}
          <div
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent pointer-events-none"
            style={{
              left: `${(waveformOffset * 3) % 100}%`,
              transition: 'left 0.15s linear',
            }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] text-slate-500">
          <span>Source: {vitals.heartRate.source}</span>
          <span>Sample Time: {vitals.heartRate.timestamp}</span>
        </div>
      </div>

      {/* 5 Multi-Parameter Vital Tile Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* 1. Heart Rate */}
        <div
          className={`rounded-2xl p-4 border transition-all ${
            vitals.heartRate.status === 'elevated' || vitals.heartRate.status === 'critical'
              ? 'bg-rose-50/80 border-rose-300'
              : 'bg-white border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {td.heartRateLabel}
            </span>
            <Heart
              className={`w-4 h-4 ${
                vitals.heartRate.status === 'elevated' ? 'text-rose-600 animate-ping' : 'text-rose-500'
              }`}
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">{vitals.heartRate.value}</span>
            <span className="text-xs font-semibold text-slate-500">{td.bpm}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              vitals.heartRate.status === 'normal'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {vitals.heartRate.status}
          </span>
        </div>

        {/* 2. SpO2 */}
        <div
          className={`rounded-2xl p-4 border transition-all ${
            vitals.spo2.status === 'low' || vitals.spo2.status === 'critical'
              ? 'bg-amber-50/80 border-amber-300'
              : 'bg-white border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {td.spo2Label}
            </span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">{vitals.spo2.value}</span>
            <span className="text-xs font-semibold text-slate-500">{td.percent}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              vitals.spo2.status === 'normal'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {vitals.spo2.status}
          </span>
        </div>

        {/* 3. Blood Pressure */}
        <div
          className={`rounded-2xl p-4 border transition-all ${
            vitals.bloodPressure.status !== 'normal'
              ? 'bg-indigo-50/70 border-indigo-300'
              : 'bg-white border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {td.bloodPressureLabel}
            </span>
            <Gauge className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900">
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </span>
            <span className="text-[10px] font-semibold text-slate-500">{td.mmhg}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              vitals.bloodPressure.status === 'normal'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-indigo-100 text-indigo-800'
            }`}
          >
            {vitals.bloodPressure.status}
          </span>
        </div>

        {/* 4. Respiratory Rate */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {td.respiratoryRateLabel}
            </span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">
              {vitals.respiratoryRate.value}
            </span>
            <span className="text-xs font-semibold text-slate-500">{td.breathsMin}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              vitals.respiratoryRate.status === 'normal'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {vitals.respiratoryRate.status}
          </span>
        </div>

        {/* 5. Temperature */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {td.temperatureLabel}
            </span>
            <Thermometer className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">
              {vitals.temperature.value}
            </span>
            <span className="text-xs font-semibold text-slate-500">{td.farenheit}</span>
          </div>
          <span
            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              vitals.temperature.status === 'normal'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {vitals.temperature.status}
          </span>
        </div>
      </div>
    </div>
  );
};
