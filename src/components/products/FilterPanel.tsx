import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  Check, 
  ChevronDown, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  Sparkles, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { ProductCategorySlug, ProductFilterOptions, ProductCondition } from '../../types';
import { CATEGORIES, getCategoryBySlug } from '../../utils/categories';
import { Button } from '../common/Button';

export interface FilterPanelProps {
  filters: ProductFilterOptions;
  onChange: (updated: ProductFilterOptions) => void;
  onClear?: () => void;
  onApply?: () => void; // Used in mobile drawer to trigger closing and applying
  isMobileModal?: boolean;
  meta?: {
    locations: string[];
    cities: string[];
    minPrice: number;
    maxPrice: number;
    brands: string[];
  };
  className?: string;
  id?: string;
}

const CONDITION_OPTIONS: { value: ProductCondition; label: string; desc: string }[] = [
  { value: 'brand_new', label: 'Brand New', desc: 'Unused in factory original packaging' },
  { value: 'like_new', label: 'Like New', desc: 'Flawless condition, minimal gentle use' },
  { value: 'good', label: 'Good', desc: 'Minor cosmetic signs of normal usage' },
  { value: 'fair', label: 'Fair', desc: 'Functional with noticeable cosmetic wear' }
];

const RATING_OPTIONS = [
  { value: 4, label: '4.0 & above' },
  { value: 3, label: '3.0 & above' },
  { value: 2, label: '2.0 & above' }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onClear,
  onApply,
  isMobileModal = false,
  meta,
  className = '',
  id = 'filter-panel'
}) => {
  // Collapsible section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    availability: true,
    location: true,
    condition: true,
    rating: true,
    categoryFields: true
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (slug: ProductCategorySlug | 'all' | '') => {
    // When category changes, reset category-specific fields to avoid invalid cross-category filters
    onChange({
      ...filters,
      category: slug === 'all' ? '' : slug,
      categoryFields: {}
    });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const num = value === '' ? undefined : Math.max(0, parseInt(value, 10) || 0);
    onChange({
      ...filters,
      [field]: num
    });
  };

  const handleLocationChange = (location: string) => {
    onChange({
      ...filters,
      location: filters.location === location ? '' : location
    });
  };

  const handleConditionChange = (condition: string) => {
    onChange({
      ...filters,
      condition: filters.condition === condition ? '' : condition
    });
  };

  const handleRatingChange = (rating: number) => {
    onChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating
    });
  };

  const handleCategoryFieldChange = (fieldName: string, value: string) => {
    const currentFields = { ...(filters.categoryFields || {}) };
    if (value === '' || value === 'all') {
      delete currentFields[fieldName];
    } else {
      currentFields[fieldName] = value;
    }
    onChange({
      ...filters,
      categoryFields: currentFields
    });
  };

  const activeCategory = filters.category && filters.category !== 'all' 
    ? getCategoryBySlug(filters.category) 
    : undefined;

  // Available locations from metadata or standard fallbacks
  const availableLocations = meta?.locations?.length 
    ? meta.locations 
    : [
        'New Cairo (Fifth Settlement)',
        'Zamalek',
        'Maadi',
        'Sheikh Zayed City',
        'Heliopolis',
        'Dokki',
        'Nasr City',
        '6th of October City'
      ];

  return (
    <div id={id} className={`flex flex-col bg-white ${className}`}>
      {/* Header if embedded in desktop sidebar */}
      {!isMobileModal && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#10605B]" />
            <h2 className="text-sm font-bold text-[#0B132B]">Filters</h2>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold text-[#10605B] hover:text-[#0B132B] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          )}
        </div>
      )}

      <div className="space-y-5">
        {/* 1. Category Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Category</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.category ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.category && (
            <div className="mt-2.5 space-y-1">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  !filters.category || filters.category === 'all'
                    ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                }`}
              >
                <span>All Categories</span>
                {(!filters.category || filters.category === 'all') && (
                  <Check className="w-3.5 h-3.5 text-[#10605B]" />
                )}
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = filters.category === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#10605B] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Dynamic Category-Specific Filters */}
        {activeCategory && activeCategory.fieldDefinitions.length > 0 && (
          <div className="border-b border-slate-100 pb-4 bg-[#F8FAFB] -mx-3 px-3 py-3 rounded-xl">
            <button
              type="button"
              onClick={() => toggleSection('categoryFields')}
              className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#10605B] hover:text-[#0B132B] cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1EC2A4]" />
                <span>{activeCategory.name} Filters</span>
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  openSections.categoryFields ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.categoryFields && (
              <div className="mt-3 space-y-3.5">
                {activeCategory.fieldDefinitions.map((field) => {
                  const currentValue = filters.categoryFields?.[field.name] || '';

                  if (field.type === 'select' && field.options) {
                    return (
                      <div key={field.name}>
                        <label className="block text-[11px] font-bold text-[#0B132B] mb-1">
                          {field.label}
                        </label>
                        <select
                          value={currentValue}
                          onChange={(e) => handleCategoryFieldChange(field.name, e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs text-[#0B132B] font-medium focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                        >
                          <option value="">Any {field.label}</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  // Brand or text field
                  if (field.name === 'brand' && meta?.brands?.length) {
                    return (
                      <div key={field.name}>
                        <label className="block text-[11px] font-bold text-[#0B132B] mb-1">
                          {field.label}
                        </label>
                        <select
                          value={currentValue}
                          onChange={(e) => handleCategoryFieldChange(field.name, e.target.value)}
                          className="w-full rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs text-[#0B132B] font-medium focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                        >
                          <option value="">Any Brand</option>
                          {meta.brands.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name}>
                      <label className="block text-[11px] font-bold text-[#0B132B] mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => handleCategoryFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder || `Filter by ${field.label.toLowerCase()}`}
                        className="w-full rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs text-[#0B132B] font-medium placeholder:text-slate-400 focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. Availability Dates Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Rental Availability</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.availability ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.availability && (
            <div className="mt-2.5 space-y-2">
              <p className="text-[11px] text-slate-500 leading-snug">
                Filter for items verified available for your exact rental dates:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate || ''}
                    onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 px-2 text-xs font-medium text-[#0B132B] focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate || ''}
                    min={filters.startDate || undefined}
                    onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 px-2 text-xs font-medium text-[#0B132B] focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                  />
                </div>
              </div>
              {(filters.startDate || filters.endDate) && (
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, startDate: undefined, endDate: undefined })}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer"
                >
                  Clear dates
                </button>
              )}
            </div>
          )}
        </div>

        {/* 4. Price Per Day Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Price / Day (EGP)</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.price && (
            <div className="mt-2.5 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Min
                  </span>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice !== undefined ? filters.minPrice : ''}
                      onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                      className="w-full rounded-lg border border-slate-200 py-1.5 pl-2 pr-7 text-xs font-semibold text-[#0B132B] focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                    />
                    <span className="absolute right-2 text-[10px] font-bold text-slate-400">
                      EGP
                    </span>
                  </div>
                </div>

                <span className="text-slate-300 font-light mt-4">-</span>

                <div className="flex-1">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Max
                  </span>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="5000"
                      value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
                      onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                      className="w-full rounded-lg border border-slate-200 py-1.5 pl-2 pr-7 text-xs font-semibold text-[#0B132B] focus:border-[#10605B] focus:outline-none focus:ring-1 focus:ring-[#10605B]/20"
                    />
                    <span className="absolute right-2 text-[10px] font-bold text-slate-400">
                      EGP
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick price presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: '< 500', max: 500 },
                  { label: '500 - 1500', min: 500, max: 1500 },
                  { label: '1500+', min: 1500 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange({
                        ...filters,
                        minPrice: preset.min,
                        maxPrice: preset.max
                      });
                    }}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:border-[#10605B] hover:text-[#10605B] transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Location Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('location')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Location / Hub</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.location ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.location && (
            <div className="mt-2.5 space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => onChange({ ...filters, location: '' })}
                className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  !filters.location
                    ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                }`}
              >
                <span>All Locations</span>
                {!filters.location && <Check className="w-3.5 h-3.5 text-[#10605B]" />}
              </button>

              {availableLocations.map((loc) => {
                const isSelected = filters.location?.toLowerCase() === loc.toLowerCase();
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocationChange(loc)}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                    }`}
                  >
                    <span className="truncate">{loc}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#10605B] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Condition Filter */}
        <div className="border-b border-slate-100 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('condition')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Condition</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.condition ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.condition && (
            <div className="mt-2.5 space-y-1.5">
              {CONDITION_OPTIONS.map((cond) => {
                const isChecked = filters.condition === cond.value;
                return (
                  <label
                    key={cond.value}
                    onClick={() => handleConditionChange(cond.value)}
                    className={`flex items-start gap-2.5 p-2 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'border-[#10605B] bg-[#E8F6F5]/40'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className="pt-0.5">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#10605B] border-[#10605B] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-[#0B132B] leading-snug">
                        {cond.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">
                        {cond.desc}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 7. Rating Filter */}
        <div className="pb-2">
          <button
            type="button"
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:text-[#10605B] py-1 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Customer Rating</span>
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                openSections.rating ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.rating && (
            <div className="mt-2.5 space-y-1">
              {RATING_OPTIONS.map((opt) => {
                const isSelected = filters.minRating === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleRatingChange(opt.value)}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8F6F5] text-[#10605B] font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B132B]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < opt.value
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs">{opt.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#10605B]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Actions */}
      {isMobileModal && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
          {onClear && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClear}
              className="flex-1"
            >
              Reset All
            </Button>
          )}
          {onApply && (
            <Button
              type="button"
              variant="brand"
              size="md"
              onClick={onApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
