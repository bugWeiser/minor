'use client';
import { useEffect, useState } from 'react';

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
      setTimeout(() => setToast(null), 4000);
    };
    window.addEventListener('show-toast', handler);
    return () => window.removeEventListener('show-toast', handler);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 z-[100] animate-slideDown">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          🔔 {toast.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{toast.body}</p>
      </div>
    </div>
  );
}
