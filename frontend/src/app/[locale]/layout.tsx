import type { Metadata } from 'next';
import { Inter, Playfair_Display, Prompt, Kanit, Montserrat } from 'next/font/google';
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

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-prompt',
});

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-kanit-var',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'STARMARK WORK SPACE',
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
      <body className={`${inter.variable} ${playfair.variable} ${prompt.variable} ${kanit.variable} ${montserrat.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
