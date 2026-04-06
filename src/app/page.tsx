'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineSparkles, 
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineDevicePhoneMobile
} from 'react-icons/hi2';

export default function MarketingHomePage() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-page selection:bg-accent/40 selection:text-charcoal flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[80px] bg-white/80 backdrop-blur-xl border-b border-border-subtle z-50 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center shadow-lg shadow-charcoal/20">
              <HiOutlineAcademicCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-black text-charcoal tracking-tight">Bugweiser</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted bg-bg-card-secondary px-2 py-1 rounded-md border border-border-subtle ml-2 hidden sm:inline-block">
              SaaS Education
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2.5 rounded-xl bg-charcoal text-white font-bold text-[13px] uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-black/20"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-[14px] font-bold text-text-secondary hover:text-charcoal transition-colors hidden sm:block">
                  Sign In
                </Link>
                <Link href="/login" className="px-6 py-2.5 rounded-xl bg-accent text-charcoal font-bold text-[13px] uppercase tracking-widest hover:brightness-95 transition-all shadow-md hover:shadow-accent/40 border border-yellow-200">
                  Try Live Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 mt-[80px]">
        <section className="relative pt-24 pb-32 px-6 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-soft-blue/20 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fadeUp">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border-subtle text-[12px] font-bold text-text-secondary mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 soft-pulse" />
              Bugweiser Minor 2.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-charcoal tracking-tight leading-[1.1] mb-8">
              The OS for modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-charcoal via-gray-700 to-gray-500">university campuses.</span>
            </h1>
            
            <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto mb-12">
              Unify student portals, faculty communication, and academic tracking into one lightning-fast, white-labeled design system.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-charcoal text-white font-black text-[14px] uppercase tracking-[0.1em] hover:bg-black hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-2">
                <HiOutlineRocketLaunch className="w-5 h-5" />
                Access Demo
              </Link>
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-border-subtle text-charcoal font-bold text-[14px] uppercase tracking-[0.1em] hover:border-border-strong hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <HiOutlineSparkles className="w-5 h-5 text-accent" />
                Request Pilot
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-bg-card-secondary py-32 px-6 border-y border-border-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-charcoal tracking-tight mb-4">Enterprise-Grade Reliability</h2>
              <p className="text-text-secondary font-medium">Built to handle thousands of concurrent students securely.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Zero Framework', desc: 'Custom optimized CSS layer ensuring sub-second renders.', icon: HiOutlineSparkles, color: 'text-yellow-600' },
                { title: 'Role-Based Auth', desc: 'Secure partitions for Students, Faculty, and Admin staff.', icon: HiOutlineShieldCheck, color: 'text-green-600' },
                { title: 'Data Analytics', desc: 'Real-time academic performance & attendance tracking.', icon: HiOutlineChartBar, color: 'text-blue-600' },
                { title: 'Mobile First', desc: 'Fully responsive layouts mimicking native iOS fluidity.', icon: HiOutlineDevicePhoneMobile, color: 'text-purple-600' }
              ].map((feature, i) => (
                <div key={i} className="card-shell p-8 bg-white border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-bg-card-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-border-subtle text-center shrink-0">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
           <HiOutlineAcademicCap className="w-6 h-6" />
        </div>
        <p className="text-[13px] font-bold text-text-muted">
          &copy; {new Date().getFullYear()} Bugweiser Technologies. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
