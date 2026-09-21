import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Product, PriceBreakdown } from '../../types';
import { formatCurrencyEGP } from '../../utils/pricing';
import { 
  ShieldCheck, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export interface RequestToRentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  product: Product;
  startDate: string;
  returnDate: string;
  breakdown: PriceBreakdown;
  isLoading?: boolean;
}

export const RequestToRentModal: React.FC<RequestToRentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  startDate,
  returnDate,
  breakdown,
  isLoading = false
}) => {
  const [agreedToPolicies, setAgreedToPolicies] = useState<boolean>(false);

  const formattedStart = new Date(startDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedEnd = new Date(returnDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToPolicies || isLoading) return;
    await onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Rental Request"
      description="Review your booking summary before submitting your request to Rent Back."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5 select-none">
        {/* Item Header Mini Preview */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
          <img
            src={product.media[0]?.url}
            alt={product.title}
            className="w-16 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-stone-900 truncate">
              {product.title}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
              <span>Owner: {product.ownerName}</span>
              <span>•</span>
              <span>{product.location.area}, {product.location.city}</span>
            </div>
          </div>
        </div>

        {/* Selected Dates Display */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-stone-200 bg-white">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
              Pickup / Start Date
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Calendar className="w-3.5 h-3.5 text-[#10605B]" />
              <span>{formattedStart}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
              Return Date
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Calendar className="w-3.5 h-3.5 text-[#10605B]" />
              <span>{formattedEnd}</span>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-2.5 text-xs">
          <div className="flex justify-between text-stone-700">
            <span>Duration:</span>
            <span className="font-semibold text-stone-900">{breakdown.totalDays} day(s)</span>
          </div>
          <div className="flex justify-between text-stone-700">
            <span>Rental Rate ({formatCurrencyEGP(breakdown.dailyRate)} × {breakdown.totalDays} days):</span>
            <span className="font-semibold text-stone-900">
              {formatCurrencyEGP(breakdown.rentalFee)}
            </span>
          </div>
          <div className="flex justify-between text-stone-500 text-[11px]">
            <span className="flex items-center gap-1">
              <span>Platform Service Commission (10%):</span>
            </span>
            <span>{formatCurrencyEGP(breakdown.platformCommission)} (included)</span>
          </div>

          <div className="border-t border-stone-200 pt-2.5 flex justify-between text-stone-900 font-medium">
            <div className="space-y-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Security Deposit (50% of declared value):</span>
              </span>
              <p className="text-[10px] text-stone-400">
                Item declared value: {formatCurrencyEGP(breakdown.productDeclaredValue)}. Fully refundable upon safe return inspection.
              </p>
            </div>
            <span className="font-bold text-stone-900">
              {formatCurrencyEGP(breakdown.securityDeposit)}
            </span>
          </div>

          <div className="border-t border-stone-300 pt-2.5 flex justify-between text-sm font-bold text-stone-900">
            <span>Total Payable Upon Rent Back Approval:</span>
            <span className="text-[#10605B] text-base">
              {formatCurrencyEGP(breakdown.totalRenterPayment)}
            </span>
          </div>
        </div>

        {/* Temporary Hold & Escrow Notice */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>No immediate payment taken now</span>
          </div>
          <p>
            Submitting this request temporarily holds these calendar dates for 48 hours while Rent Back verifies availability. You only pay the rental fee and 50% security deposit after approval.
          </p>
        </div>

        {/* Cancellation Agreement Checkbox */}
        <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={agreedToPolicies}
            onChange={(e) => setAgreedToPolicies(e.target.checked)}
            className="mt-0.5 rounded border-stone-300 text-[#10605B] focus:ring-[#10605B] h-4 w-4"
          />
          <span className="leading-snug">
            I understand and accept the <strong>Rent Back Cancellation Policy</strong> (70% refund of deposit within 2 days of deposit payment, 0% refund after 2 days) and agree to adhere to all listed item rental care guidelines.
          </span>
        </label>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="brand"
            size="md"
            disabled={!agreedToPolicies || isLoading}
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Rental Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};
