import { AppUser, NormalizedUserProfile } from './types';
import { SEED_USERS } from './seedData';
import { normalizeAppUser } from './profileUtils';

const DEMO_EMAILS = [
  'alice@dashboard.com',
  'bob@dashboard.com',
  'faculty@dashboard.com',
  'admin@dashboard.com'
];

export interface AuthSession {
  source: 'mock' | 'firebase' | 'none';
  appUser: AppUser | null;
  normalizedProfile: NormalizedUserProfile | null;
}

/**
 * Resolves the preferred authentication source based on local storage markers
 * for demo personas or the existence of a Firebase session.
 */
export function resolveMockAuthSession(): AuthSession {
  if (typeof window === 'undefined') {
    return { source: 'none', appUser: null, normalizedProfile: null };
  }

  const activeEmail = localStorage.getItem('activeUserEmail');
  const mockRole = localStorage.getItem('mockRole');

  if (activeEmail && DEMO_EMAILS.includes(activeEmail)) {
    const mockUser = SEED_USERS.find(u => u.email === activeEmail);
    if (mockUser) {
      return { 
        source: 'mock', 
        appUser: mockUser, 
        normalizedProfile: normalizeAppUser(mockUser) 
      };
    }
  }

  // Fallback if email is missing but role exists (legacy/recovery)
  if (mockRole) {
    const mockUser = SEED_USERS.find(u => u.role === mockRole);
    if (mockUser) {
       return { 
         source: 'mock', 
         appUser: mockUser, 
         normalizedProfile: normalizeAppUser(mockUser) 
       };
    }
  }

  // Malformed or unknown mock session - clear it
  if (activeEmail || mockRole) {
    clearMockAuthSession();
  }

  return { source: 'none', appUser: null, normalizedProfile: null };
}

export function setMockAuthSession(email: string, role: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('activeUserEmail', email);
  localStorage.setItem('mockRole', role);
}

export function clearMockAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('activeUserEmail');
  localStorage.removeItem('mockRole');
}
