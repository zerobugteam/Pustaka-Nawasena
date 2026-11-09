import Link from 'next/link';
import { BookOpen, MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#ff9800] via-[#ffa726] to-[#ffb74d] text-white shadow-lg border-t-2 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-sm">
          
          {/* Kolom 1: Profil */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white shadow-inner">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-base tracking-tight text-white drop-shadow-sm">
                Pustaka Nawasena
              </h3>
            </div>
            <p className="text-orange-50 text-xs leading-relaxed text-justify">
              Perpustakaan khusus di bawah naungan Badan Koordinasi Wilayah Pemerintahan dan Pembangunan (Bakorwil) III Malang, Provinsi Jawa Timur. Menunjang kebutuhan informasi, riset kebijakan, dan pelestarian arsip kelembagaan.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 className="font-bold text-sm mb-3 border-b border-white/30 pb-1 inline-block">
              Layanan & Fitur
            </h4>
            <ul className="space-y-2 text-xs text-orange-50 font-medium">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Beranda Pustaka
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Katalog Buku & Eksemplar
                </Link>
              </li>
              <li>
                <Link href="/kios" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Kios Mandiri & Simulator IoT ESP32
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span>•</span> Dashboard Admin & Sirkulasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Cepat */}
          <div>
            <h4 className="font-bold text-sm mb-3 border-b border-white/30 pb-1 inline-block">
              Sekretariat & Lokasi
            </h4>
            <div className="space-y-2 text-xs text-orange-50">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-white mt-0.5" />
                <span>Jl. Simpang Ijen No. 2, Kota Malang, Jawa Timur</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-white" />
                <span>WA: 0851-3479-1603</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-white" />
                <span>arsiptubakorwil@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 shrink-0 text-white" />
                <span>bakorwilmalang.jatimprov.go.id</span>
              </p>
            </div>
          </div>

        </div>

        {/* Garis batas & Copyright */}
        <div className="border-t border-white/20 pt-6 text-center text-xs font-semibold text-white/90">
          <p>© 2025 Pustaka Nawasena Bakorwil III Malang. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
