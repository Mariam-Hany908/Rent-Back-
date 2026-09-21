import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { MOCK_BOOKINGS, MOCK_RENTAL_REQUESTS } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrencyEGP } from '../../utils/pricing';

export const RentalActivityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Owner Rental Activity & Handover Status"
        category="Activity Log"
        description="Tracks confirmed bookings, dispatch statuses, return inspections, and Rent Back hub custody transfers."
        targetPhase="Interactive timeline and handover courier coordination"
        dataEntities={['Booking', 'HandoverRecord', 'InspectionReport']}
        suggestedActions={[
          { label: 'View Listings', to: '/owner/listings' },
          { label: 'Check Earnings', to: '/owner/earnings' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <h3 className="text-sm font-semibold text-stone-900">Historical & Ongoing Activity</h3>
        <div className="space-y-3">
          {MOCK_BOOKINGS.map((b) => (
            <div
              key={b.id}
              className="p-3 rounded-lg border border-stone-100 bg-stone-50 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <img src={b.productMainImage} alt={b.productTitle} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h4 className="font-semibold text-stone-900">{b.productTitle}</h4>
                  <p className="text-stone-500 text-[11px]">
                    Renter: {b.renterName} • {b.startDate} to {b.returnDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-stone-900">
                    Net: {formatCurrencyEGP(b.totalRentalFee - b.platformCommission)}
                  </div>
                  <div className="text-[10px] text-stone-400">Fee: 10% ({formatCurrencyEGP(b.platformCommission)})</div>
                </div>
                <StatusBadge status={b.bookingStatus} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
