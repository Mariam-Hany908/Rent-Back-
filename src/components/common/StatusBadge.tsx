import React from 'react';
import { 
  ListingStatus, 
  RentalRequestStatus, 
  BookingStatus, 
  AvailabilityStatus,
  DepositStatus 
} from '../../types';

export type BadgeStatus = 
  | ListingStatus 
  | RentalRequestStatus 
  | BookingStatus 
  | AvailabilityStatus
  | DepositStatus
  | string;

export interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

const STATUS_CONFIGS: Record<
  string, 
  { bg: string; text: string; border: string; dot: string; label: string }
> = {
  // --- Listing Statuses ---
  draft: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Draft'
  },
  submitted: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Submitted'
  },
  pending_review: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Pending Review'
  },
  approved: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Approved'
  },
  active: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Active'
  },
  rejected: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Rejected'
  },
  paused: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Paused'
  },

  // --- Rental Request Statuses ---
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Pending'
  },
  deposit_required: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
    label: 'Deposit Required'
  },
  expired: {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Expired'
  },

  // --- Booking Lifecycle Statuses ---
  confirmed: {
    bg: 'bg-[#E8F6F5]',
    text: 'text-[#10605B]',
    border: 'border-[#A8E6DC]',
    dot: 'bg-[#10605B]',
    label: 'Confirmed'
  },
  pickup: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
    label: 'Pickup Scheduled'
  },
  delivered: {
    bg: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-200',
    dot: 'bg-teal-500',
    label: 'Delivered'
  },
  return_pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Return Pending'
  },
  inspection: {
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    label: 'Hub Quality Inspection'
  },
  returned: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
    label: 'Returned'
  },
  completed: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Completed'
  },
  cancelled: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Cancelled'
  },
  in_handover: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
    dot: 'bg-cyan-500',
    label: 'In Handover'
  },
  in_return: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'In Return'
  },
  disputed: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Disputed'
  },

  // --- Availability Statuses ---
  available: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Available'
  },
  held: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Temporarily Held'
  },
  booked: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    dot: 'bg-slate-500',
    label: 'Booked'
  },
  unavailable: {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: 'Unavailable'
  },

  // --- Deposit Statuses ---
  paid: {
    bg: 'bg-[#E8F6F5]',
    text: 'text-[#10605B]',
    border: 'border-[#A8E6DC]',
    dot: 'bg-[#10605B]',
    label: '50% Deposit Escrowed'
  },
  partially_refunded: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
    dot: 'bg-cyan-500',
    label: '70% Refunded'
  },
  refunded: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-500',
    label: 'Deposit Refunded'
  },
  forfeited_due_to_late_cancellation: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Deposit Forfeited'
  },
  held_for_damage: {
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    label: 'Held for Damage'
  },

  // --- Managed Handover Statuses ---
  in_custody: {
    bg: 'bg-[#E8F6F5]',
    text: 'text-[#0F5B57]',
    border: 'border-[#99E6DB]',
    dot: 'bg-[#10605B]',
    label: 'In Hub Custody'
  },
  inspected: {
    bg: 'bg-[#E8F6F5]',
    text: 'text-[#10605B]',
    border: 'border-[#A8E6DC]',
    dot: 'bg-[#1EC2A4]',
    label: 'Certified Clean'
  },
  dispatched: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
    label: 'Dispatched to Hub'
  },
  received: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Handover Verified'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  size = 'sm',
  showDot = true,
  className = ''
}) => {
  const normalizedKey = String(status).toLowerCase();
  const config = STATUS_CONFIGS[normalizedKey] || {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    label: normalizedKey.replace(/_/g, ' ')
  };

  const displayText = label || config.label;
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-tight whitespace-nowrap ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
      role="status"
    >
      {showDot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} 
          aria-hidden="true" 
        />
      )}
      <span>{displayText}</span>
    </span>
  );
};
