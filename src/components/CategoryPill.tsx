'use client';
import { Category } from '@/lib/types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/constants';

interface Props {
  category: Category | 'All';
  active: boolean;
  onClick: () => void;
}

export default function CategoryPill({ category, active, onClick }: Props) {
  const isAll = category === 'All';
  
  const theme = isAll 
    ? {
        bg: '#E0E7FF', // indigo-100
        text: '#3730A3', // indigo-800
        border: '#C7D2FE', // indigo-200
        accent: '#6366F1', // indigo-500
        icon: '📋'
      }
    : CATEGORY_COLORS[category];

  const iconBase = isAll ? '📋' : CATEGORY_ICONS[category];

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-1.5 h-[36px] px-4 py-2 rounded-full whitespace-nowrap w-fit transition-all duration-200 active:scale-95 border ${
        active 
          ? 'font-semibold ring-2' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700 font-medium'
      }`}
      style={active ? { 
        backgroundColor: theme.bg, 
        color: theme.text,
        borderColor: theme.border,
        boxShadow: `0 0 0 2px ${theme.accent}33` // 20% opacity hex ring
      } : {}}
    >
      <span className={active ? 'opacity-100 text-sm' : 'opacity-70 text-sm'}>{iconBase}</span>
      <span className="text-[13px]">{category}</span>
    </button>
  );
}
