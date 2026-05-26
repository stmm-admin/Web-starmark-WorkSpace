import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getStrapiMedia } from '@/lib/api';
import ProductGallery from '@/components/product/ProductGallery';
import ProductTabs from '@/components/product/ProductTabs';
import ViewTracker from '@/components/product/ViewTracker';

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const t = {
    th: {
      back: 'กลับไปที่',
      products: 'สินค้า',
      series: 'ซีรีส์',
      specs: 'ข้อมูลทางเทคนิค',
      downloads: 'ดาวน์โหลด',
      pdf: 'ใบระบุคุณลักษณะ (PDF)',
      inquire: 'สอบถามข้อมูลเกี่ยวกับสินค้านี้',
      video: 'วิดีโอ'
    },
    en: {
      back: 'Back to',
      products: 'Products',
      series: 'Series',
      specs: 'Technical Specifications',
      downloads: 'Downloads',
      pdf: 'Specification Sheet (PDF)',
      inquire: 'Inquire about this object',
      video: 'Video'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <ViewTracker slug={product.slug} />
      <div className="container mx-auto px-6 lg:px-12 py-12 md:py-24">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link href={`/${locale}/products/${product.category?.slug ?? ''}`} className="text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center">
            <span className="mr-2">&larr;</span> {t.back} {product.category?.name ?? t.products}
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Main Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              productName={product.name}
              images={(product.gallery && product.gallery.length > 0 ? product.gallery : [null]).map((img: any, i: number) => ({
                url: getStrapiMedia(img?.url) || "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1200",
                alt: `${product.name} view ${i + 1}`,
              }))}
            />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-12">
              <span className="text-meta mb-4 block">
                {product.collection?.name ? `${product.collection.name} ${t.series}` : `MOGEN ${t.series}`}
              </span>
              <h1 className="heading-section !mb-6">{product.name}</h1>
              <p className="text-secondary text-lg font-light leading-relaxed">
                {product.full_description}
              </p>
            </div>

            {/* Tabs: Features / Specs / Variants */}
            <ProductTabs
              features={product.features}
              specifications={product.specifications}
              variants={product.variants}
              locale={locale}
            />

            {/* Video */}
            {product.video && (
              <div className="border-t border-neutral-100 pt-10 mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">{t.video}</h3>
                <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                  <video
                    src={getStrapiMedia(product.video?.url) || ''}
                    controls
                    playsInline
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="border-t border-neutral-100 pt-10 mt-auto">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">{t.downloads}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {product.downloads.map((file, idx) => (
                    <a
                      key={idx}
                      href={getStrapiMedia(file?.url) || '#'}
                      className="flex items-center justify-between p-4 border border-neutral-100 hover:border-primary transition-all group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-xs uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                        {file?.name || t.pdf}
                      </span>
                      <svg className="w-4 h-4 text-neutral-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-12">
              <Link href={`/${locale}/contact`} className="btn-premium w-full text-center">
                {t.inquire}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
