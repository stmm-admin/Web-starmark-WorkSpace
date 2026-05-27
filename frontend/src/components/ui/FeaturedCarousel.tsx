'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getStrapiMedia } from '@/lib/api';

interface Props {
  products: Product[];
  locale: string;
}

export default function FeaturedCarousel({ products, locale }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const CARD_WIDTH = 296; // px — matches card width + gap

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateArrows();
  }, [products]);

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? CARD_WIDTH * 2 : -CARD_WIDTH * 2, behavior: 'smooth' });
    setTimeout(updateArrows, 350);
  };

  return (
    <div className="relative group/carousel">
      {/* Left Arrow */}
      {canPrev && (
        <button
          onClick={() => scroll('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors rounded-full"
          aria-label="Previous"
        >
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow */}
      {canNext && (
        <button
          onClick={() => scroll('next')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-white border border-neutral-200 shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors rounded-full"
          aria-label="Next"
        >
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.slug}`}
            className="group block flex-shrink-0 w-64"
          >
            <div className="relative aspect-[3/4] bg-neutral-100 mb-6 overflow-hidden rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
              {product.trending_topic && (
                <span className="absolute top-3 left-3 z-10 text-red-600 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 animate-blink">
                  Best Seller
                </span>
              )}
              {!product.trending_topic && (product.view_count ?? 0) >= 1 && (
                <span className="absolute top-3 left-3 z-10 text-yellow-500 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 animate-blink">
                  Popular
                </span>
              )}
              <Image
                src={getStrapiMedia(product.gallery?.[0]?.url) || 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold block mb-2">
              {product.collection?.name ?? ''}
            </span>
            <h3 className="text-lg font-serif text-primary group-hover:text-secondary transition-colors mb-3">
              {product.name}
            </h3>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
