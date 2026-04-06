'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RoleGuard from '@/components/auth/RoleGuard';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineCheckCircle, 
  HiOutlineChevronRight,
  HiOutlineBuildingLibrary,
  HiOutlineAcademicCap,
  HiOutlineUserPlus,
  HiOutlineSpeakerWave,
  HiOutlineCalendarDays,
  HiOutlineFlag
} from 'react-icons/hi2';

export default function AdminOnboardingWizard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    hasCustomOrg: false,
    hasAcademicStructure: false,
    hasUsers: false,
    hasNotices: false,
    hasEvents: false
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const orgRes = await fetch('/api/institution');
      const academicRes = await fetch('/api/institution/academic');
      const noticeRes = await fetch('/api/admin/notices');
      
      const orgData = await orgRes.json();
      const academicData = await academicRes.json();
      const noticeData = await noticeRes.json();

      // Check for presence of "Imported" users in localStorage (simulated)
      const hasImportedHistory = localStorage.getItem('bugweiser_import_id') !== null;

      setStats({
        // Configured if name/branding changed from default or slug is custom
        hasCustomOrg: orgData.name !== 'Bugweiser University' || orgData.accentColor !== '#D9FF3F' || orgData.slug !== 'bugweiser-u',
        // Structure set if departments differ from seed set (4) or include a specific "custom" tag
        hasAcademicStructure: academicData.departments.length !== 4,
        hasUsers: hasImportedHistory, 
        hasNotices: noticeData.some((n: any) => n.publishState === 'published' && !n.id.startsWith('notice-')), 
        hasEvents: false
      });
    } catch (err) {
      console.warn("Onboarding stats check partial failure.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const steps = [
    {
      id: 'foundation',
      title: 'Institutional Foundation',
      description: 'Configure your college name, logo, and core branding.',
      icon: HiOutlineBuildingLibrary,
      href: '/admin/settings/organization',
      isCompleted: stats.hasCustomOrg
    },
    {
      id: 'academic',
      title: 'Academic Architecture',
      description: 'Define departments, programs, and student sections.',
      icon: HiOutlineAcademicCap,
      href: '/admin/academic',
      isCompleted: stats.hasAcademicStructure
    },
    {
      id: 'users',
      title: 'Personnel Onboarding',
      description: 'Import your students and faculty in bulk via CSV.',
      icon: HiOutlineUserPlus,
      href: '/admin/import/students',
      isCompleted: stats.hasUsers
    },
    {
      id: 'content',
      title: 'Operational Pulse',
      description: 'Publish your first official notice and academic event.',
      icon: HiOutlineSpeakerWave,
      href: '/admin/notices',
      isCompleted: stats.hasNotices
    }
  ];

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <RoleGuard requiredCapability="canManageInstitution">
      <div className="max-w-4xl mx-auto p-6 pb-24 animate-fadeUp">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-charcoal text-white flex items-center justify-center shadow-xl shadow-charcoal/20">
                <HiOutlineRocketLaunch className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-white bg-charcoal px-2.5 py-1 rounded-lg uppercase tracking-widest">Onboarding Phase</span>
            </div>
            <h1 className="text-4xl font-black text-charcoal tracking-tighter">Institution Launch Wizard</h1>
            <p className="text-sm font-bold text-text-muted mt-2 max-w-md">Complete these foundational steps to transition the Bugweiser platform from Demo to Operational Reality.</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-border-subtle shadow-sm min-w-[200px] text-center">
             <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Institutional Readiness</p>
             <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-bg-page" />
                   <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={200} strokeDashoffset={200 - (progressPercent * 2)} className="text-accent transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-charcoal">{progressPercent}%</div>
             </div>
             <p className="text-xs font-black uppercase text-charcoal tracking-widest">{completedCount} of {steps.length} Setup</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 mb-16">
           {steps.map((step, idx) => (
              <Link
                key={step.id}
                href={step.href}
                className={`
                  group relative flex items-center gap-6 p-6 bg-white border rounded-[32px] transition-all
                  ${step.isCompleted ? 'border-success/30 bg-success/[0.02]' : 'border-border-subtle hover:border-charcoal hover:shadow-xl hover:shadow-black/5'}
                `}
              >
                 <div className={`
                    w-16 h-16 rounded-[24px] flex items-center justify-center transition-all
                    ${step.isCompleted ? 'bg-success text-white' : 'bg-bg-page text-text-muted group-hover:bg-charcoal group-hover:text-white'}
                 `}>
                    {step.isCompleted ? <HiOutlineCheckCircle className="w-8 h-8" /> : <step.icon className="w-8 h-8" />}
                 </div>

                 <div className="flex-1">
                    <h3 className={`text-lg font-black tracking-tight ${step.isCompleted ? 'text-success' : 'text-charcoal'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-bold text-text-muted opacity-60 leading-relaxed">{step.description}</p>
                 </div>

                 <div className={`p-4 rounded-2xl ${step.isCompleted ? 'bg-success/10 text-success' : 'bg-bg-page text-text-muted group-hover:translate-x-1 transition-all'}`}>
                    <HiOutlineChevronRight className="w-5 h-5" />
                 </div>

                 {/* Step Connector (Mobile hidden) */}
                 {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-14 -bottom-4 w-0.5 h-4 bg-border-subtle z-0" />
                 )}
              </Link>
           ))}
        </div>

        <section className="bg-charcoal rounded-[40px] p-10 text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 bg-accent text-charcoal rounded-3xl flex items-center justify-center shrink-0 shadow-2xl shadow-accent/20">
                 <HiOutlineFlag className="w-10 h-10" />
              </div>
              <div className="flex-1">
                 <h2 className="text-2xl font-black tracking-tight mb-2">Final Readiness Checklist</h2>
                 <p className="text-sm font-bold opacity-60 max-w-lg mb-6">Review your institutional pulse before enabling student traffic. Once students join, all official communications are live.</p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: HiOutlineCalendarDays, label: 'Academic Year 2026 Set' },
                      { icon: HiOutlineSpeakerWave, label: 'Alert Feeds Operational' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/5">
                        <item.icon className="w-4 h-4 text-accent" />
                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <button 
                className="px-10 h-16 bg-accent text-charcoal rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
                onClick={() => window.location.href = '/admin'}
              >
                Go Live Hub
              </button>
           </div>

           {/* Decor */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />
        </section>
      </div>
    </RoleGuard>
  );
}
