import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { ProductFilterOptions } from '../../types';
import { getCategoryBySlug } from '../../utils/categories';

export interface ActiveFiltersProps {
  filters: ProductFilterOptions;
  onRemove: (key: keyof ProductFilterOptions, subKey?: string) => void;
  onClearAll: () => void;
  className?: string;
  id?: string;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemove,
  onClearAll,
  className = '',
  id = 'active-filters'
}) => {
  const chips: {
    id: string;
    label: string;
    onRemove: () => void;
  }[] = [];

  // Search keyword
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    chips.push({
      id: 'searchQuery',
      label: `"${filters.searchQuery}"`,
      onRemove: () => onRemove('searchQuery')
    });
  }

  // Category
  if (filters.category && filters.category !== 'all') {
    const cat = getCategoryBySlug(filters.category);
    chips.push({
      id: 'category',
      label: cat ? cat.name : filters.category,
      onRemove: () => onRemove('category')
    });
  }

  // Price
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    chips.push({
      id: 'price-range',
      label: `${filters.minPrice} - ${filters.maxPrice} EGP/day`,
      onRemove: () => {
        onRemove('minPrice');
        onRemove('maxPrice');
      }
    });
  } else if (filters.minPrice !== undefined) {
    chips.push({
      id: 'minPrice',
      label: `From ${filters.minPrice} EGP/day`,
      onRemove: () => onRemove('minPrice')
    });
  } else if (filters.maxPrice !== undefined) {
    chips.push({
      id: 'maxPrice',
      label: `Up to ${filters.maxPrice} EGP/day`,
      onRemove: () => onRemove('maxPrice')
    });
  }

  // Location
  if (filters.location && filters.location.trim() !== '') {
    chips.push({
      id: 'location',
      label: filters.location,
      onRemove: () => onRemove('location')
    });
  }

  // Availability Dates
  if (filters.startDate && filters.endDate) {
    chips.push({
      id: 'dates',
      label: `${filters.startDate} → ${filters.endDate}`,
      onRemove: () => {
        onRemove('startDate');
        onRemove('endDate');
      }
    });
  } else if (filters.startDate) {
    chips.push({
      id: 'startDate',
      label: `From ${filters.startDate}`,
      onRemove: () => onRemove('startDate')
    });
  }

  // Condition
  if (filters.condition && filters.condition !== 'all') {
    const formattedCond = filters.condition
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    chips.push({
      id: 'condition',
      label: formattedCond,
      onRemove: () => onRemove('condition')
    });
  }

  // Rating
  if (filters.minRating && filters.minRating > 0) {
    chips.push({
      id: 'minRating',
      label: `${filters.minRating}.0+ Stars`,
      onRemove: () => onRemove('minRating')
    });
  }

  // Dynamic Category Fields
  if (filters.categoryFields) {
    Object.entries(filters.categoryFields).forEach(([key, val]) => {
      if (val && val !== 'all') {
        const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        chips.push({
          id: `field-${key}`,
          label: `${readableKey}: ${val}`,
          onRemove: () => onRemove('categoryFields', key)
        });
      }
    });
  }

  if (chips.length === 0) return null;

  return (
    <div id={id} className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-semibold text-slate-400 mr-1">
        Active Filters ({chips.length}):
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6F5] border border-[#10605B]/20 px-3 py-1 text-xs font-semibold text-[#10605B] animate-in fade-in duration-150"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            className="rounded-full p-0.5 hover:bg-[#10605B]/20 text-[#10605B] transition-colors cursor-pointer"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3 stroke-[2.5]" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 ml-1 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear all</span>
      </button>
    </div>
  );
};
