import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { getAbout, getStrapiMedia } from '@/lib/api';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');
  const about = await getAbout(locale);

  const highlights = [
    {
      value: '500+',
      titleTh: 'โครงการที่สำเร็จ',
      titleEn: 'Completed Projects',
    },
    {
      value: '15+',
      titleTh: 'ปีประสบการณ์',
      titleEn: 'Years of Experience',
    },
    {
      value: '50+',
      titleTh: 'คอลเลกชันสินค้า',
      titleEn: 'Product Collections',
    },
    {
      value: '1000+',
      titleTh: 'ลูกค้าที่ไว้วางใจ',
      titleEn: 'Satisfied Clients',
    },
  ];

  const teams = [
    {
      titleTh: 'ทีมออกแบบ',
      titleEn: 'Design Team',
      image: getStrapiMedia('/uploads/meeting_table_5aa5a510_4566299833.webp'),
      descriptionTh: 'นักออกแบบที่ดูแลทุกรายละเอียดตั้งแต่แนวคิด วัสดุ ไปจนถึงบรรยากาศของพื้นที่',
      descriptionEn: 'Design specialists who shape concepts, materials, and the atmosphere of each space.',
    },
    {
      titleTh: 'ทีมขายและที่ปรึกษา',
      titleEn: 'Sales & Consulting',
      image: getStrapiMedia('/uploads/Workstation_and_Chair_c824bce892.JPG'),
      descriptionTh: 'ให้คำแนะนำอย่างใกล้ชิด เพื่อช่วยเลือกสินค้าและวางแผนงานให้เหมาะกับทุกโปรเจกต์',
      descriptionEn: 'Guidance and product advice tailored to each project and requirement.',
    },
    {
      titleTh: 'ทีมติดตั้ง',
      titleEn: 'Installation Team',
      image: getStrapiMedia('/uploads/kerui_desk_fdad1b19_3bc9c442f7.webp'),
      descriptionTh: 'ดูแลการติดตั้งด้วยมาตรฐานที่พิถีพิถัน เพื่อให้ผลงานเรียบร้อยและพร้อมใช้งาน',
      descriptionEn: 'Careful installation with a quality-first process for a clean and ready finish.',
    },
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
            {/* {about?.hero?.subtitle || 'Over 21 Years of Excellence'} */}
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-serif italic mb-4">{about?.hero?.title || (locale === 'th' ? 'เกี่ยวกับ Starmark' : 'About Starmark')}</h1>
          <div className="w-24 h-px bg-white/50 mt-8" />
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif italic text-primary mb-6">{dict.about.title}</h2>
            <div className="w-16 h-px bg-primary/20 mx-auto mb-12" />
            <p className="text-secondary text-lg font-light leading-[1.9] mb-6">
              {about?.vision?.statement || (locale === 'th'
                ? ''
                : 'Starmark Work Space was founded on the belief that a well-designed work environment can inspire creativity, boost productivity, and reflect the professionalism of an organization. With over 15 years of experience in the office furniture industry, we have developed products that seamlessly blend aesthetics, durability, and functionality — crafted by a team of professional designers and engineers to serve leading organizations across the country.')}
            </p>
            {about?.story?.description_1 && (
              <p className="text-secondary text-lg font-light leading-[1.9] mb-6">
                {about.story.description_1}
              </p>
            )}
            {about?.story?.description_2 && (
              <p className="text-secondary text-lg font-light leading-[1.9]">
                {about.story.description_2}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vision & Philosophy */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-32 text-center">
            <h2 className="text-5xl font-serif italic text-primary uppercase tracking-tight">{about?.vision?.title || (locale === 'th' ? 'วิสัยทัศน์' : 'Vision')}</h2>
            <div className="w-16 h-px bg-primary/20 mx-auto mt-6" />
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

      {/* Highlights & Team */}
      <section className="bg-[#f7f4ee] py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20">
            {highlights.map((item) => (
              <div key={item.value} className="rounded-3xl bg-white/90 border border-[#eadfcd] shadow-sm px-6 py-10 text-center backdrop-blur-sm">
                <div className="text-4xl lg:text-5xl font-serif italic text-[#c89b2c] leading-none">{item.value}</div>
                <div className="mt-4 text-sm font-semibold text-primary">{locale === 'th' ? item.titleTh : item.titleEn}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-secondary">{locale === 'th' ? item.titleEn : item.titleTh}</div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-meta mb-4 block uppercase tracking-[0.35em] text-[#c89b2c]">{locale === 'th' ? 'ทีมงาน' : 'Our Team'}</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-primary mb-5">{locale === 'th' ? 'ทีมงานที่อยู่เบื้องหลังทุกผลงาน' : 'The people behind every project'}</h2>
            <p className="text-secondary text-lg leading-relaxed">
              {locale === 'th'
                ? 'ทีมงานของเราทำงานร่วมกันอย่างใกล้ชิด ตั้งแต่การออกแบบ การให้คำปรึกษา ไปจนถึงการติดตั้ง เพื่อให้ทุกพื้นที่ออกมาสวยงามและใช้งานได้จริง'
                : 'Our team works closely from design and consulting to installation, ensuring every space feels refined and practical.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {teams.map((team) => (
              <article key={team.titleEn} className="group rounded-[2rem] bg-white border border-[#efe5d7] shadow-[0_18px_50px_rgba(40,30,20,0.06)] p-6 lg:p-8">
                <div className="overflow-hidden rounded-[1.75rem] bg-[#f3eee4] aspect-[4/3] relative">
                  <Image
                    src={team.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200'}
                    alt={locale === 'th' ? team.titleTh : team.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-7 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f7f2e8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#9c7b2f]">
                    {locale === 'th' ? team.titleTh : team.titleEn}
                  </div>
                  <h3 className="mt-5 text-2xl font-serif italic text-primary">{locale === 'th' ? team.titleTh : team.titleEn}</h3>
                  <p className="mt-4 text-secondary leading-relaxed text-sm lg:text-base">
                    {locale === 'th' ? team.descriptionTh : team.descriptionEn}
                  </p>
                </div>
              </article>
            ))}
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
