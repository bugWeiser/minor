import { getToken, onMessage } from 'firebase/messaging';
import { getMessagingInstance } from './firebase';

export async function requestNotificationPermission(): Promise<string | null> {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const messaging = await getMessagingInstance();
    if (!messaging) return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export function onFCMMessage(callback: (payload: { title: string; body: string }) => void): () => void {
  let unsubscribe: (() => void) | null = null;

  getMessagingInstance().then((messaging) => {
    if (!messaging) return;
    unsubscribe = onMessage(messaging, (payload) => {
      callback({
        title: payload.notification?.title || 'New Notice',
        body: payload.notification?.body || '',
      });
    });
  });

  return () => {
    if (unsubscribe) unsubscribe();
  };
}
