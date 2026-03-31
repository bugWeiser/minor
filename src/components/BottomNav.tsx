'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { 
  HiOutlineHome, 
  HiOutlineSpeakerWave, 
  HiOutlineCalendar, 
  HiOutlineClipboardDocumentCheck, 
  HiOutlineUser,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { appUser } = useAuth();

  const TABS = [
    { href: '/', label: 'Home', icon: HiOutlineHome },
    { href: '/notices', label: 'Notices', icon: HiOutlineSpeakerWave },
    { href: '/calendar', label: 'Schedule', icon: HiOutlineCalendar },
    { href: '/assignments', label: 'Tasks', icon: HiOutlineClipboardDocumentCheck },
    ...(appUser?.isAdmin ? [{ href: '/admin', label: 'Control', icon: HiOutlineShieldCheck }] : [{ href: '/settings', label: 'ID', icon: HiOutlineUser }]),
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-[76px] bg-white/95 backdrop-blur-2xl border-t border-border-subtle safe-area-bottom shadow-[0_-12px_40px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="h-full flex items-center px-4 max-w-lg mx-auto">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1.5 h-full transition-all duration-300
                ${active ? 'text-charcoal' : 'text-text-muted hover:text-text-secondary'}
              `}
            >
              <div className={`
                w-[52px] h-[34px] flex items-center justify-center rounded-[18px] transition-all duration-500
                ${active ? 'bg-accent shadow-xl shadow-accent/20 scale-[1.05]' : 'bg-transparent'}
              `}>
                <tab.icon className={`w-[22px] h-[22px] transition-transform duration-500 ${active ? 'text-charcoal font-black' : ''}`} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${active ? 'opacity-100 translate-y-0 text-charcoal' : 'opacity-40 -translate-y-0.5'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
