import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/MainLayout';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://pustaka-nawasena.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pustaka Nawasena — Bakorwil III Malang',
    template: '%s | Pustaka Nawasena Bakorwil III Malang',
  },
  description:
    'Perpustakaan khusus dan sistem sirkulasi mandiri berbasis IoT di lingkungan Bakorwil III Malang, Provinsi Jawa Timur.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Pustaka Nawasena Bakorwil III Malang',
    title: 'Pustaka Nawasena — Perpustakaan Cerdas Bakorwil III Malang',
    description:
      'Akses katalog koleksi khusus, layanan riset kebijakan, dan kios peminjaman mandiri berbasis IoT di Bakorwil III Malang.',
    images: [
      {
        url: '/images/og-image.jpg',
        alt: 'Pustaka Nawasena Bakorwil III Malang',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pustaka Nawasena — Perpustakaan Cerdas Bakorwil III Malang',
    description:
      'Akses katalog koleksi khusus, layanan riset kebijakan, dan kios peminjaman mandiri berbasis IoT di Bakorwil III Malang.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased font-sans selection:bg-[#ff9800] selection:text-white print:min-h-0 print:block">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
