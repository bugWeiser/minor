'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  HiOutlineSun, 
  HiOutlineBell, 
  HiOutlineShieldCheck, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineFingerPrint,
  HiOutlinePaintBrush,
  HiOutlineArrowUpTray
} from 'react-icons/hi2';

export default function SettingsPage() {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center p-24">
        <div className="w-10 h-10 rounded-full border-4 border-border-subtle border-t-charcoal animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    const isFirebase = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!isFirebase) {
      localStorage.removeItem('mockRole');
      window.location.href = '/login';
    } else {
      import('@/lib/auth').then(({ logout }) => logout());
    }
  };

  const initial = (appUser?.name?.[0] || user.email?.[0] || 'U').toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
       <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-subtle">
        <section>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Identity Terminal</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px] mt-2 group cursor-default">
            Autonomous profile node for {appUser?.name || 'Authorized Student'}
          </p>
        </section>
      </header>

      {/* PROFILE CARD */}
      <div className="card-shell !rounded-[32px] overflow-hidden bg-white shadow-2xl relative group">
        {/* Banner Area */}
        <div className="h-[140px] bg-charcoal relative overflow-hidden">
           {/* Abstract Pattern */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--accent-primary) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
           <div className="absolute -right-16 -top-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity" />
           
           <button className="absolute bottom-4 right-6 h-10 px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95">
              <HiOutlineArrowUpTray className="w-4 h-4" />
              Update Mesh
           </button>
        </div>

        {/* Avatar Area */}
        <div className="relative -mt-12 ml-8 w-fit">
           <div className="w-[104px] h-[104px] rounded-[32px] bg-white p-1.5 shadow-2xl relative group/avatar">
              <div className="w-full h-full rounded-[26px] bg-accent flex items-center justify-center text-3xl font-black text-charcoal border-4 border-charcoal transition-transform duration-500 group-hover/avatar:rotate-3">
                 {initial}
              </div>
              <div className="absolute -right-2 bottom-0 w-8 h-8 rounded-xl bg-charcoal text-accent flex items-center justify-center shadow-lg border-2 border-white">
                 <HiOutlineFingerPrint className="w-4 h-4" />
              </div>
           </div>
        </div>

        {/* Info & Stats Integration */}
        <div className="p-8 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
           <section>
              <h2 className="text-2xl font-black text-charcoal tracking-tight group-hover:text-black transition-colors">
                {appUser?.name || 'Entity Anonymous'}
              </h2>
              <p className="text-[14px] font-bold text-text-muted mt-1 uppercase tracking-wide">
                {appUser?.department || 'Unassigned Dept.'} · YEAR {appUser?.year || 'X'}
              </p>
              <p className="text-[12px] font-medium text-text-secondary mt-1 max-w-xs leading-relaxed opacity-70">
                {user.email || 'node.communication@sagi.ac.in'}
              </p>
           </section>

           <section className="bg-bg-card-secondary/50 rounded-2xl p-4 border border-border-subtle grid grid-cols-3 gap-4">
              <div className="text-center">
                 <p className="text-lg font-black text-charcoal tracking-tighter">{appUser?.courses?.length || '--'}</p>
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none mt-1">Nodes</p>
              </div>
              <div className="text-center border-x border-border-subtle">
                 <p className="text-lg font-black text-charcoal tracking-tighter">8.5</p>
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none mt-1">Rating</p>
              </div>
              <div className="text-center">
                 <p className="text-lg font-black text-charcoal tracking-tighter">92%</p>
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none mt-1">Sync</p>
              </div>
           </section>
        </div>
      </div>

      {/* SETTINGS MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Module: Perception */}
        <div className="card-shell p-6 bg-white flex items-center justify-between border-dashed hover:border-charcoal transition-colors group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-soft-blue flex items-center justify-center text-charcoal border border-blue-100 group-hover:shadow-md transition-all">
              <HiOutlinePaintBrush className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-charcoal">Visual Perspective</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Interface Skin</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Module: Communication */}
        <button 
          onClick={() => router.push('/notifications')}
          className="card-shell p-6 bg-white flex items-center justify-between border-dashed hover:border-charcoal transition-colors group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-soft-green flex items-center justify-center text-charcoal border border-emerald-100 group-hover:shadow-md transition-all">
              <HiOutlineBell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-charcoal">Signal Frequency</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Alert Protocols</p>
            </div>
          </div>
          <HiOutlineChevronRight className="w-5 h-5 text-text-muted group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
        </button>

        {/* Module: Security */}
        <button className="card-shell p-6 bg-white flex items-center justify-between border-dashed hover:border-charcoal transition-colors group text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-soft-yellow flex items-center justify-center text-charcoal border border-amber-100 group-hover:shadow-md transition-all">
               <HiOutlineShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-charcoal">Terminal Integrity</p>
              <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Access Nodes</p>
            </div>
          </div>
          <HiOutlineChevronRight className="w-5 h-5 text-text-muted group-hover:text-charcoal group-hover:translate-x-1 transition-all" />
        </button>

        {/* Module: Termination */}
        <button 
          onClick={handleLogout}
          className="card-shell p-6 bg-soft-red/10 flex items-center justify-between border-red-100 group text-left transition-all hover:bg-soft-red/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-soft-red flex items-center justify-center text-danger border border-red-200 group-hover:shadow-md transition-all">
               <HiOutlineArrowRightOnRectangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-danger">Terminal Logout</p>
              <p className="text-[11px] font-bold text-danger/60 uppercase tracking-widest">Terminate Session</p>
            </div>
          </div>
          <HiOutlineChevronRight className="w-5 h-5 text-danger opacity-40 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* FOOTER METRICS */}
      <footer className="pt-8 border-t border-border-subtle border-dashed flex justify-between items-center opacity-40">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Build 2.4.9-A // Stability Verified</p>
         <button className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-charcoal transition-colors cursor-help">
            Technical Documentation
         </button>
      </footer>

    </div>
  );
}
