import React from "react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../primitives/ImagePlaceholder";
import { Button } from "../buttons/Button";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  message: string;
  actionText?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  className,
  title,
  message,
  actionText,
  onActionClick,
  icon,
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center py-24 px-8 text-center bg-paper border-4 border-pencil border-dashed rounded-lg shadow-sketch rotate-[-0.5deg]",
        className
      )}
      {...props}
    >
      <div className="rotate-[0.5deg] flex flex-col items-center">
        {icon ? (
          <div className="w-24 h-24 text-pencil-light opacity-60 mb-10 -rotate-3 scale-110">
            {icon}
          </div>
        ) : (
          <ImagePlaceholder 
            width="200px" 
            height="140px" 
            className="mb-10 pointer-events-none opacity-40 shadow-none border-pencil-border" 
          />
        )}
        
        <h3 className="font-sketch text-4xl font-black text-pencil mb-4 tracking-tighter">
          {title}
        </h3>
        <p className="font-body text-lg text-pencil-light max-w-md mx-auto leading-relaxed mb-10">
          {message}
        </p>
        
        {actionText && (
          <Button variant="cta" onClick={onActionClick}>
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
