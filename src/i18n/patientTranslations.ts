export interface PatientPortalTranslations {
  // Navigation & Header
  portalName: string;
  portalSubtitle: string;
  badge: string;
  navDashboard: string;
  navQueue: string;
  navDoctorVisit: string;
  navRecords: string;
  navVitals: string;
  navAppointments: string;
  navMedications: string;
  navReports: string;
  navDiary: string;
  navHelp: string;
  navBilling: string;
  navProfile: string;
  signOut: string;
  languageToggle: string;
  welcomeBack: string;
  prototypeBannerNotice: string;
  emergencyGuidanceNotice: string;

  // 6 Main Actions (Dashboard Tiles)
  actionQueueTitle: string;
  actionQueueDesc: string;
  actionDoctorVisitTitle: string;
  actionDoctorVisitDesc: string;
  actionReportsTitle: string;
  actionReportsDesc: string;
  actionDiaryTitle: string;
  actionDiaryDesc: string;
  actionAppointmentsTitle: string;
  actionAppointmentsDesc: string;
  actionHelpTitle: string;
  actionHelpDesc: string;

  // Dashboard Header Cards
  nextAppointmentCardTitle: string;
  queueStatusCardTitle: string;
  tokenNumber: string;
  estimatedWait: string;
  patientsAhead: string;
  doctorInRoom: string;
  noActiveQueue: string;
  noUpcomingAppointments: string;

  // Live Queue Status Page
  queuePageTitle: string;
  queuePageSubtitle: string;
  yourTokenNumber: string;
  currentQueueStatus: string;
  statusWaiting: string;
  statusInConsult: string;
  statusDone: string;
  assignedConsultant: string;
  department: string;
  checkInTime: string;
  positionInLine: string;
  lastUpdated: string;
  queueAdvice: string;

  // Doctor Visit Status Page
  visitPageTitle: string;
  visitPageSubtitle: string;
  inpatientNote: string;
  consultantRounds: string;
  scheduledTime: string;
  visitStatus: string;
  statusUpcoming: string;
  statusInProgress: string;
  statusCompleted: string;
  statusDelayed: string;
  roundDetails: string;

  // My Medical Records Page
  recordsPageTitle: string;
  recordsPageSubtitle: string;
  tabHistory: string;
  tabDiagnoses: string;
  tabPrescriptions: string;
  tabReports: string;
  tabDoctorNotes: string;
  plainLanguageDisclaimer: string;
  allergiesSectionTitle: string;
  noAllergiesRecorded: string;
  activeConditions: string;
  prescribedMeds: string;
  previousVisits: string;
  attendingPhysician: string;

  // My Vitals Page
  vitalsPageTitle: string;
  vitalsPageSubtitle: string;
  vitalsDisclaimer: string;
  heartRate: string;
  oxygenLevel: string;
  bloodPressure: string;
  bodyTemp: string;
  measurementSource: string;
  readingStatusNormal: string;
  readingStatusElevated: string;

  // Appointments Page
  appointmentsPageTitle: string;
  appointmentsPageSubtitle: string;
  upcomingListTitle: string;
  pastListTitle: string;
  dateTime: string;
  consultingDoctor: string;
  consultationType: string;
  appointmentStatus: string;
  requestCancellationBtn: string;
  cancelSuccessNotice: string;
  cannotCancelNotice: string;

  // Medication Reminders Page
  medicationsPageTitle: string;
  medicationsPageSubtitle: string;
  medsNotice: string;
  medName: string;
  dosage: string;
  frequency: string;
  timing: string;
  specialInstructions: string;
  markAsTakenBtn: string;
  takenTodayBadge: string;
  dueTodayBadge: string;

  // Test Reports Page
  reportsPageTitle: string;
  reportsPageSubtitle: string;
  availableReportsTitle: string;
  pendingReportsTitle: string;
  downloadReportBtn: string;
  viewDetailsBtn: string;
  pendingNotice: string;
  doctorRemarks: string;

  // Call for Help Page
  helpPageTitle: string;
  helpPageSubtitle: string;
  helpBannerWarning: string;
  urgentNoticeLifeThreat: string;
  assistanceCategoryLabel: string;
  catNurse: string;
  catPain: string;
  catWater: string;
  catDiscomfort: string;
  urgencyLabel: string;
  urgencyRoutine: string;
  urgencyImmediate: string;
  sendHelpRequestBtn: string;
  requestSentSuccess: string;
  activeRequestsTitle: string;
  requestStatusPending: string;
  requestStatusAcknowledged: string;
  requestStatusResolved: string;

  // My Health Diary Page
  diaryPageTitle: string;
  diaryPageSubtitle: string;
  diaryNotice: string;
  addNoteBtn: string;
  symptomsPlaceholder: string;
  activityPlaceholder: string;
  severityLabel: string;
  saveDiaryNoteBtn: string;
  sharedWithDoctorBadge: string;
  noDiaryEntries: string;

  // Notifications Page
  notifPageTitle: string;
  notifPageSubtitle: string;
  markAllAsRead: string;
  noNotifications: string;

  // Billing and Discharge Page
  billingPageTitle: string;
  billingPageSubtitle: string;
  tabBills: string;
  tabDischarge: string;
  demoBillingNotice: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalPayable: string;
  paymentStatus: string;
  statusPaid: string;
  statusPending: string;
  dischargeDate: string;
  finalDiagnosis: string;
  dischargeMedications: string;
  followUpPlan: string;
  dietAndLifestyle: string;
  emergencyWarnings: string;

  // Profile Page
  profilePageTitle: string;
  profilePageSubtitle: string;
  personalDetails: string;
  contactDetails: string;
  emergencyContact: string;
  fullName: string;
  ageAndGender: string;
  phone: string;
  email: string;
  address: string;
  contactName: string;
  relationship: string;
  saveProfileChanges: string;
}

export const patientTranslationsEn: PatientPortalTranslations = {
  portalName: 'Trails Patient Hub',
  portalSubtitle: 'Personal Health Records & Care Tracking',
  badge: 'Patient Portal',
  navDashboard: 'Home',
  navQueue: 'Queue Status',
  navDoctorVisit: 'Doctor Visit',
  navRecords: 'My Records',
  navVitals: 'My Vitals',
  navAppointments: 'Appointments',
  navMedications: 'Medication Reminders',
  navReports: 'Test Reports',
  navDiary: 'Health Diary',
  navHelp: 'Call for Help',
  navBilling: 'Billing & Discharge',
  navProfile: 'Profile & Settings',
  signOut: 'Sign Out',
  languageToggle: 'हिंदी में देखें',
  welcomeBack: 'Welcome back,',
  prototypeBannerNotice: 'Patient Portal Prototype • Simplified Accessible Interface',
  emergencyGuidanceNotice: 'Emergency Alert: For chest pain, difficulty breathing, or severe sudden symptoms, seek emergency care immediately. Do not rely on app messages.',

  actionQueueTitle: 'Queue Status',
  actionQueueDesc: 'Check your real-time token and lobby wait position.',
  actionDoctorVisitTitle: 'Doctor Visit Status',
  actionDoctorVisitDesc: 'Track ward rounds and upcoming doctor checks.',
  actionReportsTitle: 'My Test Reports',
  actionReportsDesc: 'View and download verified lab & diagnostic results.',
  actionDiaryTitle: 'My Health Diary',
  actionDiaryDesc: 'Log how you feel today to share with your doctor.',
  actionAppointmentsTitle: 'My Appointments',
  actionAppointmentsDesc: 'Review scheduled visits or request changes.',
  actionHelpTitle: 'Call for Help',
  actionHelpDesc: 'Request staff assistance for water, pain, or support.',

  nextAppointmentCardTitle: 'Next Upcoming Appointment',
  queueStatusCardTitle: 'Live OPD Queue Status',
  tokenNumber: 'Token #',
  estimatedWait: 'Est. Wait',
  patientsAhead: 'Patients Ahead',
  doctorInRoom: 'Doctor in Consultation',
  noActiveQueue: 'No active queue ticket today.',
  noUpcomingAppointments: 'No upcoming appointments scheduled.',

  queuePageTitle: 'Live Queue & Waiting Status',
  queuePageSubtitle: 'Track your consultation token and lobby position in real time.',
  yourTokenNumber: 'Your Token Number',
  currentQueueStatus: 'Queue Status',
  statusWaiting: 'Waiting in Lobby',
  statusInConsult: 'In Consultation Room',
  statusDone: 'Consultation Completed',
  assignedConsultant: 'Consulting Doctor',
  department: 'Department',
  checkInTime: 'Check-in Time',
  positionInLine: 'Position in Line',
  lastUpdated: 'Last Updated',
  queueAdvice: 'Please remain near OPD Room 4. You will be called as soon as your token appears.',

  visitPageTitle: 'Doctor Visit Status',
  visitPageSubtitle: 'Scheduled hospital rounds and bedside assessments for patients.',
  inpatientNote: 'This tracker shows expected rounds for observation and ward patients.',
  consultantRounds: 'Consultant Clinical Rounds',
  scheduledTime: 'Estimated Time',
  visitStatus: 'Visit Status',
  statusUpcoming: 'Upcoming as Scheduled',
  statusInProgress: 'Doctor Currently on Floor',
  statusCompleted: 'Visit Completed Today',
  statusDelayed: 'Delayed due to Emergency Care',
  roundDetails: 'Round Details & Purpose',

  recordsPageTitle: 'My Medical Records',
  recordsPageSubtitle: 'Plain-language view of your verified clinical history, diagnoses, and visits.',
  tabHistory: 'Visit History',
  tabDiagnoses: 'Diagnoses',
  tabPrescriptions: 'Prescriptions',
  tabReports: 'Lab Reports',
  tabDoctorNotes: 'Doctor Notes',
  plainLanguageDisclaimer: 'Medical records are preserved exactly as authorized by your physician. Contact hospital staff if you have questions about your clinical notes.',
  allergiesSectionTitle: 'Known Allergies on File',
  noAllergiesRecorded: 'No known drug allergies reported.',
  activeConditions: 'Documented Health Conditions',
  prescribedMeds: 'Prescribed Medications',
  previousVisits: 'Previous Hospital Visits',
  attendingPhysician: 'Attending Physician',

  vitalsPageTitle: 'My Health Vitals',
  vitalsPageSubtitle: 'Recent physiological readings recorded during your visits.',
  vitalsDisclaimer: 'Prototype notice: Values shown are demonstration data and do not represent continuous real-time telemetry or active home monitoring.',
  heartRate: 'Heart Rate',
  oxygenLevel: 'Oxygen Level (SpO₂)',
  bloodPressure: 'Blood Pressure',
  bodyTemp: 'Body Temperature',
  measurementSource: 'Measurement Source',
  readingStatusNormal: 'Healthy Standard Range',
  readingStatusElevated: 'Needs Attention / Review',

  appointmentsPageTitle: 'My Appointments',
  appointmentsPageSubtitle: 'View scheduled outpatient appointments, timing, and clinic rooms.',
  upcomingListTitle: 'Upcoming Appointments',
  pastListTitle: 'Past Appointment History',
  dateTime: 'Date & Time',
  consultingDoctor: 'Consulting Doctor',
  consultationType: 'Consultation Type',
  appointmentStatus: 'Status',
  requestCancellationBtn: 'Cancel Appointment',
  cancelSuccessNotice: 'Appointment cancelled. You can reschedule anytime by contacting staff.',
  cannotCancelNotice: 'Appointments within 2 hours cannot be cancelled online.',

  medicationsPageTitle: 'Medication Reminders',
  medicationsPageSubtitle: 'Doctor-prescribed daily medication schedule and dosage instructions.',
  medsNotice: 'Always take medications exactly as instructed by your doctor. Never change dosages without consulting your physician.',
  medName: 'Medicine Name',
  dosage: 'Dosage',
  frequency: 'Frequency',
  timing: 'Scheduled Time',
  specialInstructions: 'Instructions',
  markAsTakenBtn: 'Mark as Taken',
  takenTodayBadge: 'Taken Today',
  dueTodayBadge: 'Due Today',

  reportsPageTitle: 'Diagnostic Test Reports',
  reportsPageSubtitle: 'Laboratory and diagnostic test results authorized by hospital clinicians.',
  availableReportsTitle: 'Available Reports',
  pendingReportsTitle: 'Pending Lab Orders',
  downloadReportBtn: 'Download PDF Report',
  viewDetailsBtn: 'View Results Summary',
  pendingNotice: 'This test is currently being processed by the pathology lab. Results will appear automatically once reviewed by the doctor.',
  doctorRemarks: 'Doctor Interpretation',

  helpPageTitle: 'Call for Help & Assistance',
  helpPageSubtitle: 'Request quick non-emergency assistance from hospital and ward staff.',
  helpBannerWarning: 'For life-threatening emergencies, alert nearby staff immediately or call 112 / emergency services. Do not wait for an app response.',
  urgentNoticeLifeThreat: 'Do not use this form for sudden chest pain, severe shortness of breath, or collapse.',
  assistanceCategoryLabel: 'What do you need help with? *',
  catNurse: 'Nurse Assistance (Bedside / Mobility)',
  catPain: 'Pain Relief / Medication Check',
  catWater: 'Drinking Water / Refreshment',
  catDiscomfort: 'General Discomfort / Feeling Unwell',
  urgencyLabel: 'Urgency Level *',
  urgencyRoutine: 'Routine (Within 10-15 mins)',
  urgencyImmediate: 'Urgent (Please attend quickly)',
  sendHelpRequestBtn: 'Send Assistance Request',
  requestSentSuccess: 'Assistance request logged! Hospital floor staff have been alerted to your location.',
  activeRequestsTitle: 'Recent Assistance Requests',
  requestStatusPending: 'Request Pending',
  requestStatusAcknowledged: 'Staff On the Way',
  requestStatusResolved: 'Request Completed',

  diaryPageTitle: 'My Health Diary',
  diaryPageSubtitle: 'Keep a personal record of daily symptoms to share with your doctor during visits.',
  diaryNotice: 'Your health diary is private. Entries marked shared will be securely visible to your treating doctor during consultations.',
  addNoteBtn: '+ Add New Diary Entry',
  symptomsPlaceholder: 'How are you feeling right now? (e.g. Mild headache at 3 PM, felt dizzy after walking)',
  activityPlaceholder: 'What were you doing or what did you eat? (e.g. After breakfast, took morning medicine)',
  severityLabel: 'Discomfort Level (1 = Very mild, 5 = Severe)',
  saveDiaryNoteBtn: 'Save Entry to Diary',
  sharedWithDoctorBadge: 'Shared with Doctor',
  noDiaryEntries: 'No diary entries recorded yet. Tap the button above to add your first note.',

  notifPageTitle: 'Notifications & Updates',
  notifPageSubtitle: 'Important updates regarding appointments, test results, and hospital visits.',
  markAllAsRead: 'Mark all as read',
  noNotifications: 'You have no new notifications.',

  billingPageTitle: 'Billing & Discharge',
  billingPageSubtitle: 'Review hospital invoices, payment receipts, and discharge documentation.',
  tabBills: 'Invoices & Receipts',
  tabDischarge: 'Discharge Summary',
  demoBillingNotice: 'Demonstration Prototype Notice: Billing and invoices shown below are simulated examples for platform review. No real monetary transactions are processed.',
  invoiceNumber: 'Invoice #',
  invoiceDate: 'Date',
  totalPayable: 'Total Amount',
  paymentStatus: 'Payment Status',
  statusPaid: 'Paid in Full',
  statusPending: 'Payment Pending',
  dischargeDate: 'Discharge Date',
  finalDiagnosis: 'Final Clinical Diagnosis',
  dischargeMedications: 'Discharge Medications',
  followUpPlan: 'Follow-Up Instructions',
  dietAndLifestyle: 'Dietary & Physical Guidance',
  emergencyWarnings: 'When to Seek Immediate Care',

  profilePageTitle: 'Patient Profile & Contacts',
  profilePageSubtitle: 'View and verify your registered personal details and emergency contacts.',
  personalDetails: 'Personal Demographics',
  contactDetails: 'Contact Information',
  emergencyContact: 'Emergency Contact Person',
  fullName: 'Full Name',
  ageAndGender: 'Age & Gender',
  phone: 'Contact Phone Number',
  email: 'Email Address',
  address: 'Residential Address',
  contactName: 'Contact Person Name',
  relationship: 'Relationship',
  saveProfileChanges: 'Update Details',
};

export const patientTranslationsHi: PatientPortalTranslations = {
  portalName: 'ट्रेल्स रोगी हब',
  portalSubtitle: 'व्यक्तिगत स्वास्थ्य रिकॉर्ड और देखभाल ट्रैकिंग',
  badge: 'रोगी पोर्टल',
  navDashboard: 'होम',
  navQueue: 'कतार स्थिति',
  navDoctorVisit: 'डॉक्टर का दौरा',
  navRecords: 'मेरे रिकॉर्ड',
  navVitals: 'मेरे वाइटल्स',
  navAppointments: 'अपॉइंटमेंट',
  navMedications: 'दवा रिमाइंडर',
  navReports: 'टेस्ट रिपोर्ट',
  navDiary: 'स्वास्थ्य डायरी',
  navHelp: 'मदद के लिए कॉल',
  navBilling: 'बिलिंग एवं डिस्चार्ज',
  navProfile: 'प्रोफाइल एवं सेटिंग्स',
  signOut: 'साइन आउट',
  languageToggle: 'Switch to English',
  welcomeBack: 'स्वागत है,',
  prototypeBannerNotice: 'रोगी पोर्टल प्रोटोटाइप • सरल एवं सुलभ इंटरफेस',
  emergencyGuidanceNotice: 'आपातकालीन चेतावनी: सीने में दर्द, सांस लेने में तकलीफ या अचानक गंभीर लक्षणों के लिए तुरंत आपातकालीन सहायता लें। ऐप संदेशों पर निर्भर न रहें।',

  actionQueueTitle: 'कतार स्थिति',
  actionQueueDesc: 'अपना लाइव टोकन नंबर और कतार स्थिति जांचें।',
  actionDoctorVisitTitle: 'डॉक्टर का दौरा',
  actionDoctorVisitDesc: 'वार्ड राउंड और डॉक्टर चेक-अप की स्थिति ट्रैक करें।',
  actionReportsTitle: 'मेरी टेस्ट रिपोर्ट',
  actionReportsDesc: 'सत्यापित लैब और डायग्नोस्टिक रिपोर्ट देखें और डाउनलोड करें।',
  actionDiaryTitle: 'स्वास्थ्य डायरी',
  actionDiaryDesc: 'डॉक्टर के साथ साझा करने के लिए अपने लक्षण दर्ज करें।',
  actionAppointmentsTitle: 'मेरे अपॉइंटमेंट',
  actionAppointmentsDesc: 'निर्धारित विज़िट देखें या बदलाव का अनुरोध करें।',
  actionHelpTitle: 'मदद के लिए कॉल',
  actionHelpDesc: 'पानी, दर्द या सहायता के लिए अस्पताल स्टाफ से मदद मांगें।',

  nextAppointmentCardTitle: 'अगला निर्धारित अपॉइंटमेंट',
  queueStatusCardTitle: 'लाइव ओपीडी कतार स्थिति',
  tokenNumber: 'टोकन सं.',
  estimatedWait: 'अनुमानित समय',
  patientsAhead: 'आगे रोगी',
  doctorInRoom: 'डॉक्टर परामर्श कक्ष में',
  noActiveQueue: 'आज कोई सक्रिय कतार टोकन नहीं है।',
  noUpcomingAppointments: 'कोई आगामी अपॉइंटमेंट निर्धारित नहीं है।',

  queuePageTitle: 'लाइव कतार एवं प्रतीक्षा स्थिति',
  queuePageSubtitle: 'रीयल-टाइम में अपने परामर्श टोकन और लॉबी स्थिति को ट्रैक करें।',
  yourTokenNumber: 'आपका टोकन नंबर',
  currentQueueStatus: 'कतार स्थिति',
  statusWaiting: 'प्रतीक्षालय में प्रतीक्षारत',
  statusInConsult: 'परामर्श कक्ष में',
  statusDone: 'परामर्श पूर्ण हुआ',
  assignedConsultant: 'परामर्श डॉक्टर',
  department: 'विभाग',
  checkInTime: 'चेक-इन समय',
  positionInLine: 'कतार में स्थिति',
  lastUpdated: 'अंतिम अपडेट',
  queueAdvice: 'कृपया ओपीडी कमरा नंबर 4 के पास रहें। जैसे ही आपका टोकन स्क्रीन पर आएगा, आपको बुलाया जाएगा।',

  visitPageTitle: 'डॉक्टर विज़िट स्थिति',
  visitPageSubtitle: 'रोगियों के लिए निर्धारित अस्पताल राउंड और बेडसाइड चेक।',
  inpatientNote: 'यह ट्रैकर भर्ती और अवलोकन वाले मरीजों के लिए डॉक्टर राउंड दिखाता है।',
  consultantRounds: 'कंसल्टेंट क्लिनिकल राउंड',
  scheduledTime: 'अनुमानित समय',
  visitStatus: 'विज़िट स्थिति',
  statusUpcoming: 'निर्धारित समय के अनुसार आगामी',
  statusInProgress: 'डॉक्टर वर्तमान में वार्ड में हैं',
  statusCompleted: 'आज का चेक-अप पूर्ण',
  statusDelayed: 'आपातकालीन देखभाल के कारण विलंबित',
  roundDetails: 'राउंड विवरण एवं उद्देश्य',

  recordsPageTitle: 'मेरे मेडिकल रिकॉर्ड',
  recordsPageSubtitle: 'आपके सत्यापित नैदानिक इतिहास, निदान और दौरों का सरल दृश्य।',
  tabHistory: 'दौरा इतिहास',
  tabDiagnoses: 'निदान',
  tabPrescriptions: 'नुस्खे (दवाइयां)',
  tabReports: 'लैब रिपोर्ट',
  tabDoctorNotes: 'डॉक्टर नोट्स',
  plainLanguageDisclaimer: 'मेडिकल रिकॉर्ड आपके डॉक्टर द्वारा अधिकृत किए गए रूप में सुरक्षित हैं। किसी भी प्रश्न के लिए स्टाफ से संपर्क करें।',
  allergiesSectionTitle: 'फ़ाइल पर ज्ञात एलर्जी',
  noAllergiesRecorded: 'कोई ज्ञात दवा एलर्जी दर्ज नहीं है।',
  activeConditions: 'दस्तावेजीकृत स्वास्थ्य स्थितियां',
  prescribedMeds: 'निर्धारित दवाइयां',
  previousVisits: 'पिछले अस्पताल दौरे',
  attendingPhysician: 'उपस्थित चिकित्सक',

  vitalsPageTitle: 'मेरे स्वास्थ्य वाइटल्स',
  vitalsPageSubtitle: 'अस्पताल के दौरों के दौरान दर्ज की गई शारीरिक रीडिंग।',
  vitalsDisclaimer: 'प्रोटोटाइप सूचना: दिखाए गए मान प्रदर्शन डेटा हैं और लाइव आपातकालीन निगरानी का प्रतिनिधित्व नहीं करते हैं।',
  heartRate: 'हृदय गति (Heart Rate)',
  oxygenLevel: 'ऑक्सीजन स्तर (SpO₂)',
  bloodPressure: 'रक्तचाप (Blood Pressure)',
  bodyTemp: 'शरीर का तापमान',
  measurementSource: 'माप स्रोत',
  readingStatusNormal: 'सामान्य स्वस्थ सीमा',
  readingStatusElevated: 'समीक्षा आवश्यक',

  appointmentsPageTitle: 'मेरे अपॉइंटमेंट',
  appointmentsPageSubtitle: 'ओपीडी नियुक्तियां, समय और क्लिनिक कमरे देखें।',
  upcomingListTitle: 'आगामी अपॉइंटमेंट',
  pastListTitle: 'पिछला इतिहास',
  dateTime: 'दिनांक एवं समय',
  consultingDoctor: 'परामर्श डॉक्टर',
  consultationType: 'परामर्श प्रकार',
  appointmentStatus: 'स्थिति',
  requestCancellationBtn: 'अपॉइंटमेंट रद्द करें',
  cancelSuccessNotice: 'अपॉइंटमेंट रद्द कर दिया गया। आप स्टाफ से संपर्क करके फिर से बुक कर सकते हैं।',
  cannotCancelNotice: '2 घंटे के भीतर के अपॉइंटमेंट ऑनलाइन रद्द नहीं किए जा सकते।',

  medicationsPageTitle: 'दवा रिमाइंडर',
  medicationsPageSubtitle: 'डॉक्टर द्वारा निर्धारित दैनिक दवा कार्यक्रम और निर्देश।',
  medsNotice: 'हमेशा अपने डॉक्टर के निर्देशानुसार दवा लें। डॉक्टर से पूछे बिना खुराक न बदलें।',
  medName: 'दवा का नाम',
  dosage: 'खुराक',
  frequency: 'आवृत्ति',
  timing: 'निर्धारित समय',
  specialInstructions: 'विशेष निर्देश',
  markAsTakenBtn: 'दवा ले ली',
  takenTodayBadge: 'आज ले ली गई',
  dueTodayBadge: 'लेना बाकी है',

  reportsPageTitle: 'डायग्नोस्टिक टेस्ट रिपोर्ट',
  reportsPageSubtitle: 'अस्पताल चिकित्सकों द्वारा अधिकृत प्रयोगशाला एवं परीक्षण परिणाम।',
  availableReportsTitle: 'उपलब्ध रिपोर्ट',
  pendingReportsTitle: 'प्रक्रियाधीन टेस्ट',
  downloadReportBtn: 'पीडीएफ रिपोर्ट डाउनलोड करें',
  viewDetailsBtn: 'परिणाम सारांश देखें',
  pendingNotice: 'यह टेस्ट वर्तमान में पैथोलॉजी लैब द्वारा प्रोसेस किया जा रहा है। डॉक्टर द्वारा समीक्षा किए जाने पर परिणाम दिखाई देंगे।',
  doctorRemarks: 'डॉक्टर की राय',

  helpPageTitle: 'मदद के लिए कॉल एवं सहायता',
  helpPageSubtitle: 'अस्पताल और वार्ड स्टाफ से त्वरित गैर-आपातकालीन सहायता मांगें।',
  helpBannerWarning: 'जानलेवा आपात स्थिति के लिए तुरंत नजदीकी स्टाफ को सूचित करें या आपातकालीन सेवा को कॉल करें। ऐप प्रतिक्रिया का इंतजार न करें।',
  urgentNoticeLifeThreat: 'सीने में अचानक दर्द, अत्यधिक सांस फूलने या बेहोशी के लिए इस फॉर्म का उपयोग न करें।',
  assistanceCategoryLabel: 'आपको किस सहायता की आवश्यकता है? *',
  catNurse: 'नर्स सहायता (बेडसाइड / चलने-फिरने में)',
  catPain: 'दर्द से राहत / दवा जांच',
  catWater: 'पीने का पानी / जलपान',
  catDiscomfort: 'सामान्य अस्वस्थता / चक्कर आना',
  urgencyLabel: 'तात्कालिकता का स्तर *',
  urgencyRoutine: 'सामान्य (10-15 मिनट में)',
  urgencyImmediate: 'अत्यावश्यक (कृपया जल्दी आएं)',
  sendHelpRequestBtn: 'सहायता अनुरोध भेजें',
  requestSentSuccess: 'सहायता अनुरोध दर्ज किया गया! स्टाफ को आपके स्थान के बारे में सूचित कर दिया गया है।',
  activeRequestsTitle: 'हाल के सहायता अनुरोध',
  requestStatusPending: 'अनुरोध लंबित',
  requestStatusAcknowledged: 'स्टाफ आ रहा है',
  requestStatusResolved: 'अनुरोध पूर्ण हुआ',

  diaryPageTitle: 'मेरी स्वास्थ्य डायरी',
  diaryPageSubtitle: 'डॉक्टर के साथ साझा करने के लिए दैनिक लक्षणों का व्यक्तिगत रिकॉर्ड रखें।',
  diaryNotice: 'आपकी स्वास्थ्य डायरी निजी है। साझा की गई प्रविष्टियां आपके डॉक्टर को परामर्श के दौरान दिखाई देंगी।',
  addNoteBtn: '+ नई डायरी प्रविष्टि जोड़ें',
  symptomsPlaceholder: 'आप अभी कैसा महसूस कर रहे हैं? (उदा. दोपहर 3 बजे हल्का सिरदर्द हुआ, चलने के बाद चक्कर आया)',
  activityPlaceholder: 'आप क्या कर रहे थे या आपने क्या खाया था? (उदा. नाश्ते के बाद सुबह की दवा ली)',
  severityLabel: 'कष्ट का स्तर (1 = बहुत हल्का, 5 = गंभीर)',
  saveDiaryNoteBtn: 'डायरी में सहेजें',
  sharedWithDoctorBadge: 'डॉक्टर के साथ साझा',
  noDiaryEntries: 'अभी तक कोई डायरी प्रविष्टि नहीं है। नया नोट जोड़ने के लिए ऊपर दिए गए बटन को दबाएं।',

  notifPageTitle: 'सूचनाएं एवं अपडेट',
  notifPageSubtitle: 'अपॉइंटमेंट, टेस्ट परिणामों और अस्पताल दौरों से संबंधित अपडेट।',
  markAllAsRead: 'सभी को पढ़ा हुआ चिह्नित करें',
  noNotifications: 'आपके पास कोई नई सूचना नहीं है।',

  billingPageTitle: 'बिलिंग एवं डिस्चार्ज',
  billingPageSubtitle: 'अस्पताल के चालान, भुगतान रसीदें और डिस्चार्ज सारांश देखें।',
  tabBills: 'चालान एवं रसीदें',
  tabDischarge: 'डिस्चार्ज सारांश',
  demoBillingNotice: 'प्रोटोटाइप सूचना: नीचे दिखाए गए बिल और चालान डेमो उदाहरण हैं। कोई वास्तविक मौद्रिक लेन-देन नहीं होता है।',
  invoiceNumber: 'चालान सं.',
  invoiceDate: 'दिनांक',
  totalPayable: 'कुल राशि',
  paymentStatus: 'भुगतान स्थिति',
  statusPaid: 'पूर्ण भुगतान',
  statusPending: 'भुगतान लंबित',
  dischargeDate: 'डिस्चार्ज तिथि',
  finalDiagnosis: 'अंतिम नैदानिक निदान',
  dischargeMedications: 'डिस्चार्ज दवाइयां',
  followUpPlan: 'अनुवर्ती निर्देश',
  dietAndLifestyle: 'आहार एवं शारीरिक सलाह',
  emergencyWarnings: 'तत्काल देखभाल कब लें',

  profilePageTitle: 'रोगी प्रोफ़ाइल एवं संपर्क',
  profilePageSubtitle: 'अपने पंजीकृत व्यक्तिगत विवरण और आपातकालीन संपर्कों की समीक्षा करें।',
  personalDetails: 'व्यक्तिगत जनसांख्यिकी',
  contactDetails: 'संपर्क विवरण',
  emergencyContact: 'आपातकालीन संपर्क व्यक्ति',
  fullName: 'पूरा नाम',
  ageAndGender: 'उम्र एवं लिंग',
  phone: 'संपर्क फ़ोन नंबर',
  email: 'ईमेल पता',
  address: 'निवास का पता',
  contactName: 'संपर्क व्यक्ति का नाम',
  relationship: 'संबंध',
  saveProfileChanges: 'विवरण अपडेट करें',
};
