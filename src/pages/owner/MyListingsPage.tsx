import React, { useEffect, useState } from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrencyEGP } from '../../utils/pricing';
import { PlusCircle, Edit3, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const MyListingsPage: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<Product[]>([]);

  useEffect(() => {
    if (user) {
      productService.getProducts({ ownerId: user.id }).then(setListings);
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FoundationPlaceholder
          title="My Listed Equipment & Apparel"
          category="Owner Inventory Management"
          description="Listing lifecycle: DRAFT → SUBMITTED → PENDING_REVIEW → APPROVED → ACTIVE (or REJECTED → Edit → Resubmit). Unapproved listings are kept strictly private."
          targetPhase="Dynamic status workflow transitions and inventory actions"
          dataEntities={['Product', 'ListingLifecycle', 'CategoryFieldValues', 'AvailabilityCalendar']}
          suggestedActions={[{ label: 'List New Item', to: '/owner/listings/new' }]}
        />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-900">Your Listings ({listings.length})</h3>
          <Link
            to="/owner/listings/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </Link>
        </div>

        <div className="space-y-3">
          {listings.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-stone-200 bg-stone-50/50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.media[0]?.url}
                  alt={item.title}
                  className="w-14 h-14 rounded object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {item.category}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 mt-0.5">{item.title}</h4>
                  <p className="text-[11px] text-stone-500">
                    Declared: {formatCurrencyEGP(item.declaredValue)} • Deposit: {formatCurrencyEGP(item.securityDeposit)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between sm:justify-end">
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">
                    {formatCurrencyEGP(item.rentalPricePerDay)}
                  </div>
                  <span className="text-[10px] text-stone-400">/ day</span>
                </div>
                <div className="flex gap-1.5">
                  <Link
                    to={`/products/${item.id}`}
                    className="rounded p-1.5 text-stone-500 hover:bg-stone-200 transition-colors"
                    title="Preview public view"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
