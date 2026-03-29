'use client';
import { Notice } from '@/lib/types';
import NoticeCard from './NoticeCard';

export default function PinnedSection({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) return null;
  return (
    <section className="mb-4">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">📌 Pinned Notices</h2>
      <div className="space-y-3">
        {notices.map((n, i) => <NoticeCard key={n.id} notice={n} index={i} />)}
      </div>
    </section>
  );
}
