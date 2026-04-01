'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotices } from '@/hooks/useNotices';
import { useState, useRef, useEffect } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineBell, 
  HiOutlineUser, 
  HiOutlineCog6Tooth, 
  HiOutlineArrowRightOnRectangle 
} from 'react-icons/hi2';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Student Overview',
  '/notices': 'College Notice Board',
  '/calendar': 'Academic Schedule',
  '/assignments': 'Curricula Tasks',
  '/notifications': 'Recent Alerts',
  '/courses': 'My Degree Courses',
  '/results': 'OxeliaMetrix Results',
  '/settings': 'User Profile & Preferences',
  '/admin': 'University Control Center',
};

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/notices/')) return 'Detailed Notice View';
  return ROUTE_TITLES[pathname] || 'Oxelia Dashboard';
}

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { user, appUser, isFirebaseConfigured } = useAuth();
  const { activeNotices } = useNotices();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = activeNotices.filter(n =>
    !appUser?.readNotices?.includes(n.id)
  ).length;

  const pageTitle = getPageTitle(pathname);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    if (!isFirebaseConfigured) {
      localStorage.removeItem('mockRole');
      window.location.href = '/login';
    } else {
      import('@/lib/auth').then(({ logout }) => logout());
    }
  };

  return (
    <header className="sticky top-0 z-40 h-[76px] flex items-center justify-center bg-white/90 backdrop-blur-xl border-b border-border-subtle shrink-0 shadow-sm shadow-black/[0.02]">
      <div className="max-w-[1400px] w-full px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile Trigger + Breadcrumb Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-border-subtle text-text-secondary hover:bg-bg-hover hover:border-border-strong transition-all shadow-sm"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="6" x2="18" y2="6" />
              <line x1="4" y1="11" x2="18" y2="11" />
              <line x1="4" y1="16" x2="18" y2="16" />
            </svg>
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-[17px] font-bold text-text-primary tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-[11px] font-black text-charcoal uppercase tracking-[0.14em] mt-0.5">
              Academy Portal / 2026 Season
            </p>
          </div>
        </div>

        {/* Center/Right: Search + Actions */}
        <div className="flex items-center gap-3">
          
          {/* Enhanced Search Input */}
          <div 
            onClick={() => router.push('/notices')} 
            className="hidden md:flex items-center gap-3 bg-bg-card-secondary border border-border-subtle rounded-2xl px-5 h-[52px] w-[360px] lg:w-[480px] text-[13px] text-text-secondary cursor-pointer hover:border-border-strong hover:bg-white hover:shadow-xl hover:shadow-black/[0.04] transition-all duration-500 group"
          >
            <HiOutlineMagnifyingGlass className="w-[20px] h-[20px] text-charcoal/50 group-hover:text-charcoal transition-colors" />
            <span className="text-charcoal font-bold tracking-tight">Search for notices, schedules, or curriculum nodes...</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <button
              onClick={() => router.push('/notifications')}
              className="relative w-11 h-11 rounded-2xl bg-white border border-border-subtle flex items-center justify-center text-text-secondary transition-all hover:bg-bg-hover hover:border-border-strong hover:shadow-lg active:scale-95 group"
              aria-label="Recent Alerts"
            >
              <HiOutlineBell className="w-[20px] h-[20px] group-hover:text-charcoal transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-[20px] h-[20px] flex items-center justify-center rounded-full bg-danger text-white text-[10px] font-black border-2 border-white shadow-xl soft-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Menu Trigger */}
            {user ? (
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(o => !o)}
                  className="w-11 h-11 rounded-2xl bg-charcoal text-white text-[14px] font-black border border-charcoal/10 flex items-center justify-center hover:shadow-2xl hover:shadow-charcoal/30 active:scale-95 transition-all duration-300"
                  aria-label="User Avatar"
                >
                  {(appUser?.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-[64px] z-50 w-72 bg-white rounded-[28px] shadow-2xl border border-border-subtle p-3 animate-fadeUp overflow-hidden">
                    {/* User Profile Row */}
                    <div className="px-4 py-4 flex items-center gap-4 bg-bg-card-secondary rounded-2xl border border-border-subtle mb-2">
                      <div className="w-12 h-12 rounded-xl bg-charcoal text-white flex items-center justify-center text-base font-black shadow-lg shadow-charcoal/20">
                         {(appUser?.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-black text-text-primary truncate leading-none mb-1.5">{appUser?.name || 'Academic User'}</p>
                        <p className="text-[11px] font-bold text-text-muted truncate uppercase tracking-wider">{user.email}</p>
                      </div>
                    </div>

                    <div className="py-2">
                      <button onClick={() => { setDropdownOpen(false); router.push('/settings'); }} className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[13px] font-black text-text-secondary hover:bg-bg-hover hover:text-charcoal transition-all">
                        <div className="w-9 h-9 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-charcoal"><HiOutlineUser className="w-5 h-5" /></div>
                        Profile Settings
                      </button>
                      <button onClick={() => { setDropdownOpen(false); router.push('/settings'); }} className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[13px] font-black text-text-secondary hover:bg-bg-hover hover:text-charcoal transition-all">
                         <div className="w-9 h-9 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-muted"><HiOutlineCog6Tooth className="w-5 h-5" /></div>
                        Preferences
                      </button>
                    </div>

                    <div className="border-t border-border-subtle border-dashed my-2" />

                    <button onClick={handleLogout} className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[13px] font-black text-danger hover:bg-soft-red/50 transition-all">
                       <div className="w-9 h-9 rounded-lg bg-soft-red flex items-center justify-center text-danger"><HiOutlineArrowRightOnRectangle className="w-5 h-5" /></div>
                       End Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="h-11 px-6 rounded-2xl bg-charcoal text-white text-[13px] font-black hover:shadow-2xl hover:shadow-charcoal/30 active:scale-95 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
