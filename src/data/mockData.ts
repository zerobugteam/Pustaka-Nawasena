import { Book, Member, Transaction } from '@/types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b1',
    biblioId: 101,
    kodeEksemplar: 'BKW-2024-001',
    barcode: '9786020388123',
    title: 'Sistem Informasi Manajemen Sektor Publik',
    author: 'Prof. Dr. Eko Prasojo, M.Si.',
    publisher: 'Rajawali Pers',
    year: 2023,
    isbn: '978-602-03-8812-3',
    category: 'Administrasi Publik',
    callNumber: '351.002 EKO s',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    status: 'tersedia',
    description: 'Panduan tata kelola transformasi birokrasi dan implementasi e-government di lingkungan dinas dan badan koordinasi wilayah provinsi Jawa Timur.',
    location: 'Rak A-01 (Koleksi Kebijakan Publik)'
  },
  {
    id: 'b2',
    biblioId: 102,
    kodeEksemplar: 'BKW-2024-002',
    barcode: '9786230004512',
    title: 'IoT & Embedded Systems untuk Smart City',
    author: 'Ir. Budi Santoso, M.T.',
    publisher: 'Informatika Bandung',
    year: 2024,
    isbn: '978-623-00-0451-2',
    category: 'Teknologi & IoT',
    callNumber: '004.678 BUD i',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    status: 'tersedia',
    description: 'Kajian komprehensif implementasi sensor ESP32, MQTT, dan otomasi cerdas layanan publik perkotaan dan fasilitas pemerintahan.',
    location: 'Rak B-03 (Teknologi & Komputer)'
  },
  {
    id: 'b3',
    biblioId: 103,
    kodeEksemplar: 'BKW-2024-003',
    barcode: '9789792298711',
    title: 'Sejarah dan Budaya Malang Raya',
    author: 'Dwi Cahyono',
    publisher: 'Pustaka Kayutangan',
    year: 2022,
    isbn: '978-979-22-9871-1',
    category: 'Sejarah & Budaya',
    callNumber: '959.828 DWI s',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600',
    status: 'dipinjam',
    description: 'Eksplorasi jejak peradaban Kanjuruhan, Singhasari, hingga perkembangan kota kolonial Malang di bawah kepresidenan Bakorwil III.',
    location: 'Rak C-02 (Muatan Lokal Jawa Timur)'
  },
  {
    id: 'b4',
    biblioId: 104,
    kodeEksemplar: 'BKW-2024-004',
    barcode: '9786022914120',
    title: 'Dasar-Dasar Kecerdasan Buatan & Machine Learning',
    author: 'Dr. Suyanto, S.T., M.Sc.',
    publisher: 'Informatika',
    year: 2023,
    isbn: '978-602-291-412-0',
    category: 'Teknologi & IoT',
    callNumber: '006.3 SUY d',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
    status: 'tersedia',
    description: 'Buku teks pengantar konsep neural networks, deep learning, dan visi komputer untuk sistem otomasi modern.',
    location: 'Rak B-04 (Teknologi & Komputer)'
  },
  {
    id: 'b5',
    biblioId: 105,
    kodeEksemplar: 'BKW-2024-005',
    barcode: '9786020639918',
    title: 'Ekonomi Regional & Perencanaan Pembangunan',
    author: 'Prof. Lincolin Arsyad, Ph.D.',
    publisher: 'BPFE Yogyakarta',
    year: 2021,
    isbn: '978-602-06-3991-8',
    category: 'Ekonomi',
    callNumber: '338.9 ARS e',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    status: 'tersedia',
    description: 'Metodologi analisis disparitas wilayah, potensi pertumbuhan kawasan lingkar wilis, bromo-tengger-semeru, dan peran Bakorwil.',
    location: 'Rak A-03 (Ekonomi & Pembangunan)'
  },
  {
    id: 'b6',
    biblioId: 106,
    kodeEksemplar: 'BKW-2024-006',
    barcode: '9786024443900',
    title: 'Metode Penelitian Kualitatif untuk Kebijakan Publik',
    author: 'Prof. Dr. Lexy J. Moleong',
    publisher: 'Remaja Rosdakarya',
    year: 2022,
    isbn: '978-602-444-390-0',
    category: 'Metodologi Riset',
    callNumber: '001.42 MOL m',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    status: 'tersedia',
    description: 'Pedoman riset terapan untuk penyusunan naskah akademik, evaluasi program kerja daerah, dan studi kasus instansi pemerintah.',
    location: 'Rak A-02 (Metodologi)'
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    rfidUid: '3A4F8291',
    nama: 'Rizky Pratama, S.Kom.',
    nikNip: '199508122022031004',
    email: 'rizky.pratama@jatimprov.go.id',
    role: 'ASN / Staf',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    status: 'aktif',
    totalPinjam: 3
  },
  {
    id: 'm2',
    rfidUid: 'A1B2C3D4',
    nama: 'Aditya Bagus Nugroho',
    nikNip: '215150200111045',
    email: 'aditya.nugroho@student.ub.ac.id',
    role: 'Mahasiswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    status: 'aktif',
    totalPinjam: 1
  },
  {
    id: 'm3',
    rfidUid: '7E90B12F',
    nama: 'Dewi Ayu Lestari, S.Sos.',
    nikNip: '3573016508980002',
    email: 'dewi.ayu.lestari@gmail.com',
    role: 'Umum',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    status: 'aktif',
    totalPinjam: 0
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1001',
    transactionCode: 'TRX/BKW/2026/001',
    bookId: 'b3',
    bookTitle: 'Sejarah dan Budaya Malang Raya',
    bookBarcode: '9789792298711',
    memberId: 'm2',
    memberName: 'Aditya Bagus Nugroho',
    memberUid: 'A1B2C3D4',
    tanggalPinjam: '2026-11-02',
    tenggatKembali: '2026-11-16',
    status: 'dipinjam'
  },
  {
    id: 'trx-1000',
    transactionCode: 'TRX/BKW/2026/000',
    bookId: 'b1',
    bookTitle: 'Sistem Informasi Manajemen Sektor Publik',
    bookBarcode: '9786020388123',
    memberId: 'm1',
    memberName: 'Rizky Pratama, S.Kom.',
    memberUid: '3A4F8291',
    tanggalPinjam: '2026-10-18',
    tenggatKembali: '2026-11-01',
    tanggalKembali: '2026-10-30',
    status: 'kembali'
  }
];

