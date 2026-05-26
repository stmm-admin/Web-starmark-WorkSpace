'use client';

import { useState } from 'react';

interface PhilosophyItem {
  title: string;
  thaiTitle: string;
  description: string;
}

interface PhilosophyListProps {
  items: PhilosophyItem[];
}

export default function PhilosophyList({ items }: PhilosophyListProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {items.map((phil, idx) => {
        const isActive = activeIdx === idx;
        const isIndented = idx % 2 === 1;

        return (
          <div
            key={idx}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            className={`
              relative border-t border-neutral-200 py-8 cursor-default
              transition-all duration-500 ease-out
              ${isIndented ? 'ml-12' : 'mr-4'}
              ${isActive ? (isIndented ? 'translate-x-2' : 'translate-x-3') : 'translate-x-0'}
            `}
          >
            {/* animated top border */}
            <div
              className={`absolute top-0 left-0 h-px bg-primary transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0'}`}
            />

            <span
              className={`block text-[10px] uppercase tracking-[0.3em] mb-3 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-secondary'}`}
            >
              {phil.title}
            </span>

            <h4
              className={`font-serif italic text-xl font-light mb-3 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-primary/70'}`}
            >
              {phil.thaiTitle}
            </h4>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-secondary font-light text-sm leading-relaxed max-w-sm pt-1">
                {phil.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
