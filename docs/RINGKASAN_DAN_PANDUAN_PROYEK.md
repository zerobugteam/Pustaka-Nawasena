# Ringkasan Eksekutif & Panduan Menjalankan Proyek
**Pustaka Nawasena — Sistem Perpustakaan Cerdas Berbasis IoT**

---

## 📌 1. Ringkasan Sistem & Arsitektur

**Pustaka Nawasena** adalah platform otomasi perpustakaan cerdas (*Smart Library System*) yang dirancang untuk modernisasi layanan perpustakaan di Bakorwil III Malang. Proyek ini menggabungkan layanan digital mandiri (self-service kiosk) dengan integrasi perangkat keras IoT (RFID & Barcode Scanner) yang dibungkus dalam arsitektur modern berbasis **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS**.

### Evolusi Teknis & Keputusan Arsitektur:
- **Asal Codebase**: Sistem sebelumnya berbasis monolitik Laravel 12 + modul firmware ESP32 (RFID MFRC522, DFPlayer Mini, LCD 16x2 I2C, MQTT).
- **Keputusan Migrasi**: Membangun ulang sistem ke ekosistem JavaScript/TypeScript modern agar ringan, responsif, siap dipamerkan di portofolio, serta *serverless deployment-ready* untuk platform seperti **Vercel** atau **Cloudflare**.
- **Model Integrasi IoT (Hybrid / Serverless-Ready)**:
  - **Live Hardware Simulator**: Terintegrasi langsung di browser untuk keperluan demonstrasi portofolio tanpa memerlukan alat fisik.
  - **REST API Route**: `/api/iot/scan` siap menerima request HTTP POST dari mikrokontroler ESP32 langsung.
  - **Gateway Bridge**: Disediakan script Node.js bridge MQTT-ke-HTTP (`iot-bridge/gateway.js`) jika ingin menggunakan infrastruktur broker MQTT lokal.

---

## 🛠️ 2. Modul & Fitur Utama

| Modul | Path / Rute | Deskripsi Fitur |
|---|---|---|
| **Landing Page** | `/` | Tampilan beranda interaktif, showcase fitur utama, statistik perpustakaan, dan navigasi cepat. |
| **Kios Mandiri (Self-Service)** | `/kios` | Layar sentuh interaktif untuk peminjaman & pengembalian buku mandiri oleh pemustaka. Dilengkapi cetak struk digital (`window.print()`). |
| **Simulator Hardware IoT** | `/kios` (Panel Kanan) | Simulator perangkat keras ESP32 virtual: LCD 16x2 I2C dot-matrix, lampu RGB multi-state, audio beeper buzzer (Web Audio API), panduan suara Indonesia (Web Speech API), tombol virtual tap RFID & barcode, serta serial monitor live telemetry. |
| **Katalog Publik (OPAC)** | `/katalog` | Pencarian instan judul/pengarang/ISBN, filter kategori literatur, status ketersediaan rak, dan modal detail bibliografi. |
| **Dashboard Admin** | `/admin` | Ringkasan statistik sirkulasi, log transaksi peminjaman & pengembalian, manajemen inventaris eksemplar buku, dan pemetaan kartu RFID anggota. |
| **IoT Serverless API** | `/api/iot/scan` | Endpoint serverless penangkap sinyal scan RFID/Barcode dari perangkat IoT eksternal. |

---

## 🚀 3. Panduan Menjalankan Proyek

### Prasyarat
- **Node.js**: v18.18.0 atau lebih baru (disarankan Node.js v20/v22 LTS).
- **NPM** atau package manager kompatibel (`pnpm` / `yarn`).

---

### A. Mode Development (Pengembangan)

1. Buka terminal pada root direktori proyek:
   ```bash
   cd D:\Projects\ZeroBug\Pustaka-Nawasena
   ```
2. Pastikan dependensi sudah terpasang (jika belum pernah dijalankan):
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka peramban (browser) di:
   👉 **http://localhost:3000**

---

### B. Daftar Rute untuk Demonstrasi & Pengujian

- **Beranda Utama**: [http://localhost:3000/](http://localhost:3000/)
- **Kios Mandiri & Simulator IoT**: [http://localhost:3000/kios](http://localhost:3000/kios)  
  *Tips demonstrasi: Coba klik tombol "Tap Kartu RFID" untuk memilih user sampel, lalu lakukan "Scan Barcode Buku". Amati respons LCD 16x2, lampu LED, dan suara panduan.*
- **Katalog Publik (OPAC)**: [http://localhost:3000/katalog](http://localhost:3000/katalog)  
  *Cari buku berdasarkan kata kunci atau pilih filter kategori.*
- **Dashboard Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)  
  *Lihat ringkasan transaksi peminjaman, anggota, dan inventaris.*

---

### C. Mode Build Produksi (Production Test)

Untuk menguji performa build akhir sebelum deployment:

```bash
# 1. Jalankan proses kompilasi
npm run build

# 2. Jalankan server produksi lokal
npm run start
```

---

### D. Menjalankan IoT Gateway Bridge (Opsional - Hardware Fisik)

Jika ingin menghubungkan perangkat fisik ESP32 yang berkomunikasi melalui broker MQTT (misal: Mosquitto):

```bash
cd iot-bridge
npm install
node gateway.js
```
*Script ini bertindak sebagai jembatan yang menangkap pesan MQTT dari ESP32 fisik dan mem-forward datanya ke endpoint `/api/iot/scan` Next.js.*

---

## ☁️ 4. Panduan Deployment ke Vercel

Proyek ini telah dikonfigurasi penuh agar kompatibel dengan lingkungan serverless Vercel:
1. Dorong (*push*) repository ke GitHub / GitLab.
2. Buka dashboard [Vercel](https://vercel.com/) dan pilih **Add New Project**.
3. Import repositori `Pustaka-Nawasena`.
4. Vercel akan otomatis mendeteksi framework **Next.js**. Klik **Deploy**.
5. Sistem langsung aktif online dalam hitungan menit.

