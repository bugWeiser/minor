'use client';

import { useAdminEvents } from '@/hooks/useAdminEvents';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineCalendarDays } from 'react-icons/hi2';
import Link from 'next/link';
import AdminEventForm from '@/components/admin/AdminEventForm';

export default function NewEventPage() {
  const router = useRouter();
  const { createEvent } = useAdminEvents();

  const handleSubmit = async (data: any) => {
    await createEvent(data);
    router.push('/admin/events');
  };

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
          <h1 className="text-4xl font-black text-charcoal tracking-tight">Schedule New Event</h1>
        </div>
        <p className="text-text-muted font-medium italic">Deploy an institutional milestone to the academic grid.</p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-border-subtle rounded-[40px] p-8 md:p-12 shadow-sm">
        <AdminEventForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
