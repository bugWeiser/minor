'use client';

import { useAdminEvents } from '@/hooks/useAdminEvents';
import AdminEventList from '@/components/admin/AdminEventList';
import { HiOutlinePlus, HiOutlineCalendarDays, HiOutlineArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';
import RoleGuard from '@/components/auth/RoleGuard';

export default function AdminEventsPage() {
  const { events, loading, deleteEvent, togglePublishStatus } = useAdminEvents();

  return (
    <RoleGuard requiredCapability="canManageEvents">
      <div className="max-w-7xl mx-auto p-6 animate-fadeUp">
        <Link href="/admin" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-8 group">
          <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
                <HiOutlineCalendarDays className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-black text-charcoal tracking-tight">Institutional Events</h1>
            </div>
            <p className="text-text-muted font-medium max-w-xl">
              Manage the academic calendar, workshops, and institutional milestones. 
              All changes propagate to the student-facing schedule in real-time.
            </p>
          </div>

          <Link 
            href="/admin/events/new"
            title="Schedule New Event"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-charcoal hover:bg-black text-white rounded-[22px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-charcoal/20 active:scale-[0.98] group"
          >
            <HiOutlinePlus className="w-5 h-5 text-accent group-hover:rotate-90 transition-transform" />
            Schedule Event
          </Link>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-bg-page animate-pulse rounded-[24px]" />
            ))}
          </div>
        ) : (
          <AdminEventList 
            events={events} 
            onDelete={deleteEvent}
            onTogglePublish={togglePublishStatus}
          />
        )}
      </div>
    </RoleGuard>
  );
}
