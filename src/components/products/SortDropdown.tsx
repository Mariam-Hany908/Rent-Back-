import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types';

export interface SortDropdownOption {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortDropdownOption[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Rating: High to Low' },
  { value: 'newest', label: 'Newest Additions' }
];

export interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
  id?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
  className = '',
  id = 'sort-dropdown'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef} id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B132B] shadow-2xs hover:bg-slate-50/80 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#10605B]/20 transition-all duration-150 cursor-pointer"
      >
        <span className="flex items-center gap-1.5 text-slate-500 font-medium">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span>Sort by:</span>
        </span>
        <span className="text-[#0B132B] font-bold">{currentOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 z-30 mt-1.5 w-52 origin-top-right rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B132B]'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#10605B] stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
