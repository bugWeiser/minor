'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

export default function Header() {
  const { user, isFirebaseConfigured } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-border-subtle shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-18">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-charcoal shadow-lg shadow-accent/20 group-hover:rotate-3 transition-transform">
            <HiOutlineAcademicCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-black text-charcoal tracking-tighter">Bugweiser</span>
        </Link>
        <div className="flex items-center gap-4">
          {!isFirebaseConfigured && (
            <span className="hidden md:block text-[9px] font-black text-warning bg-soft-yellow px-2.5 py-1 rounded-md border border-amber-200 uppercase tracking-widest shadow-sm shadow-amber-500/5">OFFLINE DEMO</span>
          )}
          {user ? (
            <button 
              onClick={() => {
                if (!isFirebaseConfigured) {
                  localStorage.removeItem('mockRole');
                  window.location.href = '/login';
                } else {
                  import('@/lib/auth').then(({ logout }) => logout());
                }
              }}
              className="w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center text-white text-[13px] font-black hover:shadow-xl hover:shadow-black/20 transition-all active:scale-90"
              title="Terminate Session"
            >
              {(user.email?.[0] || 'U').toUpperCase()}
            </button>
          ) : (
            <Link href="/login" className="text-[13px] font-black text-charcoal uppercase tracking-widest hover:underline decoration-accent decoration-2 underline-offset-4 decoration-dashed">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
