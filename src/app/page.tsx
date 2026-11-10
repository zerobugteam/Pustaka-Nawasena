'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  BookOpen,
  Cpu,
  LogIn,
  User,
  Settings,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Archive,
  FileText,
  Users,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_BOOKS } from '@/data/mockData';

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/katalog?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/katalog');
    }
  };

  const totalTitles = new Set(INITIAL_BOOKS.map((b) => b.title)).size;
  const totalCopies = INITIAL_BOOKS.length;

  return (
    <div className="min-h-screen text-[#333333]">
      
      {/* ========================================================= */}
      {/* HERO SECTION PERSIS SEPERTI DI welcome.blade.php (FULL)   */}
      {/* ========================================================= */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-white overflow-hidden py-12 md:py-16 px-4">
        {/* Background Utama Asli Bakorwil Full Layar */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/utama.jpg"
            alt="Perpustakaan Bakorwil III Malang"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Hero Overlay rgba(0, 0, 0, 0.55) persis baris 53 welcome.blade.php */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 my-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-lg">
            Selamat Datang di Pustaka Nawasena!
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-bold text-white/95 max-w-2xl mx-auto drop-shadow">
            Akses koleksi khusus untuk mendukung penelitian dan kebijakan Anda.
          </p>

          {/* Kotak Pencarian Rounded-Pill Besar */}
          <div className="pt-4 max-w-2xl mx-auto w-full px-2 sm:px-0" data-aos="fade-up">
            <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl rounded-full overflow-hidden bg-white/95 p-1 border border-slate-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari Koleksi, Judul, Penulis, atau Subjek..."
                className="w-full pl-6 pr-28 py-3.5 text-slate-800 text-sm md:text-base font-medium focus:outline-none placeholder-slate-400 bg-transparent rounded-full"
              />
              <button
                type="submit"
                className="absolute right-1 px-6 py-2.5 bg-[#ff9800] hover:bg-[#e68900] active:scale-95 text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cari</span>
              </button>
            </form>
          </div>

          {/* Menu Desktop Navigasi di Bawah Kotak Cari */}
          <div className="hidden lg:flex items-center justify-center gap-6 pt-5 flex-wrap" data-aos="fade-up" data-aos-delay="100">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <LogIn className="w-4 h-4 text-[#ff9800]" />
              <span>Login</span>
            </Link>
            <a
              href="#profil"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <User className="w-4 h-4 text-[#ff9800]" />
              <span>Profil</span>
            </a>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <BookOpen className="w-4 h-4 text-[#ff9800]" />
              <span>Koleksi</span>
            </Link>
            <a
              href="#prosedur"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <Settings className="w-4 h-4 text-[#ff9800]" />
              <span>Layanan</span>
            </a>
            <Link
              href="/fasilitas"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <Building className="w-4 h-4 text-[#ff9800]" />
              <span>Fasilitas</span>
            </Link>
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 hover:-translate-y-0.5 transition-all drop-shadow"
            >
              <MapPin className="w-4 h-4 text-[#ff9800]" />
              <span>Kontak</span>
            </a>
            <Link
              href="/kios"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff9800] hover:bg-[#e68900] text-white font-bold text-xs transition-all shadow-md"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Kios IoT</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION-BOX CONTAINER PERSIS welcome.blade.php            */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* ========================================== */}
        {/* SECTION 1: PUSTAKA NAWASENA BAKORWIL       */}
        {/* ========================================== */}
        <section id="profil" className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            PUSTAKA NAWASENA BAKORWIL III MALANG
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-4">
            {/* Foto Kiri (col-md-4) */}
            <div className="md:col-span-4 flex justify-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden border-3 border-warning shadow-md border-2 border-amber-400">
                <Image
                  src="/images/karasteristik (2).jpeg"
                  alt="Pustaka Nawasena Bakorwil III Malang"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Teks Kanan (col-md-8) */}
            <div className="md:col-span-8 space-y-4 text-start" data-aos="fade-left" data-aos-delay="200">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-500 leading-snug">
                Explore the World of Knowledge at<br />
                <span className="text-slate-600">Pustaka Nawasena Bakorwil III Malang</span>
              </h3>

              <blockquote className="border-l-4 border-[#ff9800] pl-4 py-1 text-slate-600 italic text-sm sm:text-base bg-orange-50/40 rounded-r-lg">
                &ldquo;A library is a treasury of knowledge and the dwelling of the wise.&rdquo;<br />
                <small className="font-semibold text-xs text-slate-500">- Ibnu Sina (Avicena) -</small><br />
                <span className="text-xs not-italic text-slate-600 font-normal">
                  Perpustakaan adalah gudang pengetahuan dan tempat tinggal orang-orang bijaksana.
                </span>
              </blockquote>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
                <strong>Pustaka Nawasena Bakorwil III Malang</strong> merupakan perpustakaan khusus yang berada di bawah Bakorwil III Malang — instansi Pemerintah Provinsi Jawa Timur — dengan koleksi dan layanan informasi yang ditujukan untuk memenuhi kebutuhan informasi di lingkungan internal. Berbeda dengan perpustakaan umum atau akademik, perpustakaan khusus Bakorwil III Malang memiliki sasaran pengguna yang terbatas dan fokus pada bidang tertentu sesuai dengan tugas pokok dan fungsi.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* BANNER HIGHLIGHT: KIOS SMART IOT          */}
        {/* ========================================== */}
        <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-amber-300" data-aos="fade-up">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Inovasi Otomasi Sirkulasi Mandiri</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Uji Coba Kios Mandiri &amp; Simulator Hardware IoT
            </h3>
            <p className="text-orange-100 text-xs sm:text-sm max-w-xl">
              Dilengkapi simulator pembaca kartu RFID (MFRC522), barcode scanner, LCD 16x2 I2C, panduan suara Bahasa Indonesia (DFPlayer), dan cetak struk digital.
            </p>
          </div>
          <Link
            href="/kios"
            className="px-6 py-3.5 bg-white text-orange-600 hover:bg-orange-50 font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 group"
          >
            <Cpu className="w-4 h-4 text-orange-600" />
            <span>Buka Simulator Kios</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* ========================================== */}
        {/* SECTION 2: KARAKTERISTIK                   */}
        {/* ========================================== */}
        <section className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            KARAKTERISTIK
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-4">
            {/* Teks Kiri (col-md-8) */}
            <div className="md:col-span-8 space-y-4 text-start" data-aos="fade-right" data-aos-delay="200">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
                Koleksi yang terfokus, pengguna yang terbatas (umumnya hanya pegawai atau peneliti internal), serta layanan yang bersifat mendalam dan berspesialisasi. Koleksi yang dimiliki berupa dokumen-dokumen kebijakan, regulasi, laporan kegiatan, laporan magang mahasiswa/sekolah, arsip internal, hingga majalah referensi dari berbagai instansi.
              </p>

              <p className="text-amber-500 font-semibold italic text-base sm:text-lg leading-relaxed pt-2">
                &ldquo;Let&apos;s grow together through reading and sharing knowledge. The more we read, the more we connect — let&apos;s make our library alive with curiosity and collaboration!&rdquo;
              </p>
            </div>

            {/* Foto Kanan (col-md-4) */}
            <div className="md:col-span-4 flex justify-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden border-2 border-amber-400 shadow-md">
                <Image
                  src="/images/pengertian.jpeg"
                  alt="Karakteristik Pustaka Nawasena"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 3: TUJUAN                          */}
        {/* ========================================== */}
        <section className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            TUJUAN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-4">
            {/* Foto Kiri (col-md-4) */}
            <div className="md:col-span-4 flex justify-center" data-aos="zoom-in" data-aos-delay="100">
              <div className="relative w-full max-w-[220px] aspect-square rounded-xl overflow-hidden border-2 border-amber-400 shadow-md">
                <Image
                  src="/images/tujuan-revisi.jpeg"
                  alt="Tujuan Pustaka Nawasena"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Teks Kanan (col-md-8) */}
            <div className="md:col-span-8 space-y-4 text-start" data-aos="fade-left" data-aos-delay="200">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
                Menyediakan layanan informasi secara efektif dan menunjang kegiatan penelitian serta pengembangan di Bakorwil III Malang, sekaligus mendukung program riset akademik dan pengelolaan data pemerintahan secara optimal untuk mendukung pembangunan daerah.
              </p>

              <p className="text-amber-500 font-semibold italic text-base sm:text-lg leading-relaxed pt-2">
                &ldquo;Empowering knowledge for a brighter future — together we learn, share, and grow towards excellence!&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 4: FUNGSI (4 PILAR)                */}
        {/* ========================================== */}
        <section className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            FUNGSI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start mt-4">
            {/* Pilar 1 */}
            <div className="space-y-2 p-3 rounded-xl bg-orange-50/30 border border-orange-100" data-aos="fade-up" data-aos-delay="100">
              <h5 className="font-bold text-emerald-700 flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Mendukung Pengambilan Keputusan Berbasis Data</span>
              </h5>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                Dalam era keterbukaan informasi, perpustakaan khusus menjadi sumber utama informasi yang dapat diandalkan untuk mendukung pengambilan keputusan dan penyusunan kebijakan di masa mendatang. Di Bakorwil III Malang, perpustakaan menyediakan data dan dokumen yang dibutuhkan untuk penelitian dan referensi kebijakan.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="space-y-2 p-3 rounded-xl bg-orange-50/30 border border-orange-100" data-aos="fade-up" data-aos-delay="200">
              <h5 className="font-bold text-emerald-700 flex items-center gap-2 text-base">
                <Archive className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Pelestarian Arsip dan Dokumen Negara</span>
              </h5>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                Berfungsi strategis dalam pelestarian pengetahuan, dokumentasi kebijakan, serta arsip penting sebagai referensi di lingkungan internal pemerintahan. Dokumen kebijakan, naskah peraturan, riset internal, hingga laporan evaluasi program menjadi bagian dari memori kelembagaan yang penting untuk kesinambungan pemerintah.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="space-y-2 p-3 rounded-xl bg-orange-50/30 border border-orange-100" data-aos="fade-up" data-aos-delay="300">
              <h5 className="font-bold text-emerald-700 flex items-center gap-2 text-base">
                <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Mendukung Penelitian dan Inovasi Kebijakan</span>
              </h5>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                Bagi lembaga yang memiliki fungsi litbang (penelitian dan pengembangan), perpustakaan khusus menjadi sarana penting untuk mendukung proses riset. Keberadaan referensi yang lengkap dan akses terhadap literatur mutakhir memungkinkan pengembangan kebijakan yang inovatif dan relevan.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="space-y-2 p-3 rounded-xl bg-orange-50/30 border border-orange-100" data-aos="fade-up" data-aos-delay="400">
              <h5 className="font-bold text-emerald-700 flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Meningkatkan Kapasitas SDM Aparatur Sipil Negara (ASN)</span>
              </h5>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                Dengan menyediakan sumber belajar dan referensi, perpustakaan khusus membantu dalam peningkatan kapasitas ASN melalui pelatihan, pendidikan, dan pengembangan profesional berkelanjutan.
              </p>
            </div>
          </div>

          <p className="text-amber-500 font-semibold italic text-base sm:text-lg leading-relaxed pt-6">
            &ldquo;Knowledge preserved is wisdom shared — together we sustain the legacy of information for the generations to come.&rdquo;
          </p>
        </section>

        {/* ========================================== */}
        {/* SECTION 5: KOLEKSI BUKU & JUMLAH DATA      */}
        {/* ========================================== */}
        <section className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            KOLEKSI
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mb-6">
            Pustaka Nawasena Bakorwil III Malang memiliki beragam koleksi yang mendukung kebutuhan informasi dan pengembangan wawasan. Koleksi ini mencakup bahan bacaan umum, referensi akademik, serta dokumen internal pemerintahan yang dapat menjadi sumber inspirasi bagi pegawai dan peneliti di lingkungan Bakorwil.
          </p>

          <h5 className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-6">
            Tipe Koleksi
          </h5>

          <div className="flex justify-center gap-8 sm:gap-14 flex-wrap mb-8">
            {/* Item 1: E-Magazine */}
            <div className="group text-center cursor-pointer" data-aos="zoom-in" data-aos-delay="100">
              <div className="relative w-36 h-48 rounded-xl overflow-hidden border-2 border-amber-400 shadow group-hover:shadow-lg group-hover:-translate-y-1 transition-all bg-slate-100 mx-auto">
                <Image
                  src="/images/megazine.jpeg"
                  alt="E-Magazine Bakorwil"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-xs sm:text-sm text-slate-600 mt-3 group-hover:text-orange-600 transition-colors">
                E-MAGAZINE
              </p>
            </div>

            {/* Item 2: Reference */}
            <Link href="/katalog" className="group text-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="relative w-36 h-48 rounded-xl overflow-hidden border-2 border-amber-400 shadow group-hover:shadow-lg group-hover:-translate-y-1 transition-all bg-slate-100 mx-auto">
                <Image
                  src="/images/perefence.jpeg"
                  alt="Reference Collection"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-bold text-xs sm:text-sm text-slate-600 mt-3 group-hover:text-orange-600 transition-colors">
                REFERENCE
              </p>
            </Link>
          </div>

          <p className="text-amber-500 font-semibold italic text-base sm:text-lg mb-6">
            &ldquo;Discover, read, and share — every page holds a new perspective. Let&apos;s keep our library vibrant with curiosity and inspiration.&rdquo;
          </p>

          <hr className="my-6 border-t-2 border-[#ff9800] w-4/5 mx-auto" />

          <h5 className="text-sm font-semibold text-sky-700 uppercase tracking-wider mb-4">
            Jumlah Koleksi
          </h5>
          <div className="flex justify-center items-center gap-8 sm:gap-16" data-aos="fade-up">
            <div className="text-center font-bold text-xl sm:text-2xl text-emerald-600 tabular-nums">
              {totalTitles} Jilid
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center font-bold text-xl sm:text-2xl text-emerald-600 tabular-nums">
              {totalCopies} Eksemplar
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 6: PROSEDUR LAYANAN (FLOWCHART)   */}
        {/* ========================================== */}
        <section id="prosedur" className="section-box text-center" data-aos="fade-up">
          <h2 className="section-title-custom">
            PROSEDUR LAYANAN
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-xl mx-auto">
            Urutan langkah-langkah untuk mendapatkan layanan di Perpustakaan Khusus.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Langkah 1 */}
            <div className="bg-[#f7f7f7] border-2 border-[#ff9800] rounded-xl p-4 text-center space-y-2 hover:-translate-y-1 transition-transform shadow-sm" data-aos="fade-up" data-aos-delay="100">
              <div className="text-2xl font-black text-sky-600">
                1
              </div>
              <h5 className="font-extrabold text-xs text-sky-700 tracking-wider">LANGKAH 1</h5>
              <p className="text-xs text-slate-600">
                Lakukan Registrasi dan verifikasi keanggotaan.
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="bg-[#f7f7f7] border-2 border-[#ff9800] rounded-xl p-4 text-center space-y-2 hover:-translate-y-1 transition-transform shadow-sm" data-aos="fade-up" data-aos-delay="200">
              <div className="text-2xl font-black text-amber-500">
                2
              </div>
              <h5 className="font-extrabold text-xs text-amber-600 tracking-wider">LANGKAH 2</h5>
              <p className="text-xs text-slate-600">
                Cari &amp; Pilih Buku yang dibutuhkan dari koleksi khusus.
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="bg-[#f7f7f7] border-2 border-[#ff9800] rounded-xl p-4 text-center space-y-2 hover:-translate-y-1 transition-transform shadow-sm" data-aos="fade-up" data-aos-delay="300">
              <div className="text-2xl font-black text-emerald-600">
                3
              </div>
              <h5 className="font-extrabold text-xs text-emerald-700 tracking-wider">LANGKAH 3</h5>
              <p className="text-xs text-slate-600">
                Lakukan Peminjaman dengan datang ditempat dan scan kartu anggota.
              </p>
            </div>

            {/* Langkah 4 */}
            <div className="bg-[#f7f7f7] border-2 border-[#ff9800] rounded-xl p-4 text-center space-y-2 hover:-translate-y-1 transition-transform shadow-sm" data-aos="fade-up" data-aos-delay="400">
              <div className="text-2xl font-black text-rose-600">
                4
              </div>
              <h5 className="font-extrabold text-xs text-rose-700 tracking-wider">LANGKAH 4</h5>
              <p className="text-xs text-slate-600">
                Lakukan Pengembalian sebelum batas waktu yang ditentukan.
              </p>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>Jam Layanan: Senin–Jumat, 08.00 – 16.00</span>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 7: KONTAK & LOKASI                 */}
        {/* ========================================== */}
        <section
          id="kontak"
          data-aos="fade-up"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 152, 0, 0.9), rgba(255, 183, 77, 0.9)), url(/images/utama.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
          }}
          className="rounded-xl p-6 sm:p-10 text-white shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8 tracking-tight">
            KONTAK &amp; LOKASI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Info Kontak */}
            <div className="space-y-4" data-aos="fade-right" data-aos-delay="100">
              <h4 className="text-lg font-bold text-white mb-3">Kontak Person</h4>
              <div className="space-y-2.5 text-sm text-white/95">
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span>Telepon/WA: 085134791603</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <span>E-Mail: arsiptubakorwil@gmail.com</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-white shrink-0" />
                  <span>Website: https://bakorwilmalang.jatimprov.go.id</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>Alamat: Jl. Simpang Ijen No. 2 Kota Malang</span>
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div data-aos="fade-left" data-aos-delay="200">
              <h4 className="text-lg font-bold text-white mb-3">Peta Lokasi Bakorwil III Malang</h4>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-white/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3496328766115!2d112.63001927453488!3d-7.980644292023594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629e924a3502b%3A0xc023c023d6a911a!2sBakorwil%20III%20Malang!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Bakorwil III Malang"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
