'use client';

import { CalendarEvent } from '@/lib/types';
import { format } from 'date-fns';
import { HiOutlineClock, HiOutlineMapPin, HiOutlineBell } from 'react-icons/hi2';

interface Props {
  event: CalendarEvent;
  compact?: boolean;
}

export default function EventCard({ event, compact = false }: Props) {
  return (
    <div className={`
      flex items-start gap-3 p-3.5 rounded-2xl border border-border-subtle bg-white transition-all duration-200 group hover:border-border-strong hover:shadow-md
      ${compact ? 'cursor-pointer hover:bg-bg-hover' : ''}
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
           {!compact && (
              <span className="text-[10px] font-bold text-text-muted bg-bg-card-secondary px-2 py-0.5 rounded-md border border-border-subtle">
                 {format(event.date, 'MMM d')}
              </span>
           )}
        </header>

        <h3 className={`font-bold text-text-primary leading-tight truncate ${compact ? 'text-[14px]' : 'text-[15px]'}`}>
          {event.title}
        </h3>
        
        {!compact && event.description && (
          <p className="text-[12px] text-text-secondary mt-1 line-clamp-1 opacity-70">
            {event.description}
          </p>
        )}

        <footer className={`flex items-center gap-3 text-text-muted font-bold uppercase tracking-wider mt-2 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
           <span className="flex items-center gap-1">
             <HiOutlineClock className="w-3.5 h-3.5" />
             {event.time || 'All Day'}
           </span>
           {event.location && (
             <span className="flex items-center gap-1 truncate max-w-[120px]">
               <HiOutlineMapPin className="w-3.5 h-3.5" />
               {event.location}
             </span>
           )}
        </footer>
      </div>

      <div className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted opacity-0 group-hover:opacity-100 transition-all rotate-[-45deg] group-hover:rotate-0">
         <HiOutlineBell className="w-4 h-4" />
      </div>
    </div>
  );
}
