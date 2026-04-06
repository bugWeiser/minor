'use client';

import { HiOutlineCheck, HiOutlineMegaphone } from 'react-icons/hi2';

const DEPARTMENTS = ['CSE', 'BBA', 'ECE', 'BCOM', 'IT', 'ME'];
const YEARS = [1, 2, 3, 4];

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const hasAll = selectedTags.includes('ALL');

  const toggleAll = () => {
    if (hasAll) {
      onChange([]);
    } else {
      const all = ['ALL', ...DEPARTMENTS.flatMap(d => YEARS.map(y => `${d}-${y}`))];
      onChange(all);
    }
  };

  const toggleTag = (tag: string) => {
    if (tag === 'ALL') { toggleAll(); return; }
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag && t !== 'ALL'));
    } else {
      onChange([...selectedTags.filter(t => t !== 'ALL'), tag]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Universal Toggle */}
      {hasAll ? (
        <button 
          type="button"
          onClick={toggleAll}
          aria-label="Disable Universal Broadcast"
          aria-pressed="true"
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer bg-accent/10 border-accent shadow-lg shadow-accent/10"
        >
          <div className="flex items-center gap-4 text-left">
             <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-accent text-charcoal shadow-md">
                <HiOutlineMegaphone className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[14px] font-black text-charcoal uppercase tracking-tighter">Universal Broadcast</p>
                <p className="text-[11px] font-bold text-text-muted">Targeting all registered institutional nodes.</p>
             </div>
          </div>
          <div className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all bg-charcoal border-charcoal text-white">
             <HiOutlineCheck className="w-4 h-4" />
          </div>
        </button>
      ) : (
        <button 
          type="button"
          onClick={toggleAll}
          aria-label="Enable Universal Broadcast for all departments and years"
          aria-pressed="false"
          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white border-border-subtle hover:border-border-strong group"
        >
          <div className="flex items-center gap-4 text-left">
             <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-bg-card-secondary text-text-muted group-hover:bg-accent group-hover:text-charcoal">
                <HiOutlineMegaphone className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[14px] font-black text-charcoal uppercase tracking-tighter">Universal Broadcast</p>
                <p className="text-[11px] font-bold text-text-muted">Targeting all registered institutional nodes.</p>
             </div>
          </div>
          <div className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all border-border-strong group-hover:border-charcoal" />
        </button>
      )}

      {/* Grid Interface */}
      <div className="bg-white border border-border-subtle rounded-3xl overflow-hidden shadow-sm shadow-black/5 ring-1 ring-black/5">
        {/* Header Grid */}
        <div className="grid bg-bg-card-secondary border-b border-border-subtle grid-cols-[100px_repeat(4,1fr)]">
          <div className="px-4 py-3 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] border-r border-border-subtle border-dashed">Dept Node</div>
          {YEARS.map(y => (
            <div key={y} className="px-2 py-3 text-center text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
              Cycle {y}
            </div>
          ))}
        </div>
        {/* Department Tracks */}
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept}
            className="grid border-b last:border-b-0 border-border-subtle border-dashed transition-colors hover:bg-bg-hover/30 grid-cols-[100px_repeat(4,1fr)]"
          >
            <div className="px-5 py-4 flex items-center border-r border-border-subtle border-dashed">
              <span className="text-[12px] font-black text-charcoal uppercase tracking-widest">{dept}</span>
            </div>
            {YEARS.map(year => {
              const tag = `${dept}-${year}`;
              const checked = hasAll || selectedTags.includes(tag);
              return (
                <div key={year} className="flex items-center justify-center py-4 relative">
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`
                      w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center
                      ${checked ? 'bg-charcoal border-charcoal text-accent shadow-md' : 'border-border-subtle hover:border-charcoal bg-white'}
                    `}
                    aria-label={`Toggle Sector ${tag}`}
                  >
                    {checked ? <HiOutlineCheck className="w-4 h-4" /> : <div className="w-1 h-1 rounded-full bg-border-strong" />}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary Matrix */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mr-2">Index Selected:</p>
          {selectedTags.slice(0, 10).map(tag => (
            <span key={tag} className="text-[10px] font-black text-charcoal bg-accent px-3 py-1 rounded-[6px] border border-accent/20 shadow-sm transition-all hover:-translate-y-0.5">
              {tag}
            </span>
          ))}
          {selectedTags.length > 10 && (
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest px-2">+ {selectedTags.length - 10} Additional Nodes</span>
          )}
        </div>
      )}
    </div>
  );
}
