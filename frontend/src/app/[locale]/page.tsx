import Image from 'next/image';
import Link from 'next/link';
import { getCategories, getProducts, getHomepage, getTrendings, getStrapiMedia } from '@/lib/api';
import { getDictionary } from '@/dictionaries/get-dictionary';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');

  const categories = await getCategories(locale);
  const products = await getProducts(undefined, locale);
  const homepage = await getHomepage(locale);
  const trendings = await getTrendings(locale);

  // Use explicitly selected products from Strapi, or fallback to the first 4 available products
  const featuredProducts = homepage.featured_products?.length
    ? homepage.featured_products
    : products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Dynamic Video Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-black">
        {homepage.hero?.hero_video ? (
          <video
            src={getStrapiMedia(homepage.hero.hero_video.url) || ''}
            poster={getStrapiMedia(homepage.hero.poster_image?.url) || ''}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={getStrapiMedia(homepage.hero?.poster_image?.url) || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000"}
            alt="Hero Background"
            fill
            className="object-cover opacity-80"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-white text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold animate-fade-in">
            {homepage.hero?.subtitle || dict.home.hero.collection}
          </span>
          <h1 className="text-white text-5xl md:text-8xl leading-tight tracking-tight font-semibold mb-8 max-w-4xl" style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}>
            {homepage.hero?.title || dict.home.hero.title}
          </h1>
          <Link href={`/${locale}/products`} className="btn-premium bg-white text-primary hover:bg-neutral-100">
            {dict.home.hero.cta}
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-section" dangerouslySetInnerHTML={{ __html: homepage.philosophy?.title || dict.home.philosophy.title }}>
            </h2>
            <p className="text-secondary text-lg leading-relaxed font-light mb-8">
              {(locale === 'en' ? null : homepage.philosophy?.description) || dict.home.philosophy.description}
            </p>
            <Link href={homepage.philosophy?.cta_link || `/${locale}/about`} className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">
              {homepage.philosophy?.cta_text || dict.home.philosophy.cta}
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
              <span className="text-meta mb-4 block">{homepage.featured?.meta || dict.home.featured.meta}</span>
              <h2 className="text-4xl font-serif">{homepage.featured?.title || dict.home.featured.title}</h2>
            </div>
            <Link href={homepage.featured?.view_all_link || `/${locale}/products`} className="text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
              {homepage.featured?.view_all_text || dict.home.featured.viewAll}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/${locale}/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] bg-white mb-6 overflow-hidden flex items-center justify-center p-8">
                  {(product.view_count ?? 0) >= 1 && (
                    <span className="absolute top-3 left-3 z-10 bg-primary text-white text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1">
                      Popular
                    </span>
                  )}
                  <div className="w-full h-full relative">
                    <Image
                      src={getStrapiMedia(product.gallery?.[0]?.url) || "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold block mb-2">{product.collection?.name ?? ''}</span>
                <h3 className="text-lg font-serif text-primary group-hover:text-secondary transition-colors mb-3">{product.name}</h3>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section - Split Screen Style (Trending Topics) */}
      {trendings.map((item, idx) => (
        <section key={item.id} className={`py-32 ${idx % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}>
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="text-meta mb-4 block">{dict.home.aero.meta}</span>
                <h2 className="heading-section mb-8 uppercase italic">{item.title}</h2>
                <p className="text-secondary text-lg font-light leading-relaxed mb-12">
                  {item.description}
                </p>
                <Link href={`/${locale}/products?trending=${item.slug}`} className="btn-premium border border-primary hover:bg-primary hover:text-white transition-all inline-block">
                  {dict.home.aero.cta}
                </Link>
              </div>
              <div className={`lg:col-span-7 relative aspect-[4/3] bg-neutral-100 overflow-hidden ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={getStrapiMedia(item.hero_image?.url) || "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=1200"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why Starmark — Commitment Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div className="text-center mb-24">
            <span className="text-lg md:text-2xl uppercase tracking-[0.25em] font-bold text-[#b48a2a] mb-6 block">
              {locale === 'th' ? 'ทำไมต้องเลือก STARMARK?' : 'WHY CHOOSE STARMARK?'}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-normal">
              Our Commitment to Excellence
            </h2>
          </div>

          {/* 4 Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 border border-neutral-200">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ),
                title: locale === 'th' ? 'คุณภาพระดับพรีเมียม' : 'Premium Quality',
                desc: locale === 'th' ? 'วัสดุและกระบวนการผลิตที่ผ่านการรับรองมาตรฐานสากล' : 'Materials and manufacturing certified to international standards.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
                title: locale === 'th' ? 'รับประกัน 3 ปี' : '3-Year Warranty',
                desc: locale === 'th' ? 'มั่นใจในคุณภาพด้วยการรับประกันสินค้าทุกชิ้น' : 'Every product backed by a full 3-year manufacturer warranty.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                title: locale === 'th' ? 'จัดส่งและติดตั้ง' : 'Delivery & Installation',
                desc: locale === 'th' ? 'บริการจัดส่งและติดตั้งโดยทีมงานมืออาชีพ' : 'Professional delivery and on-site installation nationwide.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
                title: locale === 'th' ? 'บริการหลังการขาย' : 'After-sales Support',
                desc: locale === 'th' ? 'ทีมงานพร้อมให้คำปรึกษาและดูแลหลังการขาย' : 'Dedicated support team available for consultation and care.',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center px-8 py-16 group hover:bg-neutral-50 transition-colors duration-300">
                <div className="w-20 h-20 flex items-center justify-center border border-[#c9a84c]/40 rounded-none mb-10 text-[#b48a2a] group-hover:border-[#b48a2a] transition-colors duration-300">
                  <div className="scale-150">{item.icon}</div>
                </div>
                <h3 className="text-base md:text-lg font-semibold tracking-wide text-primary mb-4">{item.title}</h3>
                <p className="text-secondary text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-24 border-t border-neutral-200 pt-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-3xl md:text-5xl text-primary font-normal mb-4 leading-tight">
                {locale === 'th' ? 'พร้อมยกระดับพื้นที่ทำงานของคุณ?' : 'Ready to elevate your workspace?'}
              </h3>
              <p className="text-secondary text-base md:text-lg font-light">
                {locale === 'th'
                  ? 'ติดต่อทีมงานของเราเพื่อรับคำปรึกษาและใบเสนอราคาฟรี'
                  : 'Contact our team for a free consultation and quotation.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 bg-primary text-white text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:bg-neutral-800 transition-colors duration-300"
              >
                {locale === 'th' ? 'ขอใบเสนอราคา' : 'Request a Quote'} &rarr;
              </Link>
              <a
                href="https://www.facebook.com/starmarkworkspace"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-neutral-300 text-primary text-xs font-semibold tracking-widest uppercase px-8 py-4 hover:border-primary transition-colors duration-300"
              >
                {locale === 'th' ? 'ติดต่อผ่าน Facebook' : 'Contact via Facebook'}
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
