'use client';
import { Notice } from '@/lib/types';
import { CATEGORY_ICONS } from '@/lib/constants';
import { format } from 'date-fns';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineBookmark, HiOutlineBookmarkSlash, HiOutlineCalendarDays } from 'react-icons/hi2';

interface Props {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
}

const THEMES: Record<string, string> = {
  Academic: 'bg-soft-blue text-charcoal border-blue-100',
  Placement: 'bg-soft-green text-charcoal border-emerald-100',
  Events: 'bg-soft-yellow text-charcoal border-amber-100',
  Urgent: 'bg-soft-red text-charcoal border-red-100',
  General: 'bg-bg-card-secondary text-text-muted border-border-subtle',
};

export default function NoticeList({ notices, onEdit, onDelete, onTogglePin }: Props) {
  return (
    <div className="space-y-3">
      {notices.map((n) => {
        const Icon = CATEGORY_ICONS[n.category] || HiOutlineCalendarDays;
        const themeClass = THEMES[n.category] || THEMES.General;
        
        return (
          <div 
            key={n.id} 
            className="flex items-center justify-between gap-4 p-4 bg-white border border-border-subtle rounded-2xl hover:border-charcoal/20 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border flex items-center gap-1.5 shadow-sm ${themeClass}`}>
                   <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                   {n.category}
                </span>
                {n.isPinned && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-warning bg-soft-yellow px-2 py-0.5 rounded-md border border-amber-200">
                      Pinned
                    </span>
                )}
                <span className="text-[10px] font-bold text-text-muted opacity-60 uppercase tracking-widest ml-1">
                  {format(n.postedAt, 'MMM d, yyyy')}
                </span>
              </div>
              <h4 className="text-[15px] font-black text-charcoal truncate tracking-tight group-hover:text-black">
                {n.title}
              </h4>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onTogglePin(n.id, !n.isPinned)} 
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${n.isPinned ? 'bg-soft-yellow text-charcoal border-amber-200 shadow-md' : 'bg-bg-card-secondary text-text-muted border-border-subtle hover:bg-white hover:border-charcoal'}`}
                title={n.isPinned ? 'Unpin Matrix' : 'Anchor to Top'}
              >
                {n.isPinned ? <HiOutlineBookmarkSlash className="w-4 h-4" /> : <HiOutlineBookmark className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={() => onEdit(n)} 
                className="w-9 h-9 rounded-xl bg-bg-card-secondary text-text-muted border border-border-subtle flex items-center justify-center transition-all hover:bg-white hover:border-charcoal hover:text-charcoal shadow-sm hover:shadow-md"
                title="Edit Protocol"
              >
                <HiOutlinePencilSquare className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => { if (confirm('Purge this notice from the institutional grid?')) onDelete(n.id); }} 
                className="w-9 h-9 rounded-xl bg-soft-red/10 text-danger border border-red-100 flex items-center justify-center transition-all hover:bg-soft-red hover:text-white hover:border-danger shadow-sm hover:shadow-lg shadow-danger/20"
                title="Delete Entry"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
