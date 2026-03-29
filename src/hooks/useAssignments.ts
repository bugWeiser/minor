'use client';

import { useState, useEffect } from 'react';
import { Assignment } from '@/lib/types';
import { SEED_ASSIGNMENTS } from '@/lib/seedData';

function getSeededAssignments(): Assignment[] {
  return SEED_ASSIGNMENTS.map((evt, index) => ({
    ...evt,
    id: `assignment-${index + 1}`,
  }));
}

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For MVP/offline demo, use seed data directly
    setAssignments(getSeededAssignments());
    setLoading(false);
  }, []);

  return {
    assignments,
    loading,
  };
}
