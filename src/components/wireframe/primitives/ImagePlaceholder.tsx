import { cn } from "@/lib/utils";

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

export function ImagePlaceholder({ 
  className, 
  width = "100%", 
  height = "200px",
  ...props 
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-pencil-border/20 border-2 border-pencil border-dashed flex items-center justify-center rounded-sm shadow-sketch",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Decorative X shape to mimic sketch placeholders */}
      <svg className="absolute w-full h-full text-pencil opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="sr-only">Image placeholder</span>
    </div>
  );
}
