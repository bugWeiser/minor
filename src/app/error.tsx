'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Bugweiser System Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6 selection:bg-institution-accent/30 selection:text-charcoal">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeUp">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-[32px] bg-charcoal text-error flex items-center justify-center mx-auto shadow-2xl shadow-black/10 ring-8 ring-white">
            <HiOutlineExclamationTriangle className="w-12 h-12" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-error text-white text-[10px] font-black flex items-center justify-center border-4 border-bg-page skew-x-12 animate-pulse">
            500
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tighter text-charcoal">System Outage</h1>
          <p className="text-sm font-bold text-text-muted leading-relaxed">
            We encountered a critical error while processing your request. Our SaaS core remains stable, but this specific module failed to load.
          </p>
          <p className="text-[10px] font-black text-error uppercase tracking-widest bg-error/5 py-2 px-3 rounded-lg inline-block">
            Error Digest: {error.digest || 'Internal Process Error'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
          >
            Retry Module
          </button>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-border-subtle text-text-muted text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-bg-page transition-all"
          >
            Dashboard
          </Link>
        </div>

        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-40 pt-12">
          Bugweiser SaaS &bull; Pilot Edition &bull; 2026
        </p>
      </div>
    </div>
  );
}
