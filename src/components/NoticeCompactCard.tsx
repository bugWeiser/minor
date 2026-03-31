'use client';

import Link from 'next/link';
import { Notice } from '@/lib/types';
import { CATEGORY_ICONS } from '@/lib/constants';
import { timeAgo } from '@/lib/utils';
import { HiOutlineClock, HiOutlineChevronRight } from 'react-icons/hi2';

interface Props {
  notice: Notice;
}

const THEMES: Record<string, string> = {
  Academic: 'bg-soft-blue text-charcoal border-blue-100',
  Placement: 'bg-soft-green text-charcoal border-emerald-100',
  Events: 'bg-soft-yellow text-charcoal border-amber-100',
  Urgent: 'bg-soft-red text-charcoal border-red-100',
  General: 'bg-bg-card-secondary text-text-muted border-border-subtle',
};

export default function NoticeCompactCard({ notice }: Props) {
  const Icon = CATEGORY_ICONS[notice.category] || HiOutlineClock;
  const themeClass = THEMES[notice.category] || THEMES.General;

  return (
    <Link href={`/notices/${notice.id}`} className="block group">
      <div className="bg-white p-4 rounded-2xl border border-border-subtle hover:border-charcoal/20 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex gap-4 items-center">
        {/* Category Indicator */}
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border shadow-sm transition-all group-hover:scale-110 ${themeClass}`}>
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
        
        {/* Content Matrix */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-text-muted opacity-60">
                {notice.category} Protocol
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black text-text-muted uppercase tracking-widest">
              <HiOutlineClock className="w-3 h-3" />
              {timeAgo(notice.postedAt)}
            </span>
          </div>
          
          <h4 className="text-[15px] font-black text-charcoal truncate tracking-tight group-hover:text-black transition-colors">
            {notice.isPinned && <span className="mr-1 text-warning">📌</span>}
            {notice.title}
          </h4>
        </div>

        {/* Action Vector */}
        <div className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
            <HiOutlineChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
