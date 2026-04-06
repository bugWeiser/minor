'use client';

import Link from 'next/link';
import RoleGuard from '@/components/auth/RoleGuard';
import { 
  HiOutlineBuildingLibrary, 
  HiOutlineAcademicCap, 
  HiOutlineSpeakerWave, 
  HiOutlineShieldCheck,
  HiOutlineChevronRight,
  HiOutlineInformationCircle
} from 'react-icons/hi2';

const SETTINGS_GROUPS = [
  {
    title: 'Institutional Foundation',
    items: [
      { 
        id: 'org',
        label: 'Organization Configuration', 
        description: 'Identity, branding, contact details, and academy cycle.', 
        icon: HiOutlineBuildingLibrary, 
        href: '/admin/settings/organization',
        status: 'Active',
        isPlanned: false
      },
      { 
        id: 'academic',
        label: 'Academic Architecture', 
        description: 'Define departments, programs, and academic sections.', 
        icon: HiOutlineAcademicCap, 
        href: '/admin/academic',
        status: 'Active',
        isPlanned: false
      }
    ]
  },
  {
    title: 'Platform Operations',
    items: [
      { 
        id: 'notifications',
        label: 'Notification Defaults', 
        description: 'Global notification channels and behavior presets.', 
        icon: HiOutlineSpeakerWave, 
        href: '#',
        status: 'Placeholder',
        isPlanned: true
      },
      { 
        id: 'security',
        label: 'Security & Access Control', 
        description: 'Capability mappings and institutional audit settings.', 
        icon: HiOutlineShieldCheck, 
        href: '#',
        status: 'Static',
        isPlanned: true
      }
    ]
  }
];

export default function InstitutionSettingsHub() {
  return (
    <RoleGuard requiredCapability="canManageInstitution">
      <div className="max-w-4xl mx-auto p-6 pb-24 animate-fadeUp">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-charcoal tracking-tight">Institution Control Hub</h1>
          <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em] mt-2">
            Centralized Platform Governance • SaaS Onboarding
          </p>
        </header>

        <div className="space-y-12">
          {SETTINGS_GROUPS.map((group, gIdx) => (
            <section key={gIdx}>
              <h2 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-6 pl-1 opacity-50">
                {group.title}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {group.items.map((item, iIdx) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      group relative flex items-center gap-6 p-6 bg-white border border-border-subtle rounded-[28px] transition-all
                      ${item.isPlanned ? 'opacity-70 grayscale cursor-not-allowed' : 'hover:border-charcoal hover:shadow-xl hover:shadow-black/5'}
                    `}
                    onClick={(e) => item.isPlanned && e.preventDefault()}
                  >
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                      ${item.status === 'Active' ? 'bg-accent text-charcoal group-hover:bg-charcoal group-hover:text-white' : 'bg-bg-card-secondary text-text-muted'}
                    `}>
                      <item.icon className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-[17px] font-black text-charcoal tracking-tight">{item.label}</h3>
                          {item.status === 'Placeholder' && (
                             <span className="text-[9px] font-black text-text-muted bg-bg-card-secondary px-2 py-0.5 rounded-md border border-border-subtle uppercase tracking-widest">
                               Coming Soon
                             </span>
                          )}
                       </div>
                       <p className="text-sm font-medium text-text-muted opacity-60 max-w-md">{item.description}</p>
                    </div>

                    {!item.isPlanned && (
                      <HiOutlineChevronRight className="w-5 h-5 text-text-muted group-hover:text-charcoal transition-all group-hover:translate-x-1" />
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-border-subtle border-dashed">
           <div className="bg-soft-blue/30 border border-border-subtle rounded-3xl p-6 flex gap-5">
              <HiOutlineInformationCircle className="w-6 h-6 text-text-muted shrink-0 mt-1" />
              <div>
                 <h4 className="text-sm font-black text-charcoal mb-1">Onboarding Logic Active</h4>
                 <p className="text-xs font-bold text-text-muted leading-relaxed">
                   Settings modified here take immediate effect across the entire institutional tenant. 
                   Visit the <Link href="/admin" className="text-charcoal underline decoration-accent decoration-2 underline-offset-2">Operational Dashboard</Link> to view real-time impact.
                 </p>
              </div>
           </div>
        </footer>
      </div>
    </RoleGuard>
  );
}
:
