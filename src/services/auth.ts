// Frontend-only demo authentication — NOT for production use.
// Stores role selection and demo login state in localStorage for prototype navigation.
// Phase 6 will replace this with real server-side authentication and session management.

export type UserRole = 'doctor' | 'staff' | 'patient';

export interface DemoUser {
  role: UserRole;
  email: string;
  name: string;
}

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string; name: string }> = {
  doctor: {
    email: 'doctor@demo.com',
    password: 'Doctor123',
    name: 'Dr. Aarav Sharma',
  },
  staff: {
    email: 'staff@demo.com',
    password: 'Staff123',
    name: 'Neha Pawar',
  },
  patient: {
    email: 'patient@demo.com',
    password: 'Patient123',
    name: 'Rahul Verma',
  },
};

const AUTH_STORAGE_KEY = 'trails_demo_auth';

export const authService = {
  /**
   * Validates demo credentials. Returns the matched role or null.
   * This is purely frontend prototype validation — NOT secure production auth.
   */
  validateCredentials(email: string, password: string): DemoUser | null {
    for (const [role, creds] of Object.entries(DEMO_CREDENTIALS)) {
      if (
        email.trim().toLowerCase() === creds.email.toLowerCase() &&
        password === creds.password
      ) {
        return { role: role as UserRole, email: creds.email, name: creds.name };
      }
    }
    return null;
  },

  setSession(user: DemoUser): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Storage unavailable
    }
  },

  getSession(): DemoUser | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as DemoUser;
    } catch {
      return null;
    }
  },

  clearSession(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
  },
};
