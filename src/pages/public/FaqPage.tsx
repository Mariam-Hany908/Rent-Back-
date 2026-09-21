import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';

export const FaqPage: React.FC = () => {
  const faqs = [
    {
      q: 'How is the security deposit calculated?',
      a: 'The deposit is strictly 50% of the item’s declared value. For example, a 10,000 EGP camera has a 5,000 EGP deposit held in escrow.'
    },
    {
      q: 'What is the cancellation policy?',
      a: 'If cancelled within the first 2 days (48 hours) after paying the deposit: 70% of the deposit is refunded. After 48 hours, the deposit is not refunded.'
    },
    {
      q: 'What is the platform commission fee?',
      a: 'Rent Back takes a 10% commission on the rental fee. We never take any percentage from the security deposit.'
    },
    {
      q: 'Do I meet the owner or renter directly?',
      a: 'No. Rent Back handles all physical handovers, quality inspections, and returns.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <FoundationPlaceholder
        title="Frequently Asked Questions & Policies"
        category="Help & Support"
        description="Clear documentation of platform business rules: 50% security deposit, 10% commission, 48-hour 70% cancellation refund policy, and managed handover."
        targetPhase="Interactive FAQ accordion with searchable policies"
        dataEntities={['PlatformPolicies', 'DepositRules', 'CancellationRules']}
        suggestedActions={[{ label: 'Return Home', to: '/' }]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-stone-100 pb-4 last:border-b-0 last:pb-0">
            <h4 className="text-xs font-bold text-stone-900">{faq.q}</h4>
            <p className="text-xs text-stone-600 mt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
