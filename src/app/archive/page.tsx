'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Notice } from '@/lib/types';
import NoticeCard from '@/components/NoticeCard';
import { HiOutlineArchiveBox, HiOutlineArrowPath } from 'react-icons/hi2';

export default function ArchivePage() {
  const [archived, setArchived] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArchived() {
      try {
        const q = query(
          collection(db, 'notices'),
          where('expiryDate', '<', Timestamp.now()),
          orderBy('expiryDate', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            postedAt: d.postedAt instanceof Timestamp ? d.postedAt.toDate() : new Date(d.postedAt),
            expiryDate: d.expiryDate instanceof Timestamp ? d.expiryDate.toDate() : new Date(d.expiryDate)
          } as Notice;
        });
        setArchived(data);
      } catch (err) {
        console.error("Failed to fetch archive:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArchived();
  }, []);

  return (
    <div className="space-y-8 animate-fadeUp">
      <header className="flex flex-col gap-2 pb-2 border-b border-border-subtle">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Institutional Archive</h1>
        <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px]">Historical record of past faculty announcements</p>
      </header>
      
      {loading ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 opacity-50">
          <div className="animate-spin w-10 h-10 rounded-full border-4 border-charcoal border-t-accent" />
          <p className="text-[11px] font-black uppercase tracking-widest text-text-muted">Accessing Storage Nodes...</p>
        </div>
      ) : archived.length === 0 ? (
        <div className="card-shell py-24 flex flex-col items-center justify-center text-center opacity-40">
          <HiOutlineArchiveBox className="w-16 h-16 text-text-muted mb-4" />
          <h2 className="text-2xl font-black text-charcoal tracking-tight">Archive Is Void</h2>
          <p className="text-[13px] text-text-muted font-medium mt-1">No announcements have been cleared for archival storage yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {archived.map((notice, i) => (
            <div key={notice.id} className="opacity-80 hover:opacity-100 transition-all filter grayscale hover:grayscale-0">
              <NoticeCard notice={notice} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
