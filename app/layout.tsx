import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Klyseria - Modern WordPress Blog',
    template: '%s | Klyseria',
  },
  description: 'A production-ready Next.js blog powered by WordPress headless CMS',
  keywords: ['blog', 'Next.js', 'WordPress', 'headless CMS', 'React'],
  authors: [{ name: 'Klyseria' }],
  creator: 'Klyseria',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://klyseria.com',
    title: 'Klyseria - Modern WordPress Blog',
    description: 'A production-ready Next.js blog powered by WordPress headless CMS',
    siteName: 'Klyseria',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klyseria - Modern WordPress Blog',
    description: 'A production-ready Next.js blog powered by WordPress headless CMS',
    creator: '@klyseria',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
