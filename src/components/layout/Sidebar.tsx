'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useInstitution } from '@/context/InstitutionContext';
import { useNotices } from '@/hooks/useNotices';
import {
  HiOutlineHome,
  HiOutlineSpeakerWave,
  HiOutlineCalendar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBell,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineShieldCheck,
  HiOutlineArrowRightOnRectangle,
  HiOutlineAcademicCap
} from 'react-icons/hi2';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: HiOutlineHome },
  { href: '/notices', label: 'College Notices', icon: HiOutlineSpeakerWave },
  { href: '/calendar', label: 'Academic Schedule', icon: HiOutlineCalendar },
  { href: '/assignments', label: 'Assignments', icon: HiOutlineClipboardDocumentCheck },
  { href: '/notifications', label: 'Recent Alerts', icon: HiOutlineBell },
  { href: '/courses', label: 'My Courses', icon: HiOutlineBookOpen },
  { href: '/results', label: 'Academic Results', icon: HiOutlineChartBar },
];

const PREFERENCES = [
  { href: '/settings', label: 'User Preferences', icon: HiOutlineCog6Tooth },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { appUser, user, isFirebaseConfigured, capabilities, isAdmin, isFaculty } = useAuth();
  const { name: institutionName, logoUrl } = useInstitution();
  const { activeNotices } = useNotices();

  const unreadCount = activeNotices.filter(n =>
    !appUser?.readNotices?.includes(n.id)
  ).length;

  const handleLogout = () => {
    if (!isFirebaseConfigured) {
      localStorage.removeItem('mockRole');
      localStorage.removeItem('activeUserEmail');
      window.location.href = '/login';
    } else {
      import('@/lib/auth').then(({ logout }) => logout());
    }
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar - EasyKorean inspired LIGHT sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          w-[260px] bg-white border-r border-border-subtle
          transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 px-7 h-[76px] mb-4 shrink-0 transition-all">
          {logoUrl ? (
            <img src={logoUrl} alt={institutionName} className="w-9 h-9 rounded-xl object-cover shadow-lg" />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
              <HiOutlineAcademicCap className="w-5 h-5 text-charcoal" />
            </div>
          )}
          <span className="text-xl font-bold text-text-primary tracking-tight truncate max-w-[170px]">{institutionName}</span>
        </div>

        {/* NAV ITEMS */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-hide py-2">
          <div className="px-3 mb-4 mt-2 transition-all">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-charcoal">
              Main Navigation
            </p>
          </div>

          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const showBadge = item.href === '/notifications' && unreadCount > 0;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 ease-out group
                  ${active
                    ? 'bg-soft-blue text-text-primary font-semibold shadow-sm'
                    : 'text-text-secondary font-medium hover:bg-bg-hover hover:text-text-primary'
                  }
                `}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${active ? 'text-charcoal' : 'text-text-muted group-hover:text-text-primary'}`}>
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                </div>
                <span className="flex-1">{item.label}</span>
                {showBadge && (
                  <span className="ml-auto bg-danger text-white text-[10px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1 soft-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="px-3 mb-4 mt-8 transition-all">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-charcoal">
              User Preferences
            </p>
          </div>

          {PREFERENCES.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 ease-out group
                  ${active
                    ? 'bg-soft-blue text-text-primary font-semibold shadow-sm'
                    : 'text-text-secondary font-medium hover:bg-bg-hover hover:text-text-primary'
                  }
                `}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${active ? 'text-charcoal' : 'text-text-muted group-hover:text-text-primary'}`}>
                   <Icon className="w-[18px] h-[18px] shrink-0" />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Role-Aware Control Panel Link */}
          {capabilities.canAccessAdminArea && (
            <Link
              href={capabilities.canViewAdminDashboard ? '/admin' : '/admin/assignments'}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 ease-out group mt-2
                ${(isActive('/admin') || isActive('/admin/assignments'))
                  ? 'bg-soft-blue text-text-primary font-semibold shadow-sm'
                  : 'text-warning font-medium hover:bg-soft-yellow/40'
                }
              `}
            >
              <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-colors ${(isActive('/admin') || isActive('/admin/assignments')) ? 'text-charcoal' : 'text-warning'}`}>
                <HiOutlineShieldCheck className="w-[18px] h-[18px] shrink-0" />
              </div>
              <span className="flex-1 whitespace-nowrap">
                {capabilities.canViewAdminDashboard ? 'Platform Control' : 'Task Management'}
              </span>
            </Link>
          )}
        </nav>

        {/* BOTTOM USER PANEL */}
        {(user || appUser) && (
          <div className="mt-auto p-4 border-t border-border-subtle bg-bg-card-secondary transition-all">
            <div className="flex items-center gap-3 px-2 py-2.5 rounded-2xl border border-border-subtle bg-white shadow-sm transition-all">
              <div className="w-9 h-9 rounded-xl bg-charcoal text-white text-[13px] font-bold flex items-center justify-center shrink-0 shadow-lg shadow-charcoal/30">
                {appUser?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-text-primary truncate">
                  {appUser?.name || 'Academic User'}
                </p>
                <p className="text-[11px] text-text-muted truncate mt-0.5">
                  {isAdmin ? 'System Administrator' : isFaculty ? 'Faculty / Staff' : 'Active Student'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Securely end current session"
              className="mt-3 text-xs text-text-muted hover:text-danger flex items-center gap-2 cursor-pointer font-medium w-full px-3 py-1 transition-colors hover:translate-x-1"
            >
              <HiOutlineArrowRightOnRectangle className="w-[14px] h-[14px]" />
              End Session
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
