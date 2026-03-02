import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategories, getCategoryBySlug, getProducts, getStrapiMedia } from '@/lib/api';

export default async function CategoryPage({ params }: { params: Promise<{ locale: string, category: string }> }) {
  const { locale, category: categorySlug } = await params;

  const category = await getCategoryBySlug(categorySlug, locale);
  if (!category) {
    notFound();
  }

  const categories = await getCategories(locale);
  const products = await getProducts(categorySlug, locale);

  const t = {
    th: {
      meta: 'คอลเลกชัน',
      all: 'วัตถุทั้งหมด',
      empty: 'ไม่พบสินค้าในหมวดหมู่นี้'
    },
    en: {
      meta: 'Collection',
      all: 'All Objects',
      empty: 'No objects found in this category.'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-meta mb-6 block">{t.meta} / {category.name}</span>
          <h1 className="heading-section">{category.name}</h1>
          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Minimal Category Filter */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 border-b border-neutral-100 pb-8">
          <Link href={`/${locale}/products`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary hover:text-primary pb-8 transition-colors">
            {t.all}
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/${locale}/products/${cat.slug}`}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold pb-8 transition-all ${cat.slug === categorySlug
                  ? 'text-primary border-b-2 border-primary -mb-[34px]'
                  : 'text-secondary hover:text-primary'
                }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {products.map((product) => (
            <Link key={product.id} href={`/${locale}/product/${product.slug}`} className="group block">
              <div className="relative aspect-[3/4] bg-neutral-50 mb-8 overflow-hidden flex items-center justify-center p-12 transition-colors group-hover:bg-neutral-100">
                <Image
                  src={getStrapiMedia(product.gallery?.[0]?.url) || "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600"}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <span className="text-meta text-[9px] mb-3 block">{product.collection?.name || product.collection}</span>
              <h3 className="text-xl font-serif text-primary group-hover:text-secondary transition-colors mb-2">{product.name}</h3>
              <p className="text-sm text-secondary font-light line-clamp-1">{product.short_description}</p>
            </Link>
          ))}
          {products.length === 0 && (
            <p className="text-secondary font-light py-12 col-span-full">{t.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
