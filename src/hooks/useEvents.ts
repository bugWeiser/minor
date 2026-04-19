'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/lib/types';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SEED_EVENTS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import { isContentRelevantToProfile } from '@/lib/targetingEngine';
import { useInstitution } from '@/context/InstitutionContext';

export function useEvents() {
  const { normalizedProfile } = useAuth();
  const { activeOrgId, loading: configLoading } = useInstitution();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (configLoading) return;
    const syncEvents = async () => {
      try {
        const res = await fetch(`/api/events?orgId=${activeOrgId || 'org-1'}`, {
          headers: {
            'x-user-org-id': normalizedProfile?.organizationId || '',
            'x-user-role': normalizedProfile?.role || 'none'
          }
        });
        if (!res.ok) throw new Error('Events API Error');
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
        setEvents(SEED_EVENTS.map((s, i) => ({ ...s, id: `seed-event-${i}`, organizationId: 'org-1' } as CalendarEvent)));
      } finally {
        setLoading(false);
      }
    };

    syncEvents();
    const interval = setInterval(syncEvents, 2000);
    return () => clearInterval(interval);
  }, [activeOrgId, normalizedProfile]);

  return {
    allEvents: events.map(e => ({ 
      ...e, 
      publishState: e.publishState || 'published',
      updatedAt: e.updatedAt || e.date 
    })),
    filteredEvents: events.filter(e => 
      isContentRelevantToProfile(e.tags, normalizedProfile) &&
      e.publishState !== 'draft'
    ),
    loading,
  };
}
