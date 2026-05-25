import { getDictionary } from '@/dictionaries/get-dictionary';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  weight: '300',
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'th');

  const t = {
    th: {
      title: 'ติดต่อเรา',
      subtitle: 'พร้อมให้คำปรึกษาและออกแบบพื้นที่ทำงานที่เหมาะสมสำหรับองค์กรของคุณ',
      contactMeta: 'ข้อมูลติดต่อ',
      getInTouch: 'ติดต่อเรา',
      quoteTitle: 'ขอใบเสนอราคา',
      quoteDesc: 'กรอกข้อมูลด้านล่าง ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมง',
      addressTitle: 'ที่อยู่',
      address: 'กรุงเทพมหานคร ประเทศไทย',
      showroomTitle: 'โชว์รูม',
      showroomDesc: 'รับคำแนะนำจากผู้เชี่ยวชาญและชมสินค้าได้ที่โชว์รูม',
      phone: 'โทรศัพท์',
      email: 'อีเมล',
      hours: 'เวลาทำการ',
      hoursDesc: 'จันทร์-ศุกร์: 8:30-17:30 | เสาร์: 9:00-13:00',
      followUs: 'ติดตามเรา',
      facebook: 'Facebook',
      fullName: 'ชื่อ-นามสกุล',
      company: 'บริษัท/องค์กร',
      phonePlaceholder: '08X-XXX-XXXX',
      emailPlaceholder: 'email@company.com',
      interest: 'สินค้าที่สนใจ',
      interestPlaceholder: 'เลือกกลุ่มสินค้า',
      details: 'รายละเอียดเพิ่มเติม',
      detailsPlaceholder: 'ระบุขนาดพื้นที่ จำนวนที่นั่ง หรือความต้องการพิเศษ...',
      sendQuote: 'ส่งใบเสนอราคา',
      required: 'จำเป็น'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are ready to help you design and plan the ideal workspace for your organization.',
      contactMeta: 'Contact Info',
      getInTouch: 'Get in Touch',
      quoteTitle: 'Request a Quotation',
      quoteDesc: 'Fill out the form and our team will contact you within 24 hours.',
      addressTitle: 'Address',
      address: 'Bangkok, Thailand',
      showroomTitle: 'Showroom',
      showroomDesc: 'Visit our showroom for product consultation and inspiration.',
      phone: 'Phone',
      email: 'Email',
      hours: 'Opening Hours',
      hoursDesc: 'Mon-Fri: 8:30-17:30 | Sat: 9:00-13:00',
      followUs: 'Follow Us',
      facebook: 'Facebook',
      fullName: 'Full Name',
      company: 'Company',
      phonePlaceholder: '08X-XXX-XXXX',
      emailPlaceholder: 'email@company.com',
      interest: 'Product Interest',
      interestPlaceholder: 'Select a product group',
      details: 'Additional Details',
      detailsPlaceholder: 'Tell us about your workspace size, seat quantity, or special requirements...',
      sendQuote: 'Submit Request',
      required: 'required'
    }
  }[locale as 'en' | 'th'];

  return (
    <div className={`${kanit.className} bg-[#f8f9fb] min-h-screen`}>
      <section className="bg-primary text-white py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.34em] text-white/70 block mb-4">{dict.navigation.contact}</span>
          <h1 className="text-4xl md:text-5xl font-light mb-4">{t.title}</h1>
          <p className="text-white/80 max-w-3xl text-base lg:text-lg">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <aside className="lg:col-span-4 bg-white border border-neutral-200 rounded-3xl p-7 lg:p-8 shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#b38f3f] block mb-4">{t.contactMeta}</span>
              <h2 className="text-3xl font-light text-primary mb-8">{t.getInTouch}</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-2">{t.phone}</p>
                  <p className="text-primary text-xl font-medium">02-123-4567</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-2">{t.email}</p>
                  <p className="text-primary text-lg">info@starmarkworkspace.com</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-2">{t.addressTitle}</p>
                  <p className="text-secondary leading-relaxed">{t.address}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-2">{t.showroomTitle}</p>
                  <p className="text-secondary leading-relaxed">{t.showroomDesc}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-2">{t.hours}</p>
                  <p className="text-secondary leading-relaxed">{t.hoursDesc}</p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-200">
                <p className="text-[11px] uppercase tracking-[0.22em] text-secondary mb-4">{t.followUs}</p>
                <a
                  href="https://www.facebook.com/starmarkworkspace"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white px-5 py-3 text-sm font-medium transition-colors"
                >
                  {t.facebook}
                </a>
              </div>
            </aside>

            <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-7 lg:p-10 shadow-sm">
              <h2 className="text-3xl font-light text-primary mb-3">{t.quoteTitle}</h2>
              <p className="text-secondary mb-8">{t.quoteDesc}</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm text-primary font-medium mb-2">
                      {t.fullName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t.fullName}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm text-primary font-medium mb-2">{t.company}</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t.company}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-primary font-medium mb-2">
                      {t.phone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-primary font-medium mb-2">{t.email}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm text-primary font-medium mb-2">{t.interest}</label>
                  <select
                    id="interest"
                    name="interest"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue=""
                  >
                    <option value="" disabled>{t.interestPlaceholder}</option>
                    <option value="workstation">{locale === 'th' ? 'Workstation' : 'Workstation'}</option>
                    <option value="executive-desk">{locale === 'th' ? 'โต๊ะผู้บริหาร' : 'Executive Desk'}</option>
                    <option value="meeting-table">{locale === 'th' ? 'โต๊ะประชุม' : 'Meeting Table'}</option>
                    <option value="storage">{locale === 'th' ? 'ตู้เก็บเอกสาร' : 'Storage'}</option>
                    <option value="other">{locale === 'th' ? 'อื่นๆ' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm text-primary font-medium mb-2">{t.details}</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder={t.detailsPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
                >
                  {t.sendQuote}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
