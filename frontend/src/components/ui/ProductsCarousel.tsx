'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, getStrapiMedia } from '@/lib/api';

interface Props {
  products: Product[];
  locale: string;
}

export default function ProductsCarousel({ products, locale }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanNext(el.scrollWidth > el.clientWidth + 8);
  }, [products]);

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateArrows, 350);
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Left Arrow */}
      {canPrev && (
        <button
          onClick={() => scroll('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 w-10 h-10 bg-white border border-neutral-200 shadow-md rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 w-10 h-10 bg-white border border-neutral-200 shadow-md rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
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
        className="flex gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/product/${product.slug}`}
            className="group block flex-shrink-0 w-64"
          >
            <div className="relative aspect-[3/4] bg-neutral-100 mb-5 overflow-hidden rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
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
            <span className="text-meta text-[9px] mb-2 block">{product.collection?.name ?? ''}</span>
            <h3 className="text-lg font-serif text-primary group-hover:text-secondary transition-colors mb-1">{product.name}</h3>
            <p className="text-sm text-secondary font-light line-clamp-1 mb-3">{product.short_description}</p>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'} &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
