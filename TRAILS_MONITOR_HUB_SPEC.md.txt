# TRAILS MONITOR HUB
## Complete Project Master Specification & Phase-by-Phase Development Guide

**Project Type:** Unified Patient Monitoring and Management System  
**Project Goal:** Build a modern healthcare platform connecting doctors, hospital staff, and patients through a shared patient-management workflow.

---

# 1. Project Overview

Trails Monitor Hub is a healthcare management platform designed to bring patient registration, medical records, appointments, queue management, consultations, health monitoring, and patient communication into one unified system.

The platform has three separate portals:

1. **Doctor Portal** — Patient assessment, consultations, medical records, vitals, and clinical updates.
2. **Hospital Staff Portal** — Patient registration, appointment scheduling, queue management, and administrative operations.
3. **Patient Portal** — Personal medical records, appointments, queue status, reports, health diary, and assistance requests.

The public website introduces the platform and directs users to the appropriate portal.

## Main objectives

- Reduce manual administrative work.
- Make patient information easier to access for authorized users.
- Improve coordination between doctors and hospital staff.
- Help patients understand their appointments, queue status, and medical records.
- Support future integration with medical monitoring devices.
- Provide English and Hindi throughout the application.
- Deliver an accessible, responsive, professional healthcare experience.

## Development principle

Build the project from scratch during initial setup, but implement it incrementally.

**Only one phase should be implemented at a time.** Later phases must be supported by the architecture without being built prematurely.

---

# 2. Overall Application Structure

## Public website

- Home
- About Us
- Services
- Contact
- Login / Portal Selection
- English / हिंदी language toggle

## Doctor Portal

- Dashboard
- Smart Queue
- Patient Profiles
- Medical History
- Vitals Monitoring
- Interactive 3D Human Body
- Organ-Specific Records
- Consultations
- Alerts and Notifications
- Patient Handover
- Settings

## Hospital Staff Portal

- Dashboard
- Patient Registration
- Patient Records
- Appointments
- Queue Management
- Emergency Cases
- Notifications
- Settings

## Patient Portal

- Dashboard
- Queue Status
- Doctor Visit Status
- Medical Records
- My Vitals
- Appointments
- Medication Reminders
- Test Reports
- My Health Diary
- Call for Help
- Billing and Discharge
- Profile and Emergency Contacts

---

# 3. Global Design System

Apply these design rules consistently across all pages and portals.

## Visual identity

- Primary color: Professional healthcare blue.
- Secondary colors: White, light blue, and soft neutral gray.
- Text: Dark navy or charcoal for readability.
- Status colors: Red for critical alerts, amber for warnings, green for successful/completed states, and neutral colors for routine statuses.
- Typography: Modern, highly readable sans-serif fonts.
- Components: Consistent buttons, cards, form controls, badges, tables, dialogs, and navigation.

## Layout

- Responsive desktop, tablet, and mobile layouts.
- Consistent spacing and alignment.
- Subtle shadows and restrained rounded corners.
- Clear visual hierarchy and uncluttered pages.
- Loading indicators, empty states, validation errors, and success messages.
- Accessible keyboard navigation and visible focus indicators.

## Navigation rules

- Public pages use a common public navbar and footer.
- Each authenticated role has its own dashboard layout and sidebar/navigation.
- Each portal must have a clearly visible page title and active navigation state.
- Users must be able to navigate back to their dashboard easily.
- The selected language must remain consistent when changing pages.
- Do not expose one role's private screens to another role.

## User experience

- Doctors: Information-dense but organized for efficient clinical workflows.
- Hospital staff: Fast data entry, clear administrative actions, and minimal unnecessary steps.
- Patients: Large controls, plain language, readable text, and simple navigation, particularly for elderly or unwell users.

---

# 4. Multilingual Support — English and Hindi

Multilingual support is a project-wide requirement, not a feature limited to the landing page.

## Requirements

1. Add an English / हिंदी toggle to the public navbar.
2. Keep a language toggle available throughout the Doctor, Hospital Staff, and Patient portals.
3. Translate navigation, headings, descriptions, buttons, labels, forms, validation messages, notifications, statuses, and interface instructions.
4. Keep user-entered names, email addresses, patient IDs, and original medical-record content unchanged unless a separate translation feature is explicitly implemented.
5. Preserve the selected language when navigating between pages.
6. Use a centralized translation dictionary rather than scattered conditional text.
7. Provide English as the default language.
8. Use appropriate Hindi wording and readable Devanagari typography.
9. Make the layout work with longer Hindi text without clipping or overlapping.
10. Store language preference appropriately, such as in local storage for a frontend prototype.

## Acceptance criteria

- Every implemented page can switch between English and Hindi.
- Buttons, menus, forms, and status labels all change language.
- Switching language does not clear form values or reset the current page.
- Missing translations are detected during development rather than silently rendering blank text.

---

# PHASE 1 — LANDING PAGE

## Objective

Build the first public-facing page of Trails Monitor Hub. Focus exclusively on a polished landing page, while establishing a reusable design system and an architecture that can support subsequent phases.

Do not build the full dashboards or backend during this phase.

## 1.1 Navbar

Include:

- Trails Monitor Hub logo and name.
- Home
- About Us
- Services
- Contact
- Login
- English / हिंदी toggle

### Behavior

- Logo and Home navigate to the landing page.
- Public navigation items open their corresponding pages when implemented.
- Login opens the portal-selection or login entry page when implemented.
- On small screens, use a responsive mobile menu.
- Language switching translates the complete landing-page interface.

If a destination page has not been implemented yet, do not create misleading or broken links. Use a clearly defined placeholder route or a temporary appropriate interaction.

## 1.2 Hero section

### Headline

**“Connected Healthcare. Better Patient Outcomes.”**

### Supporting text

Introduce Trails Monitor Hub as a unified platform that helps doctors, hospital staff, and patients coordinate healthcare activities and access relevant information.

### Elements

- Primary CTA: Get Started.
- Optional secondary CTA: Explore Services.
- Healthcare-themed illustration or image.
- Subtle background elements that complement the blue-and-white identity.

### Behavior

- Get Started directs users to the portal selection or login entry point.
- Explore Services navigates to the Services page when available.
- Hero text and CTAs translate into Hindi.

## 1.3 Three portal cards

Create three visually consistent cards.

### Doctor

Description: Manage patients, review medical records, conduct consultations, and monitor available health information.

CTA: Doctor Login.

Icon: Stethoscope or medical professional.

### Hospital Staff

Description: Register patients, organize appointments, and manage hospital queues.

CTA: Staff Login.

Icon: Clipboard, hospital, or medical team.

### Patient

Description: Access personal medical records, reports, appointments, and health updates.

CTA: Patient Login.

Icon: User or heart-pulse symbol.

### Behavior

- Each card opens the appropriate portal entry or login screen when implemented.
- All cards must have visible hover, focus, and pressed states.
- Cards must stack vertically or adapt to fewer columns on smaller screens.

## 1.4 Key features section

Introduce the platform's main benefits:

1. Unified Patient Records
2. Appointment and Queue Management
3. Medical Reports and Health Monitoring
4. Emergency Assistance
5. Connected Healthcare Management

Use icons, short descriptions, and a consistent layout.

## 1.5 Platform introduction

Explain how the platform connects doctors, hospital staff, and patients through coordinated information and workflows.

Avoid claiming real-time device monitoring or live hospital connectivity until those integrations actually exist.

## 1.6 Get Started section

Add a clear closing call to action encouraging visitors to select their portal.

## 1.7 Footer

Include:

- Platform logo and short description.
- Quick links.
- Portal links.
- Contact and support information.
- Privacy information.
- Copyright notice.

Do not invent real contact details. Use clearly labeled placeholders until actual information is supplied.

## Phase 1 technical expectations

- Build reusable Navbar, Hero, PortalCard, FeatureSection, CTASection, and Footer components where appropriate.
- Establish reusable color, spacing, typography, and button styles.
- Add responsive layouts.
- Add centralized English/Hindi translations for all visible landing-page content.
- Use accessible semantic HTML and descriptive labels.
- Use mock interactions only where necessary.

## Phase 1 acceptance checklist

- [ ] Landing page renders without errors.
- [ ] Navbar and mobile navigation work.
- [ ] Hero section and both CTAs behave correctly.
- [ ] All three portal cards are present.
- [ ] Key features and footer are complete.
- [ ] English/Hindi switching works across the entire page.
- [ ] Layout works on desktop, tablet, and mobile.
- [ ] No broken navigation, placeholder links, or console errors.
- [ ] No unrequested dashboard or backend work has been added.

**Deliverable:** A complete, polished landing page with reusable components and a foundation for future phases.

---

# PHASE 2 — PUBLIC PAGES AND LOGIN SYSTEM

## Objective

Complete the public-facing website and implement separate login experiences for doctors, hospital staff, and patients.

## 2.1 About Us page

Include:

- Platform overview.
- Problem statement and purpose.
- Mission and vision.
- Benefits for doctors, hospital staff, and patients.
- A clear explanation of how the platform supports coordinated healthcare.

Use cards, concise sections, and relevant healthcare illustrations.

## 2.2 Services page

Explain the platform's intended services:

- Patient registration.
- Medical record management.
- Appointment scheduling.
- Queue management.
- Medical reports.
- Health monitoring.
- Emergency assistance.

Each service should have an icon, short explanation, and consistent visual styling.

Do not represent planned integrations as already operational.

## 2.3 Contact page

Include:

- Name.
- Email.
- Subject.
- Message.
- Submit button.
- Form validation.
- Clear success and error states.
- Support email and phone placeholders.

Until a backend or messaging service exists, submissions should be handled as a clearly identified prototype interaction. Do not claim that a message was delivered when it was not.

## 2.4 Portal selection page

Display three options:

- Doctor
- Hospital Staff — Compounder / Receptionist
- Patient

Each option leads to its role-specific login screen.

## 2.5 Separate login screens

Every role needs its own clearly labeled login page.

### Doctor login

- Email.
- Password.
- Show/hide password.
- Login button.
- Validation and error messages.
- Return-to-home link.

### Hospital Staff login

- Email.
- Password.
- Show/hide password.
- Login button.
- Validation and error messages.
- Return-to-home link.

### Patient login

- Email.
- Password.
- Show/hide password.
- Login button.
- Validation and error messages.
- Return-to-home link.

## 2.6 Demo credentials

Use separate dummy accounts for the initial prototype.

| Role | Email | Password |
|---|---|---|
| Doctor | doctor@demo.com | Doctor123 |
| Hospital Staff | staff@demo.com | Staff123 |
| Patient | patient@demo.com | Patient123 |

These are development credentials only. Do not use real patient information or present frontend-only credential checks as secure production authentication.

## 2.7 Authentication behavior

- Validate email and password input.
- Show an appropriate error for incorrect credentials.
- Prevent a user from choosing a role and entering another role's dashboard through the UI.
- Redirect successful demo logins to the appropriate dashboard when that dashboard exists.
- Provide logout and session-state handling appropriate to the prototype.
- Keep authentication logic centralized rather than duplicating it in each login component.
- Never commit real passwords, secrets, or private keys to frontend source code.

For a production deployment, use server-side authentication, securely managed sessions or tokens, and server-enforced authorization.

## Phase 2 acceptance checklist

- [ ] About Us, Services, and Contact pages are implemented.
- [ ] Portal selection works.
- [ ] Three separate login experiences are available.
- [ ] Dummy credentials behave as documented.
- [ ] Invalid credentials produce clear errors.
- [ ] Language switching works on every implemented public and login page.
- [ ] Forms have validation and accessible labels.
- [ ] Production authentication limitations are documented.

---

# PHASE 3 — HOSPITAL STAFF PORTAL

## Objective

Build the administrative portal used by receptionists, compounders, and other authorized hospital staff.

Prioritize quick patient registration, record lookup, and appointment management.

## 3.1 Dashboard

Show summary cards for:

- Total registered patients.
- Today's registrations.
- Today's appointments.
- Emergency cases.

Add:

- Recent registrations.
- Upcoming appointments.
- Queue overview.
- Quick actions for Register Patient, Find Patient, and Appointments.

Use demo data initially and label it appropriately.

## 3.2 Patient registration

Provide a dedicated registration screen with two modes:

### Normal registration

Collect appropriate patient details, such as:

- Full name.
- Date of birth or age.
- Contact number.
- Email, if available.
- Address, if required.
- Relevant emergency contact.
- Other required registration details.

Avoid collecting unnecessary personal information.

### Emergency registration

- Allow essential information to be captured quickly.
- Create a provisional patient record when sufficient identifying information is available.
- Mark the case as an emergency.
- Allow authorized staff to complete missing registration information later.
- Display the incomplete-record status clearly.
- Never delay emergency care merely because nonessential registration fields are incomplete.

### Patient ID

- Generate a unique Patient ID.
- Check for likely duplicate records before creating a new one.
- Provide a way to find an existing patient.
- Do not rely exclusively on name or phone number for identity matching.
- Allow authorized staff to review potential duplicates.

## 3.3 Patient records

Provide a searchable patient directory with filters and a detailed record view.

Each patient record should support:

- Patient demographics and ID.
- Previous visits.
- Diagnoses.
- Allergies.
- Medications and prescriptions.
- Lab reports and test results.
- Doctor's notes.
- Appointments.
- Relevant registration details.

Display information chronologically, with timestamps and source information where available.

Sensitive clinical updates should be made only by authorized roles.

## 3.4 Appointment management

Allow authorized staff to:

- Create an appointment.
- Select a patient.
- Assign a doctor.
- Select a date and time.
- Reschedule an appointment.
- Cancel an appointment.
- View upcoming and completed appointments.
- Identify scheduling conflicts.

Show appointment status, such as Scheduled, Checked In, Completed, Cancelled, or Delayed.

## 3.5 Queue management

Track each patient's current state:

- Waiting.
- In Consultation.
- Completed.

Support:

- Adding eligible patients to the queue.
- Updating patient status.
- Showing the assigned doctor.
- Sorting or prioritizing emergency cases.
- Updating the queue when an appointment or consultation status changes.

Clinical urgency must not be determined by an arbitrary frontend algorithm. In the prototype, use explicit demo priority values and clearly defined status rules.

## 3.6 Emergency cases

Provide a separate view of emergency cases.

Include:

- Patient ID.
- Registration or arrival time.
- Current status.
- Responsible staff member or doctor, where assigned.
- Priority indicator.
- Status update history.

Use prominent visual indicators without relying on color alone.

## 3.7 Notifications

Display notifications for:

- Successful registration.
- Appointment creation or changes.
- Queue status changes.
- Emergency case updates.

Use in-app notifications for the prototype. SMS and email delivery require additional integrations.

## 3.8 Settings

Include:

- Staff profile.
- Account details.
- Language preference.
- Notification preferences.
- Logout.

## Main workflow

Register Patient → Create or Find Record → Schedule Appointment or Add to Queue → Doctor Reviews Patient History

## Phase 3 acceptance checklist

- [ ] Dashboard summary cards use consistent data.
- [ ] Normal and emergency registration work.
- [ ] Patient IDs are unique.
- [ ] Duplicate checking identifies potential matches.
- [ ] Existing records can be searched and opened.
- [ ] Appointments can be created, rescheduled, and cancelled.
- [ ] Queue statuses update consistently.
- [ ] Emergency cases are clearly highlighted.
- [ ] Notifications reflect actual prototype actions.
- [ ] Staff permissions are enforced by the application's authorization layer.

---

# PHASE 4 — DOCTOR PORTAL

## Objective

Create a doctor-focused clinical workspace that supports patient review, consultation, medical history access, monitoring, and clinical documentation.

## 4.1 Doctor dashboard

Show:

- Total assigned patients.
- Emergency cases.
- Active consultations.
- Admitted patients.
- Upcoming appointments.
- Pending clinical reviews.

Provide shortcuts to the smart queue and patient search.

## 4.2 Smart queue

Display patients waiting for consultation.

Include:

- Patient ID and permitted identifying information.
- Arrival or check-in time.
- Current queue status.
- Assigned doctor.
- Priority or triage category.
- Relevant alerts.

Emergency priority should be based on explicitly assigned and documented triage information. A prototype may use simulated triage categories, clearly labeled as demo data.

## 4.3 One-tap patient profile

The doctor should be able to open a patient profile directly from the queue.

The profile should contain:

- Medical history.
- Previous visits.
- Allergies.
- Current and previous medications.
- Diagnoses.
- Prescriptions.
- Lab reports.
- Test results.
- Doctor's notes.
- Available vitals.
- Health diary notes shared by the patient.
- Relevant alerts.

Organize the information into tabs or clearly separated sections to avoid overwhelming the doctor.

## 4.4 Vitals monitoring

Support a dedicated vitals section for:

- ECG.
- Heart rate.
- SpO₂.
- Blood pressure.
- Respiratory rate.
- Temperature.

Each reading should include available measurement timestamps, units, and source information.

### Prototype behavior

- Use simulated values until device integration is available.
- Clearly label simulated readings.
- Do not imply that a simulated reading represents the patient's actual condition.
- Do not trigger real clinical alarms from fabricated readings.
- Avoid presenting unvalidated demo thresholds as clinical guidance.

### Future integration

Actual monitoring requires compatible devices, a defined data interface, secure transport, validation, and appropriate clinical review.

## 4.5 Interactive 3D human body

Place an interactive 3D human-body model on the right side of the patient profile on sufficiently wide screens.

### Interaction requirements

- Rotate the model.
- Zoom in and out.
- Select supported organs.
- Highlight the selected organ.
- Show an information panel for the selected organ.
- Provide a reset-view control.
- Support touch interaction where practical.
- Adapt the layout for smaller screens.

### Initial organs

- Heart.
- Lungs.
- Liver.
- Kidneys.

Selecting an organ should open a panel containing relevant recorded information, such as:

- Related medical history.
- Available organ-specific reports.
- Relevant test results.
- Previous observations.
- Doctor's notes.
- Dates of previous findings.

Do not fabricate organ-specific diagnoses or claim that visual selection performs medical analysis.

### Technical guidance

Use an appropriate 3D rendering solution, such as Three.js or React Three Fiber, if compatible with the selected project stack. Select an appropriately licensed model with a suitable level of detail.

If a complete interactive 3D model is not immediately feasible, create a well-structured implementation stage rather than substituting a static image while claiming full 3D functionality.

## 4.6 Organ record updates

Allow authorized doctors to:

- Add clinical notes.
- Record findings from available medical reports.
- Link a finding to the relevant organ when appropriate.
- Add the observation date and entry timestamp.
- Identify the author.
- View previous entries.
- Correct records through a documented amendment process.

Maintain an audit history of changes. Do not silently overwrite clinical history.

## 4.7 Consultation management

Provide a consultation workspace with:

- Chief complaint.
- Clinical notes.
- Diagnosis.
- Prescription.
- Test requests.
- Follow-up instructions.
- Consultation status.
- Consultation date and doctor identity.

Separate draft notes from finalized clinical documentation. Medication instructions and diagnoses must be entered or confirmed by an authorized clinician.

## 4.8 Alerts and notifications

Show:

- Critical readings received from supported sources.
- Abnormal results explicitly identified by a validated source or authorized clinician.
- Pending report reviews.
- Unreviewed clinical information.
- Important queue updates.

Clearly distinguish actual data-driven alerts from demo alerts.

## 4.9 Patient handover

Provide a handover view with:

- Recent clinical changes.
- Important notes.
- Pending tests or reviews.
- Active concerns documented by the clinical team.
- Outstanding tasks.
- Author and timestamp.

## Main workflow

Doctor Dashboard → Smart Queue → Patient Profile → Vitals and 3D Body → Organ-Specific Reports → Consultation and Clinical Updates → Handover

## Phase 4 acceptance checklist

- [ ] Dashboard and smart queue display the correct patients and statuses.
- [ ] Doctors can open the complete authorized patient profile.
- [ ] Medical history and reports are organized chronologically.
- [ ] Simulated vitals are visibly labeled.
- [ ] The 3D model supports rotation, zoom, selection, and reset.
- [ ] Selecting an organ opens its corresponding information.
- [ ] Clinical notes can be added and updated through an auditable workflow.
- [ ] Consultation records include the appropriate author and timestamps.
- [ ] Alerts distinguish demo data from real information.
- [ ] Patient handover shows pending tasks and recent changes.

---

# PHASE 5 — PATIENT PORTAL

## Objective

Build an extremely simple, accessible patient interface, particularly for elderly patients and people who may be unwell.

The patient should not need technical knowledge to find important information.

## 5.1 Patient dashboard

Prioritize six main actions:

1. Queue Status.
2. Doctor Visit.
3. My Reports.
4. My Health Diary.
5. Appointments.
6. Call for Help.

Show essential information at the top, such as the next appointment or current queue status.

Use large buttons, clear icons, readable text, and minimal navigation.

## 5.2 Live queue status

Display:

- Current queue status.
- Queue position, when available.
- Number of patients ahead, when available.
- Estimated waiting time only when the estimate is sufficiently reliable.
- Assigned doctor or department, when appropriate.

Clearly identify the last update time.

Do not invent waiting times or present stale estimates as live information.

## 5.3 Doctor visit status

For admitted patients, show:

- Upcoming.
- Delayed.
- In Progress.
- Completed.

Include a timestamp or explanation when a status changes, where available.

## 5.4 My medical records

Allow patients to view records they are authorized to access:

- Medical history.
- Diagnoses.
- Prescriptions.
- Lab reports.
- Test results.
- Relevant consultation notes.
- Previous visits.

Present information in plain language where possible, while preserving the original clinical record.

## 5.5 My vitals

Display available readings such as:

- Heart rate.
- SpO₂.
- Blood pressure.
- Temperature.

Include units, measurement time, and source when available.

Until real device integration exists, use clearly labeled simulated readings.

Do not imply that the portal provides emergency monitoring or continuous clinical supervision unless those capabilities have been implemented and validated.

## 5.6 Appointments

Allow patients to:

- View upcoming appointments.
- View appointment dates and times.
- See the assigned doctor when available.
- Review appointment status.
- Receive reminders.
- Request changes or cancellation when permitted by the hospital's workflow.

## 5.7 Medication reminders

Display prescribed medications with the instructions recorded by an authorized clinician.

Include:

- Medicine name.
- Prescribed dosage.
- Recorded timing or frequency.
- Relevant instructions.
- Reminder status, if reminder functionality is implemented.

Do not generate or alter prescriptions automatically.

## 5.8 Test reports

Display:

- Pending tests.
- Completed tests.
- Available reports.
- Report dates.
- Report status.

Allow patients to open or download reports when authorized.

Show a clear message when a report is not yet available.

## 5.9 Call for Help

Place a prominent Call for Help button on the patient dashboard.

The prototype should:

- Clearly explain the action.
- Let the patient request assistance from hospital staff.
- Show whether the request was successfully recorded.
- Display the current request status when available.
- Prevent accidental duplicate requests where practical.

A frontend-only prototype must not claim to have alerted real hospital staff. Actual alerts require a working backend and an operational notification workflow.

For potentially life-threatening symptoms, provide appropriate guidance to seek immediate emergency assistance rather than waiting for an in-app response.

## 5.10 My Health Diary

Create a simple chronological timeline.

### Main interface

- Display existing notes by date and time.
- Provide one prominent Add Note button.
- Use a simple text field or lightweight dialog.
- Save the note and timestamp.
- Allow patients to review their own previous entries.
- Allow authorized doctors to review relevant shared entries during consultations.

### Example

“11:00 PM — I have a headache.”

Do not require a complicated symptom questionnaire or mandatory severity categories.

Clearly explain that the diary is for communicating symptoms and experiences, not an emergency-response service.

## 5.11 Notifications

Display updates about:

- Appointments.
- Available reports.
- Doctor visit status.
- Queue changes.
- Assistance requests.

Use in-app notifications in the initial prototype.

## 5.12 Billing and discharge

Provide views for:

- Available bills.
- Payment status, where supported.
- Discharge documents.
- Discharge instructions.
- Follow-up details.

Use demo billing information until connected to a genuine billing system. Do not process real payments in the prototype.

## 5.13 Profile

Allow patients to view or update permitted information:

- Personal details.
- Contact information.
- Emergency contacts.
- Language preference.
- Account settings.

Sensitive identity changes should follow an appropriate verification workflow in a production system.

## Patient UX rules

- Keep the interface uncluttered.
- Use simple, nontechnical language.
- Avoid excessive forms and unnecessary steps.
- Keep Call for Help prominent.
- Make medical information private.
- Clearly label data and statuses.
- Ensure the interface works well on mobile devices.
- Do not present simulated readings, reminders, or assistance requests as real services.

## Phase 5 acceptance checklist

- [ ] Patient dashboard prioritizes the six main actions.
- [ ] Queue and visit statuses are displayed accurately.
- [ ] Authorized medical records and reports are accessible.
- [ ] Appointment information is clear.
- [ ] Medication information matches the recorded prescription.
- [ ] Health diary supports adding and reviewing timestamped notes.
- [ ] Doctors can access only the patient diary information they are authorized to view.
- [ ] Call for Help has clear confirmation and status behavior.
- [ ] Billing and discharge information is clearly labeled as demo when appropriate.
- [ ] The portal is usable on small screens and with accessible controls.

---

# PHASE 6 — INTEGRATION, DATA, SECURITY, AND TESTING

## Objective

Connect the previously implemented phases into a consistent application, validate the complete workflows, and prepare a secure foundation for future deployment.

This phase must integrate existing features rather than rebuild them unnecessarily.

## 6.1 Shared data model

Define consistent data structures for the entire application.

Recommended core entities include:

### User

- User ID.
- Email.
- Display name.
- Role.
- Account status.
- Language preference.

### Patient

- Patient ID.
- User ID when the patient has a portal account.
- Registration details.
- Contact information.
- Emergency contact.
- Registration status.
- Created and updated timestamps.

### Appointment

- Appointment ID.
- Patient ID.
- Doctor ID.
- Date and time.
- Appointment status.
- Relevant department.
- Created and updated timestamps.

### Queue Entry

- Queue entry ID.
- Patient ID.
- Appointment ID when applicable.
- Assigned doctor or department.
- Queue status.
- Explicit priority or triage category.
- Arrival time.
- Last updated timestamp.

### Medical Record

- Record ID.
- Patient ID.
- Record type.
- Content or structured fields.
- Author ID.
- Created timestamp.
- Updated timestamp.

### Consultation

- Consultation ID.
- Patient ID.
- Doctor ID.
- Clinical notes.
- Diagnosis.
- Status.
- Consultation timestamp.

### Prescription

- Prescription ID.
- Patient ID.
- Consultation ID.
- Prescribing doctor.
- Medication details.
- Dosage and instructions.
- Created timestamp.

### Medical Report

- Report ID.
- Patient ID.
- Report type.
- File or document reference.
- Report date.
- Status.
- Author or issuing source, where available.

### Vital Reading

- Reading ID.
- Patient ID.
- Measurement type.
- Value and unit.
- Measurement timestamp.
- Source.
- Data quality or validation status where applicable.

### Health Diary Entry

- Entry ID.
- Patient ID.
- Note text.
- Entry timestamp.
- Created timestamp.
- Visibility or sharing rules.

### Notification

- Notification ID.
- Recipient ID.
- Type.
- Message.
- Read status.
- Created timestamp.

### Audit Event

- Event ID.
- Actor ID.
- Action.
- Affected record type and ID.
- Timestamp.
- Appropriate change metadata.

The final schema should be adapted to the selected database and actual workflows. Avoid storing unnecessary sensitive information or duplicating the same clinical information in unrelated tables.

## 6.2 Shared workflow integration

Verify these end-to-end flows.

### Registration to consultation

Hospital Staff registers a patient → Unique Patient ID is created → Patient record becomes available → Appointment or queue entry is created → Doctor opens the correct record → Consultation is recorded.

### Appointment management

Staff creates or changes an appointment → The updated appointment appears in the appropriate views → Patient sees the permitted status → Relevant notifications are generated.

### Medical record updates

Doctor records a consultation or finding → The record is stored with appropriate author and timestamps → Authorized users can view it → Previous clinical history remains traceable.

### Patient health diary

Patient adds a diary entry → The entry is timestamped → The patient can review it → Authorized clinicians can access it where the workflow permits.

### Assistance request

Patient requests help → The request is recorded → Staff can view it when the backend workflow exists → Request status is updated → Patient receives an accurate status message.

## 6.3 Authentication and authorization

Production requirements:

- Use secure server-side authentication.
- Enforce role-based access on the backend, not just in the UI.
- Verify that users can access only the records permitted for their role and responsibilities.
- Validate inputs on both client and server.
- Protect sessions and authentication credentials.
- Use secure password storage and recovery mechanisms.
- Avoid exposing secrets in frontend code.
- Keep appropriate audit trails for sensitive clinical changes.
- Apply secure file access controls to medical reports.
- Restrict access to patient data to authorized personnel.
- Follow applicable privacy and healthcare data-protection requirements.

Dummy credentials and frontend-only authentication are acceptable for local demonstration only.

## 6.4 Medical data safeguards

- Use synthetic data during development.
- Label simulated vitals and demo alerts clearly.
- Preserve the source and timestamp of readings.
- Do not invent real device connectivity.
- Do not treat fabricated values as clinical evidence.
- Avoid silently modifying or deleting finalized clinical records.
- Use an appropriate correction and audit workflow.
- Keep patient-facing information understandable without changing the underlying clinical meaning.

## 6.5 Testing

### Functional testing

Verify that:

- Navigation works.
- Forms validate correctly.
- Login and logout behave as expected.
- Role-based dashboards open correctly.
- Patient registration and lookup work.
- Appointments and queues remain consistent.
- Medical records are associated with the correct patients.
- Language switching works across every implemented page.
- Notifications reflect the correct events.

### Authorization testing

Verify that:

- Patients cannot open another patient's records.
- Doctors cannot access records outside their permitted scope.
- Hospital staff cannot perform unauthorized clinical actions.
- Users cannot gain access by manually entering protected URLs.
- Backend endpoints independently enforce authorization.

### UI and accessibility testing

Check:

- Desktop, tablet, and mobile layouts.
- Keyboard navigation.
- Visible focus states.
- Form labels and validation messages.
- Contrast and readability.
- Hindi text wrapping.
- Loading, empty, error, and success states.

### Reliability testing

Check:

- Duplicate patient registrations.
- Invalid and missing input.
- Conflicting appointments.
- Stale queue statuses.
- Failed requests.
- Unavailable reports.
- Repeated help requests.
- Missing or delayed device readings.

## Phase 6 acceptance checklist

- [ ] All role-specific workflows use consistent records.
- [ ] Data is persisted using the selected backend when implemented.
- [ ] Role-based permissions are enforced server-side.
- [ ] Clinical changes are auditable.
- [ ] English and Hindi work throughout the application.
- [ ] UI, functional, and authorization tests pass.
- [ ] Demo features are clearly separated from production integrations.
- [ ] Deployment instructions and environment requirements are documented.

---

# 7. Recommended Technical Architecture

Use this as the default technical direction when starting from scratch. If a project already has a functioning stack, inspect it first and preserve its working architecture unless a change is necessary.

## Frontend

Recommended options:

- React.
- TypeScript.
- Vite.
- React Router or an equivalent routing solution.
- Tailwind CSS or a consistent component styling system.
- Lucide icons or another consistent icon library.
- A suitable accessible component library.
- A centralized translation system for English and Hindi.

For the interactive 3D model, consider Three.js or React Three Fiber, with a properly licensed 3D asset.

## Backend

Choose an appropriate backend framework when real persistence and authentication are introduced. Examples include:

- Node.js with Express.
- FastAPI.

Use one primary backend unless there is a justified need for multiple services.

## Database

Use a relational database for structured healthcare information, such as PostgreSQL. A different database may be chosen if the project's requirements justify it.

Define relationships, constraints, indexes, and migrations rather than relying on disconnected mock objects.

## File storage

Medical reports and related documents require controlled file storage and authorized access. Do not expose private report files through publicly accessible URLs without appropriate safeguards.

## Project organization

A suggested structure is:

```text
trails-monitor-hub/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── navigation/
│   │   ├── forms/
│   │   └── ui/
│   ├── layouts/
│   │   ├── PublicLayout
│   │   ├── DoctorLayout
│   │   ├── StaffLayout
│   │   └── PatientLayout
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── doctor/
│   │   ├── staff/
│   │   └── patient/
│   ├── features/
│   │   ├── appointments/
│   │   ├── patients/
│   │   ├── medical-records/
│   │   ├── queue/
│   │   ├── consultations/
│   │   ├── notifications/
│   │   └── health-diary/
│   ├── i18n/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App
│   └── main
├── tests/
├── package.json
└── README.md
```

This is a suggested organizational structure, not a requirement to create empty folders. Adapt filenames and extensions to the selected stack.

---

# 8. Phase Independence and Handoff Rules

This section is essential when switching between different AI coding assistants.

Every AI working on the project must follow these rules:

1. Read this master specification before implementing a phase.
2. Inspect the current project files and understand the existing architecture.
3. Identify which phases are already completed.
4. Implement only the phase explicitly requested by the user.
5. Do not rebuild completed features without a clear reason.
6. Do not introduce a new framework or replace existing dependencies unnecessarily.
7. Reuse existing components, styles, routes, and data models.
8. If a required earlier-phase feature is missing, explain the dependency and implement only the minimum prerequisite needed.
9. Do not claim that a feature is complete unless it actually works.
10. Use clearly labeled demo data for unfinished backend or device integrations.
11. Keep all user-facing text compatible with English and Hindi.
12. Test the implemented phase before declaring completion.
13. Document modified files, commands, configuration, known limitations, and next steps.
14. Never overwrite unrelated work or delete functioning features without permission.
15. Do not store real patient data or credentials in source code.

## Standard instructions for any AI

When starting work, the user can provide the master specification and then use this instruction:

“Read the entire Trails Monitor Hub master specification. Implement Phase [NUMBER] only. First inspect the existing project, identify completed features and dependencies, and preserve working code. Follow the design system, workflows, security requirements, and multilingual requirements. Complete and test the requested phase, then report what was implemented, files changed, how to run it, test results, known limitations, and the recommended next phase. Do not claim that simulated integrations are real.”

---

# 9. Definition of Done for Every Phase

A phase is complete only when:

- Its required screens and interactions are implemented.
- Its layouts work across supported screen sizes.
- English and Hindi translations are complete for its visible UI.
- Loading, empty, error, and success states are handled where applicable.
- Data and actions behave consistently with the phase requirements.
- Existing completed phases continue to work.
- Relevant tests have been run and results reported.
- No known critical errors remain undisclosed.
- Any simulated feature or missing integration is documented.
- The next AI assistant can continue from the documented project state.

---

# 10. Recommended Implementation Order

| Phase | Deliverable | Depends on |
|---|---|---|
| 1 | Landing page and foundational design system | Project setup |
| 2 | Public pages, portal selection, and demo login | Phase 1 |
| 3 | Hospital Staff Portal | Shared layouts and agreed data structures |
| 4 | Doctor Portal and 3D patient view | Patient records and clinical workflows |
| 5 | Patient Portal | Patient records, appointments, and queue workflows |
| 6 | Full integration, security, and testing | Implemented portal features |

Some UI work can be developed independently, but data-dependent functionality must use the agreed models and workflows.

**Important:** The six phases define the intended product. They do not imply that every integration is already available. Real authentication, persistent medical records, external notifications, and connected medical devices must be implemented and tested before the application can claim those capabilities.

---

# 11. Current Project Status

At the start of development:

- Phase 1: Not started or not yet verified.
- Phase 2: Not started or not yet verified.
- Phase 3: Not started or not yet verified.
- Phase 4: Not started or not yet verified.
- Phase 5: Not started or not yet verified.
- Phase 6: Not started or not yet verified.

Update this section as each phase is completed. Maintain a brief project handoff note containing the current phase, completed features, current architecture, modified files, test results, outstanding issues, and next steps.

**Starting instruction: Begin with Phase 1 — Landing Page only.**