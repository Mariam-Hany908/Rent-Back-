import { AvailabilityStatus, DateAvailability } from '../types';
import { MOCK_BOOKINGS, MOCK_RENTAL_REQUESTS } from './mockData';

/**
 * Availability Service
 * 
 * Central service for querying product availability calendars,
 * calculating booked dates, active rental request temporary holds,
 * and validating rental date selections.
 */
class AvailabilityService {
  /**
   * Helper to format Date to YYYY-MM-DD string
   */
  private formatDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generates an array of all YYYY-MM-DD date strings between start and return dates inclusive
   */
  private getDateRangeDays(startDate: string, returnDate: string): string[] {
    const days: string[] = [];
    const current = new Date(startDate);
    const end = new Date(returnDate);

    // Normalize to midnight UTC/local
    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
      days.push(this.formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  }

  /**
   * Returns a map of all locked dates (booked or held) for a given product
   */
  async getProductAvailabilitySchedule(productId: string): Promise<Record<string, { status: AvailabilityStatus; label?: string }>> {
    await new Promise((res) => setTimeout(res, 50));
    const schedule: Record<string, { status: AvailabilityStatus; label?: string }> = {};

    // 1. Confirmed Bookings (status: booked)
    MOCK_BOOKINGS.forEach((booking) => {
      if (booking.productId !== productId || booking.bookingStatus === 'cancelled') return;
      const days = this.getDateRangeDays(booking.startDate, booking.returnDate);
      days.forEach((day) => {
        schedule[day] = {
          status: 'booked',
          label: 'Confirmed Booking'
        };
      });
    });

    // 2. Active Rental Requests under review / deposit hold (status: held)
    MOCK_RENTAL_REQUESTS.forEach((req) => {
      if (req.productId !== productId) return;
      if (req.status === 'cancelled' || req.status === 'rejected' || req.status === 'expired') return;
      const days = this.getDateRangeDays(req.startDate, req.returnDate);
      days.forEach((day) => {
        // Booked takes precedence over held if overlapping
        if (!schedule[day]) {
          schedule[day] = {
            status: 'held',
            label: req.status === 'deposit_required' ? 'Deposit Payment Pending' : 'Review Hold Pending'
          };
        }
      });
    });

    return schedule;
  }

  /**
   * Validates whether a proposed date range is available without overlaps
   */
  async validateDateRange(
    productId: string,
    startDate?: string,
    returnDate?: string
  ): Promise<{
    isValid: boolean;
    reason?: string;
    conflictingDays?: string[];
  }> {
    if (!startDate || !returnDate) {
      return { isValid: false, reason: 'Please select both start and return dates.' };
    }

    const start = new Date(startDate);
    const end = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { isValid: false, reason: 'Invalid date format provided.' };
    }

    if (start < today) {
      return { isValid: false, reason: 'Rental start date cannot be in the past.' };
    }

    if (end < start) {
      return { isValid: false, reason: 'Return date must be on or after the start date.' };
    }

    const requestedDays = this.getDateRangeDays(startDate, returnDate);
    const schedule = await this.getProductAvailabilitySchedule(productId);

    const conflictingDays = requestedDays.filter((day) => {
      const entry = schedule[day];
      return entry && (entry.status === 'booked' || entry.status === 'held' || entry.status === 'unavailable');
    });

    if (conflictingDays.length > 0) {
      const firstConflict = schedule[conflictingDays[0]];
      const statusLabel = firstConflict?.status === 'booked' ? 'confirmed booking' : 'temporary review hold';
      return {
        isValid: false,
        reason: `Selected dates overlap with an existing ${statusLabel} on ${conflictingDays[0]}.`,
        conflictingDays
      };
    }

    return {
      isValid: true
    };
  }
}

export const availabilityService = new AvailabilityService();
