import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { getAbout, getStrapiMedia } from '@/lib/api';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');
  const about = await getAbout(locale);

  const timeline = about?.timeline?.length ? about.timeline : [
    {
      year: '2004',
      title: locale === 'th' ? 'จุดเริ่มต้นของ MOGEN' : 'The Beginning of MOGEN',
      description: locale === 'th' ? 'เปิดตัวผลิตภัณฑ์สุขภัณฑ์ภายใต้ชื่อ MOGEN วางเป้าหมายยกระดับคุณภาพชีวิตผู้คน ด้วยการออกแบบที่ผสมผสานฟังก์ชัน ความสวยงาม และความปลอดภัย' : 'Launched sanitaryware products under the name MOGEN with a goal to enhance quality of life through design that blends function, beauty, and safety.'
    },
    {
      year: '2005–2010',
      title: locale === 'th' ? 'การเติบโตและการสร้างรากฐาน' : 'Growth and Foundation',
      description: locale === 'th' ? 'ขยายสายการผลิตและเพิ่มกำลังการผลิต เปิดอาคารสำนักงานใหญ่ พร้อมศูนย์บริการหลังการขาย เพื่อดูแลลูกค้าอย่างครบวงจร เริ่มขยายสู่โครงการอสังหาฯ ขนาดใหญ่' : 'Expanded production lines and increased capacity. Opened headquarters with a full after-sales service center. Began expansion into large real estate projects.'
    },
    {
      year: '2011–2015',
      title: locale === 'th' ? 'สู่เวทีการออกแบบและมาตรฐานระดับสากล' : 'International Design & Standards',
      description: locale === 'th' ? 'เปิด Showroom แห่งแรกที่อาคาร STWO เข้าร่วมงานสถาปนิก (Architect Expo) และขยายเครือข่ายตัวแทนจำหน่ายทั่วประเทศ พร้อมรับการรับรองมาตรฐานสากล' : 'Opened the first showroom at STWO building. Participated in Architect Expo and expanded the dealer network nationwide while receiving international quality certifications.'
    },
    {
      year: '2016–2020',
      title: locale === 'th' ? 'นวัตกรรมและการเปลี่ยนแปลงครั้งสำคัญ' : 'Innovation & Transformation',
      description: locale === 'th' ? 'เปิดตัวสินค้าประหยัดน้ำและพลังงาน และสร้างความโดดเด่นด้วยอ่างล้างหน้าพร้อมตู้เฟอร์นิเจอร์กันน้ำ 100% รายแรกในประเทศไทย' : 'Launched water and energy-saving products. Stood out with 100% waterproof bathroom furniture cabinets, a first in Thailand.'
    },
    {
      year: '2021–ปัจจุบัน',
      title: locale === 'th' ? 'ก้าวสู่ยุคดิจิทัลและการขยายตลาด' : 'Digital Era & Market Expansion',
      description: locale === 'th' ? 'ครบรอบ 21 ปี MOGEN ร่วมมือกับบริษัท ศรีไทยซุปเปอร์แวร์ พัฒนาผลิตภัณฑ์ใหม่ เปิดตัวเว็บไซต์ E-Commerce และ Showroom MOGEN Place ที่ลำลูกกา คลอง 5' : 'Celebrated MOGEN’s 21st anniversary. Partnered with Srithai Superware to develop new products. Launched E-Commerce website and MOGEN Place showroom at Lam Luk Ka Khlong 5.'
    }
  ];

  const philosophies = about?.philosophies?.length ?
    about.philosophies.map(p => ({
      title: p.label,
      thaiTitle: p.title,
      description: p.description
    }))
    : [
      {
        title: 'Design',
        thaiTitle: dict.about.philosophy.title,
        description: dict.about.philosophy.desc1
      },
      {
        title: 'Sustainability',
        thaiTitle: dict.about.values.v3.title,
        description: dict.about.values.v3.desc
      },
      {
        title: 'Customer',
        thaiTitle: dict.about.values.v2.title,
        description: dict.about.values.v2.desc
      },
      {
        title: 'Innovation',
        thaiTitle: dict.about.values.v1.title,
        description: dict.about.values.v1.desc
      }
    ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {about?.hero?.hero_video ? (
          <video
            src={getStrapiMedia(about.hero.hero_video.url) || ''}
            poster={getStrapiMedia(about.hero.poster_image?.url) || ''}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={getStrapiMedia(about?.hero?.poster_image?.url) || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"}
            alt="MOGEN Design Studio"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-white text-[10px] uppercase tracking-[0.5em] mb-6 animate-fade-in font-bold">
            {about?.hero?.subtitle || 'Over 21 Years of Excellence'}
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-serif italic mb-4">{about?.hero?.title || (locale === 'th' ? 'เกี่ยวกับ MOGEN' : 'About MOGEN')}</h1>
          <div className="w-24 h-px bg-white/50 mt-8" />
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-meta mb-6 block uppercase tracking-widest text-primary">{about?.story?.meta || dict.about.meta}</span>
            <h2 className="text-4xl font-serif italic text-primary mb-12">{about?.story?.title || dict.about.title}</h2>
            <p className="text-secondary text-lg font-light leading-relaxed mb-8">
              {about?.story?.description_1 || (locale === 'th'
                ? 'MOGEN เป็นแบรนด์สุขภัณฑ์และเฟอร์นิเจอร์ห้องน้ำชั้นนำของไทย ก่อตั้งขึ้นด้วยความมุ่งมั่นในการยกระดับคุณภาพชีวิตของผู้คน ผ่านการออกแบบที่มีเอกลักษณ์ ผสานนวัตกรรมและความเป็นมิตรต่อสิ่งแวดล้อม ผลิตภัณฑ์ของ MOGEN ได้รับการพัฒนาเพื่อตอบโจทย์ทั้งด้านฟังก์ชัน ความสวยงาม และมาตรฐานความปลอดภัยระดับสากล'
                : 'MOGEN is a leading Thai sanitaryware and bathroom furniture brand. Founded with a commitment to enhancing quality of life through unique design, innovation, and environmental friendliness. MOGEN products are developed to meet international standards for function, beauty, and safety.')}
            </p>
            <p className="text-secondary text-lg font-light leading-relaxed">
              {about?.story?.description_2 || (locale === 'th'
                ? 'ด้วยประสบการณ์กว่า 21 ปี MOGEN ไม่เพียงแต่สร้างสรรค์สินค้า แต่ยังเป็นพันธมิตรที่เชื่อถือได้ของทั้งลูกค้ารายบุคคล ดีเวลลอปเปอร์ สถาปนิก และผู้รับเหมามืออาชีพ'
                : 'With over 21 years of experience, MOGEN not only creates products but is also a trusted partner for individual customers, developers, architects, and professional contractors.')}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Philosophy */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
            <div className="lg:col-span-5">
              <span className="text-meta mb-4 block">{about?.vision?.meta || 'Vision'}</span>
              <h2 className="text-5xl font-serif italic text-primary mb-8 uppercase tracking-tight">{about?.vision?.title || (locale === 'th' ? 'วิสัยทัศน์' : 'Vision')}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-2xl font-serif text-primary leading-relaxed italic border-l-4 border-primary/20 pl-8">
                {about?.vision?.statement || (locale === 'th'
                  ? '“มุ่งเป็นผู้นำด้านผลิตภัณฑ์นวัตกรรมและเป็นมิตรต่อสิ่งแวดล้อม พร้อมมอบการบริการที่ดีที่สุด ครอบคลุมทุกโซลูชันสำหรับคนทุกเจเนอเรชัน”'
                  : '“To be a leader in innovative and eco-friendly products, providing the best service and comprehensive solutions for every generation.”')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {philosophies.map((phil, idx) => (
              <div key={idx} className="bg-white p-12 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-primary font-serif text-3xl mb-6 block italic">0{idx + 1}</span>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4">{phil.title}</h3>
                <h4 className="text-lg font-serif mb-4 text-primary italic">{phil.thaiTitle}</h4>
                <p className="text-secondary font-light text-sm leading-relaxed">{phil.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <span className="text-meta mb-4 block uppercase tracking-widest text-primary">Our Journey</span>
            <h2 className="text-4xl font-serif italic text-primary">{about?.timeline ? (locale === 'th' ? 'เส้นทางแห่งความสำเร็จ' : 'Our Journey') : (locale === 'th' ? 'เส้นทางแห่งความสำเร็จ' : 'Our Journey')}</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-neutral-200 hidden lg:block" />

            <div className="space-y-24">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex flex-col lg:flex-row items-center ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  <div className="lg:w-1/2 w-full px-12 text-center lg:text-right">
                    <div className={`${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <span className="text-5xl font-serif italic text-primary/20 mb-4 block">{item.year}</span>
                      <h3 className="text-2xl font-serif text-primary mb-4 italic">{item.title}</h3>
                      <p className="text-secondary font-light leading-relaxed max-w-md mx-auto lg:mx-0 inline-block">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 my-8 lg:my-0">
                    <div className="w-3 h-3 bg-primary rounded-full z-10" />
                    <div className="absolute w-8 h-8 border border-primary/20 rounded-full animate-ping" />
                  </div>
                  <div className="lg:w-1/2 w-full px-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <span className="text-[10px] uppercase tracking-[0.5em] mb-8 block opacity-70">{about?.cta?.subtitle || 'Experience MOGEN'}</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 italic">{about?.cta?.title || (locale === 'th' ? 'ร่วมสัมผัสประสบการณ์แห่งดีไซน์' : 'Experience Our Design')}</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href={about?.cta?.button_link || `/${locale}/products`} className="btn-premium border border-white hover:bg-white hover:text-primary transition-all">
              {about?.cta?.button_text || (locale === 'th' ? 'เลือกชมสินค้า' : 'View Products')}
            </Link>
            <Link href={about?.cta?.button2_link || `/${locale}/contact`} className="btn-premium bg-white text-primary hover:bg-neutral-100 transition-all">
              {about?.cta?.button2_text || (locale === 'th' ? 'ติดต่อเรา' : 'Contact Us')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
