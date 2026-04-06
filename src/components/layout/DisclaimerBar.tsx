'use client';

import { useInstitution } from '@/context/InstitutionContext';

export default function DisclaimerBar() {
  const { footerDisclaimer } = useInstitution();

  return (
    <div
      className="fixed bottom-[76px] lg:bottom-0 left-0 right-0 z-30 bg-charcoal/95 backdrop-blur-sm text-white/60 text-[10px] font-bold uppercase tracking-[0.12em] text-center py-2 px-4 border-t border-white/5 pointer-events-none select-none"
      role="contentinfo"
      aria-label="Disclaimer"
    >
      <p className="max-w-[1400px] mx-auto truncate px-4" title={footerDisclaimer}>
        🎓 {footerDisclaimer}
      </p>
    </div>
  );
}
