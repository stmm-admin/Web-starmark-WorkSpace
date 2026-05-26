import Link from 'next/link';
import Image from 'next/image';
import { Prompt } from 'next/font/google';

const promptThai = Prompt({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#eadfce] bg-white text-[#2d4d7f] font-sans">
      <div className="container mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <Link href="/">
              <Image
                src="/logo-starmark.png"
                alt="Starmark Work Space"
                width={180}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            <p lang="th" className={`${promptThai.className} mt-4 text-[16px] leading-[1.45] text-[#4d668f] max-w-xs font-light`}>
              เฟอร์นิเจอร์สำนักงานระดับพรีเมียม ออกแบบเพื่อองค์กรชั้นนำ ด้วยคุณภาพและดีไซน์ที่เหนือกว่า
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/starmarkworkspace"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffdf9] border border-[#e1d5c7] text-[#3e649a] hover:bg-[#f5eee3] transition-colors text-sm"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://lin.ee/mdbXXwN"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffdf9] border border-[#e1d5c7] text-[#3aa269] hover:bg-[#eef8ef] transition-colors text-[10px]"
                aria-label="Line"
              >
                Line
              </a>
              <a
                href="https://www.tiktok.com/@starmark.official"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#fffdf9] border border-[#e1d5c7] text-[#2d4d7f] hover:bg-[#f0f4fb] transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 lang="th" className={`${promptThai.className} text-[24px] font-light text-black mb-3`}>กลุ่มสินค้า</h3>
            <ul className="space-y-1.5 text-[15px] font-light leading-snug text-[#2e548b]">
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">Executive Desk &amp; Chair</Link></li>
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">Workstation &amp; Chair</Link></li>
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">Meeting Table &amp; Conference</Link></li>
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">KERUI Series</Link></li>
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">AITE Series</Link></li>
              <li><Link href="/products" className="hover:text-[#0f2f61] transition-colors">YOUMO Series</Link></li>
            </ul>
          </div>

          <div>
            <h3 lang="th" className={`${promptThai.className} text-[24px] font-light text-black mb-3`}>บริษัท</h3>
            <ul className="space-y-1.5 text-[15px] font-light leading-snug text-[#2e548b]">
              <li lang="th" className={promptThai.className}><Link href="/about" className="hover:text-[#0f2f61] transition-colors">เกี่ยวกับเรา</Link></li>
              <li lang="th" className={promptThai.className}><Link href="/projects" className="hover:text-[#0f2f61] transition-colors">โปรเจคตัวอย่าง</Link></li>
              <li lang="th" className={promptThai.className}><Link href="/collections" className="hover:text-[#0f2f61] transition-colors">คอลเลกชัน 2026</Link></li>
              <li lang="th" className={promptThai.className}><a href="https://drive.google.com/file/d/1QPgTuxC_bX05rapw0WXfXSHz70tseg94/view?fbclid=IwY2xjawSCLlpleHRuA2FlbQIxMABicmlkETFaU0NseEJsR3h6ZWNvTTIwc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHqKqvaUZoFAYTUpjIlLrb3J9eBd0fSvP2vv1a1kUY5TarWWS8J7GlAjJJDWk_aem_h0i5uvgk_2FOVmkTAibkcw&pli=1" target="_blank" rel="noreferrer" className="hover:text-[#0f2f61] transition-colors">ดาวน์โหลด Catalog</a></li>
              <li lang="th" className={promptThai.className}><Link href="/contact" className="hover:text-[#0f2f61] transition-colors">ติดต่อเรา</Link></li>
              <li lang="th" className={promptThai.className}><Link href="/contact" className="hover:text-[#0f2f61] transition-colors">ขอใบเสนอราคา</Link></li>
            </ul>
          </div>

          <div>
            <h3 lang="th" className={`${promptThai.className} text-[24px] font-light text-black mb-3`}>ติดต่อเรา</h3>
            <ul className="space-y-2.5 text-[15px] font-light text-[#2e548b] leading-snug">
              <li>
                <span className="text-[#b48a2a] mr-2">✆</span>
                02-123-4567
                <div lang="th" className={`${promptThai.className} text-[13px] text-[#7f95b3] mt-0.5`}>จันทร์-ศุกร์ 8:30-17:30</div>
              </li>
              <li>
                <span className="text-[#b48a2a] mr-2">✉</span>
                info@starmarkworkspace.com
              </li>
              <li lang="th" className={promptThai.className}>
                <span className="text-[#b48a2a] mr-2">⌖</span>
                กรุงเทพมหานคร ประเทศไทย
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#e5d9c8] flex flex-col md:flex-row justify-between gap-3 text-[12px] text-[#7089ad]">
          <p>© {new Date().getFullYear()} Starmark Work Space. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#284d86] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#284d86] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#284d86] transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
