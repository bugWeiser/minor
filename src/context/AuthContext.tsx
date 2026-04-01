'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { AppUser } from '@/lib/types';
import { SEED_USERS } from '@/lib/seedData';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  loading: true,
  isFirebaseConfigured: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      if (typeof window !== 'undefined') {
        const mockRole = localStorage.getItem('mockRole');
        if (mockRole) {
          // Find seed user based on role or specific mock role (admin vs student)
          const mockUser = mockRole === 'admin' 
            ? SEED_USERS[0] 
            : SEED_USERS[1]; // Alice as default student

          setAppUser(mockUser);
          setUser({ 
            email: mockUser.email,
            uid: mockUser.uid,
          } as User);
        }
      }
      setLoading(false);
      setIsFirebaseConfigured(false);
      return;
    }
    setIsFirebaseConfigured(true);

    // Dynamically import to avoid errors when Firebase is not configured
    import('@/lib/firebase').then(({ db }) => {
      import('firebase/firestore').then(({ doc, onSnapshot }) => {
        import('@/lib/auth').then(({ onAuthChange }) => {
          let userProfileUnsubscribe: (() => void) | null = null;

          const unsubscribe = onAuthChange(async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
              const docRef = doc(db, 'users', firebaseUser.uid);
              userProfileUnsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                  setAppUser({ uid: docSnap.id, ...docSnap.data() } as AppUser);
                } else {
                  setAppUser(null);
                }
              }, () => setAppUser(null));
            } else {
              if (userProfileUnsubscribe) userProfileUnsubscribe();
              setAppUser(null);
            }
            setLoading(false);
          });

          return () => {
            unsubscribe();
            if (userProfileUnsubscribe) userProfileUnsubscribe();
          };
        }).catch(() => setLoading(false));
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, appUser, loading, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
