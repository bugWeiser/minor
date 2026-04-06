'use client';

import { CalendarEvent } from '@/lib/types';
import { EVENT_CATEGORY_STYLES, EVENT_CATEGORY_Tailwind_MAP, EventCategory } from '@/lib/constants';
import { format } from 'date-fns';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineEye, HiOutlineCalendarDays, HiOutlineClock, HiOutlineMapPin } from 'react-icons/hi2';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AdminEventListProps {
  events: CalendarEvent[];
  onDelete: (id: string) => Promise<void>;
  onTogglePublish: (id: string) => Promise<void>;
}

export default function AdminEventList({ events, onDelete, onTogglePublish }: AdminEventListProps) {
  const { capabilities } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await onDelete(deletingId);
      setDeletingId(null);
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur-sm border border-dashed border-border-subtle rounded-[32px] p-20 text-center">
        <div className="w-20 h-20 bg-bg-page rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <HiOutlineCalendarDays className="w-10 h-10 text-text-muted/30" />
        </div>
        <h3 className="text-xl font-black text-charcoal tracking-tight">No Events Deployed</h3>
        <p className="text-text-muted font-medium mt-2 max-w-xs mx-auto">The institutional calendar is currently blank. Deploy your first event from the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-[32px] border border-border-subtle bg-white/30 backdrop-blur-md shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal text-white/90">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Event Parameters</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Deployment Details</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-center">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Audience Scope</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50">
            {events.map((event) => {
              const category = event.category as EventCategory;
              const styles = EVENT_CATEGORY_STYLES[category] || EVENT_CATEGORY_STYLES.General;
              const tw = EVENT_CATEGORY_Tailwind_MAP[category] || EVENT_CATEGORY_Tailwind_MAP.General;
              const isDraft = event.publishState === 'draft';
              const isLive = !isDraft;
              
              return (
                <tr key={event.id} className="hover:bg-white/60 transition-colors group">
                  <td className="px-6 py-6 border-r border-border-subtle/30">
                    <div className="flex items-start gap-4">
                      <div 
                        className={`p-2.5 rounded-2xl shadow-sm border mt-1 shrink-0 ${tw.bg} ${tw.text} ${tw.border}`}
                      >
                        <styles.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-charcoal text-sm leading-tight group-hover:text-accent transition-colors">
                          {event.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span 
                            className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${tw.bg} ${tw.text}`}
                          >
                            {event.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
                        <HiOutlineCalendarDays className="w-3.5 h-3.5 text-text-muted" />
                        {format(new Date(event.date), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-text-muted">
                        <HiOutlineClock className="w-3.5 h-3.5" />
                        {event.time || 'All Day'}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-[11px] font-medium text-text-muted truncate max-w-[150px]">
                          <HiOutlineMapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30 text-center">
                      {isDraft ? (
                        <button 
                          onClick={() => onTogglePublish(event.id)}
                          aria-label="Deploy Event to Grid (Set to Live)"
                          aria-pressed="false"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-bg-page text-text-muted hover:bg-charcoal hover:text-white"
                          title="Change Status to Live"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                          Draft
                        </button>
                      ) : (
                        <button 
                          onClick={() => onTogglePublish(event.id)}
                          aria-label="Revert to Draft (Set to Unpublished)"
                          aria-pressed="true"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-success/10 text-success hover:bg-success hover:text-white shadow-sm"
                          title="Change Status to Draft"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          Live
                        </button>
                      )}
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30">
                    <div className="flex flex-wrap gap-1">
                      {event.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-black px-2 py-0.5 bg-bg-page border border-border-subtle rounded-md text-text-muted uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 shadow-sm rounded-2xl p-1 bg-white inline-flex border border-border-subtle">
                      <Link 
                        href={`/admin/events/${event.id}/edit`}
                        title="Edit Event Parameters"
                        aria-label={`Edit event: ${event.title}`}
                        className="p-2 rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-page transition-all"
                      >
                        <HiOutlinePencilSquare className="w-4.5 h-4.5" />
                      </Link>
                      {capabilities.canDeleteContent && (
                        <button 
                          onClick={() => handleDeleteClick(event.id)}
                          title="Purge Event from Grid (Delete)"
                          aria-label={`Delete event: ${event.title}`}
                          className="p-2 rounded-xl text-text-muted hover:text-danger hover:bg-danger/5 transition-all"
                        >
                          <HiOutlineTrash className="w-4.5 h-4.5" />
                        </button>
                      )}
                      <Link
                        href="/schedule"
                        title="View on Institutional Calendar"
                        aria-label={`View ${event.title} on schedule`}
                        className="p-2 rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-page transition-all"
                      >
                        <HiOutlineEye className="w-4.5 h-4.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Overlay */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" onClick={() => setDeletingId(null)} />
          <div 
            className="bg-white rounded-[32px] p-8 max-w-sm w-full relative shadow-2xl border border-white/20 animate-zoomIn"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-event-title"
            aria-describedby="delete-event-desc"
          >
            <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineTrash className="w-8 h-8" />
            </div>
            <h3 id="delete-event-title" className="text-2xl font-black text-charcoal text-center tracking-tight leading-tight">Confirm Event Purge?</h3>
            <p id="delete-event-desc" className="text-text-muted text-center font-medium mt-3 text-sm">This will permanently remove the event from all institutional schedules and student dashboards.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-muted border border-border-subtle hover:bg-bg-page transition-all"
                title="Cancel Deletion"
                aria-label="Cancel deletion"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white bg-danger hover:bg-danger-dark shadow-lg shadow-danger/20 transition-all active:scale-[0.98]"
                title="Confirm and Purge"
                aria-label="Confirm and purge event"
              >
                Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
