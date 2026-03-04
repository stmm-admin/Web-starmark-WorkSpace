'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 flex items-center gap-8">
            <Link href={`/${locale}`} className="text-3xl font-serif tracking-tighter text-primary">
              MOGEN
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-12">
            <Link href={`/${locale}/products`} className="text-[12px] uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary transition-colors">
              Products
            </Link>
            <Link href={`/${locale}/collections`} className="text-[12px] uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary transition-colors">
              Collections
            </Link>
            <Link href={`/${locale}/about`} className="text-[12px] uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary transition-colors">
              About
            </Link>
            <Link href={`/${locale}/contact`} className="text-[12px] uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-8">
            <LanguageSwitcher />
            <button className="text-primary hover:text-primary/70 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className="lg:hidden text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
