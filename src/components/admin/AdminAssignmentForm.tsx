'use client';

import { useState } from 'react';
import { Assignment, PublishState, AssignPriority } from '@/lib/types';
import { ASSIGNMENT_PRIORITIES, PRIORITY_Tailwind_MAP } from '@/lib/constants';
import TagSelector from './TagSelector';
import { HiOutlineClipboardDocumentList, HiOutlineAcademicCap, HiOutlineCalendar, HiOutlineUserCircle, HiOutlineFlag } from 'react-icons/hi2';

interface AdminAssignmentFormProps {
  initialData?: Assignment;
  onSubmit: (data: Partial<Assignment>) => Promise<void>;
}

export default function AdminAssignmentForm({ initialData, onSubmit }: AdminAssignmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || ['ALL']);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    course: initialData?.course || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dueTime: initialData?.dueDate ? new Date(initialData.dueDate).toTimeString().slice(0, 5) : '23:59',
    priority: (initialData?.priority as AssignPriority) || 'medium',
    postedBy: initialData?.postedBy || 'Faculty Administration',
    publishState: (initialData?.publishState as PublishState) || 'published',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        title: form.title,
        course: form.course,
        description: form.description,
        dueDate: new Date(`${form.dueDate}T${form.dueTime}`),
        priority: form.priority,
        postedBy: form.postedBy,
        tags: selectedTags,
        publishState: form.publishState,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Assignment Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const lbl = "block text-[11px] font-black text-charcoal/50 uppercase tracking-widest mb-2 ml-1";
  const input = "w-full px-5 py-4 bg-white border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-medium placeholder:text-text-muted/40";
  const select = "w-full px-5 py-4 bg-white border border-border-subtle rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm font-black appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header Info */}
      <div className="animate-fadeUp">
        <label htmlFor="assignment-title" className={lbl}>Assignment Title <span className="text-danger">*</span></label>
        <input 
          id="assignment-title"
          type="text" 
          required
          placeholder="e.g. Final Project: Neural Network Architecture"
          className={input}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          title="Assignment Title"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeUp">
        <div>
          <label htmlFor="assignment-course" className={lbl}>Associated Course <span className="text-danger">*</span></label>
          <div className="relative">
            <HiOutlineAcademicCap className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
            <input 
              id="assignment-course"
              type="text"
              required
              placeholder="e.g. Machine Learning (CS402)"
              className={`${input} pl-12`}
              value={form.course}
              onChange={e => setForm({ ...form, course: e.target.value })}
              title="Course Name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="assignment-priority" className={lbl}>Urgency Tier</label>
          <div className="relative">
             <HiOutlineFlag className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
             <select 
                id="assignment-priority"
                className={`${select} pl-12 capitalize`}
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value as AssignPriority })}
                title="Select Priority Level"
              >
                {ASSIGNMENT_PRIORITIES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeUp">
        <div>
          <label htmlFor="assignment-due-date" className={lbl}>Submission Deadline <span className="text-danger">*</span></label>
          <div className="relative">
            <HiOutlineCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
            <input 
              id="assignment-due-date"
              type="date"
              required
              className={`${input} pl-12`}
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
              title="Due Date"
            />
          </div>
        </div>
        <div>
          <label htmlFor="assignment-due-time" className={lbl}>Deadline Horizon (Time)</label>
          <input 
            id="assignment-due-time"
            type="time"
            className={input}
            value={form.dueTime}
            onChange={e => setForm({ ...form, dueTime: e.target.value })}
            title="Due Time"
          />
        </div>
      </div>

      <div className="animate-fadeUp">
        <label htmlFor="assignment-description" className={lbl}>Detailed Instructions</label>
        <textarea 
          id="assignment-description"
          placeholder="Specify deliverables, submission links, and evaluation criteria..."
          className={`${input} min-h-[140px] resize-none leading-relaxed`}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          title="Assignment Description"
        />
      </div>

      <div className="animate-fadeUp">
        <label htmlFor="assignment-issuer" className={lbl}>Issuing Faculty / Department</label>
        <div className="relative">
          <HiOutlineUserCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 font-bold" />
          <input 
            id="assignment-issuer"
            type="text"
            placeholder="e.g. Department of Computer Science"
            className={`${input} pl-12`}
            value={form.postedBy}
            onChange={e => setForm({ ...form, postedBy: e.target.value })}
            title="Issuing Entity"
          />
        </div>
      </div>

      {/* Targeting */}
      <div className="animate-fadeUp">
        <label className={lbl}>Target Demographic Grid</label>
        <div className="p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm">
           <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>

      {/* Publish State */}
      <div className="flex flex-col md:flex-row gap-6 animate-fadeUp">
        <div className="flex-1 p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black text-charcoal uppercase tracking-widest">Deployment State</div>
            <div className="text-xs text-text-muted font-medium mt-0.5">Control visibility across the institutional grid</div>
          </div>
          <div className="flex p-1 bg-bg-page rounded-xl border border-border-subtle">
            {form.publishState === 'draft' ? (
              <button 
                type="button"
                aria-label="Assignment currently in Draft mode"
                aria-pressed="true"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all bg-white shadow-sm text-charcoal border border-border-subtle"
              >
                Draft
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setForm({ ...form, publishState: 'draft' })}
                aria-label="Set assignment status to Draft"
                aria-pressed="false"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all text-text-muted hover:text-charcoal"
              >
                Draft
              </button>
            )}
            
            {form.publishState === 'published' ? (
              <button 
                type="button"
                aria-label="Assignment currently Live"
                aria-pressed="true"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all bg-accent text-white shadow-md shadow-accent/20"
              >
                Live
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setForm({ ...form, publishState: 'published' })}
                aria-label="Set assignment status to Live"
                aria-pressed="false"
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all text-text-muted hover:text-charcoal"
              >
                Live
              </button>
            )}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="md:w-[240px] bg-charcoal text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-charcoal/20 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Processing...' : initialData ? 'Update Deliverable' : 'Release to Grid'}
        </button>
      </div>
    </form>
  );
}
