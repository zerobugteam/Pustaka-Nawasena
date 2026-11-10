'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book, Member, Transaction, IotState } from '@/types';
import { INITIAL_BOOKS, INITIAL_MEMBERS, INITIAL_TRANSACTIONS } from '@/data/mockData';
import KioskDisplay from '@/components/kios/KioskDisplay';
import HardwareSimulator from '@/components/kios/HardwareSimulator';
import PrintReceiptModal from '@/components/kios/PrintReceiptModal';
import { playBuzzerBeep, playVoicePrompt, DFPLAYER_TRACKS } from '@/utils/soundEffects';
import { EyeOff, SlidersHorizontal } from 'lucide-react';

export default function KiosPage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [members] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showSimulator, setShowSimulator] = useState<boolean>(true);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Jam & Tanggal Real-time (Sesuai Top Bar Kios 05_kios_scan_barcode.html)
  const [clockText, setClockText] = useState('--:--:--');
  const [dateText, setDateText] = useState('Memuat tanggal...');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(
        now
          .toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          .replace(/\./g, ':')
      );
      setDateText(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // State Mesin IoT Nawasena
  const [iotState, setIotState] = useState<IotState>({
    mode: 'standby',
    activeBook: null,
    activeMember: null,
    activeTransaction: null,
    lcdMessageLine1: 'NAWASENA SMART',
    lcdMessageLine2: 'BAKORWIL III MLG',
    ledColor: 'biru',
    lastScannedUid: null,
    lastScannedBarcode: null,
    systemLog: ['Sistem Layanan Mandiri Pustaka Nawasena siap digunakan.'],
  });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    setIotState((prev) => ({
      ...prev,
      systemLog: [`[${time}] ${msg}`, ...prev.systemLog.slice(0, 9)],
    }));
  };

  // Handler 1: Scan Barcode Buku (baik dari klik simulator maupun ketik manual)
  const handleScanBarcode = (book: Book) => {
    setErrorMessage(null);
    addLog(`Barcode dipindai: ${book.barcode} (${book.title})`);

    if (book.status === 'dipinjam') {
      const activeTrx = transactions.find((t) => t.bookId === book.id && t.status === 'dipinjam');

      setIotState((prev) => ({
        ...prev,
        mode: 'identified',
        activeBook: book,
        activeMember: null,
        activeTransaction: activeTrx || null,
        lcdMessageLine1: 'KEMBALIKAN BUKU?',
        lcdMessageLine2: book.title.substring(0, 16),
        ledColor: 'kuning',
        lastScannedBarcode: book.barcode,
      }));

      if (soundEnabled) {
        playBuzzerBeep(1800, 100);
        playVoicePrompt('Buku terdeteksi sedang dipinjam. Silakan konfirmasi pengembalian pada layar.');
      }
    } else {
      setIotState((prev) => ({
        ...prev,
        mode: 'scan_member',
        activeBook: book,
        activeMember: null,
        activeTransaction: null,
        lcdMessageLine1: 'TEMPELKAN KARTU',
        lcdMessageLine2: 'ANGGOTA RFID...',
        ledColor: 'hijau',
        lastScannedBarcode: book.barcode,
      }));

      if (soundEnabled) {
        playBuzzerBeep(1800, 120);
        playVoicePrompt(DFPLAYER_TRACKS.SCAN_MEMBER);
      }
    }
  };

  // Handler 1b: Input Barcode Manual / Scanner USB
  const handleManualBarcodeSubmit = (code: string) => {
    const found = books.find(
      (b) => b.barcode.toLowerCase() === code.toLowerCase() || b.kodeEksemplar.toLowerCase() === code.toLowerCase()
    );

    if (!found) {
      setErrorMessage(`Kode "${code}" tidak ditemukan dalam database koleksi. Periksa kembali angka barcode atau pilih buku dari panel uji coba.`);
      setIotState((prev) => ({
        ...prev,
        mode: 'error',
        activeBook: null,
        activeMember: null,
        activeTransaction: null,
        lcdMessageLine1: 'KODE TIDAK ADA',
        lcdMessageLine2: code.substring(0, 16),
        ledColor: 'merah',
      }));
      addLog(`Galat pemindaian: Kode "${code}" tidak terdaftar.`);
      if (soundEnabled) {
        playBuzzerBeep(900, 220);
      }
      return;
    }

    handleScanBarcode(found);
  };

  // Handler 2: Scan Kartu Anggota (RFID MFRC522)
  const handleScanCard = (member: Member) => {
    setErrorMessage(null);
    addLog(`Kartu RFID terbaca: ${member.rfidUid} (${member.nama})`);

    if (iotState.mode === 'scan_member' && iotState.activeBook) {
      setIotState((prev) => ({
        ...prev,
        mode: 'identified',
        activeMember: member,
        lcdMessageLine1: 'KARTU TERVALIDASI',
        lcdMessageLine2: member.nama.substring(0, 16),
        ledColor: 'cyan',
        lastScannedUid: member.rfidUid,
      }));

      if (soundEnabled) {
        playBuzzerBeep(2400, 150);
        playVoicePrompt(DFPLAYER_TRACKS.MEMBER_VALID);
      }
    } else {
      setIotState((prev) => ({
        ...prev,
        lcdMessageLine1: 'SELAMAT DATANG',
        lcdMessageLine2: member.nama.substring(0, 16),
        ledColor: 'cyan',
        lastScannedUid: member.rfidUid,
      }));

      if (soundEnabled) {
        playBuzzerBeep(2200, 100);
        playVoicePrompt(`Selamat datang, ${member.nama}. Silakan pindai buku yang ingin dipinjam.`);
      }
    }
  };

  // Handler 3: Konfirmasi Peminjaman
  const handleConfirmBorrow = () => {
    if (!iotState.activeBook || !iotState.activeMember) return;

    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      transactionCode: `TRX/BKW/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      bookId: iotState.activeBook.id,
      bookTitle: iotState.activeBook.title,
      bookBarcode: iotState.activeBook.barcode,
      memberId: iotState.activeMember.id,
      memberName: iotState.activeMember.nama,
      memberUid: iotState.activeMember.rfidUid,
      tanggalPinjam: new Date().toISOString().split('T')[0],
      tenggatKembali: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'dipinjam',
    };

    const updatedBook: Book = { ...iotState.activeBook, status: 'dipinjam' };

    setBooks((prev) =>
      prev.map((b) => (b.id === iotState.activeBook?.id ? updatedBook : b))
    );
    setTransactions((prev) => [newTrx, ...prev]);
    setLastTransaction(newTrx);

    setIotState((prev) => ({
      ...prev,
      mode: 'success',
      activeBook: updatedBook,
      lcdMessageLine1: 'PINJAM BERHASIL',
      lcdMessageLine2: 'TERIMA KASIH',
      ledColor: 'hijau',
    }));

    addLog(`Peminjaman tercatat: ${newTrx.transactionCode}`);

    if (soundEnabled) {
      playBuzzerBeep(2600, 300);
      playVoicePrompt(DFPLAYER_TRACKS.SUCCESS_BORROW);
    }
  };

  // Handler 4: Konfirmasi Pengembalian
  const handleConfirmReturn = () => {
    if (!iotState.activeBook) return;

    const updatedBook: Book = { ...iotState.activeBook, status: 'tersedia' };

    setBooks((prev) =>
      prev.map((b) => (b.id === iotState.activeBook?.id ? updatedBook : b))
    );

    if (iotState.activeTransaction) {
      const completedTrx: Transaction = {
        ...iotState.activeTransaction,
        status: 'kembali',
        tanggalKembali: new Date().toISOString().split('T')[0],
      };
      setTransactions((prev) =>
        prev.map((t) => (t.id === completedTrx.id ? completedTrx : t))
      );
      setLastTransaction(completedTrx);
    } else {
      setLastTransaction(null);
    }

    setIotState((prev) => ({
      ...prev,
      mode: 'success',
      activeBook: updatedBook,
      lcdMessageLine1: 'KEMBALI BERHASIL',
      lcdMessageLine2: 'BUKU TERSIMPAN',
      ledColor: 'hijau',
    }));

    addLog(`Pengembalian tercatat: ${iotState.activeBook.title}`);

    if (soundEnabled) {
      playBuzzerBeep(2600, 300);
      playVoicePrompt(DFPLAYER_TRACKS.SUCCESS_RETURN);
    }
  };

  // Handler 5: Reset Sistem
  const handleReset = () => {
    setErrorMessage(null);
    setShowReceipt(false);
    setIotState((prev) => ({
      mode: 'standby',
      activeBook: null,
      activeMember: null,
      activeTransaction: null,
      lcdMessageLine1: 'NAWASENA SMART',
      lcdMessageLine2: 'BAKORWIL III MLG',
      ledColor: 'biru',
      lastScannedUid: null,
      lastScannedBarcode: null,
      systemLog: ['Sistem kembali ke posisi siaga.', ...prev.systemLog.slice(0, 9)],
    }));
    if (soundEnabled) {
      playBuzzerBeep(1500, 80);
    }
  };

  return (
    <>
    <div
      className="min-h-screen flex flex-col bg-slate-900 bg-cover bg-center font-sans print:hidden"
      style={{
        backgroundImage:
          'linear-gradient(rgba(15, 23, 42, 0.86), rgba(15, 23, 42, 0.9)), url("/images/utama.jpg")',
      }}
    >
      {/* Top Bar Resmi Kios Mandiri */}
      <header className="bg-white border-b-4 border-amber-700 px-4 sm:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded-lg"
            title="Pustaka Nawasena"
          >
            <img
              src="/images/kartu.png"
              alt="Logo Pustaka Nawasena"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <span className="w-px h-7 bg-slate-200" aria-hidden="true" />
            <img
              src="/images/bakorwil.png"
              alt="Logo Bakorwil III Malang"
              width={36}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <div className="pl-1">
              <h1 className="text-slate-900 font-black text-base sm:text-lg leading-none tracking-tight">
                NAWASENA
              </h1>
              <p className="text-amber-700 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                Layanan Mandiri
              </p>
            </div>
          </Link>

          {/* Tombol Clean Toggle Panel Uji & Jam Digital Kios */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button
              type="button"
              onClick={() => setShowSimulator((prev) => !prev)}
              aria-expanded={showSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.97] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
            >
              {showSimulator ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sembunyikan Uji</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Panel Uji</span>
                </>
              )}
            </button>

            <span className="w-px h-6 bg-slate-200 hidden sm:block" aria-hidden="true" />

            <div className="text-right">
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight tabular-nums leading-none">
                {clockText}
              </div>
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mt-1">
                {dateText}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Utama Kios */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col justify-center">
        <KioskDisplay
          iotState={iotState}
          errorMessage={errorMessage}
          onManualBarcodeSubmit={handleManualBarcodeSubmit}
          onConfirmBorrow={handleConfirmBorrow}
          onConfirmReturn={handleConfirmReturn}
          onOpenReceipt={() => setShowReceipt(true)}
          onCancel={handleReset}
        />

        <div
          aria-hidden={!showSimulator}
          className={`grid transition-all duration-300 ease-out ${
            showSimulator
              ? 'grid-rows-[1fr] opacity-100 translate-y-0 mt-6'
              : 'grid-rows-[0fr] opacity-0 -translate-y-2 mt-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden py-1">
            <HardwareSimulator
              iotState={iotState}
              members={members}
              books={books}
              onScanCard={handleScanCard}
              onScanBarcode={handleScanBarcode}
              onResetSystem={handleReset}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
            />
          </div>
        </div>
      </main>

      {/* Footer Kios */}
      <footer className="bg-slate-950/90 text-slate-300 py-3 px-4 text-center text-xs font-medium tracking-wide border-t border-slate-800">
        Bakorwil III Malang | Sistem Sirkulasi Mandiri Pustaka Nawasena
      </footer>
    </div>

      {/* Modal Cetak Struk (Portal ke body agar posisi fixed & print rapi) */}
      <PrintReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        transaction={lastTransaction}
        book={iotState.activeBook}
        member={iotState.activeMember}
      />
    </>
  );
}
