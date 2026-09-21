import React from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { useFavorites } from '../../context/FavoritesContext';
import { MOCK_PRODUCTS } from '../../services/mockData';
import { Link } from 'react-router-dom';
import { formatCurrencyEGP } from '../../utils/pricing';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteProducts = MOCK_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Saved Favorites"
        category="Renter Wishlist"
        description="Bookmarked rental items saved to your personal account for fast access and availability tracking."
        targetPhase="Interactive remove/add, alert on price drops or newly opened dates"
        dataEntities={['Favorites', 'Product', 'Availability']}
        suggestedActions={[{ label: 'Browse More Gear', to: '/' }]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <h3 className="text-sm font-semibold text-stone-900 mb-4">
          Saved Items ({favoriteProducts.length})
        </h3>
        {favoriteProducts.length === 0 ? (
          <p className="text-xs text-stone-500">No items saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="flex gap-3 p-3 rounded-lg border border-stone-200 hover:border-stone-400 transition-colors"
              >
                <img
                  src={p.media[0]?.url}
                  alt={p.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">{p.title}</h4>
                  <p className="text-xs font-bold text-stone-900 mt-1">
                    {formatCurrencyEGP(p.rentalPricePerDay)} / day
                  </p>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
