import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  ChevronRight, 
  Search, 
  RotateCcw, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { productService } from '../../services/productService';
import { Product, ProductCategorySlug, ProductFilterOptions, SortOption } from '../../types';
import { SearchBar, SearchBarState } from '../../components/forms/SearchBar';
import { ProductCard, ProductCardSkeleton } from '../../components/products/ProductCard';
import { FilterPanel } from '../../components/products/FilterPanel';
import { SortDropdown } from '../../components/products/SortDropdown';
import { ActiveFilters } from '../../components/products/ActiveFilters';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { getCategoryBySlug, CATEGORIES } from '../../utils/categories';

const PAGE_SIZE = 8;

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parse filters from URL
  const currentFilters = useMemo<ProductFilterOptions>(() => {
    const q = searchParams.get('q') || '';
    const category = (searchParams.get('category') as ProductCategorySlug) || '';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!, 10) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!, 10) : undefined;
    const location = searchParams.get('location') || '';
    const condition = searchParams.get('condition') || '';
    const minRating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined;
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const sort = (searchParams.get('sort') as SortOption) || 'recommended';

    // Parse category fields
    const categoryFields: Record<string, string> = {};
    searchParams.forEach((val, key) => {
      if (key.startsWith('cf_')) {
        const fieldName = key.replace('cf_', '');
        categoryFields[fieldName] = val;
      }
    });

    return {
      searchQuery: q,
      category: category || undefined,
      minPrice,
      maxPrice,
      location: location || undefined,
      condition: condition || undefined,
      minRating,
      startDate,
      endDate,
      sort,
      categoryFields: Object.keys(categoryFields).length > 0 ? categoryFields : undefined
    };
  }, [searchParams]);

  // Product listing state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter metadata (aggregates for price bounds, available locations, brands)
  const [filterMeta, setFilterMeta] = useState<{
    locations: string[];
    cities: string[];
    minPrice: number;
    maxPrice: number;
    brands: string[];
  }>({
    locations: [],
    cities: [],
    minPrice: 0,
    maxPrice: 5000,
    brands: []
  });

  // Mobile drawer filter state (temporary before applying)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [tempMobileFilters, setTempMobileFilters] = useState<ProductFilterOptions>(currentFilters);

  // Keep temp filters in sync when drawer opens
  const handleOpenMobileFilters = () => {
    setTempMobileFilters(currentFilters);
    setIsMobileFilterOpen(true);
  };

  // Sync state to URL search parameters
  const updateUrlParams = useCallback((newFilters: ProductFilterOptions) => {
    const params = new URLSearchParams();

    if (newFilters.searchQuery && newFilters.searchQuery.trim()) {
      params.set('q', newFilters.searchQuery.trim());
    }
    if (newFilters.category && newFilters.category !== 'all') {
      params.set('category', newFilters.category);
    }
    if (newFilters.minPrice !== undefined && !isNaN(newFilters.minPrice)) {
      params.set('minPrice', newFilters.minPrice.toString());
    }
    if (newFilters.maxPrice !== undefined && !isNaN(newFilters.maxPrice)) {
      params.set('maxPrice', newFilters.maxPrice.toString());
    }
    if (newFilters.location && newFilters.location.trim()) {
      params.set('location', newFilters.location.trim());
    }
    if (newFilters.condition && newFilters.condition !== 'all') {
      params.set('condition', newFilters.condition);
    }
    if (newFilters.minRating && newFilters.minRating > 0) {
      params.set('rating', newFilters.minRating.toString());
    }
    if (newFilters.startDate) {
      params.set('startDate', newFilters.startDate);
    }
    if (newFilters.endDate) {
      params.set('endDate', newFilters.endDate);
    }
    if (newFilters.sort && newFilters.sort !== 'recommended') {
      params.set('sort', newFilters.sort);
    }

    if (newFilters.categoryFields) {
      Object.entries(newFilters.categoryFields).forEach(([k, v]) => {
        if (v && v.trim()) {
          params.set(`cf_${k}`, v.trim());
        }
      });
    }

    setSearchParams(params, { replace: false });
    // Reset pagination to first page
    setVisibleCount(PAGE_SIZE);
  }, [setSearchParams]);

  // Load products based on current filters
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await productService.getProducts(currentFilters);
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters]);

  // Load filter metadata
  useEffect(() => {
    productService.getFilterMeta(currentFilters.category).then(setFilterMeta);
  }, [currentFilters.category]);

  // Fetch products whenever filters in URL change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers
  const handleSearchBarSubmit = (searchState: SearchBarState) => {
    updateUrlParams({
      ...currentFilters,
      searchQuery: searchState.keyword,
      category: searchState.category ? (searchState.category as ProductCategorySlug) : undefined,
      location: searchState.location || undefined,
      startDate: searchState.startDate || undefined,
      endDate: searchState.endDate || undefined
    });
  };

  const handleSortChange = (newSort: SortOption) => {
    updateUrlParams({
      ...currentFilters,
      sort: newSort
    });
  };

  const handleDirectFilterChange = (updated: ProductFilterOptions) => {
    updateUrlParams(updated);
  };

  const handleApplyMobileFilters = () => {
    updateUrlParams(tempMobileFilters);
    setIsMobileFilterOpen(false);
  };

  const handleClearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setVisibleCount(PAGE_SIZE);
    if (isMobileFilterOpen) {
      setTempMobileFilters({ sort: currentFilters.sort });
    }
  };

  const handleRemoveSingleFilter = (key: keyof ProductFilterOptions, subKey?: string) => {
    const updated = { ...currentFilters };

    if (key === 'categoryFields' && subKey && updated.categoryFields) {
      const copyFields = { ...updated.categoryFields };
      delete copyFields[subKey];
      updated.categoryFields = Object.keys(copyFields).length > 0 ? copyFields : undefined;
    } else if (key === 'minPrice' || key === 'maxPrice') {
      delete updated[key];
    } else if (key === 'startDate' || key === 'endDate') {
      delete updated.startDate;
      delete updated.endDate;
    } else {
      delete updated[key];
    }

    updateUrlParams(updated);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
  };

  // Active filter count for mobile trigger button badge
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.category && currentFilters.category !== 'all') count++;
    if (currentFilters.minPrice !== undefined || currentFilters.maxPrice !== undefined) count++;
    if (currentFilters.location) count++;
    if (currentFilters.condition && currentFilters.condition !== 'all') count++;
    if (currentFilters.minRating) count++;
    if (currentFilters.startDate || currentFilters.endDate) count++;
    if (currentFilters.categoryFields) {
      count += Object.keys(currentFilters.categoryFields).length;
    }
    return count;
  }, [currentFilters]);

  // Dynamic header titles
  const categoryInfo = currentFilters.category && currentFilters.category !== 'all'
    ? getCategoryBySlug(currentFilters.category)
    : undefined;

  let pageTitle = 'All Available Rentals';
  if (currentFilters.searchQuery) {
    pageTitle = `Results for "${currentFilters.searchQuery}"`;
  } else if (categoryInfo) {
    pageTitle = `${categoryInfo.name} Rentals`;
  }

  const displayedProducts = products.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-16">
      {/* Top Search & Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 bg-white shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3 sm:mb-4">
            <Link to="/" className="hover:text-[#10605B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {categoryInfo ? (
              <>
                <Link to="/search" className="hover:text-[#10605B] transition-colors">
                  Rentals
                </Link>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-[#0B132B] font-bold">{categoryInfo.name}</span>
              </>
            ) : (
              <span className="text-[#0B132B] font-bold">Search Catalog</span>
            )}
          </nav>

          {/* Integrated Search Bar */}
          <SearchBar
            variant="full"
            placeholder="Search high-value items, cameras, clothing, electronics..."
            initialValues={{
              keyword: currentFilters.searchQuery || '',
              category: currentFilters.category || '',
              location: currentFilters.location || '',
              startDate: currentFilters.startDate || '',
              endDate: currentFilters.endDate || ''
            }}
            onSearch={handleSearchBarSubmit}
            className="shadow-xs"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Results Header: Title, Count, Sort, Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-200/80">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0B132B] tracking-tight">
              {pageTitle}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              {isLoading ? (
                'Finding verified listings...'
              ) : (
                <>
                  Showing <span className="text-[#0B132B] font-bold">{products.length}</span>{' '}
                  {products.length === 1 ? 'item' : 'items'} available through Rent Back
                  guaranteed escrow & hubs.
                </>
              )}
            </p>
          </div>

          {/* Controls Right: Mobile Filter Button & Desktop Sort Dropdown */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={handleOpenMobileFilters}
              className="lg:hidden flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-[#0B132B] shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#10605B]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10605B] text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <SortDropdown
              value={currentFilters.sort || 'recommended'}
              onChange={handleSortChange}
            />
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        <div className="mt-4">
          <ActiveFilters
            filters={currentFilters}
            onRemove={handleRemoveSingleFilter}
            onClearAll={handleClearAllFilters}
          />
        </div>

        {/* 2-Column Catalog Grid Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Sidebar: FilterPanel */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-rentback-card">
              <FilterPanel
                filters={currentFilters}
                onChange={handleDirectFilterChange}
                onClear={handleClearAllFilters}
                meta={filterMeta}
              />
            </div>

            {/* Trust Intermediary Guarantee Callout */}
            <div className="mt-4 rounded-xl border border-[#10605B]/15 bg-[#E8F6F5]/50 p-3.5">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#10605B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#0B132B] block">Rent Back Verified</span>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Every listed item passes central physical condition testing. 50% security
                    deposit is protected in escrow.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Results Column */}
          <main className="lg:col-span-9">
            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {!isLoading && isError && (
              <ErrorState
                title="Unable to load rental listings"
                message="We encountered a temporary connection issue while searching listings. Please try again."
                onRetry={fetchProducts}
                className="my-8"
              />
            )}

            {/* Empty State */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="my-6">
                <EmptyState
                  title="No rental items match your criteria"
                  description="Try removing some filters, adjusting your price range, or searching for a broader keyword."
                  actionLabel="Clear all filters"
                  onAction={handleClearAllFilters}
                  secondaryActionLabel="Browse All Categories"
                  onSecondaryAction={() => {
                    handleClearAllFilters();
                    navigate('/search');
                  }}
                />
              </div>
            )}

            {/* Populated Product Grid */}
            {!isLoading && !isError && products.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col items-center">
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    Showing <span className="font-bold text-[#0B132B]">{displayedProducts.length}</span>{' '}
                    of <span className="font-bold text-[#0B132B]">{products.length}</span> items
                  </p>

                  {/* Progress bar */}
                  <div className="w-48 h-1.5 rounded-full bg-slate-100 overflow-hidden mb-5">
                    <div
                      className="h-full bg-[#10605B] rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (displayedProducts.length / products.length) * 100)}%`
                      }}
                    />
                  </div>

                  {displayedProducts.length < products.length ? (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleLoadMore}
                      className="min-w-[180px]"
                    >
                      Load More Items
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <Check className="w-4 h-4 text-[#1EC2A4]" />
                      <span>You've reached the end of the available listings</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      <Modal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Rentals"
        description="Refine catalog results by price, category, condition, and availability."
        maxWidth="md"
      >
        <div className="max-h-[75vh] overflow-y-auto px-1 pb-2">
          <FilterPanel
            filters={tempMobileFilters}
            onChange={setTempMobileFilters}
            onClear={() => setTempMobileFilters({ sort: currentFilters.sort })}
            onApply={handleApplyMobileFilters}
            isMobileModal={true}
            meta={filterMeta}
          />
        </div>
      </Modal>
    </div>
  );
};
