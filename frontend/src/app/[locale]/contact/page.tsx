import { getDictionary } from '@/dictionaries/get-dictionary';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');

  const t = {
    th: {
      title: 'ติดต่อเรา',
      desc: 'หากคุณมีคำถามเกี่ยวกับผลิตภัณฑ์ของเรา หรือต้องการความช่วยเหลือในการวางแผนห้องน้ำของคุณ ทีมผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษา',
      addressTitle: 'สำนักงานใหญ่',
      address: 'เลขที่ 2 ซอยลำลูกกา 53 ถนนลำลูกกา ตำบลลาดสวาย อำเภอลำลูกกา จังหวัดปทุมธานี 12150',
      showroomTitle: 'MOGEN Place Showroom',
      showroomDesc: 'สัมผัสประสบการณ์สินค้าจริงและรับคำปรึกษาจากดีไซน์เนอร์',
      phone: 'โทรศัพท์',
      email: 'อีเมล',
      hours: 'เวลาทำการ',
      hoursDesc: 'จันทร์ - เสาร์: 08:30 - 17:30 น.'
    },
    en: {
      title: 'Contact Us',
      desc: 'Whether you have a question about our products or need assistance planning your bathroom, our team of experts is here to help.',
      addressTitle: 'Headquarters',
      address: '2 Soi Lam Luk Ka 53, Lam Luk Ka Road, Lat Sawai, Lam Luk Ka, Pathum Thani 12150, Thailand',
      showroomTitle: 'MOGEN Place Showroom',
      showroomDesc: 'Experience our products in person and get expert design advice.',
      phone: 'Phone',
      email: 'Email',
      hours: 'Opening Hours',
      hoursDesc: 'Monday - Saturday: 08:30 - 17:30'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-4xl mb-24">
          <span className="text-meta mb-6 block uppercase tracking-widest text-primary">{dict.navigation.contact}</span>
          <h1 className="heading-section">{t.title}</h1>
          <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="border-t border-neutral-100 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">{t.addressTitle}</h3>
              <p className="text-secondary font-light leading-relaxed max-w-sm">
                {t.address}
              </p>
            </div>

            <div className="border-t border-neutral-100 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">{t.showroomTitle}</h3>
              <p className="text-secondary font-light leading-relaxed mb-4">
                {t.showroomDesc}
              </p>
              <p className="text-primary font-serif italic">MOGEN Place, Lam Luk Ka Khlong 5</p>
            </div>
          </div>

          <div className="space-y-16">
            <div className="border-t border-neutral-100 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">{t.phone} & {t.email}</h3>
              <div className="space-y-4">
                <p className="text-2xl font-serif text-primary italic">02-150-9708</p>
                <p className="text-lg text-secondary font-light">info@mogen.co.th</p>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-12">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">{t.hours}</h3>
              <p className="text-secondary font-light leading-relaxed">
                {t.hoursDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
