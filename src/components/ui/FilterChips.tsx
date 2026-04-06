'use client';

import { ComponentType, ReactNode } from 'react';

export interface FilterChipItem {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}

interface FilterChipsProps {
  items: FilterChipItem[];
  activeValue: string;
  onChange: (value: string) => void;
  /** 'charcoal' = dark active bg, 'accent' = lime active bg */
  activeStyle?: 'charcoal' | 'accent';
  /** 'pill' = rounded-full, 'rounded' = rounded-2xl */
  shape?: 'pill' | 'rounded';
  className?: string;
  /** Optional prefix element (e.g. a filter icon label) */
  prefix?: ReactNode;
}

export default function FilterChips({
  items,
  activeValue,
  onChange,
  activeStyle = 'charcoal',
  shape = 'rounded',
  className = '',
  prefix,
}: FilterChipsProps) {
  const activeClasses = activeStyle === 'charcoal'
    ? 'bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20'
    : 'bg-accent text-charcoal border-accent shadow-md shadow-accent/20';

  const inactiveClasses = 'bg-white text-text-muted border-border-subtle hover:bg-bg-hover hover:text-text-primary hover:border-border-strong';
  const shapeClass = shape === 'pill' ? 'rounded-full' : 'rounded-2xl';
  const iconActiveClass = activeStyle === 'charcoal' ? 'text-accent' : 'text-charcoal';

  return (
    <div className={`flex flex-wrap items-center gap-2.5 bg-white border border-border-subtle p-2 rounded-[var(--radius-chip,22px)] shadow-sm w-fit transition-all focus-within:shadow-md ${className}`}>
      {prefix}
      {items.map(item => {
        const isActive = activeValue === item.value;
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`flex items-center gap-2.5 h-[42px] px-5 ${shapeClass} text-[13px] font-bold transition-all duration-200 border shrink-0 ${isActive ? activeClasses : inactiveClasses}`}
          >
            {Icon && <Icon className={`w-4 h-4 ${isActive ? iconActiveClass : 'text-text-muted'}`} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
