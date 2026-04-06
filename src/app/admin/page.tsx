'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HiOutlinePlus, HiOutlineMegaphone, HiOutlineCalendarDays, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import AdminDashboardMetrics from '@/components/admin/AdminDashboardMetrics';
import AdminRecentActivity from '@/components/admin/AdminRecentActivity';
import { useAdminNotices } from '@/hooks/useAdminNotices';
import { useAdminEvents } from '@/hooks/useAdminEvents';
import { useAdminAssignments } from '@/hooks/useAdminAssignments';
import Link from 'next/link';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';
import RoleGuard from '@/components/auth/RoleGuard';
import { SEO } from '@/components/SEO';

export default function AdminPage() {
  const { user, normalizedProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const { notices, loading: noticesLoading } = useAdminNotices();
  const { events, loading: eventsLoading } = useAdminEvents();
  const { assignments, loading: assignmentsLoading } = useAdminAssignments();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || noticesLoading || eventsLoading || assignmentsLoading || !user) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto animate-fadeUp p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <WidgetSkeleton />
          <WidgetSkeleton />
          <WidgetSkeleton />
          <WidgetSkeleton />
        </div>
        <WidgetSkeleton />
      </div>
    );
  }

  const metrics = {
    notices: {
      total: notices.filter(n => n.publishState === 'published').length,
      drafts: notices.filter(n => n.publishState === 'draft').length
    },
    events: {
      total: events.filter(e => e.publishState === 'published').length,
      drafts: events.filter(e => e.publishState === 'draft').length
    },
    assignments: {
      total: assignments.filter(a => a.publishState === 'published').length,
      drafts: assignments.filter(a => a.publishState === 'draft').length
    }
  };

  return (
    <RoleGuard requiredCapability="canViewAdminDashboard">
      <div className="max-w-7xl mx-auto animate-fadeUp p-6 pb-24 min-h-screen">
        <SEO title="Operational Control Hub" description="Administrative control plane for institutional notices, events, and student management." />
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="hidden sm:block overflow-hidden">
            <h1 className="text-[17px] font-bold text-text-primary tracking-tight truncate">
              Operational Control Hub
            </h1>
            <p className="text-[11px] font-black text-charcoal uppercase tracking-[0.14em] mt-0.5 truncate max-w-[200px] lg:max-w-[300px]">
              Institutional Portal / 2026 Season
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-border-subtle shadow-sm">
            <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">System Status</p>
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operational
              </p>
            </div>
          </div>
        </header>

        {/* KPI Section */}
        <section className="mb-12">
          <AdminDashboardMetrics 
            notices={metrics.notices}
            events={metrics.events}
            assignments={metrics.assignments}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Recent Activity */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <AdminRecentActivity 
              notices={notices}
              events={events}
              assignments={assignments}
            />
          </div>

          {/* Right Column: Quick Actions */}
          <div className="space-y-8">
            <div className="bg-charcoal text-white p-8 rounded-[32px] shadow-xl shadow-charcoal/20 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black tracking-tight mb-2">Platform Actions</h3>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-8">Deploy new modules</p>
                
                <div className="space-y-4">
                  <Link href="/admin/notices/new" className="flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 group/btn">
                    <div className="flex items-center gap-3">
                      <HiOutlineMegaphone className="w-5 h-5 text-indigo-300" />
                      <span className="text-sm font-bold">New Notice</span>
                    </div>
                    <HiOutlinePlus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                  </Link>

                  <Link href="/admin/events/new" className="flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 group/btn">
                    <div className="flex items-center gap-3">
                      <HiOutlineCalendarDays className="w-5 h-5 text-emerald-300" />
                      <span className="text-sm font-bold">New Event</span>
                    </div>
                    <HiOutlinePlus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                  </Link>

                  <Link href="/admin/assignments/new" className="flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5 group/btn">
                    <div className="flex items-center gap-3">
                      <HiOutlineClipboardDocumentList className="w-5 h-5 text-amber-300" />
                      <span className="text-sm font-bold">New Task</span>
                    </div>
                    <HiOutlinePlus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                  </Link>
                </div>
              </div>
              {/* Aesthetic background element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="bg-white border border-border-subtle p-8 rounded-[32px] shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6">Audience Targeting</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-bg-card-secondary rounded-xl">
                  <span className="text-xs font-bold text-charcoal">Active Tags</span>
                  <span className="text-xs font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg">12 Institutional</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg-card-secondary rounded-xl">
                  <span className="text-xs font-bold text-charcoal">Total Students</span>
                  <span className="text-xs font-black text-accent bg-accent/10 px-2.5 py-1 rounded-lg">4 seeded</span>
                </div>
                <p className="text-[10px] text-text-muted font-medium pt-2 leading-relaxed">
                  Platform metrics reflect the current in-memory demo session. Deployment to production will synchronize with Firebase Firestore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
