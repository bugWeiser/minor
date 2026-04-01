import React from "react";
import { cn } from "@/lib/utils";
import { PageContainer } from "./PageContainer";
import { Divider } from "../primitives/Divider";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  sections: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  copyright?: string;
  logo?: React.ReactNode;
}

export function Footer({
  className,
  sections,
  copyright,
  logo,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-paper border-t-2 border-pencil pt-24 pb-12 transition-all rotate-[0.2deg]",
        className
      )}
      {...props}
    >
      <PageContainer className="-rotate-[0.2deg]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-20">
          {/* LOGO & ABOUT */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <div className="font-sketch text-4xl font-black text-pencil tracking-tighter">
              {logo || "LOGO"}
            </div>
            <p className="font-body text-base text-pencil-light leading-relaxed max-w-xs">
              Hand-drawn components built with Tailwind CSS. Rough, minimal, and paper-textured.
            </p>
          </div>

          {/* SECTIONS */}
          {sections.map((section, i) => (
            <div key={i} className="space-y-10 group">
              <h5 className="font-sketch text-3xl font-bold text-pencil leading-none tracking-wide -rotate-[3deg] group-hover:rotate-0 transition-transform">
                {section.title}
              </h5>
              <ul className="space-y-5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="font-body text-base text-pencil-light hover:text-pencil hover:underline decoration-pencil-light decoration-2 underline-offset-4 transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="opacity-40" />

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-sm font-bold text-pencil-light opacity-60">
            {copyright || `© ${new Date().getFullYear()} Paper Wireframe Kit. All rights reserved.`}
          </p>
          <div className="flex items-center gap-8">
             <a href="#" className="font-sketch text-xl font-bold text-pencil-light hover:text-pencil hover:rotate-3 transition-all underline decoration-dotted decoration-2">Privacy</a>
             <a href="#" className="font-sketch text-xl font-bold text-pencil-light hover:text-pencil rotate-2 hover:rotate-0 transition-all underline decoration-dotted decoration-2">Terms</a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
