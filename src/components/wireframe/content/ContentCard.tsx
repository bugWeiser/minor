import React from "react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "../primitives/ImagePlaceholder";
import { Button } from "../buttons/Button";

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  imageHeight?: string | number;
}

export function ContentCard({
  className,
  title,
  description,
  actionText,
  onActionClick,
  imageHeight = "180px",
  ...props
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-white border-2 border-pencil rounded-md shadow-sketch overflow-hidden flex flex-col -rotate-[0.3deg] transition-all hover:-rotate-0 hover:shadow-sketch-hover",
        className
      )}
      {...props}
    >
      <ImagePlaceholder height={imageHeight} className="border-0 border-b-2 rounded-none" />
      <div className="p-8 space-y-6">
        <div>
          <h3 className="font-sketch text-3xl font-bold text-pencil mb-2">
            {title}
          </h3>
          <p className="font-body text-base text-pencil-light leading-relaxed">
            {description}
          </p>
        </div>
        {actionText && (
          <Button variant="secondary" onClick={onActionClick} className="w-full">
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
