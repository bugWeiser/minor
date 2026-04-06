'use client';

import { HiOutlineMegaphone, HiOutlineCalendarDays, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { format } from 'date-fns';
import { Notice, CalendarEvent, Assignment } from '@/lib/types';

type ActivityItem = {
  id: string;
  type: 'notice' | 'event' | 'assignment';
  title: string;
  date: Date;
  status: 'draft' | 'published';
  author: string;
};

interface AdminRecentActivityProps {
  notices: Notice[];
  events: CalendarEvent[];
  assignments: Assignment[];
}

export default function AdminRecentActivity({ notices, events, assignments }: AdminRecentActivityProps) {
  const combined: ActivityItem[] = [
    ...notices.map(n => ({ 
      id: n.id, 
      type: 'notice' as const, 
      title: n.title, 
      date: n.updatedAt || n.postedAt || n.createdAt || new Date(), 
      status: n.publishState || 'published',
      author: n.updatedBy || n.createdBy || n.postedBy || 'System'
    })),
    ...events.map(e => ({ 
      id: e.id, 
      type: 'event' as const, 
      title: e.title, 
      date: e.updatedAt || e.date || e.createdAt || new Date(), 
      status: e.publishState || 'published',
      author: e.updatedBy || e.createdBy || 'Admin'
    })),
    ...assignments.map(a => ({ 
      id: a.id, 
      type: 'assignment' as const, 
      title: a.title, 
      date: a.updatedAt || a.postedAt || a.createdAt || new Date(), 
      status: a.publishState || 'published',
      author: a.updatedBy || a.createdBy || a.postedBy || 'System'
    })),
  ].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return timeB - timeA;
  }).slice(0, 10);

  const icons = {
    notice: HiOutlineMegaphone,
    event: HiOutlineCalendarDays,
    assignment: HiOutlineClipboardDocumentList,
  };

  const colors = {
    notice: 'text-indigo-600 bg-indigo-50',
    event: 'text-emerald-600 bg-emerald-50',
    assignment: 'text-amber-600 bg-amber-50',
  };

  return (
    <div className="bg-white border border-border-subtle rounded-[28px] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border-subtle bg-bg-card-secondary/50">
        <h3 className="text-lg font-black text-charcoal tracking-tight">Recent Activity Feed</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-text-muted mt-1">Audit trail for global assets</p>
      </div>
      <div className="divide-y divide-border-subtle">
        {combined.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-text-muted font-medium">No activity recorded in the current session.</p>
          </div>
        ) : (
          combined.map((item) => {
            const Icon = icons[item.type];
            return (
              <div key={`${item.type}-${item.id}`} className="p-5 flex items-center gap-4 hover:bg-bg-hover transition-colors group">
                <div className={`p-2.5 rounded-xl ${colors[item.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border ${
                      item.status === 'published' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-amber-200 text-amber-700 bg-amber-50'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted">• {format(item.date, 'MMM d, h:mm a')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-charcoal truncate group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-[11px] font-medium text-text-muted truncate">Modified by {item.author}</p>
                </div>
                <button className="text-[11px] font-black text-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 hover:bg-accent/5 rounded-lg">
                  View Detail
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
