import Link from 'next/link';
import { getCategories, getProducts, getNewProducts } from '@/lib/api';
import ProductsCarousel from '@/components/ui/ProductsCarousel';

const PAGE_SIZE = 24;

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10));

  const [categories, { data: products, total }, newProducts] = await Promise.all([
    getCategories(locale),
    getProducts(undefined, locale, page, PAGE_SIZE),
    getNewProducts(locale),
  ]);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const t = {
    th: {
      meta: 'Collections Overview',
      title: 'All Products',
      desc: 'เฟอร์นิเจอร์สำนักงานระดับพรีเมียมครบทุกกลุ่ม ออกแบบเพื่อองค์กรชั้นนำ',
      all: 'All Objects',
      prev: '← ก่อนหน้า',
      next: 'ถัดไป →',
      newMeta: 'สินค้ามาใหม่',
      newTitle: 'New Products',
    },
    en: {
      meta: 'Collections Overview',
      title: 'All Products',
      desc: 'Premium office furniture across every category, designed for leading organizations.',
      all: 'All Objects',
      prev: '← Previous',
      next: 'Next →',
      newMeta: 'New Arrivals',
      newTitle: 'New Products',
    },
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-24">
          <div className="max-w-xl">
            <span className="text-meta mb-6 block">{t.meta}</span>
            <h1 className="heading-section">{t.title}</h1>
            <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">{t.desc}</p>
          </div>
          <div className="max-w-sm lg:text-right">
            <p className="font-serif text-xl md:text-2xl text-primary leading-snug mb-3">
              {locale === 'th' ? 'โต๊ะทำงานที่สะท้อนตัวตนของผู้นำ' : 'A desk that reflects the identity of a leader.'}
            </p>
            <p className="text-secondary text-sm font-light leading-relaxed">
              {locale === 'th'
                ? 'เพราะ "พื้นที่ทำงาน" คือภาพลักษณ์แรกของความเป็นมืออาชีพ'
                : 'Because your workspace is the first impression of professionalism.'}
            </p>
          </div>
        </div>

        {/* New Products Section */}
        {newProducts.length > 0 && (
          <div className="mb-24">
            <h2 className="font-serif text-2xl md:text-3xl text-primary mb-10">{t.newTitle}</h2>
            <ProductsCarousel products={newProducts} locale={locale} />
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 border-b border-neutral-100 pb-8">
          <Link href={`/${locale}/products`} className="text-xs uppercase tracking-[0.2em] font-bold text-primary border-b-2 border-primary pb-8 -mb-[34px] transition-all">
            {t.all}
          </Link>
          {categories.map(cat => (
            <Link key={cat.id} href={`/${locale}/products/${cat.slug}`} className="text-xs uppercase tracking-[0.2em] font-bold text-secondary hover:text-primary pb-8 transition-colors">
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Carousel */}
        <ProductsCarousel products={products} locale={locale} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-24 border-t border-neutral-100 pt-12">
            {page > 1 && (
              <Link href={`/${locale}/products?page=${page - 1}`} className="text-[11px] uppercase tracking-widest text-primary border border-neutral-300 px-5 py-2.5 hover:border-primary transition-colors">
                {t.prev}
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/${locale}/products?page=${p}`}
                className={`text-[11px] w-9 h-9 flex items-center justify-center border transition-colors ${p === page ? 'bg-primary text-white border-primary' : 'border-neutral-300 text-primary hover:border-primary'}`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={`/${locale}/products?page=${page + 1}`} className="text-[11px] uppercase tracking-widest text-primary border border-neutral-300 px-5 py-2.5 hover:border-primary transition-colors">
                {t.next}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
