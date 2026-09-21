import { RentalRequest, Booking, RentalRequestStatus } from '../types';
import { MOCK_RENTAL_REQUESTS, MOCK_BOOKINGS } from './mockData';
import { calculateRentalBreakdown, calculateCancellationRefund } from '../utils/pricing';

/**
 * Booking Service
 * 
 * Manages rental requests, date holds, deposit settlements, and booking lifecycle.
 */
class BookingService {
  private requests: RentalRequest[] = [...MOCK_RENTAL_REQUESTS];
  private bookings: Booking[] = [...MOCK_BOOKINGS];

  async getRentalRequests(userId: string, role: 'renter' | 'owner'): Promise<RentalRequest[]> {
    await new Promise((res) => setTimeout(res, 100));
    if (role === 'renter') {
      return this.requests.filter((r) => r.renterId === userId);
    }
    return this.requests.filter((r) => r.ownerId === userId);
  }

  async getBookings(userId: string, role: 'renter' | 'owner'): Promise<Booking[]> {
    await new Promise((res) => setTimeout(res, 100));
    if (role === 'renter') {
      return this.bookings.filter((b) => b.renterId === userId);
    }
    return this.bookings.filter((b) => b.ownerId === userId);
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    await new Promise((res) => setTimeout(res, 80));
    return this.bookings.find((b) => b.id === bookingId) || null;
  }

  /**
   * Submits a new rental request with a temporary date hold.
   * Initial status: PENDING
   */
  async submitRentalRequest(params: {
    productId: string;
    productTitle: string;
    productMainImage: string;
    renterId: string;
    renterName: string;
    ownerId: string;
    ownerName: string;
    startDate: string;
    returnDate: string;
    rentalFeePerDay: number;
    declaredValue: number;
  }): Promise<RentalRequest> {
    await new Promise((res) => setTimeout(res, 150));

    const breakdown = calculateRentalBreakdown(
      params.rentalFeePerDay,
      params.startDate,
      params.returnDate,
      params.declaredValue
    );

    // Date hold expires in 48 hours if not acted upon
    const heldUntil = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const newRequest: RentalRequest = {
      id: `req_${Date.now()}`,
      productId: params.productId,
      productTitle: params.productTitle,
      productMainImage: params.productMainImage,
      renterId: params.renterId,
      renterName: params.renterName,
      ownerId: params.ownerId,
      ownerName: params.ownerName,
      startDate: params.startDate,
      returnDate: params.returnDate,
      totalDays: breakdown.totalDays,
      rentalFeePerDay: params.rentalFeePerDay,
      totalRentalFee: breakdown.rentalFee,
      platformCommission: breakdown.platformCommission,
      securityDeposit: breakdown.securityDeposit,
      totalPayableAmount: breakdown.totalRenterPayment,
      status: 'pending',
      heldUntil,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.requests.unshift(newRequest);
    return newRequest;
  }

  /**
   * Rent Back admin approval: transitions request from PENDING to DEPOSIT_REQUIRED
   */
  async approveRequest(requestId: string): Promise<RentalRequest | null> {
    await new Promise((res) => setTimeout(res, 100));
    const req = this.requests.find((r) => r.id === requestId);
    if (!req) return null;

    req.status = 'deposit_required';
    req.updatedAt = new Date().toISOString();
    return req;
  }

  /**
   * Renter pays the security deposit: creates a CONFIRMED booking
   */
  async payDeposit(requestId: string): Promise<{ request: RentalRequest; booking: Booking } | null> {
    await new Promise((res) => setTimeout(res, 200));
    const req = this.requests.find((r) => r.id === requestId);
    if (!req) return null;

    req.status = 'confirmed';
    req.updatedAt = new Date().toISOString();

    const now = new Date().toISOString();
    const newBooking: Booking = {
      id: `book_${Date.now()}`,
      requestId: req.id,
      productId: req.productId,
      productTitle: req.productTitle,
      productMainImage: req.productMainImage,
      renterId: req.renterId,
      renterName: req.renterName,
      ownerId: req.ownerId,
      ownerName: req.ownerName,
      startDate: req.startDate,
      returnDate: req.returnDate,
      totalDays: req.totalDays,
      totalRentalFee: req.totalRentalFee,
      platformCommission: req.platformCommission,
      securityDeposit: req.securityDeposit,
      depositStatus: 'paid',
      depositPaidAt: now,
      bookingStatus: 'confirmed',
      createdAt: now
    };

    this.bookings.unshift(newBooking);
    return { request: req, booking: newBooking };
  }

  /**
   * Retrieves the active rental request for a specific user and product if one exists
   */
  async getUserRequestForProduct(productId: string, userId?: string): Promise<RentalRequest | null> {
    await new Promise((res) => setTimeout(res, 50));
    if (!userId) return null;
    return (
      this.requests.find(
        (r) =>
          r.productId === productId &&
          r.renterId === userId &&
          r.status !== 'cancelled' &&
          r.status !== 'expired'
      ) || null
    );
  }

  /**
   * Cancels a pending rental request
   */
  async cancelRentalRequest(requestId: string): Promise<RentalRequest | null> {
    await new Promise((res) => setTimeout(res, 80));
    const req = this.requests.find((r) => r.id === requestId);
    if (!req) return null;
    req.status = 'cancelled';
    req.updatedAt = new Date().toISOString();
    return req;
  }

  /**
   * Renter cancellation policy:
   * 70% of deposit refunded within 2 days (48h) of payment; 0% after 2 days.
   */
  async cancelBooking(bookingId: string): Promise<Booking | null> {
    await new Promise((res) => setTimeout(res, 150));
    const booking = this.bookings.find((b) => b.id === bookingId);
    if (!booking) return null;

    const cancelDateIso = new Date().toISOString();
    let refundAmount = 0;
    let newDepositStatus = booking.depositStatus;

    if (booking.depositPaidAt) {
      const refundCalc = calculateCancellationRefund(
        booking.securityDeposit,
        booking.depositPaidAt,
        cancelDateIso
      );
      refundAmount = refundCalc.refundAmount;
      newDepositStatus = refundCalc.isEligibleForRefund
        ? 'partially_refunded'
        : 'forfeited_due_to_late_cancellation';
    }

    booking.bookingStatus = 'cancelled';
    booking.cancellationDate = cancelDateIso;
    booking.depositStatus = newDepositStatus;
    booking.refundAmount = refundAmount;

    return booking;
  }
}

export const bookingService = new BookingService();
export const rentalRequestService = bookingService;
