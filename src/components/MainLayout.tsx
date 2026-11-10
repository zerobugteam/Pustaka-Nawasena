'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Daftar rute yang TIDAK menampilkan Header dan Footer (Persis sesuai screenshot asli docs/ss-bakorwil)
  // 02_halaman_login.png        -> /login
  // 03_halaman_register.png     -> /register
  // 04_fasilitas_peralatan.png  -> /fasilitas
  // 05_kios_scan_barcode.png    -> /kios
  // 06_kios_scan_rfid.png       -> /kios
  // Dashboard Admin             -> /admin
  const isStandalone =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/kios' ||
    pathname === '/fasilitas' ||
    pathname.startsWith('/admin');

  if (isStandalone) {
    return <main className="min-h-screen w-full print:hidden">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

