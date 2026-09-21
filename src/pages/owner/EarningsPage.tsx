import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { formatCurrencyEGP } from '../../utils/pricing';

export const EarningsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Owner Earnings & Payouts"
        category="Financial Ledgers"
        description="Transparent breakdown of completed rentals: gross rental fees, Rent Back 10% platform commission deductions, and net payouts. Security deposits remain separated from owner earnings."
        targetPhase="Interactive bank account payout integration & downloadable invoice statements"
        dataEntities={['OwnerEarnings', 'PayoutLedger', 'PlatformCommissionRule']}
        suggestedActions={[
          { label: 'Back to Dashboard', to: '/owner/dashboard' },
          { label: 'My Listings', to: '/owner/listings' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <h3 className="text-sm font-semibold text-stone-900">Payout Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-100 text-xs">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Gross Rental Volume</span>
            <span className="text-lg font-bold text-stone-900">{formatCurrencyEGP(2400)}</span>
          </div>
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-100 text-xs">
            <span className="text-stone-400 block text-[10px] uppercase font-bold">Platform Fee (10%)</span>
            <span className="text-lg font-bold text-stone-900">-{formatCurrencyEGP(240)}</span>
          </div>
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-emerald-700 block text-[10px] uppercase font-bold">Total Net Paid</span>
            <span className="text-lg font-bold text-emerald-900">{formatCurrencyEGP(2160)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
