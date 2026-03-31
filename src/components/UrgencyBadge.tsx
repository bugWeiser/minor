import Badge, { BadgeVariant } from './ui/Badge';

interface Props {
  urgency: 'Normal' | 'Important' | 'Urgent';
  className?: string;
}

export default function UrgencyBadge({ urgency, className = '' }: Props) {
  if (urgency === 'Normal') return null;

  let variant: BadgeVariant = 'Pending';
  
  if (urgency === 'Important') variant = 'In Review';
  else if (urgency === 'Urgent') variant = 'Pending';

  return <Badge variant={variant} forceText={urgency} className={className} />;
}
