import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../buttons/Button";
import { Divider } from "../primitives/Divider";

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier: string;
  price: string;
  frequency?: string;
  features: string[];
  ctaText?: string;
  popular?: boolean;
}

export function PricingCard({
  className,
  tier,
  price,
  frequency = "/mo",
  features,
  ctaText = "Get Started",
  popular = false,
  ...props
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "p-10 border-4 border-pencil rounded-md bg-white shadow-sketch transition-all hover:shadow-sketch-hover",
        popular && "border-sketch-blue scale-105 z-10 shadow-[6px_6px_0_#4a90d9]",
        "-rotate-[0.5deg] hover:rotate-0",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h4 className="font-sketch text-3xl font-bold text-pencil leading-none">
            {tier}
          </h4>
          <div className="flex items-end gap-1">
            <span className="font-sketch text-5xl font-black text-pencil">
              {price}
            </span>
            <span className="font-body text-base text-pencil-light font-bold mb-1">
              {frequency}
            </span>
          </div>
        </div>
        
        <Divider className="my-2" />
        
        <ul className="space-y-4 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 font-body text-base text-pencil leading-tight">
              <svg className="w-5 h-5 shrink-0 text-sketch-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          variant={popular ? "primary" : "secondary"} 
          className="w-full mt-4"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
