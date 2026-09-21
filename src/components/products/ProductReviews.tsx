import React, { useMemo, useState } from 'react';
import { Star, ShieldCheck, User as UserIcon, MessageSquare } from 'lucide-react';
import { Review } from '../../types';
import { Rating } from './Rating';

export interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviewCount
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Compute breakdown percentages
  const ratingDistribution = useMemo(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const star = Math.round(r.rating);
      if (counts[star] !== undefined) counts[star]++;
    });

    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star] || 0,
      percentage: Math.round(((counts[star] || 0) / total) * 100)
    }));
  }, [reviews]);

  const displayedReviews = useMemo(() => {
    if (filterRating === null) return reviews;
    return reviews.filter((r) => Math.round(r.rating) === filterRating);
  }, [reviews, filterRating]);

  return (
    <div className="space-y-6 pt-8 border-t border-stone-200" id="reviews-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <span>Verified Reviews & Ratings</span>
            <span className="text-sm font-normal text-stone-500">
              ({totalReviewCount} total)
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Submitted strictly after completed rentals and hub inspections</span>
          </p>
        </div>
      </div>

      {/* Aggregate Score & Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-stone-50 border border-stone-200/80">
        {/* Overall Score Box */}
        <div className="flex flex-col items-center justify-center text-center p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-4xl font-extrabold text-stone-900">
            {averageRating.toFixed(1)}
          </span>
          <div className="mt-2">
            <Rating value={averageRating} size="md" showScore={false} showCount={false} />
          </div>
          <span className="text-xs text-stone-500 mt-1.5 font-medium">
            Based on {totalReviewCount} verified rentals
          </span>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <button
              key={star}
              type="button"
              onClick={() => setFilterRating(filterRating === star ? null : star)}
              className={`flex items-center gap-3 text-xs w-full group text-left transition-opacity ${
                filterRating !== null && filterRating !== star ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <span className="w-12 text-stone-600 font-medium shrink-0 flex items-center gap-1">
                <span>{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>

              <div className="grow h-2.5 rounded-full bg-stone-200 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-amber-400 group-hover:bg-amber-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-10 text-right text-stone-500 text-[11px] shrink-0 font-mono">
                {count}
              </span>
            </button>
          ))}
          {filterRating !== null && (
            <button
              type="button"
              onClick={() => setFilterRating(null)}
              className="text-xs text-[#10605B] font-semibold hover:underline self-start pt-1"
            >
              Reset star filter
            </button>
          )}
        </div>
      </div>

      {/* Review Cards List */}
      {displayedReviews.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-stone-50 border border-dashed border-stone-200 text-stone-500 text-sm">
          <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="font-semibold text-stone-700">No reviews matching this filter</p>
          <p className="text-xs text-stone-400 mt-1">
            Try clicking the active star filter above to show all verified reviews.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedReviews.map((rev) => {
            const formattedDate = new Date(rev.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-xs uppercase">
                      {rev.authorName ? rev.authorName.charAt(0) : <UserIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 text-sm">
                          {rev.authorName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                          Verified Renter
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400">{formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Rating value={rev.rating} size="sm" showScore={false} showCount={false} />
                  </div>
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
