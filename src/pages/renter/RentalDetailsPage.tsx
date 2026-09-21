import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { MOCK_RENTAL_REQUESTS, MOCK_HANDOVERS } from '../../services/mockData';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrencyEGP } from '../../utils/pricing';
import { ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';

export const RentalDetailsPage: React.FC = () => {
  const { rentalId } = useParams<{ rentalId: string }>();
  const request = MOCK_RENTAL_REQUESTS.find((r) => r.id === rentalId) || MOCK_RENTAL_REQUESTS[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          to="/user/rentals"
          className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Rentals</span>
        </Link>
      </div>

      <FoundationPlaceholder
        title={`Rental Request / Booking: ${request.id}`}
        category="Dynamic Rental Lifecycle (/user/rentals/:rentalId)"
        description="Tracks deposit payment, handover status (Owner -> Rent Back -> Renter -> Return), condition photo logs, and return confirmation."
        targetPhase="Interactive photo upload for condition inspection and refund trigger"
        dataEntities={['RentalRequest', 'Booking', 'HandoverRecord', 'DepositEscrow']}
        suggestedActions={[
          { label: 'Back to All Rentals', to: '/user/rentals' },
          { label: 'View Product Details', to: `/products/${request.productId}` }
        ]}
      />

      {/* Handover Timeline Verification */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <img
              src={request.productMainImage}
              alt={request.productTitle}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-stone-900">{request.productTitle}</h3>
              <p className="text-xs text-stone-500">
                Owner: {request.ownerName} • Total rental: {formatCurrencyEGP(request.totalRentalFee)}
              </p>
            </div>
          </div>
          <StatusBadge status={request.status} size="md" />
        </div>

        <div className="rounded-lg bg-stone-50 p-4 border border-stone-100 space-y-2 text-xs">
          <div className="font-semibold text-stone-800 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-stone-600" />
            <span>Rent Back Managed Handover Sequence</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600 pt-2">
            <div className="p-2.5 rounded bg-white border border-stone-200">
              <span className="font-bold block text-stone-900">Step 1: Owner Handover</span>
              <span className="text-[11px] text-stone-500">Rent Back hub collects & logs condition</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-stone-200">
              <span className="font-bold block text-stone-900">Step 2: Renter Delivery</span>
              <span className="text-[11px] text-stone-500">Delivered directly to renter upon inspection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
