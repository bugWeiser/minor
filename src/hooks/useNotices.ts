'use client';

import { useState, useEffect, useMemo } from 'react';
import { Notice, Category } from '@/lib/types';
import { SEED_NOTICES } from '@/lib/seedData';
import { isExpired } from '@/lib/utils';

// Generate stable IDs for seed data
function getSeededNotices(): Notice[] {
  return SEED_NOTICES.map((notice, index) => ({
    ...notice,
    id: `seed-${index + 1}`,
  }));
}

export function useNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  useEffect(() => {
    const syncNotices = async () => {
      try {
        const res = await fetch('/api/notices');
        const data = await res.json();
        // Convert ISO strings back to Date objects
        const formatted = data.map((n: any) => ({
          ...n,
          postedAt: new Date(n.postedAt),
          expiryDate: new Date(n.expiryDate)
        }));
        setNotices(formatted);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setNotices(getSeededNotices());
      } finally {
        setLoading(false);
      }
    };

    syncNotices();
    // Poll for changes every 5 seconds for "real-time" demo feel
    const interval = setInterval(syncNotices, 5000);
    return () => clearInterval(interval);
  }, []);

  // Active notices (not expired)
  const activeNotices = useMemo(
    () => notices.filter((n) => !isExpired(n.expiryDate)),
    [notices]
  );

  // Archived notices (expired)
  const archivedNotices = useMemo(
    () => notices.filter((n) => isExpired(n.expiryDate)),
    [notices]
  );

  // Pinned notices (from active, not expired)
  const pinnedNotices = useMemo(
    () => activeNotices.filter((n) => n.isPinned).slice(0, 3),
    [activeNotices]
  );

  // Filter + search
  const filteredNotices = useMemo(() => {
    let result = activeNotices.filter((n) => !n.isPinned || selectedCategory !== 'All');

    if (selectedCategory !== 'All') {
      result = activeNotices.filter((n) => n.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
  }, [activeNotices, selectedCategory, searchQuery]);

  // Filter archived notices too
  const filteredArchivedNotices = useMemo(() => {
    let result = archivedNotices;

    if (selectedCategory !== 'All') {
      result = result.filter((n) => n.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
  }, [archivedNotices, selectedCategory, searchQuery]);

  // Add a notice locally (for demo without Firebase)
  const addNoticeLocally = (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `local-${Date.now()}`,
    };
    setNotices((prev) => [newNotice, ...prev]);
  };

  // Delete a notice locally
  const deleteNoticeLocally = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // Update a notice locally
  const updateNoticeLocally = (id: string, updates: Partial<Notice>) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  // Get a single notice by ID
  const getNoticeById = (id: string): Notice | undefined => {
    return notices.find((n) => n.id === id);
  };

  return {
    notices,
    activeNotices,
    archivedNotices,
    pinnedNotices,
    filteredNotices,
    filteredArchivedNotices,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addNoticeLocally,
    deleteNoticeLocally,
    updateNoticeLocally,
    getNoticeById,
  };
}
