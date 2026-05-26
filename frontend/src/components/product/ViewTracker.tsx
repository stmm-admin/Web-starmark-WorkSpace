'use client';

import { useEffect } from 'react';
import { incrementProductView } from '@/lib/api';

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    incrementProductView(slug);
  }, [slug]);

  return null;
}
