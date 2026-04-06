'use client';

import { useAdminNotices } from '@/hooks/useAdminNotices';
import AdminNoticeList from '@/components/admin/AdminNoticeList';
import RoleGuard from '@/components/auth/RoleGuard';
import { HiOutlinePlus as HiPlus, HiOutlineMegaphone as HiMegaphone, HiOutlineArrowLeft as HiArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

export default function AdminNoticesPage() {
  const { notices, loading, togglePublishStatus, togglePinStatus, deleteNotice } = useAdminNotices();

  return (
    <RoleGuard requiredCapability="canManageNotices">
      <div className="animate-fadeUp">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Link href="/admin" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-4 group">
              <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Console</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm">
                <HiMegaphone className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-charcoal tracking-tight">Notice Management</h1>
                <p className="text-text-muted font-medium text-sm mt-1">Control institutional broadcasts and targeting parameters.</p>
              </div>
            </div>
          </div>
        <Link 
          href="/admin/notices/new"
          title="Deploy New Transmission"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-charcoal hover:bg-black text-white rounded-[22px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-charcoal/20 active:scale-[0.98] group"
        >
          <HiPlus className="w-5 h-5 text-accent" />
          Deploy New Transmission
        </Link>
      </div>

      <div className="bg-bg-page/50 border border-border-subtle rounded-[32px] p-2 md:p-6 backdrop-blur-sm">
        <AdminNoticeList 
          notices={notices}
          loading={loading}
          onTogglePublish={togglePublishStatus}
          onTogglePin={togglePinStatus}
          onDelete={deleteNotice}
        />
      </div>
      </div>
    </RoleGuard>
  );
}
