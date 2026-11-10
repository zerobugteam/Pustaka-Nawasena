import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/MainLayout';

export const metadata: Metadata = {
  title: 'Pustaka Nawasena Bakorwil III Malang',
  description: 'Sistem Perpustakaan Cerdas Berbasis IoT dan Sirkulasi Mandiri di lingkungan Bakorwil III Malang, Provinsi Jawa Timur.',
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
