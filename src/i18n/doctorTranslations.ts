export interface DoctorPortalTranslations {
  // Navigation & Shell
  portalName: string;
  portalSubtitle: string;
  badge: string;
  dashboard: string;
  smartQueue: string;
  patientProfiles: string;
  vitalsMonitoring: string;
  consultations: string;
  alerts: string;
  patientHandover: string;
  settings: string;
  signOut: string;
  drName: string;
  drSpecialty: string;
  activeHospital: string;
  prototypeBannerNotice: string;
  simulatedVitalsBadge: string;
  simulatedVitalsNotice: string;

  // Dashboard
  dashTitle: string;
  dashSubtitle: string;
  statAssignedPatients: string;
  statEmergencyCases: string;
  statActiveConsultations: string;
  statAdmittedPatients: string;
  statUpcomingAppointments: string;
  statPendingReviews: string;
  shortcutsTitle: string;
  openSmartQueue: string;
  searchPatientDirectory: string;
  newConsultationWorkspace: string;
  viewHandoverBoard: string;
  activeAlertsSection: string;
  acknowledgedText: string;
  acknowledgeBtn: string;
  todayConsultationsTitle: string;

  // Smart Queue
  smartQueueTitle: string;
  smartQueueSubtitle: string;
  waitingForConsultation: string;
  tokenNumber: string;
  patientCol: string;
  checkInTimeCol: string;
  triagePriorityCol: string;
  alertsCol: string;
  actionsCol: string;
  openProfileBtn: string;
  startConsultationBtn: string;
  markCompletedBtn: string;
  allTriageFilter: string;
  criticalOnly: string;
  urgentOnly: string;
  routineOnly: string;
  emergencyTriageNotice: string;

  // One-Tap Patient Profile
  profileTitle: string;
  profileSubtitle: string;
  tabOverview: string;
  tabVitalsAnd3D: string;
  tabHistoryAndVisits: string;
  tabDiagnosesAndMeds: string;
  tabLabReports: string;
  tabDoctorNotes: string;
  tabHealthDiary: string;
  tabHandover: string;
  admissionStatusLabel: string;
  bedLabel: string;
  allergiesAlert: string;
  noKnownAllergies: string;
  patientHealthDiaryTitle: string;
  noDiaryNotes: string;
  severityLevel: string;

  // Vitals Monitoring
  vitalsTitle: string;
  vitalsSubtitle: string;
  simulatedDisclaimer: string;
  heartRateLabel: string;
  spo2Label: string;
  bloodPressureLabel: string;
  respiratoryRateLabel: string;
  temperatureLabel: string;
  ecgStripTitle: string;
  ecgLiveLeadII: string;
  bpm: string;
  percent: string;
  mmhg: string;
  breathsMin: string;
  farenheit: string;

  // Interactive 3D Human Body
  interactive3DTitle: string;
  interactive3DSubtitle: string;
  rotateInstructions: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  selectOrganPrompt: string;
  selectedOrganTitle: string;
  organHeart: string;
  organLungs: string;
  organLiver: string;
  organKidneys: string;
  organDetailsFor: string;
  organClinicalNotes: string;
  organLabReports: string;
  addOrganFindingBtn: string;
  amendFindingBtn: string;
  findingTitleLabel: string;
  clinicalNoteLabel: string;
  relatedReportLabel: string;
  amendReasonLabel: string;
  auditHistoryTitle: string;
  amendedBy: string;
  noOrganFindings: string;
  threeDNotSupportedNote: string;

  // Consultation Workspace
  consultationTitle: string;
  consultationSubtitle: string;
  selectPatientForConsult: string;
  chiefComplaintLabel: string;
  clinicalExamLabel: string;
  diagnosisLabel: string;
  prescriptionsLabel: string;
  addMedicineRow: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  testsRequestedLabel: string;
  followUpInstructionsLabel: string;
  nextFollowUpDateLabel: string;
  saveAsDraftBtn: string;
  finalizeConsultationBtn: string;
  consultationHistoryTitle: string;
  draftStatus: string;
  finalizedStatus: string;
  finalizedNotice: string;

  // Alerts & Notifications
  alertsTitle: string;
  alertsSubtitle: string;
  filterAllAlerts: string;
  filterUnacknowledged: string;
  filterCritical: string;
  demoDataBadge: string;
  markAcknowledged: string;
  noAlertsFound: string;

  // Patient Handover
  handoverTitle: string;
  handoverSubtitle: string;
  newHandoverNoteBtn: string;
  shiftMorning: string;
  shiftEvening: string;
  shiftNight: string;
  recentChangesCol: string;
  activeConcernsCol: string;
  pendingReviewsCol: string;
  outstandingTasksCol: string;
  targetDoctorLabel: string;
  markResolvedBtn: string;
  resolvedBadge: string;
  pendingBadge: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  doctorProfileSection: string;
  consultingHours: string;
  clinicalSpecialty: string;
  medicalLicense: string;
}

export const doctorTranslationsEn: DoctorPortalTranslations = {
  portalName: 'Trails Doctor Hub',
  portalSubtitle: 'Clinical Assessment & Patient Care Workspace',
  badge: 'Doctor Portal',
  dashboard: 'Clinical Dashboard',
  smartQueue: 'Smart Queue',
  patientProfiles: 'Patient Profiles',
  vitalsMonitoring: 'Vitals & Telemetry',
  consultations: 'Consultations',
  alerts: 'Clinical Alerts',
  patientHandover: 'Patient Handover',
  settings: 'Clinical Settings',
  signOut: 'Sign Out',
  drName: 'Dr. Aarav Sharma',
  drSpecialty: 'Senior Consultant — Cardiology & Internal Medicine',
  activeHospital: 'Trails Apollo Memorial Hospital (New Delhi)',
  prototypeBannerNotice: 'Clinical Workspace Prototype • Phase 4 Active',
  simulatedVitalsBadge: 'SIMULATED TELEMETRY',
  simulatedVitalsNotice: 'Telemetry and vitals shown are simulated demo readings. They do not represent real patient physiology or trigger actual clinical alarms.',

  dashTitle: "Doctor's Clinical Workspace",
  dashSubtitle: 'Patient assessment, telemetry, smart queue triage, and consultation workflows.',
  statAssignedPatients: 'Total Assigned Patients',
  statEmergencyCases: 'Emergency Admissions',
  statActiveConsultations: 'Active Consultations',
  statAdmittedPatients: 'Inpatients / Admitted',
  statUpcomingAppointments: "Today's Appointments",
  statPendingReviews: 'Pending Report Reviews',
  shortcutsTitle: 'Quick Clinical Shortcuts',
  openSmartQueue: 'Open Smart Queue',
  searchPatientDirectory: 'Search Patient Profiles',
  newConsultationWorkspace: 'New Consultation Workspace',
  viewHandoverBoard: 'Shift Handover Board',
  activeAlertsSection: 'Priority Clinical Alerts',
  acknowledgedText: 'Acknowledged',
  acknowledgeBtn: 'Acknowledge',
  todayConsultationsTitle: "Today's Assigned Consultations",

  smartQueueTitle: 'Clinical Smart Queue',
  smartQueueSubtitle: 'Real-time triage categories, check-in intervals, and patient assessment access.',
  waitingForConsultation: 'Patients Waiting for Consultation',
  tokenNumber: 'Token #',
  patientCol: 'Patient Details',
  checkInTimeCol: 'Check-in Time',
  triagePriorityCol: 'Triage Priority',
  alertsCol: 'Clinical Alerts',
  actionsCol: 'Actions',
  openProfileBtn: 'One-Tap Profile',
  startConsultationBtn: 'Start Consult',
  markCompletedBtn: 'Complete',
  allTriageFilter: 'All Patients',
  criticalOnly: 'Critical / Red',
  urgentOnly: 'Urgent / Yellow',
  routineOnly: 'Routine / Green',
  emergencyTriageNotice: 'Emergency cases are prioritized at the top of the queue with documented triage categories.',

  profileTitle: 'Patient Clinical Profile',
  profileSubtitle: 'Comprehensive chronological medical records, telemetry, and 3D organ history.',
  tabOverview: 'Clinical Summary',
  tabVitalsAnd3D: 'Vitals & 3D Anatomy',
  tabHistoryAndVisits: 'History & Visits',
  tabDiagnosesAndMeds: 'Diagnoses & Prescriptions',
  tabLabReports: 'Diagnostic Reports',
  tabDoctorNotes: 'Doctor Notes',
  tabHealthDiary: 'Patient Health Diary',
  tabHandover: 'Handover Tasks',
  admissionStatusLabel: 'Care Status',
  bedLabel: 'Bed / Bay',
  allergiesAlert: 'Known Allergies',
  noKnownAllergies: 'No drug allergies documented.',
  patientHealthDiaryTitle: 'Patient Self-Reported Health Diary',
  noDiaryNotes: 'No patient health diary entries shared yet.',
  severityLevel: 'Severity Level',

  vitalsTitle: 'Live Vitals & Telemetry Tracing',
  vitalsSubtitle: 'Continuous multi-parameter monitoring stream with simulated medical waveform.',
  simulatedDisclaimer: 'Prototype notice: Values displayed below are simulated signals and do not trigger medical code alerts.',
  heartRateLabel: 'Heart Rate',
  spo2Label: 'Oxygen Saturation (SpO₂)',
  bloodPressureLabel: 'Blood Pressure (NIBP)',
  respiratoryRateLabel: 'Respiratory Rate',
  temperatureLabel: 'Body Temperature',
  ecgStripTitle: 'Continuous Rhythm Strip (Lead II)',
  ecgLiveLeadII: 'Real-time telemetry stream (Simulated)',
  bpm: 'bpm',
  percent: '%',
  mmhg: 'mmHg',
  breathsMin: '/min',
  farenheit: '°F',

  interactive3DTitle: 'Interactive 3D Human Anatomy & Organ Records',
  interactive3DSubtitle: 'Rotate, zoom, and select vital organs to inspect organ-specific medical records.',
  rotateInstructions: 'Drag to rotate 3D model • Scroll/pinch to zoom • Click organ to view records',
  zoomIn: 'Zoom In',
  zoomOut: 'Zoom Out',
  resetView: 'Reset View',
  selectOrganPrompt: 'Click on Heart, Lungs, Liver, or Kidneys on the 3D model or buttons below:',
  selectedOrganTitle: 'Organ Clinical History',
  organHeart: 'Heart / Cardiovascular',
  organLungs: 'Lungs / Respiratory',
  organLiver: 'Liver / Hepatic',
  organKidneys: 'Kidneys / Renal',
  organDetailsFor: 'Clinical Findings & Reports for',
  organClinicalNotes: 'Clinical Observations & History',
  organLabReports: 'Correlated Reports',
  addOrganFindingBtn: 'Add Organ Finding',
  amendFindingBtn: 'Amend / Correct Note',
  findingTitleLabel: 'Finding Summary / Title *',
  clinicalNoteLabel: 'Clinical Observation & Examination *',
  relatedReportLabel: 'Correlated Lab or Diagnostic Report',
  amendReasonLabel: 'Clinical Reason for Amendment (Audited) *',
  auditHistoryTitle: 'Documented Amendment Audit History',
  amendedBy: 'Amended by',
  noOrganFindings: 'No specific clinical findings recorded for this organ.',
  threeDNotSupportedNote: 'Interactive 3D anatomical viewer active. Use mouse or touch controls to manipulate the model.',

  consultationTitle: 'Consultation & Clinical Documentation',
  consultationSubtitle: 'Document examination findings, formulate diagnoses, and issue prescriptions.',
  selectPatientForConsult: 'Select Patient to Consult',
  chiefComplaintLabel: 'Presenting Chief Complaint *',
  clinicalExamLabel: 'Clinical Examination & Findings *',
  diagnosisLabel: 'Clinical Diagnosis / Assessment *',
  prescriptionsLabel: 'Prescriptions & Drug Regimen',
  addMedicineRow: '+ Add Medication',
  medicineName: 'Drug / Generic Name',
  dosage: 'Dosage',
  frequency: 'Frequency',
  duration: 'Duration',
  instructions: 'Special Instructions',
  testsRequestedLabel: 'Diagnostic Tests / Labs Ordered',
  followUpInstructionsLabel: 'Follow-up Advice & Patient Instructions',
  nextFollowUpDateLabel: 'Recommended Follow-up Date',
  saveAsDraftBtn: 'Save as Clinical Draft',
  finalizeConsultationBtn: 'Finalize & Sign Consultation',
  consultationHistoryTitle: 'Previous Documented Consultations',
  draftStatus: 'Draft Note',
  finalizedStatus: 'Signed & Finalized',
  finalizedNotice: 'Finalizing will sign this consultation note and append prescriptions to the patient record.',

  alertsTitle: 'Clinical Alerts & Notifications',
  alertsSubtitle: 'Critical vital alerts, abnormal diagnostic values, and unreviewed reports.',
  filterAllAlerts: 'All Alerts',
  filterUnacknowledged: 'Unacknowledged',
  filterCritical: 'Critical Only',
  demoDataBadge: 'DEMO DATA',
  markAcknowledged: 'Mark as Acknowledged',
  noAlertsFound: 'No clinical alerts in this category.',

  handoverTitle: 'Clinical Patient Handover',
  handoverSubtitle: 'Structured shift handover communicating changes, concerns, and pending tasks.',
  newHandoverNoteBtn: 'Create Shift Handover Note',
  shiftMorning: 'Morning Shift',
  shiftEvening: 'Evening Shift',
  shiftNight: 'Night Shift',
  recentChangesCol: 'Recent Clinical Changes',
  activeConcernsCol: 'Active Clinical Concerns',
  pendingReviewsCol: 'Pending Tests & Reviews',
  outstandingTasksCol: 'Outstanding Tasks',
  targetDoctorLabel: 'Relieving / Handover Doctor',
  markResolvedBtn: 'Mark Handover Completed',
  resolvedBadge: 'Handover Completed',
  pendingBadge: 'Active Attention Required',

  settingsTitle: 'Doctor Profile & Clinical Preferences',
  settingsSubtitle: 'Manage clinical credentials, consulting schedule, and notification thresholds.',
  doctorProfileSection: 'Physician Profile',
  consultingHours: 'OPD Consulting Hours',
  clinicalSpecialty: 'Primary Clinical Specialty',
  medicalLicense: 'State Medical Council Reg. No.',
};

export const doctorTranslationsHi: DoctorPortalTranslations = {
  portalName: 'ट्रेल्स डॉक्टर हब',
  portalSubtitle: 'नैदानिक मूल्यांकन एवं रोगी देखभाल कार्यक्षेत्र',
  badge: 'डॉक्टर पोर्टल',
  dashboard: 'क्लिनिकल डैशबोर्ड',
  smartQueue: 'स्मार्ट कतार',
  patientProfiles: 'रोगी प्रोफाइल',
  vitalsMonitoring: 'वाइटल्स और टेलीमेट्री',
  consultations: 'परामर्श',
  alerts: 'क्लिनिकल अलर्ट',
  patientHandover: 'रोगी हैंडओवर',
  settings: 'क्लिनिकल सेटिंग्स',
  signOut: 'साइन आउट',
  drName: 'डॉ. आरव शर्मा',
  drSpecialty: 'वरिष्ठ सलाहकार — कार्डियोलॉजी एवं इंटरनल मेडिसिन',
  activeHospital: 'ट्रेल्स अपोलो मेमोरियल अस्पताल (नई दिल्ली)',
  prototypeBannerNotice: 'क्लिनिकल कार्यक्षेत्र प्रोटोटाइप • चरण 4 सक्रिय',
  simulatedVitalsBadge: 'सिम्युलेटेड टेलीमेट्री',
  simulatedVitalsNotice: 'दिखाई गई टेलीमेट्री और वाइटल्स सिम्युलेटेड डेमो रीडिंग हैं। वे वास्तविक रोगी शरीर विज्ञान का प्रतिनिधित्व नहीं करते हैं।',

  dashTitle: 'डॉक्टर क्लिनिकल कार्यक्षेत्र',
  dashSubtitle: 'रोगी मूल्यांकन, टेलीमेट्री, स्मार्ट कतार ट्राइएज और परामर्श कार्यप्रवाह।',
  statAssignedPatients: 'कुल सौंपे गए रोगी',
  statEmergencyCases: 'आपातकालीन प्रवेश',
  statActiveConsultations: 'सक्रिय परामर्श',
  statAdmittedPatients: 'भर्ती रोगी (इनपेशेंट)',
  statUpcomingAppointments: 'आज के अपॉइंटमेंट',
  statPendingReviews: 'लंबित रिपोर्ट समीक्षाएं',
  shortcutsTitle: 'त्वरित क्लिनिकल शॉर्टकट',
  openSmartQueue: 'स्मार्ट कतार खोलें',
  searchPatientDirectory: 'रोगी प्रोफाइल खोजें',
  newConsultationWorkspace: 'नया परामर्श कार्यक्षेत्र',
  viewHandoverBoard: 'शिफ्ट हैंडओवर बोर्ड',
  activeAlertsSection: 'प्राथमिकता क्लिनिकल अलर्ट',
  acknowledgedText: 'स्वीकृत',
  acknowledgeBtn: 'स्वीकार करें',
  todayConsultationsTitle: 'आज के सौंपे गए परामर्श',

  smartQueueTitle: 'क्लिनिकल स्मार्ट कतार',
  smartQueueSubtitle: 'रीयल-टाइम ट्राइएज श्रेणियां, चेक-इन अंतराल और रोगी मूल्यांकन पहुंच।',
  waitingForConsultation: 'परामर्श के लिए प्रतीक्षारत रोगी',
  tokenNumber: 'टोकन सं.',
  patientCol: 'रोगी विवरण',
  checkInTimeCol: 'चेक-इन समय',
  triagePriorityCol: 'ट्राइएज प्राथमिकता',
  alertsCol: 'क्लिनिकल अलर्ट',
  actionsCol: 'कार्रवाई',
  openProfileBtn: 'वन-टैप प्रोफाइल',
  startConsultationBtn: 'परामर्श शुरू करें',
  markCompletedBtn: 'पूर्ण करें',
  allTriageFilter: 'सभी रोगी',
  criticalOnly: 'गंभीर / लाल',
  urgentOnly: 'अत्यावश्यक / पीला',
  routineOnly: 'नियमित / हरा',
  emergencyTriageNotice: 'दस्तावेजीकृत ट्राइएज श्रेणियों के साथ आपातकालीन मामलों को कतार में सबसे ऊपर प्राथमिकता दी जाती है।',

  profileTitle: 'रोगी क्लिनिकल प्रोफाइल',
  profileSubtitle: 'व्यापक कालानुक्रमिक मेडिकल रिकॉर्ड, टेलीमेट्री और 3D अंग इतिहास।',
  tabOverview: 'क्लिनिकल सारांश',
  tabVitalsAnd3D: 'वाइटल्स और 3D शरीर रचना',
  tabHistoryAndVisits: 'इतिहास और दौरे',
  tabDiagnosesAndMeds: 'निदान और नुस्खे',
  tabLabReports: 'डायग्नोस्टिक रिपोर्ट',
  tabDoctorNotes: 'डॉक्टर नोट्स',
  tabHealthDiary: 'रोगी स्वास्थ्य डायरी',
  tabHandover: 'हैंडओवर कार्य',
  admissionStatusLabel: 'देखभाल स्थिति',
  bedLabel: 'बेड / बे',
  allergiesAlert: 'ज्ञात एलर्जी',
  noKnownAllergies: 'कोई दवा एलर्जी दर्ज नहीं है।',
  patientHealthDiaryTitle: 'रोगी द्वारा रिपोर्ट की गई स्वास्थ्य डायरी',
  noDiaryNotes: 'अभी तक कोई रोगी स्वास्थ्य डायरी प्रविष्टि साझा नहीं की गई है।',
  severityLevel: 'गंभीरता स्तर',

  vitalsTitle: 'लाइव वाइटल्स एवं टेलीमेट्री ट्रेसिंग',
  vitalsSubtitle: 'सिम्युलेटेड मेडिकल वेवफॉर्म के साथ निरंतर मल्टी-पैरामीटर निगरानी स्ट्रीम।',
  simulatedDisclaimer: 'प्रोटोटाइप सूचना: नीचे दिखाए गए मान सिम्युलेटेड सिग्नल हैं और वास्तविक कोड अलार्म ट्रिगर नहीं करते हैं।',
  heartRateLabel: 'हृदय गति (Heart Rate)',
  spo2Label: 'ऑक्सीजन संतृप्ति (SpO₂)',
  bloodPressureLabel: 'रक्तचाप (BP)',
  respiratoryRateLabel: 'श्वसन दर (Respiratory Rate)',
  temperatureLabel: 'शरीर का तापमान',
  ecgStripTitle: 'निरंतर रिदम स्ट्रिप (Lead II)',
  ecgLiveLeadII: 'रीयल-टाइम टेलीमेट्री स्ट्रीम (सिम्युलेटेड)',
  bpm: 'बीपीएम',
  percent: '%',
  mmhg: 'मिमी एचजी',
  breathsMin: '/मिनट',
  farenheit: '°F',

  interactive3DTitle: 'इंटरैक्टिव 3D मानव शरीर रचना एवं अंग रिकॉर्ड',
  interactive3DSubtitle: 'अंग-विशिष्ट मेडिकल रिकॉर्ड देखने के लिए महत्वपूर्ण अंगों को घुमाएं, ज़ूम करें और चुनें।',
  rotateInstructions: '3D मॉडल को घुमाने के लिए ड्रैग करें • ज़ूम करने के लिए स्क्रॉल करें • रिकॉर्ड देखने के लिए अंग पर क्लिक करें',
  zoomIn: 'ज़ूम इन',
  zoomOut: 'ज़ूम आउट',
  resetView: 'दृश्य रीसेट करें',
  selectOrganPrompt: '3D मॉडल या नीचे दिए गए बटनों पर हृदय, फेफड़े, यकृत या गुर्दे पर क्लिक करें:',
  selectedOrganTitle: 'अंग क्लिनिकल इतिहास',
  organHeart: 'हृदय / कार्डियोवैस्कुलर',
  organLungs: 'फेफड़े / श्वसन',
  organLiver: 'यकृत (लिवर) / हेपेटिक',
  organKidneys: 'गुर्दे (किडनी) / रीनल',
  organDetailsFor: 'क्लिनिकल निष्कर्ष और रिपोर्ट:',
  organClinicalNotes: 'क्लिनिकल अवलोकन और इतिहास',
  organLabReports: 'सहसंबद्ध रिपोर्ट',
  addOrganFindingBtn: 'अंग खोज जोड़ें',
  amendFindingBtn: 'नोट संशोधित / सही करें',
  findingTitleLabel: 'निष्कर्ष सारांश / शीर्षक *',
  clinicalNoteLabel: 'क्लिनिकल अवलोकन और परीक्षा *',
  relatedReportLabel: 'सहसंबद्ध लैब या डायग्नोस्टिक रिपोर्ट',
  amendReasonLabel: 'संशोधन का क्लिनिकल कारण (ऑडिट किया गया) *',
  auditHistoryTitle: 'दस्तावेजीकृत संशोधन ऑडिट इतिहास',
  amendedBy: 'द्वारा संशोधित',
  noOrganFindings: 'इस अंग के लिए कोई विशिष्ट नैदानिक निष्कर्ष दर्ज नहीं है।',
  threeDNotSupportedNote: 'इंटरैक्टिव 3D एनाटोमिकल व्यूअर सक्रिय। मॉडल को घुमाने के लिए माउस या टच का उपयोग करें।',

  consultationTitle: 'परामर्श एवं क्लिनिकल दस्तावेज़ीकरण',
  consultationSubtitle: 'परीक्षा निष्कर्षों को दस्तावेज करें, निदान तैयार करें और नुस्खे जारी करें।',
  selectPatientForConsult: 'परामर्श के लिए रोगी चुनें',
  chiefComplaintLabel: 'मुख्य प्राथमिक समस्या *',
  clinicalExamLabel: 'क्लिनिकल परीक्षा और निष्कर्ष *',
  diagnosisLabel: 'क्लिनिकल निदान / मूल्यांकन *',
  prescriptionsLabel: 'दवाइयां और नुस्खे',
  addMedicineRow: '+ दवा जोड़ें',
  medicineName: 'दवा का नाम',
  dosage: 'खुराक',
  frequency: 'आवृत्ति',
  duration: 'अवधि',
  instructions: 'विशेष निर्देश',
  testsRequestedLabel: 'आदेशित डायग्नोस्टिक टेस्ट',
  followUpInstructionsLabel: 'अनुवर्ती सलाह और रोगी निर्देश',
  nextFollowUpDateLabel: 'अनुशंसित अनुवर्ती तिथि',
  saveAsDraftBtn: 'ड्राफ्ट के रूप में सहेजें',
  finalizeConsultationBtn: 'परामर्श को अंतिम रूप दें और हस्ताक्षर करें',
  consultationHistoryTitle: 'पिछले प्रलेखित परामर्श',
  draftStatus: 'ड्राफ्ट नोट',
  finalizedStatus: 'हस्ताक्षरित एवं अंतिम',
  finalizedNotice: 'अंतिम रूप देने से यह परामर्श नोट हस्ताक्षरित हो जाएगा और नुस्खे रोगी रिकॉर्ड में जुड़ जाएंगे।',

  alertsTitle: 'क्लिनिकल अलर्ट एवं सूचनाएं',
  alertsSubtitle: 'क्रिटिकल वाइटल्स अलर्ट, असामान्य डायग्नोस्टिक मान और असमीक्षित रिपोर्ट।',
  filterAllAlerts: 'सभी अलर्ट',
  filterUnacknowledged: 'अस्वीकृत (Unacknowledged)',
  filterCritical: 'केवल क्रिटिकल',
  demoDataBadge: 'डेमो डेटा',
  markAcknowledged: 'स्वीकृत के रूप में चिह्नित करें',
  noAlertsFound: 'इस श्रेणी में कोई क्लिनिकल अलर्ट नहीं है।',

  handoverTitle: 'क्लिनिकल रोगी हैंडओवर',
  handoverSubtitle: 'संरचित शिफ्ट हैंडओवर जो बदलावों, चिंताओं और लंबित कार्यों को संप्रेषित करता है।',
  newHandoverNoteBtn: 'नया शिफ्ट हैंडओवर नोट बनाएं',
  shiftMorning: 'सुबह की शिफ्ट',
  shiftEvening: 'शाम की शिफ्ट',
  shiftNight: 'रात की शिफ्ट',
  recentChangesCol: 'हाल के क्लिनिकल बदलाव',
  activeConcernsCol: 'सक्रिय क्लिनिकल चिंताएं',
  pendingReviewsCol: 'लंबित टेस्ट और समीक्षाएं',
  outstandingTasksCol: 'बकाया कार्य',
  targetDoctorLabel: 'हैंडओवर प्राप्तकर्ता डॉक्टर',
  markResolvedBtn: 'हैंडओवर पूर्ण चिह्नित करें',
  resolvedBadge: 'हैंडओवर पूर्ण',
  pendingBadge: 'सक्रिय ध्यान आवश्यक',

  settingsTitle: 'डॉक्टर प्रोफाइल एवं क्लिनिकल प्राथमिकताएं',
  settingsSubtitle: 'क्लिनिकल क्रेडेंशियल, परामर्श समय और अधिसूचना सीमाएं प्रबंधित करें।',
  doctorProfileSection: 'चिकित्सक प्रोफ़ाइल',
  consultingHours: 'ओपीडी परामर्श का समय',
  clinicalSpecialty: 'प्राथमिक क्लिनिकल विशेषता',
  medicalLicense: 'राज्य मेडिकल काउंसिल पंजीकरण संख्या',
};
