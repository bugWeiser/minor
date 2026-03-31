'use client';

import { ReactNode, useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = originalStyle; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/20 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`
          relative z-10 w-full ${SIZE_CLASSES[size]}
          bg-white rounded-[32px] shadow-2xl ring-1 ring-black/5
          border border-border-subtle
          animate-fadeUp max-h-[90vh] flex flex-col overflow-hidden
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border-subtle border-dashed shrink-0 bg-bg-card-secondary/30">
          <div>
            <h2 className="text-xl font-black text-charcoal tracking-tight leading-none">{title}</h2>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-2 opacity-50">Authorized Terminal Node</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-hover transition-all group"
          >
            <HiOutlineXMark className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-8 py-8 scrollbar-hide selection:bg-accent/40 selection:text-charcoal">
          {children}
        </div>
        
        {/* Decorative Footer Bar */}
        <div className="h-1.5 w-full bg-accent opacity-30" />
      </div>
    </div>
  );
}
