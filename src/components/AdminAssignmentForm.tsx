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

  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:border-[#5534FA] focus:ring-1 focus:ring-[#5534FA] outline-none transition-all';
  const lbl = 'block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={lbl}>DELIVERABLE TITLE <span className="text-red-500">*</span></label>
        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inp} placeholder="e.g. Case Study on Strategic Alliances" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={lbl}>COURSE DOMAIN <span className="text-red-500">*</span></label>
          <input required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className={inp} placeholder="e.g. BBA-401 Strategic Mgmt" />
        </div>
        <div>
          <label className={lbl}>DUE DATE & TIME <span className="text-red-500">*</span></label>
          <input type="datetime-local" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={inp} />
        </div>
      </div>

      <div>
        <label className={lbl}>DESCRIPTION</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className={`${inp} resize-none`} placeholder="Optional: Provide specific mandates or submission guidelines..." />
      </div>

      <div>
        <label className={lbl}>TARGET TAGS (COMMA SEPARATED) <span className="text-red-500">*</span></label>
        <input value={selectedTags.join(', ')} readOnly className={inp} placeholder="ALL" />
        <p className="text-xs text-gray-400 mt-2">Use "ALL" for public assignments, or target specific groups like "CSE-3".</p>
        <div className="mt-4 border border-gray-100 p-4 rounded-xl">
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>

      <div>
        <label className={lbl}>POSTED BY <span className="text-red-500">*</span></label>
        <input required value={form.postedBy} onChange={e => setForm({ ...form, postedBy: e.target.value })} className={inp} placeholder="Name of Faculty" />
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-sm font-medium ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {msg}
        </div>
      )}

      <button type="submit" disabled={loading || externalLoading} className="w-full h-14 rounded-xl bg-[#5534FA] hover:bg-[#4320E0] text-white font-bold text-sm transition-colors mt-8">
        {loading || externalLoading ? 'Processing...' : 'Post Assignment'}
      </button>
    </form>
  );
}
