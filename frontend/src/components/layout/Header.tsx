'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/products`, label: 'Products' },
    { href: `/${locale}/collections`, label: 'Collections' },
    { href: `/${locale}/about`, label: 'About' },
    { href: `/${locale}/projects`, label: 'Project' },
    { href: `/${locale}/contact`, label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0 flex items-center gap-8">
              <Link href={`/${locale}`} className="inline-flex items-center" aria-label="Work Space Home">
                <Image
                  src="/logo-starmark.png"
                  alt="Starmark Work Space"
                  width={180}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-12">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-8">
              <a href="tel:021022629" className="hidden lg:flex items-center gap-2 text-[11px] tracking-widest text-primary/60 hover:text-primary transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                02 102 2629
              </a>
              <LanguageSwitcher />
              <button className="text-primary hover:text-primary/70 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-primary"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto w-72 h-full bg-white flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-neutral-100">
              <Image
                src="/logo-starmark.png"
                alt="Starmark Work Space"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-primary p-1"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-grow">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] font-semibold text-primary/70 hover:text-primary py-4 border-b border-neutral-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Footer info */}
            <div className="px-6 py-8 border-t border-neutral-100">
              <a href="tel:021022629" className="flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                02 102 2629
              </a>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
