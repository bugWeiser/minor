'use client';

import { useState, useEffect, useRef } from 'react';
import { useInstitution } from '@/context/InstitutionContext';
import { useAdminInstitution } from '@/hooks/useAdminInstitution';
import RoleGuard from '@/components/auth/RoleGuard';
import { 
  HiOutlineBuildingLibrary, 
  HiOutlineSwatch, 
  HiOutlineGlobeAlt, 
  HiOutlineEnvelope, 
  HiOutlineMapPin, 
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle
} from 'react-icons/hi2';

const PRESET_COLORS = [
  { name: 'Neon Lime', value: '#D9FF3F' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Sky', value: '#0EA5E9' },
];

export default function OrganizationSettingsPage() {
  const institution = useInstitution();
  const { updateConfig, loading: saving, error: saveError } = useAdminInstitution();
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logoUrl: '',
    accentColor: '',
    contactEmail: '',
    address: '',
    academicYear: '',
    footerDisclaimer: ''
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!institution.loading) {
      setFormData({
        name: institution.name,
        slug: institution.slug,
        logoUrl: institution.logoUrl,
        accentColor: institution.accentColor,
        contactEmail: institution.contactEmail,
        address: institution.address,
        academicYear: institution.academicYear,
        footerDisclaimer: institution.footerDisclaimer || ''
      });
    }
  }, [institution]);

  // Fix for "No Inline Tool" - apply colors via DOM
  useEffect(() => {
    // Apply preset colors
    const presetBtns = document.querySelectorAll('.preset-color-btn');
    presetBtns.forEach((btn: any) => {
      const color = btn.getAttribute('data-color');
      if (color) btn.style.backgroundColor = color;
    });

    // Apply active accent preview
    const previews = document.querySelectorAll('.accent-preview-box, .main-accent-preview');
    previews.forEach((el: any) => {
      el.style.backgroundColor = formData.accentColor;
    });
  }, [formData.accentColor, institution.loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateConfig(formData);
      await institution.refreshConfig();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const isSlugValid = /^[a-z0-9-]{3,50}$/.test(formData.slug);

  if (institution.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <RoleGuard requiredCapability="canManageInstitution">
      <div className="max-w-4xl mx-auto p-6 pb-24 animate-fadeUp">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-charcoal tracking-tight">Institution Configuration</h1>
          <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">
            Base Identity • SaaS Onboarding Layer
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identity Section */}
          <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                <HiOutlineBuildingLibrary className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal tracking-tight">Institutional identity</h3>
                <p className="text-xs font-bold text-text-muted opacity-60">Global naming and platform slugs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1">Full Legal Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bugweiser State University"
                  className="w-full h-14 bg-bg-page border border-border-subtle rounded-2xl px-5 text-[15px] font-bold focus:border-charcoal focus:ring-1 focus:ring-charcoal outline-none transition-all preset-color-btn"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1">URL Identifier (Slug)</label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="bugweiser-u"
                    title="Institution Slug"
                    className={`w-full h-14 bg-bg-page border rounded-2xl px-5 text-[15px] font-bold outline-none transition-all preset-color-btn ${isSlugValid ? 'border-border-subtle focus:border-charcoal' : 'border-danger focus:border-danger'}`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-text-muted opacity-30">
                    3-50 chars
                  </div>
                </div>
                {!isSlugValid && formData.slug.length > 0 && (
                  <p className="text-[10px] font-bold text-danger mt-1.5 pl-1">3-50 chars, lowercase, alphanumeric, and hyphens only.</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                <HiOutlineGlobeAlt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal tracking-tight">Deployment parameters</h3>
                <p className="text-xs font-bold text-text-muted opacity-60">Communication and cycle defaults</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 flex items-center gap-1.5">
                  <HiOutlineEnvelope className="w-3 h-3" /> Admin Support Email
                </label>
                <input 
                  type="email"
                  required
                  title="Admin Support Email"
                  value={formData.contactEmail}
                  onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full h-14 bg-bg-page border border-border-subtle rounded-2xl px-5 text-[15px] font-bold outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 flex items-center gap-1.5">
                  <HiOutlineCalendar className="w-3 h-3" /> Active Academic Cycle
                </label>
                <input 
                  type="text"
                  required
                  value={formData.academicYear}
                  onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                  placeholder="2026-T1"
                  title="Academic Cycle"
                  className="w-full h-14 bg-bg-page border border-border-subtle rounded-2xl px-5 text-[15px] font-bold outline-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 flex items-center gap-1.5">
                   <HiOutlineMapPin className="w-3 h-3" /> Institutional Address
                </label>
                <textarea 
                  rows={2}
                  title="Institutional Address"
                  placeholder="Official campus address..."
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-bg-page border border-border-subtle rounded-2xl p-5 text-[15px] font-bold outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 flex items-center gap-1.5">
                     Footer Disclaimer / Institutional Asset Label
                  </label>
                  <span className={`text-[9px] font-bold ${formData.footerDisclaimer.length > 450 ? 'text-danger' : 'text-text-muted opacity-40'}`}>
                    {formData.footerDisclaimer.length} / 500
                  </span>
                </div>
                <textarea 
                  rows={2}
                  maxLength={500}
                  title="Footer Disclaimer Text"
                  placeholder="Official Institutional Asset. Unauthorized redistribution prohibited."
                  value={formData.footerDisclaimer}
                  onChange={e => setFormData({ ...formData, footerDisclaimer: e.target.value })}
                  className="w-full bg-bg-page border border-border-subtle rounded-2xl p-5 text-[15px] font-bold outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Branding Section */}
          <div className="bg-white border border-border-subtle rounded-[32px] p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-charcoal text-white flex items-center justify-center">
                <HiOutlineSwatch className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-charcoal tracking-tight">Institutional Branding</h3>
                <p className="text-xs font-bold text-text-muted opacity-60">Accent color and visuals</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 block mb-3">Primary Accent Palette</label>
                   <div className="flex flex-wrap gap-3">
                     {PRESET_COLORS.map(color => (
                       <button
                         key={color.value}
                         type="button"
                         onClick={() => setFormData({ ...formData, accentColor: color.value })} data-color={color.value}
                         className={`w-10 h-10 rounded-xl border-2 transition-all preset-color-btn ${formData.accentColor === color.value ? 'border-charcoal scale-110' : 'border-transparent hover:scale-105'}`}
                         
                         title={`Select ${color.name} as accent color`}
                         aria-label={`Select ${color.name} color`}
                       />
                     ))}
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-text-muted pl-1 block">Custom Hex Value</label>
                   <div className="flex gap-3">
                      <input 
                        type="text"
                        title="Accent Color Hex Value"
                        placeholder="#D9FF3F"
                        value={formData.accentColor}
                        onChange={e => setFormData({ ...formData, accentColor: e.target.value.toUpperCase() })}
                        className="w-full h-12 bg-bg-page border border-border-subtle rounded-xl px-4 text-sm font-black tracking-widest outline-none"
                      />
                      <div 
                        className="w-12 h-12 rounded-xl border border-border-subtle shrink-0 accent-preview-box" 
                      />
                   </div>
                 </div>
              </div>

              <div className="bg-bg-page/50 rounded-2xl p-6 border border-border-subtle flex flex-col justify-center items-center text-center">
                 <div 
                   className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-black/5 main-accent-preview" 
                 >
                   <HiOutlineBuildingLibrary className="w-8 h-8" />
                 </div>
                 <h4 className="text-sm font-black text-charcoal">Visual Preview</h4>
                 <p className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-widest">Live Dynamic Sync Active</p>
              </div>
            </div>
          </div>

          {/* Submit Flow */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              {success && (
                <div className="flex items-center gap-2 text-success animate-fadeUp">
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Changes deployed successfuly</span>
                </div>
              )}
              {saveError && (
                <div className="flex items-center gap-2 text-danger animate-fadeUp">
                  <HiOutlineExclamationCircle className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">{saveError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving || !isSlugValid}
              title={isSlugValid ? "Save and deploy these settings" : "Correct slug errors to deploy"}
              className="px-12 h-16 bg-charcoal text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-charcoal/20 hover:bg-black transition-all preset-color-btn disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {saving ? 'Syncing...' : 'Deploy Configuration'}
            </button>
          </div>
        </form>
      </div>
    </RoleGuard>
  );
}
