'use client';

import Link from 'next/link';
import { Notice } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/constants';
import { useTheme } from '@/context/ThemeContext';
import { timeAgo } from '@/lib/utils';
import { HiOutlineClock } from 'react-icons/hi';

interface Props {
  notice: Notice;
}

export default function NoticeCompactCard({ notice }: Props) {
  const { theme: currentTheme } = useTheme();
  const theme = CATEGORY_COLORS[notice.category];

  return (
    <Link href={`/notice/${notice.id}`} className="block group">
      <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm transition-all flex gap-3 items-start">
        {/* Category Icon Icon */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
          style={{ 
            backgroundColor: currentTheme === 'dark' ? theme.darkBg : theme.bg, 
            color: currentTheme === 'dark' ? theme.darkText : theme.text 
          }}
        >
          {theme.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-1 mb-0.5">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {notice.isPinned && <span className="mr-1">📌</span>}
              {notice.title}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
            {notice.body}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
            <span className="flex items-center gap-0.5">
              <HiOutlineClock />
              {timeAgo(notice.postedAt)}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
            <span>{notice.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
