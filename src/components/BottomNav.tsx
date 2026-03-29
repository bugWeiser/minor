'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const tabs = [
  { href: '/', label: 'Feed', icon: '📰' },
  { href: '/archive', label: 'Archive', icon: '📁' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { appUser } = useAuth();
  const isAdmin = appUser?.isAdmin;
  const allTabs = isAdmin ? [...tabs, { href: '/admin', label: 'Admin', icon: '⚙️' }] : tabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16">
        {allTabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link key={tab.href} href={tab.href} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-150 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}>
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[11px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
