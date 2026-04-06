'use client';

import Link from 'next/link';
import { HiOutlineMap } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6 selection:bg-institution-accent/30 selection:text-charcoal">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeUp">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-[32px] bg-charcoal text-institution-accent flex items-center justify-center mx-auto shadow-2xl shadow-black/10 ring-8 ring-white">
            <HiOutlineMap className="w-12 h-12" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-error text-white text-[10px] font-black flex items-center justify-center border-4 border-bg-page skew-x-12 animate-pulse">
            404
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tighter text-charcoal">Page Not Found</h1>
          <p className="text-sm font-bold text-text-muted leading-relaxed">
            The resource you are looking for has been moved, deleted, or never existed in this institutional campus.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
          >
            Back to Dashboard
          </Link>
          <Link 
            href="/help" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-border-subtle text-text-muted text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-bg-page transition-all"
          >
            Get Help
          </Link>
        </div>

        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-40 pt-12">
          Bugweiser SaaS &bull; Pilot Edition &bull; 2026
        </p>
      </div>
    </div>
  );
}
