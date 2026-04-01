import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[120px] w-full rounded-sm border-2 bg-paper px-4 py-3 text-base font-body",
          "placeholder:text-pencil-light/60 transition-all outline-none resize-y",
          "shadow-[2px_2px_0_#c4c4c4] focus-visible:shadow-[4px_4px_0_#a0a0a0]",
          "-rotate-[0.2deg] focus-visible:rotate-0",
          error 
            ? "border-sketch-red focus-visible:ring-2 ring-sketch-red/20" 
            : "border-pencil focus-visible:ring-2 ring-sketch-blue/20",
          className
        )}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextArea";
