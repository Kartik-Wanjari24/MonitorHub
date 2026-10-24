import type {
  DoctorExtendedPatient,
  OrganFinding,
  ConsultationRecord,
  ClinicalAlert,
  PatientHandoverNote,
} from '../types/doctor';
import { staffStore } from './staffStore';
import {
  INITIAL_EXTENDED_PATIENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_CLINICAL_ALERTS,
  INITIAL_HANDOVERS,
} from './mockDoctorData';

const DOCTOR_KEYS = {
  CONSULTATIONS: 'trails_doctor_consultations',
  ORGAN_FINDINGS: 'trails_doctor_organ_findings',
  ALERTS: 'trails_doctor_alerts',
  HANDOVERS: 'trails_doctor_handovers',
};

function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // LocalStorage quota or unavailable
  }
}

export const doctorStore = {
  // Get patient merged with doctor-extended data (vitals, organ findings, health diary)
  getDoctorPatient(id: string): DoctorExtendedPatient | null {
    const basePatient = staffStore.getPatientById(id);
    if (!basePatient) return null;

    const ext = INITIAL_EXTENDED_PATIENTS[id] || {};
    const storedFindings = this.getOrganFindings().filter((f) => f.patientId === id);

    const defaultVitals = {
      ecgWaveform: [0, 1, 0, 0, 12, -4, 0, 2, 3, 0, 0, 1, 0, 0, 12, -4, 0, 2, 3, 0],
      heartRate: {
        value: 74,
        unit: 'bpm',
        timestamp: 'Just now',
        status: 'normal' as const,
        source: 'Simulated Bedside Monitor',
      },
      spo2: {
        value: 98,
        unit: '%',
        timestamp: 'Just now',
        status: 'normal' as const,
        source: 'Simulated Pulse Oximeter',
      },
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
        unit: 'mmHg',
        timestamp: 'Just now',
        status: 'normal' as const,
        source: 'Simulated NIBP Cuff',
      },
      respiratoryRate: {
        value: 16,
        unit: 'breaths/min',
        timestamp: 'Just now',
        status: 'normal' as const,
        source: 'Simulated Capnography',
      },
      temperature: {
        value: 98.6,
        unit: '°F',
        timestamp: 'Just now',
        status: 'normal' as const,
        source: 'Simulated Skin Probe',
      },
      isSimulated: true,
    };

    return {
      ...basePatient,
      admissionStatus: ext.admissionStatus || 'Outpatient',
      bedNumber: ext.bedNumber,
      vitals: ext.vitals || defaultVitals,
      organFindings: storedFindings.length > 0 ? storedFindings : (ext.organFindings || []),
      healthDiary: ext.healthDiary || [],
    };
  },

  getAllDoctorPatients(): DoctorExtendedPatient[] {
    const all = staffStore.getPatients();
    return all.map((p) => this.getDoctorPatient(p.id)!).filter(Boolean);
  },

  // --- Organ Findings ---
  getOrganFindings(): OrganFinding[] {
    const initialFindings = Object.values(INITIAL_EXTENDED_PATIENTS).flatMap(
      (e) => e.organFindings || []
    );
    return getFromStorage<OrganFinding[]>(DOCTOR_KEYS.ORGAN_FINDINGS, initialFindings);
  },

  addOrganFinding(finding: Omit<OrganFinding, 'id' | 'timestamp' | 'auditHistory'>): OrganFinding {
    const findings = this.getOrganFindings();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newFinding: OrganFinding = {
      ...finding,
      id: `OF-${Date.now().toString().slice(-4)}`,
      timestamp,
      auditHistory: [],
    };

    const updated = [newFinding, ...findings];
    setToStorage(DOCTOR_KEYS.ORGAN_FINDINGS, updated);
    return newFinding;
  },

  amendOrganFinding(
    id: string,
    newNote: string,
    amendedBy: string,
    reason: string
  ): OrganFinding | null {
    const findings = this.getOrganFindings();
    const idx = findings.findIndex((f) => f.id === id);
    if (idx === -1) return null;

    const existing = findings[idx];
    const now = new Date();
    const amendedAt = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updatedFinding: OrganFinding = {
      ...existing,
      clinicalNote: newNote,
      isAmended: true,
      auditHistory: [
        ...existing.auditHistory,
        {
          amendedAt,
          amendedBy,
          previousNote: existing.clinicalNote,
          reason,
        },
      ],
    };

    findings[idx] = updatedFinding;
    setToStorage(DOCTOR_KEYS.ORGAN_FINDINGS, findings);
    return updatedFinding;
  },

  // --- Consultations ---
  getConsultations(): ConsultationRecord[] {
    return getFromStorage<ConsultationRecord[]>(DOCTOR_KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS);
  },

  saveConsultation(
    record: Omit<ConsultationRecord, 'id' | 'timestamp'> & { id?: string }
  ): ConsultationRecord {
    const consultations = this.getConsultations();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const id = record.id || `CNS-${Date.now().toString().slice(-4)}`;

    const newRecord: ConsultationRecord = {
      ...record,
      id,
      timestamp,
    };

    const existingIndex = consultations.findIndex((c) => c.id === id);
    let updated: ConsultationRecord[];
    if (existingIndex >= 0) {
      consultations[existingIndex] = newRecord;
      updated = [...consultations];
    } else {
      updated = [newRecord, ...consultations];
    }

    setToStorage(DOCTOR_KEYS.CONSULTATIONS, updated);

    // If finalized, append doctor's note and prescriptions back to core patient record
    if (newRecord.status === 'Finalized') {
      const patient = staffStore.getPatientById(newRecord.patientId);
      if (patient) {
        staffStore.updatePatient(patient.id, {
          diagnoses: [
            {
              condition: newRecord.diagnosis,
              diagnosedDate: newRecord.consultationDate,
              doctorName: newRecord.doctorName,
              notes: newRecord.clinicalExamination,
            },
            ...patient.diagnoses,
          ],
          prescriptions: [
            ...newRecord.prescriptions.map((rx, i) => ({
              id: `RX-${Date.now().toString().slice(-3)}-${i}`,
              medicineName: rx.medicine,
              dosage: rx.dosage,
              frequency: rx.frequency,
              prescribedDate: newRecord.consultationDate,
              doctorName: newRecord.doctorName,
            })),
            ...patient.prescriptions,
          ],
          doctorNotes: [
            {
              id: `DN-${Date.now().toString().slice(-4)}`,
              date: newRecord.consultationDate,
              doctorName: newRecord.doctorName,
              note: `Consultation (${newRecord.chiefComplaint}): ${newRecord.diagnosis}. Instructions: ${newRecord.followUpInstructions}`,
            },
            ...patient.doctorNotes,
          ],
        });
      }
    }

    return newRecord;
  },

  // --- Clinical Alerts ---
  getAlerts(): ClinicalAlert[] {
    return getFromStorage<ClinicalAlert[]>(DOCTOR_KEYS.ALERTS, INITIAL_CLINICAL_ALERTS);
  },

  acknowledgeAlert(id: string): void {
    const alerts = this.getAlerts();
    const updated = alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a));
    setToStorage(DOCTOR_KEYS.ALERTS, updated);
  },

  // --- Patient Handovers ---
  getHandovers(): PatientHandoverNote[] {
    return getFromStorage<PatientHandoverNote[]>(DOCTOR_KEYS.HANDOVERS, INITIAL_HANDOVERS);
  },

  addHandover(handover: Omit<PatientHandoverNote, 'id' | 'timestamp'>): PatientHandoverNote {
    const handovers = this.getHandovers();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newHandover: PatientHandoverNote = {
      ...handover,
      id: `HND-${Date.now().toString().slice(-3)}`,
      timestamp,
      isResolved: false,
    };

    const updated = [newHandover, ...handovers];
    setToStorage(DOCTOR_KEYS.HANDOVERS, updated);
    return newHandover;
  },

  toggleHandoverResolved(id: string): void {
    const handovers = this.getHandovers();
    const updated = handovers.map((h) => (h.id === id ? { ...h, isResolved: !h.isResolved } : h));
    setToStorage(DOCTOR_KEYS.HANDOVERS, updated);
  },
};
