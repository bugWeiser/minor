'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotices } from './useNotices';
import { useEvents } from './useEvents';
import { useAssignments } from './useAssignments';

export function useDashboardData() {
  const { appUser } = useAuth();
  const { 
    activeNotices, 
    pinnedNotices, 
    loading: noticesLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredNotices: rawFilteredNotices,
  } = useNotices();
  const { events, loading: eventsLoading } = useEvents();
  const { assignments, loading: assignmentsLoading } = useAssignments();

  // Helper function to check if an item is relevant to the user
  const isRelevant = (itemTags: string[] | undefined) => {
    if (!itemTags || itemTags.length === 0) return true; // Default to public
    if (appUser?.isAdmin) return true; // Admin sees everything
    
    // User sees if it's tagged 'ALL' or matches one of user's tags
    const targetTags = new Set(itemTags.map(t => t.toUpperCase()));
    if (targetTags.has('ALL')) return true;

    if (!appUser?.tags) return false;

    return appUser.tags.some(t => targetTags.has(t.toUpperCase()));
  };

  // Filter Notices
  const filteredNotices = useMemo(() => {
    // If not admin, strictly check tags
    return rawFilteredNotices.filter(notice => isRelevant(notice.tags));
  }, [rawFilteredNotices, appUser]);

  const filteredPinnedNotices = useMemo(() => {
    return pinnedNotices.filter(notice => isRelevant(notice.tags));
  }, [pinnedNotices, appUser]);

  // Filter Events
  const filteredEvents = useMemo(() => {
    return events.filter(event => isRelevant(event.tags));
  }, [events, appUser]);

  // Filter Assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => isRelevant(assignment.tags));
  }, [assignments, appUser]);

  const loading = noticesLoading || eventsLoading || assignmentsLoading;

  return {
    rawNoticesCount: rawFilteredNotices.length, // Unfiltered count mapped by category
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
