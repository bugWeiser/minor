'use client';

import { useState, useEffect } from 'react';
import { Notice, Category, Urgency, PublishState } from '@/lib/types';
import TagSelector from './TagSelector';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineInformationCircle } from 'react-icons/hi2';

interface Props {
  initialData?: Partial<Notice>;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export default function AdminNoticeForm({ initialData, onSubmit, loading: externalLoading }: Props) {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: (initialData?.category || 'General') as Category,
    urgency: (initialData?.urgency || 'Normal') as Urgency,
    expiryDate: initialData?.expiryDate 
      ? new Date(initialData.expiryDate).toISOString().split('T')[0] 
      : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0],
    isPinned: initialData?.isPinned || false,
    publishState: (initialData?.publishState || 'published') as PublishState,
    attachmentUrl: initialData?.attachmentUrl || null,
    attachmentName: initialData?.attachmentName || null,
    postedBy: initialData?.postedBy || '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || ['ALL']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.postedBy) {
      setError('Required parameters missing for institutional broadcast.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit({
        ...form,
        tags: selectedTags,
        expiryDate: new Date(form.expiryDate),
      });
    } catch (err: any) {
      setError(err.message || 'Transmission failure during protocol deployment.');
    } finally {
      setLoading(false);
    }
  };

  const inp = 'w-full px-4 py-3 rounded-2xl border border-border-subtle bg-bg-card-secondary/30 text-text-primary text-[14px] font-medium focus:border-charcoal focus:bg-white outline-none transition-all placeholder:text-text-muted';
  const lbl = 'block text-[11px] font-bold text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1';
  const select = 'w-full px-4 py-3 rounded-2xl border border-border-subtle bg-bg-card-secondary/30 text-text-primary text-[14px] font-bold focus:border-charcoal focus:bg-white outline-none transition-all appearance-none cursor-pointer';

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto pb-20">
      {/* Header Info */}
      <div className="p-6 bg-bg-card-secondary border border-border-subtle rounded-[28px] flex items-start gap-4">
        <HiOutlineInformationCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-black text-charcoal uppercase tracking-wider">Deployment Parameters</h4>
          <p className="text-[12px] text-text-muted font-medium mt-1 leading-relaxed">
            Configure targeting tags and publishing state carefully. Once published, the notice enters the global institutional feed immediately.
          </p>
        </div>
      </div>

        <div className="animate-fadeUp">
        <div>
          <label htmlFor="notice-title" className={lbl}>Broadcast Title <span className="text-danger">*</span></label>
          <input 
            id="notice-title"
            required 
            value={form.title} 
            onChange={e => setForm({ ...form, title: e.target.value })} 
            className={inp} 
            placeholder="e.g., Annual Research Symposium 2026" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="notice-category" className={lbl}>Categorization</label>
            <div className="relative">
              <select 
                id="notice-category"
                value={form.category} 
                onChange={e => setForm({ ...form, category: e.target.value as Category })}
                className={select}
                title="Select Category"
                aria-label="Category"
              >
                {['Academic', 'Placement', 'Events', 'Scholarships', 'Sports', 'Hostel', 'General'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="notice-urgency" className={lbl}>Urgency Level</label>
            <select 
              id="notice-urgency"
              value={form.urgency} 
              onChange={e => setForm({ ...form, urgency: e.target.value as Urgency })}
              className={select}
              title="Select Urgency"
              aria-label="Urgency Level"
            >
              {['Normal', 'Important', 'Urgent'].map(urg => (
                <option key={urg} value={urg}>{urg}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="notice-body" className={lbl}>Broadcast Content (Primary Body) <span className="text-danger">*</span></label>
          <textarea 
            id="notice-body"
            required
            value={form.body} 
            onChange={e => setForm({ ...form, body: e.target.value })} 
            rows={6} 
            className={`${inp} resize-none leading-relaxed`} 
            placeholder="Detailed institutional information..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="notice-expiry" className={lbl}>Expiry Date</label>
            <input 
              id="notice-expiry"
              type="date" 
              value={form.expiryDate} 
              onChange={e => setForm({ ...form, expiryDate: e.target.value })} 
              className={inp} 
              title="Select Expiry Date"
            />
          </div>
          <div>
            <label htmlFor="notice-issuer" className={lbl}>Issuer Identity <span className="text-danger">*</span></label>
            <input 
              id="notice-issuer"
              required
              value={form.postedBy} 
              onChange={e => setForm({ ...form, postedBy: e.target.value })} 
              className={inp} 
              placeholder="e.g., Dean of Academics" 
            />
          </div>
        </div>
      </div>

      {/* Targeting */}
      <div className="animate-fadeUp">
        <label className={lbl}>Target Demographic Grid</label>
        <div className="p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm">
           <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
           <p className="mt-4 text-[11px] text-text-muted font-medium italic">
             Notices tagged "ALL" will be visible to the entire institutional workforce and student body.
           </p>
        </div>
      </div>

      {/* States */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeUp">
        <div className="p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black text-charcoal uppercase tracking-widest">Priority Pinning</div>
            <div className="text-[10px] text-text-muted font-bold mt-1">Anchor to the top of feeds</div>
          </div>
          {form.isPinned ? (
            <button 
              type="button"
              onClick={() => setForm({ ...form, isPinned: false })}
              title="Unpin Notice"
              aria-label="Unpin Notice"
              aria-pressed="true"
              className="w-12 h-6 rounded-full transition-all relative bg-accent"
            >
              <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all left-7" />
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => setForm({ ...form, isPinned: true })}
              title="Pin Notice"
              aria-label="Pin Notice"
              aria-pressed="false"
              className="w-12 h-6 rounded-full transition-all relative bg-bg-hover"
            >
              <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all left-1" />
            </button>
          )}
        </div>

        <div className="p-6 bg-white border border-border-subtle rounded-[28px] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black text-charcoal uppercase tracking-widest">Publishing State</div>
            <div className="text-[10px] text-text-muted font-bold mt-1">{form.publishState === 'published' ? 'Visible to students' : 'Visible only to admins'}</div>
          </div>
          {form.publishState === 'published' ? (
            <button 
              type="button"
              onClick={() => setForm({ ...form, publishState: 'draft' })}
              aria-label="Revert to Draft"
              aria-pressed="true"
              title="Set to Draft"
              className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all bg-soft-green text-charcoal"
            >
              <HiOutlineCheckCircle className="w-4 h-4" /> Live
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => setForm({ ...form, publishState: 'published' })}
              aria-label="Publish Notice"
              aria-pressed="false"
              title="Set to Live"
              className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all bg-soft-yellow text-charcoal"
            >
              <HiOutlineClock className="w-4 h-4" /> Draft
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-soft-red border border-red-100 text-danger text-[13px] font-bold rounded-2xl animate-shake">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading || externalLoading} 
        title={initialData?.id ? 'Udpate Global Notice' : 'Deploy Notice to Grid'}
        className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-charcoal/20 active:scale-[0.98] disabled:opacity-50"
      >
        {loading || externalLoading ? 'Syncing with Grid...' : initialData?.id ? 'Udpate Global Notice' : 'Deploy Notice to Grid'}
      </button>
    </form>
  );
}
