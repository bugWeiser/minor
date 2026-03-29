'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/lib/types';
import { SEED_EVENTS } from '@/lib/seedData';

function getSeededEvents(): CalendarEvent[] {
  return SEED_EVENTS.map((evt, index) => ({
    ...evt,
    id: `event-${index + 1}`,
  }));
}

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP/offline demo, use seed data directly
    // Future: implement Firestore listener here similar to useNotices
    setEvents(getSeededEvents());
    setLoading(false);
  }, []);

  return {
    events,
    loading,
  };
}
