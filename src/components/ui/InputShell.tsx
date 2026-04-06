'use client';

import { InputHTMLAttributes, ReactNode } from 'react';

interface InputShellProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export default function InputShell({ icon, className = '', ...props }: InputShellProps) {
  return (
    <div className="relative group">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-charcoal transition-colors">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`w-full h-[52px] ${icon ? 'pl-12' : 'pl-4'} pr-4 bg-bg-card-secondary border border-border-subtle rounded-xl text-[14px] text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-md focus:border-border-strong outline-none transition-all ${className}`}
      />
    </div>
  );
}
