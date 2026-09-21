import { PriceBreakdown } from '../types';

/**
 * Calculates rental duration in full days between start and return dates.
 * Dates are inclusive of rental period.
 */
export function calculateRentalDays(startDateStr: string, returnDateStr: string): number {
  if (!startDateStr || !returnDateStr) return 0;
  const start = new Date(startDateStr);
  const end = new Date(returnDateStr);
  const diffTime = end.getTime() - start.getTime();
  if (diffTime < 0) return 0;
  // Day count (minimum 1 day)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Calculates security deposit according to Rent Back business rules:
 * Exactly 50% of the product's declared value.
 */
export function calculateSecurityDeposit(declaredValue: number): number {
  return Math.round(Math.max(0, declaredValue) * 0.5);
}

/**
 * Calculates Rent Back platform commission:
 * Exactly 10% of the rental fee.
 * Note: Commission is NEVER calculated from the security deposit.
 */
export function calculatePlatformCommission(rentalFee: number): number {
  return Math.round(Math.max(0, rentalFee) * 0.1);
}

/**
 * Generates full transparent price breakdown for a rental request.
 */
export function calculateRentalBreakdown(
  dailyRate: number,
  startDateStr: string,
  returnDateStr: string,
  declaredValue: number
): PriceBreakdown {
  const totalDays = calculateRentalDays(startDateStr, returnDateStr);
  const rentalFee = dailyRate * totalDays;
  const platformCommission = calculatePlatformCommission(rentalFee);
  const ownerEarning = rentalFee - platformCommission;
  const securityDeposit = calculateSecurityDeposit(declaredValue);
  const totalRenterPayment = rentalFee + securityDeposit;

  return {
    dailyRate,
    totalDays,
    rentalFee,
    platformCommission,
    ownerEarning,
    productDeclaredValue: declaredValue,
    securityDeposit,
    totalRenterPayment
  };
}

/**
 * Cancellation refund policy:
 * - If cancelled within 2 days (48 hours) after paying deposit: 70% of deposit refunded.
 * - After the 2-day period: 0% of deposit refunded.
 */
export function calculateCancellationRefund(
  depositAmount: number,
  depositPaidAtIso: string,
  cancellationDateIso: string = new Date().toISOString()
): {
  isEligibleForRefund: boolean;
  refundPercentage: number;
  refundAmount: number;
  hoursElapsed: number;
} {
  const paidTime = new Date(depositPaidAtIso).getTime();
  const cancelTime = new Date(cancellationDateIso).getTime();
  const diffHours = (cancelTime - paidTime) / (1000 * 60 * 60);

  if (diffHours <= 48 && diffHours >= 0) {
    const refundPercentage = 70;
    const refundAmount = Math.round(depositAmount * 0.7);
    return {
      isEligibleForRefund: true,
      refundPercentage,
      refundAmount,
      hoursElapsed: Math.round(diffHours)
    };
  }

  return {
    isEligibleForRefund: false,
    refundPercentage: 0,
    refundAmount: 0,
    hoursElapsed: Math.round(diffHours)
  };
}

/**
 * Formats currency in EGP with locale formatting.
 */
export function formatCurrencyEGP(amount: number): string {
  return `${amount.toLocaleString('en-US')} EGP`;
}
