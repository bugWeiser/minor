import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-pencil-border/20 border-2 border-pencil-border border-dashed shadow-[2px_2px_0_#e2e8f0]",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-sm",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <div className="w-full h-full opacity-10 bg-[radial-gradient(var(--pencil-border)_1px,transparent_0)] bg-[size:10px_10px]" />
    </div>
  );
}
