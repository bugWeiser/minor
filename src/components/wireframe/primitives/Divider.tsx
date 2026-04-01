import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({ 
  className,
  orientation = "horizontal",
  ...props 
}: DividerProps) {
  return (
    <hr
      className={cn(
        "border-pencil border-dashed",
        orientation === "horizontal" ? "w-full border-t-2 my-4" : "h-full border-l-2 mx-4",
        "-rotate-[0.5deg]", // Slight sketch tilt
        className
      )}
      {...props}
    />
  );
}
