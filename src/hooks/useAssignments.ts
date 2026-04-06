'use client';

import { useState, useEffect } from 'react';
import { Assignment } from '@/lib/types';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SEED_ASSIGNMENTS } from '@/lib/seedData';
import { useAuth } from '@/context/AuthContext';
import { isContentRelevantToProfile } from '@/lib/targetingEngine';
import { useInstitution } from '@/context/InstitutionContext';

export function useAssignments() {
  const { normalizedProfile } = useAuth();
  const { activeOrgId } = useInstitution();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const storageKey = normalizedProfile ? `completedAssignments_${normalizedProfile.id}` : null;

  useEffect(() => {
    if (!storageKey) {
       setCompletedIds([]);
       return;
    }
    const stored = localStorage.getItem(storageKey);
    if (stored) setCompletedIds(JSON.parse(stored));
  }, [storageKey]);

  const toggleComplete = (id: string) => {
    if (!storageKey) return;
    setCompletedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const syncAssignments = async () => {
      try {
        const res = await fetch(`/api/assignments?orgId=${activeOrgId || 'org-1'}`);
        const data = await res.json();
        // Restore Date objects
        const formatted = data.map((a: any) => ({
          ...a,
          dueDate: new Date(a.dueDate),
          postedAt: new Date(a.postedAt)
        }));
        setAssignments(formatted);
      } catch (error) {
        console.error("Assignments API Error:", error);
        setAssignments(SEED_ASSIGNMENTS.map((s, i) => ({ ...s, id: `seed-${i}`, organizationId: 'org-1' } as Assignment)));
      } finally {
        setLoading(false);
      }
    };

    syncAssignments();
    const interval = setInterval(syncAssignments, 2000);
    return () => clearInterval(interval);
  }, [activeOrgId]);

  return {
    allAssignments: assignments.map(a => ({ 
      ...a, 
      publishState: a.publishState || 'published',
      updatedAt: a.updatedAt || a.postedAt 
    })),
    // Inject the real-time isCompleted flag based on local state and filter
    filteredAssignments: assignments
      .filter(a => 
        isContentRelevantToProfile(a.tags, normalizedProfile) &&
        a.publishState !== 'draft'
      )
      .map(a => ({
        ...a,
        isCompleted: a.isCompleted || completedIds.includes(a.id)
      })),
    loading,
    completedIds,
    toggleComplete,
  };
}
