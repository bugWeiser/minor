import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/mockDB';
import { Notice } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { DEMO_SYNC_POLLING_INTERVAL } from '@/lib/constants';

export function useAdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { normalizedProfile } = useAuth();

  const fetchNotices = useCallback(() => {
    // db.getNotices() returns the full array including drafts
    const allNotices = [...db.getNotices()].sort((a, b) => {
      const dateA = a.updatedAt || a.postedAt || new Date(0);
      const dateB = b.updatedAt || b.postedAt || new Date(0);
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
    setNotices(allNotices);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotices();
    
    // Simple polling for "real-time" updates in demo mode
    const interval = setInterval(fetchNotices, DEMO_SYNC_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNotices]);

  const createNotice = async (data: any) => {
    const newNotice = db.addNotice({
      ...data,
      createdBy: normalizedProfile?.fullName || 'Admin User'
    });
    fetchNotices();
    return newNotice;
  };

  const updateNotice = async (id: string, updates: Partial<Notice>) => {
    const updated = db.updateNotice(id, {
      ...updates,
      updatedBy: normalizedProfile?.fullName || 'Admin User'
    });
    fetchNotices();
    return updated;
  };

  const deleteNotice = async (id: string) => {
    const success = db.deleteNotice(id);
    fetchNotices();
    return success;
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
