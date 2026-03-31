'use client';
import { Notice } from '@/lib/types';
import NoticeCard from './NoticeCard';
import { HiOutlineBellAlert } from 'react-icons/hi2';

export default function PinnedSection({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) return null;
  return (
    <section className="space-y-4 animate-fadeUp">
      <header className="flex items-center gap-3 px-1">
         <HiOutlineBellAlert className="w-[18px] h-[18px] text-warning soft-pulse" />
         <h2 className="text-xl font-black text-charcoal tracking-tight">Pinned Directives</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notices.map((n, i) => <NoticeCard key={n.id} notice={n} index={i} />)}
      </div>
    </section>
  );
}
