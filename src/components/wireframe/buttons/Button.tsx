import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineArrowPath } from "react-icons/hi2";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "cta";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-bold font-sketch text-lg tracking-wide rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-sketch-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:rotate-[1deg]";

    const variants = {
      primary: "bg-pencil text-paper border-2 border-pencil hover:bg-pencil-light hover:border-pencil-light shadow-sketch hover:shadow-sketch-hover",
      secondary: "bg-transparent text-pencil border-2 border-pencil hover:bg-pencil/5 shadow-[2px_2px_0_#c4c4c4] hover:shadow-[3px_3px_0_#a0a0a0]",
      ghost: "bg-transparent text-pencil hover:bg-pencil/10 hover:underline decoration-pencil decoration-[1.5px] border-2 border-transparent",
      danger: "bg-sketch-red text-white border-2 border-pencil shadow-sketch hover:shadow-sketch-hover hover:brightness-110",
      cta: "bg-sketch-blue text-white border-2 border-pencil shadow-[4px_4px_0_#c4c4c4] hover:shadow-[6px_6px_0_#a0a0a0] text-xl px-10 py-5 -rotate-[1deg] hover:rotate-0"
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg"
    };

    const selectedVariant = variants[variant] || variants.primary;
    const selectedSize = variant === "cta" ? "" : sizes[size];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, selectedVariant, selectedSize, className)}
        {...props}
      >
        {loading && <HiOutlineArrowPath className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
