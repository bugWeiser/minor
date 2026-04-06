import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** 'default' = muted/bold, 'strong' = charcoal/black */
  subtitleVariant?: 'default' | 'strong';
  actions?: ReactNode;
  className?: string;
  border?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  subtitleVariant = 'default',
  actions,
  className = '',
  border = true,
}: SectionHeaderProps) {
  const subtitleClass = subtitleVariant === 'strong'
    ? 'text-charcoal font-black'
    : 'text-text-muted font-bold';

  return (
    <header
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 ${border ? 'border-b border-border-subtle' : ''} transition-all ${className}`}
    >
      <section>
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">{title}</h1>
        {subtitle && (
          <p className={`uppercase tracking-[0.12em] text-[11px] mt-2 cursor-default ${subtitleClass}`}>
            {subtitle}
          </p>
        )}
      </section>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
