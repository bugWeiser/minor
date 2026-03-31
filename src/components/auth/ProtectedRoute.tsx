'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && user && requireAdmin && appUser && !appUser.isAdmin) {
      router.push('/');
    }
  }, [loading, user, appUser, requireAdmin, router]);

  if (loading) {
    return (
      <div className="space-y-4">
        <WidgetSkeleton />
        <WidgetSkeleton />
      </div>
    );
  }

  if (!user) return null;

  if (requireAdmin && appUser && !appUser.isAdmin) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">Access Denied</h2>
        <p className="text-[var(--text-secondary)] max-w-md mb-6">
          This page is restricted to administrators. Contact your institution if you need access.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
