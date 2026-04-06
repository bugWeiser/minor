'use client';

import Link from 'next/link';
import { HiOutlineLockClosed } from 'react-icons/hi2';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-6 selection:bg-institution-accent/30 selection:text-charcoal">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeUp">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-[32px] bg-charcoal text-institution-accent flex items-center justify-center mx-auto shadow-2xl shadow-black/10 ring-8 ring-white">
            <HiOutlineLockClosed className="w-12 h-12" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-warning text-white text-[10px] font-black flex items-center justify-center border-4 border-bg-page skew-x-12 animate-pulse">
            403
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tighter text-charcoal">Access Denied</h1>
          <p className="text-sm font-bold text-text-muted leading-relaxed">
            You do not have permission to access this resource. This may be due to role restrictions or organization-scoped partitioning.
          </p>
          <div className="p-4 bg-warning/5 border border-warning/10 rounded-2xl">
            <p className="text-[10px] font-bold text-warning-dark uppercase tracking-widest leading-relaxed">
              Security Note: Cross-tenant access is strictly monitored. If you believe this is an error, please contact your institutional administrator.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
          >
            Back to Dashboard
          </Link>
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-border-subtle text-text-muted text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-bg-page transition-all"
          >
            Switch Account
          </Link>
        </div>

        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-40 pt-12">
          Bugweiser SaaS &bull; Pilot Edition &bull; 2026
        </p>
      </div>
    </div>
  );
}
