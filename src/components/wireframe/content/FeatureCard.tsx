import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({
  className,
  icon,
  title,
  description,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "p-8 bg-white border-2 border-pencil rounded-sm shadow-sketch transition-all hover:shadow-sketch-hover hover:translate-y-[-2px] rotate-[0.5deg]",
        className
      )}
      {...props}
    >
      <div className="-rotate-[0.5deg]">
        {icon && (
          <div className="w-14 h-14 rounded-tl-lg rounded-br-md bg-paper border-2 border-pencil flex items-center justify-center text-pencil mb-6 shadow-[2px_2px_0_#c4c4c4]">
            {icon}
          </div>
        )}
        <h3 className="font-sketch text-3xl font-bold text-pencil mb-3">
          {title}
        </h3>
        <p className="font-body text-base text-pencil-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
