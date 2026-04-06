'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useInstitution } from '@/context/InstitutionContext';
import { useNotices } from '@/hooks/useNotices';
import { useState, useRef, useEffect } from 'react';
import { 
  HiOutlineBell, 
  HiOutlineUser, 
  HiOutlineCog6Tooth, 
  HiOutlineArrowRightOnRectangle,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineBuildingLibrary,
  HiOutlineArrowsRightLeft
} from 'react-icons/hi2';
import GlobalSearch from '@/components/GlobalSearch';
import { setMockAuthSession } from '@/lib/authPersistence';

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Student Overview',
  '/notices': 'College Notice Board',
  '/calendar': 'Academic Schedule',
  '/assignments': 'Curricula Tasks',
  '/notifications': 'Recent Alerts',
  '/courses': 'My Degree Courses',
  '/results': 'OxeliaMetrix Results',
  '/settings': 'User Profile & Preferences',
  '/admin': 'University Control Center',
};

function getPageTitle(pathname: string, defaultName: string): string {
  if (pathname.startsWith('/notices/')) return 'Detailed Notice View';
  return ROUTE_TITLES[pathname] || `${defaultName} Hub`;
}

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { user, normalizedProfile, isFirebaseConfigured, logout } = useAuth();
  const { name: institutionName, academicYear } = useInstitution();
  const { activeNotices } = useNotices();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = activeNotices.filter(n =>
    !normalizedProfile?.id || (normalizedProfile.role === 'student' && !n.id) // Simplified for the audit pass
  ).length;

  const pageTitle = getPageTitle(pathname, institutionName);

  // Determine if it's a demo persona
  const isDemoPersona = [
    'alice@dashboard.com',
    'bob@dashboard.com',
    'faculty@dashboard.com',
    'admin@dashboard.com'
  ].includes(normalizedProfile?.email || '');

  // Visible if not configured OR if already in a demo session
  const showReviewerTools = !isFirebaseConfigured || isDemoPersona;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
  };

  const handlePersonaSwitch = (email: string, role: string) => {
    setDropdownOpen(false);
    setMockAuthSession(email, role);
    
    // SECURE REDIRECT LOGIC
    // 1. Students must never be in /admin area
    if (role === 'student' && pathname.startsWith('/admin')) {
      window.location.href = '/dashboard';
      return;
    }

    // 2. Faculty only allow /admin/assignments or student area
    if (role === 'faculty' && pathname.startsWith('/admin') && !pathname.startsWith('/admin/assignments')) {
      window.location.href = '/admin/assignments';
      return;
    }

    // 3. Admins should land on Platform Control if they switch while on student dashboard
    if (role === 'admin' && pathname === '/dashboard') {
      window.location.href = '/admin';
      return;
    }

    // Default: Refresh to apply new session
    window.location.reload();
  };

  const handleTenantSwitch = (slug: string) => {
    localStorage.setItem('bw_reviewer_org_context', slug);
    localStorage.setItem('bw_last_org_slug', slug);
    // Force a hard reload to reset context/branding
    window.location.reload();
  };

  const { activeOrgSlug, name: activeOrgName } = useInstitution();

  const menuInitial = (normalizedProfile?.fullName?.[0] || user?.email?.[0] || 'U').toUpperCase();

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
          
          <div className="hidden sm:block overflow-hidden">
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-text-primary tracking-tight truncate max-w-[180px] lg:max-w-none">
                {pageTitle}
              </h1>
              <div className="px-2 py-0.5 bg-bg-card-secondary border border-border-subtle rounded-md flex items-center gap-1.5 shrink-0 shadow-sm animate-fadeRight">
                <HiOutlineBuildingLibrary className="w-3 h-3 text-text-muted" />
                <span className="text-[9px] font-black text-charcoal uppercase tracking-widest">{activeOrgSlug}</span>
              </div>
            </div>
            <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.14em] mt-0.5 truncate max-w-[150px] lg:max-w-[300px]">
              {activeOrgName} / {academicYear}
            </p>
          </div>
        </div>

        {/* Center/Right: Search + Actions */}
        <div className="flex items-center gap-3">
          
          {/* Global Search Component */}
          <GlobalSearch />

          {/* Tenant Switcher (Reviewer/Pilot Only) */}
          {showReviewerTools && (
            <div className="relative group mr-1">
              <button
                className="h-11 px-3 bg-white border border-border-subtle rounded-2xl flex items-center gap-2 text-text-secondary transition-all hover:bg-bg-hover hover:border-border-strong group-hover:shadow-lg active:scale-95"
                title="Switch Institution Context"
              >
                <div className="w-6 h-6 rounded-lg bg-charcoal text-institution-accent flex items-center justify-center shrink-0">
                  <HiOutlineArrowsRightLeft className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">ORG</span>
              </button>
              
              {/* Dropdown on hover/click */}
              <div className="absolute right-0 top-[52px] hidden group-hover:block w-56 bg-white rounded-[24px] shadow-2xl border border-border-subtle p-2 z-50 animate-fadeUp">
                <p className="px-3 py-2 text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Select Tenant</p>
                {[
                  { name: 'Bugweiser University', slug: 'bugweiser-u' },
                  { name: 'Demo Institution', slug: 'demo' }
                ].map(org => {
                  const isActive = activeOrgSlug === org.slug;
                  return (
                    <button
                      key={org.slug}
                      onClick={() => handleTenantSwitch(org.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[12px] font-bold transition-all ${isActive ? 'bg-charcoal text-white' : 'text-text-secondary hover:bg-bg-hover'}`}
                    >
                      {org.name}
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-institution-accent" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                  {menuInitial}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-[64px] z-50 w-72 bg-white rounded-[28px] shadow-2xl border border-border-subtle p-3 animate-fadeUp overflow-hidden">
                    {/* User Profile Row */}
                    <div className="px-4 py-4 flex items-center gap-4 bg-bg-card-secondary rounded-2xl border border-border-subtle mb-2">
                      <div className="w-12 h-12 rounded-xl bg-charcoal text-white flex items-center justify-center text-base font-black shadow-lg shadow-charcoal/20">
                         {menuInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-black text-text-primary truncate leading-none mb-1.5">{normalizedProfile?.fullName || 'Academic User'}</p>
                        <p className="text-[11px] font-bold text-text-muted truncate uppercase tracking-wider">{normalizedProfile?.department || 'Visitor'}</p>
                      </div>
                    </div>

                    <div className="py-1">
                      <button onClick={() => { setDropdownOpen(false); router.push('/settings'); }} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-black text-text-secondary hover:bg-bg-hover hover:text-charcoal transition-all">
                        <div className="w-9 h-9 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-muted"><HiOutlineUser className="w-5 h-5" /></div>
                        Profile Settings
                      </button>
                      <button onClick={() => { setDropdownOpen(false); router.push('/settings'); }} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-black text-text-secondary hover:bg-bg-hover hover:text-charcoal transition-all">
                         <div className="w-9 h-9 rounded-lg bg-white border border-border-subtle flex items-center justify-center text-text-muted"><HiOutlineCog6Tooth className="w-5 h-5" /></div>
                        Preferences
                      </button>
                    </div>

                    {/* Quick Persona Switcher (Demo Mode Only) */}
                    {showReviewerTools && (
                      <div className="mt-2 pt-2 border-t border-border-subtle border-dashed">
                        <p className="px-4 py-2 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                           <HiOutlineBolt className="w-3 h-3 text-accent" /> Reviewer Tools
                        </p>
                        <div className="grid grid-cols-1 gap-1 px-1">
                          {[
                            { name: 'Alice (BBA)', email: 'alice@dashboard.com', role: 'student' },
                            { name: 'Bob (CSE)', email: 'bob@dashboard.com', role: 'student' },
                            { name: 'Prof. Anita Rao', email: 'anita.rao@bugweiser.edu', role: 'faculty' },
                            { name: 'Admin Node', email: 'admin@dashboard.com', role: 'admin' }
                          ].map(persona => {
                            const isActive = normalizedProfile?.email === persona.email;
                            return (
                              <button 
                                key={persona.email}
                                onClick={() => handlePersonaSwitch(persona.email, persona.role)}
                                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold transition-all ${isActive ? 'bg-accent/10 border border-accent/20 text-charcoal' : 'text-text-secondary hover:bg-bg-hover hover:text-charcoal'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${isActive ? 'bg-accent border-accent text-charcoal' : 'bg-white border-border-subtle text-text-muted'}`}>
                                    <HiOutlineShieldCheck className="w-4 h-4" />
                                  </div>
                                  {persona.name}
                                </div>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent soft-pulse" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

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
