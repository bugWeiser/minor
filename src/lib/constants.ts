import { Category, Urgency } from './types';

export const CATEGORIES: Category[] = [
  'Academic',
  'Placement',
  'Events',
  'Scholarships',
  'Sports',
  'Hostel',
  'General',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; accent: string; border: string; icon: string; darkBg: string; darkText: string; darkBorder: string }> = {
  Academic: {
    bg: '#DBEAFE',          // blue-100
    text: '#1E40AF',        // blue-800
    accent: '#3B82F6',      // blue-500
    border: '#BFDBFE',      // blue-200
    icon: '📚',
    darkBg: '#1E3A5F',
    darkText: '#93C5FD',
    darkBorder: '#1E40AF',
  },
  Placement: {
    bg: '#D1FAE5',          // emerald-100
    text: '#065F46',        // emerald-800
    accent: '#10B981',      // emerald-500
    border: '#A7F3D0',      // emerald-200
    icon: '💼',
    darkBg: '#134E3A',
    darkText: '#6EE7B7',
    darkBorder: '#065F46',
  },
  Events: {
    bg: '#FEF3C7',          // amber-100
    text: '#92400E',        // amber-800
    accent: '#F59E0B',      // amber-500
    border: '#FDE68A',      // amber-200
    icon: '🎉',
    darkBg: '#4D3619',
    darkText: '#FCD34D',
    darkBorder: '#92400E',
  },
  Scholarships: {
    bg: '#EDE9FE',          // violet-100
    text: '#5B21B6',        // violet-800
    accent: '#8B5CF6',      // violet-500
    border: '#DDD6FE',      // violet-200
    icon: '🎓',
    darkBg: '#3B1F7E',
    darkText: '#C4B5FD',
    darkBorder: '#5B21B6',
  },
  Sports: {
    bg: '#FFE4E6',          // rose-100
    text: '#9F1239',        // rose-800
    accent: '#F43F5E',      // rose-500
    border: '#FECDD3',      // rose-200
    icon: '⚽',
    darkBg: '#5C1525',
    darkText: '#FCA5A5',
    darkBorder: '#9F1239',
  },
  Hostel: {
    bg: '#CFFAFE',          // cyan-100
    text: '#155E75',        // cyan-800
    accent: '#06B6D4',      // cyan-500
    border: '#A5F3FC',      // cyan-200
    icon: '🏠',
    darkBg: '#134152',
    darkText: '#67E8F9',
    darkBorder: '#155E75',
  },
  General: {
    bg: '#F1F5F9',          // slate-100
    text: '#475569',        // slate-600
    accent: '#64748B',      // slate-500
    border: '#E2E8F0',      // slate-200
    icon: '📢',
    darkBg: '#334155',
    darkText: '#CBD5E1',
    darkBorder: '#475569',
  },
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Academic: '📚',
  Placement: '💼',
  Events: '🎉',
  Scholarships: '🎓',
  Sports: '⚽',
  Hostel: '🏠',
  General: '📢',
};

export const URGENCY_STYLES: Record<Urgency, { bg: string; text: string; border: string; dot: string; label: string; icon: string; darkBg: string; darkText: string; darkBorder: string }> = {
  Urgent: {
    bg: '#FEF2F2',
    text: '#DC2626',
    border: '#FECACA',
    dot: '#EF4444',
    label: 'URGENT',
    icon: '🔴',
    darkBg: 'rgba(239, 68, 68, 0.12)',
    darkText: '#FCA5A5',
    darkBorder: 'rgba(239, 68, 68, 0.2)',
  },
  Important: {
    bg: '#FFFBEB',
    text: '#D97706',
    border: '#FDE68A',
    dot: '#F59E0B',
    label: 'IMPORTANT',
    icon: '🟡',
    darkBg: 'rgba(245, 158, 11, 0.12)',
    darkText: '#FCD34D',
    darkBorder: 'rgba(245, 158, 11, 0.2)',
  },
  Normal: {
    bg: '#F8FAFC',
    text: '#64748B',
    border: '#E2E8F0',
    dot: '#94A3B8',
    label: 'NORMAL',
    icon: '',
    darkBg: 'rgba(100, 116, 139, 0.12)',
    darkText: '#94A3B8',
    darkBorder: 'rgba(100, 116, 139, 0.2)',
  },
};
