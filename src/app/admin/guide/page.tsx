import Link from 'next/link';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineUserGroup, 
  HiOutlinePaintBrush, 
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineCheckBadge,
  HiOutlineInformationCircle
} from 'react-icons/hi2';

export default function AdminGuidePage() {
  const STEPS = [
    {
      title: "1. Brand Your Campus",
      desc: "Upload your institution's logo and set your primary accent color. This color is dynamically injected into the student dashboard, mobile interface, and email notifications.",
      icon: HiOutlinePaintBrush,
      link: "/admin/settings",
      linkText: "Configure Branding"
    },
    {
      title: "2. Bulk Import Students",
      desc: "Upload your student registry using our CSV template. Map students to departments and years to enable the adaptive targeting engine.",
      icon: HiOutlineUserGroup,
      link: "/admin",
      linkText: "Manage Directory"
    },
    {
      title: "3. Publish First Notice",
      desc: "Create an announcement. Use 'Urgent' for immediate visibility or 'Normal' for general updates. Pin important notices to the top of the student board.",
      icon: HiOutlineEnvelope,
      link: "/admin",
      linkText: "Notice Composer"
    },
    {
      title: "4. Verify Personalization",
      desc: "Use the 'Reviewer Tools' in the top bar to switch between student personas. Ensure that targeted notices are only visible to the intended departments.",
      icon: HiOutlineCheckBadge,
      link: "/dashboard",
      linkText: "Test Student View"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-12 animate-fadeUp">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="w-16 h-16 rounded-[28px] bg-charcoal text-institution-accent flex items-center justify-center mx-auto shadow-2xl shadow-charcoal/20 mb-6">
          <HiOutlineRocketLaunch className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-charcoal tracking-tighter">Pilot Setup Guide</h1>
        <p className="text-lg font-bold text-text-muted max-w-2xl mx-auto leading-relaxed">
          Follow these steps to transition your institution from a blank slate to a fully personalized student communication hub.
        </p>
      </section>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {STEPS.map((step, i) => (
          <div key={i} className="group p-8 bg-white border border-border-subtle rounded-[32px] hover:border-charcoal/20 transition-all hover:shadow-xl hover:shadow-black/[0.02]">
            <div className="w-12 h-12 rounded-2xl bg-bg-card-secondary text-charcoal flex items-center justify-center mb-6 group-hover:bg-charcoal group-hover:text-white transition-all">
              <step.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-charcoal tracking-tight mb-3">{step.title}</h3>
            <p className="text-sm font-bold text-text-muted leading-relaxed mb-8">
              {step.desc}
            </p>
            <Link 
              href={step.link}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-charcoal hover:gap-4 transition-all"
            >
              {step.linkText} <HiOutlineArrowRight className="w-4 h-4 text-institution-accent" />
            </Link>
          </div>
        ))}
      </div>

      {/* Support Callout */}
      <section className="p-8 bg-charcoal text-white rounded-[40px] shadow-2xl shadow-charcoal/30 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <HiOutlineInformationCircle className="w-32 h-32" />
        </div>
        <div className="flex-1 space-y-3 z-10">
          <h2 className="text-2xl font-black tracking-tight">Need Pilot Assistance?</h2>
          <p className="text-sm font-bold opacity-70 leading-relaxed">
            Our engineering team can assist with high-fidelity branding, existing database migrations, or custom SSO integrations for your campus.
          </p>
        </div>
        <a 
          href="mailto:pilot@bugweiser.edu"
          className="px-8 py-4 bg-institution-accent text-charcoal text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all transform active:scale-95 z-10"
        >
          Contact Solution Architect
        </a>
      </section>

      <div className="text-center pt-8">
        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] opacity-40">
          Bugweiser SaaS &bull; Pilot Administration Kit &bull; v1.2.0
        </p>
      </div>
    </div>
  );
}
