'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineEnvelope, HiOutlineShieldCheck, HiOutlineAcademicCap } from 'react-icons/hi2';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white selection:bg-accent/40 selection:text-charcoal bg-bg-page relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-blue/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-[440px] w-full z-10 animate-fadeUp">
            <div className="card-shell p-10 md:p-12 bg-white shadow-2xl relative overflow-hidden group hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
                
                <header className="mb-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-charcoal flex items-center justify-center text-white shadow-lg shadow-charcoal/20 mx-auto mb-6">
                        <HiOutlineShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-charcoal tracking-tight mb-2">
                        Credential Recovery
                    </h1>
                    <p className="text-[14px] font-bold text-text-muted uppercase tracking-widest opacity-80">
                        Reset Institutional Access
                    </p>
                </header>

                {!submitted ? (
                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <p className="text-[14px] text-text-secondary font-medium leading-relaxed mb-6 text-center">
                                Enter your registered institutional ID. We will transmit a secure recovery link.
                            </p>
                            <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1">
                                Registered Email
                            </label>
                            <div className="relative group/field">
                                <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within/field:text-charcoal transition-colors" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 px-5 pl-12 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all"
                                    placeholder="institutional@sagi.ac.in"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:shadow-black/10 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                        >
                            {loading ? 'Transmitting...' : 'Send Recovery Link'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center animate-fadeUp">
                        <div className="w-20 h-20 rounded-full bg-soft-green mx-auto mb-6 flex items-center justify-center">
                            <HiOutlineEnvelope className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-charcoal mb-3">Transmission Successful</h3>
                        <p className="text-[14px] text-text-secondary font-medium leading-relaxed mb-8">
                            A secure recovery link has been dispatched to <strong>{email}</strong>. Please check your inbox.
                        </p>
                        <button 
                            onClick={() => router.push('/login')}
                            className="w-full h-14 rounded-xl bg-bg-card-secondary hover:bg-bg-hover text-charcoal border border-border-subtle font-bold text-[13px] uppercase tracking-widest transition-all active:scale-[0.98]"
                        >
                            Return to Login
                        </button>
                    </div>
                )}
            </div>

            {!submitted && (
                <div className="mt-8 text-center animate-fadeUp">
                    <Link href="/login" className="text-[13px] font-bold text-text-muted hover:text-charcoal hover:underline decoration-accent decoration-2 underline-offset-4 decoration-dashed transition-all">
                        ← Back to Handshake
                    </Link>
                </div>
            )}
        </div>
    </div>
  );
}
