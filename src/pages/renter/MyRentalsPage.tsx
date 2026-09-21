import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { MOCK_RENTAL_REQUESTS, MOCK_BOOKINGS } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrencyEGP } from '../../utils/pricing';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const MyRentalsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="My Rentals & Bookings"
        category="Renter Booking Management"
        description="Tracks the entire lifecycle of requests and bookings: PENDING -> APPROVED -> DEPOSIT REQUIRED -> CONFIRMED -> HANDOVER -> RETURN -> COMPLETED."
        targetPhase="Interactive deposit payment simulation, date hold countdown, and handover checklist"
        dataEntities={['RentalRequest', 'Booking', 'DepositEscrow', 'HandoverStep']}
        suggestedActions={[
          { label: 'Browse New Equipment', to: '/' },
          { label: 'View Profile', to: '/user/profile' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <h3 className="text-sm font-semibold text-stone-900">Rental Requests & Confirmed Bookings</h3>
        <div className="space-y-3">
          {MOCK_RENTAL_REQUESTS.map((req) => (
            <Link
              key={req.id}
              to={`/user/rentals/${req.id}`}
              className="flex items-center justify-between p-3.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.productMainImage}
                  alt={req.productTitle}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">{req.productTitle}</h4>
                  <p className="text-[11px] text-stone-500">
                    {req.startDate} to {req.returnDate} • {req.totalDays} days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">
                    {formatCurrencyEGP(req.totalPayableAmount)}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Deposit: {formatCurrencyEGP(req.securityDeposit)}
                  </div>
                </div>
                <StatusBadge status={req.status} />
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
