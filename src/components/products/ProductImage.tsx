import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';
import { RentBackLogo } from '../brand/RentBackLogo';

export interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | 'auto';
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  aspectRatio = '4/3',
  fallbackText = 'Rent Back Verified Item',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(!src);

  const aspectClass = {
    square: 'aspect-square',
    '4/3': 'aspect-4/3',
    '16/9': 'aspect-16/9',
    auto: ''
  }[aspectRatio];

  if (!src || hasError) {
    return (
      <div
        className={`w-full ${aspectClass} rounded-xl bg-slate-100 border border-slate-200/80 flex flex-col items-center justify-center p-4 text-center select-none ${containerClassName}`}
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-slate-200/70 flex items-center justify-center text-slate-400 mb-2">
          <ImageOff className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-slate-600 line-clamp-1">{alt}</span>
        <span className="text-[10px] text-slate-400 mt-0.5">{fallbackText}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-slate-100 ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100 animate-pulse">
          <div className="flex flex-col items-center gap-2">
            <RentBackLogo variant="icon" size="sm" />
            <span className="text-[10px] font-semibold text-slate-400">Loading item...</span>
          </div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
