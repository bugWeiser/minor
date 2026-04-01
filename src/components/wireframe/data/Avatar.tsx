import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
}

export function Avatar({
  className,
  src,
  fallback,
  size = "md",
  status,
  ...props
}: AvatarProps) {
  const sizes = {
    sm: "w-10 h-10 text-xl",
    md: "w-16 h-16 text-3xl",
    lg: "w-24 h-24 text-5xl",
  };

  const statusColors = {
    online: "bg-sketch-green",
    offline: "bg-pencil-border",
    away: "bg-sketch-yellow",
  };

  return (
    <div
      className={cn(
        "relative rounded-full border-2 border-pencil overflow-hidden bg-white shadow-sketch -rotate-[2deg] flex items-center justify-center shrink-0 group transition-all hover:rotate-3",
        sizes[size],
        className
      )}
      {...props}
    >
      <div className="rotate-[2deg] group-hover:-rotate-3 w-full h-full flex items-center justify-center">
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="font-sketch font-black text-pencil uppercase tracking-tighter opacity-70">
            {fallback || "U"}
          </span>
        )}
      </div>

      {status && (
        <div 
          className={cn(
            "absolute bottom-[5%] right-[5%] w-[25%] h-[25%] rounded-full border-2 border-pencil shadow-sketch",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
