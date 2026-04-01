import React from "react";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  reverse?: boolean;
}

export function SidebarLayout({
  className,
  sidebar,
  children,
  reverse = false,
  ...props
}: SidebarLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row w-full gap-10",
        reverse && "lg:flex-row-reverse",
        className
      )}
      {...props}
    >
      <aside className="w-full lg:w-1/4 shrink-0">
        {sidebar}
      </aside>
      <main className="w-full lg:w-3/4 flex-grow">
        {children}
      </main>
    </div>
  );
}
