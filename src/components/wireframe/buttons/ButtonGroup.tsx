import React from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-sm",
        "[&>button:not(:first-child)]:-ml-0.5",
        "[&>button:not(:first-child)]:border-l-0",
        "[&>button:first-child]:rounded-r-none",
        "[&>button:last-child]:rounded-l-none",
        "[&>button:not(:first-child):not(:last-child)]:rounded-none",
        "[&>button]:shadow-none [&>button:hover]:shadow-none",
        "border-2 border-pencil overflow-hidden shadow-sketch -rotate-[0.5deg]",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const childEl = child as React.ReactElement<{ className?: string }>;
        return React.cloneElement(childEl, {
          className: cn(childEl.props.className, "border-0 border-r-2 border-pencil last:border-r-0 hover:rotate-0")
        });
      })}
    </div>
  );
}
