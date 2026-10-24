import React, { useState, useRef } from 'react';
import { useLanguage } from '../../i18n/useLanguage';
import { doctorStore } from '../../services/doctorStore';
import type { OrganType, OrganFinding } from '../../types/doctor';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Heart,
  Wind,
  Shield,
  Activity,
  PlusCircle,
  FileText,
  History,
  X,
  Sparkles,
} from 'lucide-react';

interface Interactive3DHumanBodyProps {
  patientId: string;
  onSelectOrgan?: (organ: OrganType) => void;
  selectedOrgan?: OrganType;
}

export const Interactive3DHumanBody: React.FC<Interactive3DHumanBodyProps> = ({
  patientId,
  onSelectOrgan,
  selectedOrgan: controlledOrgan,
}) => {
  const { t } = useLanguage();
  const td = t.doctorPortal;

  // Viewport transformations (3D simulation)
  const [rotationY, setRotationY] = useState(0); // degrees
  const [rotationX, setRotationX] = useState(0); // degrees
  const [zoom, setZoom] = useState(1); // 0.8 to 1.6
  const [internalSelectedOrgan, setInternalSelectedOrgan] = useState<OrganType>('heart');
  const activeOrgan = controlledOrgan || internalSelectedOrgan;

  const isDragging = useRef(false);
  const startMousePos = useRef({ x: 0, y: 0 });

  // Add / Amend Organ Finding Modals
  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);
  const [findingTitle, setFindingTitle] = useState('');
  const [clinicalNote, setClinicalNote] = useState('');
  const [relatedReport, setRelatedReport] = useState('');

  // Amend State
  const [amendingFinding, setAmendingFinding] = useState<OrganFinding | null>(null);
  const [amendedNote, setAmendedNote] = useState('');
  const [amendReason, setAmendReason] = useState('');

  const patient = doctorStore.getDoctorPatient(patientId);
  const organFindings = (patient?.organFindings || []).filter((f) => f.organ === activeOrgan);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startMousePos.current.x;
    const deltaY = e.clientY - startMousePos.current.y;
    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-25, Math.min(25, prev - deltaY * 0.3)));
    startMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleResetView = () => {
    setRotationY(0);
    setRotationX(0);
    setZoom(1);
  };

  const handleOrganClick = (organ: OrganType) => {
    setInternalSelectedOrgan(organ);
    if (onSelectOrgan) onSelectOrgan(organ);
  };

  const handleSaveFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!findingTitle.trim() || !clinicalNote.trim()) return;

    doctorStore.addOrganFinding({
      organ: activeOrgan,
      patientId,
      doctorName: 'Dr. Aarav Sharma',
      observationDate: new Date().toISOString().split('T')[0],
      title: findingTitle.trim(),
      clinicalNote: clinicalNote.trim(),
      relatedReport: relatedReport.trim() || undefined,
    });

    setFindingTitle('');
    setClinicalNote('');
    setRelatedReport('');
    setIsAddFindingOpen(false);
  };

  const handleSaveAmendment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amendingFinding || !amendedNote.trim() || !amendReason.trim()) return;

    doctorStore.amendOrganFinding(
      amendingFinding.id,
      amendedNote.trim(),
      'Dr. Aarav Sharma',
      amendReason.trim()
    );

    setAmendingFinding(null);
    setAmendedNote('');
    setAmendReason('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
      {/* 3D Model Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="font-bold text-sm tracking-wide">{td.interactive3DTitle}</h3>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">{td.rotateInstructions}</p>
        </div>

        {/* Viewport Control Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title={td.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title={td.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            title={td.resetView}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{td.resetView}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas / Anatomical Interactive Surface */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
        {/* Left Side: 3D Body Surface (7 cols) */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="md:col-span-7 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-6 select-none cursor-grab active:cursor-grabbing border-b md:border-b-0 md:border-r border-slate-800"
        >
          {/* Subtle Grid & Medical Crosshairs */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Perspective 3D Container with CSS 3D Transforms */}
          <div
            className="relative transition-transform duration-75 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${zoom})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* SVG Anatomical Human Silhouette */}
            <div className="relative w-48 h-96 flex items-center justify-center">
              <svg
                viewBox="0 0 200 400"
                className="w-full h-full drop-shadow-[0_10px_25px_rgba(37,99,235,0.25)]"
              >
                {/* Body Outline Gradient Definition */}
                <defs>
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Head */}
                <ellipse cx="100" cy="40" rx="22" ry="26" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="1.5" />
                {/* Neck */}
                <rect x="92" y="64" width="16" height="14" fill="url(#bodyGrad)" />
                {/* Torso & Pelvis */}
                <path
                  d="M65 78 C75 75, 125 75, 135 78 L142 165 C135 195, 125 215, 120 230 L80 230 C75 215, 65 195, 58 165 Z"
                  fill="url(#bodyGrad)"
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                {/* Shoulders & Arms */}
                <path d="M65 78 L38 180 L44 240 L34 240 L28 175 L56 80 Z" fill="url(#bodyGrad)" opacity="0.8" />
                <path d="M135 78 L162 180 L156 240 L166 240 L172 175 L144 80 Z" fill="url(#bodyGrad)" opacity="0.8" />
                {/* Legs */}
                <path d="M82 230 L76 340 L88 340 L96 230 Z" fill="url(#bodyGrad)" opacity="0.7" />
                <path d="M118 230 L124 340 L112 340 L104 230 Z" fill="url(#bodyGrad)" opacity="0.7" />

                {/* 1. Lungs (Thoracic Cavity) */}
                <g
                  onClick={() => handleOrganClick('lungs')}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <path
                    d="M74 95 C72 115, 78 135, 90 138 C94 135, 93 105, 86 94 Z"
                    fill={activeOrgan === 'lungs' ? '#38bdf8' : '#0284c7'}
                    opacity={activeOrgan === 'lungs' ? '0.95' : '0.65'}
                    filter={activeOrgan === 'lungs' ? 'url(#glow)' : undefined}
                    stroke="#e0f2fe"
                    strokeWidth={activeOrgan === 'lungs' ? '2' : '0.5'}
                  />
                  <path
                    d="M126 95 C128 115, 122 135, 110 138 C106 135, 107 105, 114 94 Z"
                    fill={activeOrgan === 'lungs' ? '#38bdf8' : '#0284c7'}
                    opacity={activeOrgan === 'lungs' ? '0.95' : '0.65'}
                    filter={activeOrgan === 'lungs' ? 'url(#glow)' : undefined}
                    stroke="#e0f2fe"
                    strokeWidth={activeOrgan === 'lungs' ? '2' : '0.5'}
                  />
                </g>

                {/* 2. Heart (Center-Left Mediastinum) */}
                <g
                  onClick={() => handleOrganClick('heart')}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <circle
                    cx="98"
                    cy="114"
                    r="12"
                    fill={activeOrgan === 'heart' ? '#f43f5e' : '#e11d48'}
                    opacity={activeOrgan === 'heart' ? '1' : '0.8'}
                    filter={activeOrgan === 'heart' ? 'url(#glow)' : undefined}
                    stroke="#ffe4e6"
                    strokeWidth={activeOrgan === 'heart' ? '2.5' : '1'}
                    className={activeOrgan === 'heart' ? 'animate-pulse' : ''}
                  />
                </g>

                {/* 3. Liver (Right Upper Quadrant) */}
                <g
                  onClick={() => handleOrganClick('liver')}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <path
                    d="M80 144 C85 140, 115 142, 118 152 C116 162, 90 164, 80 156 Z"
                    fill={activeOrgan === 'liver' ? '#f59e0b' : '#d97706'}
                    opacity={activeOrgan === 'liver' ? '0.95' : '0.65'}
                    filter={activeOrgan === 'liver' ? 'url(#glow)' : undefined}
                    stroke="#fef3c7"
                    strokeWidth={activeOrgan === 'liver' ? '2' : '0.5'}
                  />
                </g>

                {/* 4. Kidneys (Bilateral Retroperitoneal) */}
                <g
                  onClick={() => handleOrganClick('kidneys')}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <ellipse
                    cx="84"
                    cy="176"
                    rx="6"
                    ry="9"
                    fill={activeOrgan === 'kidneys' ? '#a855f7' : '#7e22ce'}
                    opacity={activeOrgan === 'kidneys' ? '0.95' : '0.65'}
                    filter={activeOrgan === 'kidneys' ? 'url(#glow)' : undefined}
                    stroke="#f3e8ff"
                    strokeWidth={activeOrgan === 'kidneys' ? '2' : '0.5'}
                  />
                  <ellipse
                    cx="116"
                    cy="176"
                    rx="6"
                    ry="9"
                    fill={activeOrgan === 'kidneys' ? '#a855f7' : '#7e22ce'}
                    opacity={activeOrgan === 'kidneys' ? '0.95' : '0.65'}
                    filter={activeOrgan === 'kidneys' ? 'url(#glow)' : undefined}
                    stroke="#f3e8ff"
                    strokeWidth={activeOrgan === 'kidneys' ? '2' : '0.5'}
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Organ Quick Click Ribbon */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 z-10">
            {[
              { id: 'heart', label: td.organHeart, icon: Heart, color: 'text-rose-400' },
              { id: 'lungs', label: td.organLungs, icon: Wind, color: 'text-sky-400' },
              { id: 'liver', label: td.organLiver, icon: Shield, color: 'text-amber-400' },
              { id: 'kidneys', label: td.organKidneys, icon: Activity, color: 'text-purple-400' },
            ].map((org) => {
              const Icon = org.icon;
              const isSel = activeOrgan === org.id;
              return (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => handleOrganClick(org.id as OrganType)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSel
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${org.color}`} />
                  <span>{org.label.split('/')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Organ Findings & Clinical Records Panel (5 cols) */}
        <div className="md:col-span-5 p-5 bg-white flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header of Active Organ */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    activeOrgan === 'heart'
                      ? 'bg-rose-500'
                      : activeOrgan === 'lungs'
                      ? 'bg-sky-500'
                      : activeOrgan === 'liver'
                      ? 'bg-amber-500'
                      : 'bg-purple-500'
                  }`}
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {activeOrgan === 'heart'
                      ? td.organHeart
                      : activeOrgan === 'lungs'
                      ? td.organLungs
                      : activeOrgan === 'liver'
                      ? td.organLiver
                      : td.organKidneys}
                  </h4>
                  <p className="text-[11px] text-slate-500">Patient: {patient?.fullName}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddFindingOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{td.addOrganFindingBtn}</span>
              </button>
            </div>

            {/* Findings List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {organFindings.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>{td.noOrganFindings}</p>
                </div>
              ) : (
                organFindings.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-bold text-slate-900 text-xs">{finding.title}</h5>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {finding.observationDate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {finding.clinicalNote}
                    </p>

                    {finding.relatedReport && (
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-[11px] text-blue-900 font-medium">
                        Report: {finding.relatedReport}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <span>By {finding.doctorName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAmendingFinding(finding);
                          setAmendedNote(finding.clinicalNote);
                          setAmendReason('');
                        }}
                        className="font-bold text-blue-600 hover:text-blue-800"
                      >
                        {td.amendFindingBtn}
                      </button>
                    </div>

                    {/* Audit History Timeline */}
                    {finding.auditHistory.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-dashed border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                          <History className="w-3 h-3 text-amber-600" />
                          {td.auditHistoryTitle} ({finding.auditHistory.length})
                        </span>
                        {finding.auditHistory.map((audit, i) => (
                          <div key={i} className="text-[10px] text-slate-600 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                            <p className="font-semibold text-amber-950">
                              Amended by {audit.amendedBy} on {audit.amendedAt}
                            </p>
                            <p className="text-slate-500 italic mt-0.5">Reason: "{audit.reason}"</p>
                            <p className="text-slate-400 mt-0.5 line-through">Prev: "{audit.previousNote}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Add Organ Finding */}
      {isAddFindingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {td.addOrganFindingBtn}: {activeOrgan.toUpperCase()}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddFindingOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFinding} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {td.findingTitleLabel}
                </label>
                <input
                  type="text"
                  value={findingTitle}
                  onChange={(e) => setFindingTitle(e.target.value)}
                  placeholder="e.g. Concentric LV Hypertrophy"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {td.clinicalNoteLabel}
                </label>
                <textarea
                  rows={3}
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                  placeholder="Describe auscultation, ultrasound/imaging or functional assessment..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {td.relatedReportLabel}
                </label>
                <input
                  type="text"
                  value={relatedReport}
                  onChange={(e) => setRelatedReport(e.target.value)}
                  placeholder="e.g. 2D Echo or Chest CT #771"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFindingOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                >
                  Save Finding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Amend Finding (with Audit Logging) */}
      {amendingFinding && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                {td.amendFindingBtn}: {amendingFinding.title}
              </h3>
              <button
                type="button"
                onClick={() => setAmendingFinding(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Medical records cannot be overwritten silently. Any correction preserves the original text and records your clinical reason in the audit trail.
            </p>

            <form onSubmit={handleSaveAmendment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Corrected Clinical Note *
                </label>
                <textarea
                  rows={3}
                  value={amendedNote}
                  onChange={(e) => setAmendedNote(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-900 mb-1">
                  {td.amendReasonLabel}
                </label>
                <input
                  type="text"
                  value={amendReason}
                  onChange={(e) => setAmendReason(e.target.value)}
                  placeholder="e.g. Corrected preliminary reading following senior radiologist re-review"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-rose-300 bg-rose-50/30 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAmendingFinding(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                >
                  Confirm & Audit Log Amendment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
