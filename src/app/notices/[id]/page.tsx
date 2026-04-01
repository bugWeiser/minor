'use client';

import { useNotices } from '@/hooks/useNotices';
import { useParams, useRouter } from 'next/navigation';
import { CATEGORY_ICONS } from '@/lib/constants';
import { HiOutlineInboxStack, HiOutlineDocumentText, HiOutlineArrowLeft, HiOutlineBookmark, HiOutlineShare, HiOutlineCalendarDays, HiOutlineUser, HiOutlineTag, HiOutlinePaperClip, HiOutlineClock, HiOutlineChevronRight } from 'react-icons/hi2';
import { formatDistanceToNow, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { markNoticeAsRead, deleteNotice } from '@/lib/firestore';

const CATEGORY_CHIP_THEMES: Record<string, string> = {
  Academic: 'bg-soft-blue text-charcoal border-blue-100',
  Placement: 'bg-soft-green text-charcoal border-emerald-100',
  Events: 'bg-soft-yellow text-charcoal border-amber-100',
  Urgent: 'bg-soft-red text-charcoal border-red-100',
  General: 'bg-bg-card-secondary text-text-muted border-border-subtle',
};

export default function NoticeDetailPage() {
  const { id } = useParams() as { id: string };
  const { notices, loading } = useNotices();
  const { user, appUser } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const notice = notices.find(n => n.id === id);

  useEffect(() => {
    // Mark as read
    if (notice && user && appUser && (!appUser.readNotices || !appUser.readNotices.includes(notice.id))) {
      markNoticeAsRead(user.uid, notice.id).catch(() => {});
    }
    // Check saved state
    if (notice) {
      const savedIds = JSON.parse(localStorage.getItem('savedNotices') || '[]');
      setSaved(savedIds.includes(notice.id));
    }
  }, [notice, user, appUser]);

  const handleSave = () => {
    if (!notice) return;
    const saved = JSON.parse(localStorage.getItem('savedNotices') || '[]');
    const newSaved = saved.includes(notice.id)
      ? saved.filter((s: string) => s !== notice.id)
      : [...saved, notice.id];
    localStorage.setItem('savedNotices', JSON.stringify(newSaved));
    setSaved(newSaved.includes(notice.id));
  };

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!notice || !window.confirm('Delete this notice? This action cannot be undone.')) return;
    try {
      await deleteNotice(notice.id);
      router.push('/notices');
    } catch (error) {
      console.error('Failed to delete notice:', error);
      alert('Failed to delete notice.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-charcoal border-t-transparent" />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="text-center py-24 flex flex-col items-center animate-fadeUp">
        <HiOutlineInboxStack className="w-16 h-16 mb-4 text-text-muted opacity-40" />
        <h2 className="text-2xl font-black text-charcoal tracking-tighter">Announcement Expired</h2>
        <p className="text-text-secondary mt-2 font-medium">The requested information node is no longer available in the active directory.</p>
        <button
          onClick={() => router.push('/notices')}
          className="mt-8 h-12 px-8 bg-charcoal text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-charcoal/20 active:scale-95"
        >
          Return to Board
        </button>
      </div>
    );
  }

  const themeClass = CATEGORY_CHIP_THEMES[notice.category] || CATEGORY_CHIP_THEMES.General;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeUp">
      
      {/* NAVIGATION TOOLBAR */}
      <nav className="flex items-center justify-between pb-4">
        <button
          onClick={() => router.push('/notices')}
          className="flex items-center gap-2 text-[13px] font-bold text-text-muted hover:text-charcoal transition-all group"
        >
          <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </button>

        <div className="flex items-center gap-2">
           {appUser?.isAdmin && (
             <button
               onClick={handleDelete}
               className="h-10 px-4 rounded-xl flex items-center gap-2 text-[12px] font-bold border border-red-200 bg-soft-red text-danger hover:bg-red-100 transition-all"
               title="Delete Document"
             >
               Delete
             </button>
           )}
           <button
             onClick={handleSave}
             className={`h-10 px-4 rounded-xl flex items-center gap-2 text-[12px] font-bold border transition-all ${saved ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-text-muted border-border-subtle hover:border-border-strong'}`}
           >
             <HiOutlineBookmark className={`w-4 h-4 ${saved ? 'text-accent' : ''}`} />
             {saved ? 'Archived' : 'Archive'}
           </button>
           <button
             onClick={handleShare}
             className={`h-10 px-4 rounded-xl flex items-center gap-2 text-[12px] font-bold border transition-all ${copied ? 'bg-soft-green text-charcoal border-emerald-200' : 'bg-white text-text-muted border-border-subtle hover:border-border-strong'}`}
           >
             <HiOutlineShare className="w-4 h-4" />
             {copied ? 'Link Copied' : 'Transfer Link'}
           </button>
        </div>
      </nav>

      {/* ARTICLE CARD */}
      <article className="card-shell !rounded-[32px] overflow-hidden bg-white shadow-2xl">
        
        {/* Banner Decor */}
        <div className={`h-2 w-full ${notice.urgency === 'Urgent' ? 'bg-danger shadow-[0_4px_12px_rgba(239,68,68,0.2)]' : 'bg-accent shadow-[0_4px_12px_rgba(217,255,63,0.2)]'}`} />

        <div className="p-8 md:p-12">
           
           {/* Category & Status Row */}
           <header className="flex flex-wrap items-center gap-3 mb-8">
              <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-md border shadow-sm ${themeClass}`}>
                 {notice.category} Announcement
              </span>
              {notice.isPinned && (
                <span className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-md border border-amber-200 bg-soft-yellow text-charcoal shadow-sm">
                   Pinned Directive
                </span>
              )}
              <span className="ml-auto text-[11px] font-bold text-text-muted uppercase tracking-widest opacity-60">
                 Reference ID: {id.slice(0, 8).toUpperCase()}
              </span>
           </header>

           {/* Title */}
           <h1 className="text-3xl md:text-5xl font-black text-text-primary leading-[1.1] tracking-tight mb-10">
              {notice.title}
           </h1>

           {/* Author & Timestamp Matrix */}
           <div className="flex flex-wrap items-center gap-8 py-6 border-y border-border-subtle border-dashed mb-10">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-charcoal text-white flex items-center justify-center text-sm font-black shadow-lg shadow-charcoal/20">
                    {notice.postedBy.charAt(0)}
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Authoring Entity</p>
                    <p className="text-[15px] font-bold text-charcoal leading-none">{notice.postedBy}</p>
                 </div>
              </div>

              <div className="h-8 w-px bg-border-subtle" />

              <div className="flex items-center gap-3">
                 <HiOutlineCalendarDays className="w-6 h-6 text-text-muted" />
                 <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Timestamp</p>
                    <p className="text-[15px] font-bold text-charcoal leading-none">{format(notice.postedAt, 'MMMM d, yyyy')}</p>
                 </div>
              </div>

              <div className="h-8 w-px bg-border-subtle" />

              <div className="flex items-center gap-3">
                 <HiOutlineClock className="w-6 h-6 text-text-muted" />
                 <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Cycle Expiry</p>
                    <p className="text-[15px] font-bold text-charcoal leading-none">{format(notice.expiryDate, 'MMMM d, yyyy')}</p>
                 </div>
              </div>
           </div>

           {/* Body Text */}
           <div className="prose prose-lg max-w-none mb-12 text-text-secondary leading-[1.8] font-medium selection:bg-accent/30 selection:text-charcoal">
             {notice.body.split('\n').map((para, i) => (
               <p key={i} className="mb-6 last:mb-0">{para}</p>
             ))}
           </div>

           {/* Tags & Meta */}
           <footer className="space-y-8 pt-8 border-t border-border-subtle border-dashed">
              
              {/* Target Audience */}
              {notice.tags && notice.tags.length > 0 && (
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-bg-card-secondary flex items-center justify-center text-text-muted border border-border-subtle shrink-0">
                      <HiOutlineTag className="w-5 h-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mb-2 leading-none pt-1">Restricted Distribution Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {notice.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-bold text-charcoal bg-bg-hover px-3 py-1 rounded-lg border border-border-subtle transition-all hover:border-charcoal hover:shadow-sm cursor-default">
                             {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              )}

              {/* Attachment Module */}
              {notice.attachmentUrl && (
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-charcoal border border-accent/20 shrink-0">
                      <HiOutlinePaperClip className="w-5 h-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mb-3 leading-none pt-1">Supplementary Payload</p>
                      <a
                        href={notice.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-4 rounded-2xl bg-bg-card-secondary border border-border-subtle hover:bg-white hover:border-charcoal hover:shadow-2xl transition-all duration-500"
                      >
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-border-subtle flex items-center justify-center shadow-sm group-hover:bg-charcoal group-hover:text-white transition-all">
                               <HiOutlineDocumentText className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[15px] font-bold text-charcoal truncate max-w-[240px] md:max-w-md">{notice.attachmentName || 'Download Documentation'}</p>
                               <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest mt-0.5">Encrypted PDF Module · Localized</p>
                            </div>
                         </div>
                         <HiOutlineChevronRight className="w-6 h-6 text-text-muted group-hover:text-charcoal group-hover:translate-x-1 transition-all mr-2" />
                      </a>
                   </div>
                </div>
              )}
           </footer>
        </div>
      </article>

      {/* FOOTER INFO */}
      <div className="flex justify-center pt-8">
         <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.2em] opacity-40">End of Bulletin Transmission</p>
      </div>
    </div>
  );
}
