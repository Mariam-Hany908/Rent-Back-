import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrencyEGP } from '../../utils/pricing';
import { StatusBadge } from '../common/StatusBadge';
import { Rating } from './Rating';
import { ProductImage } from './ProductImage';
import { useFavorites } from '../../context/FavoritesContext';

export interface ProductCardProps {
  product: Product;
  className?: string;
  showStatus?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  showStatus = true
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const mainImage = product.media.find((m) => m.isMain) || product.media[0];

  return (
    <Link
      to={`/products/${product.id}`}
      className={`group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-rentback-hover ${className}`}
    >
      {/* Media Stage */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <ProductImage
          src={mainImage?.url}
          alt={product.title}
          aspectRatio="4/3"
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          {showStatus ? (
            <div className="pointer-events-auto">
              <StatusBadge status={product.status} size="sm" />
            </div>
          ) : (
            <div />
          )}

          {/* Favorite Toggle */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-150 cursor-pointer shadow-xs ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-150 active:scale-125 ${
                favorited ? 'fill-white stroke-white' : ''
              }`}
            />
          </button>
        </div>

        {/* Managed Handover Overlay Micro-Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#0B132B]/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-white">
            <ShieldCheck className="w-3 h-3 text-[#1EC2A4]" />
            <span>Hub Inspected</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-[#10605B]">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-medium truncate max-w-[120px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{product.location.area || product.location.city}</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-[#0B132B] line-clamp-2 leading-snug group-hover:text-[#10605B] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="mt-2">
            <Rating
              value={product.rating}
              reviewCount={product.reviewCount}
              size="sm"
            />
          </div>
        </div>

        {/* Pricing & 50% Deposit Line */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-base font-extrabold text-[#0B132B] tabular-nums">
              {formatCurrencyEGP(product.rentalPricePerDay)}
            </span>
            <span className="text-slate-400 text-xs font-normal"> / day</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block leading-none mb-0.5">
              50% Escrow
            </span>
            <span className="text-xs font-bold text-[#10605B] tabular-nums">
              {formatCurrencyEGP(product.securityDeposit)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden animate-pulse">
      <div className="aspect-4/3 w-full bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-3 w-20 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
        <div className="h-3 w-24 bg-slate-200 rounded" />
        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
          <div className="h-5 w-20 bg-slate-200 rounded" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};
