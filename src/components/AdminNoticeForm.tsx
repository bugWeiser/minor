'use client';
import { useState } from 'react';
import { Category, Urgency, NoticeFormData } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { uploadToCloudinary } from '@/lib/cloudinary';
import TagSelector from './admin/TagSelector';


interface Props {
  onSubmit: (data: NoticeFormData) => Promise<void>;
  initialData?: Partial<NoticeFormData> & { tags?: string[] };
  isEdit?: boolean;
}

export default function AdminNoticeForm({ onSubmit, initialData, isEdit }: Props) {
  const [form, setForm] = useState<NoticeFormData>({
    title: initialData?.title || '',
    body: initialData?.body || '',
    category: initialData?.category || 'Academic',
    tags: initialData?.tags || ['ALL'],
    urgency: initialData?.urgency || 'Normal',
    expiryDate: initialData?.expiryDate || '',
    isPinned: initialData?.isPinned || false,
    postedBy: initialData?.postedBy || '',
    attachmentUrl: initialData?.attachmentUrl || '',
    attachmentName: initialData?.attachmentName || '',
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags || ['ALL']
  );
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body || !form.expiryDate || !form.postedBy) {
      setMsg('❌ Field Input Missing: Ensure all required fields are populated.');
      return;
    }
    
    setLoading(true);
    setMsg('');
    
    try {
      let finalAttachmentUrl = form.attachmentUrl;
      let finalAttachmentName = form.attachmentName;

      if (file) {
        setMsg('⏳ Uploading packet to Cloudinary...');
        finalAttachmentUrl = await uploadToCloudinary(file);
        finalAttachmentName = file.name;
        setMsg('✅ Packet staged. Finalizing notice...');
      }

      // Process tags
      const processedTags = selectedTags.length > 0 ? selectedTags : ['ALL'];
        
      const submissionData = {
        ...form,
        attachmentUrl: finalAttachmentUrl,
        attachmentName: finalAttachmentName,
        tags: processedTags.length > 0 ? processedTags : ['ALL']
      };

      await onSubmit(submissionData);

      // Ping the Push Notification engine if it is an Urgent or Important message
      if (form.urgency !== 'Normal') {
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `[${form.urgency.toUpperCase()}] ${form.category} Notice`,
            body: form.title,
            urgency: form.urgency,
            topic: 'ALL'
          })
        }).catch(err => console.log("Push failed:", err));
      }

      setMsg(isEdit ? '✅ Transaction Complete: Notice updated.' : '✅ Transaction Complete: Notice published to grid.');
      
      if (!isEdit) {
        setForm({
          title: '', body: '', category: 'Academic', tags: ['ALL'], urgency: 'Normal',
          expiryDate: '', isPinned: false, postedBy: '',
          attachmentUrl: '', attachmentName: '',
        });
        setSelectedTags(['ALL']);
      }
    } catch {
      setMsg('❌ Terminal Exception: Failed to complete operation.');
    } finally {
      setLoading(false);
    }
  };

  const inp = 'w-full px-4 py-3 rounded-2xl border border-border-subtle bg-bg-card-secondary/30 text-text-primary text-[14px] font-medium focus:border-charcoal focus:bg-white outline-none transition-all placeholder:text-text-muted';
  const lbl = 'block text-[11px] font-bold text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
        <label className={lbl}>Formal Notice Title <span className="text-danger">*</span></label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={120} className={inp} placeholder="e.g., Mid-Semester Examination Schedule" />
      </div>
      <div className="animate-fadeUp" style={{ animationDelay: '0.2s' }}>
        <label className={lbl}>Analytical Description <span className="text-danger">*</span></label>
        <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className={`${inp} resize-none`} placeholder="Detailed breakdown of the announcement content..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
        <div>
          <label className={lbl}>Institutional Category <span className="text-danger">*</span></label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className={inp}>
            {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className={lbl}>Active Expiry Date <span className="text-danger">*</span></label>
          <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className={inp} />
        </div>
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        <label className={lbl}>Issuer Identity (Faculty Name) <span className="text-danger">*</span></label>
        <input value={form.postedBy} onChange={(e) => setForm({ ...form, postedBy: e.target.value })} className={inp} placeholder="e.g., Dr. R.K. Sharma" />
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.5s' }}>
        <label className={lbl}>Target Demographic Tags <span className="text-danger">*</span></label>
        <div className="mt-1 border border-border-subtle p-5 rounded-2xl bg-white shadow-sm flex flex-col gap-4">
          <input value={selectedTags.join(', ')} readOnly className={`${inp} bg-bg-card-secondary border-dashed`} placeholder="ALL" />
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
          <p className="text-[11px] text-text-muted font-medium italic">Use "ALL" for wide distribution, or target specific academic streams.</p>
        </div>
      </div>

      <div className="animate-fadeUp" style={{ animationDelay: '0.6s' }}>
        <label className={lbl}>Urgency Classification</label>
        <div className="flex flex-wrap gap-4 p-5 rounded-2xl border border-border-subtle bg-bg-card-secondary/30">
          {(['Normal', 'Important', 'Urgent'] as Urgency[]).map((u) => (
            <label key={u} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${form.urgency === u ? 'bg-white border-border-strong border-2 shadow-sm' : 'bg-transparent border-transparent opacity-60 hover:opacity-100'}`}>
              <input type="radio" name="urgency" value={u} checked={form.urgency === u} onChange={() => setForm({ ...form, urgency: u })} className="w-4 h-4 accent-charcoal" />
              <span className={`text-[13px] font-bold ${form.urgency === u ? 'text-text-primary' : 'text-text-muted'}`}>{u}</span>
            </label>
          ))}
        </div>
      </div>
      
      {msg && (
        <div className={`p-5 rounded-2xl text-[13px] font-bold border animate-fadeUp ${msg.startsWith('✅') ? 'bg-soft-green text-charcoal border-emerald-100' : 'bg-soft-red text-charcoal border-red-100'}`}>
          {msg}
        </div>
      )}
      
      <button type="submit" disabled={loading} className="w-full h-16 rounded-2xl bg-charcoal hover:bg-black text-white font-bold text-sm transition-all mt-6 shadow-lg shadow-charcoal/20 hover:shadow-xl active:scale-[0.98] disabled:opacity-50">
        {loading ? 'MODULATING PACKETS...' : isEdit ? 'FINALIZE TRANSACTION' : 'COMMIT TO PLATFORM'}
      </button>
    </form>
  );
}
