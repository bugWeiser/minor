'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/lib/types';
import { db } from '@/lib/mockDB';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';

export function useAdminEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();

  const fetchEvents = useCallback(() => {
    const allEvents = db.getEvents();
    // Sort by updatedAt descending
    setEvents([...allEvents].sort((a, b) => {
      const dateA = a.updatedAt || a.date || new Date(0);
      const dateB = b.updatedAt || b.date || new Date(0);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchEvents]);

  const createEvent = async (data: Partial<CalendarEvent>) => {
    const newEvent = db.addEvent({
      ...data,
      updatedBy: normalizedProfile?.fullName || 'Admin User'
    } as Omit<CalendarEvent, 'id'>);
    fetchEvents();
    return newEvent;
  };

  const updateEvent = async (id: string, data: Partial<CalendarEvent>) => {
    db.updateEvent(id, {
      ...data,
      updatedBy: normalizedProfile?.fullName || 'Admin User'
    });
    fetchEvents();
  };

  const deleteEvent = async (id: string) => {
    db.deleteEvent(id);
    fetchEvents();
  };

  const togglePublishStatus = async (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      const newState = event.publishState === 'published' ? 'draft' : 'published';
      db.updateEvent(id, { publishState: newState });
      fetchEvents();
    }
  };

  return {
    events,
    loading,
    createEvent,
    updateEvent,
    deleteEvent,
    togglePublishStatus,
    refresh: fetchEvents,
  };
}
