'use client';

import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search documentation...', className = '' }: Props) {
  return (
    <div className={`relative w-full group ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card-secondary text-text-muted group-focus-within:bg-charcoal group-focus-within:text-white transition-all duration-500 pointer-events-none">
        <HiOutlineMagnifyingGlass className="w-4 h-4" strokeWidth={2.5} />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-14 pr-12 rounded-[22px] border border-border-subtle bg-white shadow-sm shadow-black/5 text-[14px] font-bold text-charcoal placeholder:text-text-muted placeholder:font-medium focus:bg-white focus:shadow-2xl focus:shadow-black/5 focus:border-charcoal/20 outline-none transition-all duration-500"
      />
      
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-text-muted hover:text-charcoal hover:bg-bg-hover transition-all group/clear"
          aria-label="Clear Query"
        >
          <HiOutlineXMark className="w-5 h-5 group-hover/clear:rotate-90 transition-transform" />
        </button>
      )}
    </div>
  );
}
