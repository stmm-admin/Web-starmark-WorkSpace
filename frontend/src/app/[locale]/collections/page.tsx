import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getStrapiMedia } from '@/lib/api';

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const collections = await getCollections(locale);

  const t = {
    th: {
      meta: 'ซีรีส์งานออกแบบ',
      title: 'คอลเลกชันของเรา',
      desc: 'สำรวจคอลเลกชันงานดีไซน์ที่คัดสรรมาอย่างดี ซึ่งรวบรวมรูปแบบและฟังก์ชันเข้าด้วยกันในภาษาแห่งสุนทรียภาพที่เป็นหนึ่งเดียว แต่ละคอลเลกชันแสดงถึงวิสัยทัศน์ที่เป็นเอกลักษณ์สำหรับห้องน้ำสมัยใหม่',
      explore: 'สำรวจซีรีส์'
    },
    en: {
      meta: 'Design Series',
      title: 'Our Collections',
      desc: 'Explore our curated design series, where form meets function in a unified aesthetic language. Each collection represents a unique vision for the modern bathroom.',
      explore: 'Explore Series'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-meta mb-6 block">{t.meta}</span>
          <h1 className="heading-section uppercase">{t.title}</h1>
          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">
            {t.desc}
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/${locale}/collections/${collection.slug}`} className="group block">
              <div className="relative aspect-[16/9] bg-neutral-50 mb-10 overflow-hidden transition-all duration-700 group-hover:bg-neutral-100">
                <Image
                  src={getStrapiMedia(collection.hero_image?.url) || "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=1200"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700" />
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-px bg-neutral-200 group-hover:w-12 transition-all duration-500" />
                  <span className="text-meta text-[10px] tracking-[0.2em]">{collection.slug.replace(/-/g, ' ').toUpperCase()}</span>
                </div>
                <h2 className="text-3xl font-serif text-primary group-hover:translate-x-2 transition-transform duration-500 italic">{collection.name}</h2>
                <p className="text-secondary font-light max-w-sm leading-relaxed">{collection.description}</p>
                
                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {t.explore}
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
