import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { ShieldCheck, ArrowRightLeft, Lock, Truck, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: '1. Request to Rent',
      desc: 'Renter selects dates. Dates are temporarily held. Rent Back validates request details.'
    },
    {
      title: '2. Approval & Deposit',
      desc: 'Once approved, the renter pays the 50% security deposit into Rent Back secure escrow.'
    },
    {
      title: '3. Managed Pickup & Inspection',
      desc: 'Rent Back courier collects the item from the owner, photographs condition, and conducts preliminary tests.'
    },
    {
      title: '4. Delivery to Renter',
      desc: 'Renter inspects the item upon delivery and confirms handoff. Zero direct contact between stranger parties.'
    },
    {
      title: '5. Return & Deposit Settlement',
      desc: 'Item is returned to Rent Back for final check. Deposit is released promptly; 10% commission is deducted from rental fee.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <FoundationPlaceholder
        title="How Rent Back Works"
        category="Public Educational View"
        description="Comprehensive explanation of Rent Back's intermediary role: eliminating peer-to-peer friction through managed custody, 50% security deposit protection, and certified quality checks."
        targetPhase="Visual workflow diagram & animated timeline"
        dataEntities={['HandoverRecord', 'RentalRequest', 'Booking', 'DepositEscrow']}
        suggestedActions={[
          { label: 'Browse Verified Items', to: '/' },
          { label: 'List Your Equipment', to: '/owner/listings/new' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-stone-900 mb-6">
          The 5-Step Handover & Custody Architecture
        </h3>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start p-3 rounded-lg bg-stone-50 border border-stone-100">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white font-bold text-xs">
                {i + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">{step.title}</h4>
                <p className="text-xs text-stone-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
