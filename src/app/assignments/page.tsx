'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useAssignments } from '@/hooks/useAssignments';
import { useAuth } from '@/context/AuthContext';
import { Assignment } from '@/lib/types';
import AssignmentCard from '@/components/assignments/AssignmentCard';
import SectionHeader from '@/components/ui/SectionHeader';
import FilterChips from '@/components/ui/FilterChips';
import { ListItemSkeleton } from '@/components/ui/LoadingSkeleton';
import { HiOutlineClipboardDocumentList, HiOutlineClock, HiOutlineChevronRight, HiOutlineChartBar, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

type FilterTab = 'All' | 'Pending' | 'Completed' | 'Overdue';

function getDaysLeft(dueDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function AssignmentsPage() {
  const { filteredAssignments, loading, completedIds, toggleComplete } = useAssignments();
  const { normalizedProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this academic task from the repository?')) return;
    try {
      const res = await fetch(`/api/assignments?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Deletion protocol failed");
    } catch (error) {
      console.error('Failed to delete assignment:', error);
      alert('Transmission Error: Deployment could not be finalized.');
    }
  };

  const overdue = useMemo(() =>
    filteredAssignments.filter((a: Assignment) => !completedIds.includes(a.id) && getDaysLeft(a.dueDate) < 0),
    [filteredAssignments, completedIds]
  );

  const pending = useMemo(() =>
    filteredAssignments.filter((a: Assignment) => !completedIds.includes(a.id) && getDaysLeft(a.dueDate) >= 0),
    [filteredAssignments, completedIds]
  );

  const completed = useMemo(() =>
    filteredAssignments.filter((a: Assignment) => completedIds.includes(a.id)),
    [filteredAssignments, completedIds]
  );

  const TABS: { label: FilterTab; icon: any }[] = [
    { label: 'All', icon: HiOutlineClipboardDocumentList },
    { label: 'Pending', icon: HiOutlineClock },
    { label: 'Overdue', icon: HiOutlineExclamationCircle },
    { label: 'Completed', icon: HiOutlineCheckCircle },
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return filteredAssignments;
    if (activeTab === 'Pending') return pending;
    if (activeTab === 'Overdue') return overdue;
    if (activeTab === 'Completed') return completed;
    return filteredAssignments;
  }, [activeTab, filteredAssignments, pending, overdue, completed]);

  const completionRate = filteredAssignments.length > 0 ? Math.round((completed.length / filteredAssignments.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <SectionHeader
        title="Curricula Tasks"
        subtitle={
          loading ? 'Analyzing schedules...' : `${pending.length} pending academic assignments requiring attention${normalizedProfile?.department ? ` · ${normalizedProfile.department} Core Department` : ''}`
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CARDS LIST (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Segmented Controls / Chips */}
          <FilterChips
            items={TABS.map(tab => ({ label: tab.label, value: tab.label, icon: tab.icon }))}
            activeValue={activeTab}
            onChange={(val) => setActiveTab(val as FilterTab)}
            activeStyle="charcoal"
            shape="rounded"
          />

          <div className="space-y-4">
             {loading ? (
               <div className="space-y-3">
                 {Array.from({ length: 4 }).map((_, i) => <ListItemSkeleton key={i} />)}
               </div>
             ) : filteredItems.length === 0 ? (
               <div className="card-shell py-24 flex flex-col items-center justify-center text-center opacity-40">
                  <HiOutlineClipboardDocumentList className="w-12 h-12 text-text-muted mb-4" />
                  <p className="text-xl font-bold text-charcoal tracking-tight">No active items for this filter</p>
                  <p className="text-[13px] text-text-muted font-medium mt-1">Excellent job! You are up to date with your academic responsibilities.</p>
               </div>
             ) : (
               <div className="space-y-3">
                  {filteredItems.map((a, i) => (
                    <AssignmentCard
                      key={a.id}
                      assignment={a}
                      isCompleted={completedIds.includes(a.id)}
                      onToggleComplete={toggleComplete}
                      onDelete={normalizedProfile?.role === 'admin' ? handleDelete : undefined}
                      index={i}
                    />
                  ))}
               </div>
             )}
          </div>
        </div>

        {/* SUMMARY SIDEBAR (1/3) */}
        <div className="lg:col-span-1 space-y-6">
           {/* Productivity Summary */}
           <section className="card-shell p-6 bg-gradient-to-br from-white to-bg-card-secondary transition-all">
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary tracking-tight">Summary Details</h2>
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-charcoal shadow-sm">
                   <HiOutlineChartBar className="w-5 h-5" />
                </div>
              </header>

              <div className="space-y-4">
                 {[
                   { label: 'Cumulative Volume', val: filteredAssignments.length, color: 'text-text-primary' },
                   { label: 'Unfinished Cycles', val: pending.length, color: 'text-warning' },
                   { label: 'Critical Overdue', val: overdue.length, color: 'text-danger' },
                   { label: 'Completed Credits', val: completed.length, color: 'text-charcoal' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-border-subtle last:border-0 border-dashed">
                      <span className="text-[12px] font-bold text-text-muted uppercase tracking-[0.1em]">{stat.label}</span>
                      <span className={`text-[15px] font-black ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
              </div>

              {/* Progress Tracker Widget */}
              <div className="mt-8 p-5 bg-charcoal rounded-2xl shadow-xl shadow-charcoal/20 flex items-center justify-between group overflow-hidden relative">
                 {/* Decorative Accent */}
                 <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-all" />
                 
                 <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 mb-1">Total Completion</p>
                    <p className="text-3xl font-black text-white leading-none tracking-tighter">{completionRate}%</p>
                    <p className="text-[11px] font-bold text-accent mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                       Maintain velocity <HiOutlineChevronRight className="w-3 h-3" />
                    </p>
                 </div>

                 <div className="relative w-16 h-16 shrink-0 flex items-center justify-center ml-4">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="32" cy="32" r="26" fill="transparent" stroke="white" strokeWidth="6" className="opacity-10" />
                       <circle 
                         cx="32" cy="32" r="26" 
                         fill="transparent" 
                         stroke="var(--accent-primary)" 
                         strokeWidth="6" 
                         strokeLinecap="round"
                         strokeDasharray={2 * Math.PI * 26}
                         strokeDashoffset={2 * Math.PI * 26 * (1 - completionRate / 100)}
                         className="transition-all duration-1000"
                       />
                    </svg>
                    <HiOutlineCheckCircle className="absolute w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
              </div>
           </section>

           {/* Closest Academic Milestone */}
           {pending.length > 0 && (
             <section className="card-shell p-6 transition-all hover:bg-soft-red/10 border-red-100/50">
                <header className="flex items-center gap-3 mb-6">
                   <div className="w-1.5 h-10 bg-danger rounded-full shadow-lg shadow-danger/20" />
                   <div>
                     <h2 className="text-lg font-bold text-text-primary tracking-tight">Active Milestone</h2>
                     <p className="text-[10px] font-bold text-danger uppercase tracking-[0.15em] shrink-0 soft-pulse">Closest Deadline</p>
                   </div>
                </header>

                <div className="flex flex-col gap-2">
                   <p className="text-[12px] font-bold text-text-muted uppercase tracking-wider">{pending[0].course}</p>
                   <h3 className="text-[16px] font-bold text-charcoal line-clamp-2 leading-[1.3]">{pending[0].title}</h3>
                   
                   <div className="mt-5 flex items-end justify-between">
                      <section>
                         <p className="text-4xl font-black text-danger tracking-tighter leading-none">{getDaysLeft(pending[0].dueDate)}</p>
                         <p className="text-[11px] font-bold text-text-muted uppercase mt-1">Days Remaining</p>
                      </section>
                      <Link href={`/courses`} className="w-12 h-12 rounded-2xl bg-bg-card-secondary border border-border-subtle flex items-center justify-center text-text-muted hover:bg-charcoal hover:text-white hover:shadow-lg transition-all group">
                         <HiOutlineChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                   </div>
                </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
}
