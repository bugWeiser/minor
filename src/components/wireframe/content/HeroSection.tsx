import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../buttons/Button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function HeroSection({
  className,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center text-center py-20 px-6 bg-paper border-b-2 border-pencil border-dashed rotate-[0.5deg]",
        className
      )}
      {...props}
    >
      <div className="-rotate-[0.5deg]">
        <h1 className="font-sketch text-6xl md:text-7xl font-bold text-pencil mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="font-body text-xl md:text-2xl text-pencil-light mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        {ctaText && (
          <Button variant="cta" onClick={onCtaClick}>
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
