'use client';
import { useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';

interface ToastData {
  title: string;
  body: string;
}

export function showToast(title: string, body: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { title, body } }));
  }
}

export default function NotificationToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToastData>).detail;
      setToast(detail);
      setTimeout(() => setToast(null), 5000);
    };
    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-fadeUp">
      <div className="bg-white border-2 border-charcoal/5 rounded-[22px] shadow-2xl p-5 w-[340px] flex gap-4 ring-1 ring-black/5">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-charcoal shrink-0 shadow-lg shadow-accent/20">
          <HiOutlineBell className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-black text-charcoal truncate">
            {toast.title}
          </p>
          <p className="text-[12px] text-text-secondary mt-1 font-medium leading-relaxed line-clamp-2">{toast.body}</p>
        </div>
      </div>
    </div>
  );
}
