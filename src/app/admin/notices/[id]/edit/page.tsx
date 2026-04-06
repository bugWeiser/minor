'use client';

import { useAdminNotices } from '@/hooks/useAdminNotices';
import { useRouter, useParams } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlinePencilSquare } from 'react-icons/hi2';
import Link from 'next/link';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';
import { useEffect, useState } from 'react';
import { Notice } from '@/lib/types';

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { notices, updateNotice, loading: noticesLoading } = useAdminNotices();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!noticesLoading) {
      const found = notices.find(n => n.id === id);
      if (found) {
        setNotice(found);
      }
    }
  }, [id, notices, noticesLoading]);

  const handleSubmit = async (data: any) => {
    await updateNotice(id, data);
    router.push('/admin/notices');
  };

  if (noticesLoading) {
    return <div className="p-20 text-center animate-pulse text-text-muted font-bold">Synchronizing Institutional Data...</div>;
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <h2 className="text-2xl font-black text-charcoal">Notice Not Found</h2>
        <p className="text-text-muted mt-2">The requested transmission ID does not exist in the institutional grid.</p>
        <Link href="/admin/notices" className="inline-block mt-8 text-accent font-bold hover:underline">Return to Notice Grid</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeUp">
      <Link href="/admin/notices" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-8 group">
        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Notice Grid</span>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shadow-sm">
            <HiOutlinePencilSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-charcoal tracking-tight">Edit Transmission</h1>
        </div>
        <p className="text-text-muted font-medium">Modify parameters for institutional broadcast <strong>#{id.split('-').pop()}</strong></p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-border-subtle rounded-[32px] p-8 md:p-12">
        <AdminNoticeForm initialData={notice} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
