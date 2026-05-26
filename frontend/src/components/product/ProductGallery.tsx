'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-neutral-50 flex items-center justify-center p-12 md:p-24 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={mainImage.url}
            alt={mainImage.alt || productName}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-square bg-neutral-50 flex items-center justify-center p-4 transition-colors ${
                activeIndex === i ? 'ring-1 ring-primary' : 'hover:bg-neutral-100'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.url}
                  alt={img.alt || `${productName} view ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
