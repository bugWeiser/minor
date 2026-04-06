import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';
import { setMockAuthSession, clearMockAuthSession } from './authPersistence';

export async function loginWithEmail(email: string, password: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  
  const isDemoPersona = [
    'alice@dashboard.com',
    'bob@dashboard.com',
    'faculty@dashboard.com',
    'admin@dashboard.com'
  ].includes(email);

  if (!apiKey || isDemoPersona) {
    // Mock login for demo
    let role = 'student';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('faculty')) role = 'faculty';
    
    setMockAuthSession(email, role);
    
    // Reload to trigger AuthContext refresh (deterministic boot)
    window.location.reload();
    return { email, uid: `mock-uid-${email}` };
  }

  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function registerStudent(
  email: string, 
  password: string, 
  name: string,
  department: string,
  year: number
): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  
  if (!apiKey) {
    // Mock registration
    setMockAuthSession(email, 'student');
    window.location.reload();
    return { email, uid: 'mock-uid' };
  }

  const result = await createUserWithEmailAndPassword(auth, email, password);
  const { createUserProfile } = await import('@/lib/firestore');
  
  await createUserProfile(result.user.uid, {
    email,
    name,
    department,
    year,
    courses: [],
    isAdmin: false,
    role: 'student',
    tags: [`${department}-${year}`, 'ALL'],
    subscribedCategories: ['Academic', 'General'],
    fcmToken: null,
    readNotices: [],
  });
  
  return result.user;
}

export async function logout(): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  
  // Always clear mock session on logout
  clearMockAuthSession();
  
  if (apiKey) {
     try {
       await signOut(auth);
     } catch (e) {
       console.error("Firebase logout error (ignoring during demo cleanup):", e);
     }
  }
  
  // Reload ensures the context is fully reset to unauthenticated
  window.location.reload();
}

export function onAuthChange(callback: (user: any | null) => void): () => void {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return () => {};
  return onAuthStateChanged(auth, callback);
}
