'use client';

import { Urgency } from '@/lib/types';
import { URGENCY_STYLES } from '@/lib/constants';

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  if (urgency === 'Normal') return null;
  
  const s = URGENCY_STYLES[urgency];
  
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-semibold uppercase tracking-wide border h-[24px]"
      style={{ 
        backgroundColor: s.bg, 
        color: s.text, 
        borderColor: s.border 
      }}
    >
      <div 
        className={`w-1.5 h-1.5 rounded-full ${urgency === 'Urgent' ? 'animate-pulse' : ''}`} 
        style={{ backgroundColor: s.dot }} 
      />
      {urgency}
    </span>
  );
}
