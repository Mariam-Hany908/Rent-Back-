import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar as CalendarIcon, 
  Check, 
  AlertCircle, 
  Heart, 
  Share2, 
  Clock, 
  ChevronRight, 
  Home, 
  Info, 
  Lock, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  FileText,
  RotateCcw,
  ArrowRight,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { Product, Review, RentalRequest, AvailabilityStatus } from '../../types';
import { productService } from '../../services/productService';
import { availabilityService } from '../../services/availabilityService';
import { rentalRequestService } from '../../services/bookingService';
import { formatCurrencyEGP, calculateRentalBreakdown } from '../../utils/pricing';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Rating } from '../../components/products/Rating';
import { ProductCard } from '../../components/products/ProductCard';
import { Button } from '../../components/common/Button';
import { ErrorState } from '../../components/common/ErrorState';
import { Skeleton } from '../../components/common/Skeleton';
import { ProductMediaGallery } from '../../components/products/ProductMediaGallery';
import { Calendar } from '../../components/common/Calendar';
import { ProductReviews } from '../../components/products/ProductReviews';
import { RequestToRentModal } from '../../components/products/RequestToRentModal';
import { AuthPromptModal } from '../../components/common/AuthPromptModal';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const toast = useToast();

  // Primary Data State
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [availabilitySchedule, setAvailabilitySchedule] = useState<
    Record<string, { status: AvailabilityStatus; label?: string }>
  >({});
  const [userRequest, setUserRequest] = useState<RentalRequest | null>(null);

  // Status & UI State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Rental Dates Selection
  const [startDate, setStartDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [dateValidationError, setDateValidationError] = useState<string | null>(null);

  // Modals State
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState<boolean>(false);
  const [isCancellingRequest, setIsCancellingRequest] = useState<boolean>(false);

  const favorited = product ? isFavorite(product.id) : false;

  // Load product and all associated context data
  const loadProductData = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const fetchedProduct = await productService.getProductById(productId);
      if (!fetchedProduct) {
        setProduct(null);
        setIsLoading(false);
        return;
      }

      setProduct(fetchedProduct);

      // Fetch availability schedule
      const schedule = await availabilityService.getProductAvailabilitySchedule(productId);
      setAvailabilitySchedule(schedule);

      // Fetch reviews
      const revs = await productService.getProductReviews(productId);
      setReviews(revs);

      // Fetch similar items in category
      const similar = await productService.getSimilarProducts(productId, fetchedProduct.category, 4);
      setSimilarProducts(similar);

      // Check if current user has an active request on this product
      if (user) {
        const req = await rentalRequestService.getUserRequestForProduct(productId, user.id);
        setUserRequest(req);
        if (req && req.status !== 'cancelled' && req.status !== 'expired') {
          setStartDate(req.startDate);
          setReturnDate(req.returnDate);
        }
      } else {
        setUserRequest(null);
      }
    } catch (err) {
      console.error('Failed to load product details:', err);
      setError('Unable to load listing details. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [productId, user]);

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  // Handle Date Selection from Calendar
  const handleSelectDates = async (start: string, end: string) => {
    setStartDate(start);
    setReturnDate(end);
    setDateValidationError(null);

    if (start && end && product) {
      const validation = await availabilityService.validateDateRange(product.id, start, end);
      if (!validation.isValid) {
        setDateValidationError(validation.reason || 'Selected date range is unavailable.');
      }
    }
  };

  // Price breakdown computation
  const breakdown = useMemo(() => {
    if (!product) return null;
    return calculateRentalBreakdown(
      product.rentalPricePerDay,
      startDate,
      returnDate,
      product.declaredValue
    );
  }, [product, startDate, returnDate]);

  // Handle Favorite Toggle
  const handleFavoriteClick = () => {
    if (!product) return;
    toggleFavorite(product.id);
    if (!favorited) {
      toast.success('Saved to Favorites', `${product.title} added to your wishlist.`);
    } else {
      toast.info('Removed from Favorites');
    }
  };

  // Handle Share
  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link Copied', 'Product link copied to clipboard.');
    } else {
      toast.info('Share Link', window.location.href);
    }
  };

  // Open Request Modal or Prompt Auth
  const handleInitiateRequest = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!product) return;

    // Check if user is the listing owner
    if (user.id === product.ownerId) {
      toast.warning('Owner Listing', 'You are the registered owner of this item and cannot rent your own listing.');
      return;
    }

    // Validate dates
    if (!startDate || !returnDate) {
      setDateValidationError('Please select both start and return dates on the calendar.');
      // Smooth scroll to calendar
      document.getElementById('rental-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const validation = await availabilityService.validateDateRange(product.id, startDate, returnDate);
    if (!validation.isValid) {
      setDateValidationError(validation.reason || 'Selected dates conflict with an existing booking.');
      return;
    }

    setIsRequestModalOpen(true);
  };

  // Confirm and Submit Rental Request
  const handleConfirmRequest = async () => {
    if (!product || !user || !breakdown) return;

    setIsSubmittingRequest(true);
    try {
      const newReq = await rentalRequestService.submitRentalRequest({
        productId: product.id,
        productTitle: product.title,
        productMainImage: product.media[0]?.url || '',
        renterId: user.id,
        renterName: user.name,
        ownerId: product.ownerId,
        ownerName: product.ownerName,
        startDate,
        returnDate,
        rentalFeePerDay: product.rentalPricePerDay,
        declaredValue: product.declaredValue
      });

      setUserRequest(newReq);
      setIsRequestModalOpen(false);

      // Refresh availability schedule so newly held dates appear held
      const updatedSchedule = await availabilityService.getProductAvailabilitySchedule(product.id);
      setAvailabilitySchedule(updatedSchedule);

      toast.success(
        'Rental Request Submitted!',
        'Your request is PENDING. Dates are temporarily held for 48 hours pending Rent Back verification.'
      );
    } catch (err) {
      console.error('Failed to submit rental request:', err);
      toast.error('Submission Failed', 'Could not submit your request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  // Cancel Request
  const handleCancelRequest = async () => {
    if (!userRequest) return;
    setIsCancellingRequest(true);
    try {
      await rentalRequestService.cancelRentalRequest(userRequest.id);
      setUserRequest(null);
      if (product) {
        const updatedSchedule = await availabilityService.getProductAvailabilitySchedule(product.id);
        setAvailabilitySchedule(updatedSchedule);
      }
      toast.info('Rental Request Cancelled', 'Your temporary date hold has been released.');
    } catch (err) {
      console.error('Failed to cancel request:', err);
      toast.error('Cancel Failed', 'Could not cancel request. Please try again.');
    } finally {
      setIsCancellingRequest(false);
    }
  };

  // Reset Dates
  const handleResetDates = () => {
    setStartDate('');
    setReturnDate('');
    setDateValidationError(null);
  };

  // Helper for human-readable condition
  const getConditionDetails = (condition: string) => {
    switch (condition) {
      case 'brand_new':
        return {
          label: 'Brand New',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          description: 'Flawless factory condition, unused or unblemished with zero wear.'
        };
      case 'like_new':
        return {
          label: 'Like New',
          badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
          description: 'Barely used, immaculate showroom condition with no functional wear.'
        };
      case 'good':
        return {
          label: 'Good Condition',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
          description: 'Fully operational and tested, with minor cosmetic signs of normal usage.'
        };
      case 'fair':
      default:
        return {
          label: 'Fair Condition',
          badgeClass: 'bg-stone-100 text-stone-700 border-stone-300',
          description: 'Fully functional with visible cosmetic marks, verified safe for rental.'
        };
    }
  };

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* 2-Column Product Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Skeleton className="w-full aspect-4/3 rounded-2xl" />
            <div className="flex gap-3">
              <Skeleton className="w-20 h-16 rounded-xl" />
              <Skeleton className="w-20 h-16 rounded-xl" />
              <Skeleton className="w-20 h-16 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState
          title="Listing Unavailable"
          message={error}
          onRetry={loadProductData}
        />
      </div>
    );
  }

  // Product Not Found State
  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Item Not Found
        </h1>
        <p className="mt-2 text-stone-500 text-sm max-w-md mx-auto">
          The rental listing you are looking for does not exist or may have been removed by its owner.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="brand" onClick={() => navigate('/search')}>
            Browse All Rentals
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const conditionInfo = getConditionDetails(product.condition);
  const isOwnerViewing = user && user.id === product.ownerId;
  const categoryTitle = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20 sm:pb-12">
      {/* 1. Breadcrumbs Header */}
      <nav 
        aria-label="Breadcrumb" 
        className="bg-white border-b border-stone-200/80 sticky top-0 z-20 shadow-2xs"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap no-scrollbar">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-1 hover:text-stone-900 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-stone-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                to={`/search?category=${product.category}`}
                className="hover:text-stone-900 capitalize transition-colors font-medium text-stone-600"
              >
                {categoryTitle}
              </Link>
            </li>
            <li className="text-stone-300">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="font-semibold text-stone-900 truncate max-w-xs sm:max-w-md">
              {product.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        {/* Owner View Notice (If logged in owner is viewing their own listing) */}
        {isOwnerViewing && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs sm:text-sm text-amber-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Your Listing:</strong> You are currently viewing this item as its registered owner. Renting your own listing is disabled.
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/owner/listings')}
              className="shrink-0 bg-white"
            >
              Manage in Owner Dashboard
            </Button>
          </div>
        )}

        {/* 2-Column Primary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Media Gallery, Info, Specs, Availability, Reviews */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* Media Gallery */}
            <section aria-label="Product Media Gallery">
              <ProductMediaGallery media={product.media} title={product.title} />
            </section>

            {/* Basic Info & Title Section */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 capitalize">
                    {product.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${conditionInfo.badgeClass}`}>
                    {conditionInfo.label}
                  </span>
                  <StatusBadge status={product.status} size="sm" />
                </div>

                {/* Actions: Favorite & Share */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFavoriteClick}
                    className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
                      favorited
                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                    }`}
                    title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="hidden sm:inline">{favorited ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition-colors flex items-center gap-1.5 text-xs font-medium"
                    title="Copy share link"
                    aria-label="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Rating & Location Meta Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1 border-b border-stone-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <Rating value={product.rating} reviewCount={product.reviewCount} size="sm" />
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#10605B]" />
                  <span>
                    {product.location.area}, {product.location.city}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Item usage: {product.usageDuration}</span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                About this Rental Item
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>

              {/* Condition Note Callout */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#10605B] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-stone-900">
                    Inspected Condition: {conditionInfo.label}
                  </span>
                  <p className="text-stone-500 leading-normal">
                    {conditionInfo.description} Rent Back technicians verify operational integrity prior to dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Category Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#10605B]" />
                  <span>Item Specifications</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-white border border-stone-200 flex flex-col justify-center text-xs"
                    >
                      <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider">
                        {key}
                      </span>
                      <span className="text-stone-900 font-semibold mt-0.5">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Fields (e.g., brand, model, clothingType, size) */}
            {product.categoryFields && Object.keys(product.categoryFields).length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-base font-bold text-stone-900 tracking-tight">
                  Category Details
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.entries(product.categoryFields).map(([key, value]) => {
                    if (key === 'specifications') return null;
                    return (
                      <div
                        key={key}
                        className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                      >
                        <span className="text-stone-400 text-[10px] uppercase tracking-wider block font-medium">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-stone-800 font-semibold mt-0.5 block truncate">
                          {String(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* What's Included Checklist */}
            {product.whatsIncluded && product.whatsIncluded.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What's Included in this Rental</span>
                </h2>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {product.whatsIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Dispatch & Location Information */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Logistics & Dispatch
              </h3>
              <div className="flex items-start gap-2.5 text-xs text-stone-700">
                <MapPin className="w-4 h-4 text-[#10605B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-stone-900">
                    Item Base: {product.location.area}, {product.location.city}
                  </p>
                  <p className="text-stone-500 leading-relaxed">
                    All handovers are managed through Rent Back intermediate inspection hubs or authorized insured couriers. Direct owner-renter meetups are never required, guaranteeing safe escrow and equipment protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Calendar Section */}
            <div className="space-y-3 pt-4 border-t border-stone-200" id="rental-calendar-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#10605B]" />
                    <span>Availability Calendar</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Select your pickup and return dates. Booked and held dates cannot be requested.
                  </p>
                </div>

                {(startDate || returnDate) && (
                  <button
                    type="button"
                    onClick={handleResetDates}
                    className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 hover:underline self-start"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear dates</span>
                  </button>
                )}
              </div>

              {/* Reusable Calendar Component */}
              <Calendar
                startDate={startDate}
                returnDate={returnDate}
                onSelectDates={handleSelectDates}
                availabilitySchedule={availabilitySchedule}
              />
            </div>

            {/* Rental Rules & Cancellation Policy */}
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-700" />
                <span>Rental Policies & Care Guidelines</span>
              </h2>

              <div className="rounded-xl border border-stone-200 bg-white divide-y divide-stone-100 text-xs text-stone-700">
                {/* Platform Core Rules */}
                <div className="p-3.5 space-y-1.5">
                  <span className="font-bold text-stone-900 block text-xs">
                    Platform Rental Terms
                  </span>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    <li>Rentals are calculated and charged by day.</li>
                    <li>Security deposit is fixed at <strong>50% of declared value</strong> ({formatCurrencyEGP(product.securityDeposit)}).</li>
                    <li>Your rental request must be approved by Rent Back before deposit payment is due.</li>
                    <li>No direct contact or exchange between owner and renter; Rent Back coordinates all verification.</li>
                  </ul>
                </div>

                {/* Cancellation Policy */}
                <div className="p-3.5 space-y-1.5 bg-amber-50/40">
                  <span className="font-bold text-amber-950 block text-xs">
                    Cancellation & Deposit Refund Rules
                  </span>
                  <ul className="space-y-1 text-amber-900 list-disc list-inside">
                    <li>
                      <strong>70% refund</strong> of security deposit if cancelled within the first 2 days (48 hours) of deposit payment.
                    </li>
                    <li>
                      <strong>0% refund</strong> of security deposit after the 2-day period to protect owner reservation commitment.
                    </li>
                  </ul>
                </div>

                {/* Owner Specific Rules */}
                {product.rentalRules && product.rentalRules.length > 0 && (
                  <div className="p-3.5 space-y-1.5">
                    <span className="font-bold text-stone-900 block text-xs">
                      Owner Item Care Rules
                    </span>
                    <ul className="space-y-1 text-stone-600 list-disc list-inside">
                      {product.rentalRules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Verified Reviews Section */}
            <ProductReviews
              reviews={reviews}
              averageRating={product.rating}
              totalReviewCount={product.reviewCount}
            />
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Sticky Rental Booking & Pricing Summary Card */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Active Request Status Banner (If User Already Has a Request) */}
            {userRequest && (
              <div 
                className={`p-4 rounded-2xl border transition-all ${
                  userRequest.status === 'pending'
                    ? 'bg-amber-50/90 border-amber-200 text-amber-950 shadow-xs'
                    : userRequest.status === 'deposit_required'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                    : userRequest.status === 'rejected'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-teal-50 border-teal-200 text-teal-950'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {userRequest.status === 'pending' && <Clock className="w-4 h-4 text-amber-600" />}
                    {userRequest.status === 'deposit_required' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {userRequest.status === 'rejected' && <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>
                      {userRequest.status === 'pending' && 'Request Pending Approval'}
                      {userRequest.status === 'deposit_required' && 'Request Approved — Deposit Due'}
                      {userRequest.status === 'rejected' && 'Request Not Approved'}
                      {userRequest.status === 'confirmed' && 'Booking Confirmed'}
                    </span>
                  </div>
                  <StatusBadge status={userRequest.status} size="sm" />
                </div>

                <p className="text-xs mt-2 leading-relaxed opacity-90">
                  {userRequest.status === 'pending' && (
                    <>
                      Your rental request for <strong>{userRequest.startDate}</strong> to{' '}
                      <strong>{userRequest.returnDate}</strong> ({userRequest.totalDays} days) has been submitted. Rent Back is reviewing the dates and item condition. Your dates are temporarily held.
                    </>
                  )}
                  {userRequest.status === 'deposit_required' && (
                    <>
                      Great news! Your request was approved by Rent Back. Your 50% escrow deposit of{' '}
                      <strong>{formatCurrencyEGP(userRequest.securityDeposit)}</strong> is now required to confirm your booking.
                    </>
                  )}
                  {userRequest.status === 'rejected' && (
                    <>
                      This request could not be fulfilled: {userRequest.rejectionReason || 'Dates conflicted with scheduled maintenance.'} You may choose different dates.
                    </>
                  )}
                </p>

                {/* Cancel Action if Request is Pending */}
                {userRequest.status === 'pending' && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-amber-800">
                      Want to change dates or cancel?
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelRequest}
                      isLoading={isCancellingRequest}
                      className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 h-7 px-2"
                    >
                      Cancel Request
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Pricing & Booking Card */}
            <div 
              id="booking-panel"
              className="rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-md space-y-6"
            >
              {/* Daily Rate & Escrow Headline */}
              <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    {formatCurrencyEGP(product.rentalPricePerDay)}
                  </span>
                  <span className="text-xs text-stone-400 font-normal"> / day</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block">Declared Value</span>
                  <span className="text-xs font-semibold text-stone-700">
                    {formatCurrencyEGP(product.declaredValue)}
                  </span>
                </div>
              </div>

              {/* Date Selection Inputs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-900 block">
                  Select Rental Period
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-stone-300 p-2.5 bg-stone-50/50 hover:border-stone-400 transition-colors">
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleSelectDates(e.target.value, returnDate)}
                      className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-hidden pt-0.5"
                    />
                  </div>

                  <div className="rounded-xl border border-stone-300 p-2.5 bg-stone-50/50 hover:border-stone-400 transition-colors">
                    <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => handleSelectDates(startDate, e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-hidden pt-0.5"
                    />
                  </div>
                </div>

                {dateValidationError && (
                  <p className="text-xs text-rose-600 flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{dateValidationError}</span>
                  </p>
                )}
              </div>

              {/* Live Rental Calculation Breakdown */}
              {breakdown && breakdown.totalDays > 0 ? (
                <div className="space-y-3 rounded-xl bg-stone-50 p-4 border border-stone-200/80 text-xs">
                  <div className="flex justify-between text-stone-700">
                    <span>Duration:</span>
                    <span className="font-bold text-stone-900">{breakdown.totalDays} day(s)</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Rental Fee ({formatCurrencyEGP(breakdown.dailyRate)} × {breakdown.totalDays}d):</span>
                    <span className="font-semibold text-stone-900">
                      {formatCurrencyEGP(breakdown.rentalFee)}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span>Platform Commission (10%):</span>
                      <span title="10% included in rental fee">
                        <Info className="w-3 h-3 text-stone-400" />
                      </span>
                    </span>
                    <span>{formatCurrencyEGP(breakdown.platformCommission)} (included)</span>
                  </div>

                  {/* Security Deposit Explainer */}
                  <div className="border-t border-stone-200 pt-2.5 flex justify-between text-stone-900">
                    <div className="space-y-0.5">
                      <span className="font-semibold flex items-center gap-1 text-stone-900">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Security Deposit (50% value):</span>
                      </span>
                      <span className="text-[10px] text-stone-400 block">
                        Held in escrow; 100% refunded after safe return
                      </span>
                    </div>
                    <span className="font-bold text-stone-900 text-sm">
                      {formatCurrencyEGP(breakdown.securityDeposit)}
                    </span>
                  </div>

                  {/* Total Due Upon Approval */}
                  <div className="border-t border-stone-300 pt-3 flex items-baseline justify-between text-sm font-bold text-stone-900">
                    <span>Total Due Upon Approval:</span>
                    <span className="text-lg text-[#10605B]">
                      {formatCurrencyEGP(breakdown.totalRenterPayment)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-500">
                  Select start and return dates to calculate duration, rental fee, and refundable deposit.
                </div>
              )}

              {/* Primary Action Button ("Request to Rent") */}
              <div>
                {userRequest?.status === 'pending' ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center text-amber-800 border-amber-300 bg-amber-50 cursor-default"
                    disabled
                  >
                    Request Pending Rent Back Review
                  </Button>
                ) : userRequest?.status === 'deposit_required' ? (
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="brand"
                      className="w-full justify-center bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => toast.info('Deposit Flow', 'In this phase, deposit payments are confirmed via Rent Back escrow.')}
                    >
                      Pay Security Deposit ({formatCurrencyEGP(userRequest.securityDeposit)})
                    </Button>
                    <p className="text-[11px] text-center text-stone-400">
                      Payment links provided upon Rent Back verification.
                    </p>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="brand"
                    className="w-full justify-center shadow-md text-sm py-3"
                    disabled={isOwnerViewing || !startDate || !returnDate || !!dateValidationError}
                    onClick={handleInitiateRequest}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isOwnerViewing 
                      ? 'Owner Cannot Rent Own Item' 
                      : !user 
                      ? 'Sign in & Request to Rent' 
                      : !startDate || !returnDate
                      ? 'Select Rental Dates to Request'
                      : 'Request to Rent'}
                  </Button>
                )}
              </div>

              {/* Guarantee & Escrow Badges */}
              <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Escrow Guarantee:</strong> Security deposit is held securely until item return inspection.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#10605B] shrink-0" />
                  <span><strong>No Upfront Charge:</strong> Pay nothing today. Payment requested only upon Rent Back review approval.</span>
                </div>
              </div>
            </div>

            {/* Owner Profile Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Listed by Verified Owner
              </span>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700 text-sm">
                  {product.ownerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{product.ownerName}</h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>Verified Host</span>
                    <span>•</span>
                    <Rating value={4.9} reviewCount={34} size="sm" showCount={false} />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed pt-1 border-t border-stone-100">
                Owner dispatch is coordinated directly with Rent Back couriers. Identity, inventory provenance, and equipment condition have been verified.
              </p>
            </div>
          </div>
        </div>

        {/* Similar / Related Products Section */}
        {similarProducts.length > 0 && (
          <section className="pt-12 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                  Similar Items in {categoryTitle}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Explore other verified rentals in this category
                </p>
              </div>
              <Link
                to={`/search?category=${product.category}`}
                className="text-xs font-semibold text-[#10605B] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((simProd) => (
                <ProductCard key={simProd.id} product={simProd} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-lg z-30 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-stone-900">
              {formatCurrencyEGP(product.rentalPricePerDay)}
            </span>
            <span className="text-[10px] text-stone-500">/ day</span>
          </div>
          <span className="text-[10px] text-stone-400 block">
            {startDate && returnDate && breakdown
              ? `${breakdown.totalDays} day(s) selected`
              : 'Dates not selected'}
          </span>
        </div>

        <Button
          type="button"
          variant="brand"
          size="sm"
          onClick={() => {
            if (!startDate || !returnDate) {
              document.getElementById('rental-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              handleInitiateRequest();
            }
          }}
          className="shadow-sm"
        >
          {userRequest?.status === 'pending'
            ? 'Request Pending'
            : !startDate || !returnDate
            ? 'Choose Dates'
            : 'Request to Rent'}
        </Button>
      </div>

      {/* Confirmation Modal */}
      {breakdown && (
        <RequestToRentModal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onConfirm={handleConfirmRequest}
          product={product}
          startDate={startDate}
          returnDate={returnDate}
          breakdown={breakdown}
          isLoading={isSubmittingRequest}
        />
      )}

      {/* Authentication Prompt Modal */}
      <AuthPromptModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={() => {
          setIsAuthModalOpen(false);
          toast.success('Signed in', 'You can now submit your rental request.');
        }}
      />
    </div>
  );
};
