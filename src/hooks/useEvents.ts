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
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ...d,
          date: (d.date as Timestamp)?.toDate?.() || new Date(d.date),
          endDate: (d.endDate as Timestamp)?.toDate?.() || new Date(d.endDate || d.date),
        } as CalendarEvent;
      });

      // If Firestore is empty, fallback to seed data
      if (data.length === 0) {
        setEvents(SEED_EVENTS.map((s, i) => ({ ...s, id: `seed-event-${i}` } as CalendarEvent)));
      } else {
        setEvents(data);
      }
      setLoading(false);
    }, (error) => {
      console.error("Events fetch error:", error);
      setEvents(SEED_EVENTS.map((s, i) => ({ ...s, id: `seed-event-${i}` } as CalendarEvent)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    events,
    loading,
  };
}
