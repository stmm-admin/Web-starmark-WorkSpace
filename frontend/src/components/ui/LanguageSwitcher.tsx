'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split('/');
  const currentLocale = segments[1];
  
  const switchLocale = (locale: string) => {
    const newSegments = [...segments];
    newSegments[1] = locale;
    return newSegments.join('/');
  };

  return (
    <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase">
      <Link 
        href={switchLocale('en')}
        className={`${currentLocale === 'en' ? 'text-primary' : 'text-neutral-300 hover:text-primary'} transition-colors`}
      >
        EN
      </Link>
      <span className="w-px h-3 bg-neutral-200" />
      <Link 
        href={switchLocale('th')}
        className={`${currentLocale === 'th' ? 'text-primary' : 'text-neutral-300 hover:text-primary'} transition-colors`}
      >
        TH
      </Link>
    </div>
  );
}
