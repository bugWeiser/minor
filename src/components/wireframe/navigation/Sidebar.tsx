import React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  links: { 
    label: string; 
    href: string; 
    icon?: React.ReactNode; 
    isActive?: boolean;
    count?: number;
  }[];
  header?: React.ReactNode;
}

export function Sidebar({ className, links, header, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-paper border-r-2 border-pencil p-6 shadow-sketch min-w-[280px] rotate-[0.5deg]",
        className
      )}
      {...props}
    >
      <div className="-rotate-[0.5deg] space-y-12">
        {header && (
          <div className="px-2 pt-4">
             {header}
          </div>
        )}

        <nav className="flex flex-col gap-3">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={cn(
                "group flex items-center justify-between p-3 rounded-sm border-2 font-sketch text-2xl font-bold transition-all transition-transform duration-200 duration-200",
                "hover:rotate-1 hover:shadow-[3px_3px_0px_#c4c4c4] hover:bg-white",
                link.isActive 
                  ? "bg-white border-pencil text-pencil shadow-sketch translate-x-[2px] translate-y-[-2px] rotate-1" 
                  : "bg-paper border-transparent text-pencil-light hover:text-pencil hover:border-pencil"
              )}
            >
              <div className="flex items-center gap-3">
                 {link.icon && <div className="w-6 h-6 shrink-0 opacity-60 group-hover:opacity-100">{link.icon}</div>}
                 <span>{link.label}</span>
              </div>
              {link.count !== undefined && (
                <span className="font-body text-xs font-black bg-pencil text-paper px-2 py-1 rounded-sm rotate-2">
                   {link.count}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
