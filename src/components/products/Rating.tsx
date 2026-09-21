import React, { useState } from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number; // 0 to 5
  reviewCount?: number;
  showCount?: boolean;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isInteractive?: boolean;
  onChange?: (rating: number) => void;
  emptyLabel?: string;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  reviewCount,
  showCount = true,
  showScore = true,
  size = 'sm',
  isInteractive = false,
  onChange,
  emptyLabel = 'No reviews yet',
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  const textSizes = {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm'
  }[size];

  const currentVal = hoverRating !== null ? hoverRating : value;
  const isZero = value === 0 && (reviewCount === undefined || reviewCount === 0);

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      {/* 5-Star Visualizer */}
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rating: ${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = currentVal >= starIndex;
          const isHalf = !isFilled && currentVal >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              type="button"
              disabled={!isInteractive}
              onClick={() => isInteractive && onChange && onChange(starIndex)}
              onMouseEnter={() => isInteractive && setHoverRating(starIndex)}
              onMouseLeave={() => isInteractive && setHoverRating(null)}
              className={`relative p-0 bg-transparent border-0 ${
                isInteractive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              }`}
              aria-label={isInteractive ? `Rate ${starIndex} stars` : undefined}
            >
              {isHalf ? (
                <div className="relative">
                  <Star className={`${starSizes} text-slate-200 fill-slate-200`} />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <Star className={`${starSizes} text-amber-400 fill-amber-400`} />
                  </div>
                </div>
              ) : (
                <Star
                  className={`${starSizes} transition-colors ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200 fill-slate-200'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Numeric Score & Review Count */}
      {isZero ? (
        <span className={`${textSizes} text-slate-400 font-medium`}>{emptyLabel}</span>
      ) : (
        <div className={`flex items-baseline gap-1 font-semibold ${textSizes}`}>
          {showScore && (
            <span className="text-[#0B132B] tabular-nums font-bold">
              {value.toFixed(1)}
            </span>
          )}
          {showCount && reviewCount !== undefined && (
            <span className="text-slate-500 font-normal">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
