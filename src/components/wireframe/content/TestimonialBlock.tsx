import React from "react";
import { cn } from "@/lib/utils";

interface TestimonialBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  author: string;
  role?: string;
  avatar?: React.ReactNode;
}

export function TestimonialBlock({
  className,
  quote,
  author,
  role,
  avatar,
  ...props
}: TestimonialBlockProps) {
  return (
    <div
      className={cn(
        "p-10 bg-paper border-2 border-pencil border-dashed rounded-lg shadow-sketch relative flex flex-col gap-6 rotate-[0.2deg]",
        className
      )}
      {...props}
    >
      <div className="-rotate-[0.2deg]">
        <svg
          className="absolute -top-4 -left-2 w-12 h-12 text-pencil opacity-20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="font-sketch text-3xl font-medium text-pencil italic leading-snug">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-4 mt-8">
          {avatar && (
            <div className="w-12 h-12 rounded-full border-2 border-pencil bg-white overflow-hidden flex items-center justify-center shrink-0">
              {avatar}
            </div>
          )}
          <div>
            <p className="font-body font-bold text-pencil text-lg leading-none">
              {author}
            </p>
            {role && (
              <p className="font-body text-sm text-pencil-light mt-1 uppercase tracking-widest font-semibold">
                {role}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
