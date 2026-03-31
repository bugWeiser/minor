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
