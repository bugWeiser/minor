'use client';

import { useState, useEffect } from 'react';
import { Assignment } from '@/lib/types';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SEED_ASSIGNMENTS } from '@/lib/seedData';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncAssignments = async () => {
      try {
        const res = await fetch('/api/assignments');
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
        setAssignments(SEED_ASSIGNMENTS.map((s, i) => ({ ...s, id: `seed-${i}` } as Assignment)));
      } finally {
        setLoading(false);
      }
    };

    syncAssignments();
    const interval = setInterval(syncAssignments, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    assignments,
    loading,
  };
}
