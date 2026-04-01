import React from "react";
import { cn } from "@/lib/utils";

interface StatsRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

export function StatsRow({ className, stats, ...props }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6 bg-paper border-2 border-pencil border-dashed rounded-lg shadow-sketch rotate-[0.5deg]",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full -rotate-[0.5deg]">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-3 w-full"
          >
            {stat.icon && (
              <div className="w-10 h-10 rounded-sm bg-accent/20 flex items-center justify-center text-pencil rotate-3 shadow-[2px_2px_0_#c4c4c4]">
                {stat.icon}
              </div>
            )}
            <div className="space-y-1">
              <p className="font-sketch text-4xl font-black text-pencil">
                {stat.value}
              </p>
              <p className="font-body text-xs font-bold text-pencil-light uppercase tracking-widest leading-none">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
