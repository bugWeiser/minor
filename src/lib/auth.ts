import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

export async function loginWithEmail(email: string, password: string): Promise<any> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  
  if (!apiKey) {
    // Mock login for demo
    const role = email.includes('admin') ? 'admin' : 'student';
    localStorage.setItem('mockRole', role);
    localStorage.setItem('activeUserEmail', email);
    // Reload to trigger AuthContext refresh
    window.location.reload();
    return { email, uid: 'mock-uid' };
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
    localStorage.setItem('mockRole', 'student');
    localStorage.setItem('activeUserEmail', email);
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
  if (!apiKey) {
    localStorage.removeItem('mockRole');
    localStorage.removeItem('activeUserEmail');
    window.location.reload();
    return;
  }
  await signOut(auth);
}

export function onAuthChange(callback: (user: any | null) => void): () => void {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return () => {};
  return onAuthStateChanged(auth, callback);
}
