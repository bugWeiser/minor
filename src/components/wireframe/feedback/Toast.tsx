import React from "react";
import { cn } from "@/lib/utils";
import { HiOutlineCheckCircle, HiOutlineInformationCircle, HiOutlineExclamationTriangle, HiOutlineXCircle } from "react-icons/hi2";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  variant?: "success" | "info" | "warning" | "error";
  onClose?: () => void;
}

const ICONS = {
  success: HiOutlineCheckCircle,
  info: HiOutlineInformationCircle,
  warning: HiOutlineExclamationTriangle,
  error: HiOutlineXCircle,
};

export function Toast({
  className,
  message,
  variant = "info",
  onClose,
  ...props
}: ToastProps) {
  const Icon = ICONS[variant];

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-10 right-10 z-[100] max-w-[400px] p-5 rounded-sm border-2 bg-white flex items-center gap-4 shadow-[4px_4px_0_#c4c4c4] rotate-[1deg] animate-fadeUp transition-all duration-300",
        variant === "success" && "border-sketch-green",
        variant === "info" && "border-sketch-blue",
        variant === "warning" && "border-sketch-yellow",
        variant === "error" && "border-sketch-red",
        className
      )}
      {...props}
    >
      <div className="-rotate-[1deg] flex items-center gap-4 w-full">
        <div className={cn(
          "w-10 h-10 rounded-sm border-2 border-pencil-border bg-paper flex items-center justify-center shrink-0 shadow-[2px_2px_0_#c4c4c4]",
          variant === "success" && "text-sketch-green",
          variant === "info" && "text-sketch-blue",
          variant === "warning" && "text-sketch-yellow",
          variant === "error" && "text-sketch-red"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <p className="font-sketch text-2xl font-black text-pencil flex-1 min-w-0 pr-8">
           {message}
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-pencil-light hover:text-pencil transition-colors p-1"
          >
            <HiOutlineXCircle className="w-5 h-5 pointer-events-none" />
          </button>
        )}
      </div>
    </div>
  );
}
