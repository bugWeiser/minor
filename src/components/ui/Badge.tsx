import { 
  HiOutlineExclamationTriangle, 
  HiOutlineEllipsisHorizontalCircle, 
  HiOutlinePaperAirplane, 
  HiOutlineArrowPath, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle, 
  HiOutlineClock 
} from 'react-icons/hi2';

export type BadgeVariant = 'Pending' | 'In Progress' | 'Submitted' | 'In Review' | 'Success' | 'Failed' | 'Expired';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
  forceText?: string;
}

const BADGE_CONFIG: Record<BadgeVariant, { bg: string, text: string, icon: any }> = {
  'Pending': { bg: 'bg-soft-yellow border-amber-100', text: 'text-warning', icon: HiOutlineExclamationTriangle },
  'In Progress': { bg: 'bg-soft-blue border-blue-100', text: 'text-charcoal', icon: HiOutlineEllipsisHorizontalCircle },
  'Submitted': { bg: 'bg-soft-blue border-blue-100', text: 'text-charcoal', icon: HiOutlinePaperAirplane },
  'In Review': { bg: 'bg-soft-yellow border-amber-100', text: 'text-warning', icon: HiOutlineArrowPath },
  'Success': { bg: 'bg-soft-green border-emerald-100', text: 'text-charcoal', icon: HiOutlineCheckCircle },
  'Failed': { bg: 'bg-soft-red border-red-100', text: 'text-danger', icon: HiOutlineXCircle },
  'Expired': { bg: 'bg-bg-card-secondary border-border-subtle', text: 'text-text-muted', icon: HiOutlineClock },
};

export default function Badge({ variant, className = '', forceText }: BadgeProps) {
  const config = BADGE_CONFIG[variant] || BADGE_CONFIG['Expired'];
  const Icon = config.icon;
  const label = forceText || variant;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border shadow-sm transition-all hover:shadow-md ${config.bg} ${config.text} ${className}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
      {label}
    </span>
  );
}
