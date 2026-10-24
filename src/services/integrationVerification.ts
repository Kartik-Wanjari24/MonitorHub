// Automated integration tests for cross-portal workflows, data consistency, and authorization
import { authService } from '../services/auth';
import { staffStore } from '../services/staffStore';
import { doctorStore } from '../services/doctorStore';
import { patientStore } from '../services/patientStore';

export interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  message?: string;
}

export function runIntegrationVerification(): TestResult[] {
  const results: TestResult[] = [];

  const assert = (suite: string, name: string, condition: boolean, message?: string) => {
    results.push({
      suite,
      name,
      passed: Boolean(condition),
      message: condition ? undefined : message || 'Assertion failed',
    });
  };

  // --- Suite 1: Authentication & Role Verification ---
  try {
    // 1.1 Valid credentials check
    const docUser = authService.validateCredentials('doctor@demo.com', 'Doctor123');
    assert('Auth', 'Doctor credentials validate successfully', docUser?.role === 'doctor');

    const staffUser = authService.validateCredentials('staff@demo.com', 'Staff123');
    assert('Auth', 'Staff credentials validate successfully', staffUser?.role === 'staff');

    const patUser = authService.validateCredentials('patient@demo.com', 'Patient123');
    assert('Auth', 'Patient credentials validate successfully', patUser?.role === 'patient');

    // 1.2 Invalid password check
    const badUser = authService.validateCredentials('doctor@demo.com', 'WrongPass');
    assert('Auth', 'Invalid credentials fail verification', badUser === null);

    // 1.3 Session storage and clear
    authService.setSession(docUser!);
    const currentSession = authService.getSession();
    assert('Auth', 'Session stores active user', currentSession?.role === 'doctor');
    authService.clearSession();
    assert('Auth', 'Clear session clears active user', authService.getSession() === null);
  } catch (err) {
    assert('Auth', 'Auth suite executed without uncaught exception', false, String(err));
  }

  // --- Suite 2: Registration to Consultation Workflow ---
  try {
    const initialPatientCount = staffStore.getPatients().length;

    // 2.1 Register New Patient
    const testPatient = staffStore.addPatient({
      fullName: 'Integration Test Patient',
      age: 50,
      gender: 'Male',
      contactNumber: '+91 99999 88888',
      registrationType: 'normal',
      allergies: ['Latex'],
      emergencyContact: {
        name: 'Test Relative',
        relationship: 'Spouse',
        phone: '+91 99999 88889',
      },
      diagnoses: [],
      prescriptions: [],
      labReports: [],
      doctorNotes: [],
      previousVisits: [],
    });

    assert(
      'Registration Workflow',
      'Unique Patient ID assigned',
      testPatient.id.startsWith('TMH-2026-')
    );
    assert(
      'Registration Workflow',
      'Patient saved to shared store',
      staffStore.getPatients().length === initialPatientCount + 1
    );

    // 2.2 Schedule Appointment & Conflict Check
    const slotBusyBefore = staffStore.checkDoctorConflict(
      'Dr. Aarav Sharma',
      '2026-10-30',
      '14:00'
    );
    assert('Appointment Workflow', 'Slot is initially free', slotBusyBefore === false);

    const newApt = staffStore.addAppointment({
      patientId: testPatient.id,
      patientName: testPatient.fullName,
      doctorName: 'Dr. Aarav Sharma',
      department: 'Cardiology',
      date: '2026-10-30',
      time: '14:00',
      status: 'Scheduled',
      type: 'General OPD',
    });

    assert('Appointment Workflow', 'Appointment successfully scheduled', newApt.id.startsWith('APT-'));
    assert(
      'Appointment Workflow',
      'Conflict check detects booked slot',
      staffStore.checkDoctorConflict('Dr. Aarav Sharma', '2026-10-30', '14:00') === true
    );

    // 2.3 Check-in into Queue
    const queueItem = staffStore.addToQueue({
      patientId: testPatient.id,
      patientName: testPatient.fullName,
      assignedDoctor: 'Dr. Aarav Sharma',
      department: 'Cardiology',
      status: 'Waiting',
      priority: 'normal',
      isEmergency: false,
    });
    assert('Queue Workflow', 'Token generated for lobby queue', queueItem.tokenNumber > 0);

    // 2.4 Doctor opens patient and finalizes consultation
    const docPatient = doctorStore.getDoctorPatient(testPatient.id);
    assert('Doctor Workflow', 'Doctor portal retrieves shared registered patient', docPatient !== null);

    const consult = doctorStore.saveConsultation({
      patientId: testPatient.id,
      patientName: testPatient.fullName,
      doctorName: 'Dr. Aarav Sharma',
      consultationDate: '2026-10-30',
      status: 'Finalized',
      chiefComplaint: 'Chest tightness upon exertion',
      clinicalExamination: 'Normal heart sounds, BP 142/90 mmHg',
      diagnosis: 'Mild Angina Pectoris',
      prescriptions: [
        {
          medicine: 'Aspirin 75mg',
          dosage: '1 tab',
          frequency: 'Once daily morning',
          duration: '30 days',
          instructions: 'After breakfast',
        },
      ],
      testRequests: ['Echocardiogram'],
      followUpInstructions: 'Review in 2 weeks',
    });

    assert('Consultation Workflow', 'Consultation saved as finalized', consult.status === 'Finalized');

    // 2.5 Verify core patient medical record was synchronized
    const updatedPatient = staffStore.getPatientById(testPatient.id);
    const hasPrescription = updatedPatient?.prescriptions.some((p) => p.medicineName === 'Aspirin 75mg');
    assert('Cross-Portal Sync', 'Doctor prescription synced to core patient record', Boolean(hasPrescription));

    const hasDiagnosis = updatedPatient?.diagnoses.some((d) => d.condition === 'Mild Angina Pectoris');
    assert('Cross-Portal Sync', 'Doctor diagnosis synced to core patient record', Boolean(hasDiagnosis));
  } catch (err) {
    assert('Workflows', 'Workflow suite executed without uncaught exception', false, String(err));
  }

  // --- Suite 3: Patient Portal Data Access & Health Diary Sync ---
  try {
    patientStore.setActivePatientId('TMH-2026-001');
    const pat = patientStore.getCurrentPatient();
    assert('Patient Portal', 'Active patient loaded correctly', pat?.id === 'TMH-2026-001');

    // Add Diary entry from Patient Portal
    const diary = patientStore.addHealthDiaryEntry(
      'Felt mild dizziness in afternoon',
      'After short brisk walk',
      2
    );
    assert('Patient Diary', 'Diary entry saved with ID', diary.id.startsWith('HD-'));

    // Verify Doctor can see the diary entry
    const docView = doctorStore.getDoctorPatient('TMH-2026-001');
    const doctorSeesDiary = docView?.healthDiary.some((d) => d.id === diary.id);
    assert(
      'Cross-Portal Sync',
      'Patient health diary note is visible to doctor during clinical assessment',
      Boolean(doctorSeesDiary)
    );

    // Call for Help notification check
    const helpReq = patientStore.createHelpRequest('Water / Refreshment', 'Routine');
    const staffNotifs = staffStore.getNotifications();
    const staffNotified = staffNotifs.some((n) => n.relatedId === helpReq.id);
    assert(
      'Cross-Portal Sync',
      'Patient assistance request triggers hospital staff notification',
      Boolean(staffNotified)
    );
  } catch (err) {
    assert('Patient Portal', 'Patient suite executed without uncaught exception', false, String(err));
  }

  return results;
}
