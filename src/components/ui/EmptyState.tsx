'use client';

import React from 'react';
import { HiOutlineInbox } from 'react-icons/hi2';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon = HiOutlineInbox, 
  title, 
  description, 
  action,
  className = "" 
}: EmptyStateProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center text-center p-12 bg-white border border-border-subtle rounded-[32px] border-dashed ${className} animate-fadeIn`}
      role="status"
      aria-label={title}
    >
      <div className="w-16 h-16 rounded-2xl bg-bg-card-secondary text-text-muted flex items-center justify-center mb-6 opacity-40">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-black text-charcoal tracking-tight mb-2">{title}</h3>
      <p className="text-sm font-bold text-text-muted max-w-sm leading-relaxed mb-8">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-charcoal text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/5"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
