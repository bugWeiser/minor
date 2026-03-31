'use client';
import { useState } from 'react';
import { Category, Urgency, NoticeFormData } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { uploadToCloudinary } from '@/lib/cloudinary';
import TagSelector from './admin/TagSelector';
import { HiOutlineArrowUpTray, HiOutlineCalendarDays, HiOutlineCheckCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2';

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

  const inp = 'w-full h-14 px-5 rounded-2xl border border-border-subtle bg-bg-card-secondary text-[14px] font-bold text-text-primary placeholder:text-text-muted focus:bg-white focus:shadow-xl focus:border-charcoal outline-none transition-all';
  const lbl = 'block text-[11px] font-black text-text-muted uppercase tracking-[0.14em] mb-2.5 ml-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className={lbl}>Announcement Heading <span className="text-danger">*</span></label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={120} className={inp} placeholder="Title of notice (Brief and clear)" />
      </div>
      <div>
        <label className={lbl}>Content Protocol <span className="text-danger">*</span></label>
        <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className={`${inp} !h-auto py-5 resize-none`} placeholder="Detailed body of the notification..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Category Selection <span className="text-danger">*</span></label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className={inp}>
            {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className={lbl}>Expiration Timestamp <span className="text-danger">*</span></label>
          <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>Broadcast Audience Network <span className="text-danger">*</span></label>
        <div className="bg-bg-card-secondary p-5 rounded-2xl border border-dashed border-border-strong group-hover:border-charcoal/20 transition-all">
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>
      <div>
        <label className={lbl}>Priority Level</label>
        <div className="flex flex-wrap gap-6 bg-bg-card-secondary p-6 rounded-2xl border border-border-subtle">
          {(['Normal', 'Important', 'Urgent'] as Urgency[]).map((u) => (
            <label key={u} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="urgency" value={u} checked={form.urgency === u} onChange={() => setForm({ ...form, urgency: u })} className="accent-charcoal w-5 h-5" />
              <span className={`text-[13px] font-black transition-colors ${form.urgency === u ? 'text-charcoal' : 'text-text-muted group-hover:text-text-primary uppercase tracking-widest'}`}>{u}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className={`flex items-center gap-4 p-5 border-2 rounded-2xl transition-all cursor-pointer ${form.isPinned ? 'bg-soft-yellow/30 border-warning/50' : 'bg-bg-card-secondary border-transparent hover:border-warning/30'}`} onClick={() => setForm({ ...form, isPinned: !form.isPinned })}>
        <input type="checkbox" checked={form.isPinned} onChange={(e) => setForm({ ...form, isPinned: e.target.checked })} className="accent-warning w-5 h-5 rounded cursor-pointer" />
        <div className="flex-1">
           <p className="text-[14px] font-black text-charcoal flex items-center gap-2">Pinnable Protocol {form.isPinned && <HiOutlineCalendarDays className="w-4 h-4 text-warning" />}</p>
           <p className="text-[11px] font-bold text-text-muted mt-0.5">Anchors this announcement to the top of the grid feed.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={lbl}>Authorized Originator <span className="text-danger">*</span></label>
          <input value={form.postedBy} onChange={(e) => setForm({ ...form, postedBy: e.target.value })} className={inp} placeholder="Faculty Member or Dept Name" />
        </div>
        <div>
          <label className={lbl}>Document Payload (Cloudinary)</label>
          <div className="relative">
            <input 
              type="file" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])} 
              className={`${inp} file:hidden p-3 pt-[14px] text-text-muted cursor-pointer`} 
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <HiOutlineArrowUpTray className="w-5 h-5 text-text-muted" />
            </div>
            {form.attachmentUrl && !file && (
              <p className="absolute bottom-[-18px] left-1 text-[10px] font-black text-charcoal uppercase tracking-widest truncate max-w-full">Staged: {form.attachmentUrl}</p>
            )}
          </div>
        </div>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-[13px] font-black flex items-center gap-3 animate-fadeUp ${msg.startsWith('✅') ? 'bg-soft-green text-charcoal border border-emerald-200' : 'bg-soft-red text-danger border border-red-200'}`}>
          {msg.startsWith('✅') ? <HiOutlineCheckCircle className="w-5 h-5" /> : <HiOutlineExclamationTriangle className="w-5 h-5" />}
          {msg}
        </div>
      )}
      
      <button type="submit" disabled={loading} className="w-full h-16 rounded-[22px] bg-charcoal hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3">
        {loading ? '⏳ Processing Request...' : isEdit ? '✏️ Update Transaction' : '🚀 Publish to Grid'}
      </button>
    </form>
  );
}
