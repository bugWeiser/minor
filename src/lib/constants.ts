import { Category, Urgency } from './types';
import { 
  HiOutlineBookOpen, 
  HiOutlineBriefcase, 
  HiOutlineCalendarDays, 
  HiOutlineAcademicCap, 
  HiOutlinePlayCircle, 
  HiOutlineHome, 
  HiOutlineSpeakerWave,
  HiOutlineExclamationCircle,
  HiOutlineBell
} from 'react-icons/hi2';
import { IconType } from 'react-icons';

export const DEMO_SYNC_POLLING_INTERVAL = 2000;

export const CATEGORIES: Category[] = [
  'Academic',
  'Placement',
  'Events',
  'Scholarships',
  'Sports',
  'Hostel',
  'General',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; accent: string; border: string; icon: IconType; darkBg: string; darkText: string; darkBorder: string }> = {
  Academic: {
    bg: '#DBEAFE', text: '#1E40AF', accent: '#3B82F6', border: '#BFDBFE',
    icon: HiOutlineBookOpen, darkBg: '#1E3A5F', darkText: '#93C5FD', darkBorder: '#1E40AF',
  },
  Placement: {
    bg: '#D1FAE5', text: '#065F46', accent: '#10B981', border: '#A7F3D0',
    icon: HiOutlineBriefcase, darkBg: '#134E3A', darkText: '#6EE7B7', darkBorder: '#065F46',
  },
  Events: {
    bg: '#FEF3C7', text: '#92400E', accent: '#F59E0B', border: '#FDE68A',
    icon: HiOutlineCalendarDays, darkBg: '#4D3619', darkText: '#FCD34D', darkBorder: '#92400E',
  },
  Scholarships: {
    bg: '#EDE9FE', text: '#5B21B6', accent: '#8B5CF6', border: '#DDD6FE',
    icon: HiOutlineAcademicCap, darkBg: '#3B1F7E', darkText: '#C4B5FD', darkBorder: '#5B21B6',
  },
  Sports: {
    bg: '#FFE4E6', text: '#9F1239', accent: '#F43F5E', border: '#FECDD3',
    icon: HiOutlinePlayCircle, darkBg: '#5C1525', darkText: '#FCA5A5', darkBorder: '#9F1239',
  },
  Hostel: {
    bg: '#CFFAFE', text: '#155E75', accent: '#06B6D4', border: '#A5F3FC',
    icon: HiOutlineHome, darkBg: '#134152', darkText: '#67E8F9', darkBorder: '#155E75',
  },
  General: {
    bg: '#F1F5F9', text: '#475569', accent: '#64748B', border: '#E2E8F0',
    icon: HiOutlineSpeakerWave, darkBg: '#334155', darkText: '#CBD5E1', darkBorder: '#475569',
  },
};

export const CATEGORY_ICONS: Record<Category, IconType> = {
  Academic: HiOutlineBookOpen,
  Placement: HiOutlineBriefcase,
  Events: HiOutlineCalendarDays,
  Scholarships: HiOutlineAcademicCap,
  Sports: HiOutlinePlayCircle,
  Hostel: HiOutlineHome,
  General: HiOutlineSpeakerWave,
};

export const URGENCY_STYLES: Record<Urgency, { bg: string; text: string; border: string; dot: string; label: string; icon: IconType; darkBg: string; darkText: string; darkBorder: string }> = {
  Urgent: {
    bg: '#FEF2F2', text: '#DC2626', border: '#FECACA', dot: '#EF4444', label: 'URGENT',
    icon: HiOutlineExclamationCircle, darkBg: 'rgba(239, 68, 68, 0.12)', darkText: '#FCA5A5', darkBorder: 'rgba(239, 68, 68, 0.2)',
  },
  Important: {
    bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', dot: '#F59E0B', label: 'IMPORTANT',
    icon: HiOutlineBell, darkBg: 'rgba(245, 158, 11, 0.12)', darkText: '#FCD34D', darkBorder: 'rgba(245, 158, 11, 0.2)',
  },
  Normal: {
    bg: '#F8FAFC', text: '#64748B', border: '#E2E8F0', dot: '#94A3B8', label: 'NORMAL',
    icon: HiOutlineBell, darkBg: 'rgba(100, 116, 139, 0.12)', darkText: '#94A3B8', darkBorder: 'rgba(100, 116, 139, 0.2)',
  },
};

export const EVENT_CATEGORIES = [
  'Exam',
  'Workshop',
  'Holiday',
  'Club',
  'Sports',
  'Deadline',
  'Placement',
  'General',
] as const;

export type EventCategory = typeof EVENT_CATEGORIES[number];

export const EVENT_CATEGORY_STYLES: Record<EventCategory, { bg: string; text: string; border: string; accent: string; icon: IconType }> = {
  Exam: {
    bg: '#FEF2F2', text: '#991B1B', border: '#FEE2E2', accent: '#EF4444',
    icon: HiOutlineExclamationCircle,
  },
  Workshop: {
    bg: '#EEF2FF', text: '#3730A3', border: '#E0E7FF', accent: '#6366F1',
    icon: HiOutlineBookOpen,
  },
  Holiday: {
    bg: '#ECFDF5', text: '#065F46', border: '#D1FAE5', accent: '#10B981',
    icon: HiOutlineHome,
  },
  Club: {
    bg: '#FAF5FF', text: '#6B21A8', border: '#F3E8FF', accent: '#A855F7',
    icon: HiOutlineCalendarDays,
  },
  Sports: {
    bg: '#FFF1F2', text: '#9F1239', border: '#FFE4E6', accent: '#F43F5E',
    icon: HiOutlinePlayCircle,
  },
  Deadline: {
    bg: '#FFF7ED', text: '#9A3412', border: '#FFEDD5', accent: '#F97316',
    icon: HiOutlineBell,
  },
  Placement: {
    bg: '#F0F9FF', text: '#075985', border: '#E0F2FE', accent: '#0EA5E9',
    icon: HiOutlineBriefcase,
  },
  General: {
    bg: '#F8FAFC', text: '#334155', border: '#F1F5F9', accent: '#64748B',
    icon: HiOutlineSpeakerWave,
  },
};

export const EVENT_CATEGORY_Tailwind_MAP: Record<EventCategory, { marker: string, border: string, bg: string, text: string }> = {
  Exam: { marker: 'bg-red-500', border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  Workshop: { marker: 'bg-indigo-500', border: 'border-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700' },
  Holiday: { marker: 'bg-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Club: { marker: 'bg-purple-500', border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-700' },
  Sports: { marker: 'bg-rose-500', border: 'border-rose-500', bg: 'bg-rose-50', text: 'text-rose-700' },
  Deadline: { marker: 'bg-orange-500', border: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  Placement: { marker: 'bg-sky-500', border: 'border-sky-500', bg: 'bg-sky-50', text: 'text-sky-700' },
  General: { marker: 'bg-slate-500', border: 'border-slate-500', bg: 'bg-slate-50', text: 'text-slate-700' },
};

export const ASSIGNMENT_PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export const PRIORITY_Tailwind_MAP: Record<typeof ASSIGNMENT_PRIORITIES[number], { bg: string, text: string, border: string, dot: string }> = {
  low: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' },
  medium: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
  high: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400' },
  urgent: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
};
