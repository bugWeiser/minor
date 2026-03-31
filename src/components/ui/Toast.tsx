'use client';

import { useEffect, useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineInformationCircle, HiOutlineBell, HiOutlineXMark } from 'react-icons/hi2';

type ToastType = 'success' | 'error' | 'info' | 'notice';

interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

const CONFIG: Record<ToastType, { icon: any, color: string, bg: string, ring: string }> = {
  success: { icon: HiOutlineCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20' },
  error: { icon: HiOutlineXCircle, color: 'text-rose-600', bg: 'bg-rose-50', ring: 'ring-rose-500/20' },
  info: { icon: HiOutlineInformationCircle, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20' },
  notice: { icon: HiOutlineBell, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20' },
};

export default function Toast({ type, title, message, duration = 5000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) {
          clearInterval(interval);
          return 0;
        }
        return p - (100 / (duration / 100));
      });
    }, 100);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const config = CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        relative bg-white rounded-[20px] shadow-2xl ring-1 ${config.ring}
        w-[340px] overflow-hidden pointer-events-auto
        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
      `}
    >
      <div className="p-5 flex gap-4 pr-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-black text-charcoal truncate">{title}</p>
          {message && <p className="text-[12px] font-medium text-text-secondary mt-0.5 leading-relaxed truncate">{message}</p>}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-lg text-text-muted hover:text-charcoal hover:bg-bg-hover transition-all"
      >
        <HiOutlineXMark className="w-4 h-4" />
      </button>

      {/* Progress track */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-card-secondary">
        <div
          className={`h-full transition-all ease-linear ${config.color.replace('text-', 'bg-')}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Toast container for top-right placement
export function ToastContainer({ toasts }: { toasts: Array<ToastProps & { id: string }> }) {
  return (
    <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id}>
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
}
