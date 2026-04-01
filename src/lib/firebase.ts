import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase if we have a real API key
const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined';

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    _auth = getAuth(app);
    _db = getFirestore(app);
  } catch (e) {
    console.warn('[Firebase] Initialization failed, running in mock mode:', e);
    app = null;
    _auth = null;
    _db = null;
  }
}

export const auth = _auth as Auth;
export const db = _db as Firestore;

// Messaging only works in the browser
export const getMessagingInstance = async () => {
  if (app && typeof window !== 'undefined' && (await isSupported())) {
    return getMessaging(app);
  }
  return null;
};

export { isFirebaseConfigured };
export default app;


