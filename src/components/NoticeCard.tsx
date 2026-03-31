'use client';

import Link from 'next/link';
import { Notice } from '@/lib/types';
import { timeAgo } from '@/lib/utils';
import { HiOutlineUser, HiOutlineTag, HiOutlinePaperClip, HiOutlineClock, HiOutlineChevronRight } from 'react-icons/hi2';
import { HiOutlineMapPin, HiOutlineMegaphone } from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';

interface Props {
  notice: Notice;
  index?: number;
  showExpired?: boolean;
}

const CATEGORY_CHIP_THEMES: Record<string, string> = {
  Academic: 'bg-soft-blue text-charcoal border-blue-100',
  Placement: 'bg-soft-green text-charcoal border-emerald-100',
  Events: 'bg-soft-yellow text-charcoal border-amber-100',
  Urgent: 'bg-soft-red text-charcoal border-red-100',
  General: 'bg-bg-card-secondary text-text-muted border-border-subtle',
};

export default function NoticeCard({ notice, index = 0, showExpired }: Props) {
  const { appUser } = useAuth();
  const themeClass = CATEGORY_CHIP_THEMES[notice.category] || CATEGORY_CHIP_THEMES.General;
  
  const isUnread = appUser && (!appUser.readNotices || !appUser.readNotices.includes(notice.id));

  return (
    <Link href={`/notices/${notice.id}`} className="group block h-full">
      <div
        className={`
          card-shell h-full p-6 flex flex-col relative overflow-hidden transition-all duration-300
          ${notice.isPinned ? 'border-l-4 border-l-warning bg-soft-yellow/10' : 'bg-white'}
        `}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Header Metadata */}
        <header className="flex items-center justify-between mb-4 gap-3">
           <div className="flex flex-wrap items-center gap-2">
             <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-sm ${themeClass}`}>
               {notice.category}
             </span>
             {notice.urgency === 'Urgent' && (
               <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-red-100 bg-soft-red text-charcoal">
                 High Priority
               </span>
             )}
             {isUnread && (
               <span className="w-2 h-2 rounded-full bg-accent shadow-lg shadow-accent/50 soft-pulse" />
             )}
           </div>
           <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest whitespace-nowrap">
             {timeAgo(notice.postedAt)}
           </span>
        </header>

        {/* Title */}
        <div className="mb-2.5">
          <h3 className="text-[16px] font-bold text-text-primary leading-snug group-hover:text-charcoal transition-colors flex items-start gap-2">
            {notice.isPinned && <HiOutlineMapPin className="w-5 h-5 text-warning shrink-0 mt-0.5" />}
            {notice.title}
          </h3>
        </div>
        
        {/* Preview content */}
        <p className="text-[13px] text-text-secondary line-clamp-2 leading-relaxed mb-4 flex-grow opacity-80 decoration-accent/20 group-hover:opacity-100 transition-opacity">
          {notice.body}
        </p>

        {/* Action Row */}
        <footer className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between transition-all group-hover:pt-5">
           <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center border border-border-subtle text-text-muted shrink-0 group-hover:bg-accent group-hover:text-charcoal transition-all">
                <HiOutlineUser className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-text-primary truncate">{notice.postedBy}</p>
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider leading-none mt-0.5">{format(notice.expiryDate, 'MMM d, yyyy')}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
             {notice.attachmentUrl && (
               <div className="w-8 h-8 rounded-lg bg-soft-blue flex items-center justify-center text-charcoal border border-blue-100/50 shadow-sm" title="Attachment available">
                 <HiOutlinePaperClip className="w-3.5 h-3.5" />
               </div>
             )}
             <div className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted group-hover:bg-charcoal group-hover:text-white transition-all">
               <HiOutlineChevronRight className="w-3.5 h-3.5" />
             </div>
           </div>
        </footer>
      </div>
    </Link>
  );
}
