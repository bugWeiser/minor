'use client';

import { HiSearch, HiX } from 'react-icons/hi';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }: Props) {
  return (
    <div className={`relative w-full ${className} flex items-center`}>
      <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors text-[18px] shrink-0 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[48px] lg:h-[44px] pl-11 pr-10 rounded-xl border border-[var(--border-primary)] bg-white dark:bg-slate-800/80 text-[14px] text-slate-700 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950/30 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer p-0.5"
          aria-label="Clear search"
        >
          <HiX className="text-[14px]" />
        </button>
      )}
    </div>
  );
}
