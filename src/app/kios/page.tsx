'use client';

import { useState } from 'react';
import { Book, Member, Transaction, IotState } from '@/types';
import { INITIAL_BOOKS, INITIAL_MEMBERS, INITIAL_TRANSACTIONS } from '@/data/mockData';
import KioskDisplay from '@/components/kios/KioskDisplay';
import HardwareSimulator from '@/components/kios/HardwareSimulator';
import { playBuzzerBeep, playVoicePrompt, DFPLAYER_TRACKS } from '@/utils/soundEffects';
import { Cpu, Info, Sparkles, Terminal } from 'lucide-react';

export default function KiosPage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [members] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // State Mesin IoT Nawasena
  const [iotState, setIotState] = useState<IotState>({
    mode: 'standby',
    activeBook: null,
    activeMember: null,
    activeTransaction: null,
    lcdMessageLine1: ' NAWASENA SMART ',
    lcdMessageLine2: 'BAKORWIL III MLG',
    ledColor: 'biru',
    lastScannedUid: null,
    lastScannedBarcode: null,
    systemLog: ['[BOOT] Sistem IoT Pustaka Nawasena siap.'],
  });

  const addLog = (msg: string) => {
    setIotState((prev) => ({
      ...prev,
      systemLog: [msg, ...prev.systemLog.slice(0, 8)],
    }));
  };

  // Handler 1: Scan Barcode Buku
  const handleScanBarcode = (book: Book) => {
    addLog(`[BARCODE] Memindai barcode: ${book.barcode} (${book.title})`);

    // Cek apakah buku sedang dipinjam
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
      // Buku tersedia -> Minta scan kartu anggota
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

  // Handler 2: Scan Kartu Anggota (RFID MFRC522)
  const handleScanCard = (member: Member) => {
    addLog(`[RFID] Kartu UID terbaca: ${member.rfidUid} (${member.nama})`);

    if (iotState.mode === 'scan_member' && iotState.activeBook) {
      // Pasangkan buku dengan anggota
      setIotState((prev) => ({
        ...prev,
        mode: 'identified',
        activeMember: member,
        lcdMessageLine1: 'KARTU TERVERIFIKASI',
        lcdMessageLine2: member.nama.substring(0, 16),
        ledColor: 'cyan',
        lastScannedUid: member.rfidUid,
      }));

      if (soundEnabled) {
        playBuzzerBeep(2400, 150);
        playVoicePrompt(DFPLAYER_TRACKS.MEMBER_VALID);
      }
    } else {
      // Scan kartu pada kondisi standby -> identifikasi profil
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

    // Update status buku menjadi 'dipinjam'
    setBooks((prev) =>
      prev.map((b) => (b.id === iotState.activeBook?.id ? { ...b, status: 'dipinjam' } : b))
    );

    setTransactions((prev) => [newTrx, ...prev]);

    setIotState((prev) => ({
      ...prev,
      mode: 'success',
      lcdMessageLine1: 'TRANSAKSI OK',
      lcdMessageLine2: 'TERIMA KASIH',
      ledColor: 'hijau',
    }));

    addLog(`[TRANSAKSI] Peminjaman berhasil dicatat: ${newTrx.transactionCode}`);

    if (soundEnabled) {
      playBuzzerBeep(2600, 300);
      playVoicePrompt(DFPLAYER_TRACKS.SUCCESS_BORROW);
    }
  };

  // Handler 4: Konfirmasi Pengembalian
  const handleConfirmReturn = () => {
    if (!iotState.activeBook) return;

    // Update status buku menjadi 'tersedia'
    setBooks((prev) =>
      prev.map((b) => (b.id === iotState.activeBook?.id ? { ...b, status: 'tersedia' } : b))
    );

    // Update transaksi terkait
    if (iotState.activeTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === iotState.activeTransaction?.id
            ? { ...t, status: 'kembali', tanggalKembali: new Date().toISOString().split('T')[0] }
            : t
        )
      );
    }

    setIotState((prev) => ({
      ...prev,
      mode: 'success',
      lcdMessageLine1: 'PENGEMBALIAN OK',
      lcdMessageLine2: 'BUKU TERSIMPAN',
      ledColor: 'hijau',
    }));

    addLog(`[TRANSAKSI] Buku ${iotState.activeBook.title} berhasil dikembalikan`);

    if (soundEnabled) {
      playBuzzerBeep(2600, 300);
      playVoicePrompt(DFPLAYER_TRACKS.SUCCESS_RETURN);
    }
  };

  // Handler 5: Reset Sistem
  const handleReset = () => {
    setIotState({
      mode: 'standby',
      activeBook: null,
      activeMember: null,
      activeTransaction: null,
      lcdMessageLine1: ' NAWASENA SMART ',
      lcdMessageLine2: 'BAKORWIL III MLG',
      ledColor: 'biru',
      lastScannedUid: null,
      lastScannedBarcode: null,
      systemLog: ['[RESET] Sistem kembali ke mode standby.', ...iotState.systemLog.slice(0, 7)],
    });
    if (soundEnabled) {
      playBuzzerBeep(1500, 80);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Showcase Badge */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Kios IoT Sirkulasi Mandiri
            </h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live Simulator
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Simulasi interaktif lengkap antara Layar Sentuh Kios dengan Perangkat Keras ESP32, RFID, Audio Voice, dan Sensor Barcode.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-sky-50 border border-sky-200 text-sky-800 px-3.5 py-2 rounded-xl">
          <Info className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>Klik tombol simulasi di bawah untuk mencoba alur peminjaman & pengembalian!</span>
        </div>
      </div>

      {/* Main Kiosk Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kios Touchscreen Display (7 cols) */}
        <div className="lg:col-span-7">
          <KioskDisplay
            iotState={iotState}
            onConfirmBorrow={handleConfirmBorrow}
            onConfirmReturn={handleConfirmReturn}
            onCancel={handleReset}
          />
        </div>

        {/* Hardware Simulator & Telemetry Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
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

          {/* Telemetry Console / Serial Log */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 shadow-xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Telemetry Serial Monitor (115200 Baud)
              </span>
              <span className="text-[10px] text-emerald-400">● LIVE</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto text-[11px]">
              {iotState.systemLog.map((log, index) => (
                <div key={index} className="leading-relaxed">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                  <span className={log.includes('TRANSAKSI') ? 'text-emerald-400 font-bold' : log.includes('RFID') ? 'text-sky-300' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

