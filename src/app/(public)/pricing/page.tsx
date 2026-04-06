import { LegalHeader, LegalSection } from '@/components/LegalContent';
import { HiOutlineCheckBadge, HiOutlineAcademicCap, HiOutlineBuildingOffice2, HiOutlineSparkles } from 'react-icons/hi2';

export default function PricingPage() {
  return (
    <>
      <LegalHeader title="Pilot Pricing" lastUpdated="April 06, 2026" />
      
      <div className="prose prose-sm max-w-none mb-16 text-text-muted font-bold leading-relaxed">
        <p className="text-lg text-charcoal">
          Modular pricing built to scale with your institution. During our current Pilot Phase, we offer exclusive tiers for early adopters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Starter Tier */}
        <div className="flex flex-col p-8 bg-white border border-border-subtle rounded-[32px] space-y-6 hover:border-charcoal/20 transition-colors group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-charcoal/5 text-text-muted flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-colors">
              <HiOutlineAcademicCap className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-charcoal uppercase tracking-widest pt-2">Starter</h3>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">For Single Depts</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tighter text-charcoal">$49</span>
            <span className="text-xs font-bold text-text-muted">/dept/mo</span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              Up to 500 Students
            </li>
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              Smart Notices
            </li>
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted opacity-40 italic">
              Academic Calendar
            </li>
          </ul>
          <button className="w-full py-3 bg-white border border-border-subtle text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-50 transition-colors">
            Start Pilot
          </button>
        </div>

        {/* Professional Tier */}
        <div className="flex flex-col p-8 bg-charcoal text-white rounded-[32px] space-y-6 shadow-2xl shadow-black/20 ring-4 ring-institution-accent ring-offset-4 ring-offset-bg-page relative overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-4">
            <HiOutlineSparkles className="w-6 h-6 text-institution-accent animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-institution-accent text-charcoal flex items-center justify-center">
              <HiOutlineBuildingOffice2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest pt-2">Professional</h3>
            <p className="text-[10px] font-black text-institution-accent uppercase tracking-widest">For Colleges</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tighter text-white">$199</span>
            <span className="text-xs font-bold opacity-60">/inst/mo</span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="flex items-start gap-2 text-xs font-bold opacity-80">
              <HiOutlineCheckBadge className="w-4 h-4 text-institution-accent mt-0.5" />
              Up to 5,000 Students
            </li>
            <li className="flex items-start gap-2 text-xs font-bold opacity-80">
              <HiOutlineCheckBadge className="w-4 h-4 text-institution-accent mt-0.5" />
              Smart Notices + Calendar
            </li>
            <li className="flex items-start gap-2 text-xs font-bold opacity-80">
              <HiOutlineCheckBadge className="w-4 h-4 text-institution-accent mt-0.5" />
              Assignment Tracker
            </li>
            <li className="flex items-start gap-2 text-xs font-bold opacity-80">
              <HiOutlineCheckBadge className="w-4 h-4 text-institution-accent mt-0.5" />
              Custom Org Branding
            </li>
          </ul>
          <button className="w-full py-3 bg-institution-accent text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all transform active:scale-95 shadow-lg shadow-institution-accent/20">
            Selected Tier
          </button>
        </div>

        {/* Enterprise Tier */}
        <div className="flex flex-col p-8 bg-white border border-border-subtle rounded-[32px] space-y-6 hover:border-charcoal/20 transition-colors group">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-charcoal/5 text-text-muted flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-colors">
              <HiOutlineSparkles className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-charcoal uppercase tracking-widest pt-2">Enterprise</h3>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">For Large Universities</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tighter text-charcoal">Custom</span>
          </div>
          <ul className="flex-1 space-y-4">
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              Unlimited Students
            </li>
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              Full White-label Support
            </li>
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              Multi-Campus Tenancy
            </li>
            <li className="flex items-start gap-2 text-xs font-bold text-text-muted">
              <HiOutlineCheckBadge className="w-4 h-4 text-success mt-0.5" />
              24/7 Dedicated Support
            </li>
          </ul>
          <button className="w-full py-3 bg-white border border-border-subtle text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neutral-50 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>

      <LegalSection title="Institution Size Framing">
        <p>Our pricing is designed to grow with you. We do not charge per registered user, but by institutional capacity and active student load. This ensures that smaller pilot departments can start affordable and scale as they see the personalization benefits.</p>
      </LegalSection>

      <LegalSection title="Early Adopter Advantage">
        <p>Institutions joining during the pilot phase (Q2 2026) qualify for a lifetime lock-in on starter rates and free priority onboarding assistance for their IT registrars.</p>
      </LegalSection>
    </>
  );
}
