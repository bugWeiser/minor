'use client';

import { useAdminNotices } from '@/hooks/useAdminNotices';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlineMegaphone } from 'react-icons/hi2';
import Link from 'next/link';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';

export default function NewNoticePage() {
  const router = useRouter();
  const { createNotice } = useAdminNotices();

  const handleSubmit = async (data: any) => {
    await createNotice(data);
    router.push('/admin/notices');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeUp">
      <Link href="/admin/notices" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-8 group">
        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Notice Grid</span>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
            <HiOutlineMegaphone className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-charcoal tracking-tight">Deploy Notice</h1>
        </div>
        <p className="text-text-muted font-medium">Broadcast new institutional information across the student grid.</p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-border-subtle rounded-[32px] p-8 md:p-12">
        <AdminNoticeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
