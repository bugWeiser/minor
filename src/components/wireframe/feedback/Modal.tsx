import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "../buttons/Button";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  className,
  isOpen,
  onClose,
  title,
  children,
  footer,
  ...props
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-fadeUp">
      {/* OVERLAY */}
      <div 
        className="absolute inset-0 bg-pencil/40 backdrop-blur-sm -rotate-[0.5deg]"
        onClick={onClose}
      />
      
      {/* DIALOG BOX */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-2xl bg-paper border-4 border-pencil rounded-md shadow-[8px_8px_0_#2d2d2d] rotate-[0.5deg] overflow-hidden flex flex-col max-h-[80vh]",
          className
        )}
        {...props}
      >
        <div className="-rotate-[0.5deg] flex flex-col h-full">
          {/* HEADER */}
          <header className="px-8 py-6 border-b-2 border-pencil border-dashed flex items-center justify-between">
            <h2 className="font-sketch text-4xl font-black text-pencil">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-sm bg-white border-2 border-pencil-border text-pencil hover:bg-pencil hover:text-white transition-all shadow-[2px_2px_0_#c4c4c4] active:shadow-none flex items-center justify-center"
            >
              <HiOutlineXMark className="w-6 h-6 pointer-events-none" />
            </button>
          </header>
          
          {/* CONTENT */}
          <div className="p-8 pb-10 overflow-y-auto font-body text-base text-pencil leading-relaxed flex-grow">
            {children}
          </div>
          
          {/* FOOTER */}
          {footer && (
            <footer className="px-8 py-6 border-t-2 border-pencil border-dashed flex justify-end gap-4 bg-pencil/5">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
