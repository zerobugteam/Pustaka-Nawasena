'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Youtube, Calendar } from 'lucide-react';

// Icon X (Twitter) resmi dari pustaka Shadcn UI Icons
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
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
            
            {/* Sisi Kiri: Logo & Nama Instansi (Persis baris 299-307) */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-white">
                <Image
                  src="/images/kartu.png"
                  alt="Logo Jatim"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-white">
                <h1 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight drop-shadow-sm">
                  Pustaka Nawasena Bakorwil III Malang
                </h1>
                <p className="text-[11px] text-white/90 font-medium sm:hidden">
                  Pustaka Nawasena
                </p>
              </div>
            </Link>

            {/* Waktu Sistem Real-time (Hanya muncul saat berada di menu Koleksi /katalog) */}
            {pathname === '/katalog' && (
              <div className="hidden md:flex items-center gap-2.5 bg-black/15 hover:bg-black/25 text-white px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/25 text-xs shadow-inner transition-all">
                <Calendar className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <div className="leading-tight flex items-center gap-2">
                  <span className="font-medium text-white/95">{currentDate}</span>
                  <span className="text-white/40 font-bold">•</span>
                  <span className="font-mono font-bold text-amber-200 drop-shadow-2xs">{currentTime}</span>
                </div>
              </div>
            )}

            {/* Sisi Kanan: Ikon Media Sosial & Tombol Menu Mobile (Persis baris 309-346) */}
            <div className="flex items-center gap-3">
              
              {/* Social Icons Bulat Modern ala Shadcn UI */}
              <div className="flex items-center gap-2">
                {/* Twitter / X */}
                <a
                  href="https://x.com/Bakorwil3Malang?t=-6lq7bvn2jxresCEdaN1Qg&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter / X"
                  className="w-9 h-9 rounded-full bg-white text-zinc-800 hover:text-black hover:bg-zinc-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-sm group"
                >
                  <XTwitterIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
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

              {/* Hamburger Button untuk Tampilan Mobile (Persis baris 336-344) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu (Hanya muncul di HP saat hamburger diklik) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-orange-400 bg-[#f9ad16] px-4 pt-3 pb-4 space-y-2 text-white">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-white text-orange-600 shadow-sm'
                      : item.highlight
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
