'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNoticeForm from '@/components/AdminNoticeForm';
import AdminAssignmentForm from '@/components/AdminAssignmentForm';
import { addNotice, addAssignment } from '@/lib/firestore';
import { WidgetSkeleton } from '@/components/ui/LoadingSkeleton';

type AdminTab = 'Notice' | 'Assignment';

export default function AdminPage() {
  const { user, appUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('Notice');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-fadeUp p-6">
        <WidgetSkeleton />
      </div>
    );
  }

  // Block non-admin users
  if (appUser && !appUser.isAdmin && appUser.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fadeUp">
        <h2 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">Access Denied</h2>
        <p className="text-text-muted mb-6 font-medium">You must be an administrator to perform faculty actions.</p>
        <button 
          onClick={() => router.push('/')} 
          className="px-8 py-3 bg-charcoal text-white rounded-2xl font-bold hover:shadow-lg transition-all"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeUp p-4 md:p-0 pb-24 min-h-screen">
      <header className="mb-10 pb-2 border-b border-border-subtle">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Platform Control Hub
        </h1>
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.12em] mt-2">
          Management terminal for Institutional Notices & Academic Tasks
        </p>
      </header>
      
      {/* Content Type Tabs */}
      <div className="flex items-center gap-2.5 mb-10 bg-white border border-border-subtle p-2 rounded-[22px] shadow-sm w-fit">
        {(['Notice', 'Assignment'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-8 py-3 rounded-2xl text-[13px] font-bold transition-all duration-200 border
              ${activeTab === tab 
                ? 'bg-charcoal text-white border-charcoal shadow-lg shadow-charcoal/20' 
                : 'bg-white text-text-muted border-border-subtle hover:bg-bg-hover hover:text-text-primary hover:border-border-strong'
              }
            `}
          >
            {tab === 'Notice' ? '📢 Create Notice' : '📝 Assign Task'}
          </button>
        ))}
      </div>

      <div className="card-shell p-6 md:p-10 mb-12 bg-white">
        <div className="mb-8">
           <h2 className="text-xl font-bold text-text-primary tracking-tight">
              {activeTab === 'Notice' ? 'Draft Institutional Notice' : 'Publish Academic Assignment'}
           </h2>
           <p className="text-sm text-text-muted font-medium mt-1">
              Ensure all targeted tags and expiry metadata are correctly validated.
           </p>
        </div>

        {activeTab === 'Notice' && (
          <AdminNoticeForm onSubmit={async (data) => { 
            const res = await fetch('/api/notices', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error("Broadcast failure");
          }} />
        )}
        {activeTab === 'Assignment' && (
          <AdminAssignmentForm onSubmit={async (data) => { 
            const res = await fetch('/api/assignments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error("Protocol failure");
          }} />
        )}
      </div>

    </div>
  );
}
