'use client';

// @ts-ignore
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/context/AuthContext';
import { filterByUserTags } from '@/lib/filterUtils';
import { CalendarEvent } from '@/lib/types';
import EventCard from '@/components/calendar/EventCard';
import EmptyState from '@/components/EmptyState';
import { CalendarSkeleton } from '@/components/ui/LoadingSkeleton';
import { format, isSameDay, isFuture, isPast } from 'date-fns';
import { HiOutlineCalendarDays, HiOutlineFunnel, HiOutlineBell, HiOutlineChevronRight, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const EVENT_CATEGORIES = ['All', 'Exam', 'Workshop', 'Holiday', 'Club', 'Sports', 'Deadline'];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeCategory, setActiveCategory] = useState('All');
  const { events, loading } = useEvents();
  const { appUser } = useAuth();

  // Tag-filtered events
  const userEvents = useMemo<CalendarEvent[]>(() =>
    filterByUserTags(events, appUser?.tags ?? [], appUser?.isAdmin) as CalendarEvent[],
    [events, appUser]
  );

  // Category-filtered events
  const filteredEvents = useMemo<CalendarEvent[]>(() =>
    activeCategory === 'All' ? userEvents : userEvents.filter(e => e.category === activeCategory),
    [userEvents, activeCategory]
  );

  // Events for selected date
  const selectedDayEvents = useMemo<CalendarEvent[]>(() =>
    filteredEvents.filter(e => isSameDay(e.date, selectedDate)),
    [filteredEvents, selectedDate]
  );

  // Upcoming events for the sidebar
  const upcomingEvents = useMemo<CalendarEvent[]>(() => 
    filteredEvents.filter(e => isFuture(e.date) || isSameDay(e.date, new Date())).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5),
    [filteredEvents]
  );

  // Tile content: dots for days with events
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    const dayEvents = filteredEvents.filter(e => isSameDay(e.date, date));
    if (dayEvents.length === 0) return null;
    return (
      <div className="flex justify-center flex-wrap gap-0.5 mt-1">
        {dayEvents.slice(0, 3).map((ev, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: ev.color }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-subtle transition-all">
        <section>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Academic Schedule</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px] mt-2 group cursor-default">
            {loading ? 'Consulting repositories...' : `${userEvents.length} critical timestamps indexed and monitored`}
            {appUser?.department && ` · ${appUser.department} Core Department`}
          </p>
        </section>
      </header>

      {/* FILTER CHIPS (Scrollable) */}
      <div className="flex items-center gap-3 bg-white border border-border-subtle p-2 rounded-[22px] shadow-sm w-fit transition-all focus-within:shadow-md">
        <div className="flex items-center gap-2 pl-2 pr-4 border-r border-border-subtle shrink-0">
           <HiOutlineFunnel className="w-4 h-4 text-text-muted" />
           <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Filters</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 pt-1.5 pr-2 scrollbar-hide max-w-[320px] md:max-w-none">
          {EVENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0 h-[42px] px-5 rounded-full text-[13px] font-bold transition-all border
                ${activeCategory === cat
                  ? 'bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20'
                  : 'bg-white text-text-muted border-border-subtle hover:bg-bg-hover hover:text-text-primary hover:border-border-strong'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <CalendarSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* MAIN CALENDAR PANEL (3/5) */}
          <div className="lg:col-span-3 card-shell p-6 bg-white transition-all hover:bg-white">
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-border-subtle border-dashed">
               <h2 className="text-xl font-bold text-text-primary tracking-tight">Timeline Engine</h2>
               <div className="text-[10px] font-bold text-charcoal uppercase bg-accent px-2 py-0.5 rounded-md shadow-sm">
                  Interactive Exploration
               </div>
            </header>

            <Calendar
              onChange={(val: unknown) => setSelectedDate(val as Date)}
              value={selectedDate}
              tileContent={tileContent}
              className="w-full !font-sans !border-0 bg-transparent react-calendar group"
            />
          </div>

          {/* EVENTS LIST PANEL (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SELECTED DAY EVENTS */}
            <section className="card-shell p-6">
               <header className="flex items-center justify-between mb-6">
                 <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] leading-none">Activity Report</p>
                    <h3 className="text-[16px] font-bold text-text-primary truncate">
                       {format(selectedDate, 'MMM d, yyyy')}
                    </h3>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-charcoal/20">
                    {selectedDayEvents.length}
                 </div>
               </header>

               <div className="space-y-3">
                  {selectedDayEvents.length === 0 ? (
                    <div className="py-8 text-center opacity-40 border border-border-subtle border-dashed p-6 rounded-2xl">
                       <HiOutlineCalendarDays className="w-10 h-10 text-text-muted mb-3 mx-auto" />
                       <p className="text-[14px] font-bold text-charcoal tracking-tight">No Events Listed</p>
                       <p className="text-[11px] font-medium text-text-muted mt-1 underline decoration-accent decoration-2 underline-offset-4">Check another node or clearing filters</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDayEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
               </div>
            </section>

            {/* UPCOMING THIS MONTH */}
            <section className="card-shell p-6 bg-gradient-to-br from-white to-bg-card-secondary border-dashed transition-all hover:bg-accent/5">
                <header className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-accent rounded-full shadow-lg shadow-accent/20" />
                      <h2 className="text-xl font-bold text-text-primary tracking-tight">Near Horizon</h2>
                   </div>
                   <HiOutlineBell className="w-5 h-5 text-text-muted soft-pulse" />
                </header>

                <div className="space-y-3">
                   {upcomingEvents.map(event => (
                     <button
                       key={event.id}
                       onClick={() => setSelectedDate(event.date)}
                       className="w-full text-left transition-all active:scale-95"
                     >
                       <EventCard event={event} compact />
                     </button>
                   ))}
                   {upcomingEvents.length === 0 && (
                     <p className="text-[12px] text-text-muted font-bold uppercase tracking-widest text-center py-6 opacity-40">No entries detected</p>
                   )}
                </div>
            </section>

          </div>
        </div>
      )}
    </div>
  );
}
