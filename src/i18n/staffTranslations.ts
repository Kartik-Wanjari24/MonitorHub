export interface StaffPortalTranslations {
  // Navigation & Shell
  portalName: string;
  portalSubtitle: string;
  badge: string;
  dashboard: string;
  patientRegistration: string;
  patientRecords: string;
  appointments: string;
  queueManagement: string;
  emergencyCases: string;
  notifications: string;
  settings: string;
  logout: string;
  viewPublicSite: string;
  roleSwitcher: string;
  roleReceptionist: string;
  roleCompounder: string;
  roleReceptionistBadge: string;
  roleCompounderBadge: string;
  roleNotice: string;
  demoModeBadge: string;
  unreadCount: string;

  // Common UI
  search: string;
  filter: string;
  all: string;
  status: string;
  actions: string;
  viewDetails: string;
  edit: string;
  save: string;
  cancel: string;
  close: string;
  confirm: string;
  refresh: string;
  patientId: string;
  name: string;
  age: string;
  gender: string;
  contact: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  priority: string;
  normal: string;
  urgent: string;
  critical: string;
  success: string;
  error: string;
  loading: string;
  noData: string;

  // Dashboard
  dashTitle: string;
  dashSubtitle: string;
  statTotalPatients: string;
  statTodayReg: string;
  statTodayApt: string;
  statEmergencyCases: string;
  quickActions: string;
  quickRegPatient: string;
  quickEmergencyReg: string;
  quickFindPatient: string;
  quickNewApt: string;
  recentRegistrations: string;
  viewAllPatients: string;
  upcomingAppointments: string;
  viewAllAppointments: string;
  liveQueueSummary: string;
  viewFullQueue: string;
  activeEmergenciesAlert: string;
  activeEmergenciesAlertDesc: string;
  jumpToEmergency: string;

  // Patient Registration
  regTitle: string;
  regSubtitle: string;
  modeNormal: string;
  modeEmergency: string;
  modeNormalDesc: string;
  modeEmergencyDesc: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  ageLabel: string;
  agePlaceholder: string;
  genderLabel: string;
  genderMale: string;
  genderFemale: string;
  genderOther: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  emergencyContactNameLabel: string;
  emergencyContactNamePlaceholder: string;
  emergencyContactRelLabel: string;
  emergencyContactRelPlaceholder: string;
  emergencyContactPhoneLabel: string;
  emergencyContactPhonePlaceholder: string;
  chiefComplaintLabel: string;
  chiefComplaintPlaceholder: string;
  initialPriorityLabel: string;
  assignedDoctorLabel: string;
  selectDoctorPlaceholder: string;
  duplicateWarningTitle: string;
  duplicateWarningDesc: string;
  duplicateMatchFound: string;
  proceedAnyway: string;
  useExistingPatient: string;
  submitRegistration: string;
  submitEmergencyIntake: string;
  regSuccessTitle: string;
  regSuccessDesc: string;
  emergencyRegNotice: string;
  fieldRequired: string;
  invalidPhone: string;
  invalidEmail: string;

  // Patient Records
  recordsTitle: string;
  recordsSubtitle: string;
  searchPlaceholder: string;
  filterAll: string;
  filterNormal: string;
  filterEmergency: string;
  filterProvisional: string;
  totalRecordsCount: string;
  registeredOn: string;
  provisionalBadge: string;
  demographicsTab: string;
  visitsTab: string;
  diagnosesTab: string;
  prescriptionsTab: string;
  labReportsTab: string;
  notesTab: string;
  scheduleAptForPatient: string;
  addToQueueForPatient: string;
  completeRecordBtn: string;
  completeRecordTitle: string;
  allergiesLabel: string;
  noAllergiesRecorded: string;
  noVisitsRecorded: string;
  noDiagnosesRecorded: string;
  noPrescriptionsRecorded: string;
  noLabReportsRecorded: string;
  noDoctorNotesRecorded: string;
  sensitiveClinicalNotice: string;

  // Appointments
  aptTitle: string;
  aptSubtitle: string;
  newAppointmentBtn: string;
  aptFilterDate: string;
  aptFilterStatus: string;
  aptScheduled: string;
  aptCheckedIn: string;
  aptCompleted: string;
  aptCancelled: string;
  aptDelayed: string;
  checkInBtn: string;
  rescheduleBtn: string;
  cancelBtn: string;
  selectPatientLabel: string;
  selectPatientPlaceholder: string;
  aptDateLabel: string;
  aptTimeLabel: string;
  aptTypeLabel: string;
  aptNotesLabel: string;
  aptNotesPlaceholder: string;
  conflictWarningTitle: string;
  conflictWarningDesc: string;
  confirmCancelTitle: string;
  confirmCancelDesc: string;
  confirmCheckInTitle: string;
  confirmCheckInDesc: string;

  // Queue Management
  queueTitle: string;
  queueSubtitle: string;
  addToQueueBtn: string;
  tokenCol: string;
  checkInTimeCol: string;
  currentStatusCol: string;
  statusWaiting: string;
  statusInConsultation: string;
  statusCompleted: string;
  startConsultationBtn: string;
  markCompletedBtn: string;
  emergencyPriorityBadge: string;
  queueOrderNotice: string;
  totalInQueue: string;
  waitingCount: string;
  inConsultCount: string;

  // Emergency Cases
  emgTitle: string;
  emgSubtitle: string;
  activeCasesCount: string;
  arrivalTimeCol: string;
  chiefComplaintCol: string;
  assignedStaffCol: string;
  triagePriorityCol: string;
  statusHistoryTitle: string;
  updateStatusBtn: string;
  newEmergencyBtn: string;
  emgTriagePending: string;
  emgUnderObservation: string;
  emgStabilized: string;
  emgTransferredICU: string;
  emgDischarged: string;
  nonRelianceNotice: string;

  // Notifications
  notifTitle: string;
  notifSubtitle: string;
  markAllRead: string;
  noNotifications: string;
  filterAllNotifs: string;
  filterUnreadOnly: string;

  // Settings
  settingsTitle: string;
  settingsSubtitle: string;
  profileSection: string;
  staffName: string;
  staffEmail: string;
  staffRoleLabel: string;
  assignedHospital: string;
  accountSection: string;
  languageSection: string;
  languageDesc: string;
  notificationsSection: string;
  notifEmailAlerts: string;
  notifEmergencyAlerts: string;
  notifQueueAlerts: string;
  resetDemoDataBtn: string;
  resetDemoDataDesc: string;
  resetDemoConfirm: string;
  rolePermissionsTitle: string;
  receptionistPerms: string;
  compounderPerms: string;
}

export const staffTranslationsEn: StaffPortalTranslations = {
  portalName: 'Trails Staff Hub',
  portalSubtitle: 'Hospital Administration & Operations',
  badge: 'Staff Portal',
  dashboard: 'Dashboard',
  patientRegistration: 'Patient Registration',
  patientRecords: 'Patient Records',
  appointments: 'Appointments',
  queueManagement: 'Queue Management',
  emergencyCases: 'Emergency Cases',
  notifications: 'Notifications',
  settings: 'Settings',
  logout: 'Sign Out',
  viewPublicSite: 'Public Website',
  roleSwitcher: 'Active Role',
  roleReceptionist: 'Receptionist',
  roleCompounder: 'Compounder / Triage Nurse',
  roleReceptionistBadge: 'Desk Operations',
  roleCompounderBadge: 'Clinical Support',
  roleNotice: 'Switch role to simulate role-based permissions in this prototype.',
  demoModeBadge: 'Frontend Prototype • Phase 3',
  unreadCount: 'unread',

  search: 'Search',
  filter: 'Filter',
  all: 'All',
  status: 'Status',
  actions: 'Actions',
  viewDetails: 'View Details',
  edit: 'Edit',
  save: 'Save Changes',
  cancel: 'Cancel',
  close: 'Close',
  confirm: 'Confirm',
  refresh: 'Refresh',
  patientId: 'Patient ID',
  name: 'Full Name',
  age: 'Age',
  gender: 'Gender',
  contact: 'Contact',
  doctor: 'Doctor',
  department: 'Department',
  date: 'Date',
  time: 'Time',
  priority: 'Priority',
  normal: 'Normal',
  urgent: 'Urgent',
  critical: 'Critical',
  success: 'Success',
  error: 'Error',
  loading: 'Loading...',
  noData: 'No records found.',

  dashTitle: 'Staff Operations Dashboard',
  dashSubtitle: 'Live overview of registrations, appointments, OPD queue, and emergency arrivals.',
  statTotalPatients: 'Total Registered',
  statTodayReg: "Today's Registrations",
  statTodayApt: "Today's Appointments",
  statEmergencyCases: 'Active Emergency Cases',
  quickActions: 'Quick Staff Actions',
  quickRegPatient: 'Register Patient',
  quickEmergencyReg: 'Emergency Intake',
  quickFindPatient: 'Search Directory',
  quickNewApt: 'Book Appointment',
  recentRegistrations: 'Recent Registrations',
  viewAllPatients: 'View Directory →',
  upcomingAppointments: "Today's Appointments",
  viewAllAppointments: 'Manage Appointments →',
  liveQueueSummary: 'Live OPD Queue',
  viewFullQueue: 'Open Queue Manager →',
  activeEmergenciesAlert: 'Emergency Cases Requiring Attention',
  activeEmergenciesAlertDesc: 'critical emergency patient(s) active in triage/observation bay.',
  jumpToEmergency: 'View Emergency Board →',

  regTitle: 'Patient Registration',
  regSubtitle: 'Enroll new patients or record rapid emergency triage intake.',
  modeNormal: 'Standard Registration',
  modeEmergency: 'Rapid Emergency Intake',
  modeNormalDesc: 'Comprehensive demographic and contact collection for routine OPD visits.',
  modeEmergencyDesc: 'Minimal fields for immediate medical attention. Incomplete records marked provisional.',
  fullNameLabel: 'Full Patient Name *',
  fullNamePlaceholder: 'e.g. Ramesh Kumar',
  ageLabel: 'Age (Years) *',
  agePlaceholder: 'e.g. 45',
  genderLabel: 'Gender *',
  genderMale: 'Male',
  genderFemale: 'Female',
  genderOther: 'Other',
  phoneLabel: 'Contact Phone Number *',
  phonePlaceholder: '+91 98765 43210',
  emailLabel: 'Email Address (Optional)',
  emailPlaceholder: 'patient@example.com',
  addressLabel: 'Residential Address',
  addressPlaceholder: 'House/Street, Locality, City, PIN Code',
  emergencyContactNameLabel: 'Emergency Contact Person',
  emergencyContactNamePlaceholder: 'Relative or Guardian Name',
  emergencyContactRelLabel: 'Relationship',
  emergencyContactRelPlaceholder: 'e.g. Spouse, Parent, Sibling',
  emergencyContactPhoneLabel: 'Emergency Contact Phone',
  emergencyContactPhonePlaceholder: '+91 98765 00000',
  chiefComplaintLabel: 'Chief Presenting Complaint *',
  chiefComplaintPlaceholder: 'Describe urgent symptoms (e.g. Acute chest pain, shortness of breath, trauma...)',
  initialPriorityLabel: 'Triage Severity Level',
  assignedDoctorLabel: 'Assign to Doctor / Department',
  selectDoctorPlaceholder: '-- Select Consulting Doctor --',
  duplicateWarningTitle: 'Potential Duplicate Patient(s) Detected',
  duplicateWarningDesc: 'A registered patient with a similar name or contact number already exists:',
  duplicateMatchFound: 'Matches existing record:',
  proceedAnyway: 'Create New Record Anyway',
  useExistingPatient: 'Open Existing Record Instead',
  submitRegistration: 'Complete Patient Registration',
  submitEmergencyIntake: 'Submit Emergency Intake & Triage',
  regSuccessTitle: 'Registration Successful!',
  regSuccessDesc: 'Patient registered with unique ID:',
  emergencyRegNotice: 'Provisional record created. Non-essential fields can be updated later by authorized staff.',
  fieldRequired: 'This field is required.',
  invalidPhone: 'Please enter a valid 10-digit phone number.',
  invalidEmail: 'Please enter a valid email address.',

  recordsTitle: 'Patient Directory & Medical Records',
  recordsSubtitle: 'Search, filter, and inspect detailed patient demographics, diagnoses, and visit history.',
  searchPlaceholder: 'Search by patient name, unique ID (TMH-...), or phone number...',
  filterAll: 'All Patients',
  filterNormal: 'Standard OPD',
  filterEmergency: 'Emergency Origin',
  filterProvisional: 'Provisional Only',
  totalRecordsCount: 'registered patient records',
  registeredOn: 'Registered',
  provisionalBadge: 'Provisional Record',
  demographicsTab: 'Demographics & Contact',
  visitsTab: 'Visit History',
  diagnosesTab: 'Diagnoses & History',
  prescriptionsTab: 'Prescriptions',
  labReportsTab: 'Lab & Diagnostic Reports',
  notesTab: "Doctor's Notes",
  scheduleAptForPatient: 'Schedule Appointment',
  addToQueueForPatient: 'Add to OPD Queue',
  completeRecordBtn: 'Complete Provisional Details',
  completeRecordTitle: 'Update Incomplete Emergency Information',
  allergiesLabel: 'Known Allergies',
  noAllergiesRecorded: 'No known drug allergies reported.',
  noVisitsRecorded: 'No previous visits logged.',
  noDiagnosesRecorded: 'No clinical diagnoses entered yet.',
  noPrescriptionsRecorded: 'No active prescriptions.',
  noLabReportsRecorded: 'No diagnostic lab reports available.',
  noDoctorNotesRecorded: 'No physician clinical notes on file.',
  sensitiveClinicalNotice: 'Note: Clinical diagnoses and prescriptions can only be created or modified by authorized doctors (Phase 4). Staff have read-only visibility.',

  aptTitle: 'Appointment Management',
  aptSubtitle: 'Create, reschedule, check in, and cancel outpatient appointments.',
  newAppointmentBtn: 'Book New Appointment',
  aptFilterDate: 'Filter Date',
  aptFilterStatus: 'Status Filter',
  aptScheduled: 'Scheduled',
  aptCheckedIn: 'Checked In',
  aptCompleted: 'Completed',
  aptCancelled: 'Cancelled',
  aptDelayed: 'Delayed',
  checkInBtn: 'Check In Patient',
  rescheduleBtn: 'Reschedule',
  cancelBtn: 'Cancel Appointment',
  selectPatientLabel: 'Select Patient *',
  selectPatientPlaceholder: '-- Choose Registered Patient --',
  aptDateLabel: 'Appointment Date *',
  aptTimeLabel: 'Time Slot *',
  aptTypeLabel: 'Consultation Type',
  aptNotesLabel: 'Reason / Clinical Notes',
  aptNotesPlaceholder: 'e.g. Regular review, medication adjustment...',
  conflictWarningTitle: 'Doctor Schedule Conflict Detected',
  conflictWarningDesc: 'The selected doctor already has a confirmed appointment at this exact date and time. Please pick another slot.',
  confirmCancelTitle: 'Cancel Appointment?',
  confirmCancelDesc: 'Are you sure you want to cancel this appointment? The patient will be notified.',
  confirmCheckInTitle: 'Check In Patient',
  confirmCheckInDesc: 'Marking this patient as checked in will allow them to be queued for consultation.',

  queueTitle: 'OPD Queue Management',
  queueSubtitle: 'Monitor live patient tokens, adjust queue status, and prioritize urgent consultations.',
  addToQueueBtn: 'Queue a Patient',
  tokenCol: 'Token #',
  checkInTimeCol: 'Check-in Time',
  currentStatusCol: 'Queue Status',
  statusWaiting: 'Waiting in Lobby',
  statusInConsultation: 'In Consultation',
  statusCompleted: 'Consultation Done',
  startConsultationBtn: 'Call into Room',
  markCompletedBtn: 'Mark Completed',
  emergencyPriorityBadge: 'Emergency Priority',
  queueOrderNotice: 'Emergency cases are automatically prioritized to the top of the waiting list.',
  totalInQueue: 'Total in Queue',
  waitingCount: 'Waiting',
  inConsultCount: 'In Consultation Room',

  emgTitle: 'Emergency Intake & Triage Board',
  emgSubtitle: 'Real-time tracking of acute admissions, provisional records, and patient escalation.',
  activeCasesCount: 'Active Emergency Admissions',
  arrivalTimeCol: 'Arrival Time',
  chiefComplaintCol: 'Chief Complaint',
  assignedStaffCol: 'Responsible Staff / Nurse',
  triagePriorityCol: 'Triage Severity',
  statusHistoryTitle: 'Triage Status History',
  updateStatusBtn: 'Update Status',
  newEmergencyBtn: 'Register Emergency Patient',
  emgTriagePending: 'Triage Pending',
  emgUnderObservation: 'Under Observation',
  emgStabilized: 'Stabilized',
  emgTransferredICU: 'Transferred to ICU',
  emgDischarged: 'Discharged / Handed Over',
  nonRelianceNotice: 'Prototype Notice: Triage levels shown here are administrative demonstration markers and do not substitute for clinical triage algorithms.',

  notifTitle: 'Staff Notifications',
  notifSubtitle: 'Operational alerts regarding registrations, appointments, and emergency cases.',
  markAllRead: 'Mark all as read',
  noNotifications: 'No notifications at this time.',
  filterAllNotifs: 'All Alerts',
  filterUnreadOnly: 'Unread Only',

  settingsTitle: 'Staff Portal Settings & Profile',
  settingsSubtitle: 'Manage account details, active staff role permissions, and interface preferences.',
  profileSection: 'Staff Member Profile',
  staffName: 'Staff Name',
  staffEmail: 'Work Email',
  staffRoleLabel: 'Active Role Designation',
  assignedHospital: 'Assigned Facility',
  accountSection: 'Account Information',
  languageSection: 'Language Preference',
  languageDesc: 'Choose interface language across all staff pages.',
  notificationsSection: 'Notification Preferences',
  notifEmailAlerts: 'Email alerts for new appointments',
  notifEmergencyAlerts: 'Audio chime for emergency admissions',
  notifQueueAlerts: 'Notify when patient wait time exceeds 30 minutes',
  resetDemoDataBtn: 'Reset Prototype Demo Data',
  resetDemoDataDesc: 'Restore all patients, appointments, and queue items to original default sample data.',
  resetDemoConfirm: 'All changes made in this session will be reset to default. Continue?',
  rolePermissionsTitle: 'Role Permissions & Access Matrix',
  receptionistPerms: 'Receptionist: Patient intake, appointment scheduling, directory search, queue check-in.',
  compounderPerms: 'Compounder / Triage Nurse: Rapid emergency intake, triage severity tagging, queue status updates, provisional record completion.',
};

export const staffTranslationsHi: StaffPortalTranslations = {
  portalName: 'ट्रेल्स स्टाफ हब',
  portalSubtitle: 'अस्पताल प्रशासन और संचालन',
  badge: 'स्टाफ पोर्टल',
  dashboard: 'डैशबोर्ड',
  patientRegistration: 'रोगी पंजीकरण',
  patientRecords: 'रोगी रिकॉर्ड',
  appointments: 'अपॉइंटमेंट',
  queueManagement: 'कतार प्रबंधन',
  emergencyCases: 'आपातकालीन मामले',
  notifications: 'सूचनाएं',
  settings: 'सेटिंग्स',
  logout: 'साइन आउट',
  viewPublicSite: 'मुख्य वेबसाइट',
  roleSwitcher: 'सक्रिय भूमिका',
  roleReceptionist: 'रिसेप्शनिस्ट',
  roleCompounder: 'कंपाउंडर / ट्राइएज नर्स',
  roleReceptionistBadge: 'डेस्क संचालन',
  roleCompounderBadge: 'क्लिनिकल सहायता',
  roleNotice: 'इस प्रोटोटाइप में भूमिका-आधारित अनुमतियों का अनुकरण करने के लिए भूमिका बदलें।',
  demoModeBadge: 'फ्रंटएंड प्रोटोटाइप • चरण 3',
  unreadCount: 'अपठित',

  search: 'खोजें',
  filter: 'फ़िल्टर',
  all: 'सभी',
  status: 'स्थिति',
  actions: 'कार्रवाई',
  viewDetails: 'विवरण देखें',
  edit: 'संपादित करें',
  save: 'बदलाव सहेजें',
  cancel: 'रद्द करें',
  close: 'बंद करें',
  confirm: 'पुष्टि करें',
  refresh: 'ताज़ा करें',
  patientId: 'रोगी आईडी',
  name: 'पूरा नाम',
  age: 'उम्र',
  gender: 'लिंग',
  contact: 'संपर्क',
  doctor: 'डॉक्टर',
  department: 'विभाग',
  date: 'दिनांक',
  time: 'समय',
  priority: 'प्राथमिकता',
  normal: 'सामान्य',
  urgent: 'अत्यावश्यक',
  critical: 'गंभीर (क्रिटिकल)',
  success: 'सफल',
  error: 'त्रुटि',
  loading: 'लोड हो रहा है...',
  noData: 'कोई रिकॉर्ड नहीं मिला।',

  dashTitle: 'स्टाफ संचालन डैशबोर्ड',
  dashSubtitle: 'पंजीकरण, अपॉइंटमेंट, ओपीडी कतार और आपातकालीन आगमन का सीधा अवलोकन।',
  statTotalPatients: 'कुल पंजीकृत रोगी',
  statTodayReg: 'आज के पंजीकरण',
  statTodayApt: 'आज के अपॉइंटमेंट',
  statEmergencyCases: 'सक्रिय आपातकालीन मामले',
  quickActions: 'त्वरित स्टाफ क्रियाएं',
  quickRegPatient: 'रोगी पंजीकरण',
  quickEmergencyReg: 'आपातकालीन सेवन',
  quickFindPatient: 'रोगी खोजें',
  quickNewApt: 'अपॉइंटमेंट बुक करें',
  recentRegistrations: 'हाल के पंजीकरण',
  viewAllPatients: 'पूरी निर्देशिका देखें →',
  upcomingAppointments: 'आज के अपॉइंटमेंट',
  viewAllAppointments: 'सभी अपॉइंटमेंट प्रबंधित करें →',
  liveQueueSummary: 'लाइव ओपीडी कतार',
  viewFullQueue: 'कतार प्रबंधक खोलें →',
  activeEmergenciesAlert: 'ध्यान देने योग्य आपातकालीन मामले',
  activeEmergenciesAlertDesc: 'गंभीर आपातकालीन रोगी ट्राइएज/अवलोकन कक्ष में सक्रिय हैं।',
  jumpToEmergency: 'आपातकालीन बोर्ड देखें →',

  regTitle: 'रोगी पंजीकरण',
  regSubtitle: 'नए रोगियों का नामांकन करें या त्वरित आपातकालीन ट्राइएज सेवन दर्ज करें।',
  modeNormal: 'मानक पंजीकरण',
  modeEmergency: 'त्वरित आपातकालीन सेवन',
  modeNormalDesc: 'नियमित ओपीडी यात्राओं के लिए व्यापक जनसांख्यिकीय और संपर्क संग्रह।',
  modeEmergencyDesc: 'तत्काल चिकित्सा ध्यान के लिए न्यूनतम फ़ील्ड। अधूरे रिकॉर्ड को अनंतिम चिह्नित किया जाता है।',
  fullNameLabel: 'रोगी का पूरा नाम *',
  fullNamePlaceholder: 'उदा. रमेश कुमार',
  ageLabel: 'उम्र (वर्ष) *',
  agePlaceholder: 'उदा. 45',
  genderLabel: 'लिंग *',
  genderMale: 'पुरुष',
  genderFemale: 'महिला',
  genderOther: 'अन्य',
  phoneLabel: 'संपर्क फ़ोन नंबर *',
  phonePlaceholder: '+91 98765 43210',
  emailLabel: 'ईमेल पता (वैकल्पिक)',
  emailPlaceholder: 'patient@example.com',
  addressLabel: 'निवास का पता',
  addressPlaceholder: 'मकान/गली, इलाका, शहर, पिन कोड',
  emergencyContactNameLabel: 'आपातकालीन संपर्क व्यक्ति',
  emergencyContactNamePlaceholder: 'रिश्तेदार या अभिभावक का नाम',
  emergencyContactRelLabel: 'संबंध',
  emergencyContactRelPlaceholder: 'उदा. पति/पत्नी, माता-पिता, भाई/बहन',
  emergencyContactPhoneLabel: 'आपातकालीन संपर्क फ़ोन',
  emergencyContactPhonePlaceholder: '+91 98765 00000',
  chiefComplaintLabel: 'मुख्य प्राथमिक समस्या *',
  chiefComplaintPlaceholder: 'गंभीर लक्षणों का वर्णन करें (उदा. सीने में तेज दर्द, सांस लेने में तकलीफ, चोट...)',
  initialPriorityLabel: 'ट्राइएज गंभीरता स्तर',
  assignedDoctorLabel: 'डॉक्टर/विभाग असाइन करें',
  selectDoctorPlaceholder: '-- परामर्श डॉक्टर चुनें --',
  duplicateWarningTitle: 'संभावित डुप्लिकेट रोगी पाया गया',
  duplicateWarningDesc: 'समान नाम या संपर्क नंबर वाला एक पंजीकृत रोगी पहले से मौजूद है:',
  duplicateMatchFound: 'मौजूदा रिकॉर्ड से मेल खाता है:',
  proceedAnyway: 'फिर भी नया रिकॉर्ड बनाएं',
  useExistingPatient: 'इसके बजाय मौजूदा रिकॉर्ड खोलें',
  submitRegistration: 'रोगी पंजीकरण पूर्ण करें',
  submitEmergencyIntake: 'आपातकालीन सेवन और ट्राइएज जमा करें',
  regSuccessTitle: 'पंजीकरण सफल रहा!',
  regSuccessDesc: 'रोगी को विशिष्ट आईडी के साथ पंजीकृत किया गया:',
  emergencyRegNotice: 'अनंतिम रिकॉर्ड बनाया गया। गैर-आवश्यक फ़ील्ड को बाद में अधिकृत कर्मचारियों द्वारा अद्यतन किया जा सकता है।',
  fieldRequired: 'यह फ़ील्ड आवश्यक है।',
  invalidPhone: 'कृपया एक मान्य 10-अंकों का फ़ोन नंबर दर्ज करें।',
  invalidEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',

  recordsTitle: 'रोगी निर्देशिका एवं मेडिकल रिकॉर्ड',
  recordsSubtitle: 'विस्तृत रोगी विवरण, निदान और यात्रा इतिहास खोजें, फ़िल्टर करें और जांचें।',
  searchPlaceholder: 'रोगी का नाम, विशिष्ट आईडी (TMH-...), या फ़ोन नंबर से खोजें...',
  filterAll: 'सभी रोगी',
  filterNormal: 'मानक ओपीडी',
  filterEmergency: 'आपातकालीन मूल',
  filterProvisional: 'केवल अनंतिम',
  totalRecordsCount: 'पंजीकृत रोगी रिकॉर्ड',
  registeredOn: 'पंजीकृत',
  provisionalBadge: 'अनंतिम रिकॉर्ड',
  demographicsTab: 'जनसांख्यिकी और संपर्क',
  visitsTab: 'यात्रा इतिहास',
  diagnosesTab: 'निदान और इतिहास',
  prescriptionsTab: 'दवाइयां (नुस्खे)',
  labReportsTab: 'लैब और टेस्ट रिपोर्ट',
  notesTab: 'डॉक्टर के नोट्स',
  scheduleAptForPatient: 'अपॉइंटमेंट तय करें',
  addToQueueForPatient: 'ओपीडी कतार में जोड़ें',
  completeRecordBtn: 'अनंतिम विवरण पूरा करें',
  completeRecordTitle: 'अधूरी आपातकालीन जानकारी अपडेट करें',
  allergiesLabel: 'ज्ञात एलर्जी',
  noAllergiesRecorded: 'कोई ज्ञात दवा एलर्जी दर्ज नहीं है।',
  noVisitsRecorded: 'कोई पिछला दौरा दर्ज नहीं है।',
  noDiagnosesRecorded: 'अभी तक कोई नैदानिक निदान दर्ज नहीं किया गया है।',
  noPrescriptionsRecorded: 'कोई सक्रिय नुस्खा नहीं है।',
  noLabReportsRecorded: 'कोई डायग्नोस्टिक लैब रिपोर्ट उपलब्ध नहीं है।',
  noDoctorNotesRecorded: 'फ़ाइल पर कोई डॉक्टर क्लिनिकल नोट नहीं है।',
  sensitiveClinicalNotice: 'नोट: नैदानिक निदान और नुस्खे केवल अधिकृत डॉक्टरों (चरण 4) द्वारा बनाए या संशोधित किए जा सकते हैं। कर्मचारियों के पास केवल पढ़ने की अनुमति है।',

  aptTitle: 'अपॉइंटमेंट प्रबंधन',
  aptSubtitle: 'ओपीडी नियुक्तियां बनाएं, पुनर्निर्धारित करें, चेक-इन करें और रद्द करें।',
  newAppointmentBtn: 'नया अपॉइंटमेंट बुक करें',
  aptFilterDate: 'दिनांक फ़िल्टर',
  aptFilterStatus: 'स्थिति फ़िल्टर',
  aptScheduled: 'निर्धारित',
  aptCheckedIn: 'चेक-इन किया गया',
  aptCompleted: 'पूर्ण हुआ',
  aptCancelled: 'रद्द किया गया',
  aptDelayed: 'विलंबित',
  checkInBtn: 'रोगी चेक-इन करें',
  rescheduleBtn: 'पुनर्निर्धारित करें',
  cancelBtn: 'अपॉइंटमेंट रद्द करें',
  selectPatientLabel: 'रोगी चुनें *',
  selectPatientPlaceholder: '-- पंजीकृत रोगी चुनें --',
  aptDateLabel: 'अपॉइंटमेंट तिथि *',
  aptTimeLabel: 'समय स्लॉट *',
  aptTypeLabel: 'परामर्श प्रकार',
  aptNotesLabel: 'कारण / नैदानिक नोट्स',
  aptNotesPlaceholder: 'उदा. नियमित जांच, दवा समायोजन...',
  conflictWarningTitle: 'डॉक्टर शेड्यूल में टकराव पाया गया',
  conflictWarningDesc: 'चयनित डॉक्टर का इस सटीक तिथि और समय पर पहले से ही एक निश्चित अपॉइंटमेंट है। कृपया दूसरा समय चुनें।',
  confirmCancelTitle: 'अपॉइंटमेंट रद्द करें?',
  confirmCancelDesc: 'क्या आप वाकई इस अपॉइंटमेंट को रद्द करना चाहते हैं? रोगी को सूचित किया जाएगा।',
  confirmCheckInTitle: 'रोगी चेक-इन करें',
  confirmCheckInDesc: 'इस रोगी को चेक-इन के रूप में चिह्नित करने से उन्हें परामर्श के लिए कतार में लगाया जा सकेगा।',

  queueTitle: 'ओपीडी कतार प्रबंधन',
  queueSubtitle: 'लाइव रोगी टोकन की निगरानी करें, स्थिति बदलें और तत्काल परामर्श को प्राथमिकता दें।',
  addToQueueBtn: 'कतार में जोड़ें',
  tokenCol: 'टोकन सं.',
  checkInTimeCol: 'चेक-इन समय',
  currentStatusCol: 'कतार स्थिति',
  statusWaiting: 'प्रतीक्षालय में प्रतीक्षारत',
  statusInConsultation: 'परामर्श कक्ष में',
  statusCompleted: 'परामर्श पूर्ण',
  startConsultationBtn: 'कमरे में बुलाएं',
  markCompletedBtn: 'पूर्ण चिह्नित करें',
  emergencyPriorityBadge: 'आपातकालीन प्राथमिकता',
  queueOrderNotice: 'आपातकालीन मामलों को स्वचालित रूप से प्रतीक्षा सूची में सबसे ऊपर प्राथमिकता दी जाती है।',
  totalInQueue: 'कतार में कुल',
  waitingCount: 'प्रतीक्षारत',
  inConsultCount: 'परामर्श कक्ष में',

  emgTitle: 'आपातकालीन सेवन एवं ट्राइएज बोर्ड',
  emgSubtitle: 'गंभीर प्रवेश, अनंतिम रिकॉर्ड और रोगी वृद्धि की रीयल-टाइम ट्रैकिंग।',
  activeCasesCount: 'सक्रिय आपातकालीन प्रवेश',
  arrivalTimeCol: 'आगमन समय',
  chiefComplaintCol: 'मुख्य शिकायत',
  assignedStaffCol: 'जिम्मेदार स्टाफ / नर्स',
  triagePriorityCol: 'ट्राइएज गंभीरता',
  statusHistoryTitle: 'ट्राइएज स्थिति इतिहास',
  updateStatusBtn: 'स्थिति अपडेट करें',
  newEmergencyBtn: 'आपातकालीन रोगी पंजीकृत करें',
  emgTriagePending: 'ट्राइएज लंबित',
  emgUnderObservation: 'निगरानी में',
  emgStabilized: 'स्थिर',
  emgTransferredICU: 'आईसीयू में स्थानांतरित',
  emgDischarged: 'डिस्चार्ज / सौंप दिया गया',
  nonRelianceNotice: 'प्रोटोटाइप सूचना: यहां दिखाए गए ट्राइएज स्तर प्रशासनिक प्रदर्शन मार्कर हैं और नैदानिक ट्राइएज एल्गोरिदम का विकल्प नहीं हैं।',

  notifTitle: 'स्टाफ सूचनाएं',
  notifSubtitle: 'पंजीकरण, नियुक्तियों और आपातकालीन मामलों से संबंधित परिचालन अलर्ट।',
  markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
  noNotifications: 'इस समय कोई सूचना नहीं है।',
  filterAllNotifs: 'सभी अलर्ट',
  filterUnreadOnly: 'केवल अपठित',

  settingsTitle: 'स्टाफ पोर्टल सेटिंग्स एवं प्रोफाइल',
  settingsSubtitle: 'खाता विवरण, सक्रिय स्टाफ भूमिका अनुमतियां और इंटरफ़ेस प्राथमिकताएं प्रबंधित करें।',
  profileSection: 'स्टाफ सदस्य प्रोफ़ाइल',
  staffName: 'स्टाफ का नाम',
  staffEmail: 'कार्य ईमेल',
  staffRoleLabel: 'सक्रिय पदनाम भूमिका',
  assignedHospital: 'असाइन की गई सुविधा',
  accountSection: 'खाता जानकारी',
  languageSection: 'भाषा प्राथमिकता',
  languageDesc: 'सभी स्टाफ पेजों पर इंटरफ़ेस भाषा चुनें।',
  notificationsSection: 'अधिसूचना प्राथमिकताएं',
  notifEmailAlerts: 'नए अपॉइंटमेंट के लिए ईमेल अलर्ट',
  notifEmergencyAlerts: 'आपातकालीन प्रवेश के लिए ऑडियो चाइम',
  notifQueueAlerts: 'जब प्रतीक्षा समय 30 मिनट से अधिक हो तो सूचित करें',
  resetDemoDataBtn: 'प्रोटोटाइप डेमो डेटा रीसेट करें',
  resetDemoDataDesc: 'सभी रोगियों, नियुक्तियों और कतार वस्तुओं को मूल डिफ़ॉल्ट नमूना डेटा में पुनर्स्थापित करें।',
  resetDemoConfirm: 'इस सत्र में किए गए सभी परिवर्तन डिफ़ॉल्ट पर रीसेट हो जाएंगे। क्या आप जारी रखना चाहते हैं?',
  rolePermissionsTitle: 'भूमिका अनुमतियां एवं पहुंच मैट्रिक्स',
  receptionistPerms: 'रिसेप्शनिस्ट: रोगी सेवन, अपॉइंटमेंट शेड्यूलिंग, निर्देशिका खोज, कतार चेक-इन।',
  compounderPerms: 'कंपाउंडर / ट्राइएज नर्स: त्वरित आपातकालीन सेवन, ट्राइएज गंभीरता टैगिंग, कतार स्थिति अपडेट, अनंतिम रिकॉर्ड पूर्णता।',
};
