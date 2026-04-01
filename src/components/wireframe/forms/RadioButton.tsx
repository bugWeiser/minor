import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <input
            type="radio"
            id={generatedId}
            ref={ref}
            className={cn(
              "peer h-5 w-5 appearance-none rounded-full border-2 border-pencil bg-paper outline-none cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-sketch-blue/30 focus-visible:ring-offset-1 transition-all",
              "shadow-[1px_1px_0_#c4c4c4] checked:shadow-none checked:translate-x-[1px] checked:translate-y-[1px]",
              "-rotate-[2deg]",
              className
            )}
            {...props}
          />
          <div className="absolute pointer-events-none w-2.5 h-2.5 rounded-full bg-pencil scale-0 peer-checked:scale-100 transition-transform duration-200" />
        </div>
        <label 
          htmlFor={generatedId} 
          className="text-base font-body text-pencil cursor-pointer select-none leading-tight hover:text-pencil-light transition-colors"
        >
          {label}
        </label>
      </div>
    );
  }
);
RadioButton.displayName = "RadioButton";
