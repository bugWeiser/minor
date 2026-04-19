'use client';

import { useState, useEffect, useCallback } from 'react';
import { Assignment } from '@/lib/types';
import { db } from '@/lib/mockDB';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useInstitution } from '@/context/InstitutionContext';

export function useAdminAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();
  const { activeOrgId, loading: configLoading } = useInstitution();

  const fetchAssignments = useCallback(() => {
    const allAssignments = db.getAssignments(activeOrgId);
    // Sort by updatedAt descending
    setAssignments([...allAssignments].sort((a, b) => {
      const dateA = a.updatedAt || a.postedAt || new Date(0);
      const dateB = b.updatedAt || b.postedAt || new Date(0);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    }));
    setLoading(false);
  }, [activeOrgId]);

  useEffect(() => {
    if (configLoading) return;
    fetchAssignments();
    const interval = setInterval(fetchAssignments, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAssignments]);

  const createAssignment = async (data: Partial<Assignment>) => {
    const newAssignment = db.addAssignment({
      ...data,
      organizationId: activeOrgId,
      updatedBy: normalizedProfile?.id,
    } as Omit<Assignment, 'id' | 'postedAt' | 'createdAt' | 'updatedAt'>);
    fetchAssignments();
    return newAssignment;
  };

  const updateAssignment = async (id: string, data: Partial<Assignment>) => {
    db.updateAssignment(id, data);
    fetchAssignments();
  };

  const deleteAssignment = async (id: string) => {
    db.deleteAssignment(id);
    fetchAssignments();
  };

  const togglePublishStatus = async (id: string) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      const newState = assignment.publishState === 'published' ? 'draft' : 'published';
      db.updateAssignment(id, { publishState: newState });
      fetchAssignments();
    }
  };

  return {
    assignments,
    loading,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    togglePublishStatus,
    refresh: fetchAssignments,
  };
}
