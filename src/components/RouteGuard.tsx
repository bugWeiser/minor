'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { WidgetSkeleton } from './ui/LoadingSkeleton';

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: ('student' | 'admin' | 'faculty')[];
  requireAuth?: boolean;
}

export default function RouteGuard({ 
  children, 
  allowedRoles,
  requireAuth = true 
}: RouteGuardProps) {
  const { user, normalizedProfile, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (requireAuth && !user) {
      router.push('/login');
      return;
    }

    if (requireAuth && user && normalizedProfile && allowedRoles) {
      // Direct comparison with normalizedProfile.role
      if (!allowedRoles.includes(normalizedProfile.role as any)) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } else if (requireAuth && user && normalizedProfile && !allowedRoles) {
        setIsAuthorized(true);
    } else if (!requireAuth) {
        setIsAuthorized(true);
    }

  }, [user, normalizedProfile, loading, router, allowedRoles, requireAuth]);

  if (loading || (requireAuth && !isAuthorized)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 animate-fadeUp">
        {!loading && requireAuth && !isAuthorized ? (
          <div className="text-center card-shell p-8 md:p-12 max-w-md bg-white">
            <h2 className="text-2xl font-black text-charcoal mb-3 tracking-tight">Access Restricted</h2>
            <p className="text-text-muted font-medium mb-8">
              Your institutional clearance does not permit access to this sector.
            </p>
            <button 
              onClick={() => router.push('/')} 
              className="w-full px-6 py-4 rounded-xl bg-charcoal text-white font-bold tracking-widest text-[13px] uppercase hover:bg-black transition-all"
            >
              Return Home
            </button>
          </div>
        ) : (
          <WidgetSkeleton />
        )}
      </div>
    );
  }

  return <>{children}</>;
}
