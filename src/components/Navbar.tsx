'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Youtube, Twitter, Calendar } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Clock & Date WIB (Khusus di Menu Koleksi /katalog)
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (pathname !== '/katalog') return;

    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setCurrentDate(now.toLocaleDateString('id-ID', options));
      setCurrentTime(
        now
          .toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          .replace(/\./g, ':') + ' WIB'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/katalog', label: 'Koleksi' },
    { href: '/fasilitas', label: 'Fasilitas' },
    { href: '/kios', label: 'Kios IoT', highlight: true },
    { href: '/login', label: 'Login' },
    { href: '/admin', label: 'Dashboard Admin' },
  ];

  return (
    <>
      {/* Header Oranye Khas Bakorwil Persis Baris 296-348 welcome.blade.php */}
      <header className="sticky top-0 z-50 shadow-md bg-[#f9ad16] border-b-[3px] border-[#f9ad16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Sisi Kiri: Logo & Nama Instansi */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 group">
              <div className="relative w-10 h-10 sm:w-[45px] sm:h-[45px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-white">
                <Image
                  src="/images/kartu.png"
                  alt="Logo Jatim"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-white min-w-0">
                <h1 className="font-extrabold text-sm sm:text-lg leading-tight tracking-tight drop-shadow-sm truncate">
                  <span className="sm:hidden">Pustaka Nawasena</span>
                  <span className="hidden sm:inline">Pustaka Nawasena Bakorwil III Malang</span>
                </h1>
                <p className="text-[10px] text-white/90 font-medium sm:hidden truncate">
                  Bakorwil III Malang
                </p>
              </div>
            </Link>

            {/* Waktu Sistem Real-time (Tanpa Card, Clean) */}
            {pathname === '/katalog' && currentTime && (
              <div className="hidden md:flex items-center gap-2 text-white text-xs transition-opacity duration-300">
                <Calendar className="w-3.5 h-3.5 text-white/90 shrink-0" aria-hidden="true" />
                <div className="leading-tight flex items-center gap-2">
                  <span className="font-medium text-white/95">{currentDate}</span>
                  <span className="text-white/50">|</span>
                  <span className="tabular-nums font-bold text-white">{currentTime}</span>
                </div>
              </div>
            )}

            {/* Sisi Kanan: Ikon Media Sosial & Tombol Menu Mobile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Social Icons Bulat Modern (Tampil di tablet/desktop; di HP ada di dropdown agar header lega) */}
              <div className="hidden sm:flex items-center gap-2">
                {/* Twitter / X */}
                <a
                  href="https://x.com/Bakorwil3Malang?t=-6lq7bvn2jxresCEdaN1Qg&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter / X"
                  className="w-9 h-9 rounded-full bg-white text-zinc-800 hover:text-black hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm group"
                >
                  <Twitter className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* YouTube */}
                <a
                  href="http://www.youtube.com/@bakorwiliiimalang5279"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-9 h-9 rounded-full bg-white text-red-600 hover:text-red-700 hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm group"
                >
                  <Youtube className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/bakorwilmalang?igsh=MWdqOHN3eTBsM3hzaA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-full bg-white text-pink-600 hover:text-pink-700 hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </div>

              {/* Hamburger Button (Hanya untuk Mobile/Tablet) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/20 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Dropdown Menu Navigasi (Hanya Mobile/Tablet, Smooth Accordion) */}
        <div
          className={`lg:hidden grid transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-orange-400 bg-[#f9ad16] px-4 sm:px-6 lg:px-8 pt-3 pb-4 text-white">
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-end gap-2">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                        isActive
                          ? 'bg-white text-orange-600 shadow-sm'
                          : item.highlight
                          ? 'bg-orange-600 text-white font-bold hover:bg-orange-700'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Social Links di Mobile Dropdown */}
              <div className="sm:hidden flex items-center gap-3 pt-3 mt-3 border-t border-white/25">
                <a
                  href="https://x.com/Bakorwil3Malang?t=-6lq7bvn2jxresCEdaN1Qg&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter / X"
                  className="w-8 h-8 rounded-full bg-white text-zinc-800 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="http://www.youtube.com/@bakorwiliiimalang5279"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/bakorwilmalang?igsh=MWdqOHN3eTBsM3hzaA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-full bg-white text-pink-600 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
