'use client';
import { useDashboardData } from '@/hooks/useDashboardData';
import NoticeCard from '../NoticeCard';
import CategoryFilter from '../CategoryFilter';
import SearchBar from '../SearchBar';
import EmptyState from '../EmptyState';
import PinnedSection from '../PinnedSection';
import { HiOutlineFunnel, HiOutlineBell } from 'react-icons/hi2';

export default function NoticeWidget() {
  const { 
    notices, 
    pinnedNotices, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useDashboardData();

  if (loading) {
    return (
      <div className="card-shell p-12 h-96 flex flex-col items-center justify-center border-dashed opacity-40">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-charcoal border-t-accent mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Synchronizing Notification Grid...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full animate-fadeUp">
      {/* Search & Modulation Filters */}
      <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center bg-white border border-border-subtle p-6 rounded-[28px] shadow-sm shadow-black/5 ring-1 ring-black/5">
        <div className="flex-1 w-full">
           <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
        <div className="w-full xl:w-80 group">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Filter institutional packets..." />
        </div>
      </div>

      <PinnedSection notices={pinnedNotices} />

      <section className="space-y-6">
        <header className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-charcoal tracking-tight flex items-center gap-3">
              <HiOutlineBell className="w-[18px] h-[18px] opacity-40" />
              Latest Transmissions
            </h2>
            <div className="h-px flex-1 bg-border-subtle mx-4 border-dashed opacity-50" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] opacity-60">
                {notices.length} active nodes
            </span>
        </header>

        {notices.length === 0 ? (
          <div className="card-shell py-24 border-dashed bg-bg-card-secondary/30">
            <EmptyState 
              icon="📭"
              message="No matching transmissions found" 
              sub={searchQuery ? "Operational error: Search parameters returned null." : "Check back later for faculty announcements."} 
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {notices.map((notice, i) => (
              <NoticeCard key={notice.id} notice={notice} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
