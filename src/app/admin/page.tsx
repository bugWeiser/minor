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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">You must be an administrator to view this page.</p>
        <button 
          onClick={() => router.push('/')} 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeUp p-4 md:p-8 pb-24 bg-[#FCFCFD] min-h-screen font-inter">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-[#5534FA] tracking-tight mb-3">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Manage notices and assignments for the smart board.
        </p>
      </header>
      
      {/* Content Type Tabs */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab('Notice')}
          className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'Notice' 
              ? 'bg-[#5534FA] text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
          }`}
        >
          📋 Post Notice
        </button>
        <button
          onClick={() => setActiveTab('Assignment')}
          className={`px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'Assignment' 
              ? 'bg-[#5534FA] text-white shadow-md' 
              : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
          }`}
        >
          📚 Assignments
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 mb-12">
        {activeTab === 'Notice' && (
          <AdminNoticeForm onSubmit={async (data) => { await addNotice(data); }} />
        )}
        {activeTab === 'Assignment' && (
          <AdminAssignmentForm onSubmit={async (data) => { await addAssignment(data); }} />
        )}
      </div>

    </div>
  );
}
