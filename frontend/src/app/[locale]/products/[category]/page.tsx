import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getProducts } from '@/lib/api';
import ProductsCarousel from '@/components/ui/ProductsCarousel';

const PAGE_SIZE = 24;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, category: categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10));

  const category = await getCategoryBySlug(categorySlug, locale);
  if (!category) notFound();

  const categories = await getCategories(locale);
  const { data: products, total } = await getProducts(categorySlug, locale, page, PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const t = {
    th: { meta: 'คอลเลกชัน', all: 'สินค้าทั้งหมด', empty: 'ไม่พบสินค้าในหมวดหมู่นี้', prev: '← ก่อนหน้า', next: 'ถัดไป →' },
    en: { meta: 'Collection', all: 'All Objects', empty: 'No objects found in this category.', prev: '← Previous', next: 'Next →' },
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-meta mb-6 block">{t.meta} / {category.name}</span>
          <h1 className="heading-section">{category.name}</h1>
          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">{category.description}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 border-b border-neutral-100 pb-8">
          <Link href={`/${locale}/products`} className="text-xs uppercase tracking-[0.2em] font-bold text-secondary hover:text-primary pb-8 transition-colors">
            {t.all}
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/${locale}/products/${cat.slug}`}
              className={`text-xs uppercase tracking-[0.2em] font-bold pb-8 transition-all ${cat.slug === categorySlug ? 'text-primary border-b-2 border-primary -mb-[34px]' : 'text-secondary hover:text-primary'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Carousel */}
        {products.length === 0
          ? <p className="text-secondary font-light py-12">{t.empty}</p>
          : <ProductsCarousel products={products} locale={locale} />
        }

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-24 border-t border-neutral-100 pt-12">
            {page > 1 && (
              <Link href={`/${locale}/products/${categorySlug}?page=${page - 1}`} className="text-[11px] uppercase tracking-widest text-primary border border-neutral-300 px-5 py-2.5 hover:border-primary transition-colors">
                {t.prev}
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <Link
                key={p}
                href={`/${locale}/products/${categorySlug}?page=${p}`}
                className={`text-[11px] w-9 h-9 flex items-center justify-center border transition-colors ${p === page ? 'bg-primary text-white border-primary' : 'border-neutral-300 text-primary hover:border-primary'}`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={`/${locale}/products/${categorySlug}?page=${page + 1}`} className="text-[11px] uppercase tracking-widest text-primary border border-neutral-300 px-5 py-2.5 hover:border-primary transition-colors">
                {t.next}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
