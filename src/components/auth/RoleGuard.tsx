'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserCapabilities } from '@/lib/permissions';

interface RoleGuardProps {
  children: ReactNode;
  requiredCapability?: keyof UserCapabilities;
  fallbackPath?: string;
}

export default function RoleGuard({ 
  children, 
  requiredCapability = 'canAccessAdminArea',
  fallbackPath = '/dashboard' 
}: RoleGuardProps) {
  const { capabilities, loading, user } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (!capabilities[requiredCapability]) {
      console.warn(`Unauthorized access attempt to capability: ${requiredCapability}`);
      router.push(fallbackPath);
      return;
    }

    setIsAuthorized(true);
  }, [capabilities, requiredCapability, loading, user, router, fallbackPath]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-page transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted animate-pulse">
            Verifying Credentials
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
 Broadway
