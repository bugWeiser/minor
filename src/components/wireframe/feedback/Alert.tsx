import React from "react";
import { cn } from "@/lib/utils";
import { HiOutlineInformationCircle, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineXCircle } from "react-icons/hi2";

export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
}

const ICONS = {
  info: HiOutlineInformationCircle,
  success: HiOutlineCheckCircle,
  warning: HiOutlineExclamationTriangle,
  error: HiOutlineXCircle,
};

const THEMES = {
  info: "bg-sketch-blue-soft border-sketch-blue text-pencil",
  success: "bg-sketch-green-soft border-sketch-green text-pencil",
  warning: "bg-sketch-yellow-soft border-sketch-yellow text-pencil",
  error: "bg-sketch-red-soft border-sketch-red text-pencil",
};

export function Alert({
  className,
  variant = "info",
  title,
  children,
  onClose,
  ...props
}: AlertProps) {
  const Icon = ICONS[variant];

  return (
    <div
      role="alert"
      className={cn(
        "p-6 border-2 rounded-sm shadow-sketch relative flex gap-6 rotate-[0.5deg] animate-fadeUp",
        variant === "info" && "bg-sketch-blue-soft border-sketch-blue text-pencil shadow-[3px_3px_0px_#4a90d9]",
        variant === "success" && "bg-sketch-green-soft border-sketch-green text-pencil shadow-[3px_3px_0px_#4ad97a]",
        variant === "warning" && "bg-sketch-yellow-soft border-sketch-yellow text-pencil shadow-[3px_3px_0px_#d9b44a]",
        variant === "error" && "bg-sketch-red-soft border-sketch-red text-pencil shadow-[3px_3px_0px_#d94a4a]",
        className
      )}
      {...props}
    >
      <div className="-rotate-[0.5deg] flex gap-5 w-full">
        <Icon className={cn(
          "w-8 h-8 shrink-0 mt-1",
          variant === "info" && "text-sketch-blue",
          variant === "success" && "text-sketch-green",
          variant === "warning" && "text-sketch-yellow",
          variant === "error" && "text-sketch-red"
        )} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-sketch text-2xl font-black mb-1 opacity-90 leading-tight">
              {title}
            </h4>
          )}
          <div className="font-body text-base font-medium leading-relaxed opacity-80">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-white border-2 border-pencil-border text-pencil-light hover:text-pencil hover:border-pencil transition-all shadow-[1px_1px_0_#c4c4c4] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center"
          >
            <HiOutlineXCircle className="w-5 h-5 pointer-events-none" />
          </button>
        )}
      </div>
    </div>
  );
}
