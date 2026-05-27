'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/api';

interface PopupData {
  enabled: boolean;
  image?: { url: string };
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
}

export default function AnnouncementPopup({ popup }: { popup: PopupData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (popup?.enabled) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (!visible) return null;

  const imageUrl = popup.image?.url ? getStrapiMedia(popup.image.url) : null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {imageUrl && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={popup.title || 'Announcement'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {(popup.title || popup.description || popup.button_text) && (
          <div className="px-8 py-8 text-center">
            {popup.title && (
              <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3">
                {popup.title}
              </h2>
            )}
            {popup.description && (
              <p className="text-secondary text-sm font-light leading-relaxed mb-6 whitespace-pre-line">
                {popup.description}
              </p>
            )}
            {popup.button_text && popup.button_link && (
              <Link
                href={popup.button_link}
                onClick={() => setVisible(false)}
                className="inline-block bg-primary text-white text-xs font-semibold uppercase tracking-widest px-8 py-3 hover:bg-neutral-800 transition-colors"
              >
                {popup.button_text}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
