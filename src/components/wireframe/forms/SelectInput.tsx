import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { label: string; value: string }[];
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "appearance-none flex h-12 w-full rounded-sm border-2 bg-paper pl-4 pr-10 py-2 text-base font-body",
            "transition-all outline-none cursor-pointer",
            "shadow-[2px_2px_0_#c4c4c4] focus-visible:shadow-[4px_4px_0_#a0a0a0]",
            "rotate-[0.3deg] focus-visible:rotate-0",
            error 
              ? "border-sketch-red focus-visible:ring-2 ring-sketch-red/20" 
              : "border-pencil focus-visible:ring-2 ring-sketch-blue/20",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-pencil">
          {/* Rough chevron down */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-rotate-3">
             <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";
