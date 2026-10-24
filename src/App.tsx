import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ContactPage } from './pages/public/ContactPage';
import { IntegrationTestingPage } from './pages/public/IntegrationTestingPage';
import { PortalSelectPage } from './pages/auth/PortalSelectPage';
import { LoginPage } from './pages/auth/LoginPage';

// Phase 3: Hospital Staff Portal Pages
import { StaffDashboardPage } from './pages/staff/StaffDashboardPage';
import { PatientRegistrationPage } from './pages/staff/PatientRegistrationPage';
import { PatientRecordsPage } from './pages/staff/PatientRecordsPage';
import { StaffAppointmentsPage } from './pages/staff/StaffAppointmentsPage';
import { StaffQueuePage } from './pages/staff/StaffQueuePage';
import { StaffEmergencyPage } from './pages/staff/StaffEmergencyPage';
import { StaffNotificationsPage } from './pages/staff/StaffNotificationsPage';
import { StaffSettingsPage } from './pages/staff/StaffSettingsPage';

// Phase 4: Doctor Portal Pages
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage';
import { DoctorSmartQueuePage } from './pages/doctor/DoctorSmartQueuePage';
import { DoctorPatientProfilesPage } from './pages/doctor/DoctorPatientProfilesPage';
import { DoctorVitalsPage } from './pages/doctor/DoctorVitalsPage';
import { DoctorConsultationsPage } from './pages/doctor/DoctorConsultationsPage';
import { DoctorAlertsPage } from './pages/doctor/DoctorAlertsPage';
import { DoctorHandoverPage } from './pages/doctor/DoctorHandoverPage';
import { DoctorSettingsPage } from './pages/doctor/DoctorSettingsPage';
import { DoctorAnatomyPage } from './pages/doctor/DoctorAnatomyPage';

// Phase 5: Patient Portal Pages
import { PatientDashboardPage } from './pages/patient/PatientDashboardPage';
import { PatientQueuePage } from './pages/patient/PatientQueuePage';
import { PatientDoctorVisitPage } from './pages/patient/PatientDoctorVisitPage';
import { PatientRecordsPage as PatientMedicalRecordsPage } from './pages/patient/PatientRecordsPage';
import { PatientVitalsPage } from './pages/patient/PatientVitalsPage';
import { PatientAppointmentsPage } from './pages/patient/PatientAppointmentsPage';
import { PatientMedicationsPage } from './pages/patient/PatientMedicationsPage';
import { PatientReportsPage } from './pages/patient/PatientReportsPage';
import { PatientHelpPage } from './pages/patient/PatientHelpPage';
import { PatientDiaryPage } from './pages/patient/PatientDiaryPage';
import { PatientBillingPage } from './pages/patient/PatientBillingPage';
import { PatientProfilePage } from './pages/patient/PatientProfilePage';

// Route Guard
import { ProtectedRoute } from './components/common/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/integration-tests" element={<IntegrationTestingPage />} />

          {/* Portal Selection & Role-Specific Logins */}
          <Route path="/portal" element={<PortalSelectPage />} />
          <Route path="/login/doctor" element={<LoginPage role="doctor" />} />
          <Route path="/login/staff" element={<LoginPage role="staff" />} />
          <Route path="/login/patient" element={<LoginPage role="patient" />} />

          {/* Phase 3: Hospital Staff Portal Routes (Protected) */}
          <Route path="/staff" element={<ProtectedRoute allowedRole="staff"><StaffDashboardPage /></ProtectedRoute>} />
          <Route path="/staff/registration" element={<ProtectedRoute allowedRole="staff"><PatientRegistrationPage /></ProtectedRoute>} />
          <Route path="/staff/records" element={<ProtectedRoute allowedRole="staff"><PatientRecordsPage /></ProtectedRoute>} />
          <Route path="/staff/appointments" element={<ProtectedRoute allowedRole="staff"><StaffAppointmentsPage /></ProtectedRoute>} />
          <Route path="/staff/queue" element={<ProtectedRoute allowedRole="staff"><StaffQueuePage /></ProtectedRoute>} />
          <Route path="/staff/emergency" element={<ProtectedRoute allowedRole="staff"><StaffEmergencyPage /></ProtectedRoute>} />
          <Route path="/staff/notifications" element={<ProtectedRoute allowedRole="staff"><StaffNotificationsPage /></ProtectedRoute>} />
          <Route path="/staff/settings" element={<ProtectedRoute allowedRole="staff"><StaffSettingsPage /></ProtectedRoute>} />

          {/* Phase 4: Doctor Portal Routes (Protected) */}
          <Route path="/doctor" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboardPage /></ProtectedRoute>} />
          <Route path="/doctor/queue" element={<ProtectedRoute allowedRole="doctor"><DoctorSmartQueuePage /></ProtectedRoute>} />
          <Route path="/doctor/profiles" element={<ProtectedRoute allowedRole="doctor"><DoctorPatientProfilesPage /></ProtectedRoute>} />
          <Route path="/doctor/anatomy" element={<ProtectedRoute allowedRole="doctor"><DoctorAnatomyPage /></ProtectedRoute>} />
          <Route path="/doctor/vitals" element={<ProtectedRoute allowedRole="doctor"><DoctorVitalsPage /></ProtectedRoute>} />
          <Route path="/doctor/consultations" element={<ProtectedRoute allowedRole="doctor"><DoctorConsultationsPage /></ProtectedRoute>} />
          <Route path="/doctor/alerts" element={<ProtectedRoute allowedRole="doctor"><DoctorAlertsPage /></ProtectedRoute>} />
          <Route path="/doctor/handover" element={<ProtectedRoute allowedRole="doctor"><DoctorHandoverPage /></ProtectedRoute>} />
          <Route path="/doctor/settings" element={<ProtectedRoute allowedRole="doctor"><DoctorSettingsPage /></ProtectedRoute>} />

          {/* Phase 5: Patient Portal Routes (Protected) */}
          <Route path="/patient" element={<ProtectedRoute allowedRole="patient"><PatientDashboardPage /></ProtectedRoute>} />
          <Route path="/patient/queue" element={<ProtectedRoute allowedRole="patient"><PatientQueuePage /></ProtectedRoute>} />
          <Route path="/patient/visit" element={<ProtectedRoute allowedRole="patient"><PatientDoctorVisitPage /></ProtectedRoute>} />
          <Route path="/patient/records" element={<ProtectedRoute allowedRole="patient"><PatientMedicalRecordsPage /></ProtectedRoute>} />
          <Route path="/patient/vitals" element={<ProtectedRoute allowedRole="patient"><PatientVitalsPage /></ProtectedRoute>} />
          <Route path="/patient/appointments" element={<ProtectedRoute allowedRole="patient"><PatientAppointmentsPage /></ProtectedRoute>} />
          <Route path="/patient/medications" element={<ProtectedRoute allowedRole="patient"><PatientMedicationsPage /></ProtectedRoute>} />
          <Route path="/patient/reports" element={<ProtectedRoute allowedRole="patient"><PatientReportsPage /></ProtectedRoute>} />
          <Route path="/patient/help" element={<ProtectedRoute allowedRole="patient"><PatientHelpPage /></ProtectedRoute>} />
          <Route path="/patient/diary" element={<ProtectedRoute allowedRole="patient"><PatientDiaryPage /></ProtectedRoute>} />
          <Route path="/patient/billing" element={<ProtectedRoute allowedRole="patient"><PatientBillingPage /></ProtectedRoute>} />
          <Route path="/patient/profile" element={<ProtectedRoute allowedRole="patient"><PatientProfilePage /></ProtectedRoute>} />

          {/* Catch-All: redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
