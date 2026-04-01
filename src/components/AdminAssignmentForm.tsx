'use client';
import { useState } from 'react';
import { Assignment } from '@/lib/types';
import TagSelector from './admin/TagSelector';


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

  const inp = 'w-full px-4 py-3 rounded-2xl border border-border-subtle bg-bg-card-secondary/30 text-text-primary text-[14px] font-medium focus:border-charcoal focus:bg-white outline-none transition-all placeholder:text-text-muted';
  const lbl = 'block text-[11px] font-bold text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
        <label className={lbl}>Deliverable Title <span className="text-danger">*</span></label>
        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inp} placeholder="e.g., Case Study on Strategic Alliances" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        <div>
          <label className={lbl}>Course Domain <span className="text-danger">*</span></label>
          <input required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className={inp} placeholder="e.g., BBA-401 Strategic Mgmt" />
        </div>
        <div>
          <label className={lbl}>Submission Deadline <span className="text-danger">*</span></label>
          <input type="datetime-local" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={inp} />
        </div>
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.3s' }}>
        <label className={lbl}>Procedural description</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className={`${inp} resize-none`} placeholder="Optional: Provide specific mandates or submission guidelines..." />
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        <label className={lbl}>Issuer Identity (Faculty Name) <span className="text-danger">*</span></label>
        <input required value={form.postedBy} onChange={e => setForm({ ...form, postedBy: e.target.value })} className={inp} placeholder="e.g., Prof. S. Verma" />
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.5s' }}>
        <label className={lbl}>Target Demographic Tags <span className="text-danger">*</span></label>
        <div className="mt-1 border border-border-subtle p-5 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
          <input value={selectedTags.join(', ')} readOnly className={`${inp} bg-bg-card-secondary border-dashed`} placeholder="ALL" />
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
          <p className="text-[11px] text-text-muted font-medium italic">Target specific groups like "BBA-4" or "CSE-3" for personalized feeds.</p>
        </div>
      </div>

      {msg && (
        <div className={`p-5 rounded-2xl text-[13px] font-bold border animate-fadeUp ${msg.startsWith('✅') ? 'bg-soft-green text-charcoal border-emerald-100' : 'bg-soft-red text-charcoal border-red-100'}`}>
          {msg}
        </div>
      )}

      <button type="submit" disabled={loading || externalLoading} className="w-full h-16 rounded-2xl bg-charcoal hover:bg-black text-white font-bold text-sm transition-all mt-6 shadow-lg shadow-charcoal/20 hover:shadow-xl active:scale-[0.98] disabled:opacity-50">
        {loading || externalLoading ? 'MODULATING PACKETS...' : 'PUBLISH TO CURRICULUM'}
      </button>
    </form>
  );
}
