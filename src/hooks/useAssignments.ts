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
    const q = query(collection(db, 'assignments'), orderBy('dueDate', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ...d,
          dueDate: (d.dueDate as Timestamp)?.toDate?.() || new Date(d.dueDate),
          postedAt: (d.postedAt as Timestamp)?.toDate?.() || new Date(d.postedAt),
        } as Assignment;
      });

      // If Firestore is empty, fallback to seed data for demo purposes
      if (data.length === 0) {
        setAssignments(SEED_ASSIGNMENTS.map((s, i) => ({ ...s, id: `seed-${i}` } as Assignment)));
      } else {
        setAssignments(data);
      }
      setLoading(false);
    }, (error) => {
      console.error("Assignments fetch error:", error);
      setAssignments(SEED_ASSIGNMENTS.map((s, i) => ({ ...s, id: `seed-${i}` } as Assignment)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    assignments,
    loading,
  };
}
