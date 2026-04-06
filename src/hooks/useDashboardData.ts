'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotices } from './useNotices';
import { useEvents } from './useEvents';
import { useAssignments } from './useAssignments';

export function useDashboardData() {
  const { appUser, normalizedProfile } = useAuth();
  const { 
    activeNotices, 
    pinnedNotices, 
    loading: noticesLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredNotices,
  } = useNotices();
  const { filteredEvents, loading: eventsLoading } = useEvents();
  const { filteredAssignments, loading: assignmentsLoading } = useAssignments();

  const filteredPinnedNotices = pinnedNotices;

  const loading = noticesLoading || eventsLoading || assignmentsLoading;

  return {
    rawNoticesCount: filteredNotices.length, // Unfiltered count mapped by category
    notices: filteredNotices,
    pinnedNotices: filteredPinnedNotices,
    events: filteredEvents,
    assignments: filteredAssignments,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
}
