export type BookStatus = 'tersedia' | 'dipinjam' | 'rusak';

export interface Book {
  id: string;
  biblioId: number;
  kodeEksemplar: string;
  barcode: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  category: string;
  callNumber: string;
  coverImage: string;
  status: BookStatus;
  description: string;
  location: string;
}

export interface Member {
  id: string;
  rfidUid: string;
  nama: string;
  nikNip: string;
  email: string;
  role: 'Mahasiswa' | 'ASN / Staf' | 'Umum';
  avatar: string;
  status: 'aktif' | 'terblokir';
  totalPinjam: number;
}

export interface Transaction {
  id: string;
  transactionCode: string;
  bookId: string;
  bookTitle: string;
  bookBarcode: string;
  memberId: string;
  memberName: string;
  memberUid: string;
  tanggalPinjam: string;
  tenggatKembali: string;
  tanggalKembali?: string;
  status: 'dipinjam' | 'kembali' | 'terlambat';
}

export type IotMode = 'standby' | 'scan_member' | 'wait' | 'identified' | 'success' | 'error';

export interface IotState {
  mode: IotMode;
  activeBook: Book | null;
  activeMember: Member | null;
  activeTransaction: Transaction | null;
  lcdMessageLine1: string;
  lcdMessageLine2: string;
  ledColor: 'biru' | 'hijau' | 'kuning' | 'cyan' | 'merah' | 'putih';
  lastScannedUid: string | null;
  lastScannedBarcode: string | null;
  systemLog: string[];
}

