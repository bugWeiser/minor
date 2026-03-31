'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineClipboardDocumentCheck, HiOutlineClock, HiOutlineChevronRight } from 'react-icons/hi2';

export default function AssignmentsWidget() {
  const { assignments, loading } = useDashboardData();
  
  // Sort by closest due date
  const pending = assignments
    .filter(a => !a.isCompleted)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 5);

  return (
    <div className="card-shell p-6 bg-white flex flex-col group h-full transition-all duration-700 animate-fadeUp">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-accent rounded-full shadow-lg shadow-accent/20" />
          <h3 className="text-xl font-black text-charcoal tracking-tight">Active Deliverables</h3>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-soft-red text-danger px-2.5 py-1 rounded-lg border border-red-100 shadow-sm uppercase tracking-widest">
              {pending.length} Pendency
            </span>
            <Link href="/assignments" className="w-8 h-8 rounded-lg bg-bg-card-secondary flex items-center justify-center text-text-muted hover:bg-charcoal hover:text-white transition-all group/link">
              <HiOutlineArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
        </div>
      </header>
      
      <div className="space-y-3 flex-1">
        {pending.length === 0 ? (
          <div className="py-24 text-center opacity-30 border border-border-subtle border-dashed rounded-3xl">
            <HiOutlineClipboardDocumentCheck className="w-12 h-12 mx-auto mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Protocol Sequence Clear</p>
          </div>
        ) : (
          pending.map(assignment => (
            <Link 
                key={assignment.id} 
                href="/assignments"
                className="group/item flex items-center gap-4 p-4 rounded-2xl bg-bg-card-secondary/50 border border-border-subtle hover:bg-white hover:border-charcoal hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0 group-hover/item:bg-charcoal group-hover/item:text-white transition-all">
                <HiOutlineClipboardDocumentCheck className="w-6 h-6 opacity-60 group-hover/item:opacity-100" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-text-muted opacity-60 truncate">
                      {assignment.course} Node
                  </span>
                  <div className="flex items-center text-[10px] font-black text-danger uppercase tracking-[0.1em] opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <HiOutlineClock className="w-3.5 h-3.5 mr-1" />
                    {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}
                  </div>
                </div>
                <h4 className="text-[15px] font-black text-charcoal truncate tracking-tight group-hover/item:text-black">
                  {assignment.title}
                </h4>
              </div>

              <HiOutlineChevronRight className="w-5 h-5 text-text-muted opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
            </Link>
          ))
        )}
      </div>

      <footer className="mt-8 pt-4 border-t border-border-subtle border-dashed flex justify-between items-center">
         <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">Queue Status: Alice-BBA-IV</p>
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${pending.length > 3 ? 'bg-soft-red pulse-red' : 'bg-soft-green soft-pulse'}`} />
            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Pipeline Health</p>
         </div>
      </footer>
    </div>
  );
}
