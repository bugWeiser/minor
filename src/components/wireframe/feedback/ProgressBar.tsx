import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  className,
  value,
  max = 100,
  label,
  showValue = false,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("space-y-4 w-full -rotate-[1deg]", className)} {...props}>
      <div className="flex justify-between items-end rotate-[1deg]">
        {label && (
          <span className="font-sketch text-2xl font-black text-pencil leading-tight">
            {label}
          </span>
        )}
        {showValue && (
          <span className="font-body text-xs font-black bg-pencil text-paper px-2 py-0.5 rounded-sm shadow-sketch">
             {Math.round(percentage)}%
          </span>
        )}
      </div>
      
      <div className="h-4 w-full bg-paper border-2 border-pencil rounded-full p-[2px] shadow-sketch rotate-[0.5deg]">
        <div 
          className="h-full bg-sketch-blue rounded-full border-r-2 border-pencil transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Sketchy highlight on the bar */}
          <div className="w-full h-full opacity-20 bg-[linear-gradient(90deg,transparent_25%,#fff_50%,transparent_75%)]" />
        </div>
      </div>
    </div>
  );
}
