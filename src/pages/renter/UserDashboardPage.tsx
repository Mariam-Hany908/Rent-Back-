import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { MOCK_RENTAL_REQUESTS, MOCK_BOOKINGS } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrencyEGP } from '../../utils/pricing';
import { Link } from 'react-router-dom';

export const UserDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Renter Dashboard Overview"
        category="User / Renter Shell"
        description="Unified portal for tracking active requests, upcoming handovers, deposit status, and completed rental history."
        targetPhase="Interactive metric cards, quick-pay deposit modal, and live handover tracker"
        dataEntities={['User', 'RentalRequest', 'Booking', 'DepositStatus', 'HandoverRecord']}
        suggestedActions={[
          { label: 'View All Rentals & Requests', to: '/user/rentals' },
          { label: 'Saved Favorites', to: '/user/favorites' },
          { label: 'Browse Products to Rent', to: '/' }
        ]}
      />

      {/* Snapshot of Active Requests & Bookings */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Pending & Active Rental Requests ({MOCK_RENTAL_REQUESTS.length})
        </h3>
        <div className="space-y-3">
          {MOCK_RENTAL_REQUESTS.map((req) => (
            <div
              key={req.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-stone-100 bg-stone-50 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={req.productMainImage}
                  alt={req.productTitle}
                  className="w-12 h-12 rounded object-cover border border-stone-200"
                />
                <div>
                  <h4 className="font-semibold text-stone-900 line-clamp-1">{req.productTitle}</h4>
                  <p className="text-stone-500 text-[11px]">
                    Dates: {req.startDate} to {req.returnDate} ({req.totalDays} days)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <div className="text-right">
                  <div className="font-semibold text-stone-900">
                    {formatCurrencyEGP(req.totalPayableAmount)}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Deposit: {formatCurrencyEGP(req.securityDeposit)}
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
