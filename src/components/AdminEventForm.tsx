'use client';
import { useState } from 'react';
import { CalendarEvent } from '@/lib/types';
import TagSelector from './admin/TagSelector';
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineMapPin, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

interface Props {
  onSubmit: (data: Omit<CalendarEvent, 'id'>) => Promise<void>;
  loading?: boolean;
}

export default function AdminEventForm({ onSubmit, loading: externalLoading }: Props) {
  const [form, setForm] = useState({
    title: '',
    category: 'Academic',
    description: '',
    date: '',
    endDate: '',
    location: '',
    time: '',
    color: '#6366F1',
    tags: ['ALL'],
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(['ALL']);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const EVENT_CATEGORIES = ['Academic', 'Exam', 'Workshop', 'Holiday', 'Club', 'Sports', 'Deadline'];
  const COLORS = [
    { name: 'Indigo', hex: '#6366F1' },
    { name: 'Crimson', hex: '#EF4444' },
    { name: 'Emerald', hex: '#10B981' },
    { name: 'Amber', hex: '#F59E0B' },
    { name: 'Rose', hex: '#F43F5E' },
    { name: 'Slate', hex: '#475569' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) {
        setMsg('❌ Temporal Input Deficient: Title and Date markers required.');
        return;
    }
    
    setLoading(true);
    setMsg('');
    
    try {
      await onSubmit({
        ...form,
        date: new Date(form.date),
        endDate: form.endDate ? new Date(form.endDate) : undefined,
        tags: selectedTags,
      });

      setMsg('✅ Milestone Indexed: Temporal grid updated successfully.');
      setForm({
        title: '', category: 'Academic', description: '', date: '', endDate: '', location: '', time: '', color: '#6366F1', tags: ['ALL'],
      });
      setSelectedTags(['ALL']);
    } catch {
      setMsg('❌ Grid Integration Failure: Milestone indexing aborted.');
    } finally {
      setLoading(false);
    }
  };

  const inp = 'w-full h-14 px-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all';
  const lbl = 'block text-[11px] font-black text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeUp">
      <div>
        <label className={lbl}>Milestone Heading <span className="text-danger">*</span></label>
        <div className="relative">
          <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inp} placeholder="e.g. Mid-term Assessment Commencement" />
          <HiOutlineCalendarDays className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Classification <span className="text-danger">*</span></label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
            {EVENT_CATEGORIES.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        <div>
          <label className={lbl}>Target Student Nodes <span className="text-danger">*</span></label>
          <div className="bg-bg-card-secondary p-5 rounded-2xl border border-dashed border-border-strong group-hover/form:border-charcoal/20 transition-all">
            <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Epoch (Start Date) <span className="text-danger">*</span></label>
          <div className="relative">
             <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inp} />
          </div>
        </div>
        <div>
          <label className={lbl}>Terminal Epoch (End Date)</label>
          <div className="relative">
             <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className={inp} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Time Sync (Optional)</label>
          <div className="relative">
            <input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inp} placeholder="e.g. 10:00 AM IST" />
            <HiOutlineClock className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className={lbl}>Spatial Coordinate (Location)</label>
          <div className="relative">
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inp} placeholder="e.g. Auditorium A, Block B" />
            <HiOutlineMapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className={lbl}>Grid Visualization Color</label>
        <div className="flex flex-wrap gap-4 p-5 bg-bg-card-secondary rounded-2xl border border-border-subtle">
           {COLORS.map(c => (
             <button 
                key={c.hex} 
                type="button" 
                onClick={() => setForm({ ...form, color: c.hex })} 
                className={`w-10 h-10 rounded-xl transition-all ${form.color === c.hex ? 'ring-4 ring-offset-2 ring-charcoal/20 scale-110 shadow-lg' : 'opacity-60 grayscale-[0.3] hover:opacity-100 hover:scale-105'}`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
             />
           ))}
        </div>
      </div>

      <div>
        <label className={lbl}>Contextual Parameters / Description</label>
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className={`${inp} !h-auto py-5 resize-none`} placeholder="Detailed parameters for this temporal milestone..." />
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-[13px] font-black flex items-center gap-3 animate-fadeUp ${msg.startsWith('✅') ? 'bg-soft-green text-charcoal border border-emerald-200' : 'bg-soft-red text-danger border border-red-200'}`}>
          {msg.startsWith('✅') ? <HiOutlineCheckCircle className="w-5 h-5" /> : <HiOutlineExclamationTriangle className="w-5 h-5" />}
          {msg}
        </div>
      )}

      <button type="submit" disabled={loading || externalLoading} className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3">
        {loading || externalLoading ? '⏳ Indexing Milestone...' : '📅 Index Temporal Milestone'}
      </button>
    </form>
  );
}
