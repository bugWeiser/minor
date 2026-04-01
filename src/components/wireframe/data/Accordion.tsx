import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

export function AccordionItem({ title, children, isOpen: defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-pencil overflow-hidden bg-white mb-4 rounded-sm shadow-sketch -rotate-[0.5deg] hover:rotate-0 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-8 py-5 flex items-center justify-between text-left font-sketch text-2xl font-black text-pencil transition-colors bg-white hover:bg-paper",
          isOpen && "border-b-2 border-pencil border-dashed"
        )}
      >
        <span>{title}</span>
        {isOpen ? (
          <HiOutlineChevronUp className="w-6 h-6 shrink-0 text-sketch-blue transition-transform duration-300" />
        ) : (
          <HiOutlineChevronDown className="w-6 h-6 shrink-0 text-pencil transition-transform duration-300" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-8 font-body text-base text-pencil leading-relaxed animate-fadeUp">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Accordion({ className, children, ...props }: AccordionProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}
