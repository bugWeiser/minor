'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { HiOutlineBellAlert, HiOutlineXMark } from 'react-icons/hi2';

export default function PushNotificationManager() {
  const { user, appUser } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default' && user && appUser) {
        setShowPrompt(true);
      }
    }
  }, [user, appUser]);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !user || !appUser) return;
    
    const initMessaging = async () => {
      try {
        const { getMessaging, onMessage } = await import('firebase/messaging');
        const { default: app } = await import('@/lib/firebase');
        const messaging = getMessaging(app);
        
        onMessage(messaging, (payload) => {
          console.log('[Foreground] Message received. ', payload);
          if (audioRef.current && payload.data?.urgency === 'Urgent') {
            audioRef.current.play().catch(e => console.log('Audio error:', e));
          }
        });
      } catch (err) {
        console.log("FCM not supported or blocked in this browser.", err);
      }
    };
    
    if (Notification.permission === 'granted') {
      initMessaging();
    }
  }, [user, appUser]);

  const requestPermission = async () => {
    setShowPrompt(false);
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted' && user) {
        const { getMessaging, getToken } = await import('firebase/messaging');
        const { default: app } = await import('@/lib/firebase');
        const messaging = getMessaging(app);
        
        const token = await getToken(messaging, { 
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
        }).catch(() => null);

        if (token) {
          await updateDoc(doc(db, 'users', user.uid), {
            fcmToken: token,
          }).catch(() => null);
        }
      }
    } catch (e) {
      console.log('Error getting permission:', e);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-[calc(100%-3rem)] bg-white border-2 border-charcoal/5 shadow-2xl rounded-[28px] p-6 animate-fadeUp ring-1 ring-black/5">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-charcoal shrink-0 shadow-lg shadow-accent/20">
          <HiOutlineBellAlert className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-black text-charcoal tracking-tight">Signal Integration</h3>
            <button onClick={() => setShowPrompt(false)} className="text-text-muted hover:text-charcoal transition-colors">
                <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[12px] text-text-secondary mt-1.5 font-bold uppercase tracking-wider opacity-60 leading-tight">
            Enable Push Protocols
          </p>
          <p className="text-[13px] text-text-secondary mt-2 font-medium leading-relaxed">
            Broadcast high-priority alerts and temporal markers directly to this terminal.
          </p>
          <div className="flex gap-3 mt-5">
            <button 
              onClick={requestPermission}
              className="px-6 py-2.5 bg-charcoal text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-charcoal/20 hover:shadow-charcoal/40 active:scale-95"
            >
              Establish Link
            </button>
            <button 
              onClick={() => setShowPrompt(false)}
              className="px-6 py-2.5 bg-bg-card-secondary text-text-muted text-[11px] font-black uppercase tracking-widest rounded-xl transition-all hover:bg-bg-hover hover:text-charcoal border border-border-subtle"
            >
              Defer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
