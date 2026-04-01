import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-pencil-light group-focus-within:text-sketch-blue transition-colors">
          <HiOutlineMagnifyingGlass className="w-5 h-5 -rotate-6" />
        </div>
        <input
          ref={ref}
          type="search"
          className={cn(
            "flex h-12 w-full rounded-sm border-2 bg-white pl-12 pr-4 py-2 text-base font-body",
            "placeholder:text-pencil-light/60 transition-all outline-none",
            "shadow-[3px_3px_0_#c4c4c4] focus-within:shadow-[5px_5px_0_#a0a0a0]",
            "border-pencil focus-visible:ring-2 ring-sketch-blue/20 -rotate-[0.3deg] focus-visible:rotate-0",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";
