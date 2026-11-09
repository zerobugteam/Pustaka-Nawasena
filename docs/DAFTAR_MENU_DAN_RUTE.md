# Dokumentasi Resmi: Daftar Menu, Rute, & Peta Arsitektur
**Pustaka Nawasena — Sistem Perpustakaan Cerdas Berbasis IoT (Bakorwil III Malang)**

Dokumen ini merangkum seluruh menu antarmuka, daftar rute URL (*routing map*), fungsi operasional, serta referensi visual terhadap tangkapan layar asli dari sistem `bakorwil`.

---

## 🧭 1. Peta Navigasi Menu Utama

Navigasi atas (*Sticky Header Oranye `#f9ad16`*) dan menu hero mencakup tautan-tautan berikut:

```
[Logo Jatim / Pustaka Nawasena] ──> / (Beranda)
  ├── 📖 Koleksi Buku           ──> /katalog
  ├── 🏢 Fasilitas              ──> /fasilitas
  ├── ⚡ Kios Mandiri IoT       ──> /kios
  ├── 🔑 Login Petugas/Anggota  ──> /login
  │     └── 📝 Daftar Akun      ──> /register
  └── 📊 Dashboard Admin        ──> /admin
```

---

## 🗺️ 2. Daftar Lengkap Rute Aplikasi

| Rute URL | Nama Modul | Tipe Rendering | Referensi Screenshot Asli | Deskripsi & Fitur Utama |
|---|---|:---:|:---:|---|
| **`/`** | **Beranda Utama** | Client & Server (Static) | [`docs/ss-bakorwil/01_beranda_welcome.png`](./ss-bakorwil/01_beranda_welcome.png) | Landing page resmi dengan background foto `utama.jpg`, form pencarian koleksi rounded-pill, profil perpustakaan (Ibnu Sina quote), karakteristik, tujuan, 4 pilar fungsi, statistik inventaris majalah & buku, alur prosedur 4 langkah, dan Google Maps lokasi Bakorwil III Malang. |
| **`/login`** | **Autentikasi Masuk** | Client Component | [`docs/ss-bakorwil/02_halaman_login.png`](./ss-bakorwil/02_halaman_login.png) | Formulir login akun petugas/anggota dengan background blur `utama.jpg`, toggle intip kata sandi, opsi Google Sign-In, dan pengalihan ke dashboard admin. |
| **`/register`** | **Pendaftaran Anggota** | Client Component | [`docs/ss-bakorwil/03_halaman_register.png`](./ss-bakorwil/03_halaman_register.png) | Formulir registrasi anggota baru dilengkapi fitur unik **Rekomendasi Sandi Otomatis** (*Magic Password Generator*) berdasarkan nama dan simbol kombinasi kedinasan. |
| **`/katalog`** | **Katalog Publik (OPAC)** | Client Component | *(Koleksi Pustaka)* | Portal pencarian inventaris koleksi buku, jam digital real-time WIB, filter kategori literatur, status ketersediaan rak, dan modal detail bibliografi. |
| **`/fasilitas`** | **Sarana & Prasarana** | Client Component | [`docs/ss-bakorwil/04_fasilitas_peralatan.png`](./ss-bakorwil/04_fasilitas_peralatan.png) | Menampilkan fasilitas fisik dan teknologi Bakorwil: Pojok Baca Mandiri, Ruang Diskusi, Mesin Cetak/Scanner, Proyektor, Wi-Fi gratis, dan CCTV 24 Jam. |
| **`/kios`** | **Kios Mandiri & Simulator IoT** | Client Component | [`docs/ss-bakorwil/05_kios_scan_barcode.png`](./ss-bakorwil/05_kios_scan_barcode.png) & [`docs/ss-bakorwil/06_kios_scan_rfid.png`](./ss-bakorwil/06_kios_scan_rfid.png) | Layar sentuh mandiri (*self-service kiosk*) peminjaman & pengembalian buku terintegrasi simulator mikrokontroler ESP32: LCD 16x2 I2C virtual, LED RGB multi-state, suara panduan Bahasa Indonesia (DFPlayer), scan barcode, tap kartu RFID, dan cetak struk digital. |
| **`/admin`** | **Dashboard Admin & Sirkulasi** | Client Component | *(Dashboard Filament)* | Panel kendali administrator untuk memantau ringkasan statistik sirkulasi, riwayat peminjaman & pengembalian, inventaris kode eksemplar/barcode Code128, dan registrasi UID RFID anggota. |
| **`/api/iot/scan`** | **IoT Hardware Gateway API** | Serverless API Route | *(Backend IoT)* | Endpoint REST API penerima sinyal masukan RFID dan Barcode dari perangkat keras fisik ESP32 (`firmware/rfid_nawasena_http.ino`) atau Node.js MQTT Gateway. |

---

## 🎨 3. Karakteristik Desain & Tampilan Visual

- **Palet Warna Utama**:
  - Warna Header: `#f9ad16` (Kuning-Oranye khas kedinasan Bakorwil III Malang).
  - Warna Primer & Aksen: `#ff9800` dan `#f97316`.
  - Warna Latar Halaman: `linear-gradient(to right, #ece9e6, #ffffff, #ece9e6)`.
- **Tipografi**: Menggunakan font **`Inter`** di seluruh elemen teks.
- **Favicon**: Berbentuk lingkaran (*circle mask*) transparan di keempat sudutnya (`/favicon.ico`).
- **Animasi Antarmuka**:
  - **Transisi Halaman**: Sangat cepat (*220ms*) via `src/app/template.tsx`.
  - **Scroll Reveal (`data-aos`)**: Animasi *fade-up*, *zoom-in*, *fade-left*, dan *fade-right* saat elemen mulai masuk ke layar pandang.

---

## 📁 4. Tautan Tangkapan Layar Asli

Seluruh tangkapan layar resolusi tinggi dari proyek asli `bakorwil` dapat dilihat di folder [`docs/ss-bakorwil/`](./ss-bakorwil/):
1. `01_beranda_welcome.png` — Beranda Publik
2. `02_halaman_login.png` — Halaman Login
3. `03_halaman_register.png` — Halaman Registrasi
4. `04_fasilitas_peralatan.png` — Fasilitas Ruangan & Alat
5. `05_kios_scan_barcode.png` — Layar Scan Barcode Kios
6. `06_kios_scan_rfid.png` — Layar Scan Kartu RFID Kios

