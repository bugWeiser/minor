'use client';

import { Assignment } from '@/lib/types';
import { format } from 'date-fns';
import { HiOutlineCheck, HiOutlineClock, HiOutlineBookOpen, HiOutlineChevronRight } from 'react-icons/hi2';

interface Props {
  assignment: Assignment;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  index?: number;
}

export default function AssignmentCard({ assignment, isCompleted, onToggleComplete, index = 0 }: Props) {
  const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysLeft < 0 && !isCompleted;

  return (
    <div 
      className={`
        flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group
        ${isCompleted 
          ? 'bg-bg-card-secondary border-border-subtle opacity-60' 
          : 'bg-white border-border-subtle hover:border-border-strong hover:shadow-md cursor-pointer'
        }
      `}
      onClick={() => onToggleComplete(assignment.id)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Checkbox */}
      <div 
        className={`
          w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all
          ${isCompleted 
            ? 'bg-charcoal border-charcoal text-white' 
            : 'bg-white border-text-muted/20 group-hover:border-accent group-hover:bg-accent/10'
          }
        `}
      >
        {isCompleted && <HiOutlineCheck className="w-4 h-4 stroke-[3]" />}
      </div>

      {/* Icon Area - Mobile hidden usually but here small */}
      <div className="hidden sm:flex w-10 h-10 rounded-xl bg-bg-card-secondary items-center justify-center text-text-muted shrink-0 group-hover:bg-accent group-hover:text-charcoal transition-all">
        <HiOutlineBookOpen className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-0.5">
          <h3 className={`text-[15px] font-bold truncate ${isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
            {assignment.title}
          </h3>
          <span className="hidden sm:inline text-text-muted/30">·</span>
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider truncate">
            {assignment.course || 'General Curricula'}
          </span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40 mt-3 group-hover:opacity-100 transition-opacity">
            Origin: {assignment.postedBy || 'Faculty Admin'}
        </p>
      </div>

      {/* Due Badge */}
      <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
        <div className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border
          ${isCompleted 
            ? 'bg-bg-hover text-text-muted border-border-subtle' 
            : isOverdue 
              ? 'bg-soft-red text-danger border-red-100 shadow-sm' 
              : daysLeft <= 2 
                ? 'bg-soft-yellow text-warning border-amber-100 shadow-sm' 
                : 'bg-bg-card-secondary text-text-muted border-border-subtle'
          }
        `}>
          <HiOutlineClock className={`w-3.5 h-3.5 ${!isCompleted && isOverdue ? 'soft-pulse' : ''}`} />
          {isCompleted ? 'Finished' : isOverdue ? 'Overdue' : daysLeft === 0 ? 'Due Today' : `${daysLeft}d Left`}
        </div>
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
          {format(assignment.dueDate, 'MMM d, h:mm a')}
        </p>
      </div>
    </div>
  );
}
