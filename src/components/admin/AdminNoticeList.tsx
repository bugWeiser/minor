'use client';

import { Notice } from '@/lib/types';
import { 
  HiOutlinePencilSquare, 
  HiOutlineTrash, 
  HiOutlineMegaphone,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineCheckCircle,
  HiOutlineClock
} from 'react-icons/hi2';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  notices: Notice[];
  loading: boolean;
  onTogglePublish: (id: string) => Promise<any>;
  onTogglePin: (id: string) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
}

export default function AdminNoticeList({ notices, loading, onTogglePublish, onTogglePin, onDelete }: Props) {
  const { capabilities } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 bg-bg-card-secondary/50 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await onDelete(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="relative">
      {/* Deletion Confirmation Overlay */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/20 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-border-subtle animate-scaleIn"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-notice-title"
            aria-describedby="delete-notice-desc"
          >
            <div className="w-16 h-16 bg-soft-red rounded-2xl flex items-center justify-center text-danger mb-6 mx-auto">
              <HiOutlineTrash className="w-8 h-8" />
            </div>
            <h3 id="delete-notice-title" className="text-xl font-black text-charcoal text-center mb-2">Confirm Extraction</h3>
            <p id="delete-notice-desc" className="text-text-muted text-center text-sm font-medium mb-8 leading-relaxed">
              This notice will be permanently removed from the institutional grid. This action cannot be reversed.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="flex-1 h-12 rounded-xl bg-bg-hover text-charcoal font-bold text-xs uppercase tracking-widest transition-all hover:bg-border-subtle"
                aria-label="Cancel deletion"
              >
                Abort
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 h-12 rounded-xl bg-charcoal text-white font-bold text-xs uppercase tracking-widest transition-all hover:bg-black shadow-lg shadow-charcoal/20"
                aria-label="Confirm and delete notice"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
              <th className="px-6 py-2">Broadcast Entity</th>
              <th className="px-6 py-2 text-center">Protocol Status</th>
              <th className="px-6 py-2 text-center">System Pin</th>
              <th className="px-6 py-2">Targeting</th>
              <th className="px-6 py-2">Deployment Date</th>
              <th className="px-6 py-2 text-right">Operational Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.id} className="group hover:translate-x-1 transition-transform duration-300">
                <td className="px-6 py-4 bg-white border-y border-l border-border-subtle rounded-l-[22px] first:border-l relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${notice.urgency === 'Urgent' ? 'bg-danger' : notice.urgency === 'Important' ? 'bg-accent' : 'bg-soft-blue'}`} />
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-page flex items-center justify-center text-charcoal shadow-sm">
                      <HiOutlineMegaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-charcoal text-sm line-clamp-1">{notice.title}</div>
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{notice.category}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 bg-white border-y border-border-subtle text-center">
                    {notice.publishState === 'published' ? (
                      <button 
                        onClick={() => onTogglePublish(notice.id)}
                        aria-label="Set to Draft"
                        aria-pressed="true"
                        title="Change to Draft"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all bg-soft-green text-charcoal border border-emerald-100 hover:bg-emerald-100"
                      >
                        <HiOutlineCheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Live
                      </button>
                    ) : (
                      <button 
                        onClick={() => onTogglePublish(notice.id)}
                        aria-label="Set to Live"
                        aria-pressed="false"
                        title="Change to Live"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all bg-soft-yellow text-charcoal border border-yellow-100 hover:bg-yellow-100"
                      >
                        <HiOutlineClock className="w-3.5 h-3.5 text-amber-600" /> Draft
                      </button>
                    )}
                </td>

                <td className="px-6 py-4 bg-white border-y border-border-subtle text-center">
                    {notice.isPinned ? (
                      <button 
                        onClick={() => onTogglePin(notice.id)}
                        aria-label="Unpin Notice"
                        aria-pressed="true"
                        title="Unpin from Feed"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-accent hover:bg-accent/10"
                      >
                        <HiBookmark className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => onTogglePin(notice.id)}
                        aria-label="Pin Notice"
                        aria-pressed="false"
                        title="Pin to Feed"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all text-text-muted hover:bg-bg-hover"
                      >
                        <HiOutlineBookmark className="w-5 h-5" />
                      </button>
                    )}
                </td>

                <td className="px-6 py-4 bg-white border-y border-border-subtle">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {notice.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-page text-[9px] font-bold text-text-muted border border-border-subtle whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                    {notice.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md bg-bg-page text-[9px] font-bold text-text-muted border border-border-subtle">
                        +{notice.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 bg-white border-y border-border-subtle">
                  <div className="text-[12px] font-bold text-charcoal">{notice.postedAt.toLocaleDateString()}</div>
                  <div className="text-[10px] font-medium text-text-muted uppercase tracking-widest">{notice.postedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>

                <td className="px-6 py-4 bg-white border-y border-r border-border-subtle rounded-r-[22px] text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/notices/${notice.id}/edit`}
                      title="Edit Notice Parameters"
                      aria-label={`Edit notice: ${notice.title}`}
                      className="p-2.5 rounded-xl bg-bg-page text-text-muted hover:text-charcoal hover:shadow-md transition-all border border-border-subtle"
                    >
                      <HiOutlinePencilSquare className="w-4.5 h-4.5" />
                    </Link>
                    {capabilities.canDeleteContent && (
                      <button 
                        onClick={() => handleDeleteClick(notice.id)}
                        title="Extract from Grid (Delete)"
                        aria-label={`Delete notice: ${notice.title}`}
                        className="p-2.5 rounded-xl bg-bg-page text-text-muted hover:text-danger hover:shadow-md transition-all border border-border-subtle"
                      >
                        <HiOutlineTrash className="w-4.5 h-4.5" />
                      </button>
                    )}
                    <Link
                      href={`/notices/${notice.id}`}
                      title="Preview on Institutional Feed"
                      aria-label={`View notice: ${notice.title}`}
                      className="p-2.5 rounded-xl bg-bg-page text-text-muted hover:text-charcoal hover:shadow-md transition-all border border-border-subtle"
                    >
                      <HiOutlineEye className="w-4.5 h-4.5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {notices.length === 0 && !loading && (
        <div className="py-20 text-center bg-white rounded-[32px] border-2 border-dashed border-border-subtle animate-fadeUp">
          <HiOutlineMegaphone className="w-12 h-12 text-border-subtle mx-auto mb-4" />
          <h3 className="text-charcoal font-black text-lg">No Transmissions Found</h3>
          <p className="text-text-muted font-medium text-sm mt-1">Ready to deploy your first institutional notice?</p>
          <Link href="/admin/notices/new" className="inline-block mt-6 px-6 py-3 bg-charcoal text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all">
            Initiate Deployment
          </Link>
        </div>
      )}
    </div>
  );
}
