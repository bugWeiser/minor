import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-center gap-3">
        <label htmlFor={generatedId} className="relative inline-flex flex-shrink-0 items-center cursor-pointer group">
          <input 
            type="checkbox" 
            id={generatedId} 
            ref={ref} 
            className="sr-only peer" 
            {...props} 
          />
          <div 
            className={cn(
              "w-12 h-6 bg-paper border-2 border-pencil rounded-full peer peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-sketch-blue/30 transition-all duration-300",
              "shadow-[2px_2px_0_#c4c4c4] group-hover:shadow-[3px_3px_0_#a0a0a0]",
              "peer-checked:bg-sketch-blue peer-checked:shadow-none peer-checked:translate-x-[1px] peer-checked:translate-y-[1px]",
              "-rotate-[1deg]",
              className
            )}
          />
          <div className="absolute left-[3px] top-[3px] bg-pencil border-2 border-paper w-[14px] h-[14px] rounded-full transition-all duration-300 peer-checked:translate-x-6 peer-checked:bg-white peer-checked:border-pencil peer-checked:w-4 peer-checked:h-4 peer-checked:top-[2px] peer-checked:left-[2px]" />
        </label>
        {label && (
          <span className="text-base font-body text-pencil select-none cursor-pointer hover:text-pencil-light transition-colors">
            {label}
          </span>
        )}
      </div>
    );
  }
);
Toggle.displayName = "Toggle";
