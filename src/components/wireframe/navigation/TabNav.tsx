import React from "react";
import { cn } from "@/lib/utils";

interface TabNavProps extends React.HTMLAttributes<HTMLElement> {
  tabs: { 
    label: string; 
    id: string; 
    isActive?: boolean;
    icon?: React.ReactNode;
  }[];
  onTabChange?: (id: string) => void;
}

export function TabNav({ className, tabs, onTabChange, ...props }: TabNavProps) {
  return (
    <nav
      className={cn(
        "flex flex-wrap items-center gap-2 p-1 border-b-2 border-pencil border-dashed rotate-[0.2deg]",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-1.5 -rotate-[0.2deg] w-full">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "group relative px-6 py-4 rounded-t-md transition-all duration-300 font-sketch text-2xl font-bold tracking-wide outline-none",
              "border-2 border-transparent hover:border-pencil hover:bg-paper hover:shadow-[2px_-2px_0_#c4c4c4]",
              tab.isActive 
                ? "bg-white border-pencil border-b-paper text-pencil translate-y-[2px] z-10 shadow-sketch" 
                : "text-pencil-light hover:text-pencil"
            )}
          >
            <div className="flex items-center gap-3">
               {tab.icon && <span className="w-5 h-5 shrink-0 opacity-60 group-hover:opacity-100">{tab.icon}</span>}
               <span>{tab.label}</span>
            </div>
            
            {/* Active tab bottom cover to merge with the border (simulated) */}
            {tab.isActive && (
              <div className="absolute -bottom-[4px] left-[-2px] right-[-2px] h-[6px] bg-white z-20" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
