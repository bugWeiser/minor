import React from "react";
import { cn } from "@/lib/utils";

interface TwoColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  left: React.ReactNode;
  right: React.ReactNode;
  stackOnMobile?: boolean;
}

export function TwoColumnLayout({
  className,
  left,
  right,
  stackOnMobile = true,
  ...props
}: TwoColumnLayoutProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-16",
        stackOnMobile ? "md:grid-cols-2" : "grid-cols-2",
        className
      )}
      {...props}
    >
      <div className="w-full flex-grow">{left}</div>
      <div className="w-full flex-grow">{right}</div>
    </div>
  );
}
