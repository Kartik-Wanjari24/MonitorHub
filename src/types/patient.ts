// Type definitions for Patient Portal (Phase 5)

export type DoctorVisitStatus = 'Upcoming' | 'In Progress' | 'Completed' | 'Delayed';

export interface PatientHelpRequest {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  category: 'Nurse Assistance' | 'Pain Relief' | 'Water / Refreshment' | 'Emergency Discomfort';
  urgency: 'Routine' | 'Urgent';
  location: string; // e.g., "Waiting Lobby" or "Observation Bay 1"
  status: 'Pending' | 'Acknowledged' | 'Resolved';
  isSimulated: boolean;
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string; // e.g. "08:00 AM (After Breakfast)"
  instructions: string;
  takenToday: boolean;
  prescribingDoctor: string;
}

export interface PatientTestReport {
  id: string;
  testName: string;
  category: 'Blood Test' | 'Radiology / Imaging' | 'Biomarker' | 'Cardiac';
  orderedDate: string;
  completedDate?: string;
  status: 'Completed' | 'Pending' | 'In Analysis';
  resultSummary?: string;
  doctorComments?: string;
  downloadUrl?: string; // Simulated link
}

export interface PatientBill {
  id: string;
  invoiceNumber: string;
  date: string;
  department: string;
  items: Array<{
    description: string;
    amount: number;
  }>;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Partially Paid';
  isDemo: boolean;
}

export interface DischargeSummary {
  id: string;
  dischargeDate: string;
  admittingDiagnosis: string;
  finalDiagnosis: string;
  treatingConsultant: string;
  summaryOfHospitalStay: string;
  dischargeMedications: string[];
  followUpPlan: string;
  dietaryAndActivityAdvice: string;
  emergencyContactInstructions: string;
  isDemo: boolean;
}

export interface PatientNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'appointment' | 'report' | 'queue' | 'help' | 'visit' | 'medication';
  read: boolean;
  linkTo?: string;
}
