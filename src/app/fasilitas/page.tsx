'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Building,
  Cpu,
  Printer,
  Wifi,
  ShieldCheck,
  Video,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function FasilitasPage() {
  const rooms = [
    {
      title: 'Pojok Baca Mandiri',
      desc: 'Tempat membaca yang nyaman dengan penataan meja kursi ergonomis, pencahayaan sejuk di mata, serta suasana tenang agar pemustaka dapat lebih fokus membaca dan menelaah literatur.',
      image: '/images/pojokbaca.jpeg',
      badge: 'Area Tenang & Nyaman',
    },
    {
      title: 'Ruang Kerja & Diskusi Bersama',
      desc: 'Ruangan khusus untuk berkumpul kelompok yang dilengkapi meja dan kursi rapat. Sangat ideal untuk kerja kelompok, menyusun rencana kebijakan, atau diskusi kolaboratif lintas bidang.',
      image: '/images/RUANGDISKUSI.jpeg',
      badge: 'Kolaborasi & Diskusi',
    },
  ];

  const equipments = [
    {
      title: 'Mesin Cetak & Scanner',
      desc: 'Disediakan untuk memudahkan pemustaka mencetak dokumen dinas penting atau mengubah berkas fisik menjadi format dokumen digital.',
      image: '/images/Printer.jpg',
      icon: Printer,
      tag: 'Cetak & Pindai',
    },
    {
      title: 'Proyektor Layar Presentasi',
      desc: 'Alat bantu di ruang diskusi untuk menayangkan bahan presentasi, video panduan, atau saat pelaksanaan evaluasi program kerja.',
      image: '/images/proyektor.jpg',
      icon: Video,
      tag: 'Layar Presentasi',
    },
    {
      title: 'Koneksi Wi-Fi Berkecepatan Tinggi',
      desc: 'Akses internet tanpa kabel yang cepat di seluruh area perpustakaan untuk mempermudah pencarian referensi daring dan jurnal penelitian.',
      image: '/images/wifi.jpg',
      icon: Wifi,
      tag: 'Internet Cepat',
    },
    {
      title: 'Sistem Keamanan CCTV 24 Jam',
      desc: 'Kamera pengawas aktif 24 jam untuk menjamin keamanan barang bawaan pengunjung dan menjaga ketertiban area perpustakaan.',
      image: '/images/cctv.jpg',
      icon: ShieldCheck,
      tag: 'Pengawasan Keamanan',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F5] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ======================================================== */}
        {/* SUB-HEADER RESMI BAKORWIL III MALANG                     */}
        {/* ======================================================== */}
        <div className="bg-white border-t-4 border-orange-500 border-x border-b border-orange-100 rounded-2xl p-6 sm:p-8 shadow-sm text-center" data-aos="fade-up">
          <nav className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-orange-600">Sarana & Prasarana</span>
          </nav>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ff6f00] tracking-tight">
            Fasilitas & Perlengkapan Pustaka
          </h1>
          <div className="w-20 h-1 bg-[#ff9800] mx-auto my-3 rounded-full" />
          
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Berbagai sarana ruangan dan perlengkapan modern yang disiapkan khusus untuk mendukung kenyamanan, kelancaran diskusi, serta kemudahan Anda saat belajar atau riset data di <strong>Pustaka Nawasena Bakorwil III Malang</strong>.
          </p>
        </div>

        {/* ======================================================== */}
        {/* BAGIAN I: FASILITAS RUANGAN UTAMA                        */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-l-4 border-orange-500 border-t border-r border-b border-orange-100 space-y-6" data-aos="fade-up">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
              <Building className="w-5 h-5 text-orange-500" />
              <span>Fasilitas Ruangan Utama</span>
            </h2>
            <p className="text-xs text-slate-500">
              Pilihan tempat membaca yang tenang atau ruang berkumpul yang representatif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {rooms.map((room, idx) => (
              <div
                key={room.title}
                data-aos="zoom-in"
                data-aos-delay={idx * 150}
                className="bg-orange-50/20 border border-orange-100 rounded-xl overflow-hidden hover:shadow-md hover:border-orange-300 transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-full">
                    {room.badge}
                  </span>
                </div>
                <div className="p-5 space-y-2 text-start">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-orange-600 transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                    {room.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* BAGIAN II: PERALATAN & TEKNOLOGI PENDUKUNG               */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-l-4 border-orange-500 border-t border-r border-b border-orange-100 space-y-6" data-aos="fade-up">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
              <Cpu className="w-5 h-5 text-orange-500" />
              <span>Perlengkapan & Alat Pendukung</span>
            </h2>
            <p className="text-xs text-slate-500">
              Perangkat teknologi gratis yang siap digunakan untuk mempercepat urusan tugas kedinasan dan riset
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {equipments.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-orange-50/20 border border-orange-100 rounded-xl p-4 text-center hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-2.5 py-0.5 rounded-full">
                      <Icon className="w-3 h-3" />
                      <span>{item.tag}</span>
                    </span>

                    <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* BANNER KIOS MANDIRI IOT NAWASENA                        */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Fasilitas Otomasi Terdepan</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Kios Mandiri Berbasis IoT ESP32
            </h3>
            <p className="text-orange-100 text-xs sm:text-sm max-w-xl">
              Fasilitas mandiri mandiri peminjaman & pengembalian buku dengan kartu RFID, barcode scanner, dan panduan suara bilingual/Indonesia.
            </p>
          </div>
          <Link
            href="/kios"
            className="px-6 py-3.5 bg-white text-orange-600 hover:bg-orange-50 font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 group"
          >
            <Cpu className="w-4 h-4 text-orange-600" />
            <span>Coba Kios Mandiri</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </div>
  );
}

