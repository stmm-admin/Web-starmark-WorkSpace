import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getProducts, getStrapiMedia } from '@/lib/api';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const categories = await getCategories(locale);
  const products = await getProducts(undefined, locale);

  const t = {
    th: {
      meta: 'Collections Overview',
      title: 'All Products',
      desc: 'เฟอร์นิเจอร์สำนักงานระดับพรีเมียมครบทุกกลุ่ม ออกแบบเพื่อองค์กรชั้นนำ',
      all: 'All Objects'
    },
    en: {
      meta: 'Collections Overview',
      title: 'All Products',
      desc: 'Premium office furniture across every category, designed for leading organizations.',
      all: 'All Objects'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-meta mb-6 block">{t.meta}</span>
          <h1 className="heading-section">{t.title}</h1>
          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">
            {t.desc}
          </p>
        </div>

        {/* Minimal Category Filter */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-24 border-b border-neutral-100 pb-8">
          <Link href={`/${locale}/products`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary border-b-2 border-primary pb-8 -mb-[34px] transition-all">
            {t.all}
          </Link>
          {categories.map(cat => (
            <Link key={cat.id} href={`/${locale}/products/${cat.slug}`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary hover:text-primary pb-8 transition-colors">
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
              <span className="text-meta text-[9px] mb-3 block">{product.collection?.name ?? ''}</span>
              <h3 className="text-xl font-serif text-primary group-hover:text-secondary transition-colors mb-2">{product.name}</h3>
              <p className="text-sm text-secondary font-light line-clamp-1">{product.short_description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
