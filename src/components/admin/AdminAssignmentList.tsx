'use client';

import { Assignment, AssignPriority } from '@/lib/types';
import { PRIORITY_Tailwind_MAP } from '@/lib/constants';
import { format } from 'date-fns';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineEye, HiOutlineClipboardDocumentList, HiOutlineCalendar, HiOutlineAcademicCap, HiOutlineFlag } from 'react-icons/hi2';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AdminAssignmentListProps {
  assignments: Assignment[];
  onDelete: (id: string) => Promise<void>;
  onTogglePublish: (id: string) => Promise<void>;
}

export default function AdminAssignmentList({ assignments, onDelete, onTogglePublish }: AdminAssignmentListProps) {
  const { capabilities } = useAuth();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await onDelete(deletingId);
      setDeletingId(null);
    }
  };

  if (assignments.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur-sm border border-dashed border-border-subtle rounded-[32px] p-20 text-center">
        <div className="w-20 h-20 bg-bg-page rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-text-muted/30">
          <HiOutlineClipboardDocumentList className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-black text-charcoal tracking-tight">No Academic Tasks Tracked</h3>
        <p className="text-text-muted font-medium mt-2 max-w-xs mx-auto">The institutional task engine is currently idling. Deploy your first assignment to students.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-[32px] border border-border-subtle bg-white/30 backdrop-blur-md shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-charcoal text-white/90">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Task Descriptor</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Course / Entity</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-center">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-center">Priority</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/50">
            {assignments.map((assignment) => {
              const priority = (assignment.priority || 'medium') as AssignPriority;
              const pStyle = PRIORITY_Tailwind_MAP[priority] || PRIORITY_Tailwind_MAP.medium;
              const isDraft = assignment.publishState === 'draft';
              
              return (
                <tr key={assignment.id} className="hover:bg-white/60 transition-colors group">
                  <td className="px-6 py-6 border-r border-border-subtle/30">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-2xl bg-bg-page text-text-muted border border-border-subtle mt-1 shrink-0 group-hover:bg-charcoal group-hover:text-white transition-all shadow-sm">
                        <HiOutlineClipboardDocumentList className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-black text-charcoal text-sm leading-tight group-hover:text-accent transition-colors truncate max-w-[200px]">
                          {assignment.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] font-bold text-text-muted">
                          <HiOutlineCalendar className="w-3.5 h-3.5" />
                          Due: {format(new Date(assignment.dueDate), 'MMM dd')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black text-charcoal truncate max-w-[150px]">
                        <HiOutlineAcademicCap className="w-3.5 h-3.5 text-text-muted" />
                        {assignment.course}
                      </div>
                      <div className="text-[10px] font-medium text-text-muted truncate max-w-[150px]">
                        By {assignment.postedBy || 'Institutional Admin'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30 text-center">
                      {isDraft ? (
                        <button 
                          onClick={() => onTogglePublish(assignment.id)}
                          aria-label="Release Task to Dashboard (Live)"
                          aria-pressed="false"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-bg-page text-text-muted hover:bg-charcoal hover:text-white"
                          title="Set to Live"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                          Draft
                        </button>
                      ) : (
                        <button 
                          onClick={() => onTogglePublish(assignment.id)}
                          aria-label="Revert Task to Draft (Hide)"
                          aria-pressed="true"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-success/10 text-success hover:bg-success hover:text-white shadow-sm"
                          title="Set to Draft"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                          Live
                        </button>
                      )}
                  </td>
                  <td className="px-6 py-6 border-r border-border-subtle/30 text-center">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${pStyle.bg} ${pStyle.text} ${pStyle.border}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${pStyle.dot}`} />
                      {priority}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 shadow-sm rounded-2xl p-1 bg-white inline-flex border border-border-subtle">
                      <Link 
                        href={`/admin/assignments/${assignment.id}/edit`}
                        title="Edit Task Parameters"
                        aria-label={`Edit assignment: ${assignment.title}`}
                        className="p-2 rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-page transition-all"
                      >
                        <HiOutlinePencilSquare className="w-4.5 h-4.5" />
                      </Link>
                      {capabilities.canDeleteContent && (
                        <button 
                          onClick={() => handleDeleteClick(assignment.id)}
                          title="Purge Task from Repositories (Delete)"
                          aria-label={`Delete assignment: ${assignment.title}`}
                          className="p-2 rounded-xl text-text-muted hover:text-danger hover:bg-danger/5 transition-all"
                        >
                          <HiOutlineTrash className="w-4.5 h-4.5" />
                        </button>
                      )}
                      <Link
                        href="/assignments"
                        title="Preview on Student Dashboard"
                        aria-label={`View ${assignment.title} on student board`}
                        className="p-2 rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-page transition-all"
                      >
                        <HiOutlineEye className="w-4.5 h-4.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Overlay */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setDeletingId(null)} />
          <div 
            className="bg-white rounded-[32px] p-8 max-w-sm w-full relative shadow-2xl border border-white/20 animate-zoomIn"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-task-title"
            aria-describedby="delete-task-desc"
          >
            <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineTrash className="w-8 h-8" />
            </div>
            <h3 id="delete-task-title" className="text-2xl font-black text-charcoal text-center tracking-tight leading-tight">Purge Academic Task?</h3>
            <p id="delete-task-desc" className="text-text-muted text-center font-medium mt-3 text-sm">This will permanently remove the assignment from all student repositories and pending trackers.</p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-muted border border-border-subtle hover:bg-bg-page transition-all"
              >
                Abort
              </button>
              <button 
                onClick={confirmDelete}
                className="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white bg-danger hover:bg-danger-dark shadow-lg shadow-danger/20 transition-all active:scale-[0.98]"
              >
                Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
