import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck, 
  Lock, 
  ArrowRightLeft, 
  CalendarCheck, 
  CheckCircle2, 
  PackageCheck, 
  RotateCcw, 
  Sparkles,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { productService } from '../../services/productService';
import { Product, ProductCategorySlug, Review } from '../../types';
import { CATEGORIES } from '../../utils/categories';
import { Button } from '../../components/common/Button';
import { SearchBar, SearchBarState } from '../../components/forms/SearchBar';
import { CategoryCard } from '../../components/products/CategoryCard';
import { ProductCard, ProductCardSkeleton } from '../../components/products/ProductCard';
import { Rating } from '../../components/products/Rating';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorState } from '../../components/common/ErrorState';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Load Initial Data via ProductService
  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [productList, counts, reviewList] = await Promise.all([
        productService.getProducts(),
        productService.getCategoryCounts(),
        productService.getReviews()
      ]);
      setProducts(productList);
      setCategoryCounts(counts);
      setReviews(reviewList);
    } catch (err) {
      console.error('Failed to load homepage data', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search Submission Handler
  const handleSearch = (values: SearchBarState) => {
    const params = new URLSearchParams();
    if (values.keyword.trim()) params.set('q', values.keyword.trim());
    if (values.category) params.set('category', values.category);
    if (values.location.trim()) params.set('location', values.location.trim());
    if (values.startDate) params.set('startDate', values.startDate);
    if (values.endDate) params.set('endDate', values.endDate);
    navigate(`/search?${params.toString()}`);
  };

  // Quick tag search trigger
  const handleQuickSearch = (keyword: string, category?: string) => {
    const params = new URLSearchParams();
    params.set('q', keyword);
    if (category) params.set('category', category);
    navigate(`/search?${params.toString()}`);
  };

  // Filtered Products for the Featured Section
  const displayedProducts = activeCategoryFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeCategoryFilter);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#0B132B] to-[#070D1F] text-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        {/* Subtle Background Geometry */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1EC2A4] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#10605B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Value Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/60 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#1EC2A4] animate-pulse" />
              <span>Certified Handover & 50% Protected Deposit Escrow</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Rent Premium Gear. <br className="hidden sm:inline" />
              <span className="text-[#1EC2A4]">Earn From What You Own.</span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Egypt's curated peer-to-peer rental marketplace for cinema cameras, designer clothing, electronics, and specialized equipment. All handovers are inspected and verified by Rent Back.
            </p>

            {/* Two Primary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                variant="accent"
                onClick={() => {
                  const el = document.getElementById('featured-products-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/search');
                  }
                }}
                rightIcon={<Search className="w-4 h-4 text-[#0B132B]" />}
                className="w-full sm:w-auto font-bold shadow-lg shadow-[#1EC2A4]/15"
              >
                Find Something to Rent
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/owner/listings/new')}
                leftIcon={<PlusCircle className="w-4 h-4 text-[#1EC2A4]" />}
                className="w-full sm:w-auto text-white border-slate-700 bg-slate-800/40 hover:bg-slate-800 hover:text-white"
              >
                Rent Out Your Item
              </Button>
            </div>
          </div>

          {/* Prominent Search Bar */}
          <div className="mt-12 max-w-4xl mx-auto">
            <SearchBar
              variant="full"
              placeholder="Search cameras, designer suits, projectors, tools..."
              onSearch={handleSearch}
            />

            {/* Quick Keyword Exploration Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-400">Popular searches:</span>
              <button
                type="button"
                onClick={() => handleQuickSearch('Sony FX3', 'cameras')}
                className="rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700/60"
              >
                Sony FX3
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch('Tuxedo', 'clothing')}
                className="rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700/60"
              >
                Black Tuxedo
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch('Projector', 'electronics')}
                className="rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700/60"
              >
                Portable Projector
              </button>
              <button
                type="button"
                onClick={() => handleQuickSearch('DeWalt drill', 'tools')}
                className="rounded-full bg-slate-800/80 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700/60"
              >
                Hammer Drill
              </button>
            </div>
          </div>

          {/* Three Core Platform Highlights */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[#1EC2A4]">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Managed Handover & Return</p>
                <p className="text-slate-400 text-[11px]">Rent Back handles custody & inspection. No stranger meetups.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[#1EC2A4]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">50% Escrow Security Deposit</p>
                <p className="text-slate-400 text-[11px]">Held securely in escrow and released upon certified return check.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-[#1EC2A4]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Transparent 10% Platform Fee</p>
                <p className="text-slate-400 text-[11px]">Simple fee on rentals. Deposits remain 100% separate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10605B]">
                Curated Verticals
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] mt-1">
                Browse by Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Select a category to view verified gear with standardized technical inspection standards.
              </p>
            </div>

            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10605B] hover:text-[#0B4541] hover:underline transition-colors shrink-0"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                itemCount={categoryCounts[cat.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED / AVAILABLE PRODUCTS */}
      <section id="featured-products-section" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10605B]">
                Ready For Rental
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B132B] mt-1">
                Explore Available Items
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Browse certified items ready for booking with real-time deposit calculation and hub inspection.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#10605B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                All Gear
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategoryFilter(cat.slug)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    activeCategoryFilter === cat.slug
                      ? 'bg-[#10605B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid State Handling */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : isError ? (
            <ErrorState
              title="Could Not Load Available Items"
              message="We had trouble retrieving the active listings. Please try refreshing."
              onRetry={loadData}
            />
          ) : displayedProducts.length === 0 ? (
            <EmptyState
              title="No Items Found in this Category"
              description="There are currently no active listings in this category. Check back soon or list your own item."
              actionLabel="View All Items"
              onAction={() => setActiveCategoryFilter('all')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Bottom Catalog CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-[#0B132B] hover:bg-slate-50 hover:border-[#10605B] hover:text-[#10605B] shadow-xs transition-all"
            >
              <span>Explore All Catalog Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW RENT BACK WORKS */}
      <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10605B]">
              Simple & Reliable
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
              How Rent Back Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Our structured 6-step protocol guarantees safe custody, zero awkward stranger interactions, and protected deposits from start to finish.
            </p>
          </div>

          {/* 6 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  1
                </span>
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Find an Item</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Browse our curated categories or search specifically for the cinema camera, tuxedo, or tool you need.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  2
                </span>
                <CalendarCheck className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Request to Rent</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Choose your required rental dates, review transparent pricing, and submit a rental request to the owner.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  3
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#10605B]" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Get Approved</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Rent Back and the owner review the request. The item is held exclusively for your booking window.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  4
                </span>
                <Lock className="w-5 h-5 text-[#1EC2A4]" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Pay the Deposit</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Pay the required 50% security deposit. It is held securely in neutral escrow until certified return.
              </p>
            </div>

            {/* Step 5 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  5
                </span>
                <PackageCheck className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Receive the Item</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Rent Back inspects item condition at our hub and handles professional handover directly to you.
              </p>
            </div>

            {/* Step 6 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card hover:border-[#10605B]/40 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] font-extrabold text-sm">
                  6
                </span>
                <RotateCcw className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-[#0B132B]">Return the Item</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Return the item through Rent Back. Upon certified condition verification, your 50% escrow deposit is refunded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST / PLATFORM INTERMEDIARY SECTION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F6F5] px-3 py-1 text-xs font-bold text-[#10605B]">
                <ShieldCheck className="w-4 h-4 text-[#10605B]" />
                <span>The Rent Back Safe Intermediary Model</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
                No awkward meetups. <br />
                Complete protection for both sides.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Traditional peer-to-peer marketplaces force strangers to meet up, negotiate cash deposits, and argue over item condition. Rent Back acts as the trusted certified intermediary.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F6F5] text-[#10605B] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B132B]">Rent Back Handles the Handover</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Our trained hub specialists receive, inspect, and photograph the item before passing it to the renter.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F6F5] text-[#10605B] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B132B]">No Direct Stranger Contact</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Owners and renters do not need to share personal numbers or meet at random locations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F6F5] text-[#10605B] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B132B]">Pre-Screened Listings & Identity Checks</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Listings are reviewed before becoming active. Members verify their phone and official government ID.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F6F5] text-[#10605B] mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B132B]">50% Security Deposit Escrow</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Deposit funds are locked in neutral escrow, protecting against damage, delays, or unauthorized retention.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Visual Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-8 shadow-rentback-card">
                <div className="rounded-2xl bg-[#0B132B] p-6 text-white space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1EC2A4]">
                      Certified Handover Protocol
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">HUB-CAI-01</span>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div>
                        <p className="font-semibold text-slate-200">Owner Handover to Hub</p>
                        <p className="text-[11px] text-slate-400">Checked for serial, dust, accessories</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#1EC2A4] bg-[#1EC2A4]/10 px-2 py-0.5 rounded">Verified</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div>
                        <p className="font-semibold text-slate-200">50% Escrow Protection</p>
                        <p className="text-[11px] text-slate-400">Locked in neutral custody</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#1EC2A4] bg-[#1EC2A4]/10 px-2 py-0.5 rounded">Secured</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                      <div>
                        <p className="font-semibold text-slate-200">Certified Return Check</p>
                        <p className="text-[11px] text-slate-400">Staff inspection prior to deposit release</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#1EC2A4] bg-[#1EC2A4]/10 px-2 py-0.5 rounded">Guaranteed</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <Link
                      to="/how-it-works"
                      className="text-xs font-semibold text-[#1EC2A4] hover:underline underline-offset-4 inline-flex items-center gap-1"
                    >
                      <span>Read the Full Handover Policy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OWNER CTA SECTION */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-[#10605B] to-[#0B4541] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block rounded-full bg-[#1EC2A4]/20 border border-[#1EC2A4]/30 px-3 py-1 text-xs font-bold text-[#1EC2A4]">
                Own High-Value Equipment or Fashion?
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Turn Idle Gear into Steady Rental Income
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                Camera setups, designer suits, projectors, and specialty tools spend weeks sitting in closets. Rent Back lets you safely monetize them with guaranteed 50% escrow deposit coverage and managed hub handovers.
              </p>

              {/* Four owner bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1EC2A4] shrink-0" />
                  <span>List unused items with custom photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1EC2A4] shrink-0" />
                  <span>Set your custom calendar availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1EC2A4] shrink-0" />
                  <span>Set your daily rental price</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1EC2A4] shrink-0" />
                  <span>Earn while Rent Back handles transport & custody</span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate('/owner/listings/new')}
                rightIcon={<ArrowRight className="w-4 h-4 text-[#0B132B]" />}
                className="w-full font-bold shadow-lg"
              >
                Rent Out Your Item
              </Button>

              <Link
                to="/how-it-works"
                className="text-center text-xs text-slate-300 hover:text-white underline underline-offset-4 py-1"
              >
                Learn how owner payouts & escrow work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS / SOCIAL PROOF */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10605B]">
              Verified Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-1">
              Completed Rentals, Real Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Reviews from verified renters and owners who completed handovers through Rent Back hubs.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="mb-3">
                    <Rating value={rev.rating} showCount={false} size="sm" />
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#0B132B]">{rev.authorName}</h4>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {rev.authorRole === 'renter' ? 'Verified Renter' : 'Verified Owner'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#10605B] bg-[#E8F6F5] px-2 py-0.5 rounded-full">
                    Completed Rental
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
