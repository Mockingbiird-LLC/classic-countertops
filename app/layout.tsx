import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Classic Countertops LLC | Akron's Premier Countertop Fabrication",
    template: '%s | Classic Countertops LLC',
  },
  description:
    "Classic Countertops LLC — Akron, Ohio's premier countertop fabrication and installation company. Laminate, quartz, solid surface, granite countertops and repair services.",
  keywords: [
    'countertops Akron Ohio',
    'granite countertops',
    'quartz countertops',
    'laminate countertops',
    'countertop installation',
    'kitchen remodel Akron',
    'Classic Countertops LLC',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://classiccountertops.net',
    siteName: 'Classic Countertops LLC',
    title: "Classic Countertops LLC | Akron's Premier Countertop Fabrication",
    description:
      "Quality countertop fabrication and installation in Akron, Ohio. Laminate, quartz, granite, solid surface & repair services.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-[#FAFAF8] text-[#1A1A1A] antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
