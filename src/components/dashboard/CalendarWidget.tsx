'use client';
// @ts-ignore
import Calendar from 'react-calendar';
import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { format, isSameDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { HiOutlineCalendarDays, HiOutlineBell, HiOutlineClock } from 'react-icons/hi2';
import { EVENT_CATEGORY_Tailwind_MAP } from '@/lib/constants';

export default function CalendarWidget() {
  const [date, setDate] = useState<Date>(new Date());
  const { filteredEvents: events, loading } = useEvents();

  // Pulse effect and dots for days with events
  const tileContent = ({ date: tileDate, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    const dayEvents = events.filter(e => isSameDay(e.date, tileDate));
    if (dayEvents.length === 0) return null;
    
    return (
      <div className="flex justify-center gap-0.5 mt-1">
        {dayEvents.slice(0, 3).map((event, i) => {
          const style = EVENT_CATEGORY_Tailwind_MAP[event.category as keyof typeof EVENT_CATEGORY_Tailwind_MAP] || EVENT_CATEGORY_Tailwind_MAP.General;
          return (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-125 ${style.marker}`} 
              title={`${event.title} (${event.category})`}
            />
          );
        })}
      </div>
    );
  };

  const selectedDayEvents = events.filter(e => isSameDay(e.date, date));

  return (
    <div className="card-shell p-6 bg-white flex flex-col group h-full">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent rounded-full shadow-lg shadow-accent/20" />
          <h3 className="text-xl font-black text-charcoal tracking-tight">Temporal Grid</h3>
        </div>
        <div className="text-[10px] font-black text-charcoal uppercase bg-accent px-2 py-0.5 rounded-md shadow-sm">
           Live Sync
        </div>
      </header>

      <div className="flex-1 overflow-x-auto scrollbar-hide">
        <Calendar 
          onChange={(val: any) => setDate(val as Date)} 
          value={date} 
          tileContent={tileContent}
          className="w-full !font-sans !border-0 bg-transparent react-calendar !text-[13px] group min-w-[280px]"
        />
      </div>
      
      <div className="mt-8 pt-6 border-t border-border-subtle border-dashed">
        <header className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <HiOutlineCalendarDays className="w-4 h-4 text-text-muted" />
              <span className="text-[12px] font-black text-charcoal tracking-tight">{format(date, 'MMMM d, yyyy')}</span>
           </div>
           <span className="text-[10px] font-black text-text-muted bg-bg-card-secondary px-2.5 py-1 rounded-lg border border-border-subtle uppercase tracking-widest">
              {selectedDayEvents.length} Event(s)
           </span>
        </header>

        <div className="space-y-2.5">
          {selectedDayEvents.length === 0 ? (
            <div className="py-6 text-center opacity-30 border border-border-subtle border-dashed rounded-2xl">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No Scheduled Protocols</p>
            </div>
          ) : (
            selectedDayEvents.map(event => (
              <div 
                key={event.id} 
                className="flex gap-4 p-3 rounded-2xl bg-bg-card-secondary/50 border border-border-subtle hover:bg-white hover:border-charcoal hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
                title={`View details for ${event.title}`}
              >
                <div 
                  className={`w-1 rounded-full shrink-0 shadow-sm ${(EVENT_CATEGORY_Tailwind_MAP[event.category as keyof typeof EVENT_CATEGORY_Tailwind_MAP] || EVENT_CATEGORY_Tailwind_MAP.General).marker}`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-black text-charcoal truncate tracking-tight">{event.title}</p>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mt-0.5 opacity-60 flex items-center gap-1.5">
                    <HiOutlineClock className="w-3 h-3" />
                    {event.category} · {event.time || 'All Day'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t border-border-subtle border-dashed">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">System Horizon: 2026-T2</p>
      </footer>
    </div>
  );
}
