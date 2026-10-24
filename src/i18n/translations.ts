import { type StaffPortalTranslations, staffTranslationsEn, staffTranslationsHi } from './staffTranslations';
import { type DoctorPortalTranslations, doctorTranslationsEn, doctorTranslationsHi } from './doctorTranslations';
import { type PatientPortalTranslations, patientTranslationsEn, patientTranslationsHi } from './patientTranslations';

export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav: {
    brandName: string;
    brandTagline: string;
    home: string;
    aboutUs: string;
    services: string;
    contact: string;
    login: string;
    languageToggle: string;
    openMenu: string;
    closeMenu: string;
    phaseBadge: string;
  };
  // Hero Section
  hero: {
    badge: string;
    headline: string;
    supportingText: string;
    getStarted: string;
    exploreServices: string;
    activeUsersBadge: string;
    activeUsersText: string;
    securityBadge: string;
  };
  // Portal Cards Section
  portals: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    doctorTitle: string;
    doctorDesc: string;
    doctorCta: string;
    doctorBadge: string;
    staffTitle: string;
    staffDesc: string;
    staffCta: string;
    staffBadge: string;
    patientTitle: string;
    patientDesc: string;
    patientCta: string;
    patientBadge: string;
    modalTitle: string;
    modalNotice: string;
    modalCredentials: string;
    modalEmail: string;
    modalPassword: string;
    modalClose: string;
  };
  // Key Features Section
  features: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    feature5Title: string;
    feature5Desc: string;
  };
  // Platform Introduction
  platformIntro: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    staffStepTitle: string;
    staffStepDesc: string;
    doctorStepTitle: string;
    doctorStepDesc: string;
    patientStepTitle: string;
    patientStepDesc: string;
    disclaimerTitle: string;
    disclaimerText: string;
  };
  // Get Started / Closing CTA Section
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
  };
  // Footer
  footer: {
    description: string;
    quickLinksTitle: string;
    home: string;
    aboutUs: string;
    services: string;
    contact: string;
    portalsTitle: string;
    doctorPortal: string;
    staffPortal: string;
    patientPortal: string;
    supportTitle: string;
    emailLabel: string;
    emailVal: string;
    phoneLabel: string;
    phoneVal: string;
    addressLabel: string;
    addressVal: string;
    privacy: string;
    terms: string;
    copyright: string;
    medicalDisclaimer: string;
  };
  // Common / Modals
  common: {
    phaseNoticeTitle: string;
    phaseNoticeDesc: string;
    okButton: string;
    demoNote: string;
    activeRole: string;
    backToHome: string;
    required: string;
    optional: string;
  };

  // ── Phase 2 ────────────────────────────────────────────────────────────────

  // About Us Page
  about: {
    pageTitle: string;
    pageBadge: string;
    heroHeadline: string;
    heroSubtitle: string;

    overviewBadge: string;
    overviewTitle: string;
    overviewText1: string;
    overviewText2: string;

    missionBadge: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;

    problemBadge: string;
    problemTitle: string;
    problem1Title: string;
    problem1Desc: string;
    problem2Title: string;
    problem2Desc: string;
    problem3Title: string;
    problem3Desc: string;
    problem4Title: string;
    problem4Desc: string;

    benefitsBadge: string;
    benefitsTitle: string;
    doctorBenefitTitle: string;
    doctorBenefit1: string;
    doctorBenefit2: string;
    doctorBenefit3: string;
    staffBenefitTitle: string;
    staffBenefit1: string;
    staffBenefit2: string;
    staffBenefit3: string;
    patientBenefitTitle: string;
    patientBenefit1: string;
    patientBenefit2: string;
    patientBenefit3: string;

    valueBadge: string;
    valueTitle: string;
    value1Title: string;
    value1Desc: string;
    value2Title: string;
    value2Desc: string;
    value3Title: string;
    value3Desc: string;
    value4Title: string;
    value4Desc: string;

    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };

  // Services Page
  services: {
    pageTitle: string;
    pageBadge: string;
    heroHeadline: string;
    heroSubtitle: string;

    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;

    s1Title: string;
    s1Desc: string;
    s1Detail1: string;
    s1Detail2: string;
    s1Detail3: string;

    s2Title: string;
    s2Desc: string;
    s2Detail1: string;
    s2Detail2: string;
    s2Detail3: string;

    s3Title: string;
    s3Desc: string;
    s3Detail1: string;
    s3Detail2: string;
    s3Detail3: string;

    s4Title: string;
    s4Desc: string;
    s4Detail1: string;
    s4Detail2: string;
    s4Detail3: string;

    s5Title: string;
    s5Desc: string;
    s5Detail1: string;
    s5Detail2: string;
    s5Detail3: string;

    s6Title: string;
    s6Desc: string;
    s6Detail1: string;
    s6Detail2: string;
    s6Detail3: string;

    s7Title: string;
    s7Desc: string;
    s7Detail1: string;
    s7Detail2: string;
    s7Detail3: string;

    noticeTitle: string;
    noticeText: string;
    ctaTitle: string;
    ctaButton: string;
  };

  // Contact Page
  contact: {
    pageTitle: string;
    pageBadge: string;
    heroHeadline: string;
    heroSubtitle: string;

    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;

    successTitle: string;
    successText: string;
    successNote: string;
    sendAnother: string;

    errorRequired: string;
    errorEmail: string;
    errorMessageLen: string;
    errorSubmit: string;

    infoTitle: string;
    emailInfoLabel: string;
    emailInfoVal: string;
    phoneInfoLabel: string;
    phoneInfoVal: string;
    hoursLabel: string;
    hoursVal: string;
    addressLabel: string;
    addressVal: string;

    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    prototypeNote: string;
  };

  // Portal Selection Page
  portalSelect: {
    pageTitle: string;
    pageBadge: string;
    heroHeadline: string;
    heroSubtitle: string;
    selectPrompt: string;
    doctorTitle: string;
    doctorDesc: string;
    doctorCta: string;
    staffTitle: string;
    staffDesc: string;
    staffCta: string;
    patientTitle: string;
    patientDesc: string;
    patientCta: string;
    demoNotice: string;
  };

  // Login Screens
  login: {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    showPassword: string;
    hidePassword: string;
    loginButton: string;
    loggingIn: string;
    backToHome: string;
    changePortal: string;
    demoCredentials: string;
    demoCopy: string;
    errorRequired: string;
    errorEmail: string;
    errorPasswordLen: string;
    errorInvalidCreds: string;
    errorGeneric: string;
    successTitle: string;
    successText: string;
    rememberMe: string;
    forgotPassword: string;
    forgotNotice: string;

    doctorTitle: string;
    doctorSubtitle: string;
    doctorBadge: string;

    staffTitle: string;
    staffSubtitle: string;
    staffBadge: string;

    patientTitle: string;
    patientSubtitle: string;
    patientBadge: string;
  };

  staffPortal: StaffPortalTranslations;
  doctorPortal: DoctorPortalTranslations;
  patientPortal: PatientPortalTranslations;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brandName: 'Trails Monitor Hub',
      brandTagline: 'Unified Healthcare System',
      home: 'Home',
      aboutUs: 'About Us',
      services: 'Services',
      contact: 'Contact',
      login: 'Login',
      languageToggle: 'हिंदी',
      openMenu: 'Open main menu',
      closeMenu: 'Close menu',
      phaseBadge: 'Phase 6 Integration Active',
    },
    hero: {
      badge: 'Healthcare Management Platform',
      headline: 'Connected Healthcare. Better Patient Outcomes.',
      supportingText:
        'Trails Monitor Hub is a unified healthcare management platform that connects doctors, hospital staff, and patients through coordinated clinical workflows, organized medical records, and transparent patient communication.',
      getStarted: 'Get Started',
      exploreServices: 'Explore Services',
      activeUsersBadge: 'Coordinated Care',
      activeUsersText: 'Doctors • Hospital Staff • Patients in sync',
      securityBadge: 'Standardized Healthcare Design System',
    },
    portals: {
      sectionBadge: 'Role-Specific Access',
      sectionTitle: 'Dedicated Portals for Every Stakeholder',
      sectionSubtitle:
        'Select your portal to experience tailored clinical, administrative, or patient-centric workflows.',
      doctorTitle: 'Doctor Portal',
      doctorDesc:
        'Manage patients, review comprehensive medical records, conduct consultations, and monitor available health information with high-efficiency clinical tools.',
      doctorCta: 'Doctor Login',
      doctorBadge: 'Clinical Workspace',
      staffTitle: 'Hospital Staff Portal',
      staffDesc:
        'Register new and emergency patients, organize doctor appointments, manage hospital queues, and ensure rapid triage across hospital departments.',
      staffCta: 'Staff Login',
      staffBadge: 'Administrative Operations',
      patientTitle: 'Patient Portal',
      patientDesc:
        'Access personal medical records, diagnostic test reports, upcoming appointments, live queue updates, and simple assistance tools anytime.',
      patientCta: 'Patient Login',
      patientBadge: 'Accessible Healthcare',
      modalTitle: 'Portal Entry Details',
      modalNotice:
        'Select your role above to proceed to the dedicated login screen.',
      modalCredentials: 'Development Demo Credentials:',
      modalEmail: 'Email',
      modalPassword: 'Password',
      modalClose: 'Close Window',
    },
    features: {
      sectionBadge: 'Core Capabilities',
      sectionTitle: 'Everything Modern Healthcare Requires',
      sectionSubtitle:
        'Engineered to streamline hospital operations, remove paperwork bottlenecks, and place the patient at the heart of care delivery.',
      feature1Title: 'Unified Patient Records',
      feature1Desc:
        'Centralized, chronological patient history aggregating diagnoses, prescriptions, lab results, and allergies without duplicated data entry.',
      feature2Title: 'Appointment & Queue Management',
      feature2Desc:
        'Real-time queue tracking for OPD patients, transparent wait-time visibility, and smooth handovers between triage staff and doctors.',
      feature3Title: 'Medical Reports & Health Monitoring',
      feature3Desc:
        'Structured lab report access, longitudinal vitals tracking (ECG, Heart Rate, SpO2, BP), and organized organ-specific clinical observations.',
      feature4Title: 'Emergency Assistance',
      feature4Desc:
        'Rapid emergency registration workflows, priority queue tagging, and immediate one-tap Call for Help capabilities for unwell patients.',
      feature5Title: 'Connected Healthcare Management',
      feature5Desc:
        'Seamless communication bridge synchronizing compounders, receptionists, clinical specialists, and patients in a unified ecosystem.',
    },
    platformIntro: {
      sectionBadge: 'Unified Ecosystem',
      sectionTitle: 'How Trails Monitor Hub Connects the Care Team',
      sectionSubtitle:
        'Healthcare works best when doctors, administrative staff, and patients share a single source of truth.',
      staffStepTitle: '1. Fast Intake & Queueing',
      staffStepDesc:
        'Hospital staff registers patients with unique IDs, manages walk-ins, assigns priority levels, and directs patients into the smart consultation queue.',
      doctorStepTitle: '2. Clinical Assessment & Documentation',
      doctorStepDesc:
        'Doctors instantly review patient history, enter consultation notes, prescribe medications, and order laboratory diagnostics in an auditable workflow.',
      patientStepTitle: '3. Transparent Care & Empowerment',
      patientStepDesc:
        'Patients monitor their visit status, check prescription reminders, review lab findings, and maintain a lightweight Health Diary in their preferred language.',
      disclaimerTitle: 'Healthcare Prototype Notice',
      disclaimerText:
        'Trails Monitor Hub Phase 2 completes the public website with real navigation and demo login screens. Direct medical device telemetry and live hospital hardware integrations will follow in subsequent phases.',
    },
    cta: {
      badge: 'Start Your Journey',
      title: 'Ready to Experience Coordinated Healthcare?',
      subtitle:
        'Select your role to access your dedicated login screen and portal.',
      primaryButton: 'Select Your Portal',
      secondaryButton: 'Learn More About Us',
    },
    footer: {
      description:
        'Trails Monitor Hub is an enterprise healthcare management platform bringing patient registration, clinical consultations, queueing, and health records into one unified system.',
      quickLinksTitle: 'Platform Navigation',
      home: 'Home',
      aboutUs: 'About Us',
      services: 'Services',
      contact: 'Contact',
      portalsTitle: 'Role Portals',
      doctorPortal: 'Doctor Portal',
      staffPortal: 'Hospital Staff Portal',
      patientPortal: 'Patient Portal',
      supportTitle: 'Contact & Support',
      emailLabel: 'Support Email',
      emailVal: 'support@trailsmonitor.demo',
      phoneLabel: 'Helpline',
      phoneVal: '+91 1800-000-DEMO (Toll-Free)',
      addressLabel: 'Headquarters',
      addressVal: 'Healthcare Innovation District, New Delhi, India',
      privacy: 'Privacy Safeguards',
      terms: 'Terms of Use',
      copyright: '© 2026 Trails Monitor Hub. All rights reserved.',
      medicalDisclaimer:
        'Disclaimer: Trails Monitor Hub is a demonstration healthcare management system. Simulated vitals and demo records are for development evaluation only.',
    },
    common: {
      phaseNoticeTitle: 'Feature Availability',
      phaseNoticeDesc:
        'This feature is part of the project roadmap and will be available in an upcoming phase.',
      okButton: 'Got it',
      demoNote: 'Prototype Mode',
      activeRole: 'Selected Role',
      backToHome: 'Back to Home',
      required: 'Required',
      optional: 'Optional',
    },

    // ── Phase 2 ─────────────────────────────────────────────────────────────

    about: {
      pageTitle: 'About Us | Trails Monitor Hub',
      pageBadge: 'Our Story & Mission',
      heroHeadline: 'Building Healthcare That Actually Connects',
      heroSubtitle:
        'Trails Monitor Hub was designed to solve the coordination gap that separates doctors, hospital staff, and patients in modern healthcare delivery.',

      overviewBadge: 'Platform Overview',
      overviewTitle: 'What Is Trails Monitor Hub?',
      overviewText1:
        'Trails Monitor Hub is a unified healthcare management platform designed to bring patient registration, medical records, appointments, queue management, consultations, and patient communication into a single coherent system.',
      overviewText2:
        'The platform provides three distinct portals — for Doctors, Hospital Staff, and Patients — each tailored to the specific workflows, responsibilities, and information needs of that role.',

      missionBadge: 'Mission & Vision',
      missionTitle: 'Our Mission',
      missionText:
        'To reduce administrative burden, improve information access for authorized healthcare providers, and enable patients to actively participate in their own care journey through a transparent, accessible, and bilingual platform.',
      visionTitle: 'Our Vision',
      visionText:
        'A healthcare system where no patient falls through the cracks of fragmented information, where doctors can spend time on clinical care instead of paperwork, and where every stakeholder has exactly the information they need.',

      problemBadge: 'Problem Statement',
      problemTitle: 'Why We Built This',
      problem1Title: 'Fragmented Records',
      problem1Desc: 'Patient histories scattered across departments and physical files make clinical decisions harder and slower.',
      problem2Title: 'Queue Opacity',
      problem2Desc: 'Patients and staff lack real-time visibility into waiting times, appointment statuses, and queue changes.',
      problem3Title: 'Coordination Gaps',
      problem3Desc: 'Hospital staff and doctors often work without a shared system, leading to miscommunication and delays.',
      problem4Title: 'Patient Confusion',
      problem4Desc: 'Patients frequently cannot access their own records, medication instructions, or appointment information easily.',

      benefitsBadge: 'Role Benefits',
      benefitsTitle: 'Built for Everyone in the Care Ecosystem',
      doctorBenefitTitle: 'For Doctors',
      doctorBenefit1: 'Access full patient history in one click from the consultation queue',
      doctorBenefit2: 'Document consultations, prescriptions, and findings in an auditable workflow',
      doctorBenefit3: 'Review organ-specific records and lab results organized chronologically',
      staffBenefitTitle: 'For Hospital Staff',
      staffBenefit1: 'Register normal and emergency patients quickly with unique ID generation',
      staffBenefit2: 'Manage appointments, scheduling, and live OPD queue tracking',
      staffBenefit3: 'Receive instant notifications on status changes and emergency cases',
      patientBenefitTitle: 'For Patients',
      patientBenefit1: 'View queue position, appointment schedules, and visit status transparently',
      patientBenefit2: 'Access prescriptions, lab reports, and medication reminders anytime',
      patientBenefit3: 'Maintain a Health Diary and request assistance through a prominent one-tap button',

      valueBadge: 'Core Values',
      valueTitle: 'Principles That Guide Every Decision',
      value1Title: 'Patient-Centred Design',
      value1Desc: 'Every interface decision prioritizes patient safety, dignity, and accessibility.',
      value2Title: 'Clinical Integrity',
      value2Desc: 'Medical records and clinical notes are auditable, timestamped, and author-attributed.',
      value3Title: 'Transparent Prototyping',
      value3Desc: 'Demo data is clearly labeled. Simulated readings are never presented as real clinical data.',
      value4Title: 'Inclusive Language',
      value4Desc: 'Full bilingual support in English and Hindi so no user is left behind due to language barriers.',

      ctaTitle: 'Ready to See It in Action?',
      ctaSubtitle: 'Select your role and explore the portal designed for your needs.',
      ctaButton: 'Select Your Portal',
    },

    services: {
      pageTitle: 'Services | Trails Monitor Hub',
      pageBadge: 'Platform Services',
      heroHeadline: 'Comprehensive Healthcare Management Services',
      heroSubtitle:
        'Seven integrated service modules designed to cover the complete lifecycle of a patient\'s hospital journey.',

      sectionBadge: 'All Services',
      sectionTitle: 'What Trails Monitor Hub Offers',
      sectionSubtitle: 'Each service module is role-aware and integrates with others to form a coherent clinical and administrative workflow.',

      s1Title: 'Patient Registration',
      s1Desc: 'Efficient and accurate patient intake with unique ID generation, duplicate detection, and emergency registration support.',
      s1Detail1: 'Normal and emergency registration workflows',
      s1Detail2: 'Unique Patient ID generation with duplicate-check mechanism',
      s1Detail3: 'Emergency cases can be completed later without blocking urgent care',

      s2Title: 'Medical Record Management',
      s2Desc: 'Centralized, chronological patient records accessible to authorized users across all portals.',
      s2Detail1: 'Diagnoses, allergies, prescriptions, and lab results in one place',
      s2Detail2: 'Organ-specific records with audit history for every change',
      s2Detail3: 'Doctor notes and consultation records timestamped and author-attributed',

      s3Title: 'Appointment Scheduling',
      s3Desc: 'Structured appointment creation and management with conflict detection and status tracking.',
      s3Detail1: 'Book, reschedule, and cancel appointments through the staff portal',
      s3Detail2: 'Conflict detection prevents double-booking of doctors',
      s3Detail3: 'Status tracking: Scheduled, Checked In, Completed, Cancelled, Delayed',

      s4Title: 'Queue Management',
      s4Desc: 'Real-time OPD queue visibility for staff and patients with priority support for emergency cases.',
      s4Detail1: 'Live queue status: Waiting, In Consultation, Completed',
      s4Detail2: 'Emergency cases highlighted and prioritized explicitly',
      s4Detail3: 'Patients can view their estimated wait position',

      s5Title: 'Health Monitoring & Reports',
      s5Desc: 'Organized access to lab reports, diagnostic test results, and health vitals tracking for doctors and patients.',
      s5Detail1: 'Structured lab and diagnostic report repository',
      s5Detail2: 'Vitals tracking: ECG, Heart Rate, SpO₂, Blood Pressure, Temperature',
      s5Detail3: 'Future device integration pathway clearly defined',

      s6Title: 'Emergency Assistance',
      s6Desc: 'One-tap Call for Help for patients, combined with emergency intake workflows and priority triage for hospital staff.',
      s6Detail1: 'Prominent Call for Help button in the patient portal',
      s6Detail2: 'Emergency request status shown to the requesting patient',
      s6Detail3: 'Staff see emergency cases in a dedicated view with clear priority indicators',

      s7Title: 'Bilingual Communication',
      s7Desc: 'Full English and Hindi support across all portals, navigation, forms, and clinical interface elements.',
      s7Detail1: 'Every implemented screen switchable between English and Hindi',
      s7Detail2: 'Language preference persisted across navigation and sessions',
      s7Detail3: 'Devanagari typography optimized to prevent text overflow and clipping',

      noticeTitle: 'Prototype Implementation Notice',
      noticeText: 'Trails Monitor Hub is currently in phased development. Services marked as available reflect the platform design and workflow architecture. Real medical device integration, persistent database storage, and production authentication will be introduced in later phases, clearly separated from demonstration features.',
      ctaTitle: 'Explore Your Dedicated Portal',
      ctaButton: 'Select Your Portal',
    },

    contact: {
      pageTitle: 'Contact | Trails Monitor Hub',
      pageBadge: 'Get in Touch',
      heroHeadline: 'Contact & Support',
      heroSubtitle: 'Reach out with questions, feedback, or collaboration inquiries about Trails Monitor Hub.',

      formTitle: 'Send Us a Message',
      formSubtitle: 'Use this form to send questions, feedback, or feature requests. Responses will be sent to the email address you provide.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Brief description of your inquiry',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your question, feedback, or inquiry in detail...',
      submitButton: 'Send Message',
      submitting: 'Sending...',

      successTitle: 'Message Received',
      successText: 'Thank you for reaching out. Your message has been recorded in this prototype.',
      successNote: 'Note: This is a frontend demonstration. Messages submitted here are not delivered to any real email address or support system. A backend integration will be required for actual message delivery.',
      sendAnother: 'Send Another Message',

      errorRequired: 'This field is required.',
      errorEmail: 'Please enter a valid email address.',
      errorMessageLen: 'Message must be at least 20 characters.',
      errorSubmit: 'Submission encountered an issue. Please try again.',

      infoTitle: 'Contact Information',
      emailInfoLabel: 'Support Email',
      emailInfoVal: 'support@trailsmonitor.demo',
      phoneInfoLabel: 'Helpline',
      phoneInfoVal: '+91 1800-000-DEMO',
      hoursLabel: 'Support Hours',
      hoursVal: 'Monday – Friday, 9 AM to 6 PM IST',
      addressLabel: 'Headquarters',
      addressVal: 'Healthcare Innovation District, New Delhi — 110 001, India',

      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Is Trails Monitor Hub available for production use?',
      faq1A: 'Trails Monitor Hub is currently in phased prototype development. The platform is not yet connected to real patient databases or live authentication systems.',
      faq2Q: 'Which languages does the platform support?',
      faq2A: 'The platform supports English and Hindi throughout all implemented pages and portals. The language toggle is available in the navigation bar.',
      faq3Q: 'How can I log in to a portal?',
      faq3A: 'Select your role on the portal selection page. Demo credentials for each role are available on the login screen. These credentials are for development testing only.',
      prototypeNote: 'Prototype Notice: This contact form does not send real messages. It is a demonstration of the planned contact workflow.',
    },

    portalSelect: {
      pageTitle: 'Select Your Portal | Trails Monitor Hub',
      pageBadge: 'Portal Access',
      heroHeadline: 'Select Your Role to Continue',
      heroSubtitle: 'Choose the portal that matches your role in the healthcare system.',
      selectPrompt: 'Choose your portal',
      doctorTitle: 'Doctor',
      doctorDesc: 'Clinical workspace with smart queue, patient profiles, consultations, vitals, and organ-specific records.',
      doctorCta: 'Continue as Doctor',
      staffTitle: 'Hospital Staff',
      staffDesc: 'Administrative portal for patient registration, appointment scheduling, queue management, and emergency intake.',
      staffCta: 'Continue as Staff',
      patientTitle: 'Patient',
      patientDesc: 'Access your records, appointments, prescriptions, queue status, and health diary in a simple accessible interface.',
      patientCta: 'Continue as Patient',
      demoNotice: 'Development prototype — demo credentials are provided on each login screen.',
    },

    login: {
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email address',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      loginButton: 'Sign In',
      loggingIn: 'Signing in...',
      backToHome: 'Back to Home',
      changePortal: 'Change Portal',
      demoCredentials: 'Demo Credentials',
      demoCopy: 'Copy',
      errorRequired: 'This field is required.',
      errorEmail: 'Please enter a valid email address.',
      errorPasswordLen: 'Password must be at least 6 characters.',
      errorInvalidCreds: 'Incorrect email or password. Please check your demo credentials and try again.',
      errorGeneric: 'An error occurred. Please try again.',
      successTitle: 'Login Successful',
      successText: 'Redirecting to your dashboard... (Portal dashboard will be available in Phase 3–5.)',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      forgotNotice: 'Password reset is not available in this prototype. Use the demo credentials provided.',

      doctorTitle: 'Doctor Sign In',
      doctorSubtitle: 'Access your clinical workspace, patient queue, and medical records.',
      doctorBadge: 'Clinical Portal',

      staffTitle: 'Hospital Staff Sign In',
      staffSubtitle: 'Access patient registration, appointments, and queue management tools.',
      staffBadge: 'Administrative Portal',

      patientTitle: 'Patient Sign In',
      patientSubtitle: 'View your appointments, medical records, and health information.',
      patientBadge: 'Patient Portal',
    },
    staffPortal: staffTranslationsEn,
    doctorPortal: doctorTranslationsEn,
    patientPortal: patientTranslationsEn,
  },

  hi: {
    nav: {
      brandName: 'ट्रेल्स मॉनिटर हब',
      brandTagline: 'एकीकृत स्वास्थ्य सेवा प्रणाली',
      home: 'होम',
      aboutUs: 'हमारे बारे में',
      services: 'सेवाएं',
      contact: 'संपर्क करें',
      login: 'लॉगिन',
      languageToggle: 'English',
      openMenu: 'मुख्य मेनू खोलें',
      closeMenu: 'मेनू बंद करें',
      phaseBadge: 'फेज 6 एकीकरण सक्रिय',
    },
    hero: {
      badge: 'स्वास्थ्य प्रबंधन मंच',
      headline: 'संबद्ध स्वास्थ्य सेवा। बेहतर रोगी परिणाम।',
      supportingText:
        'ट्रेल्स मॉनिटर हब एक एकीकृत स्वास्थ्य प्रबंधन मंच है जो डॉक्टरों, अस्पताल के कर्मचारियों और रोगियों को समन्वित चिकित्सीय कार्यप्रवाह, व्यवस्थित मेडिकल रिकॉर्ड और स्पष्ट रोगी संचार के माध्यम से जोड़ता है।',
      getStarted: 'शुरू करें',
      exploreServices: 'सेवाएं देखें',
      activeUsersBadge: 'समन्वित देखभाल',
      activeUsersText: 'डॉक्टर • अस्पताल कर्मचारी • रोगी एक साथ जुड़े',
      securityBadge: 'मानकीकृत स्वास्थ्य सेवा डिज़ाइन प्रणाली',
    },
    portals: {
      sectionBadge: 'भूमिका-विशिष्ट पहुंच',
      sectionTitle: 'प्रत्येक हितधारक के लिए समर्पित पोर्टल',
      sectionSubtitle:
        'अनुकूलित चिकित्सीय, प्रशासनिक या रोगी-केंद्रित कार्यप्रवाह का अनुभव करने के लिए अपना पोर्टल चुनें।',
      doctorTitle: 'डॉक्टर पोर्टल',
      doctorDesc:
        'मरीजों का प्रबंधन करें, संपूर्ण मेडिकल रिकॉर्ड की समीक्षा करें, परामर्श दें और उच्च-दक्षता वाले क्लिनिकल टूल्स के साथ उपलब्ध स्वास्थ्य जानकारी की निगरानी करें।',
      doctorCta: 'डॉक्टर लॉगिन',
      doctorBadge: 'क्लिनिकल कार्यक्षेत्र',
      staffTitle: 'अस्पताल स्टाफ पोर्टल',
      staffDesc:
        'नए और आपातकालीन रोगियों का पंजीकरण करें, डॉक्टर के अपॉइंटमेंट आयोजित करें, अस्पताल की कतारों का प्रबंधन करें और त्वरित ट्राइएज सुनिश्चित करें।',
      staffCta: 'स्टाफ लॉगिन',
      staffBadge: 'प्रशासनिक संचालन',
      patientTitle: 'रोगी पोर्टल',
      patientDesc:
        'व्यक्तिगत मेडिकल रिकॉर्ड, डायग्नोस्टिक टेस्ट रिपोर्ट, आगामी अपॉइंटमेंट, लाइव कतार अपडेट और सरल सहायता टूल कभी भी एक्सेस करें।',
      patientCta: 'मरीज़ लॉगिन',
      patientBadge: 'सुलभ स्वास्थ्य सेवा',
      modalTitle: 'पोर्टल प्रवेश विवरण',
      modalNotice: 'समर्पित लॉगिन स्क्रीन पर जाने के लिए ऊपर अपनी भूमिका चुनें।',
      modalCredentials: 'विकास डेमो क्रेडेंशियल:',
      modalEmail: 'ईमेल',
      modalPassword: 'पासवर्ड',
      modalClose: 'विंडो बंद करें',
    },
    features: {
      sectionBadge: 'मुख्य क्षमताएं',
      sectionTitle: 'आधुनिक स्वास्थ्य सेवा के लिए आवश्यक सब कुछ',
      sectionSubtitle:
        'अस्पताल के संचालन को सुव्यवस्थित करने, कागजी कार्रवाई की बाधाओं को दूर करने और रोगी को देखभाल के केंद्र में रखने के लिए निर्मित।',
      feature1Title: 'एकीकृत रोगी रिकॉर्ड',
      feature1Desc:
        'निदान, नुस्खे, लैब परिणाम और एलर्जी को बिना दोबारा डेटा प्रविष्टि के एकत्रित करने वाला केंद्रीकृत, कालानुक्रमिक रोगी इतिहास।',
      feature2Title: 'नियुक्ति और कतार प्रबंधन',
      feature2Desc:
        'ओपीडी रोगियों के लिए रीयल-टाइम कतार ट्रैकिंग, प्रतीक्षा समय की स्पष्ट दृश्यता और ट्राइएज स्टाफ और डॉक्टरों के बीच सुगम समन्वय।',
      feature3Title: 'चिकित्सा रिपोर्ट और स्वास्थ्य निगरानी',
      feature3Desc:
        'व्यवस्थित लैब रिपोर्ट एक्सेस, निरंतर वाइटल्स ट्रैकिंग (ईसीजी, हृदय गति, SpO2, रक्तचाप) और अंग-विशिष्ट क्लिनिकल अवलोकन।',
      feature4Title: 'आपातकालीन सहायता',
      feature4Desc:
        'त्वरित आपातकालीन पंजीकरण कार्यप्रवाह, प्राथमिकता कतार टैगिंग और अस्वस्थ रोगियों के लिए तत्काल वन-टैप सहायता कॉल क्षमताएं।',
      feature5Title: 'संबद्ध स्वास्थ्य सेवा प्रबंधन',
      feature5Desc:
        'एक एकीकृत पारिस्थितिकी तंत्र में कंपाउंडरों, रिसेप्शनिस्टों, क्लिनिकल विशेषज्ञों और रोगियों को जोड़ने वाला निर्बाध संचार पुल।',
    },
    platformIntro: {
      sectionBadge: 'एकीकृत पारिस्थितिकी तंत्र',
      sectionTitle: 'ट्रेल्स मॉनिटर हब देखभाल दल को कैसे जोड़ता है',
      sectionSubtitle:
        'स्वास्थ्य सेवा तब सबसे अच्छी होती है जब डॉक्टर, प्रशासनिक कर्मचारी और मरीज़ एक ही विश्वसनीय प्रणाली साझा करते हैं।',
      staffStepTitle: '1. त्वरित पंजीकरण और कतारबद्धता',
      staffStepDesc:
        'अस्पताल कर्मचारी अद्वितीय आईडी के साथ रोगियों को पंजीकृत करते हैं, वॉक-इन संभालते हैं, प्राथमिकता तय करते हैं और स्मार्ट कतार में निर्देशित करते हैं।',
      doctorStepTitle: '2. क्लिनिकल मूल्यांकन और दस्तावेज़ीकरण',
      doctorStepDesc:
        'डॉक्टर तुरंत रोगी के इतिहास की समीक्षा करते हैं, परामर्श नोट्स दर्ज करते हैं, दवाएं लिखते हैं और प्रयोगशाला परीक्षणों का आदेश देते हैं।',
      patientStepTitle: '3. पारदर्शी देखभाल और सशक्तिकरण',
      patientStepDesc:
        'मरीज़ अपनी यात्रा की स्थिति की निगरानी करते हैं, दवा रिमाइंडर देखते हैं, लैब निष्कर्षों की समीक्षा करते हैं और अपनी पसंदीदा भाषा में स्वास्थ्य डायरी रखते हैं।',
      disclaimerTitle: 'स्वास्थ्य सेवा प्रोटोटाइप सूचना',
      disclaimerText:
        'ट्रेल्स मॉनिटर हब चरण 2 वास्तविक नेविगेशन और डेमो लॉगिन स्क्रीन के साथ सार्वजनिक वेबसाइट को पूरा करता है। प्रत्यक्ष चिकित्सा उपकरण टेलीमेट्री और लाइव अस्पताल एकीकरण आगामी चरणों में जुड़ेंगे।',
    },
    cta: {
      badge: 'अपनी यात्रा शुरू करें',
      title: 'समन्वित स्वास्थ्य सेवा का अनुभव करने के लिए तैयार हैं?',
      subtitle: 'अपने समर्पित लॉगिन स्क्रीन और पोर्टल तक पहुंचने के लिए अपनी भूमिका चुनें।',
      primaryButton: 'अपना पोर्टल चुनें',
      secondaryButton: 'हमारे बारे में अधिक जानें',
    },
    footer: {
      description:
        'ट्रेल्स मॉनिटर हब एक एंटरप्राइज़ हेल्थकेयर प्रबंधन मंच है जो रोगी पंजीकरण, क्लिनिकल परामर्श, कतार प्रबंधन और स्वास्थ्य रिकॉर्ड को एक एकीकृत प्रणाली में लाता है।',
      quickLinksTitle: 'प्लेटफ़ॉर्म नेविगेशन',
      home: 'होम',
      aboutUs: 'हमारे बारे में',
      services: 'सेवाएं',
      contact: 'संपर्क करें',
      portalsTitle: 'भूमिका पोर्टल',
      doctorPortal: 'डॉक्टर पोर्टल',
      staffPortal: 'अस्पताल स्टाफ पोर्टल',
      patientPortal: 'रोगी पोर्टल',
      supportTitle: 'संपर्क और सहायता',
      emailLabel: 'सहायता ईमेल',
      emailVal: 'support@trailsmonitor.demo',
      phoneLabel: 'हेल्पलाइन',
      phoneVal: '+91 1800-000-DEMO (टोल-फ्री)',
      addressLabel: 'मुख्यालय',
      addressVal: 'हेल्थकेयर इनोवेशन डिस्ट्रिक्ट, नई दिल्ली, भारत',
      privacy: 'गोपनीयता सुरक्षा',
      terms: 'उपयोग की शर्तें',
      copyright: '© 2026 ट्रेल्स मॉनिटर हब। सर्वाधिकार सुरक्षित।',
      medicalDisclaimer:
        'अस्वीकरण: ट्रेल्स मॉनिटर हब एक प्रदर्शन स्वास्थ्य प्रबंधन प्रणाली है। सिम्युलेटेड वाइटल्स और डेमो रिकॉर्ड केवल विकास मूल्यांकन के लिए हैं।',
    },
    common: {
      phaseNoticeTitle: 'सुविधा उपलब्धता',
      phaseNoticeDesc:
        'यह सुविधा परियोजना रोडमैप का हिस्सा है और आगामी चरण में उपलब्ध होगी।',
      okButton: 'समझ गया',
      demoNote: 'प्रोटोटाइप मोड',
      activeRole: 'चयनित भूमिका',
      backToHome: 'होम पर वापस जाएं',
      required: 'आवश्यक',
      optional: 'वैकल्पिक',
    },

    about: {
      pageTitle: 'हमारे बारे में | ट्रेल्स मॉनिटर हब',
      pageBadge: 'हमारी कहानी और मिशन',
      heroHeadline: 'स्वास्थ्य सेवा बनाना जो वास्तव में जोड़ती है',
      heroSubtitle:
        'ट्रेल्स मॉनिटर हब को आधुनिक स्वास्थ्य सेवा में डॉक्टरों, अस्पताल कर्मचारियों और रोगियों के बीच के समन्वय अंतर को हल करने के लिए डिज़ाइन किया गया था।',

      overviewBadge: 'प्लेटफ़ॉर्म अवलोकन',
      overviewTitle: 'ट्रेल्स मॉनिटर हब क्या है?',
      overviewText1:
        'ट्रेल्स मॉनिटर हब एक एकीकृत स्वास्थ्य प्रबंधन मंच है जिसे रोगी पंजीकरण, मेडिकल रिकॉर्ड, अपॉइंटमेंट, कतार प्रबंधन, परामर्श और रोगी संचार को एक सुसंगत प्रणाली में लाने के लिए डिज़ाइन किया गया है।',
      overviewText2:
        'प्लेटफ़ॉर्म तीन अलग-अलग पोर्टल प्रदान करता है — डॉक्टरों, अस्पताल स्टाफ और रोगियों के लिए — प्रत्येक उस भूमिका के विशिष्ट कार्यप्रवाह, जिम्मेदारियों और सूचना आवश्यकताओं के अनुसार अनुकूलित।',

      missionBadge: 'मिशन और दृष्टि',
      missionTitle: 'हमारा मिशन',
      missionText:
        'प्रशासनिक बोझ को कम करना, अधिकृत स्वास्थ्य सेवा प्रदाताओं के लिए जानकारी तक पहुंच में सुधार करना और रोगियों को एक पारदर्शी, सुलभ और द्विभाषी मंच के माध्यम से अपनी देखभाल यात्रा में सक्रिय रूप से भाग लेने में सक्षम बनाना।',
      visionTitle: 'हमारी दृष्टि',
      visionText:
        'एक स्वास्थ्य सेवा प्रणाली जहां कोई भी रोगी खंडित जानकारी की दरारों से नहीं गिरता, जहां डॉक्टर कागजी कार्रवाई के बजाय नैदानिक देखभाल पर समय बिता सकते हैं, और जहां हर हितधारक के पास वही जानकारी है जो उन्हें चाहिए।',

      problemBadge: 'समस्या का विवरण',
      problemTitle: 'हमने यह क्यों बनाया',
      problem1Title: 'खंडित रिकॉर्ड',
      problem1Desc: 'विभागों और भौतिक फाइलों में बिखरे रोगी इतिहास नैदानिक निर्णयों को कठिन और धीमा बनाते हैं।',
      problem2Title: 'कतार की अस्पष्टता',
      problem2Desc: 'रोगियों और कर्मचारियों के पास प्रतीक्षा समय, अपॉइंटमेंट स्थिति और कतार परिवर्तनों की रीयल-टाइम दृश्यता नहीं है।',
      problem3Title: 'समन्वय की कमी',
      problem3Desc: 'अस्पताल कर्मचारी और डॉक्टर अक्सर साझा प्रणाली के बिना काम करते हैं, जिससे गलत संचार और देरी होती है।',
      problem4Title: 'रोगी की भ्रम',
      problem4Desc: 'रोगी अक्सर अपने स्वयं के रिकॉर्ड, दवा निर्देशों या अपॉइंटमेंट जानकारी तक आसानी से नहीं पहुंच सकते।',

      benefitsBadge: 'भूमिका लाभ',
      benefitsTitle: 'देखभाल पारिस्थितिकी तंत्र में सभी के लिए बनाया गया',
      doctorBenefitTitle: 'डॉक्टरों के लिए',
      doctorBenefit1: 'परामर्श कतार से एक क्लिक में पूर्ण रोगी इतिहास तक पहुंचें',
      doctorBenefit2: 'ऑडिट करने योग्य कार्यप्रवाह में परामर्श, नुस्खे और निष्कर्ष दस्तावेज़ करें',
      doctorBenefit3: 'कालानुक्रमिक रूप से व्यवस्थित अंग-विशिष्ट रिकॉर्ड और लैब परिणामों की समीक्षा करें',
      staffBenefitTitle: 'अस्पताल स्टाफ के लिए',
      staffBenefit1: 'अद्वितीय आईडी जनरेशन के साथ सामान्य और आपातकालीन रोगियों को तेजी से पंजीकृत करें',
      staffBenefit2: 'अपॉइंटमेंट, शेड्यूलिंग और लाइव ओपीडी कतार ट्रैकिंग प्रबंधित करें',
      staffBenefit3: 'स्थिति परिवर्तन और आपातकालीन मामलों पर तत्काल सूचनाएं प्राप्त करें',
      patientBenefitTitle: 'रोगियों के लिए',
      patientBenefit1: 'कतार स्थिति, अपॉइंटमेंट शेड्यूल और यात्रा स्थिति पारदर्शी रूप से देखें',
      patientBenefit2: 'नुस्खे, लैब रिपोर्ट और दवा रिमाइंडर कभी भी एक्सेस करें',
      patientBenefit3: 'स्वास्थ्य डायरी बनाए रखें और एक प्रमुख वन-टैप बटन के माध्यम से सहायता का अनुरोध करें',

      valueBadge: 'मूल मूल्य',
      valueTitle: 'सिद्धांत जो हर निर्णय का मार्गदर्शन करते हैं',
      value1Title: 'रोगी-केंद्रित डिज़ाइन',
      value1Desc: 'हर इंटरफेस निर्णय रोगी की सुरक्षा, गरिमा और पहुंच को प्राथमिकता देता है।',
      value2Title: 'नैदानिक अखंडता',
      value2Desc: 'मेडिकल रिकॉर्ड और क्लिनिकल नोट्स ऑडिट करने योग्य, टाइमस्टैम्प और लेखक-जिम्मेदार हैं।',
      value3Title: 'पारदर्शी प्रोटोटाइपिंग',
      value3Desc: 'डेमो डेटा स्पष्ट रूप से लेबल किया गया है। सिम्युलेटेड रीडिंग कभी भी वास्तविक नैदानिक डेटा के रूप में प्रस्तुत नहीं की जाती।',
      value4Title: 'समावेशी भाषा',
      value4Desc: 'अंग्रेजी और हिंदी में पूर्ण द्विभाषी समर्थन ताकि भाषा बाधाओं के कारण कोई भी उपयोगकर्ता पीछे न छूटे।',

      ctaTitle: 'इसे कार्रवाई में देखने के लिए तैयार हैं?',
      ctaSubtitle: 'अपनी भूमिका चुनें और अपनी ज़रूरतों के लिए डिज़ाइन किए गए पोर्टल का अन्वेषण करें।',
      ctaButton: 'अपना पोर्टल चुनें',
    },

    services: {
      pageTitle: 'सेवाएं | ट्रेल्स मॉनिटर हब',
      pageBadge: 'प्लेटफ़ॉर्म सेवाएं',
      heroHeadline: 'व्यापक स्वास्थ्य सेवा प्रबंधन सेवाएं',
      heroSubtitle: 'सात एकीकृत सेवा मॉड्यूल जो रोगी की अस्पताल यात्रा के पूर्ण जीवनचक्र को कवर करने के लिए डिज़ाइन किए गए हैं।',

      sectionBadge: 'सभी सेवाएं',
      sectionTitle: 'ट्रेल्स मॉनिटर हब क्या प्रदान करता है',
      sectionSubtitle: 'प्रत्येक सेवा मॉड्यूल भूमिका-जागरूक है और एक सुसंगत नैदानिक और प्रशासनिक कार्यप्रवाह बनाने के लिए दूसरों के साथ एकीकृत होता है।',

      s1Title: 'रोगी पंजीकरण',
      s1Desc: 'अद्वितीय आईडी जनरेशन, डुप्लीकेट डिटेक्शन और आपातकालीन पंजीकरण समर्थन के साथ कुशल और सटीक रोगी सेवन।',
      s1Detail1: 'सामान्य और आपातकालीन पंजीकरण कार्यप्रवाह',
      s1Detail2: 'डुप्लीकेट-चेक तंत्र के साथ अद्वितीय रोगी आईडी जनरेशन',
      s1Detail3: 'आपातकालीन मामले बाद में पूरे किए जा सकते हैं बिना तत्काल देखभाल रोके',

      s2Title: 'मेडिकल रिकॉर्ड प्रबंधन',
      s2Desc: 'सभी पोर्टल में अधिकृत उपयोगकर्ताओं के लिए सुलभ केंद्रीकृत, कालानुक्रमिक रोगी रिकॉर्ड।',
      s2Detail1: 'निदान, एलर्जी, नुस्खे और लैब परिणाम एक जगह',
      s2Detail2: 'हर बदलाव के ऑडिट इतिहास के साथ अंग-विशिष्ट रिकॉर्ड',
      s2Detail3: 'डॉक्टर नोट्स और परामर्श रिकॉर्ड टाइमस्टैम्प और लेखक-जिम्मेदार',

      s3Title: 'अपॉइंटमेंट शेड्यूलिंग',
      s3Desc: 'संघर्ष डिटेक्शन और स्थिति ट्रैकिंग के साथ संरचित अपॉइंटमेंट निर्माण और प्रबंधन।',
      s3Detail1: 'स्टाफ पोर्टल के माध्यम से बुक करें, पुनर्निर्धारित करें और रद्द करें',
      s3Detail2: 'संघर्ष डिटेक्शन डॉक्टरों की दोहरी बुकिंग रोकता है',
      s3Detail3: 'स्थिति ट्रैकिंग: निर्धारित, चेक-इन, पूर्ण, रद्द, विलंबित',

      s4Title: 'कतार प्रबंधन',
      s4Desc: 'आपातकालीन मामलों के लिए प्राथमिकता समर्थन के साथ स्टाफ और रोगियों के लिए रीयल-टाइम ओपीडी कतार दृश्यता।',
      s4Detail1: 'लाइव कतार स्थिति: प्रतीक्षारत, परामर्श में, पूर्ण',
      s4Detail2: 'आपातकालीन मामले स्पष्ट रूप से हाइलाइट और प्राथमिकता दी गई',
      s4Detail3: 'रोगी अपनी अनुमानित प्रतीक्षा स्थिति देख सकते हैं',

      s5Title: 'स्वास्थ्य निगरानी और रिपोर्ट',
      s5Desc: 'डॉक्टरों और रोगियों के लिए लैब रिपोर्ट, डायग्नोस्टिक टेस्ट परिणामों और स्वास्थ्य वाइटल्स ट्रैकिंग तक व्यवस्थित पहुंच।',
      s5Detail1: 'संरचित लैब और डायग्नोस्टिक रिपोर्ट रिपॉजिटरी',
      s5Detail2: 'वाइटल्स ट्रैकिंग: ईसीजी, हृदय गति, SpO₂, रक्तचाप, तापमान',
      s5Detail3: 'भविष्य के डिवाइस एकीकरण मार्ग स्पष्ट रूप से परिभाषित',

      s6Title: 'आपातकालीन सहायता',
      s6Desc: 'रोगियों के लिए वन-टैप सहायता कॉल, आपातकालीन सेवन कार्यप्रवाह और अस्पताल कर्मचारियों के लिए प्राथमिकता ट्राइएज के साथ संयुक्त।',
      s6Detail1: 'रोगी पोर्टल में प्रमुख सहायता के लिए कॉल बटन',
      s6Detail2: 'अनुरोध करने वाले रोगी को आपातकालीन अनुरोध की स्थिति दिखाई जाती है',
      s6Detail3: 'स्टाफ स्पष्ट प्राथमिकता संकेतकों के साथ समर्पित दृश्य में आपातकालीन मामले देखते हैं',

      s7Title: 'द्विभाषी संचार',
      s7Desc: 'सभी पोर्टल, नेविगेशन, फॉर्म और नैदानिक इंटरफेस तत्वों में पूर्ण अंग्रेजी और हिंदी समर्थन।',
      s7Detail1: 'प्रत्येक कार्यान्वित स्क्रीन अंग्रेजी और हिंदी के बीच स्विच करने योग्य',
      s7Detail2: 'नेविगेशन और सत्रों में भाषा प्राथमिकता बनाए रखी जाती है',
      s7Detail3: 'टेक्स्ट ओवरफ्लो और क्लिपिंग को रोकने के लिए देवनागरी टाइपोग्राफी अनुकूलित',

      noticeTitle: 'प्रोटोटाइप कार्यान्वयन सूचना',
      noticeText: 'ट्रेल्स मॉनिटर हब वर्तमान में चरणबद्ध प्रोटोटाइप विकास में है। उपलब्ध के रूप में चिह्नित सेवाएं प्लेटफ़ॉर्म डिज़ाइन और कार्यप्रवाह आर्किटेक्चर को दर्शाती हैं। वास्तविक चिकित्सा उपकरण एकीकरण, स्थायी डेटाबेस भंडारण और उत्पादन प्रमाणीकरण बाद के चरणों में पेश किए जाएंगे।',
      ctaTitle: 'अपना समर्पित पोर्टल खोजें',
      ctaButton: 'अपना पोर्टल चुनें',
    },

    contact: {
      pageTitle: 'संपर्क करें | ट्रेल्स मॉनिटर हब',
      pageBadge: 'संपर्क करें',
      heroHeadline: 'संपर्क और सहायता',
      heroSubtitle: 'ट्रेल्स मॉनिटर हब के बारे में प्रश्नों, फीडबैक या सहयोग पूछताछ के साथ संपर्क करें।',

      formTitle: 'हमें एक संदेश भेजें',
      formSubtitle: 'प्रश्न, फीडबैक या फीचर अनुरोध भेजने के लिए इस फॉर्म का उपयोग करें। उत्तर आपके द्वारा प्रदान किए गए ईमेल पते पर भेजे जाएंगे।',
      nameLabel: 'पूरा नाम',
      namePlaceholder: 'अपना पूरा नाम दर्ज करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'विषय',
      subjectPlaceholder: 'अपनी पूछताछ का संक्षिप्त विवरण',
      messageLabel: 'संदेश',
      messagePlaceholder: 'अपने प्रश्न, फीडबैक या पूछताछ का विस्तार से वर्णन करें...',
      submitButton: 'संदेश भेजें',
      submitting: 'भेज रहे हैं...',

      successTitle: 'संदेश प्राप्त हुआ',
      successText: 'संपर्क करने के लिए धन्यवाद। आपका संदेश इस प्रोटोटाइप में दर्ज किया गया है।',
      successNote: 'नोट: यह एक फ्रंटएंड डेमो है। यहां सबमिट किए गए संदेश किसी वास्तविक ईमेल पते या सहायता प्रणाली तक नहीं पहुंचाए जाते।',
      sendAnother: 'एक और संदेश भेजें',

      errorRequired: 'यह फ़ील्ड आवश्यक है।',
      errorEmail: 'कृपया एक वैध ईमेल पता दर्ज करें।',
      errorMessageLen: 'संदेश कम से कम 20 अक्षरों का होना चाहिए।',
      errorSubmit: 'सबमिशन में समस्या आई। कृपया पुनः प्रयास करें।',

      infoTitle: 'संपर्क जानकारी',
      emailInfoLabel: 'सहायता ईमेल',
      emailInfoVal: 'support@trailsmonitor.demo',
      phoneInfoLabel: 'हेल्पलाइन',
      phoneInfoVal: '+91 1800-000-DEMO',
      hoursLabel: 'सहायता घंटे',
      hoursVal: 'सोमवार – शुक्रवार, सुबह 9 से शाम 6 बजे IST',
      addressLabel: 'मुख्यालय',
      addressVal: 'हेल्थकेयर इनोवेशन डिस्ट्रिक्ट, नई दिल्ली — 110 001, भारत',

      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
      faq1Q: 'क्या ट्रेल्स मॉनिटर हब उत्पादन उपयोग के लिए उपलब्ध है?',
      faq1A: 'ट्रेल्स मॉनिटर हब वर्तमान में चरणबद्ध प्रोटोटाइप विकास में है। प्लेटफ़ॉर्म अभी तक वास्तविक रोगी डेटाबेस या लाइव प्रमाणीकरण प्रणाली से कनेक्ट नहीं है।',
      faq2Q: 'प्लेटफ़ॉर्म कौन सी भाषाओं का समर्थन करता है?',
      faq2A: 'प्लेटफ़ॉर्म सभी कार्यान्वित पृष्ठों और पोर्टल में अंग्रेजी और हिंदी का समर्थन करता है। भाषा टॉगल नेविगेशन बार में उपलब्ध है।',
      faq3Q: 'मैं पोर्टल में कैसे लॉगिन कर सकता हूं?',
      faq3A: 'पोर्टल चयन पृष्ठ पर अपनी भूमिका चुनें। प्रत्येक भूमिका के लिए डेमो क्रेडेंशियल लॉगिन स्क्रीन पर उपलब्ध हैं। ये क्रेडेंशियल केवल विकास परीक्षण के लिए हैं।',
      prototypeNote: 'प्रोटोटाइप सूचना: यह संपर्क फॉर्म वास्तविक संदेश नहीं भेजता। यह नियोजित संपर्क कार्यप्रवाह का प्रदर्शन है।',
    },

    portalSelect: {
      pageTitle: 'अपना पोर्टल चुनें | ट्रेल्स मॉनिटर हब',
      pageBadge: 'पोर्टल पहुंच',
      heroHeadline: 'जारी रखने के लिए अपनी भूमिका चुनें',
      heroSubtitle: 'वह पोर्टल चुनें जो स्वास्थ्य सेवा प्रणाली में आपकी भूमिका से मेल खाता है।',
      selectPrompt: 'अपना पोर्टल चुनें',
      doctorTitle: 'डॉक्टर',
      doctorDesc: 'स्मार्ट कतार, रोगी प्रोफाइल, परामर्श, वाइटल्स और अंग-विशिष्ट रिकॉर्ड के साथ क्लिनिकल कार्यक्षेत्र।',
      doctorCta: 'डॉक्टर के रूप में जारी रखें',
      staffTitle: 'अस्पताल स्टाफ',
      staffDesc: 'रोगी पंजीकरण, अपॉइंटमेंट शेड्यूलिंग, कतार प्रबंधन और आपातकालीन सेवन के लिए प्रशासनिक पोर्टल।',
      staffCta: 'स्टाफ के रूप में जारी रखें',
      patientTitle: 'रोगी',
      patientDesc: 'एक सरल सुलभ इंटरफेस में अपने रिकॉर्ड, अपॉइंटमेंट, नुस्खे, कतार की स्थिति और स्वास्थ्य डायरी तक पहुंचें।',
      patientCta: 'रोगी के रूप में जारी रखें',
      demoNotice: 'विकास प्रोटोटाइप — डेमो क्रेडेंशियल प्रत्येक लॉगिन स्क्रीन पर प्रदान किए जाते हैं।',
    },

    login: {
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      showPassword: 'पासवर्ड दिखाएं',
      hidePassword: 'पासवर्ड छुपाएं',
      loginButton: 'साइन इन करें',
      loggingIn: 'साइन इन हो रहे हैं...',
      backToHome: 'होम पर वापस जाएं',
      changePortal: 'पोर्टल बदलें',
      demoCredentials: 'डेमो क्रेडेंशियल',
      demoCopy: 'कॉपी',
      errorRequired: 'यह फ़ील्ड आवश्यक है।',
      errorEmail: 'कृपया एक वैध ईमेल पता दर्ज करें।',
      errorPasswordLen: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
      errorInvalidCreds: 'गलत ईमेल या पासवर्ड। कृपया अपने डेमो क्रेडेंशियल जांचें और पुनः प्रयास करें।',
      errorGeneric: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
      successTitle: 'लॉगिन सफल',
      successText: 'आपके डैशबोर्ड पर रीडायरेक्ट हो रहे हैं... (पोर्टल डैशबोर्ड चरण 3-5 में उपलब्ध होगा।)',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      forgotNotice: 'पासवर्ड रीसेट इस प्रोटोटाइप में उपलब्ध नहीं है। दिए गए डेमो क्रेडेंशियल का उपयोग करें।',

      doctorTitle: 'डॉक्टर साइन इन',
      doctorSubtitle: 'अपने क्लिनिकल कार्यक्षेत्र, रोगी कतार और मेडिकल रिकॉर्ड तक पहुंचें।',
      doctorBadge: 'क्लिनिकल पोर्टल',

      staffTitle: 'अस्पताल स्टाफ साइन इन',
      staffSubtitle: 'रोगी पंजीकरण, अपॉइंटमेंट और कतार प्रबंधन टूल तक पहुंचें।',
      staffBadge: 'प्रशासनिक पोर्टल',

      patientTitle: 'रोगी साइन इन',
      patientSubtitle: 'अपने अपॉइंटमेंट, मेडिकल रिकॉर्ड और स्वास्थ्य जानकारी देखें।',
      patientBadge: 'रोगी पोर्टल',
    },
    staffPortal: staffTranslationsHi,
    doctorPortal: doctorTranslationsHi,
    patientPortal: patientTranslationsHi,
  },
};
