'use client';

import { useNotices } from '@/hooks/useNotices';
import { useAuth } from '@/context/AuthContext';
import { filterByUserTags } from '@/lib/filterUtils';
import Link from 'next/link';
import { timeAgo } from '@/lib/utils';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { useRouter } from 'next/navigation';
import {
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineExclamationCircle,
  HiOutlineBell,
  HiOutlineArrowRight,
  HiOutlineChevronRight,
} from 'react-icons/hi2';

const getCategoryStyles = (category: string, urgency: string) => {
  if (urgency === 'Urgent') return { bg: 'bg-soft-red', text: 'text-danger border-red-100', icon: HiOutlineExclamationCircle };
  
  switch (category) {
    case 'Academic': return { bg: 'bg-soft-blue', text: 'text-charcoal border-blue-100', icon: HiOutlineBookOpen };
    case 'Placement': return { bg: 'bg-soft-green', text: 'text-charcoal border-emerald-100', icon: HiOutlineBriefcase };
    case 'Events': return { bg: 'bg-soft-yellow', text: 'text-charcoal border-amber-100', icon: HiOutlineCalendarDays };
    default: return { bg: 'bg-bg-card-secondary', text: 'text-text-muted border-border-subtle', icon: HiOutlineBell };
  }
};

export default function NotificationsWidget() {
  const { notices, loading } = useNotices();
  const { appUser } = useAuth();
  const router = useRouter();

  if (loading) return <WidgetSkeleton />;

  const userNotices = filterByUserTags(notices, appUser?.tags ?? [], appUser?.isAdmin);
  
  const recentNotices = userNotices
    .filter(n => !n.expiryDate || n.expiryDate > new Date())
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
    .slice(0, 5);

  return (
    <div className="card-shell p-6 bg-white flex flex-col group h-full transition-all duration-700 animate-fadeUp">
      
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent rounded-full shadow-lg shadow-accent/20" />
          <h3 className="text-xl font-black text-charcoal tracking-tight">Signal Feed</h3>
        </div>
        <Link href="/notifications" className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted hover:bg-charcoal hover:text-white transition-all group/link">
          <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </header>

      <div className="flex-1 space-y-1">
        {recentNotices.length === 0 ? (
          <div className="py-24 text-center opacity-30 border border-border-subtle border-dashed rounded-3xl">
            <HiOutlineBell className="w-12 h-12 mx-auto mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">No Active Signals</p>
          </div>
        ) : (
          recentNotices.map(notif => {
            const isUnread = !(appUser?.readNotices ?? []).includes(notif.id);
            const { bg, text, icon: Icon } = getCategoryStyles(notif.category, notif.urgency);

            return (
              <Link
                key={notif.id}
                href={`/notices/${notif.id}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 hover:bg-bg-hover group/item border border-transparent hover:border-border-subtle relative"
              >
                {isUnread && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-accent rounded-r-lg shadow-lg shadow-accent/40" />
                )}
                
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${bg} ${text}`}>
                  <Icon className="w-5 h-5 shadow-sm" strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${bg} ${text} opacity-80`}>
                      {notif.category}
                    </span>
                    <span className="text-[10px] font-bold text-text-muted opacity-60">
                        {timeAgo(notif.postedAt)}
                    </span>
                  </div>
                  <h4 className="text-[14.5px] font-black text-charcoal truncate tracking-tight group-hover/item:text-black transition-colors">
                    {notif.title}
                  </h4>
                </div>
                
                <HiOutlineChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
              </Link>
            );
          })
        )}
      </div>

      <footer className="mt-8 pt-4 border-t border-border-subtle border-dashed flex justify-between items-center">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">Frequency Mask: BBA-IV-A</p>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-soft-green soft-pulse" />
            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Active Relay</p>
         </div>
      </footer>

    </div>
  );
}
