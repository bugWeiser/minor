'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNoticeForm from '@/components/AdminNoticeForm';
import { addNotice } from '@/lib/firestore';
import TagSelector from '@/components/admin/TagSelector';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import { HiOutlineMegaphone, HiOutlineCalendarDays, HiOutlineClipboardDocumentList, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi2';

type AdminTab = 'Notice' | 'Event' | 'Assignment';

export default function AdminPage() {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('Notice');

  // Event form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTags, setEventTags] = useState<string[]>(['ALL']);
  const [eventMsg, setEventMsg] = useState('');

  // Assignment form state
  const [assignTitle, setAssignTitle] = useState('');
  const [assignCourse, setAssignCourse] = useState('');
  const [assignDue, setAssignDue] = useState('');
  const [assignTags, setAssignTags] = useState<string[]>(['ALL']);
  const [assignMsg, setAssignMsg] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-fadeUp">
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

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    setEventMsg('✅ Event added successfully! (Mock)');
    setTimeout(() => {
      setEventTitle(''); setEventDate(''); setEventTags(['ALL']); setEventMsg('');
    }, 2000);
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle || !assignCourse || !assignDue) return;
    setAssignMsg('✅ Assignment published successfully! (Mock)');
    setTimeout(() => {
      setAssignTitle(''); setAssignCourse(''); setAssignDue(''); setAssignTags(['ALL']); setAssignMsg('');
    }, 2000);
  };

  const inp = "w-full h-14 px-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all";
  const lbl = "block text-[11px] font-black text-text-muted uppercase tracking-[0.15em] mb-2.5 ml-1";

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeUp">
      <header className="flex flex-col gap-2 pb-2 border-b border-border-subtle">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">University Control Center</h1>
        <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px]">Authorized Administrative Interface · Session Active</p>
      </header>
      
      {/* Content Type Tabs - Pure Modern Look */}
      <div className="flex p-1.5 bg-bg-card-secondary border border-border-subtle rounded-[24px] shadow-sm">
        {(['Notice', 'Event', 'Assignment'] as AdminTab[]).map(tab => {
          const isActive = activeTab === tab;
          const Icon = tab === 'Notice' ? HiOutlineMegaphone : tab === 'Event' ? HiOutlineCalendarDays : HiOutlineClipboardDocumentList;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2.5 h-12 rounded-[18px] text-[13px] font-black transition-all duration-300 ${
                isActive
                  ? 'bg-white text-charcoal shadow-sm border border-border-subtle translate-y-0'
                  : 'text-text-muted hover:text-text-primary hover:bg-white/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal' : 'text-text-muted'}`} />
              {tab === 'Notice' ? 'Notice' : tab === 'Event' ? 'Event' : 'Task'}
            </button>
          );
        })}
      </div>

      <div className="card-shell p-8 md:p-10 bg-white group">
        
        {activeTab === 'Notice' && (
          <div className="animate-fadeUp">
            <header className="mb-10">
               <h2 className="text-2xl font-black text-charcoal tracking-tight">Terminal Announcement</h2>
               <p className="text-[13px] text-text-muted font-medium mt-1">Broadcast high-priority communications to the institutional grid.</p>
            </header>
            <AdminNoticeForm 
              onSubmit={async (data) => { await addNotice(data); }} 
            />
          </div>
        )}

        {activeTab === 'Event' && (
          <form onSubmit={handleAddEvent} className="space-y-8 animate-fadeUp">
            <header className="mb-10">
               <h2 className="text-2xl font-black text-charcoal tracking-tight">Schedule Milestone</h2>
               <p className="text-[13px] text-text-muted font-medium mt-1">Index a new temporal marker in the academic schedule.</p>
            </header>
            
            <div className="space-y-6">
              <div>
                <label className={lbl}>Event Title <span className="text-danger">*</span></label>
                <input required value={eventTitle} onChange={e => setEventTitle(e.target.value)} className={inp} placeholder="e.g. Mid-term Examinations Commencement" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Date <span className="text-danger">*</span></label>
                  <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Event Type</label>
                  <select className={inp}>
                    <option>Academic</option>
                    <option>Holiday</option>
                    <option>Workshop / Seminar</option>
                    <option>Cultural / Sports</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={lbl}>Target Audience Tags <span className="text-danger">*</span></label>
                <div className="bg-bg-card-secondary p-5 rounded-2xl border border-dashed border-border-strong group-hover:border-charcoal/20 transition-all">
                  <TagSelector selectedTags={eventTags} onChange={setEventTags} />
                </div>
              </div>
            </div>

            {eventMsg && (
              <div className="p-4 rounded-xl text-sm font-bold bg-soft-green text-charcoal border border-emerald-100 flex items-center gap-2">
                <span className="soft-pulse">●</span> {eventMsg}
              </div>
            )}

            <button type="submit" className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3">
              📅 Index Milestone
            </button>
          </form>
        )}

        {activeTab === 'Assignment' && (
          <form onSubmit={handleAddAssignment} className="space-y-8 animate-fadeUp">
            <header className="mb-10">
               <h2 className="text-2xl font-black text-charcoal tracking-tight">Publish Curriculum Task</h2>
               <p className="text-[13px] text-text-muted font-medium mt-1">Deploy a new academic responsibility to specific student cohorts.</p>
            </header>
            
            <div className="space-y-6">
              <div>
                <label className={lbl}>Task Title <span className="text-danger">*</span></label>
                <input required value={assignTitle} onChange={e => setAssignTitle(e.target.value)} className={inp} placeholder="e.g. Strategic Management Case Study" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={lbl}>Course Domain <span className="text-danger">*</span></label>
                  <input required value={assignCourse} onChange={e => setAssignCourse(e.target.value)} className={inp} placeholder="e.g. BBA-401 Strategic Marketing" />
                </div>
                <div>
                  <label className={lbl}>Temporal Deadline <span className="text-danger">*</span></label>
                  <input type="datetime-local" required value={assignDue} onChange={e => setAssignDue(e.target.value)} className={inp} />
                </div>
              </div>

              <div>
                <label className={lbl}>Target Audience Tags <span className="text-danger">*</span></label>
                <div className="bg-bg-card-secondary p-5 rounded-2xl border border-dashed border-border-strong group-hover:border-charcoal/20 transition-all">
                  <TagSelector selectedTags={assignTags} onChange={setAssignTags} />
                </div>
              </div>
            </div>

            {assignMsg && (
              <div className="p-4 rounded-xl text-sm font-bold bg-soft-green text-charcoal border border-emerald-100 flex items-center gap-2">
                <span className="soft-pulse">●</span> {assignMsg}
              </div>
            )}

            <button type="submit" className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3">
              📝 Deploy Academic Task
            </button>
          </form>
        )}

      </div>

      <footer className="pt-8 border-t border-border-subtle border-dashed flex justify-center opacity-30">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Institutional Control Layer //</p>
      </footer>
    </div>
  );
}
