import type {
  PatientRecord,
  Appointment,
  QueueItem,
  EmergencyCase,
  StaffNotification,
  StaffRole,
} from '../types/staff';
import {
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_QUEUE,
  INITIAL_EMERGENCY_CASES,
  INITIAL_NOTIFICATIONS,
} from './mockStaffData';

const STORAGE_KEYS = {
  PATIENTS: 'trails_staff_patients',
  APPOINTMENTS: 'trails_staff_appointments',
  QUEUE: 'trails_staff_queue',
  EMERGENCY: 'trails_staff_emergency',
  NOTIFICATIONS: 'trails_staff_notifications',
  ROLE: 'trails_staff_active_role',
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

export const staffStore = {
  // --- Active Staff Sub-Role (Receptionist vs Compounder) ---
  getActiveRole(): StaffRole {
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);
    return role === 'compounder' ? 'compounder' : 'receptionist';
  },

  setActiveRole(role: StaffRole): void {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  },

  // --- Patients ---
  getPatients(): PatientRecord[] {
    return getFromStorage<PatientRecord[]>(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS);
  },

  getPatientById(id: string): PatientRecord | undefined {
    return this.getPatients().find((p) => p.id.toLowerCase() === id.trim().toLowerCase());
  },

  findDuplicates(fullName: string, contactNumber: string): PatientRecord[] {
    const cleanName = fullName.trim().toLowerCase();
    const cleanPhone = contactNumber.replace(/\D/g, '');
    return this.getPatients().filter((p) => {
      const matchName = p.fullName.toLowerCase().includes(cleanName) || cleanName.includes(p.fullName.toLowerCase());
      const pPhoneClean = p.contactNumber.replace(/\D/g, '');
      const matchPhone = cleanPhone && pPhoneClean && (pPhoneClean.endsWith(cleanPhone) || cleanPhone.endsWith(pPhoneClean));
      return matchName || matchPhone;
    });
  },

  addPatient(patient: Omit<PatientRecord, 'id' | 'registrationDate'> & { id?: string }): PatientRecord {
    const patients = this.getPatients();
    const nextSeq = patients.length + 1;
    const generatedId = patient.id || `TMH-2026-${String(nextSeq).padStart(3, '0')}`;
    const newRecord: PatientRecord = {
      ...patient,
      id: generatedId,
      registrationDate: new Date().toISOString(),
    };
    const updated = [newRecord, ...patients];
    setToStorage(STORAGE_KEYS.PATIENTS, updated);

    // Auto-create notification
    this.addNotification({
      title: patient.registrationType === 'emergency' ? 'Emergency Patient Registered' : 'New Patient Registered',
      message: `${newRecord.fullName} (${newRecord.id}) registered successfully.`,
      type: patient.registrationType === 'emergency' ? 'emergency' : 'registration',
      relatedId: newRecord.id,
    });

    return newRecord;
  },

  updatePatient(id: string, updates: Partial<PatientRecord>): PatientRecord | null {
    const patients = this.getPatients();
    const idx = patients.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    patients[idx] = { ...patients[idx], ...updates };
    setToStorage(STORAGE_KEYS.PATIENTS, patients);
    return patients[idx];
  },

  // --- Appointments ---
  getAppointments(): Appointment[] {
    return getFromStorage<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },

  addAppointment(apt: Omit<Appointment, 'id'>): Appointment {
    const appointments = this.getAppointments();
    const nextId = `APT-${appointments.length + 101}`;
    const newApt: Appointment = { ...apt, id: nextId };
    const updated = [newApt, ...appointments];
    setToStorage(STORAGE_KEYS.APPOINTMENTS, updated);

    this.addNotification({
      title: 'Appointment Scheduled',
      message: `Appointment for ${newApt.patientName} with ${newApt.doctorName} on ${newApt.date} at ${newApt.time}.`,
      type: 'appointment',
      relatedId: newApt.id,
    });

    return newApt;
  },

  updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const appointments = this.getAppointments();
    const updated = appointments.map((a) => (a.id === id ? { ...a, status } : a));
    setToStorage(STORAGE_KEYS.APPOINTMENTS, updated);
  },

  rescheduleAppointment(id: string, date: string, time: string): void {
    const appointments = this.getAppointments();
    const updated = appointments.map((a) => (a.id === id ? { ...a, date, time, status: 'Scheduled' as const } : a));
    setToStorage(STORAGE_KEYS.APPOINTMENTS, updated);

    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      this.addNotification({
        title: 'Appointment Rescheduled',
        message: `${apt.patientName}'s appointment rescheduled to ${date} at ${time}.`,
        type: 'appointment',
        relatedId: id,
      });
    }
  },

  cancelAppointment(id: string): void {
    const appointments = this.getAppointments();
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a));
    setToStorage(STORAGE_KEYS.APPOINTMENTS, updated);

    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      this.addNotification({
        title: 'Appointment Cancelled',
        message: `Appointment for ${apt.patientName} (${apt.id}) was cancelled.`,
        type: 'appointment',
        relatedId: id,
      });
    }
  },

  checkDoctorConflict(doctorName: string, date: string, time: string, excludeAptId?: string): boolean {
    const appointments = this.getAppointments();
    return appointments.some(
      (a) =>
        a.doctorName === doctorName &&
        a.date === date &&
        a.time === time &&
        a.status !== 'Cancelled' &&
        a.id !== excludeAptId
    );
  },

  // --- Queue ---
  getQueue(): QueueItem[] {
    return getFromStorage<QueueItem[]>(STORAGE_KEYS.QUEUE, INITIAL_QUEUE);
  },

  addToQueue(item: Omit<QueueItem, 'id' | 'tokenNumber' | 'checkInTime'>): QueueItem {
    const queue = this.getQueue();
    const maxToken = queue.reduce((max, q) => Math.max(max, q.tokenNumber), 0);
    const tokenNumber = maxToken + 1;
    const now = new Date();
    const checkInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newItem: QueueItem = {
      ...item,
      id: `Q-${String(tokenNumber).padStart(2, '0')}`,
      tokenNumber,
      checkInTime,
    };

    // Emergency cases go to the top of waiting list
    let updated: QueueItem[];
    if (newItem.isEmergency || newItem.priority === 'critical') {
      const activeConsult = queue.filter((q) => q.status === 'In Consultation');
      const others = queue.filter((q) => q.status !== 'In Consultation');
      updated = [...activeConsult, newItem, ...others];
    } else {
      updated = [...queue, newItem];
    }

    setToStorage(STORAGE_KEYS.QUEUE, updated);

    this.addNotification({
      title: 'Patient Added to Queue',
      message: `${newItem.patientName} queued for ${newItem.assignedDoctor} (Token #${newItem.tokenNumber}).`,
      type: 'queue',
      relatedId: newItem.id,
    });

    return newItem;
  },

  updateQueueStatus(id: string, status: QueueItem['status']): void {
    const queue = this.getQueue();
    const updated = queue.map((q) => (q.id === id ? { ...q, status } : q));
    setToStorage(STORAGE_KEYS.QUEUE, updated);

    const item = queue.find((q) => q.id === id);
    if (item) {
      this.addNotification({
        title: 'Queue Status Changed',
        message: `${item.patientName} (Token #${item.tokenNumber}) status is now ${status}.`,
        type: 'queue',
        relatedId: id,
      });
    }
  },

  // --- Emergency Cases ---
  getEmergencyCases(): EmergencyCase[] {
    return getFromStorage<EmergencyCase[]>(STORAGE_KEYS.EMERGENCY, INITIAL_EMERGENCY_CASES);
  },

  addEmergencyCase(emg: Omit<EmergencyCase, 'id' | 'arrivalTime' | 'arrivalDate' | 'statusHistory'>): EmergencyCase {
    const cases = this.getEmergencyCases();
    const id = `EMG-${cases.length + 201}`;
    const now = new Date();
    const arrivalTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalDate = now.toISOString().split('T')[0];

    const newCase: EmergencyCase = {
      ...emg,
      id,
      arrivalTime,
      arrivalDate,
      statusHistory: [
        {
          timestamp: `${arrivalDate} ${arrivalTime}`,
          status: emg.status,
          updatedBy: emg.responsibleStaff,
          note: emg.provisionalNotes || 'Emergency intake initiated.',
        },
      ],
    };

    const updated = [newCase, ...cases];
    setToStorage(STORAGE_KEYS.EMERGENCY, updated);

    this.addNotification({
      title: '🚨 Emergency Triage Active',
      message: `Emergency admission: ${newCase.patientName} (${newCase.id}). Severity: ${newCase.priority.toUpperCase()}.`,
      type: 'emergency',
      relatedId: newCase.id,
    });

    return newCase;
  },

  updateEmergencyStatus(id: string, newStatus: EmergencyCase['status'], updatedBy: string, note?: string): void {
    const cases = this.getEmergencyCases();
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const updated = cases.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          statusHistory: [
            ...c.statusHistory,
            {
              timestamp,
              status: newStatus,
              updatedBy,
              note: note || `Status updated to ${newStatus}`,
            },
          ],
        };
      }
      return c;
    });

    setToStorage(STORAGE_KEYS.EMERGENCY, updated);

    this.addNotification({
      title: 'Emergency Case Status Updated',
      message: `Case ${id} status moved to ${newStatus}.`,
      type: 'emergency',
      relatedId: id,
    });
  },

  // --- Notifications ---
  getNotifications(): StaffNotification[] {
    return getFromStorage<StaffNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  addNotification(notif: Omit<StaffNotification, 'id' | 'timestamp' | 'read'>): void {
    const notifications = this.getNotifications();
    const newNotif: StaffNotification = {
      ...notif,
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      read: false,
    };
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, [newNotif, ...notifications.slice(0, 19)]);
  },

  markNotificationRead(id: string): void {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  markAllNotificationsRead(): void {
    const notifications = this.getNotifications();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  // Reset store to initial demo data
  resetAllDemoData(): void {
    setToStorage(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS);
    setToStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
    setToStorage(STORAGE_KEYS.QUEUE, INITIAL_QUEUE);
    setToStorage(STORAGE_KEYS.EMERGENCY, INITIAL_EMERGENCY_CASES);
    setToStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },
};
