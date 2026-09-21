import React, { useState } from 'react';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Video, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { ProductMedia } from '../../types';

export interface ProductMediaGalleryProps {
  media: ProductMedia[];
  title: string;
}

export const ProductMediaGallery: React.FC<ProductMediaGalleryProps> = ({ media, title }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Safety fallback if media is empty
  const safeMedia: ProductMedia[] = media && media.length > 0 
    ? media 
    : [{ id: 'fallback_1', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80', type: 'image', isMain: true }];

  const activeItem = safeMedia[selectedIndex] || safeMedia[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : safeMedia.length - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < safeMedia.length - 1 ? prev + 1 : 0));
  };

  const getTagBadge = (item: ProductMedia) => {
    if (item.type === 'video') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide">
          <Video className="w-3 h-3 text-emerald-400" />
          <span>Video Demo</span>
        </span>
      );
    }
    switch (item.tag) {
      case 'condition':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[11px] font-medium border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Condition Verified</span>
          </span>
        );
      case 'detailed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-slate-200 text-[11px] font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Detail View</span>
          </span>
        );
      case 'main':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10605B]/90 backdrop-blur-xs text-white text-[11px] font-medium shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-teal-200" />
            <span>Rent Back Certified</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-3 select-none" id="product-media-gallery">
      {/* Main Showcase Stage */}
      <div 
        className="relative group w-full aspect-4/3 sm:aspect-16/10 rounded-2xl bg-stone-900 overflow-hidden border border-stone-200/80 shadow-xs"
        aria-label="Active media preview"
      >
        {activeItem.type === 'video' ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              key={activeItem.url}
              controls
              playsInline
              className="w-full h-full object-contain"
              poster={safeMedia.find((m) => m.type === 'image')?.url}
            >
              <source src={activeItem.url} type="video/mp4" />
              Your browser does not support HTML5 video streaming.
            </video>
          </div>
        ) : (
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="w-full h-full cursor-zoom-in relative"
            title="Click to zoom image"
          >
            <img
              src={activeItem.url}
              alt={activeItem.caption || title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none z-10">
          {getTagBadge(activeItem)}
        </div>

        {/* Zoom / Lightbox Trigger Button */}
        {activeItem.type === 'image' && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-white/90 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs transition-transform hover:scale-105"
            aria-label="Expand media lightbox"
            title="Zoom image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Prev & Next Arrows (Visible if multiple items) */}
        {safeMedia.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 z-10"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 z-10"
              aria-label="Next item"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Caption Overlay */}
        {activeItem.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-xs text-stone-100 pointer-events-none">
            <p className="line-clamp-1">{activeItem.caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnails Navigation Strip */}
      {safeMedia.length > 1 && (
        <div 
          className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar"
          role="tablist"
          aria-label="Media items thumbnails"
        >
          {safeMedia.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={item.id || index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                role="tab"
                aria-selected={isSelected}
                className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all group focus:outline-hidden ${
                  isSelected 
                    ? 'border-[#10605B] ring-2 ring-[#10605B]/20 shadow-sm scale-102' 
                    : 'border-stone-200 hover:border-stone-300 opacity-75 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center text-white relative">
                    {safeMedia[0].type === 'image' && (
                      <img
                        src={safeMedia[0].url}
                        alt="Video Thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                    )}
                    <div className="relative z-10 w-7 h-7 rounded-full bg-[#10605B] flex items-center justify-center text-white shadow-xs">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                    <span className="relative z-10 text-[9px] font-semibold uppercase tracking-wider text-teal-200 mt-0.5">
                      Video
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                )}

                {/* Sub-tag indicator */}
                {item.tag === 'condition' && (
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" title="Condition verification photo" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal (For Fullscreen Zoom View) */}
      {isLightboxOpen && activeItem.type === 'image' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close zoom modal"
          >
            <X className="w-6 h-6" />
          </button>

          {safeMedia.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => handlePrev(e)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => handleNext(e)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div 
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.url}
              alt={activeItem.caption || title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            {activeItem.caption && (
              <p className="mt-3 text-sm text-stone-300 font-medium text-center">
                {activeItem.caption}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-stone-400">
                {selectedIndex + 1} of {safeMedia.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
