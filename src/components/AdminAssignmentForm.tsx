'use client';
import { useState } from 'react';
import { Assignment } from '@/lib/types';
import TagSelector from './admin/TagSelector';
import { HiOutlineClipboardDocumentList, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineBookOpen } from 'react-icons/hi2';

interface Props {
  onSubmit: (data: Omit<Assignment, 'id' | 'postedAt'>) => Promise<void>;
  loading?: boolean;
}

export default function AdminAssignmentForm({ onSubmit, loading: externalLoading }: Props) {
  const [form, setForm] = useState({
    title: '',
    course: '',
    description: '',
    dueDate: '',
    tags: ['ALL'],
    postedBy: '',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(['ALL']);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.course || !form.dueDate || !form.postedBy) {
      setMsg('❌ Input Validation Failure: Ensure all mandatory parameters are defined.');
      return;
    }
    
    setLoading(true);
    setMsg('');
    
    try {
      await onSubmit({
        ...form,
        dueDate: new Date(form.dueDate),
        tags: selectedTags,
      });

      setMsg('✅ Protocol Deployed: Academic task published successfully.');
      setForm({
        title: '', course: '', description: '', dueDate: '', tags: ['ALL'], postedBy: '',
      });
      setSelectedTags(['ALL']);
    } catch {
      setMsg('❌ Transmission Fault: Error during curriculum deployment.');
    } finally {
      setLoading(false);
    }
  };

  const inp = 'w-full h-14 px-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all';
  const lbl = 'block text-[11px] font-black text-text-muted uppercase tracking-[0.15em] mb-2.5 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeUp">
      <div>
        <label className={lbl}>Deliverable Title <span className="text-danger">*</span></label>
        <div className="relative">
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inp} placeholder="e.g. Case Study on Strategic Alliances" />
          <HiOutlineClipboardDocumentList className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Academic Domain <span className="text-danger">*</span></label>
          <div className="relative">
            <input required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className={inp} placeholder="e.g. BBA-401 Strategic Mgmt" />
            <HiOutlineBookOpen className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className={lbl}>Temporal Deadline <span className="text-danger">*</span></label>
          <div className="relative">
            <input type="datetime-local" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={`${inp} pr-12`} />
            <HiOutlineClock className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className={lbl}>Protocol Context / Description</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className={`${inp} !h-auto py-5 resize-none`} placeholder="Optional: Provide specific mandates or submission guidelines..." />
      </div>

      <div>
        <label className={lbl}>Target Student Nodes (Tags) <span className="text-danger">*</span></label>
        <div className="bg-bg-card-secondary p-5 rounded-2xl border border-dashed border-border-strong group-hover/form:border-charcoal/20 transition-all">
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>

      <div>
        <label className={lbl}>Administrative Sign-off <span className="text-danger">*</span></label>
        <input required value={form.postedBy} onChange={e => setForm({ ...form, postedBy: e.target.value })} className={inp} placeholder="Name of Faculty or Research Head" />
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-[13px] font-black flex items-center gap-3 animate-fadeUp ${msg.startsWith('✅') ? 'bg-soft-green text-charcoal border border-emerald-200' : 'bg-soft-red text-danger border border-red-200'}`}>
          {msg.startsWith('✅') ? <HiOutlineCheckCircle className="w-5 h-5" /> : <HiOutlineExclamationTriangle className="w-5 h-5" />}
          {msg}
        </div>
      )}

      <button type="submit" disabled={loading || externalLoading} className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3">
        {loading || externalLoading ? '⏳ Processing Protocol...' : '📝 Deploy Curriculum Task'}
      </button>
    </form>
  );
}
