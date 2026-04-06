'use client';

import { useAdminEvents } from '@/hooks/useAdminEvents';
import { useRouter, useParams } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineCalendarDays } from 'react-icons/hi2';
import Link from 'next/link';
import AdminEventForm from '@/components/admin/AdminEventForm';
import { useEffect, useState } from 'react';
import { CalendarEvent } from '@/lib/types';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { events, updateEvent, loading: eventsLoading } = useAdminEvents();
  const [event, setEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => {
    if (!eventsLoading) {
      const found = events.find(e => e.id === id);
      if (found) {
        setEvent(found);
      }
    }
  }, [id, events, eventsLoading]);

  const handleSubmit = async (data: any) => {
    await updateEvent(id, data);
    router.push('/admin/events');
  };

  if (eventsLoading) {
    return <div className="p-20 text-center animate-pulse text-text-muted font-bold">Synchronizing Event Grid...</div>;
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h2 className="text-2xl font-black text-charcoal">Event Not Found</h2>
        <p className="text-text-muted mt-2">The requested event parameters do not exist in the institutional grid.</p>
        <Link href="/admin/events" className="inline-block mt-8 text-accent font-bold hover:underline">Return to Event Grid</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeUp">
      <Link href="/admin/events" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-8 group">
        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Event Grid</span>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
            <HiOutlineCalendarDays className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-charcoal tracking-tight">Edit Event Parameters</h1>
        </div>
        <p className="text-text-muted font-medium">Modify deployment for <strong>{event.title}</strong></p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-border-subtle rounded-[40px] p-8 md:p-12 shadow-sm">
        <AdminEventForm initialData={event} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
