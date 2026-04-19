'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/lib/types';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useInstitution } from '@/context/InstitutionContext';

export function useAdminEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();
  const { activeOrgId, loading: configLoading } = useInstitution();

  const fetchEvents = useCallback(async () => {
    if (!activeOrgId) return;
    try {
      const res = await fetch(`/api/events?orgId=${activeOrgId}`, {
        headers: {
          'x-user-org-id': normalizedProfile?.organizationId || '',
          'x-user-role': normalizedProfile?.role || 'none'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const allEvents = data.map((n: any) => ({
          ...n,
          date: new Date(n.date),
          endDate: n.endDate ? new Date(n.endDate) : undefined,
          createdAt: new Date(n.createdAt),
          updatedAt: new Date(n.updatedAt)
        })).sort((a: CalendarEvent, b: CalendarEvent) => {
          const dateA = a.updatedAt || a.date || new Date(0);
          const dateB = b.updatedAt || b.date || new Date(0);
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        setEvents(allEvents);
      }
    } catch (e) {
      console.warn("Failed to fetch admin events", e);
    } finally {
      setLoading(false);
    }
  }, [activeOrgId, normalizedProfile]);

  useEffect(() => {
    if (configLoading) return;
    fetchEvents();
    const interval = setInterval(fetchEvents, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchEvents]);

  const createEvent = async (data: Partial<CalendarEvent>) => {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      },
      body: JSON.stringify({
        ...data,
        organizationId: activeOrgId,
        createdBy: normalizedProfile?.fullName || 'Admin User'
      })
    });
    if (res.ok) fetchEvents();
    return res.ok;
  };

  const updateEvent = async (id: string, data: Partial<CalendarEvent>) => {
    const res = await fetch(`/api/events?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      },
      body: JSON.stringify({
        ...data,
        updatedBy: normalizedProfile?.fullName || 'Admin User'
      })
    });
    if (res.ok) fetchEvents();
    return res.ok;
  };

  const deleteEvent = async (id: string) => {
    const res = await fetch(`/api/events?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      }
    });
    if (res.ok) fetchEvents();
    return res.ok;
  };

  const togglePublishStatus = async (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      const newState = event.publishState === 'published' ? 'draft' : 'published';
      return updateEvent(id, { publishState: newState });
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
