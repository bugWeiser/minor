import React from "react";
import { cn } from "@/lib/utils";

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  helperText?: string;
  htmlFor?: string;
  required?: boolean;
}

export function FormGroup({ 
  className, 
  label, 
  error, 
  helperText, 
  htmlFor,
  required,
  children,
  ...props 
}: FormGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <label 
        htmlFor={htmlFor} 
        className="font-sketch text-2xl font-bold text-pencil leading-none tracking-wide"
      >
        {label}
        {required && <span className="text-sketch-red ml-1">*</span>}
      </label>
      
      {children}
      
      {error && (
        <p className="text-sm font-body font-medium text-sketch-red flex items-center gap-1.5 mt-0.5">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-sm font-body text-pencil-light mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
}
