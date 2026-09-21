import React, { useState } from 'react';
import { Search, MapPin, Calendar, Layers, X, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../utils/categories';
import { Button } from '../common/Button';

export interface SearchBarState {
  keyword: string;
  category: string;
  location: string;
  startDate?: string;
  endDate?: string;
}

export interface SearchBarProps {
  initialValues?: Partial<SearchBarState>;
  onSearch?: (values: SearchBarState) => void;
  variant?: 'compact' | 'full';
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValues,
  onSearch,
  variant = 'full',
  placeholder = 'Search cameras, designer suits, drones, tools...',
  className = ''
}) => {
  const [keyword, setKeyword] = useState(initialValues?.keyword || '');
  const [category, setCategory] = useState(initialValues?.category || '');
  const [location, setLocation] = useState(initialValues?.location || '');
  const [startDate, setStartDate] = useState(initialValues?.startDate || '');
  const [endDate, setEndDate] = useState(initialValues?.endDate || '');

  React.useEffect(() => {
    setKeyword(initialValues?.keyword || '');
    setCategory(initialValues?.category || '');
    setLocation(initialValues?.location || '');
    setStartDate(initialValues?.startDate || '');
    setEndDate(initialValues?.endDate || '');
  }, [
    initialValues?.keyword,
    initialValues?.category,
    initialValues?.location,
    initialValues?.startDate,
    initialValues?.endDate
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, category, location, startDate, endDate });
    }
  };

  const handleClear = () => {
    setKeyword('');
    setCategory('');
    setLocation('');
    setStartDate('');
    setEndDate('');
  };

  if (variant === 'compact') {
    return (
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center w-full rounded-full border border-slate-200/90 bg-slate-50/80 focus-within:bg-white focus-within:border-[#10605B] focus-within:ring-2 focus-within:ring-[#10605B]/15 transition-all duration-150 ${className}`}
        role="search"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2 pl-10 pr-10 text-xs text-[#0B132B] placeholder:text-slate-400 focus:outline-none"
        />
        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            aria-label="Clear keyword"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-3 shadow-rentback-card ${className}`}
      role="search"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
        {/* 1. Keyword Field */}
        <div className="md:col-span-4 flex items-center px-3 py-2 rounded-xl bg-slate-50/70 border border-slate-100 focus-within:bg-white focus-within:border-[#10605B] focus-within:ring-1 focus-within:ring-[#10605B]/20 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-1">
              What are you renting?
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Sony FX3, Tuxedo..."
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0B132B] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. Category Selector */}
        <div className="md:col-span-3 flex items-center px-3 py-2 rounded-xl bg-slate-50/70 border border-slate-100 focus-within:bg-white focus-within:border-[#10605B] focus-within:ring-1 focus-within:ring-[#10605B]/20 transition-all">
          <Layers className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0B132B] focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Location */}
        <div className="md:col-span-3 flex items-center px-3 py-2 rounded-xl bg-slate-50/70 border border-slate-100 focus-within:bg-white focus-within:border-[#10605B] focus-within:ring-1 focus-within:ring-[#10605B]/20 transition-all">
          <MapPin className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-1">
              Location / Hub
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. New Cairo, Maadi..."
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#0B132B] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 4. Action Button */}
        <div className="md:col-span-2 flex items-center gap-2">
          <Button
            type="submit"
            variant="brand"
            size="md"
            fullWidth
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#1EC2A4]" />}
            className="h-[46px]"
          >
            <span>Search</span>
          </Button>
        </div>
      </div>
    </form>
  );
};
