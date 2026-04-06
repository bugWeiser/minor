import React from 'react';

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-10 animate-fadeUp" aria-labelledby={title.toLowerCase().replace(/\s+/g, '-')}>
      <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className="text-xs font-black uppercase tracking-[0.2em] text-charcoal mb-4 opacity-80">{title}</h2>
      <div className="text-sm font-bold text-text-muted leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

export function LegalHeader({ title, lastUpdated }: { title: string; lastUpdated: string }) {
  return (
    <div className="mb-16 animate-fadeDown">
      <h1 className="text-4xl font-black tracking-tighter text-charcoal mb-4">{title}</h1>
      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
        <span>Version 1.1 (Pilot)</span>
        <span className="w-1 h-1 rounded-full bg-border-subtle" />
        <span>Last Updated: {lastUpdated}</span>
      </div>
    </div>
  );
}
