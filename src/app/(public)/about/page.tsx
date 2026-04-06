import { LegalHeader, LegalSection } from '@/components/LegalContent';
import { HiOutlineUserCircle, HiOutlineMegaphone, HiOutlineCalendarDays, HiOutlineClipboardDocumentList, HiOutlineShieldCheck, HiOutlineCpuChip } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <>
      <LegalHeader title="About Bugweiser" lastUpdated="April 06, 2026" />
      
      <div className="prose prose-sm max-w-none mb-16 text-text-muted font-bold leading-relaxed">
        <p className="text-lg text-charcoal">
          Bugweiser is a powerful, organization-aware student communication platform designed to solve the &quot;information overload&quot; problem in modern educational campuses.
        </p>
      </div>

      <LegalSection title="The Problem">
        <p>In large institutions, students are often bombarded with irrelevant emails, group messages, and physical posters. Vital academic information—like exam schedule changes or placement deadlines—gets lost in the noise.</p>
      </LegalSection>

      <LegalSection title="The Bugweiser Solution">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="p-6 bg-white border border-border-subtle rounded-[24px] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-institution-accent/10 text-institution-accent flex items-center justify-center">
              <HiOutlineCpuChip className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-charcoal uppercase tracking-widest">Adaptive Targeting</h3>
            <p className="text-xs font-bold leading-relaxed">Our targeting engine ensures that notices only reach the students they concern—filtered by department, course, year, and specific tags.</p>
          </div>

          <div className="p-6 bg-white border border-border-subtle rounded-[24px] space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-charcoal/5 text-charcoal flex items-center justify-center">
              <HiOutlineShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-charcoal uppercase tracking-widest">SaaS Tenancy</h3>
            <p className="text-xs font-bold leading-relaxed">Built with a hardened multi-tenant architecture, Bugweiser isolates data for each institution while providing a premium, branded experience.</p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Core Modules">
        <div className="space-y-6 mt-6">
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <HiOutlineMegaphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-charcoal uppercase tracking-widest mb-1">Smart Notices</h4>
              <p className="text-xs font-bold leading-relaxed">Categorized announcements (Academic, Events, Placement) with priority levels and expiry dates.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <HiOutlineCalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-charcoal uppercase tracking-widest mb-1">Academic Calendar</h4>
              <p className="text-xs font-bold leading-relaxed">Institutional events and exam schedules synchronized directly to the student&apos;s personal view.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-charcoal uppercase tracking-widest mb-1">Assignment Tracking</h4>
              <p className="text-xs font-bold leading-relaxed">A unified task list for submission deadlines, helping students stay ahead of their coursework.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-charcoal/5 text-charcoal flex items-center justify-center">
              <HiOutlineUserCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-charcoal uppercase tracking-widest mb-1">Personalization</h4>
              <p className="text-xs font-bold leading-relaxed">User profiles that automatically filter content based on institutional identity and academic status.</p>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Why Education Leaders Choose Us">
        <p>Bugweiser provides deans, principals, and registrars with a centralized control plane. It reduces physical clutter, eliminates &quot;forgotten&quot; notices, and provides a modern, cloud-first interface that students actually want to use.</p>
      </LegalSection>
    </>
  );
}
