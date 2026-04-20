'use client';

import { useState, useEffect, useCallback } from 'react';
import { Assignment } from '@/lib/types';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useInstitution } from '@/context/InstitutionContext';

export function useAdminAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();
  const { activeOrgId, loading: configLoading } = useInstitution();

  const fetchAssignments = useCallback(async () => {
    if (!activeOrgId) return;
    try {
      const res = await fetch(`/api/assignments?orgId=${activeOrgId}`, {
        headers: {
          'x-user-org-id': normalizedProfile?.organizationId || '',
          'x-user-role': normalizedProfile?.role || 'none'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const allAssignments = data.map((n: any) => ({
          ...n,
          dueDate: new Date(n.dueDate),
          postedAt: new Date(n.postedAt),
          createdAt: new Date(n.createdAt),
          updatedAt: new Date(n.updatedAt)
        })).sort((a: Assignment, b: Assignment) => {
          const dateA = a.updatedAt || a.postedAt || new Date(0);
          const dateB = b.updatedAt || b.postedAt || new Date(0);
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        setAssignments(allAssignments);
      }
    } catch (e) {
      console.warn("Failed to fetch admin assignments", e);
    } finally {
      setLoading(false);
    }
  }, [activeOrgId, normalizedProfile]);

  useEffect(() => {
    if (configLoading) return;
    fetchAssignments();
    const interval = setInterval(fetchAssignments, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAssignments]);

  const createAssignment = async (data: Partial<Assignment>) => {
    const res = await fetch('/api/assignments', {
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
    if (res.ok) fetchAssignments();
    return res.ok;
  };

  const updateAssignment = async (id: string, data: Partial<Assignment>) => {
    const res = await fetch(`/api/assignments?id=${id}`, {
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
    if (res.ok) fetchAssignments();
    return res.ok;
  };

  const deleteAssignment = async (id: string) => {
    const res = await fetch(`/api/assignments?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      }
    });
    if (res.ok) fetchAssignments();
    return res.ok;
  };

  const togglePublishStatus = async (id: string) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      const newState = assignment.publishState === 'published' ? 'draft' : 'published';
      return updateAssignment(id, { publishState: newState });
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
