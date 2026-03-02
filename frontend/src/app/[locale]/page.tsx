import Image from 'next/image';
import Link from 'next/link';
import { getCategories, getProducts, getStrapiMedia } from '@/lib/api';
import { getDictionary } from '@/dictionaries/get-dictionary';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');

  const categories = await getCategories(locale);
  const products = await getProducts(undefined, locale);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Bleed */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000"
          alt="Modern Minimalist Bathroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-white text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold animate-fade-in">
            {dict.home.hero.collection}
          </span>
          <h1 className="text-white heading-hero mb-8 max-w-4xl">
            {dict.home.hero.title}
          </h1>
          <Link href={`/${locale}/products`} className="btn-premium bg-white text-primary hover:bg-neutral-100">
            {dict.home.hero.cta}
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="heading-section" dangerouslySetInnerHTML={{ __html: dict.home.philosophy.title }}>
            </h2>
            <p className="text-secondary text-lg leading-relaxed font-light mb-8">
              {dict.home.philosophy.description}
            </p>
            <Link href={`/${locale}/about`} className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">
              {dict.home.philosophy.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid - Large Imagery */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {categories.slice(0, 3).map((category, idx) => (
              <Link key={category.id} href={`/${locale}/products/${category.slug}`} className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={
                    getStrapiMedia(category.cover_image?.url) ||
                    (idx === 0 ? "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=800" :
                      idx === 1 ? "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800" :
                        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800")
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center px-6">
                  <h3 className="text-white text-3xl font-serif mb-4">{category.name}</h3>
                  <span className="text-white text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Products
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Product Gallery Style */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-meta mb-4 block">{dict.home.featured.meta}</span>
              <h2 className="text-4xl font-serif">{dict.home.featured.title}</h2>
            </div>
            <Link href={`/${locale}/products`} className="text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
              {dict.home.featured.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/${locale}/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] bg-white mb-6 overflow-hidden flex items-center justify-center p-8">
                  <div className="w-full h-full relative">
                    <Image
                      src={getStrapiMedia(product.gallery?.[0]?.url) || "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold block mb-2">{product.collection}</span>
                <h3 className="text-lg font-serif text-primary group-hover:text-secondary transition-colors">{product.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section - Split Screen Style */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-meta mb-4 block">{dict.home.aero.meta}</span>
              <h2 className="heading-section mb-8 uppercase italic">{dict.home.aero.title}</h2>
              <p className="text-secondary text-lg font-light leading-relaxed mb-12">
                {dict.home.aero.description}
              </p>
              <Link href={`/${locale}/collections/aero-collection`} className="btn-premium border border-primary hover:bg-primary hover:text-white transition-all inline-block">
                {dict.home.aero.cta}
              </Link>
            </div>
            <div className="lg:col-span-7 relative aspect-[4/3] bg-neutral-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=1200"
                alt="Aero Collection Hero"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-12 italic">{dict.home.cta.title}</h2>
          <Link href={`/${locale}/contact`} className="btn-premium border border-white hover:bg-white hover:text-primary transition-all">
            {dict.home.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
