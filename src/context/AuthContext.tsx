'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { AppUser, NormalizedUserProfile } from '@/lib/types';
import { normalizeAppUser } from '@/lib/profileUtils';
import { resolveMockAuthSession, clearMockAuthSession } from '@/lib/authPersistence';
import { getCapabilities, UserCapabilities, GUEST_CAPABILITIES } from '@/lib/permissions';
import { useInstitution } from './InstitutionContext';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  normalizedProfile: NormalizedUserProfile | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
  isAdmin: boolean;
  isFaculty: boolean;
  isStudent: boolean;
  capabilities: UserCapabilities;
  activeOrgId?: string; // Expose active org for cross-context safety
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  normalizedProfile: null,
  loading: true,
  isFirebaseConfigured: false,
  isAdmin: false,
  isFaculty: false,
  isStudent: false,
  capabilities: GUEST_CAPABILITIES,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [normalizedProfile, setNormalizedProfile] = useState<NormalizedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  // Logout helper that cleans up both mock and Firebase sessions
  const handleLogout = async () => {
    clearMockAuthSession();
    const { logout: firebaseLogout } = await import('@/lib/auth');
    await firebaseLogout();
    setAppUser(null);
    setNormalizedProfile(null);
    setUser(null);
  };

  useEffect(() => {
    // 1. Resolve Priority 1: Demo/Mock Persona Session
    const mockSession = resolveMockAuthSession();
    
    if (mockSession.source === 'mock' && mockSession.appUser) {
      setAppUser(mockSession.appUser);
      setNormalizedProfile(mockSession.normalizedProfile);
      setUser({ 
        email: mockSession.appUser.email,
        uid: mockSession.appUser.uid,
      } as User);
      setLoading(false);
      setIsFirebaseConfigured(!!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
      
      // We skip Firebase listeners for demo sessions to prevent "Split-Brain"
      return;
    }

    // 2. Resolve Priority 2: Firebase Session
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      setLoading(false);
      setIsFirebaseConfigured(false);
      return;
    }

    setIsFirebaseConfigured(true);

    let authUnsubscribe: (() => void) | null = null;
    let profileUnsubscribe: (() => void) | null = null;

    // Load Firebase logic dynamically
    const initFirebase = async () => {
      const { db } = await import('@/lib/firebase');
      const { doc, onSnapshot } = await import('firebase/firestore');
      const { onAuthChange } = await import('@/lib/auth');

      authUnsubscribe = onAuthChange(async (firebaseUser) => {
        if (profileUnsubscribe) profileUnsubscribe();
        
        setUser(firebaseUser);
        
        if (firebaseUser) {
          const docRef = doc(db, 'users', firebaseUser.uid);
          profileUnsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = { uid: docSnap.id, ...docSnap.data() } as AppUser;
              setAppUser(data);
              setNormalizedProfile(normalizeAppUser(data));
            } else {
              setAppUser(null);
              setNormalizedProfile(null);
            }
            setLoading(false);
          }, () => {
            setAppUser(null);
            setNormalizedProfile(null);
            setLoading(false);
          });
        } else {
          setAppUser(null);
          setNormalizedProfile(null);
          setLoading(false);
        }
      });
    };

    initFirebase().catch(() => setLoading(false));

    return () => {
      if (authUnsubscribe) authUnsubscribe();
      if (profileUnsubscribe) profileUnsubscribe();
    };
  }, []);

  // Note: Since AuthContext is a peer to InstitutionContext, 
  // we actually want the UI components to use the useInstitution() hook 
  // to get the activeOrgId. However, for initial state, we derive 
  // capabilities based on the user's primary org.

  const { activeOrgId: institutionOrgId } = useInstitution();

  return (
    <AuthContext.Provider value={{ 
      user, 
      appUser, 
      normalizedProfile, 
      loading, 
      isFirebaseConfigured,
      isAdmin: normalizedProfile?.role === 'admin',
      isFaculty: normalizedProfile?.role === 'faculty',
      isStudent: normalizedProfile?.role === 'student',
      capabilities: getCapabilities(
        normalizedProfile?.role, 
        normalizedProfile?.organizationId, 
        institutionOrgId 
      ),
      activeOrgId: normalizedProfile?.organizationId,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
