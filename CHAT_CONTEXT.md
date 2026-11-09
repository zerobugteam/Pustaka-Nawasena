# Riwayat Konteks & Catatan Keputusan Arsitektur
**Proyek: Pustaka Nawasena (Sistem Perpustakaan Cerdas Berbasis IoT — Bakorwil III Malang)**
*Dokumen ini merangkum seluruh percakapan, analisis sistem, temuan teknis, dan keputusan migrasi dari awal hingga pembentukan proyek baru di `D:\Projects\ZeroBug\Pustaka-Nawasena`.*

---

## 📌 Ringkasan Eksekutif Perjalanan Proyek

Percakapan ini berawal dari kebutuhan menganalisis codebase awal perpustakaan di folder `D:\Projects\ZeroBug\bakorwil`, yang kemudian berkembang menjadi evaluasi arsitektur, penjelasan sub-folder, studi komparasi framework JavaScript/TypeScript yang cocok untuk Vercel/Cloudflare, hingga pembangunan ulang sistem menjadi proyek modern **`Pustaka-Nawasena`** berbasis **Next.js 15** yang siap dipamerkan di portofolio.

---

## 🧭 Kronologi & Poin-Poin Diskusi

### 1. Analisis Codebase Awal (`bakorwil`)
- **Tujuan**: Menganalisis seluruh fitur, arsitektur, database, dan modul IoT yang ada, lalu mendokumentasikannya ke folder `docs/`.
- **Temuan Kunci**:
  - Walaupun file `README.md` lama menyebutkan *"PHP Native (Mysqli)"*, kode proyek sebenarnya berbasis **Laravel 12.x** dengan **Filament 3.3**, **Tailwind CSS v4**, dan **Laravel Reverb (WebSockets)**.
  - Terdapat integrasi perangkat keras IoT di folder `Iot_Nawasena/rfid_suara.ino` berbasis **ESP32 NodeMCU**, **RFID MFRC522**, **DFPlayer Mini MP3 Player** (audio bahasa Indonesia), **LCD 16x2 I2C**, **RGB LED**, dan protokol **MQTT** via `php artisan mqtt:listen`.
- **Hasil Dokumentasi yang Dihasilkan di `bakorwil/docs/`**:
  - `ANALISIS_PROYEK.md`: Laporan komprehensif sistem.
  - `ARSITEKTUR_DAN_ALUR_IOT.md`: Spesifikasi hardware, pinout, topik MQTT, dan pemetaan audio DFPlayer.
  - `SKEMA_DATABASE_DAN_RELASI.md`: Kamus data dan diagram ERD untuk tabel `users`, `anggota`, `koleksis`, `borrow_transactions`, `iot_modes`, dll.

---

### 2. Investigasi Folder `bakorwil2`
- **Pertanyaan Pengguna**: *"Kenapa ada file bakorwil2? Apa bedanya dengan proyek yang ini?"*
- **Hasil Analisis**:
  - `bakorwil2` adalah **fresh install skeleton kosong** dari Laravel 13.x (PHP ^8.3).
  - Hanya berisi file default template Laravel (1 controller default, 1 model User, 3 migrasi default).
  - Sama sekali tidak memiliki logika bisnis perpustakaan maupun modul IoT.
  - Kesimpulan: Aman dihapus atau dipindahkan ke luar direktori kerja.

---

### 3. Konsultasi Migrasi ke Framework JavaScript & Analisis Deployment Serverless
- **Pertanyaan Pengguna**: Rekomendasi framework JS yang cocok untuk migrasi dan kompatibel untuk dideploy lewat **Vercel** atau **Cloudflare**.
- **Analisis Kritis Serverless (Vercel vs IoT MQTT)**:
  - Vercel dan Cloudflare Workers berbasis **Serverless/Edge Functions** (hanya hidup saat ada HTTP request).
  - Keduanya **tidak bisa** menjalankan proses latar belakang yang *always-on* (seperti listener MQTT TCP bawaan).
- **Rekomendasi Solusi yang Diajukan**:
  - **Solusi A (100% Serverless)**: ESP32 mengirim data via HTTPS REST API langsung ke Vercel API Routes.
  - **Solusi B (Hybrid Deployment)**: Next.js dideploy di Vercel untuk portal publik, admin, dan Kios UI. Komunikasi dengan perangkat ESP32 fisik di gedung Bakorwil dijembatani oleh lightweight Node.js Bridge atau HTTP REST API.
- **Keputusan Pengguna**: Memilih **Solusi B** dengan fokus utama agar sistem **siap dipamerkan di portofolio** dan dideploy instan ke **Vercel**.

---

### 4. Pembangunan Proyek Baru: `Pustaka-Nawasena`
- **Lokasi Proyek**: `D:\Projects\ZeroBug\Pustaka-Nawasena`
- **Tech Stack Terpilih**:
  - **Framework**: Next.js 15 (App Router, Server & Client Components)
  - **Bahasa**: TypeScript (Strict Mode)
  - **Styling**: Tailwind CSS v3, PostCSS, Lucide React Icons
  - **Audio Engine**: Web Audio API (Buzzer Beep) & Web Speech API (Voice Guidance Suara Bahasa Indonesia)
  - **Platform Deployment**: Vercel (Production Ready)

---

## 🛠️ Rincian Modul & Fitur yang Selesai Dibangun di `Pustaka-Nawasena`

1. **Kios Mandiri & Live Hardware Simulator (`src/app/kios/page.tsx`)**:
   - **Layar Sentuh Kios Digital**: Menangani state peminjaman baru, pengembalian buku, konfirmasi identitas anggota, dan bukti struk.
   - **Simulator Perangkat Keras ESP32 Interaktif**:
     - LCD 16x2 I2C virtual dengan dot-matrix display.
     - LED RGB multi-state (*Biru = Standby, Hijau = Scan, Cyan = Identified, Merah = Error*).
     - Modul Suara DFPlayer Mini virtual berbahasa Indonesia.
     - Tombol Virtual Tap Kartu RFID (MFRC522) dan Barcode Scanner.
     - Telemetry Serial Console log baud 115200 live.
2. **Katalog Publik OPAC (`src/app/katalog/page.tsx`)**:
   - Pencarian instan judul buku, pengarang, ISBN, barcode.
   - Filter kategori literatur dan badge status ketersediaan (*Tersedia* / *Sedang Dipinjam*).
   - Modal detail bibliografi lengkap dengan nomor panggil rak.
3. **Dashboard Admin & Sirkulasi (`src/app/admin/page.tsx`)**:
   - Metrik statistik sirkulasi real-time.
   - Tabel riwayat transaksi peminjaman & pengembalian buku.
   - Manajemen eksemplar, barcode Code128, dan nomor panggil rak.
   - Tabel pendaftaran keanggotaan dan pemetaan kartu RFID.
4. **Cetak Bukti Transaksi Struk Digital (`src/components/kios/PrintReceiptModal.tsx`)**:
   - Menghasilkan struk resmi bukti peminjaman digital lengkap dengan barcode dan tenggat pengembalian yang dapat langsung dicetak (`window.print()`).
5. **IoT Gateway & Firmware Support**:
   - `src/app/api/iot/scan/route.ts`: API route serverless penerima sinyal scan barcode dan kartu RFID.
   - `firmware/rfid_nawasena_http.ino`: Firmware C++ ESP32 versi HTTP REST.
   - `iot-bridge/gateway.js`: Script Node.js bridge MQTT-ke-Vercel.

---

## 🚀 Status Verifikasi & Build Produksi

- Build produksi (`npm run build`) telah dieksekusi dan **sukses 100% tanpa error**:
  - Route `/` (Static)
  - Route `/katalog` (Static)
  - Route `/kios` (Static)
  - Route `/admin` (Static)
  - Route `/api/iot/scan` (Dynamic Serverless API)

---

## 📝 Panduan Singkat Menjalankan & Deploy

```bash
# 1. Masuk ke direktori
cd D:\Projects\ZeroBug\Pustaka-Nawasena

# 2. Jalankan development server
npm run dev
# Buka http://localhost:3000

# 3. Deploy ke Vercel
# Cukup push ke GitHub lalu sambungkan repositori ke Vercel (1-Click Deploy).
```

