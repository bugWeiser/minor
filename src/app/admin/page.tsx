'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNoticeForm from '@/components/AdminNoticeForm';
import AdminAssignmentForm from '@/components/AdminAssignmentForm';
import AdminEventForm from '@/components/AdminEventForm';
import { addNotice, addAssignment, addEvent, deleteAssignment, deleteEvent, deleteNotice } from '@/lib/firestore';
import { useNotices } from '@/hooks/useNotices';
import { useAssignments } from '@/hooks/useAssignments';
import { useEvents } from '@/hooks/useEvents';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { 
  HiOutlineMegaphone, 
  HiOutlineCalendarDays, 
  HiOutlineClipboardDocumentList, 
  HiOutlineShieldCheck, 
  HiOutlineArrowRight,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineTag
} from 'react-icons/hi2';
import { format } from 'date-fns';

type AdminTab = 'Notice' | 'Event' | 'Assignment';

export default function AdminPage() {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('Notice');
  
  const { notices } = useNotices();
  const { assignments } = useAssignments();
  const { events } = useEvents();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto animate-fadeUp p-6">
        <WidgetSkeleton />
        <WidgetSkeleton />
      </div>
    );
  }

  // Block non-admin users
  if (appUser && !appUser.isAdmin && appUser.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fadeUp">
        <div className="w-20 h-20 rounded-3xl bg-soft-red flex items-center justify-center text-danger mb-6 shadow-lg shadow-danger/10">
          <HiOutlineShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-charcoal tracking-tight mb-3">Access Restricted</h2>
        <p className="text-text-secondary font-medium max-w-md mb-8 leading-relaxed">
          The requested node requires faculty level authorization. Your current credential set is insufficient.
        </p>
        <button 
          onClick={() => router.push('/')} 
          className="h-12 px-8 bg-charcoal text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-charcoal/20 transition-all active:scale-95 flex items-center gap-2"
        >
          Return to Dashboard <HiOutlineArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const handleDeleteAssignment = async (id: string) => {
    if (confirm('Verify: Terminate this academic task?')) {
      await deleteAssignment(id);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Verify: De-index this milestone from the grid?')) {
      await deleteEvent(id);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (confirm('Verify: Delete this announcement protocol?')) {
      await deleteNotice(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeUp p-4 md:p-6 pb-24 lg:pb-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border-subtle">
        <div>
           <h1 className="text-3xl font-black text-text-primary tracking-tight">Institutional Control Layer</h1>
           <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px] mt-1">Authorized Administrative Interface · Session Active</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-xl">
           <HiOutlineShieldCheck className="w-4 h-4 text-charcoal" />
           <span className="text-[10px] font-black text-charcoal uppercase tracking-widest">Admin Access Granted</span>
        </div>
      </header>
      
      {/* Content Type Tabs */}
      <div className="flex p-1.5 bg-bg-card-secondary border border-border-subtle rounded-[24px] shadow-sm w-full md:w-fit overflow-x-auto scrollbar-hide">
        {(['Notice', 'Assignment', 'Event'] as AdminTab[]).map(tab => {
          const isActive = activeTab === tab;
          const Icon = tab === 'Notice' ? HiOutlineMegaphone : tab === 'Event' ? HiOutlineCalendarDays : HiOutlineClipboardDocumentList;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:min-w-[140px] flex items-center justify-center gap-2.5 h-12 rounded-[18px] text-[13px] font-black transition-all duration-300 ${
                isActive
                  ? 'bg-white text-charcoal shadow-sm border border-border-subtle translate-y-0'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal' : 'text-text-muted'}`} />
              {tab === 'Notice' ? 'Broadcast' : tab === 'Event' ? 'Milestone' : 'Task'}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM PANEL */}
        <div className="lg:col-span-7 card-shell p-6 md:p-10 bg-white group border-border-subtle transition-all hover:bg-white">
          {activeTab === 'Notice' && (
            <div className="animate-fadeUp">
              <header className="mb-10 flex justify-between items-start">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-charcoal tracking-tight">Announcement Creation</h2>
                    <p className="text-[13px] text-text-muted font-medium">Broadcast high-priority communications to the institutional grid.</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-soft-blue flex items-center justify-center text-charcoal">
                    <HiOutlineMegaphone strokeWidth={2.5} className="w-6 h-6" />
                 </div>
              </header>
              <AdminNoticeForm 
                onSubmit={async (data) => { await addNotice(data); }} 
              />
            </div>
          )}

          {activeTab === 'Assignment' && (
            <div className="animate-fadeUp">
              <header className="mb-10 flex justify-between items-start">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-charcoal tracking-tight">Curriculum Deployment</h2>
                    <p className="text-[13px] text-text-muted font-medium">Assign new academic responsibilities to student cohorts.</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-soft-green flex items-center justify-center text-charcoal">
                    <HiOutlineClipboardDocumentList strokeWidth={2.5} className="w-6 h-6" />
                 </div>
              </header>
              <AdminAssignmentForm onSubmit={async (data) => { await addAssignment(data); }} />
            </div>
          )}

          {activeTab === 'Event' && (
            <div className="animate-fadeUp">
              <header className="mb-10 flex justify-between items-start">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-black text-charcoal tracking-tight">Temporal Grid Indexing</h2>
                    <p className="text-[13px] text-text-muted font-medium">Register a new milestone in the institutional calendar.</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-soft-yellow flex items-center justify-center text-charcoal">
                    <HiOutlineCalendarDays strokeWidth={2.5} className="w-6 h-6" />
                 </div>
              </header>
              <AdminEventForm onSubmit={async (data) => { await addEvent(data); }} />
            </div>
          )}
        </div>

        {/* LIST PANEL */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8 max-h-[85vh] overflow-y-auto pr-2 scrollbar-hide">
          <header className="px-1 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-charcoal rounded-full" />
                <h3 className="text-[13px] font-black text-charcoal uppercase tracking-[0.2em]">{activeTab} Registry</h3>
             </div>
             <span className="text-[10px] font-black text-text-muted bg-bg-card-secondary px-3 py-1 rounded-full border border-border-subtle uppercase tracking-widest">
                {activeTab === 'Notice' ? notices.length : activeTab === 'Assignment' ? assignments.length : events.length} Data Points
             </span>
          </header>

          <div className="space-y-4">
             {activeTab === 'Notice' && notices.map(notice => (
               <div key={notice.id} className="p-5 rounded-3xl bg-white border border-border-subtle hover:border-charcoal hover:shadow-2xl transition-all group/card shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                       <h4 className="text-[15px] font-black text-charcoal tracking-tight truncate group-hover/card:text-black">{notice.title}</h4>
                       <div className="flex items-center gap-2 mt-1.5 opacity-60">
                          <span className="text-[9px] font-black uppercase text-text-muted">{notice.category}</span>
                          <span className="text-[9px] text-text-muted font-bold/40">·</span>
                          <span className="text-[9px] text-text-muted font-bold">{format(notice.postedAt, 'MMM d, h:mm a')}</span>
                       </div>
                    </div>
                    <button onClick={() => handleDeleteNotice(notice.id)} className="w-9 h-9 rounded-xl bg-soft-red text-danger flex items-center justify-center opacity-0 group-hover/card:opacity-100 hover:bg-danger hover:text-white transition-all scale-90 hover:scale-100 shadow-sm">
                       <HiOutlineTrash strokeWidth={2} className="w-4 h-4" />
                    </button>
                  </div>
               </div>
             ))}

             {activeTab === 'Assignment' && assignments.map(a => (
               <div key={a.id} className="p-5 rounded-3xl bg-white border border-border-subtle hover:border-charcoal hover:shadow-2xl transition-all group/card shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                       <h4 className="text-[15px] font-black text-charcoal tracking-tight truncate group-hover/card:text-black">{a.title}</h4>
                       <p className="text-[11px] font-bold text-text-muted mt-0.5 truncate">{a.course}</p>
                       <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1.5 text-danger bg-soft-red px-2 py-0.5 rounded-md border border-red-50) text-[9px] font-bold">
                             <HiOutlineClock className="w-3 h-3" />
                             DUE {format(a.dueDate, 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center gap-1.5 text-charcoal bg-bg-card-secondary px-2 py-0.5 rounded-md border border-border-subtle text-[9px] font-bold">
                             <HiOutlineTag className="w-3 h-3" />
                             {a.tags[0]}
                          </div>
                       </div>
                    </div>
                    <button onClick={() => handleDeleteAssignment(a.id)} className="w-9 h-9 rounded-xl bg-soft-red text-danger flex items-center justify-center opacity-0 group-hover/card:opacity-100 hover:bg-danger hover:text-white transition-all scale-90 hover:scale-100 shadow-sm">
                       <HiOutlineTrash strokeWidth={2} className="w-4 h-4" />
                    </button>
                  </div>
               </div>
             ))}

             {activeTab === 'Event' && events.map(e => (
               <div key={e.id} className="p-5 rounded-3xl bg-white border border-border-subtle hover:border-charcoal hover:shadow-2xl transition-all group/card shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">{e.category}</span>
                       </div>
                       <h4 className="text-[15px] font-black text-charcoal tracking-tight truncate group-hover/card:text-black">{e.title}</h4>
                       <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-charcoal">
                             <HiOutlineCalendarDays className="w-3.5 h-3.5" />
                             {format(e.date, 'MMM d')}
                          </div>
                          <span className="text-text-muted/40">·</span>
                          <span className="text-[11px] font-bold text-text-muted">{e.time || 'All Day'}</span>
                       </div>
                    </div>
                    <button onClick={() => handleDeleteEvent(e.id)} className="w-9 h-9 rounded-xl bg-soft-red text-danger flex items-center justify-center opacity-0 group-hover/card:opacity-100 hover:bg-danger hover:text-white transition-all scale-90 hover:scale-100 shadow-sm">
                       <HiOutlineTrash strokeWidth={2} className="w-4 h-4" />
                    </button>
                  </div>
               </div>
             ))}

             {(activeTab === 'Notice' ? notices : activeTab === 'Assignment' ? assignments : events).length === 0 && (
                <div className="py-12 border border-border-subtle border-dashed rounded-3xl flex flex-col items-center justify-center text-center px-6 opacity-30">
                   <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Registry Vacant</p>
                </div>
             )}
          </div>
        </div>

      </div>

      <footer className="pt-8 border-t border-border-subtle border-dashed flex justify-center opacity-30 mt-12">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Institutional Control Layer · Horizon 2026-T4 //</p>
      </footer>
    </div>
  );
}
