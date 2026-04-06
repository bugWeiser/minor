'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDashboardData } from '@/hooks/useDashboardData';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineMegaphone, 
  HiOutlineCalendarDays, 
  HiOutlineClipboardDocumentList,
  HiOutlineChevronRight,
  HiOutlineXMark
} from 'react-icons/hi2';

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const { notices, events, assignments } = useDashboardData();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeItem = document.querySelector('[data-selected="true"]') as HTMLElement;
        if (activeItem) activeItem.click();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
       if (isOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
          setIsOpen(false);
       }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { notices: [], events: [], assignments: [] };
    const q = query.toLowerCase();

    return {
      notices: notices.filter(n => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)).slice(0, 3),
      events: events.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)).slice(0, 3),
      assignments: assignments.filter(a => a.title.toLowerCase().includes(q) || a.course.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [query, notices, events, assignments]);

  const hasResults = results.notices.length > 0 || results.events.length > 0 || results.assignments.length > 0;
  const totalResults = results.notices.length + results.events.length + results.assignments.length;

  useEffect(() => {
    if (selectedIndex >= totalResults) {
      setSelectedIndex(Math.max(-1, totalResults - 1));
    }
  }, [totalResults, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  const navigateTo = (path: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  return (
    <>
      <div 
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="hidden md:flex items-center gap-3 bg-bg-card-secondary border border-border-subtle rounded-2xl px-5 h-[52px] w-[360px] lg:w-[480px] text-[13px] text-text-secondary cursor-text hover:border-border-strong hover:bg-white hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500 group"
      >
        <HiOutlineMagnifyingGlass className="w-[20px] h-[20px] text-text-muted group-hover:text-charcoal transition-colors" />
        <span className="text-text-muted font-bold tracking-tight inline-flex items-center justify-between flex-1">
          <span>Search notices, schedules, or tasks...</span>
          <span className="text-[10px] bg-white border border-border-subtle px-1.5 py-0.5 rounded text-text-muted hidden lg:inline-block shadow-sm">⌘K</span>
        </span>
      </div>

      <button 
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-border-subtle text-text-secondary hover:bg-bg-hover hover:border-border-strong transition-all shadow-sm"
        aria-label="Open Search"
        title="Open Search"
      >
        <HiOutlineMagnifyingGlass className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] md:pt-[12vh] bg-charcoal/40 backdrop-blur-sm p-4 sm:p-6 animate-fadeUp duration-200">
          <div 
             ref={modalRef}
             className="w-full max-w-[600px] bg-white rounded-t-[32px] rounded-b-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-border-subtle"
          >
             <div className="flex items-center gap-3 px-6 h-[72px] border-b border-border-subtle shrink-0">
                <HiOutlineMagnifyingGlass className="w-6 h-6 text-charcoal/50" />
                <input 
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="flex-1 bg-transparent border-none outline-none text-[16px] font-bold text-text-primary placeholder:text-text-muted placeholder:font-medium"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-bg-card-secondary text-text-muted hover:bg-bg-hover hover:text-charcoal transition-colors"
                  title="Close Search"
                  aria-label="Close Search"
                >
                  <HiOutlineXMark className="w-4 h-4" />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                {!query.trim() ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
                     <HiOutlineMagnifyingGlass className="w-12 h-12 text-text-muted mb-3" />
                     <p className="text-sm font-bold text-text-primary tracking-tight">Start typing to search</p>
                     <p className="text-xs font-medium text-text-muted mt-1 max-w-[250px]">Find announcements, upcoming exams, assignment deadlines, and more.</p>
                  </div>
                ) : !hasResults ? (
                   <div className="py-12 flex flex-col items-center justify-center text-center">
                     <p className="text-sm font-bold text-text-primary">No matching results found</p>
                     <p className="text-xs font-medium text-text-muted mt-1">Try adjusting your keywords.</p>
                   </div>
                ) : (
                  <div className="space-y-6">
                    {results.notices.length > 0 && (
                      <section>
                        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-2 px-2">Announcements</h3>
                        <div className="space-y-1">
                           {results.notices.map((notice, i) => {
                             const globalIndex = i;
                             const isSelected = selectedIndex === globalIndex;
                             return (
                               <button 
                                 key={notice.id} 
                                 data-selected={isSelected}
                                 onMouseEnter={() => setSelectedIndex(globalIndex)}
                                 onClick={() => navigateTo(`/notices/${notice.id}`)} 
                                 className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left group ${isSelected ? 'bg-bg-hover ring-1 ring-border-strong' : 'hover:bg-bg-hover'}`}
                               >
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-accent text-charcoal' : 'bg-accent/20 text-charcoal group-hover:bg-accent'}`}>
                                    <HiOutlineMegaphone className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <p className="text-[14px] font-bold text-text-primary truncate">{notice.title}</p>
                                     <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{notice.category} · {notice.postedBy}</p>
                                  </div>
                                  <HiOutlineChevronRight className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-charcoal' : 'text-text-muted opacity-0 group-hover:opacity-100'}`} />
                               </button>
                             );
                           })}
                        </div>
                      </section>
                    )}

                    {results.events.length > 0 && (
                      <section>
                        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-2 px-2">Schedule & Events</h3>
                        <div className="space-y-1">
                           {results.events.map((event, i) => {
                             const globalIndex = results.notices.length + i;
                             const isSelected = selectedIndex === globalIndex;
                             return (
                               <button 
                                 key={event.id} 
                                 data-selected={isSelected}
                                 onMouseEnter={() => setSelectedIndex(globalIndex)}
                                 onClick={() => navigateTo(`/calendar`)} 
                                 className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left group ${isSelected ? 'bg-bg-hover ring-1 ring-border-strong' : 'hover:bg-bg-hover'}`}
                               >
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-soft-blue text-charcoal' : 'bg-soft-blue/50 text-charcoal group-hover:bg-soft-blue'}`}>
                                    <HiOutlineCalendarDays className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <p className="text-[14px] font-bold text-text-primary truncate">{event.title}</p>
                                     <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{event.category}</p>
                                  </div>
                                  <HiOutlineChevronRight className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-charcoal' : 'text-text-muted opacity-0 group-hover:opacity-100'}`} />
                               </button>
                             );
                           })}
                        </div>
                      </section>
                    )}

                    {results.assignments.length > 0 && (
                      <section>
                        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mb-2 px-2">Academic Tasks</h3>
                        <div className="space-y-1">
                           {results.assignments.map((assignment, i) => {
                             const globalIndex = results.notices.length + results.events.length + i;
                             const isSelected = selectedIndex === globalIndex;
                             return (
                               <button 
                                 key={assignment.id} 
                                 data-selected={isSelected}
                                 onMouseEnter={() => setSelectedIndex(globalIndex)}
                                 onClick={() => navigateTo(`/assignments`)} 
                                 className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left group ${isSelected ? 'bg-bg-hover ring-1 ring-border-strong' : 'hover:bg-bg-hover'}`}
                               >
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-soft-red text-danger' : 'bg-soft-red/50 text-danger group-hover:bg-soft-red'}`}>
                                    <HiOutlineClipboardDocumentList className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <p className="text-[14px] font-bold text-text-primary truncate">{assignment.title}</p>
                                     <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{assignment.course}</p>
                                  </div>
                                  <HiOutlineChevronRight className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-charcoal' : 'text-text-muted opacity-0 group-hover:opacity-100'}`} />
                               </button>
                             );
                           })}
                        </div>
                      </section>
                    )}
                  </div>
                )}
             </div>

             <div className="h-10 border-t border-border-subtle bg-bg-card-secondary flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Global Index Search Active</span>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
