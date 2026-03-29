'use client';
import { Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import CategoryPill from './CategoryPill';

interface Props {
  selected: Category | 'All';
  onSelect: (cat: Category | 'All') => void;
}

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 px-1 scrollbar-hide -mx-1 snap-x">
      <div className="snap-start shrink-0">
        <CategoryPill category="All" active={selected === 'All'} onClick={() => onSelect('All')} />
      </div>
      {CATEGORIES.map((cat) => (
        <div key={cat} className="snap-start shrink-0">
          <CategoryPill category={cat} active={selected === cat} onClick={() => onSelect(cat)} />
        </div>
      ))}
    </div>
  );
}
