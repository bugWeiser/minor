import React from "react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: { 
    label: string; 
    href: string; 
    isActive?: boolean;
    icon?: React.ReactNode;
  }[];
}

export function Breadcrumbs({ className, items, ...props }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-3 py-6 px-1 font-body text-sm font-bold text-pencil-light -rotate-[1deg]",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-4 rotate-[1.5deg]">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-3">
              {item.icon && <span className="w-4 h-4 shrink-0 text-pencil-light">{item.icon}</span>}
              <a
                href={item.href}
                className={cn(
                  "block hover:text-pencil underline decoration-pencil-light/30 decoration-2 underline-offset-4 hover:decoration-pencil-light hover:rotate-1 transition-all",
                  item.isActive && "text-pencil font-black decoration-pencil pointer-events-none"
                )}
              >
                {item.label}
              </a>
            </div>
            
            {i < items.length - 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-pencil-border opacity-60 mx-1 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
