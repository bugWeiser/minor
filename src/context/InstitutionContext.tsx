'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { resolveMockAuthSession } from '@/lib/authPersistence';

export interface InstitutionConfig {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  accentColor: string;
  contactEmail: string;
  address: string;
  academicYear: string;
  footerDisclaimer: string;
}

interface ContextType extends InstitutionConfig {
  activeOrgId: string;
  activeOrgSlug: string;
  loading: boolean;
  refreshConfig: () => Promise<void>;
}

const DEFAULT_CONFIG: InstitutionConfig = {
  id: 'org-1',
  name: 'Bugweiser University',
  slug: 'bugweiser-u',
  logoUrl: '',
  accentColor: '#D9FF3F',
  contactEmail: 'admin@bugweiser.edu',
  address: '123 Pixel Avenue, Tech City',
  academicYear: '2026 Season',
  footerDisclaimer: 'Official Institutional Asset. Unauthorized access or redistribution is strictly prohibited.'
};

const InstitutionContext = createContext<ContextType>({
  ...DEFAULT_CONFIG,
  activeOrgId: 'org-1',
  activeOrgSlug: 'bugweiser-u',
  loading: true,
  refreshConfig: async () => {}
});

export function InstitutionProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<InstitutionConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // 1. Resolve Active Tenant Precedence
  const resolveActiveTenant = useCallback(() => {
    // Priority 1: URL Override (?org=demo or ?org=bugweiser-u)
    if (typeof window === 'undefined') return 'bugweiser-u';
    const urlOrg = searchParams.get('org');
    if (urlOrg) return urlOrg;

    // Priority 2: Reviewer/Demo Mode Override (Stored selection for reviewers)
    const storedReviewerContext = localStorage.getItem('bw_reviewer_org_context');
    const session = resolveMockAuthSession();
    
    // If we have an active reviewer persona (mock session), the stored context or persona org wins
    if (session.source === 'mock' && session.normalizedProfile?.organizationId === 'org-demo') {
       if (storedReviewerContext) return storedReviewerContext;
       return 'org-demo';
    }

    // Priority 3: Authenticated Session Organization
    if (session.normalizedProfile?.organizationId) {
       return session.normalizedProfile.organizationId;
    }

    // Priority 4: Persisted Storage (General preference if still valid)
    const lastSessionOrg = localStorage.getItem('bw_last_org_slug');
    if (lastSessionOrg && lastSessionOrg !== 'undefined') return lastSessionOrg;

    // Priority 5: Fallback
    return 'bugweiser-u';
  }, [searchParams]);

  const activeIdOrSlug = resolveActiveTenant();

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/institution?slug=${activeIdOrSlug}`);
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.warn("InstitutionContext: Failed to fetch dynamic config, using defaults.");
    } finally {
      setLoading(false);
    }
  }, [activeIdOrSlug]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Sync brand color to CSS
  useEffect(() => {
    if (config.accentColor) {
      document.documentElement.style.setProperty('--institution-accent', config.accentColor);
    }
  }, [config.accentColor]);

  return (
    <InstitutionContext.Provider value={{ 
      ...config, 
      activeOrgId: config.id,
      activeOrgSlug: config.slug,
      loading, 
      refreshConfig: fetchConfig 
    }}>
      {children}
    </InstitutionContext.Provider>
  );
}

export function useInstitution() {
  return useContext(InstitutionContext);
}

export default InstitutionContext;
