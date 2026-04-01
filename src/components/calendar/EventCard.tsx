'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/lib/types';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineMapPin, HiOutlineBell, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineTrash } from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';

interface Props {
  event: CalendarEvent;
  compact?: boolean;
  onDelete?: (id: string) => void;
}

export default function EventCard({ event, compact = false, onDelete }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { appUser } = useAuth();
  
  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`
      flex items-start gap-3 p-3.5 rounded-2xl border border-border-subtle bg-white transition-all duration-300 group hover:border-border-strong hover:shadow-md cursor-pointer
      ${isExpanded ? 'bg-bg-card-secondary shadow-sm' : ''}
    `}>
      {/* Category Indicator */}
      <div 
        className="w-1.5 h-full self-stretch rounded-full shrink-0 group-hover:shadow-[0_0_8px_rgba(0,0,0,0.1)] transition-all"
        style={{ backgroundColor: event.color }}
      />
      
      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between mb-1">
           <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted opacity-80 group-hover:opacity-100 transition-opacity">
             {event.category}
           </span>
           <div className="flex flex-wrap items-center gap-2">
             {!compact && (
                <span className="text-[10px] font-bold text-text-muted bg-bg-card-secondary px-2 py-0.5 rounded-md border border-border-subtle">
                   {format(event.date, 'MMM d')}
                </span>
             )}
             {appUser?.isAdmin && onDelete && (
               <button 
                 onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
                 className="p-1 rounded text-danger bg-soft-red hover:bg-red-200 transition-colors"
                 title="Delete Event"
               >
                 <HiOutlineTrash className="w-3 h-3" />
               </button>
             )}
           </div>
        </header>

        <h3 className={`font-bold text-text-primary leading-tight transition-all ${compact ? 'text-[14px] truncate' : isExpanded ? 'text-[16px]' : 'text-[15px] truncate'}`}>
          {event.title}
        </h3>
        
        {!compact && event.description && (
          <p className={`text-text-secondary mt-1 opacity-80 transition-all ${isExpanded ? 'text-[13px] line-clamp-none' : 'text-[12px] line-clamp-1'}`}>
            {event.description}
          </p>
        )}

        <footer className={`flex flex-wrap items-center gap-3 text-text-muted font-bold uppercase tracking-wider mt-2 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
           <span className="flex items-center gap-1">
             <HiOutlineClock className="w-3.5 h-3.5" />
             {event.time || 'All Day'}
           </span>
           {event.location && (
             <span className={`flex items-center gap-1 ${isExpanded ? '' : 'truncate max-w-[120px]'}`}>
               <HiOutlineMapPin className="w-3.5 h-3.5 shrink-0" />
               {event.location}
             </span>
           )}
        </footer>
      </div>

      <div className={`w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted transition-all ${isExpanded ? 'bg-charcoal text-white shadow-md rotate-180' : 'opacity-0 group-hover:opacity-100'}`}>
         {isExpanded ? <HiOutlineChevronUp className="w-4 h-4" /> : <HiOutlineChevronDown className="w-4 h-4" />}
      </div>
    </div>
  );
}
