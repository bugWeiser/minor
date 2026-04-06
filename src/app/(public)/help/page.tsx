import { LegalHeader, LegalSection } from '@/components/LegalContent';
import { HiOutlineQuestionMarkCircle, HiOutlineChatBubbleLeftRight, HiOutlineDocumentText } from 'react-icons/hi2';

export default function HelpPage() {
  return (
    <>
      <LegalHeader title="Help & Support" lastUpdated="April 06, 2026" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 bg-charcoal text-white rounded-[32px] space-y-6 shadow-2xl shadow-black/10 transition-transform hover:scale-[1.02]">
          <HiOutlineChatBubbleLeftRight className="w-10 h-10 text-institution-accent" />
          <div>
            <h3 className="text-xl font-black tracking-tight mb-2">Direct Contact</h3>
            <p className="text-sm font-bold opacity-80 leading-relaxed">Need technical assistance? Our support engineers are available during institutional business hours.</p>
          </div>
          <a href="mailto:support@bugweiser.edu" className="inline-block px-6 py-3 bg-white text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-100 transition-colors">
            Email Support
          </a>
        </div>

        <div className="p-8 bg-white border border-border-subtle rounded-[32px] space-y-6 shadow-sm hover:shadow-md transition-all">
          <HiOutlineDocumentText className="w-10 h-10 text-charcoal" />
          <div>
            <h3 className="text-xl font-black tracking-tight mb-2">Documentation</h3>
            <p className="text-sm font-bold text-text-muted leading-relaxed">Comprehensive guides for administrators and students are available in our central knowledge base.</p>
          </div>
          <button className="inline-block px-6 py-3 bg-charcoal text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-colors">
            Browse Guides
          </button>
        </div>
      </div>

      <LegalSection title="Frequently Asked Questions">
        <div className="space-y-8 mt-6">
          <div className="space-y-2">
            <h4 className="text-sm font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
              <HiOutlineQuestionMarkCircle className="w-4 h-4 text-institution-accent" />
              How do I login for the first time?
            </h4>
            <p className="text-xs font-bold leading-relaxed">Use the institutional credentials provided by your IT department. Typically, your university email and a default password that you change on first entry.</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
              <HiOutlineQuestionMarkCircle className="w-4 h-4 text-institution-accent" />
              Why am I not seeing any notices?
            </h4>
            <p className="text-xs font-bold leading-relaxed">Notices are targeted based on your department and year. If you haven&apos;t joined a course or department in your profile, your dashboard may appear empty. Visit &apos;Settings&apos; to update your academic status.</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
              <HiOutlineQuestionMarkCircle className="w-4 h-4 text-institution-accent" />
              Can I access Bugweiser on my phone?
            </h4>
            <p className="text-xs font-bold leading-relaxed">Yes! Bugweiser is a Progressive Web App (PWA) fully optimized for mobile browsers. You can even &quot;Add to Home Screen&quot; for a native app experience.</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black text-charcoal uppercase tracking-widest flex items-center gap-2">
              <HiOutlineQuestionMarkCircle className="w-4 h-4 text-institution-accent" />
              Is my personal data safe?
            </h4>
            <p className="text-xs font-bold leading-relaxed">Absolutely. We use strict multi-tenant isolation and encryption. We do not sell student data, and all information is governed by your institution&apos;s privacy policy.</p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="Admin Help">
        <p>If you are an institutional administrator, please refer to the <strong>&quot;Getting Started with Bugweiser&quot;</strong> checklist located in your Administrative Dashboard sidebar. This guide covers bulk student imports, targeting engine configuration, and branding customization.</p>
      </LegalSection>
    </>
  );
}
