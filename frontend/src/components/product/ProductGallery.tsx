'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const mainImage = images[activeIndex] ?? images[0];

  const scrollThumb = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? 200 : -200, behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    setActiveIndex(i);
    // scroll thumbnail into view
    const el = trackRef.current;
    if (!el) return;
    const thumb = el.children[i] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-neutral-100 overflow-hidden">
        <Image
          src={mainImage.url}
          alt={mainImage.alt || productName}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        {/* Prev / Next on main image */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo((activeIndex - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo((activeIndex + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails with arrows */}
      {images.length > 1 && (
        <div className="relative flex items-center gap-2">
          {/* Left arrow */}
          <button
            onClick={() => scrollThumb('prev')}
            className="shrink-0 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 shadow-sm transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto flex-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                  activeIndex === i
                    ? 'ring-2 ring-primary ring-offset-1'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `${productName} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollThumb('next')}
            className="shrink-0 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 shadow-sm transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
