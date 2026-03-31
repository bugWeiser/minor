'use client';

import { useState, useMemo } from 'react';
import { useNotices } from '@/hooks/useNotices';
import { useAuth } from '@/context/AuthContext';
import { filterByUserTags } from '@/lib/filterUtils';
import { CATEGORIES } from '@/lib/constants';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import NoticeCard from '@/components/NoticeCard';
import PinnedSection from '@/components/PinnedSection';
import EmptyState from '@/components/EmptyState';
import { NoticeListSkeleton } from '@/components/ui/LoadingSkeleton';
import { Category } from '@/lib/types';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlineBell, HiOutlineArrowPath } from 'react-icons/hi2';

export default function NoticesPage() {
  const { notices, loading } = useNotices();
  const { appUser } = useAuth();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Tag-filtered active notices
  const userFilteredNotices = useMemo(() => {
    const active = notices.filter(n => {
      const now = new Date();
      return n.expiryDate > now;
    });
    return filterByUserTags(active, appUser?.tags ?? [], appUser?.isAdmin);
  }, [notices, appUser]);

  // Pinned notices (max 3, unaffected by filters)
  const pinnedNotices = useMemo(() =>
    userFilteredNotices.filter(n => n.isPinned).slice(0, 3),
    [userFilteredNotices]
  );

  // Feed notices (not pinned, searchable, filterable)
  const feedNotices = useMemo(() => {
    let result = userFilteredNotices.filter(n => !n.isPinned);

    if (selectedCategory !== 'All') {
      result = result.filter(n => n.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.postedBy.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
  }, [userFilteredNotices, selectedCategory, search]);

  const totalCount = userFilteredNotices.filter(n => !n.isPinned).length;

  return (
    <div className="space-y-8 animate-fadeUp">
      
      {/* PAGE HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-subtle">
        <section>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Institutional Board</h1>
          <p className="text-text-muted font-bold uppercase tracking-[0.12em] text-[11px] mt-2 group cursor-default">
            {loading ? 'Consulting repositories...' : `${totalCount} active notices available for access`}
            {appUser && ` · Filtered by ${appUser.department || 'Universal Tags'}`}
          </p>
        </section>
        
        <div className="flex items-center gap-2">
           <button onClick={() => setSelectedCategory('All')} className="h-10 px-4 bg-white border border-border-subtle rounded-xl text-xs font-bold text-text-primary hover:border-border-strong hover:bg-bg-hover transition-all flex items-center gap-2">
              <HiOutlineArrowPath className="w-4 h-4 text-text-muted" /> Reset Filters
           </button>
        </div>
      </header>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col gap-6 bg-white border border-border-subtle p-6 rounded-[22px] shadow-sm transition-all focus-within:shadow-md focus-within:border-border-strong">
        <div className="relative group">
           <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-charcoal transition-colors" />
           <input
             type="text"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search for notices, faculty, or announcements..."
             className="w-full h-[52px] pl-12 pr-4 bg-bg-card-secondary border border-border-subtle rounded-xl text-[14px] text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-md focus:border-border-strong outline-none transition-all"
           />
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle pt-6">
           {['All', ...CATEGORIES].map((cat) => (
             <button
               key={cat}
               onClick={() => setSelectedCategory(cat as any)}
               className={`
                 h-[42px] px-5 rounded-full text-[13px] font-bold transition-all border
                 ${selectedCategory === cat
                   ? 'bg-accent text-charcoal border-accent shadow-md shadow-accent/20'
                   : 'bg-white text-text-muted border-border-subtle hover:bg-bg-hover hover:text-text-primary hover:border-border-strong'
                 }
               `}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {loading ? (
        <NoticeListSkeleton count={5} />
      ) : (
        <div className="space-y-12">
          {/* PINNED SECTION */}
          {pinnedNotices.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                 <HiOutlineBell className="w-[18px] h-[18px] text-warning soft-pulse" />
                 <h2 className="text-xl font-bold text-text-primary">Pinned for Reference</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {pinnedNotices.map((notice, i) => (
                  <NoticeCard key={notice.id} notice={notice} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* MAIN FEED */}
          <section className="space-y-5">
            <header className="flex items-center justify-between px-2">
              <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-2">
                <HiOutlineFunnel className="w-3.5 h-3.5" />
                {selectedCategory === 'All' ? 'All active faculty notices' : `Announcements for ${selectedCategory}`}
              </h2>
              <span className="text-[11px] font-bold text-text-muted bg-bg-card-secondary px-3 py-1 rounded-md border border-border-subtle">
                 {feedNotices.length} result(s)
              </span>
            </header>

            {feedNotices.length === 0 ? (
              <EmptyState
                icon="📭"
                message="No matching announcements"
                sub={search ? `No notices match your criteria for "${search}"` : 'Please adjust your category filter or search keywords'}
                action={search ? <button onClick={() => setSearch('')} className="px-6 py-3 bg-charcoal text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95">Clear search parameters</button> : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {feedNotices.map((notice, i) => (
                  <NoticeCard key={notice.id} notice={notice} index={i} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
