'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Daftar rute standalone tanpa Navbar & Footer (Hanya Login, Register, dan Kios Mandiri)
  const isStandalone =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/kios';

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

