import React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

export function Tooltip({
  className,
  text,
  position = "top",
  children,
  ...props
}: TooltipProps) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
    left: "right-full top-1/2 -translate-y-1/2 mr-4",
    right: "left-full top-1/2 -translate-y-1/2 ml-4",
  };

  const arrowPositions = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-1.5 border-t-pencil",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1.5 border-b-pencil",
    left: "left-full top-1/2 -translate-y-1/2 -ml-1.5 border-l-pencil",
    right: "right-full top-1/2 -translate-y-1/2 -mr-1.5 border-r-pencil",
  };

  return (
    <div className={cn("group relative inline-block", className)} {...props}>
      {children}
      <div
        className={cn(
          "absolute pointer-events-none z-[110] px-4 py-2 bg-charcoal border-2 border-pencil text-paper font-sketch text-lg leading-tight font-bold rounded-sm shadow-sketch opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 whitespace-nowrap",
          positions[position]
        )}
      >
        {text}
        
        {/* ARROW */}
        <div className={cn(
          "absolute w-0 h-0 border-[6px] border-transparent",
          arrowPositions[position]
        )} />
      </div>
    </div>
  );
}
