import type {
  PatientHelpRequest,
  MedicationReminder,
  PatientTestReport,
  PatientBill,
  DischargeSummary,
  PatientNotification,
} from '../types/patient';

export const INITIAL_HELP_REQUESTS: PatientHelpRequest[] = [
  {
    id: 'HLP-101',
    patientId: 'TMH-2026-001',
    patientName: 'Rahul Verma',
    timestamp: '2026-10-24 10:15 AM',
    category: 'Water / Refreshment',
    urgency: 'Routine',
    location: 'Waiting Lobby A (Token #2)',
    status: 'Resolved',
    isSimulated: true,
  },
];

export const INITIAL_MEDICATION_REMINDERS: MedicationReminder[] = [
  {
    id: 'MED-01',
    medicineName: 'Amlodipine 5mg',
    dosage: '1 tablet',
    frequency: 'Once daily morning',
    timing: '08:00 AM (After Breakfast)',
    instructions: 'Take with plain water. Avoid grapefruit juice.',
    takenToday: true,
    prescribingDoctor: 'Dr. Aarav Sharma',
  },
  {
    id: 'MED-02',
    medicineName: 'Metformin 500mg',
    dosage: '1 tablet',
    frequency: 'Twice daily after meals',
    timing: '08:30 AM & 08:30 PM (With Food)',
    instructions: 'Swallow whole, do not crush.',
    takenToday: true,
    prescribingDoctor: 'Dr. Priya Deshmukh',
  },
  {
    id: 'MED-03',
    medicineName: 'Telmisartan 40mg',
    dosage: '1 tablet',
    frequency: 'Once daily evening',
    timing: '08:00 PM (After Dinner)',
    instructions: 'Monitor blood pressure regularly before bed.',
    takenToday: false,
    prescribingDoctor: 'Dr. Aarav Sharma',
  },
];

export const INITIAL_TEST_REPORTS: PatientTestReport[] = [
  {
    id: 'REP-501',
    testName: 'Complete Blood Count (CBC)',
    category: 'Blood Test',
    orderedDate: '2026-10-17',
    completedDate: '2026-10-18',
    status: 'Completed',
    resultSummary: 'Hb 13.8 g/dL (Normal), TLC 7,800/mcL, Platelets 2.4 Lacs/mcL.',
    doctorComments: 'Routine hematology markers are within healthy standard limits.',
    downloadUrl: '#',
  },
  {
    id: 'REP-502',
    testName: 'Fasting Blood Sugar & HbA1c',
    category: 'Blood Test',
    orderedDate: '2026-10-17',
    completedDate: '2026-10-18',
    status: 'Completed',
    resultSummary: 'FBS 138 mg/dL (Elevated), HbA1c 7.4% (Suboptimal control).',
    doctorComments: 'Endocrine review completed. Continue Metformin regimen strictly.',
    downloadUrl: '#',
  },
  {
    id: 'REP-503',
    testName: '24-hour Ambulatory Blood Pressure (ABPM)',
    category: 'Cardiac',
    orderedDate: '2026-10-20',
    status: 'In Analysis',
    resultSummary: 'Data extraction in progress by Cardiology Diagnostic Lab.',
    doctorComments: 'Awaiting device download and summary calculation.',
  },
  {
    id: 'REP-504',
    testName: 'Renal Function Panel & Spot uACR',
    category: 'Blood Test',
    orderedDate: '2026-10-24',
    status: 'Pending',
    resultSummary: 'Sample collected at diagnostic phlebotomy station.',
    doctorComments: 'Scheduled for release by 05:00 PM today.',
  },
];

export const INITIAL_BILLS: PatientBill[] = [
  {
    id: 'INV-2026-089',
    invoiceNumber: 'TMH-INV-089',
    date: '2026-10-24',
    department: 'Cardiology Outpatient Clinic',
    items: [
      { description: 'Senior Consultant Consultation (Dr. Aarav Sharma)', amount: 800 },
      { description: 'Routine 12-lead Electrocardiogram (ECG)', amount: 450 },
      { description: 'Spot Blood Glucose Fingerstick', amount: 100 },
    ],
    totalAmount: 1350,
    paymentStatus: 'Paid',
    isDemo: true,
  },
  {
    id: 'INV-2026-042',
    invoiceNumber: 'TMH-INV-042',
    date: '2026-10-18',
    department: 'Central Clinical Pathology Laboratory',
    items: [
      { description: 'Complete Blood Count (CBC Automated)', amount: 350 },
      { description: 'HbA1c Glycated Hemoglobin Test', amount: 650 },
    ],
    totalAmount: 1000,
    paymentStatus: 'Paid',
    isDemo: true,
  },
];

export const INITIAL_DISCHARGE_SUMMARY: DischargeSummary = {
  id: 'DSC-2026-014',
  dischargeDate: '2026-08-16',
  admittingDiagnosis: 'Hypertensive Urgency with acute severe occipital cephalalgia',
  finalDiagnosis: 'Essential Stage 2 Hypertension, stabilized on dual oral antihypertensives',
  treatingConsultant: 'Dr. Aarav Sharma (Cardiology)',
  summaryOfHospitalStay:
    'Patient admitted for 24-hour observation and blood pressure titration. Vital signs stabilized without end-organ damage. Discharged in stable and ambulatory condition.',
  dischargeMedications: [
    'Tab Amlodipine 5mg — 1 tab OD morning after breakfast',
    'Tab Telmisartan 40mg — 1 tab OD evening after dinner',
  ],
  followUpPlan: 'Review in Cardiology OPD in 2 weeks with home BP diary.',
  dietaryAndActivityAdvice: 'Strict low sodium diet (<2g Na/day). Avoid strenuous isometric weight lifting for 2 weeks. Walk 30 minutes daily.',
  emergencyContactInstructions: 'Present immediately to Emergency if BP > 180/110 mmHg, visual disturbances, or chest discomfort recur.',
  isDemo: true,
};

export const INITIAL_PATIENT_NOTIFICATIONS: PatientNotification[] = [
  {
    id: 'PNT-01',
    title: 'Consultation Ready Soon',
    message: 'Your Token #2 is currently next in line for Dr. Aarav Sharma in Cardiology Room 4.',
    timestamp: '5 mins ago',
    type: 'queue',
    read: false,
    linkTo: '/patient/queue',
  },
  {
    id: 'PNT-02',
    title: 'New Lab Report Available',
    message: 'Complete Blood Count (CBC) test results are ready to view and download.',
    timestamp: '2 hours ago',
    type: 'report',
    read: false,
    linkTo: '/patient/reports',
  },
  {
    id: 'PNT-03',
    title: 'Medication Reminder',
    message: "Evening dose of Telmisartan 40mg is due at 08:00 PM.",
    timestamp: '3 hours ago',
    type: 'medication',
    read: true,
    linkTo: '/patient/medications',
  },
  {
    id: 'PNT-04',
    title: 'Assistance Request Completed',
    message: 'Hospital staff fulfilled your refreshment assistance request in Lobby A.',
    timestamp: 'Yesterday',
    type: 'help',
    read: true,
    linkTo: '/patient/help',
  },
];
