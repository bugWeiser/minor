'use client';

import Link from 'next/link';
import { HiOutlineBuildingLibrary } from 'react-icons/hi2';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-page text-charcoal selection:bg-institution-accent/30 selection:text-charcoal flex flex-col">
      {/* Public Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-subtle h-20">
        <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-charcoal text-institution-accent flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95 shadow-lg shadow-black/5">
              <HiOutlineBuildingLibrary className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">Bugweiser</h1>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1 opacity-60">Pilot Edition</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-black text-text-muted hover:text-charcoal transition-colors uppercase tracking-widest">About</Link>
            <Link href="/pricing" className="text-sm font-black text-text-muted hover:text-charcoal transition-colors uppercase tracking-widest">Pricing</Link>
            <Link href="/help" className="text-sm font-black text-text-muted hover:text-charcoal transition-colors uppercase tracking-widest">Support</Link>
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Public Footer */}
      <footer className="border-t border-border-subtle bg-white py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HiOutlineBuildingLibrary className="w-5 h-5 text-charcoal" />
              <span className="font-black text-lg tracking-tight">Bugweiser</span>
            </div>
            <p className="text-xs font-bold text-text-muted leading-relaxed max-w-xs">
              Empowering institutions with adaptive, personalized student communication. Built for the next generation of academic excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Platform Overview</Link></li>
              <li><Link href="/pricing" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Pilot Pricing</Link></li>
              <li><Link href="/help" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal mb-6">Compliance</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Institutional Disclaimer</Link></li>
              <li><Link href="/data-handling" className="text-xs font-bold text-text-muted hover:text-charcoal transition-colors">Data Processing</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-40">
            &copy; 2026 Bugweiser SaaS. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
