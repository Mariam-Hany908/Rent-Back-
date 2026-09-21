/**
 * Rent Back - Core TypeScript Definitions
 * 
 * Clean frontend data models structured for seamless future API integration.
 */

export type UserRole = 'renter' | 'owner' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  rating: number;
  reviewCount: number;
  memberSince: string;
  activeRoleMode: 'renter' | 'owner'; // Active dashboard perspective
}

export type ProductCategorySlug = 
  | 'clothing'
  | 'cameras'
  | 'electronics'
  | 'tools';

export interface CategoryFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: ProductCategorySlug;
  description: string;
  iconName: string;
  fieldDefinitions: CategoryFieldDefinition[];
}

export type ProductCondition = 
  | 'brand_new'
  | 'like_new'
  | 'good'
  | 'fair';

export type ListingStatus = 
  | 'draft'
  | 'submitted'
  | 'pending_review'
  | 'approved'
  | 'active'
  | 'rejected'
  | 'paused';

export interface ProductMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  isMain?: boolean;
  tag?: 'main' | 'detailed' | 'condition' | 'functionality_demo';
  caption?: string;
}

export interface ProductLocation {
  city: string;
  area: string;
  postalCode?: string;
  pickupNotes?: string;
}

export interface Product {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  category: ProductCategorySlug;
  categoryFields: Record<string, string | number>;
  description: string;
  condition: ProductCondition;
  usageDuration: string; // e.g., "6 months", "1 year"
  specifications: Record<string, string>;
  whatsIncluded: string[];
  declaredValue: number; // In EGP
  rentalPricePerDay: number; // In EGP
  securityDeposit: number; // 50% of declaredValue
  media: ProductMedia[];
  location: ProductLocation;
  rentalRules: string[];
  status: ListingStatus;
  rejectionReason?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export type AvailabilityStatus = 
  | 'available'
  | 'held' // Temporary date hold during review
  | 'booked' // Confirmed booking
  | 'unavailable'; // Owner blackout or maintenance

export interface DateAvailability {
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  bookingId?: string;
  requestId?: string;
}

export type RentalRequestStatus = 
  | 'pending'
  | 'approved'
  | 'deposit_required'
  | 'confirmed'
  | 'rejected'
  | 'cancelled'
  | 'expired';

export interface RentalRequest {
  id: string;
  productId: string;
  productTitle: string;
  productMainImage: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  ownerName: string;
  startDate: string; // YYYY-MM-DD
  returnDate: string; // YYYY-MM-DD
  totalDays: number;
  rentalFeePerDay: number;
  totalRentalFee: number; // rentalFeePerDay * totalDays
  platformCommission: number; // 10% of totalRentalFee
  securityDeposit: number; // 50% of declaredValue
  totalPayableAmount: number; // totalRentalFee + securityDeposit
  status: RentalRequestStatus;
  heldUntil?: string; // ISO string for temporary hold expiration
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 
  | 'confirmed'
  | 'pickup'
  | 'delivered'
  | 'active'
  | 'return_pending'
  | 'inspection'
  | 'returned'
  | 'completed'
  | 'cancelled'
  | 'in_handover'
  | 'in_return'
  | 'disputed';

export type DepositStatus = 
  | 'pending'
  | 'paid'
  | 'partially_refunded' // 70% refund when cancelled within 2 days
  | 'refunded'
  | 'forfeited_due_to_late_cancellation' // 0% refund after 2 days
  | 'held_for_damage';

export interface Booking {
  id: string;
  requestId: string;
  productId: string;
  productTitle: string;
  productMainImage: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  ownerName: string;
  startDate: string;
  returnDate: string;
  totalDays: number;
  totalRentalFee: number;
  platformCommission: number;
  securityDeposit: number;
  depositStatus: DepositStatus;
  depositPaidAt?: string;
  bookingStatus: BookingStatus;
  cancellationDate?: string;
  refundAmount?: number;
  pickupHandoverId?: string;
  returnHandoverId?: string;
  createdAt: string;
}

export type HandoverStepType = 
  | 'owner_to_rentback'
  | 'rentback_to_renter'
  | 'renter_to_rentback'
  | 'rentback_to_owner';

export type HandoverStatus = 
  | 'scheduled'
  | 'in_transit'
  | 'inspection_passed'
  | 'issue_flagged'
  | 'completed';

export interface HandoverRecord {
  id: string;
  bookingId: string;
  step: HandoverStepType;
  scheduledDate: string;
  status: HandoverStatus;
  inspectedCondition?: string;
  evidencePhotos: string[];
  notes?: string;
  confirmedByRenter?: boolean;
  confirmedByOwner?: boolean;
  timestamp: string;
}

export interface DamageCase {
  id: string;
  bookingId: string;
  productId: string;
  reportedBy: 'renter' | 'owner' | 'rentback_inspector';
  inspectionDetails: string;
  evidencePhotos: string[];
  estimatedRepairCost: number;
  productDeclaredValue: number;
  depositInvolvedAmount: number;
  resolutionStatus: 'open' | 'investigating' | 'resolved' | 'closed';
  resolutionNotes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  productId: string;
  authorId: string;
  authorName: string;
  authorRole: 'renter' | 'owner';
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'request' | 'booking';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface PriceBreakdown {
  dailyRate: number;
  totalDays: number;
  rentalFee: number;
  platformCommission: number; // 10%
  ownerEarning: number; // rentalFee - platformCommission
  productDeclaredValue: number;
  securityDeposit: number; // 50% of productDeclaredValue
  totalRenterPayment: number; // rentalFee + securityDeposit
}

export type SortOption = 
  | 'recommended'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest';

export interface ProductFilterOptions {
  searchQuery?: string;
  category?: ProductCategorySlug | 'all' | '';
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string; // e.g. 'all', 'brand_new', 'like_new', 'good', 'fair'
  minRating?: number; // 4, 3, 2, etc.
  startDate?: string;
  endDate?: string;
  sort?: SortOption;
  ownerId?: string;
  status?: ListingStatus;
  categoryFields?: Record<string, string>;
}
