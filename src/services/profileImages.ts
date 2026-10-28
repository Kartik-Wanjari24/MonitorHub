// Centralized profile image mapping for doctors and patients
// Using high-quality stock photos from Unsplash (free to use)

export interface ProfileImageMap {
  [key: string]: string;
}

// Doctor profile images - Professional Indian doctors
export const DOCTOR_IMAGES: ProfileImageMap = {
  'Dr. Aarav Sharma': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces',
  'Dr. Vikram Malhotra': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces',
  'Dr. Priya Desai': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces',
  'Dr. Priya Deshmukh': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces',
  'Dr. Ananya Iyer': 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&h=400&fit=crop&crop=faces',
  'Dr. Deepa Nair': 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop&crop=faces',
  'Dr. Suresh Ranganathan': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces',
  'Dr. Amitav Sen': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=faces',
};

// Patient profile images - Realistic Indian patients with varied ages and genders
export const PATIENT_IMAGES: ProfileImageMap = {
  // Male patients
  'TMH-2026-001': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces', // Rajesh Sharma - 48yo Male
  'Rajesh Sharma': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces',

  'TMH-2026-003': 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces', // Mohd. Tariq Khan - 62yo Male
  'Mohd. Tariq Khan': 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces',

  'TMH-2026-005': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces', // Sandeep Ghosh - 41yo Male
  'Sandeep Ghosh': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',

  'TMH-2026-006': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces', // Ramesh Chander
  'Ramesh Chander (Provisional)': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',

  // Female patients
  'TMH-2026-002': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces', // Anita Verma - 34yo Female
  'Anita Verma': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',

  'TMH-2026-004': 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=faces', // Kavita Patel - 27yo Female
  'Kavita Patel': 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=faces',

  // Default patient (Rahul Verma - used in patient portal demo)
  'Rahul Verma': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
};

// Get doctor profile image with fallback
export function getDoctorImage(doctorName: string): string {
  return DOCTOR_IMAGES[doctorName] || getDefaultDoctorImage();
}

// Get patient profile image with fallback
export function getPatientImage(patientIdOrName: string): string {
  return PATIENT_IMAGES[patientIdOrName] || getDefaultPatientImage();
}

// Default fallback images
function getDefaultDoctorImage(): string {
  return 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces';
}

function getDefaultPatientImage(): string {
  return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces';
}

// Get initials from name for fallback display
export function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
