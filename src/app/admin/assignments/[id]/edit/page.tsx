'use client';

import { useAdminAssignments } from '@/hooks/useAdminAssignments';
import { useRouter } from 'next/navigation';
import { HiOutlineArrowLeft, HiOutlinePencilSquare } from 'react-icons/hi2';
import Link from 'next/link';
import AdminAssignmentForm from '@/components/admin/AdminAssignmentForm';
import { useEffect, useState } from 'react';
import { Assignment } from '@/lib/types';

export default function EditAssignmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { assignments, updateAssignment, loading } = useAdminAssignments();
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
     if (!loading && assignments.length > 0) {
        const found = assignments.find(a => a.id === params.id);
        if (found) {
           setAssignment(found);
        } else {
           // Invalid assignment ID
           router.push('/admin/assignments');
        }
     }
  }, [assignments, loading, params.id, router]);

  const handleSubmit = async (data: any) => {
    await updateAssignment(params.id, data);
    router.push('/admin/assignments');
  };

  if (loading || !assignment) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeUp">
      <Link href="/admin/assignments" className="flex items-center gap-2 text-text-muted hover:text-charcoal transition-colors mb-8 group">
        <HiOutlineArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Assignment Grid</span>
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-accent/20 text-charcoal rounded-2xl shadow-sm border border-accent/20">
            <HiOutlinePencilSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-charcoal tracking-tight">Modify Parameters</h1>
        </div>
        <p className="text-text-muted font-black uppercase tracking-[0.2em] text-[10px]">Reference: {assignment.id}</p>
      </header>

      <div className="bg-white/50 backdrop-blur-sm border border-border-subtle rounded-[40px] p-8 md:p-12 shadow-sm">
        <AdminAssignmentForm initialData={assignment} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
