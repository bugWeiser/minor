'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/lib/types';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SEED_EVENTS } from '@/lib/seedData';

export function useEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        // Restore Date types
        const formatted = data.map((e: any) => ({
          ...e,
          date: new Date(e.date),
          endDate: e.endDate ? new Date(e.endDate) : null,
        }));
        setEvents(formatted);
      } catch (error) {
        console.error("Events API Error:", error);
        setEvents(SEED_EVENTS.map((s, i) => ({ ...s, id: `seed-event-${i}` } as CalendarEvent)));
      } finally {
        setLoading(false);
      }
    };

    syncEvents();
    const interval = setInterval(syncEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    events,
    loading,
  };
}
