import React from "react";
import { cn } from "@/lib/utils";

interface ThreeColumnGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ThreeColumnGrid({
  className,
  children,
  ...props
}: ThreeColumnGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
