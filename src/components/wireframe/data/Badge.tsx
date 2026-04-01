import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-pencil text-paper border-pencil shadow-[1.5px_1.5px_0_#6b6b6b]",
    secondary: "bg-paper text-pencil border-pencil shadow-[1.5px_1.5px_0_#c4c4c4]",
    success: "bg-sketch-green text-white border-pencil shadow-[1.5px_1.5px_0_#4ad97a]",
    danger: "bg-sketch-red text-white border-pencil shadow-[1.5px_1.5px_0_#d94a4a]",
    warning: "bg-sketch-yellow text-pencil border-pencil shadow-[1.5px_1.5px_0_#d9b44a]",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-4 py-1.5 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm font-black font-body uppercase tracking-[0.14em] border-2 rotate-[-2deg] hover:rotate-2 transition-all cursor-default scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="rotate-[2deg] group-hover:-rotate-2">{children}</span>
    </span>
  );
}
