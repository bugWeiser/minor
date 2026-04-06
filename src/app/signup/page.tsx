'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { registerStudent } from '@/lib/auth';
import Link from 'next/link';
import { HiOutlineUser, HiOutlineAcademicCap, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineChevronRight } from 'react-icons/hi2';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'CSE',
    year: '1',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push('/');
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await registerStudent(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.department, 
        parseInt(formData.year)
      );
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register account.');
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full h-14 px-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all";
  const lbl = "block text-[11px] font-black text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white selection:bg-accent/40 selection:text-charcoal selection:font-black">
      <div className="max-w-[480px] w-full card-shell !rounded-[40px] p-10 md:p-12 space-y-10 relative overflow-hidden bg-white shadow-2xl group transition-all duration-700 hover:shadow-black/5">
        
        {/* Background Decor */}
        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/30 transition-all duration-1000" />
        <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 bg-soft-blue/20 rounded-full blur-3xl pointer-events-none group-hover:bg-soft-blue/30 transition-all duration-1000" />
        
        <header className="relative z-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-charcoal shadow-lg shadow-accent/20 mx-auto mb-6 transform hover:rotate-6 transition-transform">
                <HiOutlineAcademicCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-charcoal tracking-tighter leading-tight mb-2">
                Identity Initiation
            </h1>
            <p className="text-[14px] font-bold text-text-muted uppercase tracking-widest opacity-60">
                Establish Your Institutional Node
            </p>
        </header>
        
        <form onSubmit={handleSignup} className="relative z-10 space-y-6">
          <div className="space-y-5">
            <div>
              <label className={lbl}>Designation Name</label>
              <div className="relative group/field">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-charcoal transition-colors" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`${inp} pl-12`}
                  placeholder="e.g. Alice Walker"
                  required
                />
              </div>
            </div>

            <div>
              <label className={lbl}>Communication Email</label>
              <div className="relative group/field">
                <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-charcoal transition-colors" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`${inp} pl-12`}
                  placeholder="institutional@sagi.ac.in"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={lbl}>Department Code</label>
                <select 
                  title="Department Code"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className={inp}
                >
                  <option value="CSE">CSE (School of Engg)</option>
                  <option value="BBA">BBA (School of Mgmt)</option>
                  <option value="ECE">ECE (Electronics)</option>
                  <option value="MECH">MECH (Mechanical)</option>
                </select>
              </div>
              <div>
                <label className={lbl}>Academic Year</label>
                <select 
                  title="Academic Year"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className={inp}
                >
                  <option value="1">Year 1 (Freshman)</option>
                  <option value="2">Year 2 (Sophomore)</option>
                  <option value="3">Year 3 (Pre-Final)</option>
                  <option value="4">Year 4 (Final)</option>
                </select>
              </div>
            </div>

            <div>
              <label className={lbl}>Security Keyphrase</label>
              <div className="relative group/field">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-charcoal transition-colors" />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`${inp} pl-12`}
                  placeholder="••••••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="p-4 rounded-xl bg-soft-red text-danger border border-red-100 text-[13px] font-black flex items-center gap-2 animate-shake">
              <span className="text-lg">⚠️</span> {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:shadow-black/10 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-3 group/btn shadow-xl shadow-black/5"
          >
            {loading ? 'Establishiing Connection...' : 'Register Instance'}
            {!loading && <HiOutlineChevronRight className="w-5 h-5 text-accent opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />}
          </button>
        </form>
        
        <footer className="relative z-10 pt-4 text-center border-t border-border-subtle border-dashed">
            <p className="text-[13px] font-bold text-text-muted">
                Already indexed in the directory?{' '}
                <Link href="/login" className="text-charcoal hover:underline decoration-accent decoration-2 underline-offset-4 decoration-dashed font-black ml-1">
                    Establish Session
                </Link>
            </p>
        </footer>
      </div>
    </div>
  );
}
