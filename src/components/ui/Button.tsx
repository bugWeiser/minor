'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:   'bg-charcoal text-white border-charcoal hover:shadow-xl hover:shadow-charcoal/20 active:scale-95',
  secondary: 'bg-white text-text-primary border border-border-subtle hover:border-border-strong hover:bg-bg-hover hover:shadow-md',
  accent:    'bg-accent text-charcoal border-accent hover:shadow-lg hover:shadow-accent/20 active:scale-95',
  danger:    'bg-soft-red text-danger border border-red-100 hover:bg-red-100 active:scale-95',
  ghost:     'bg-transparent text-text-muted border-transparent hover:text-text-primary hover:bg-bg-hover',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs rounded-xl gap-1.5',
  md: 'h-10 px-4 text-[13px] rounded-xl gap-2',
  lg: 'h-12 px-6 text-sm rounded-2xl gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-bold transition-all ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
