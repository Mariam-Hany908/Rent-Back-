import React, { useState } from 'react';
import { RentBackLogo } from '../brand/RentBackLogo';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { FormInput } from '../forms/FormInput';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';
import { Checkbox } from '../forms/Checkbox';
import { RadioGroup } from '../forms/Radio';
import { Switch } from '../forms/Switch';
import { SearchBar } from '../forms/SearchBar';
import { Rating } from '../products/Rating';
import { ProductCard, ProductCardSkeleton } from '../products/ProductCard';
import { CategoryCard } from '../products/CategoryCard';
import { Modal } from '../common/Modal';
import { ConfirmationModal } from '../common/ConfirmationModal';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { Skeleton } from '../common/Skeleton';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import { MOCK_PRODUCTS } from '../../services/mockData';
import { CATEGORIES } from '../../utils/categories';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertTriangle,
  ArrowRight,
  Layers,
  Search,
  Bell,
  Heart
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const toast = useToast();

  // Form states
  const [sampleInput, setSampleInput] = useState('Sony FX3 Cinema Camera');
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState<string | number>('standard');
  const [switchVal, setSwitchVal] = useState(true);
  const [interactiveRating, setInteractiveRating] = useState<number>(4);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDestructiveOpen, setIsDestructiveOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const sampleProduct = MOCK_PRODUCTS[0];
  const sampleCategory = CATEGORIES[1]; // Cameras & Photography

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header & Verification Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <RentBackLogo variant="full" size="lg" />
            <span className="rounded-full bg-[#E8F6F5] border border-[#A8E6DC] px-3 py-0.5 text-xs font-bold text-[#10605B]">
              Component System v2.0
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Global reusable UI components and application shell building blocks, built strictly to the approved Rent Back visual design system.
          </p>
        </div>

        {/* Brand System Tokens Overview */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-100 bg-[#10605B] text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
              Primary Brand
            </span>
            <span className="font-extrabold text-sm block mt-0.5">#10605B</span>
            <span className="text-[10px] opacity-90 mt-1 block">Deep Forest Teal</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-100 bg-[#1EC2A4] text-[#0B132B]">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
              Luminous Mint
            </span>
            <span className="font-extrabold text-sm block mt-0.5">#1EC2A4</span>
            <span className="text-[10px] opacity-90 mt-1 block">Circulation / Handover</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-100 bg-[#0B132B] text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
              Midnight Slate
            </span>
            <span className="font-extrabold text-sm block mt-0.5">#0B132B</span>
            <span className="text-[10px] opacity-90 mt-1 block">Structure & Body</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 bg-[#E8F6F5] text-[#10605B]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              Escrow Tint
            </span>
            <span className="font-extrabold text-sm block mt-0.5">#E8F6F5</span>
            <span className="text-[10px] text-slate-600 mt-1 block">50% Protected Escrow</span>
          </div>
        </div>
      </div>

      {/* 1. BUTTON SYSTEM */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>1. Reusable Button System</span>
          <span className="text-xs font-normal text-slate-400">• All variants, sizes, and states</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          High-contrast tactile buttons with micro-elevation transitions, active states, loading indicators, and disabled safeguards.
        </p>

        <div className="space-y-6">
          {/* Variants */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Variants
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Slate</Button>
              <Button variant="brand">Brand Teal</Button>
              <Button variant="accent">Accent Mint</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </div>

          {/* Sizes & Icons */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Sizes & Icon Support
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" variant="brand" leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#1EC2A4]" />}>
                Small Button
              </Button>
              <Button size="md" variant="brand" rightIcon={<ArrowRight className="w-4 h-4 text-[#1EC2A4]" />}>
                Medium Button
              </Button>
              <Button size="lg" variant="primary" rightIcon={<ShieldCheck className="w-4 h-4 text-[#1EC2A4]" />}>
                Large CTA Button
              </Button>
            </div>
          </div>

          {/* States */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Interactive States
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="brand">Normal</Button>
              <Button variant="brand" isLoading>Loading State</Button>
              <Button variant="brand" disabled>Disabled State</Button>
              <Button variant="outline" isLoading>Processing...</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INPUT & FORM CONTROLS */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>2. Reusable Form & Input System</span>
          <span className="text-xs font-normal text-slate-400">• Text, Select, Textarea, Checkbox, Radio, Switch</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Accessible form primitives designed with unified focus rings, error badges, helper texts, and disabled styling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Product Title"
            required
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            helperText="Include manufacturer and key package accessories."
          />

          <FormInput
            label="Declared Item Value (EGP)"
            required
            defaultValue="65000"
            error="Required to determine 50% escrow guarantee"
            rightElement={<span className="text-xs font-bold text-slate-400">EGP</span>}
          />

          <Select
            label="Marketplace Category"
            required
            options={[
              { value: 'cameras', label: 'Cameras & Photography' },
              { value: 'clothing', label: 'Designer Clothing & Suits' },
              { value: 'electronics', label: 'Audio & Drone Electronics' },
              { value: 'tools', label: 'Specialized Tools & Equipment' }
            ]}
            helperText="Custom specifications dynamically adapt to this category."
          />

          <Textarea
            label="Rental Guidelines & Handover Notes"
            placeholder="Specify any protective casing, included SD cards, or pickup timeframes..."
            rows={3}
            helperText="Rent Back staff will verify these notes at the hub."
          />

          {/* Checkbox & Switch */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Checkboxes & Toggles
            </span>
            <Checkbox
              label="Accept 50% Protected Escrow Terms"
              description="Security deposits equal strictly 50% of declared item value and are held until inspection."
              checked={checkboxVal}
              onChange={(e) => setCheckboxVal(e.target.checked)}
            />
            <Switch
              label="Enable Instant Hub Notification"
              description="Receive SMS and platform alerts as soon as an item is delivered to a handover hub."
              checked={switchVal}
              onChange={setSwitchVal}
            />
          </div>

          {/* Radio Group */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <RadioGroup
              name="handover_preference"
              label="Handover Mode"
              value={radioVal}
              onChange={setRadioVal}
              options={[
                {
                  value: 'standard',
                  label: 'Certified Hub Custody (Recommended)',
                  description: 'Rent Back staff inspects item and verifies condition photos.'
                },
                {
                  value: 'express',
                  label: 'Express Courier Courier Handover',
                  description: 'Dedicated courier delivery directly between verified hubs.'
                }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 3. SEARCH BAR COMPONENT */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>3. Reusable SearchBar Component</span>
          <span className="text-xs font-normal text-slate-400">• Full hero and compact navbar modes</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Reusable search interface capturing keyword, category, location, and date intentions.
        </p>

        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Full Multi-Field Search Bar (Hero & Catalog Pages)
            </span>
            <SearchBar
              onSearch={(vals) => {
                toast.info('Search Submitted', `Keyword: "${vals.keyword || 'None'}" in ${vals.location || 'All Locations'}`);
              }}
            />
          </div>

          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Compact Search Bar (Sticky Headers & Drawers)
            </span>
            <SearchBar
              variant="compact"
              placeholder="Search gear..."
              onSearch={(vals) => {
                toast.info('Compact Search', vals.keyword);
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CARD & SKELETON */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>4. Reusable ProductCard & Loading Skeleton</span>
          <span className="text-xs font-normal text-slate-400">• Dynamic item preview with 50% escrow</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Interactive card with image fallback, dynamic ratings, optimistic favorite toggling, and clean navigation to `/products/:productId`.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Real Card */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Interactive Card Preview
            </span>
            <ProductCard product={sampleProduct} />
          </div>

          {/* Skeleton Card */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Loading Skeleton State
            </span>
            <ProductCardSkeleton />
          </div>

          {/* Category Card Preview */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              CategoryCard Component
            </span>
            <CategoryCard category={sampleCategory} itemCount={28} />
          </div>
        </div>
      </section>

      {/* 5. RATING COMPONENT */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>5. Reusable Rating Components</span>
          <span className="text-xs font-normal text-slate-400">• Display and interactive modes</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Star visualizer supporting partial ratings, review counts, empty states, and interactive user reviews.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-[#0B132B] block mb-2">Display (Size: Medium)</span>
            <Rating value={4.8} reviewCount={42} size="md" />
          </div>

          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-[#0B132B] block mb-2">Empty Rating State</span>
            <Rating value={0} reviewCount={0} emptyLabel="No reviews yet" size="md" />
          </div>

          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-[#0B132B] block mb-2">Interactive Reviewer Mode</span>
            <Rating
              value={interactiveRating}
              size="lg"
              isInteractive
              showCount={false}
              onChange={(newRating) => {
                setInteractiveRating(newRating);
                toast.success('Rating Updated', `You selected ${newRating} stars.`);
              }}
            />
            <span className="text-[11px] text-slate-400 block mt-1">
              Click any star to test interaction
            </span>
          </div>
        </div>
      </section>

      {/* 6. STATUS BADGES & LIFECYCLE INDICATORS */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>6. Status Components & Lifecycle Badges</span>
          <span className="text-xs font-normal text-slate-400">• Consistent platform state tokens</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Strict status badges adhering to the design system with semantic dots, high-contrast borders, and WCAG AA compliance.
        </p>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Listing Statuses
            </span>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="draft" />
              <StatusBadge status="submitted" />
              <StatusBadge status="pending_review" />
              <StatusBadge status="approved" />
              <StatusBadge status="active" />
              <StatusBadge status="rejected" />
              <StatusBadge status="paused" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Booking & Handover Lifecycle
            </span>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="confirmed" />
              <StatusBadge status="pickup" />
              <StatusBadge status="in_custody" />
              <StatusBadge status="inspected" />
              <StatusBadge status="delivered" />
              <StatusBadge status="return_pending" />
              <StatusBadge status="inspection" />
              <StatusBadge status="returned" />
              <StatusBadge status="completed" />
              <StatusBadge status="cancelled" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Deposit & Availability
            </span>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="paid" />
              <StatusBadge status="partially_refunded" />
              <StatusBadge status="refunded" />
              <StatusBadge status="forfeited_due_to_late_cancellation" />
              <StatusBadge status="available" />
              <StatusBadge status="held" />
              <StatusBadge status="booked" />
              <StatusBadge status="unavailable" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. MODAL SYSTEM */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>7. Reusable Modal System</span>
          <span className="text-xs font-normal text-slate-400">• Standard, Confirmation, and Destructive</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Accessible dialogs featuring backdrop blur, keyboard ESC dismissal, outside-click close, and action handling.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Open Standard Modal
          </Button>
          <Button variant="brand" onClick={() => setIsConfirmOpen(true)}>
            Open Confirmation Modal
          </Button>
          <Button variant="destructive" onClick={() => setIsDestructiveOpen(true)}>
            Open Destructive Modal
          </Button>
        </div>

        {/* 1. Standard Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Managed Handover Hub Rules"
          description="Rent Back Certified Handover Protocol"
        >
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Every rented item undergoes quality inspection at our Cairo Hub. We photograph item condition, check serial numbers, and lock the 50% security deposit safely in escrow.
            </p>
            <div className="p-3 rounded-xl bg-[#E8F6F5] border border-[#A8E6DC] text-[#10605B] font-medium">
              Neither party meets directly. Returns are certified by Rent Back staff before the deposit is released.
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="brand" size="sm" onClick={() => setIsModalOpen(false)}>
              Understood
            </Button>
          </div>
        </Modal>

        {/* 2. Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Confirm Rental Request"
          message="Submitting this rental request will place a 24-hour hold on the item. The owner will review your dates and identity verification."
          confirmLabel="Submit Request"
          isLoading={modalLoading}
          onConfirm={() => {
            setModalLoading(true);
            setTimeout(() => {
              setModalLoading(false);
              setIsConfirmOpen(false);
              toast.success('Rental Request Submitted', 'The item is now temporarily held pending owner approval.');
            }, 800);
          }}
        />

        {/* 3. Destructive Modal */}
        <ConfirmationModal
          isOpen={isDestructiveOpen}
          onClose={() => setIsDestructiveOpen(false)}
          title="Cancel Confirmed Booking?"
          message="According to the 48-hour policy: Cancellations made ≤48h before handover receive a 70% refund of the deposit. Cancellations made >48h after booking result in deposit forfeiture."
          confirmLabel="Cancel Booking"
          isDestructive
          isLoading={modalLoading}
          onConfirm={() => {
            setModalLoading(true);
            setTimeout(() => {
              setModalLoading(false);
              setIsDestructiveOpen(false);
              toast.warning('Booking Cancelled', 'Deposit refund calculated according to the 70% policy.');
            }, 800);
          }}
        />
      </section>

      {/* 8. TOAST & FEEDBACK SYSTEM */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>8. Toast & Notification Feedback System</span>
          <span className="text-xs font-normal text-slate-400">• Global stackable notifications</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Dispatches auto-dismissing notifications with contextual icons, action callbacks, and manual dismissal.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success('Escrow Deposit Secured', '50% security deposit (EGP 32,500) is held in safe custody.')}
          >
            Trigger Success Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.error('Verification Incomplete', 'Please upload a valid National ID or Passport to rent.')}
          >
            Trigger Error Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.warning('Cancellation Notice', 'Cancellations within 48h are subject to 70% refund limit.')}
          >
            Trigger Warning Toast
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('Handover In Progress', 'Item has arrived at the New Cairo Hub for quality check.')}
          >
            Trigger Info Toast
          </Button>
        </div>
      </section>

      {/* 9. LOADING, EMPTY & ERROR STATES */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-rentback-card">
        <h2 className="text-base sm:text-lg font-bold text-[#0B132B] mb-2 flex items-center gap-2">
          <span>9. Loading, Empty & Error States</span>
          <span className="text-xs font-normal text-slate-400">• Edge case UX primitives</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Graceful handling of empty collections, network interruptions, and skeleton placeholders.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Empty State */}
          <EmptyState
            title="No Active Rentals"
            description="You do not have any items checked out right now. Browse certified gear in our marketplace."
            actionLabel="Explore Items"
            onAction={() => toast.info('Navigating to marketplace...')}
          />

          {/* Error State */}
          <ErrorState
            title="Hub Synchronization Failed"
            message="Could not retrieve real-time handover status for this item. Please retry."
            onRetry={() => toast.info('Retrying connection...')}
          />

          {/* Skeleton Blocks */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-4">
            <span className="text-xs font-bold text-[#0B132B] block">Skeletons & Spinners</span>
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
              </div>
            </div>
            <Skeleton variant="rectangular" height={48} className="rounded-xl" />
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner size="md" label="Verifying item custody..." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
