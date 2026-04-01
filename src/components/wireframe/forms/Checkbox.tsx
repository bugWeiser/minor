import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={generatedId}
            ref={ref}
            className={cn(
              "peer h-5 w-5 appearance-none rounded-sm border-2 border-pencil bg-paper outline-none cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-sketch-blue/30 focus-visible:ring-offset-1 transition-all",
              "rotate-[2deg] shadow-[1px_1px_0_#c4c4c4] checked:shadow-none checked:translate-x-[1px] checked:translate-y-[1px]",
              className
            )}
            {...props}
          />
          <svg
            className="absolute pointer-events-none w-4 h-4 text-sketch-blue scale-0 peer-checked:scale-110 transition-transform duration-200 -rotate-[10deg]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <label 
          htmlFor={generatedId} 
          className="text-base font-body text-pencil cursor-pointer select-none leading-tight pt-0.5 hover:text-pencil-light transition-colors"
        >
          {label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
