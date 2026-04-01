import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function PageContainer({
  className,
  size = "lg",
  children,
  ...props
}: PageContainerProps) {
  const sizes = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-6 md:px-12",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
