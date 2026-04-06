'use client';

import { HiOutlineMegaphone, HiOutlineCalendarDays, HiOutlineClipboardDocumentList, HiOutlineDocumentText } from 'react-icons/hi2';

interface MetricProps {
  label: string;
  value: number;
  subValue?: string;
  icon: any;
  variant: 'primary' | 'success' | 'warning' | 'neutral';
}

const VARIANT_MAP = {
  primary: {
    border: 'border-b-indigo-500',
    iconBg: 'bg-indigo-500/20',
    iconText: 'text-indigo-500'
  },
  success: {
    border: 'border-b-success',
    iconBg: 'bg-success/20',
    iconText: 'text-success'
  },
  warning: {
    border: 'border-b-warning',
    iconBg: 'bg-warning/20',
    iconText: 'text-warning'
  },
  neutral: {
    border: 'border-b-text-muted',
    iconBg: 'bg-text-muted/20',
    iconText: 'text-text-muted'
  }
};

function MetricCard({ label, value, subValue, icon: Icon, variant }: MetricProps) {
  const styles = VARIANT_MAP[variant];
  
  return (
    <div 
      className={`bg-white border border-border-subtle p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all border-b-4 ${styles.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-text-muted mb-1">{label}</p>
          <h3 className="text-3xl font-black text-charcoal tracking-tight">{value}</h3>
          {subValue && (
            <p className="text-[11px] font-bold text-text-muted mt-1 opacity-70">{subValue}</p>
          )}
        </div>
        <div 
          className={`p-3 rounded-xl ${styles.iconBg} ${styles.iconText}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

interface AdminDashboardMetricsProps {
  notices: { total: number; drafts: number };
  events: { total: number; drafts: number };
  assignments: { total: number; drafts: number };
}

export default function AdminDashboardMetrics({ notices, events, assignments }: AdminDashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        label="Total Notices" 
        value={notices.total} 
        subValue={`${notices.drafts} drafts pending`} 
        icon={HiOutlineMegaphone} 
        variant="primary" 
      />
      <MetricCard 
        label="Active Events" 
        value={events.total} 
        subValue={`${events.drafts} unpublished`} 
        icon={HiOutlineCalendarDays} 
        variant="success" 
      />
      <MetricCard 
        label="Pending Tasks" 
        value={assignments.total} 
        subValue={`${assignments.drafts} in review`} 
        icon={HiOutlineClipboardDocumentList} 
        variant="warning" 
      />
      <MetricCard 
        label="Global Assets" 
        value={notices.total + events.total + assignments.total} 
        subValue="Total managed blocks" 
        icon={HiOutlineDocumentText} 
        variant="neutral" 
      />
    </div>
  );
}
