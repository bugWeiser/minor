'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { loginWithEmail } from '@/lib/auth';
import Link from 'next/link';
import { 
  HiOutlineUser, 
  HiOutlineShieldCheck, 
  HiOutlineEye, 
  HiOutlineEyeSlash,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
  HiOutlineLockClosed,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import { SEO } from '@/components/SEO';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { user, appUser, normalizedProfile } = useAuth();

  useEffect(() => {
    if (user && appUser && normalizedProfile) {
      if (normalizedProfile.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, appUser, normalizedProfile, router]);

  if (user && appUser) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex selection:bg-accent/40 selection:text-charcoal bg-white">
      <SEO title="Institutional Access" description="Secure login for students, faculty, and administrators of the Bugweiser platform." />
      
      {/* LEFT HALF: Minimalist Illustration Panel */}
      <div className="hidden lg:flex w-[45%] bg-bg-page border-r border-border-subtle flex-col items-center justify-center p-12 relative overflow-hidden group">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-soft-blue/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Abstract Illustration Container */}
        <div className="relative w-full max-w-sm aspect-square mb-12 animate-fadeUp">
           {/* Main Card Element */}
           <div className="absolute inset-0 card-shell !rounded-[40px] bg-white shadow-2xl p-8 flex flex-col justify-end transform hover:scale-[1.02] transition-transform duration-700">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-charcoal shadow-lg shadow-accent/20 mb-auto">
                 <HiOutlineAcademicCap className="w-8 h-8" />
              </div>
              
              <div className="space-y-4">
                 <div className="h-4 w-3/4 bg-bg-hover rounded-full" />
                 <div className="h-4 w-1/2 bg-bg-hover rounded-full" />
                 <div className="pt-4 flex gap-3">
                   <div className="w-10 h-10 rounded-full bg-soft-blue border-2 border-white shadow-sm" />
                   <div className="w-10 h-10 rounded-full bg-soft-green border-2 border-white shadow-sm" />
                   <div className="w-10 h-10 rounded-full bg-soft-yellow border-2 border-white shadow-sm text-charcoal flex items-center justify-center text-[10px] font-black">+12k</div>
                 </div>
              </div>
           </div>
           
           {/* Floating Floating Elements */}
           <div className="absolute -top-10 -right-10 card-shell !rounded-3xl p-4 bg-charcoal text-white shadow-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-xl bg-accent text-charcoal flex items-center justify-center font-black">8.5</div>
                 <p className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Current Milestone</p>
              </div>
           </div>

           <div className="absolute -bottom-6 -left-12 card-shell !rounded-3xl p-5 bg-white border-accent shadow-xl animate-pulse duration-[4000ms]">
              <div className="flex items-center gap-4">
                 <HiOutlineEnvelope className="w-6 h-6 text-accent" />
                 <div className="space-y-1">
                    <div className="h-2 w-16 bg-bg-hover rounded-full" />
                    <div className="h-2 w-24 bg-bg-hover rounded-full" />
                 </div>
              </div>
           </div>
        </div>

        <div className="text-center z-10 animate-slideDown max-w-sm">
          <h2 className="text-4xl font-black text-charcoal tracking-tighter leading-tight">
            Academic Mastery Starts Here.
          </h2>
          <p className="text-[17px] text-text-secondary mt-5 font-medium leading-relaxed opacity-80">
            A unified interface for managing your academic trajectory, notices, and curricula results.
          </p>
        </div>
      </div>

      {/* RIGHT HALF: Refined Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-24 bg-white relative overflow-y-auto">
        <div className="max-w-[420px] w-full animate-fadeUp">
          
          {/* Brand Mark */}
          <div className="flex items-center gap-3 mb-16 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <HiOutlineAcademicCap className="w-5 h-5 text-charcoal" />
            </div>
            <span className="text-2xl font-black text-charcoal tracking-tighter">Bugweiser</span>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-black text-text-primary tracking-tight mb-3">
              Institutional Access
            </h1>
            <p className="text-[15px] text-text-muted font-bold uppercase tracking-widest leading-none">
              Student Information Node
            </p>
          </header>

          {/* Setup Demo Access Points */}
          <div className="mb-10 p-6 bg-bg-card-secondary border border-border-subtle rounded-[22px] shadow-sm relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-1 h-1 bg-accent rounded-full soft-pulse" /> Accelerated Demo Entry
            </p>
            <div className="flex flex-wrap gap-2.5 relative z-10">
              {[
                { label: 'Alice (BBA)', email: 'alice@dashboard.com', color: 'bg-soft-blue text-charcoal border-blue-100' },
                { label: 'Bob (CSE)', email: 'bob@dashboard.com', color: 'bg-soft-green text-charcoal border-emerald-100' },
                { label: 'Faculty', email: 'faculty@dashboard.com', color: 'bg-soft-yellow text-charcoal border-yellow-100' },
                { label: 'Platform Admin', email: 'admin@dashboard.com', color: 'bg-charcoal text-white border-charcoal shadow-md shadow-charcoal/30' }
              ].map(btn => (
                <button
                  key={btn.email}
                  type="button"
                  onClick={() => { 
                    setEmail(btn.email); 
                    setPassword(btn.email.includes('admin') || btn.email.includes('faculty') ? 'admin123' : 'password123'); 
                  }}
                  className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all border active:scale-95 flex items-center gap-2 ${btn.color}`}
                >
                  <HiOutlineUser className="w-4 h-4" />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10 overflow-hidden">
            <div className="flex-1 border-t border-border-subtle border-dashed" />
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] whitespace-nowrap">
              Credential Handshake
            </span>
            <div className="flex-1 border-t border-border-subtle border-dashed" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative group">
               <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-charcoal transition-colors" />
               <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[60px] pl-12 pr-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[15px] text-text-primary font-bold placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all"
                placeholder="Institutional ID"
                required
              />
            </div>
            
            <div className="relative group">
               <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-charcoal transition-colors" />
               <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[60px] pl-12 pr-12 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[15px] text-text-primary font-bold placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all"
                placeholder="Security Phrase"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-charcoal p-1 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex justify-end">
                <Link href="/forgot-password" className="text-[13px] font-bold text-text-muted hover:text-charcoal hover:underline decoration-accent decoration-2 underline-offset-4 decoration-dashed transition-all">
                    Forgot Security Phrase?
                </Link>
            </div>
            
            {error && (
              <div className="px-4 py-3 rounded-xl bg-soft-red text-danger border border-red-100 text-[13px] font-bold text-center mt-2 animate-shake">
                Verification Failed: {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-[64px] mt-6 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-[15px] uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3 group"
            >
              {loading ? 'Authenticating...' : 'Establish Connection'}
              <HiOutlineChevronRight className="w-5 h-5 text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <p className="text-[14px] font-bold text-text-muted">
              Unauthorized access is monitored. Need coordination?{' '}
              <Link href="/signup" className="text-charcoal hover:underline decoration-accent decoration-2 underline-offset-4 decoration-dashed">
                Register Instance
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
