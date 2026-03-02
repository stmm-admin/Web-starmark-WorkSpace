import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getStrapiMedia } from '@/lib/api';

interface CollectionPageProps {
  params: Promise<{ locale: string, slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { locale, slug } = await params;
  const collection = await getCollectionBySlug(slug, locale);

  if (!collection) {
    notFound();
  }

  const t = {
    th: {
      meta: 'คอลเลกชัน',
      concept: 'แนวคิดและปรัชญา',
      desc1: `คอลเลกชัน ${collection.name} เป็นตัวแทนของความมุ่งมั่นสู่ความเป็นเลิศในการออกแบบห้องน้ำ ทุกชิ้นในคอลเลกชันนี้ได้รับการสร้างสรรค์อย่างพิถีพิถันเพื่อให้แน่ใจว่ามีความสมดุลที่กลมกลืนระหว่างการแสดงออกทางศิลปะและการใช้งานจริง`,
      desc2: `ตั้งแต่การเลือกวัสดุระดับพรีเมียมไปจนถึงขั้นตอนการตกแต่งขั้นสุดท้าย ${collection.name} รวบรวมปรัชญาของ MOGEN เรื่อง 'Minimalist Luxury' ซึ่งทุกรายละเอียดล้วนมีจุดประสงค์ และทุกส่วนโค้งบอกเล่าเรื่องราวของความแม่นยำ`,
      elements: 'องค์ประกอบของซีรีส์',
      objects: 'วัตถุในคอลเลกชันนี้',
      items: 'รายการ',
      view: 'ดูรายละเอียด',
      empty: 'ชิ้นงานเพิ่มเติมจากคอลเลกชันนี้จะเปิดตัวในเร็วๆ นี้'
    },
    en: {
      meta: 'Collection',
      concept: 'Concept & Philosophy',
      desc1: `The ${collection.name} represents our commitment to excellence in bathroom design. Every piece in this collection has been meticulously crafted to ensure a harmonious balance between artistic expression and practical utility.`,
      desc2: `From the selection of premium materials to the final finishing touches, ${collection.name} embodies the MOGEN philosophy of 'Minimalist Luxury'—where every detail serves a purpose and every curve tells a story of precision.`,
      elements: 'Series Elements',
      objects: 'Objects in this Collection',
      items: 'ITEMS',
      view: 'View Details',
      empty: 'More pieces from this collection will be unveiled soon.'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={getStrapiMedia(collection.hero_image?.url) || "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=2000"}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] mb-6 animate-fade-in">{t.meta}</span>
          <h1 className="text-5xl md:text-7xl font-serif italic mb-8 animate-slide-up">{collection.name}</h1>
          <div className="w-24 h-px bg-white/50" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-8">{t.concept}</h2>
            <p className="text-secondary text-lg font-light leading-relaxed italic">
              "{collection.description}"
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-secondary text-lg font-light leading-relaxed mb-8">
              {t.desc1}
            </p>
            <p className="text-secondary text-lg font-light leading-relaxed">
              {t.desc2}
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-24">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-meta mb-4 block">{t.elements}</span>
              <h2 className="text-4xl font-serif italic text-primary">{t.objects}</h2>
            </div>
            <div className="text-meta text-[10px]">
              {collection.products?.length || 0} {t.items}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {collection.products?.map((product) => (
              <Link key={product.id} href={`/${locale}/product/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] bg-neutral-50 mb-8 overflow-hidden flex items-center justify-center p-12 transition-colors group-hover:bg-neutral-100">
                  <Image
                    src={getStrapiMedia(product.gallery?.[0]?.url) || "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600"}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-serif text-primary group-hover:text-secondary transition-colors mb-2 italic">{product.name}</h3>
                <p className="text-sm text-secondary font-light line-clamp-1 mb-4">{product.short_description}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1 group-hover:border-primary transition-all">
                  {t.view}
                </span>
              </Link>
            ))}
          </div>
          
          {(!collection.products || collection.products.length === 0) && (
            <div className="text-center py-24 bg-neutral-50 rounded-lg">
              <p className="text-secondary font-light italic">{t.empty}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
