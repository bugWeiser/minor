import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navLinks: { label: string; href: string }[];
  ctaButton?: React.ReactNode;
}

export function Navbar({
  className,
  logo,
  navLinks,
  ctaButton,
  ...props
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-paper border-b-2 border-pencil pb-4 pt-4 px-6 md:px-12 flex items-center justify-between shadow-sketch -rotate-[0.2deg]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-10 rotate-[0.2deg] w-full">
        {/* LOGO */}
        <div className="flex-shrink-0 font-sketch text-4xl font-black text-pencil tracking-tighter">
          {logo || "LOGO"}
        </div>

        {/* DESKTOP LINKS */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="font-sketch text-2xl font-bold text-pencil hover:text-sketch-blue hover:underline decoration-pencil decoration-2 underline-offset-4 transition-all -rotate-[1deg] hover:rotate-0"
            >
              {link.label}
            </a>
          ))}
          {ctaButton}
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden ml-auto p-2 border-2 border-pencil rounded-sm bg-white shadow-sketch active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiOutlineXMark className="w-6 h-6" />
          ) : (
            <HiOutlineBars3 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-paper border-b-2 border-pencil p-8 flex flex-col gap-6 md:hidden shadow-sketch animate-fadeUp z-50 rotate-[0.2deg]">
          <div className="-rotate-[0.2deg] flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="font-sketch text-3xl font-bold text-pencil p-2 border-2 border-transparent hover:border-pencil hover:bg-white rounded-sm transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {ctaButton && <div className="mt-4">{ctaButton}</div>}
          </div>
        </div>
      )}
    </header>
  );
}
