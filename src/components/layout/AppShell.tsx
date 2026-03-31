'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from '../BottomNav';

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-bg-page min-h-screen overflow-hidden selection:bg-accent/40 selection:text-charcoal transition-colors duration-300">
      
      {/* SIDEBAR - Fixed 260px on desktop, drawer on mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* VIEWPORT CONTROLLER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* TOPBAR - Glassy fixed header */}
        <TopBar onMenuClick={() => setSidebarOpen(o => !o)} />

        {/* MAIN PAGE CONTENT - Max-width: 1400px container */}
        <main className="flex-1 overflow-y-auto scroll-smooth transition-all">
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 mb-24 lg:mb-8 animate-fadeUp">
            {children}
          </div>
        </main>

        {/* MOBILE NAVIGATION - BottomNav aligned to light mode system */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
