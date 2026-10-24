// Type definitions for Doctor Portal (Phase 4)
import type { PatientRecord } from './staff';

export type OrganType = 'heart' | 'lungs' | 'liver' | 'kidneys' | 'brain' | 'stomach' | 'intestines' | 'pancreas' | 'spleen' | 'bladder';

export interface VitalsReading {
  ecgWaveform: number[]; // Array of points representing an ECG rhythm strip
  heartRate: {
    value: number;
    unit: string;
    timestamp: string;
    status: 'normal' | 'elevated' | 'critical';
    source: string;
  };
  spo2: {
    value: number;
    unit: string;
    timestamp: string;
    status: 'normal' | 'low' | 'critical';
    source: string;
  };
  bloodPressure: {
    systolic: number;
    diastolic: number;
    unit: string;
    timestamp: string;
    status: 'normal' | 'stage1' | 'stage2' | 'crisis';
    source: string;
  };
  respiratoryRate: {
    value: number;
    unit: string;
    timestamp: string;
    status: 'normal' | 'elevated';
    source: string;
  };
  temperature: {
    value: number;
    unit: string;
    timestamp: string;
    status: 'normal' | 'fever';
    source: string;
  };
  isSimulated: boolean;
}

export interface OrganFinding {
  id: string;
  organ: OrganType;
  patientId: string;
  doctorName: string;
  observationDate: string;
  timestamp: string;
  title: string;
  clinicalNote: string;
  relatedReport?: string;
  isAmended?: boolean;
  auditHistory: Array<{
    amendedAt: string;
    amendedBy: string;
    previousNote: string;
    reason: string;
  }>;
}

export interface ConsultationRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  consultationDate: string;
  timestamp: string;
  status: 'Draft' | 'Finalized';
  chiefComplaint: string;
  clinicalExamination: string;
  diagnosis: string;
  prescriptions: Array<{
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  testRequests: string[];
  followUpInstructions: string;
  nextFollowUpDate?: string;
}

export interface ClinicalAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'critical_vital' | 'abnormal_lab' | 'pending_review' | 'queue_alert';
  severity: 'critical' | 'urgent' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isDemo: boolean;
  acknowledged: boolean;
  relatedOrgan?: OrganType;
}

export interface PatientHandoverNote {
  id: string;
  patientId: string;
  patientName: string;
  authorDoctor: string;
  timestamp: string;
  shift: 'Morning' | 'Evening' | 'Night';
  recentClinicalChanges: string;
  activeConcerns: string;
  pendingReviewsAndTests: string[];
  outstandingTasks: string[];
  targetDoctor?: string;
  isResolved?: boolean;
}

export interface HealthDiaryEntry {
  id: string;
  date: string;
  time: string;
  symptoms: string;
  severity: 1 | 2 | 3 | 4 | 5;
  mealsOrActivity: string;
  sharedWithDoctor: boolean;
}

export interface DoctorExtendedPatient extends PatientRecord {
  vitals: VitalsReading;
  organFindings: OrganFinding[];
  healthDiary: HealthDiaryEntry[];
  admissionStatus?: 'Outpatient' | 'Admitted - General Ward' | 'Admitted - ICU' | 'Observation Bay';
  bedNumber?: string;
}
