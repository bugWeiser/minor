import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineArrowPath } from "react-icons/hi2";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "secondary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-tl-md rounded-br-sm rounded-tr-sm rounded-bl-md transition-all duration-200 outline-none focus:ring-2 focus:ring-sketch-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-rotate-2";

    const variants = {
      primary: "bg-pencil text-paper border-2 border-pencil hover:bg-pencil-light shadow-sketch hover:shadow-sketch-hover",
      secondary: "bg-paper text-pencil border-2 border-pencil hover:bg-pencil/5 shadow-[2px_2px_0_#c4c4c4] hover:shadow-[3px_3px_0_#a0a0a0]",
      ghost: "bg-transparent text-pencil hover:bg-pencil/10 border-2 border-transparent",
      danger: "bg-sketch-red text-white border-2 border-pencil shadow-sketch hover:shadow-sketch-hover",
    };

    const sizes = {
      sm: "w-9 h-9 text-base",
      md: "w-11 h-11 text-xl",
      lg: "w-14 h-14 text-2xl"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? <HiOutlineArrowPath className="animate-spin" /> : children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
