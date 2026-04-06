'use client';

import { useState, useCallback } from 'react';
import { InstitutionConfig } from '@/context/InstitutionContext';

export function useAdminInstitution() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = useCallback(async (data: Partial<InstitutionConfig>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/institution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update configuration');
      }

      return await res.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateConfig,
    loading,
    error
  };
}
