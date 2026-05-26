'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

interface Props {
  locale: string;
  t: {
    quoteTitle: string;
    quoteDesc: string;
    fullName: string;
    company: string;
    phone: string;
    email: string;
    interest: string;
    interestPlaceholder: string;
    details: string;
    detailsPlaceholder: string;
    sendQuote: string;
  };
}

export default function ContactForm({ locale, t }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setError(false);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSent(true);
      formRef.current.reset();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-3xl p-7 lg:p-10 shadow-sm">
      <h2 className="text-3xl font-light text-primary mb-3">{t.quoteTitle}</h2>
      <p className="text-secondary mb-8">{t.quoteDesc}</p>

      {sent ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-xl font-light text-primary mb-2">
            {locale === 'th' ? 'ส่งข้อมูลสำเร็จ!' : 'Request Sent!'}
          </h3>
          <p className="text-secondary text-sm">
            {locale === 'th'
              ? 'ทีมงานของเราจะติดต่อกลับภายใน 24 ชั่วโมง'
              : 'Our team will contact you within 24 hours.'}
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-8 text-xs uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
          >
            {locale === 'th' ? 'ส่งอีกครั้ง' : 'Send Another'}
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-primary font-medium mb-2">
                {t.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                name="from_name"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t.fullName}
              />
            </div>
            <div>
              <label className="block text-sm text-primary font-medium mb-2">{t.company}</label>
              <input
                name="company"
                type="text"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t.company}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-primary font-medium mb-2">
                {t.phone} <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="08X-XXX-XXXX"
              />
            </div>
            <div>
              <label className="block text-sm text-primary font-medium mb-2">{t.email}</label>
              <input
                name="from_email"
                type="email"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-primary font-medium mb-2">{t.interest}</label>
            <select
              name="interest"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              defaultValue=""
            >
              <option value="" disabled>{t.interestPlaceholder}</option>
              <option value="Workstation">Workstation</option>
              <option value={locale === 'th' ? 'โต๊ะผู้บริหาร' : 'Executive Desk'}>{locale === 'th' ? 'โต๊ะผู้บริหาร' : 'Executive Desk'}</option>
              <option value={locale === 'th' ? 'โต๊ะประชุม' : 'Meeting Table'}>{locale === 'th' ? 'โต๊ะประชุม' : 'Meeting Table'}</option>
              <option value={locale === 'th' ? 'ตู้เก็บเอกสาร' : 'Storage'}>{locale === 'th' ? 'ตู้เก็บเอกสาร' : 'Storage'}</option>
              <option value={locale === 'th' ? 'อื่นๆ' : 'Other'}>{locale === 'th' ? 'อื่นๆ' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-primary font-medium mb-2">{t.details}</label>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 bg-[#fcfcfd] text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder={t.detailsPlaceholder}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {locale === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'Something went wrong. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-60 text-white px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors"
          >
            {sending
              ? (locale === 'th' ? 'กำลังส่ง...' : 'Sending...')
              : t.sendQuote}
          </button>
        </form>
      )}
    </div>
  );
}
