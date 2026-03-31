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

  const inp = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:border-[#5534FA] focus:ring-1 focus:ring-[#5534FA] outline-none transition-all';
  const lbl = 'block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={lbl}>TITLE <span className="text-red-500">*</span></label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={120} className={inp} placeholder="Notice title" />
      </div>
      <div>
        <label className={lbl}>DESCRIPTION <span className="text-red-500">*</span></label>
        <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={5} className={`${inp} resize-none`} placeholder="Notice description" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={lbl}>CATEGORY <span className="text-red-500">*</span></label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className={inp}>
            {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className={lbl}>EXPIRY DATE <span className="text-red-500">*</span></label>
          <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>TARGET TAGS (COMMA SEPARATED) <span className="text-red-500">*</span></label>
        <input value={selectedTags.join(', ')} readOnly className={inp} placeholder="ALL" />
        <p className="text-xs text-gray-400 mt-2">Use "ALL" for public notices, or target specific groups like "CSE-3".</p>
        <div className="mt-4 border border-gray-100 p-4 rounded-xl">
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>
      </div>
      <div>
        <label className={lbl}>URGENCY</label>
        <div className="flex flex-wrap gap-6 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
          {(['Normal', 'Important', 'Urgent'] as Urgency[]).map((u) => (
            <label key={u} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="urgency" value={u} checked={form.urgency === u} onChange={() => setForm({ ...form, urgency: u })} className="w-4 h-4 text-[#5534FA] focus:ring-[#5534FA]" />
              <span className={`text-sm font-semibold ${form.urgency === u ? 'text-gray-900' : 'text-gray-600'}`}>{u}</span>
            </label>
          ))}
        </div>
      </div>
      
      {msg && (
        <div className={`p-4 rounded-xl text-sm font-medium ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {msg}
        </div>
      )}
      
      <button type="submit" disabled={loading} className="w-full h-14 rounded-xl bg-[#5534FA] hover:bg-[#4320E0] text-white font-bold text-sm transition-colors mt-8">
        {loading ? 'Processing...' : isEdit ? 'Update Notice' : 'Post Notice'}
      </button>
    </form>
  );
}
