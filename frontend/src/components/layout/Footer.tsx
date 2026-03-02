import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 mt-32">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-serif tracking-tighter text-primary">
              MOGEN
            </Link>
            <p className="mt-8 text-secondary text-sm leading-relaxed max-w-sm font-light">
              Elevating the bathroom experience with premium, minimal, and European-inspired sanitaryware. Precision in every detail, clarity in every form.
            </p>
            <div className="mt-10 flex space-x-6">
              {/* Simple icons placeholders */}
              <div className="w-5 h-5 bg-neutral-200 rounded-full" />
              <div className="w-5 h-5 bg-neutral-200 rounded-full" />
              <div className="w-5 h-5 bg-neutral-200 rounded-full" />
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Products</h3>
            <ul className="space-y-4">
              <li><Link href="/products/washbasins" className="text-sm text-secondary hover:text-primary transition-colors font-light">Washbasins</Link></li>
              <li><Link href="/products/toilets" className="text-sm text-secondary hover:text-primary transition-colors font-light">Toilets</Link></li>
              <li><Link href="/products/bathtubs" className="text-sm text-secondary hover:text-primary transition-colors font-light">Bathtubs</Link></li>
              <li><Link href="/products/faucets" className="text-sm text-secondary hover:text-primary transition-colors font-light">Faucets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Professional</h3>
            <ul className="space-y-4">
              <li><Link href="/architects" className="text-sm text-secondary hover:text-primary transition-colors font-light">Architects</Link></li>
              <li><Link href="/installers" className="text-sm text-secondary hover:text-primary transition-colors font-light">Installers</Link></li>
              <li><Link href="/downloads" className="text-sm text-secondary hover:text-primary transition-colors font-light">Technical Data</Link></li>
              <li><Link href="/bim" className="text-sm text-secondary hover:text-primary transition-colors font-light">BIM Data</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors font-light">About MOGEN</Link></li>
              <li><Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors font-light">Contact</Link></li>
              <li><Link href="/dealers" className="text-sm text-secondary hover:text-primary transition-colors font-light">Store Locator</Link></li>
              <li><Link href="/faq" className="text-sm text-secondary hover:text-primary transition-colors font-light">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400">
            &copy; {new Date().getFullYear()} MOGEN International. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link href="/legal" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors">Legal Notice</Link>
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
