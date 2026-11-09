<div align="center">

  <h1>📚 Pustaka Nawasena</h1>
  <p><strong>Sistem Perpustakaan Cerdas Berbasis IoT & Suara Interaktif — Bakorwil III Malang</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Framework-Next.js%2015-black?style=flat-square&logo=next.js">
    <img src="https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript">
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8?style=flat-square&logo=tailwind-css">
    <img src="https://img.shields.io/badge/Hardware-ESP32%20%7C%20RFID%20%7C%20DFPlayer-green?style=flat-square&logo=arduino">
    <img src="https://img.shields.io/badge/Deployment-Vercel%20Ready-white?style=flat-square&logo=vercel">
  </p>
</div>

---

## 🚀 Tentang Proyek

**Pustaka Nawasena** adalah sistem manajemen perpustakaan modern yang memadukan portal katalog buku publik (OPAC), dashboard sirkulasi admin, dan **Kios Mandiri Fisik Berbasis IoT (Internet of Things)** untuk **Bakorwil III Malang, Pemerintah Provinsi Jawa Timur**.

Sistem ini didesain agar siap di-deploy secara instan ke **Vercel** dengan arsitektur **Serverless-Ready**, serta dilengkapi **Interactive Hardware Simulator** langsung di browser sehingga siapapun yang melihat portofolio dapat menguji coba alur peminjaman buku, tap kartu RFID, suara audio DFPlayer, dan lampu indikator LED secara nyata!

---

## ✨ Fitur Utama

1. **📟 Kios Mandiri & Live Hardware Simulator (`/kios`)**:
   - **Layar Sentuh Kios**: Alur peminjaman & pengembalian buku mandiri tanpa antre.
   - **Simulator Hardware Interaktif**:
     - LCD 16x2 I2C dengan teks scrolling & backlight dinamis.
     - Lampu LED RGB multi-warna (*Standby, Scan, Identified, Success, Error*).
     - Modul Suara Audio Guidance (*Web Speech Synthesis & Buzzer Beep* berbahasa Indonesia).
     - Simulasi Tap Kartu RFID (MFRC522) & Scan Barcode Buku.
   - **Telemetry Console Monitor**: Log serial komunikasi hardware real-time.
2. **📖 Katalog Publik OPAC (`/katalog`)**:
   - Pencarian instan judul buku, pengarang, nomor ISBN, atau barcode.
   - Filter kategori literatur kebijakan publik, teknologi, sejarah Malang, dll.
   - Badge ketersediaan status buku (*Tersedia* atau *Sedang Dipinjam*).
3. **📊 Dashboard Admin & Sirkulasi (`/admin`)**:
   - Statistik total koleksi buku, buku dipinjam, anggota aktif, dan transaksi.
   - Manajemen eksemplar, barcode Code128, dan nomor panggil rak.
   - Riwayat sirkulasi dan tabel pendaftaran kartu RFID anggota.
4. **🔌 IoT Gateway & Firmware Support**:
   - `firmware/rfid_nawasena_http.ino`: Kode ESP32 untuk menembak API Vercel via HTTP POST.
   - `iot-bridge/gateway.js`: Bridge Node.js MQTT-ke-HTTPS untuk hardware di gedung fisik.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Frontend & Backend** | Next.js 15 (App Router, Server & Client Components) |
| **Bahasa** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v3, PostCSS, Lucide React Icons |
| **Audio Synthesizer** | Web Audio API (Buzzer) & Web Speech API (Voice Guidance) |
| **IoT Hardware** | ESP32 NodeMCU, RFID MFRC522, DFPlayer Mini, LCD 16x2 I2C |
| **Deployment** | Vercel (1-Click Deployment) |

---

## 🏁 Cara Menjalankan di Lokal

### 1. Clone & Masuk ke Folder Proyek:
```bash
cd D:\Projects\ZeroBug\Pustaka-Nawasena
```

### 2. Install Dependensi:
```bash
npm install
```

### 3. Jalankan Development Server:
```bash
npm run dev
```
Buka browser Anda dan akses: **`http://localhost:3000`**

---

## ☁️ Cara Deploy ke Vercel

1. Push folder proyek ini ke repositori GitHub Anda.
2. Buka dashboard [Vercel](https://vercel.com) lalu klik **Add New Project**.
3. Hubungkan repositori GitHub Anda. Vercel akan otomatis mendeteksi **Next.js**.
4. Klik **Deploy**! Aplikasi Anda langsung live di internet dengan URL Vercel!

---

## 📂 Struktur Folder Proyek

```
Pustaka-Nawasena/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Hero Landing Page
│   │   ├── katalog/page.tsx       # Katalog OPAC & Pencarian Buku
│   │   ├── kios/page.tsx          # Kios Mandiri & Simulator IoT Utama
│   │   ├── admin/page.tsx         # Dashboard Admin & Sirkulasi
│   │   ├── api/iot/scan/route.ts  # Endpoint API untuk Hardware ESP32
│   │   └── globals.css            # Styling Tailwind & LCD Display Effects
│   ├── components/
│   │   ├── Navbar.tsx             # Navigasi utama
│   │   ├── Footer.tsx             # Footer informasi
│   │   └── kios/
│   │       ├── KioskDisplay.tsx   # Layar sentuh Kios Mandiri
│   │       └── HardwareSimulator.tsx # Simulator ESP32, RFID, LCD, Audio
│   ├── data/
│   │   └── mockData.ts            # Data katalog, anggota & sirkulasi
│   ├── types/
│   │   └── index.ts               # Definisi TypeScript
│   └── utils/
│       └── soundEffects.ts        # Synthesizer Buzzer & DFPlayer Voice
├── firmware/
│   └── rfid_nawasena_http.ino     # Firmware C++ ESP32 HTTP Client
├── iot-bridge/
│   └── gateway.js                 # Bridge Node.js MQTT-ke-Vercel
└── package.json
```

