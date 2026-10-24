import type {
  PatientHelpRequest,
  MedicationReminder,
  PatientTestReport,
  PatientBill,
  DischargeSummary,
  PatientNotification,
  DoctorVisitStatus,
} from '../types/patient';
import type { PatientRecord, Appointment, QueueItem } from '../types/staff';
import type { HealthDiaryEntry, VitalsReading } from '../types/doctor';
import { staffStore } from './staffStore';
import { doctorStore } from './doctorStore';
import {
  INITIAL_HELP_REQUESTS,
  INITIAL_MEDICATION_REMINDERS,
  INITIAL_TEST_REPORTS,
  INITIAL_BILLS,
  INITIAL_DISCHARGE_SUMMARY,
  INITIAL_PATIENT_NOTIFICATIONS,
} from './mockPatientData';

const PATIENT_KEYS = {
  ACTIVE_ID: 'trails_patient_active_id',
  HELP_REQUESTS: 'trails_patient_help_requests',
  MED_REMINDERS: 'trails_patient_med_reminders',
  TEST_REPORTS: 'trails_patient_test_reports',
  BILLS: 'trails_patient_bills',
  NOTIFICATIONS: 'trails_patient_notifications',
  DOCTOR_VISIT_STATUS: 'trails_patient_doctor_visit_status',
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

export const patientStore = {
  // Current logged in demo patient ID (defaults to Rajesh Sharma TMH-2026-001)
  getActivePatientId(): string {
    const stored = localStorage.getItem(PATIENT_KEYS.ACTIVE_ID);
    return stored || 'TMH-2026-001';
  },

  setActivePatientId(id: string): void {
    localStorage.setItem(PATIENT_KEYS.ACTIVE_ID, id);
  },

  // Returns current patient record
  getCurrentPatient(): PatientRecord | null {
    const id = this.getActivePatientId();
    return staffStore.getPatientById(id) || null;
  },

  // Returns queue status for current patient
  getCurrentQueueStatus(): {
    queueItem: QueueItem | null;
    queuePosition: number | null;
    patientsAhead: number | null;
    lastUpdated: string;
  } {
    const id = this.getActivePatientId();
    const allQueue = staffStore.getQueue();
    const item = allQueue.find((q) => q.patientId === id) || null;

    if (!item) {
      return {
        queueItem: null,
        queuePosition: null,
        patientsAhead: null,
        lastUpdated: '10:30 AM',
      };
    }

    // Calculate queue position among active (Waiting or In Consultation)
    const activeWaiting = allQueue.filter((q) => q.status === 'Waiting');
    const myIndex = activeWaiting.findIndex((q) => q.id === item.id);
    const patientsAhead = myIndex >= 0 ? myIndex : 0;
    const queuePosition = myIndex >= 0 ? myIndex + 1 : 1;

    return {
      queueItem: item,
      queuePosition: item.status === 'In Consultation' ? 0 : queuePosition,
      patientsAhead: item.status === 'In Consultation' ? 0 : patientsAhead,
      lastUpdated: 'Just now (Live)',
    };
  },

  // Doctor visit status for admitted / observation bay patients
  getDoctorVisitStatus(): {
    status: DoctorVisitStatus;
    doctorName: string;
    department: string;
    estimatedTime: string;
    notes: string;
    lastUpdated: string;
  } {
    return getFromStorage(PATIENT_KEYS.DOCTOR_VISIT_STATUS, {
      status: 'Upcoming' as DoctorVisitStatus,
      doctorName: 'Dr. Aarav Sharma',
      department: 'Cardiology',
      estimatedTime: '11:30 AM Today',
      notes: 'Consultant morning ward rounds and BP telemetry assessment.',
      lastUpdated: '10:15 AM',
    });
  },

  setDoctorVisitStatus(status: DoctorVisitStatus, notes?: string): void {
    const current = this.getDoctorVisitStatus();
    setToStorage(PATIENT_KEYS.DOCTOR_VISIT_STATUS, {
      ...current,
      status,
      notes: notes || current.notes,
      lastUpdated: 'Just now',
    });
  },

  // Appointments for active patient
  getMyAppointments(): Appointment[] {
    const id = this.getActivePatientId();
    return staffStore.getAppointments().filter((a) => a.patientId === id);
  },

  requestCancelAppointment(id: string): void {
    staffStore.cancelAppointment(id);
    this.addNotification({
      title: 'Appointment Cancelled',
      message: 'Your appointment cancellation request was completed successfully.',
      type: 'appointment',
      linkTo: '/patient/appointments',
    });
  },

  // Medication reminders
  getMedicationReminders(): MedicationReminder[] {
    return getFromStorage<MedicationReminder[]>(
      PATIENT_KEYS.MED_REMINDERS,
      INITIAL_MEDICATION_REMINDERS
    );
  },

  toggleMedicationTaken(id: string): void {
    const meds = this.getMedicationReminders();
    const updated = meds.map((m) => (m.id === id ? { ...m, takenToday: !m.takenToday } : m));
    setToStorage(PATIENT_KEYS.MED_REMINDERS, updated);
  },

  // Test reports
  getTestReports(): PatientTestReport[] {
    return getFromStorage<PatientTestReport[]>(PATIENT_KEYS.TEST_REPORTS, INITIAL_TEST_REPORTS);
  },

  // Call for Help
  getHelpRequests(): PatientHelpRequest[] {
    return getFromStorage<PatientHelpRequest[]>(
      PATIENT_KEYS.HELP_REQUESTS,
      INITIAL_HELP_REQUESTS
    );
  },

  createHelpRequest(category: PatientHelpRequest['category'], urgency: PatientHelpRequest['urgency']): PatientHelpRequest {
    const requests = this.getHelpRequests();
    const patient = this.getCurrentPatient();
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRequest: PatientHelpRequest = {
      id: `HLP-${Date.now().toString().slice(-4)}`,
      patientId: patient?.id || 'TMH-2026-001',
      patientName: patient?.fullName || 'Rajesh Sharma',
      timestamp,
      category,
      urgency,
      location: 'Outpatient Waiting Hall A',
      status: 'Pending',
      isSimulated: true,
    };

    const updated = [newRequest, ...requests];
    setToStorage(PATIENT_KEYS.HELP_REQUESTS, updated);

    // Also notify staff
    staffStore.addNotification({
      title: 'Patient Assistance Requested',
      message: `${newRequest.patientName} requested ${newRequest.category} (${newRequest.urgency}) in ${newRequest.location}.`,
      type: 'system',
      relatedId: newRequest.id,
    });

    this.addNotification({
      title: 'Assistance Request Logged',
      message: `Your request for ${category} has been received by the ward staff desk.`,
      type: 'help',
      linkTo: '/patient/help',
    });

    return newRequest;
  },

  // Health Diary (Shared with Doctor Portal)
  getHealthDiary(): HealthDiaryEntry[] {
    const id = this.getActivePatientId();
    const docPatient = doctorStore.getDoctorPatient(id);
    return docPatient?.healthDiary || [];
  },

  addHealthDiaryEntry(symptoms: string, mealsOrActivity: string, severity: 1 | 2 | 3 | 4 | 5): HealthDiaryEntry {
    const id = this.getActivePatientId();
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEntry: HealthDiaryEntry = {
      id: `HD-${Date.now().toString().slice(-4)}`,
      date,
      time,
      symptoms,
      severity,
      mealsOrActivity,
      sharedWithDoctor: true,
    };

    // Update doctor extended state
    const docPatient = doctorStore.getDoctorPatient(id);
    if (docPatient) {
      docPatient.healthDiary = [newEntry, ...docPatient.healthDiary];
    }

    this.addNotification({
      title: 'Health Diary Entry Saved',
      message: 'Your entry has been securely saved and will be available for your doctor during your next visit.',
      type: 'medication',
      linkTo: '/patient/diary',
    });

    return newEntry;
  },

  // Patient Vitals
  getPatientVitals(): VitalsReading | null {
    const id = this.getActivePatientId();
    const docPatient = doctorStore.getDoctorPatient(id);
    return docPatient?.vitals || null;
  },

  // Bills and Discharge
  getBills(): PatientBill[] {
    return getFromStorage<PatientBill[]>(PATIENT_KEYS.BILLS, INITIAL_BILLS);
  },

  getDischargeSummary(): DischargeSummary {
    return INITIAL_DISCHARGE_SUMMARY;
  },

  // Patient Notifications
  getNotifications(): PatientNotification[] {
    return getFromStorage<PatientNotification[]>(
      PATIENT_KEYS.NOTIFICATIONS,
      INITIAL_PATIENT_NOTIFICATIONS
    );
  },

  addNotification(notif: Omit<PatientNotification, 'id' | 'timestamp' | 'read'>): void {
    const notifications = this.getNotifications();
    const newNotif: PatientNotification = {
      ...notif,
      id: `PNT-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      read: false,
    };
    setToStorage(PATIENT_KEYS.NOTIFICATIONS, [newNotif, ...notifications]);
  },

  markNotificationRead(id: string): void {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setToStorage(PATIENT_KEYS.NOTIFICATIONS, updated);
  },

  markAllNotificationsRead(): void {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setToStorage(PATIENT_KEYS.NOTIFICATIONS, updated);
  },
};
