import type { Metadata } from 'next';
import { Inter, Playfair_Display, Kanit } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-kanit',
});

export const metadata: Metadata = {
  title: 'Starmark Work Space',
  description: 'เฟอร์นิเจอร์สำนักงานระดับพรีเมียม ออกแบบเพื่อองค์กรชั้นนำ',
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} ${kanit.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
