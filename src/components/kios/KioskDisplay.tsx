'use client';

import { useState, useRef, useEffect } from 'react';
import { IotState } from '@/types';
import {
  Barcode,
  CreditCard,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  Printer,
  ArrowRight,
  BookOpen,
  UserCheck,
  Calendar,
} from 'lucide-react';

interface KioskDisplayProps {
  iotState: IotState;
  errorMessage?: string | null;
  onManualBarcodeSubmit: (barcode: string) => void;
  onConfirmBorrow: () => void;
  onConfirmReturn: () => void;
  onOpenReceipt: () => void;
  onCancel: () => void;
}

export default function KioskDisplay({
  iotState,
  errorMessage,
  onManualBarcodeSubmit,
  onConfirmBorrow,
  onConfirmReturn,
  onOpenReceipt,
  onCancel,
}: KioskDisplayProps) {
  const { mode, activeBook, activeMember, activeTransaction } = iotState;
  const [barcodeInput, setBarcodeInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'standby') {
      setBarcodeInput('');
    }
  }, [mode]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = barcodeInput.trim();
    if (!cleaned) return;
    onManualBarcodeSubmit(cleaned);
  };

  const steps = [
    { num: 1, title: 'Pindai Barcode', desc: 'Arahkan stiker barcode buku ke sensor atau ketik kode' },
    { num: 2, title: 'Validasi Koleksi', desc: 'Sistem memeriksa ketersediaan buku secara otomatis' },
    { num: 3, title: 'Scan Kartu Anggota', desc: 'Tempelkan kartu RFID anggota pada pembaca' },
    { num: 4, title: 'Konfirmasi Transaksi', desc: 'Selesaikan peminjaman atau pengembalian buku' },
  ];

  const isBorrowReady = mode === 'identified' && activeBook && activeMember;
  const isReturnReady = mode === 'identified' && activeBook && activeTransaction && !activeMember;
  const stateTransitionKey = `${mode}-${activeBook?.id ?? 'none'}-${activeMember?.id ?? 'none'}`;

  return (
    <section
      aria-label="Layar Utama Kios Mandiri"
      className="bg-white w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 min-h-[460px] transition-all duration-300 ease-out"
    >
      {/* Sisi Kiri: Informasi Alur, Detail Transaksi & Tombol Aksi */}
      <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
        <div key={stateTransitionKey} className="my-auto animate-kiosk-enter">
        {/* 1. STATE: STANDBY */}
        {mode === 'standby' && (
          <div className="my-auto space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Layanan <span className="text-orange-600">Mandiri</span>
              </h2>
              <p className="text-sm text-slate-500 mt-1.5">
                Ikuti langkah berikut untuk peminjaman atau pengembalian koleksi.
              </p>
            </div>

            <ol className="space-y-4">
              {steps.map((step) => (
                <li key={step.num} className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 2. STATE: SCAN MEMBER (MENUNGGU KARTU RFID) */}
        {mode === 'scan_member' && activeBook && (
          <div className="space-y-5 my-auto">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                Langkah 3 dari 4
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Tempelkan Kartu Anggota
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Buku tersedia untuk dipinjam. Silakan tap kartu RFID Anda pada pembaca di panel uji coba atau perangkat.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-start gap-4">
              <img
                src={activeBook.coverImage}
                alt={`Sampul ${activeBook.title}`}
                width={64}
                height={92}
                className="w-16 h-24 object-cover rounded-lg border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{activeBook.title}</h3>
                <p className="text-xs text-slate-600">{activeBook.author}</p>
                <p className="text-xs text-slate-700 tabular-nums pt-1">
                  Kode: {activeBook.kodeEksemplar} | Rak: {activeBook.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. STATE: IDENTIFIED - KONFIRMASI PEMINJAMAN */}
        {isBorrowReady && (
          <div className="space-y-5 my-auto">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                Siap Konfirmasi
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Konfirmasi Peminjaman
              </h2>
            </div>

            <div className="border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <img
                  src={activeBook.coverImage}
                  alt={`Sampul ${activeBook.title}`}
                  width={48}
                  height={68}
                  className="w-12 h-16 object-cover rounded-md border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase">Buku</p>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                    {activeBook.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 tabular-nums mt-1">{activeBook.kodeEksemplar}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={activeMember.avatar}
                  alt={`Foto ${activeMember.nama}`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                    <span>Peminjam</span>
                  </p>
                  <h3 className="text-xs font-bold text-slate-900 truncate">{activeMember.nama}</h3>
                  <p className="text-[11px] text-slate-600 tabular-nums mt-1">UID: {activeMember.rfidUid}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 text-xs text-amber-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
              <span>
                Masa peminjaman berlaku <strong>14 hari kalender</strong> sejak transaksi dikonfirmasi.
              </span>
            </div>
          </div>
        )}

        {/* 4. STATE: IDENTIFIED - KONFIRMASI PENGEMBALIAN */}
        {isReturnReady && (
          <div className="space-y-5 my-auto">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                Pengembalian Koleksi
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                Konfirmasi Pengembalian
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Buku terdeteksi dalam status sedang dipinjam. Periksa rincian berikut sebelum menyelesaikan pengembalian.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4 space-y-2.5 text-xs">
              <div className="font-bold text-sm text-slate-900">{activeBook.title}</div>
              <div className="flex justify-between text-slate-600">
                <span>Peminjam Saat Ini</span>
                <strong className="text-slate-900">{activeTransaction.memberName}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kode Transaksi</span>
                <strong className="tabular-nums text-slate-900">{activeTransaction.transactionCode}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tenggat Kembali</span>
                <strong className="tabular-nums text-slate-900">{activeTransaction.tenggatKembali}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 5. STATE: SUCCESS */}
        {mode === 'success' && activeBook && (
          <div className="space-y-5 my-auto">
            <div className="flex items-center gap-3.5">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Transaksi Berhasil</h2>
                <p className="text-xs text-slate-600">
                  Data sirkulasi telah diperbarui pada sistem Pustaka Nawasena.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800 pb-2 border-b border-slate-100">
                <span>Ringkasan Bukti Transaksi</span>
                <span className="text-emerald-700">TERCATAT</span>
              </div>
              <div className="flex justify-between text-slate-600 gap-4">
                <span>Judul Buku</span>
                <strong className="text-slate-900 text-right">{activeBook.title}</strong>
              </div>
              {activeMember && (
                <div className="flex justify-between text-slate-600">
                  <span>Nama Anggota</span>
                  <strong className="text-slate-900">{activeMember.nama}</strong>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Status Buku</span>
                <strong className="text-slate-900 uppercase">{activeBook.status === 'dipinjam' ? 'Dipinjam' : 'Tersedia di Rak'}</strong>
              </div>
            </div>
          </div>
        )}

        {/* 6. STATE: ERROR */}
        {mode === 'error' && (
          <div className="space-y-4 my-auto">
            <div className="flex items-center gap-3.5">
              <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Pemindaian Gagal</h2>
                <p className="text-xs text-slate-600">Data tidak ditemukan dalam katalog</p>
              </div>
            </div>
            <p className="text-sm text-rose-700 border-l-2 border-rose-500 pl-3.5 py-1 leading-relaxed">
              {errorMessage || 'Kode barcode atau kartu anggota tidak terdaftar. Periksa kembali kode buku atau gunakan daftar buku pada panel simulasi.'}
            </p>
          </div>
        )}
        </div>

        {/* Footer Aksi Kiosk */}
        <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {mode !== 'standby' ? (
            <button
              type="button"
              onClick={onCancel}
              className="min-h-[44px] px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
            >
              {mode === 'success' ? 'Kembali ke Awal' : 'Batalkan Transaksi'}
            </button>
          ) : (
            <span className="text-xs font-medium text-slate-600">
              Siap melayani peminjaman dan pengembalian
            </span>
          )}

          <div className="flex flex-wrap items-center gap-2.5">
            {isBorrowReady && (
              <button
                type="button"
                onClick={onConfirmBorrow}
                className="min-h-[44px] px-5 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm transition-all duration-200 ease-out active:scale-[0.98] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>Konfirmasi Peminjaman</span>
              </button>
            )}

            {isReturnReady && (
              <button
                type="button"
                onClick={onConfirmReturn}
                className="min-h-[44px] px-5 py-2.5 text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-sm transition-all duration-200 ease-out active:scale-[0.98] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Konfirmasi Pengembalian</span>
              </button>
            )}

            {mode === 'success' && (
              <>
                <button
                  type="button"
                  onClick={onOpenReceipt}
                  className="min-h-[44px] px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all duration-200 ease-out active:scale-[0.98] flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Cetak Struk</span>
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                >
                  Transaksi Baru
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Area Pemindaian Fisik (Navy Kontras Tinggi, Sesuai 05_kios_scan_barcode.html) */}
      <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-10 flex flex-col justify-center items-center text-center text-white">
        <div key={`right-${mode}`} className="w-full flex justify-center animate-kiosk-enter">
        {(mode === 'standby' || mode === 'error') && (
          <div className="w-full max-w-xs space-y-5">
            <Barcode className="w-11 h-11 mx-auto text-orange-400" aria-hidden="true" />

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Siap Memindai
              </h3>
              <p className="text-xs text-slate-400">
                Ketik atau pindai kode barcode buku lalu tekan Enter
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <label htmlFor="kiosk-barcode-input" className="sr-only">
                Kode Barcode Buku
              </label>
              <input
                ref={inputRef}
                id="kiosk-barcode-input"
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Contoh: 9786020388123"
                autoComplete="off"
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-orange-500 text-white placeholder-slate-400 text-center tabular-nums text-sm font-semibold focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all duration-200 ease-out active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <span>Proses Barcode</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        )}

        {mode === 'scan_member' && (
          <div className="w-full max-w-xs space-y-4">
            <CreditCard className="w-11 h-11 mx-auto text-orange-400" aria-hidden="true" />
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Verifikasi Identitas
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menunggu pembacaan kartu RFID anggota. Pilih kartu pada panel uji di bawah untuk simulasi tap kartu.
              </p>
            </div>
          </div>
        )}

        {mode === 'identified' && (
          <div className="w-full max-w-xs space-y-4">
            <BookOpen className="w-11 h-11 mx-auto text-emerald-400" aria-hidden="true" />
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Data Terverifikasi
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Silakan periksa detail transaksi di sebelah kiri lalu tekan tombol konfirmasi.
              </p>
            </div>
          </div>
        )}

        {mode === 'success' && (
          <div className="w-full max-w-xs space-y-4">
            <CheckCircle2 className="w-11 h-11 mx-auto text-emerald-400" aria-hidden="true" />
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Selesai
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Terima kasih telah menggunakan Layanan Mandiri Pustaka Nawasena.
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
