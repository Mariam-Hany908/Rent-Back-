import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Activity, DollarSign, ArrowRight } from 'lucide-react';
import { formatCurrencyEGP } from '../../utils/pricing';

export const OwnerDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Owner Dashboard Overview"
        category="Owner Operations"
        description="Manage your listed items, review rental requests, monitor managed handovers, and track net earnings (after the 10% platform fee)."
        targetPhase="Interactive earnings charts, live booking approvals, and listing toggles"
        dataEntities={['Product', 'ListingLifecycle', 'OwnerEarnings', 'HandoverSchedule']}
        suggestedActions={[
          { label: 'Create New Listing', to: '/owner/listings/new' },
          { label: 'Manage All Listings', to: '/owner/listings' },
          { label: 'View Earnings Breakdown', to: '/owner/earnings' }
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Active Listings
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">1</div>
          <Link
            to="/owner/listings"
            className="text-xs font-semibold text-stone-700 hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>View Listings</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Pending Handover Pickups
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">0</div>
          <Link
            to="/owner/activity"
            className="text-xs font-semibold text-stone-700 hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>Check Activity</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Net Paid Earnings
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">{formatCurrencyEGP(2160)}</div>
          <Link
            to="/owner/earnings"
            className="text-xs font-semibold text-stone-700 hover:underline mt-2 inline-flex items-center gap-1"
          >
            <span>Earnings History</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
