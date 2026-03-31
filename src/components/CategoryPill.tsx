'use client';
import { Category } from '@/lib/types';
import { CATEGORY_ICONS } from '@/lib/constants';
import { HiOutlineQueueList } from 'react-icons/hi2';

interface Props {
  category: Category | 'All';
  active: boolean;
  onClick: () => void;
}

export default function CategoryPill({ category, active, onClick }: Props) {
  const isAll = category === 'All';
  
  const getActiveStyles = () => {
    if (active) {
        if (category === 'All') return 'bg-charcoal text-white shadow-xl shadow-charcoal/20 border-charcoal';
        if (category === 'Academic') return 'bg-soft-blue text-charcoal shadow-md border-blue-200';
        if (category === 'Placement') return 'bg-soft-green text-charcoal shadow-md border-emerald-200';
        if (category === 'Events') return 'bg-soft-yellow text-charcoal shadow-md border-amber-200';
        return 'bg-bg-card-secondary text-charcoal shadow-md border-border-strong';
    }
    return 'bg-white text-text-muted border-border-subtle hover:bg-bg-hover hover:text-text-primary hover:border-border-strong';
  };

  const Icon = isAll ? HiOutlineQueueList : CATEGORY_ICONS[category];

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2.5 h-[42px] px-6 rounded-full whitespace-nowrap 
        active:scale-[0.96] transition-all duration-300 text-[13px] font-black uppercase tracking-widest border shadow-sm
        ${getActiveStyles()}
      `}
    >
      {Icon && (
        <Icon className={`w-[18px] h-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'opacity-40 group-hover:opacity-100'}`} />
      )}
      <span className={active ? 'opacity-100' : 'opacity-80'}>{category}</span>
    </button>
  );
}
