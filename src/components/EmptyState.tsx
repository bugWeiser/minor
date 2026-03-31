import { ReactNode } from 'react';
import { HiOutlineInboxStack } from 'react-icons/hi2';

interface EmptyStateProps {
  icon?: ReactNode;
  message: string;
  sub?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, message, sub, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center card-shell bg-white border-dashed border-border-subtle hover:border-border-strong group animate-fadeUp">
      <div className="w-20 h-20 bg-bg-card-secondary rounded-[32px] flex items-center justify-center mb-8 text-text-muted border border-border-subtle group-hover:bg-accent group-hover:text-charcoal group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-6">
        <div className="text-3xl">
          {icon || <HiOutlineInboxStack className="w-10 h-10" />}
        </div>
      </div>
      <h3 className="text-2xl font-black text-charcoal tracking-tighter mb-2 group-hover:text-black transition-colors">{message}</h3>
      {sub && (
        <p className="text-[13px] font-bold text-text-muted uppercase tracking-widest max-w-sm mb-10 leading-relaxed opacity-60">
          {sub}
        </p>
      )}
      {action && (
        <div className="relative z-10 transition-transform active:scale-95">
          {action}
        </div>
      )}
    </div>
  );
}
