import { useState, useEffect, useCallback } from 'react';
import { Notice } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';
import { useInstitution } from '@/context/InstitutionContext';

export function useAdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();
  const { activeOrgId, loading: configLoading } = useInstitution();

  const fetchNotices = useCallback(async () => {
    if (!activeOrgId) return;
    try {
      const res = await fetch(`/api/notices?orgId=${activeOrgId}`, {
        headers: {
          'x-user-org-id': normalizedProfile?.organizationId || '',
          'x-user-role': normalizedProfile?.role || 'none'
        }
      });
      if (res.ok) {
        const data = await res.json();
        const allNotices = data.map((n: any) => ({
          ...n,
          postedAt: new Date(n.postedAt),
          expiryDate: new Date(n.expiryDate)
        })).sort((a: Notice, b: Notice) => {
          const dateA = a.updatedAt || a.postedAt || new Date(0);
          const dateB = b.updatedAt || b.postedAt || new Date(0);
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        setNotices(allNotices);
      }
    } catch (e) {
      console.warn("Failed to fetch admin notices", e);
    } finally {
      setLoading(false);
    }
  }, [activeOrgId, normalizedProfile]);

  useEffect(() => {
    if (configLoading) return;
    fetchNotices();
    
    // Simple polling for "real-time" updates in demo mode
    const interval = setInterval(fetchNotices, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNotices]);

  const createNotice = async (data: any) => {
    const res = await fetch('/api/notices', {
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
    if (res.ok) fetchNotices();
    return res.ok;
  };

  const updateNotice = async (id: string, updates: Partial<Notice>) => {
    const res = await fetch(`/api/notices?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      },
      body: JSON.stringify({
        ...updates,
        updatedBy: normalizedProfile?.fullName || 'Admin User'
      })
    });
    if (res.ok) fetchNotices();
    return res.ok;
  };

  const deleteNotice = async (id: string) => {
    const res = await fetch(`/api/notices?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-org-id': normalizedProfile?.organizationId || '',
        'x-user-role': normalizedProfile?.role || 'none'
      }
    });
    if (res.ok) fetchNotices();
    return res.ok;
  };

  const togglePublishStatus = async (id: string) => {
    const notice = notices.find(n => n.id === id);
    if (!notice) return;
    const newStatus = notice.publishState === 'draft' ? 'published' : 'draft';
    return updateNotice(id, { publishState: newStatus });
  };

  const togglePinStatus = async (id: string) => {
    const notice = notices.find(n => n.id === id);
    if (!notice) return;
    return updateNotice(id, { isPinned: !notice.isPinned });
  };

  return {
    notices,
    loading,
    createNotice,
    updateNotice,
    deleteNotice,
    togglePublishStatus,
    togglePinStatus,
    refresh: fetchNotices
  };
}
