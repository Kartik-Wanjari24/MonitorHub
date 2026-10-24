// Type definitions for Hospital Staff Portal (Phase 3)

export type StaffRole = 'receptionist' | 'compounder';

export type Gender = 'Male' | 'Female' | 'Other';

export type PriorityLevel = 'normal' | 'urgent' | 'critical';

export type QueueStatus = 'Waiting' | 'In Consultation' | 'Completed';

export type AppointmentStatus = 'Scheduled' | 'Checked In' | 'Completed' | 'Cancelled' | 'Delayed';

export interface PatientRecord {
  id: string; // Unique Patient ID (e.g. "TMH-2026-001")
  fullName: string;
  age: number;
  gender: Gender;
  contactNumber: string;
  email?: string;
  address?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  registrationType: 'normal' | 'emergency';
  registrationDate: string; // ISO date string or formatted date
  isProvisional?: boolean; // For emergency cases where info is incomplete
  allergies: string[];
  diagnoses: Array<{
    condition: string;
    diagnosedDate: string;
    doctorName: string;
    notes?: string;
  }>;
  prescriptions: Array<{
    id: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
    doctorName: string;
  }>;
  labReports: Array<{
    id: string;
    testName: string;
    date: string;
    result: string;
    status: 'Normal' | 'Abnormal' | 'Pending';
  }>;
  doctorNotes: Array<{
    id: string;
    date: string;
    doctorName: string;
    note: string;
  }>;
  previousVisits: Array<{
    date: string;
    reason: string;
    doctorName: string;
    department: string;
  }>;
}

export interface Appointment {
  id: string; // e.g. "APT-101"
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  type: 'General OPD' | 'Follow-up' | 'Emergency Review' | 'Specialist Consultation';
  notes?: string;
}

export interface QueueItem {
  id: string; // e.g. "Q-01"
  tokenNumber: number;
  patientId: string;
  patientName: string;
  assignedDoctor: string;
  department: string;
  status: QueueStatus;
  checkInTime: string; // e.g. "09:30 AM"
  priority: PriorityLevel;
  isEmergency: boolean;
}

export interface EmergencyCase {
  id: string; // e.g. "EMG-201"
  patientId: string;
  patientName: string;
  arrivalTime: string;
  arrivalDate: string;
  status: 'Triage Pending' | 'Under Observation' | 'Stabilized' | 'Transferred to ICU' | 'Discharged';
  priority: PriorityLevel; // critical, urgent, normal
  responsibleStaff: string; // Staff member or nurse
  assignedDoctor: string;
  chiefComplaint: string;
  provisionalNotes?: string;
  isProvisional: boolean;
  statusHistory: Array<{
    timestamp: string;
    status: string;
    updatedBy: string;
    note?: string;
  }>;
}

export interface StaffNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'registration' | 'appointment' | 'queue' | 'emergency' | 'system';
  read: boolean;
  relatedId?: string; // patientId, appointmentId, or emergencyId
}
