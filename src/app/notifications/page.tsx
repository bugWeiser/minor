'use client';

import { useState, useMemo } from 'react';
import { useNotices } from '@/hooks/useNotices';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES } from '@/lib/constants';
import EmptyState from '@/components/EmptyState';
import SectionHeader from '@/components/ui/SectionHeader';
import FilterChips from '@/components/ui/FilterChips';
import { useRouter } from 'next/navigation';
import { timeAgo } from '@/lib/utils';
import { format } from 'date-fns';

import { 
  HiOutlineBookOpen, 
  HiOutlineBriefcase, 
  HiOutlineCalendarDays, 
  HiOutlineMegaphone, 
  HiOutlineAcademicCap, 
  HiOutlinePlayCircle, 
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineBellAlert,
  HiOutlineChevronRight,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

type NotifTab = 'notifications' | 'preferences';

const CATEGORY_STYLE: Record<string, { bg: string, text: string, Icon: any }> = {
  Academic: { bg: 'bg-soft-blue', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineBookOpen },
  Placement: { bg: 'bg-soft-green', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineBriefcase },
  Events: { bg: 'bg-soft-yellow', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineCalendarDays },
  Scholarships: { bg: 'bg-soft-blue', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineAcademicCap },
  Sports: { bg: 'bg-soft-red', text: 'text-charcoal border-charcoal/20', Icon: HiOutlinePlayCircle },
  Hostel: { bg: 'bg-soft-blue', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineHome },
  General: { bg: 'bg-bg-card-secondary', text: 'text-charcoal border-charcoal/20', Icon: HiOutlineMegaphone },
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<NotifTab>('notifications');
  const { filteredNotices: notices, loading } = useNotices();
  const { appUser } = useAuth();
  const router = useRouter();

  const [prefs, setPrefs] = useState<string[]>(
    appUser?.subscribedCategories ?? CATEGORIES
  );
  const [prefsSaved, setPrefsSaved] = useState(false);

  const notifications = useMemo(() => {
    return notices
      .filter(n => !n.expiryDate || n.expiryDate > new Date())
      .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
      .slice(0, 20)
      .map(n => ({
        id: n.id,
        title: n.title,
        category: n.category,
        time: n.postedAt,
        noticeId: n.id,
        isUnread: !(appUser?.readNotices ?? []).includes(n.id),
      }));
  }, [notices, appUser]);

  const togglePref = (cat: string) => {
    setPrefs(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setPrefsSaved(false);
  };

  const savePrefs = () => {
    localStorage.setItem('notifPrefs', JSON.stringify(prefs));
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <SectionHeader
        title="Recent Alerts"
        subtitle={
          loading ? 'Polling notification nodes...' : `${notifications.filter(n => n.isUnread).length} critical packets requires human interaction`
        }
        subtitleVariant="strong"
      />

      <FilterChips
        items={[
          { label: 'Active Feed', value: 'notifications', icon: HiOutlineBellAlert },
          { label: 'Frequency Preferences', value: 'preferences', icon: HiOutlineCog6Tooth },
        ]}
        activeValue={activeTab}
        onChange={(val) => setActiveTab(val as NotifTab)}
        activeStyle="charcoal"
        shape="rounded"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN LIST (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'notifications' ? (
            <div className="space-y-3">
              {loading ? (
                <div className="card-shell p-12 flex items-center justify-center"><p className="text-sm font-bold text-text-muted animate-pulse">Syncing nodes...</p></div>
              ) : notifications.length === 0 ? (
                <EmptyState icon="🔔" message="Operational Peace" sub="No active notification packets detected in your current node environment." />
              ) : (
                notifications.map(notif => {
                  const style = CATEGORY_STYLE[notif.category] || CATEGORY_STYLE.General;
                  const Icon = style.Icon;

                  return (
                    <button
                      key={notif.id}
                      onClick={() => router.push(`/notices/${notif.noticeId}`)}
                      className="w-full text-left flex items-center gap-4 p-4 card-shell hover:bg-bg-hover group border-border-subtle shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                    >
                      {/* Interaction glow for unread */}
                      {notif.isUnread && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_8px_rgba(217,255,63,0.5)]" />
                      )}

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all group-hover:shadow-md ${style.bg} ${style.text}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.bg} ${style.text}`}>
                              {notif.category}
                            </span>
                            <span className="text-[11px] font-bold text-text-muted">· {timeAgo(notif.time)}</span>
                         </div>
                         <h3 className={`text-[15px] font-bold truncate transition-colors ${notif.isUnread ? 'text-text-primary group-hover:text-charcoal' : 'text-text-secondary line-through opacity-60'}`}>
                           {notif.title}
                         </h3>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                        {notif.isUnread && (
                          <div className="w-2.5 h-2.5 bg-accent rounded-full shadow-lg shadow-accent/40 soft-pulse" />
                        )}
                        <HiOutlineChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            /* Preferences Panel */
            <div className="space-y-6">
               <section className="card-shell p-6 bg-soft-blue/20 border-blue-100 border-dashed">
                 <div className="flex items-center gap-3">
                    <HiOutlineCog6Tooth className="w-6 h-6 text-charcoal" />
                    <div>
                      <h3 className="text-lg font-bold text-text-primary tracking-tight">Signal Configuration</h3>
                      <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Choose which modules broadcast through your terminal</p>
                    </div>
                 </div>
               </section>

               <div className="card-shell divide-y divide-border-subtle overflow-hidden">
                  {CATEGORIES.map(cat => {
                    const enabled = prefs.includes(cat);
                    const style = CATEGORY_STYLE[cat] || CATEGORY_STYLE.General;
                    const Icon = style.Icon;
                    return (
                      <div key={cat} className="flex items-center justify-between px-6 py-4.5 bg-white hover:bg-bg-card-secondary transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${enabled ? `${style.bg} ${style.text}` : 'bg-bg-card-secondary text-text-muted border-border-subtle'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[14px] font-bold transition-colors ${enabled ? 'text-charcoal' : 'text-text-muted'}`}>{cat} Announcements</span>
                        </div>
                        <button
                          title={`Toggle ${cat} Notifications`}
                          onClick={() => togglePref(cat)}
                          className={`relative w-[52px] h-[28px] rounded-full transition-all duration-300 ease-in-out border ${
                            enabled ? 'bg-charcoal border-charcoal' : 'bg-bg-card-secondary border-border-subtle'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 inset-y-0.5 w-[22px] rounded-[9px] shadow-md transition-all duration-300 ${
                              enabled ? 'left-[calc(52px-24px)] bg-accent' : 'left-0.5 bg-white border border-border-subtle'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
               </div>

               <button
                 onClick={savePrefs}
                 className={`w-full py-4 rounded-[22px] font-black text-sm uppercase tracking-widest transition-all relative overflow-hidden group ${
                   prefsSaved
                     ? 'bg-soft-green text-charcoal border border-emerald-100 shadow-xl'
                     : 'bg-charcoal text-white shadow-xl shadow-charcoal/20 hover:shadow-charcoal/40 active:scale-95'
                 }`}
               >
                 <span className="relative z-10 flex items-center justify-center gap-2">
                   {prefsSaved ? <HiOutlineCheckCircle className="w-5 h-5" /> : null}
                   {prefsSaved ? 'Configuration Indexed' : 'Commute Preference Matrix'}
                 </span>
                 {!prefsSaved && (
                   <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                 )}
               </button>
            </div>
          )}
        </div>

        {/* SIDEBAR SUMMARY (1/3) */}
        <div className="lg:col-span-1 space-y-6">
           <section className="card-shell p-6 bg-white relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all pointer-events-none" />
              
              <header className="flex justify-between items-center mb-8 relative z-10">
                 <h2 className="text-xl font-bold text-text-primary tracking-tight">System Status</h2>
                 <HiOutlineBellAlert className="w-5 h-5 text-charcoal/30 soft-pulse" />
              </header>

              <div className="space-y-5 relative z-10">
                 <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-charcoal uppercase tracking-[0.2em] mb-1">Pending Alerts</p>
                    <p className="text-5xl font-black text-charcoal tracking-tighter leading-none">
                      {notifications.filter(n => n.isUnread).length}
                    </p>
                    <p className="text-[12px] font-bold text-text-muted mt-2 uppercase tracking-wider font-inter">New Notifications</p>
                 </div>
                 
                 <div className="h-1.5 rounded-full bg-bg-card-secondary overflow-hidden mt-4">
                    <div className="h-full bg-accent transition-all duration-1000 delay-300" {...({ style: { width: `${(notifications.filter(n => n.isUnread).length / 20) * 100}%` } } as React.HTMLAttributes<HTMLDivElement>)} />
                 </div>
              </div>
           </section>

           <section className="card-shell p-6 bg-white transition-all hover:bg-bg-hover border-dashed">
              <h2 className="text-lg font-bold text-text-primary tracking-tight mb-4">System Health</h2>
              <div className="space-y-4">
                 {[
                   { label: 'Connection', val: 'Low Latency', color: 'text-soft-green' },
                   { label: 'Subscribed Categories', val: prefs.length, color: 'text-text-primary' },
                   { label: 'Service Uptime', val: '99.98%', color: 'text-charcoal' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2.5 border-b border-border-subtle last:border-0 border-dashed">
                      <span className="text-[11px] font-black text-text-muted uppercase tracking-wider">{stat.label}</span>
                      <span className={`text-[13px] font-black ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
              </div>
           </section>
        </div>

      </div>
    </div>
  );
}
