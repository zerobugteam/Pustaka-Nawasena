'use client';

import { IotState } from '@/types';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CreditCard,
  Barcode,
  Calendar,
  UserCheck,
  Printer
} from 'lucide-react';

interface KioskDisplayProps {
  iotState: IotState;
  onConfirmBorrow: () => void;
  onConfirmReturn: () => void;
  onCancel: () => void;
}

export default function KioskDisplay({
  iotState,
  onConfirmBorrow,
  onConfirmReturn,
  onCancel,
}: KioskDisplayProps) {
  const { mode, activeBook, activeMember, activeTransaction } = iotState;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[520px]">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-100/50 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Status Bar Kios */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Kios Mandiri Pustaka Nawasena</h2>
            <p className="text-xs text-slate-500 font-medium">Layanan Sirkulasi Mandiri Otomatis • Bakorwil III Malang</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-600 capitalize">
            Mode: <strong className="text-sky-700">{mode.replace('_', ' ')}</strong>
          </span>
        </div>
      </div>

      {/* Main Content Area based on IoT Mode */}
      <div className="py-6 relative z-10 flex-1 flex flex-col justify-center">

        {/* 1. STATE: STANDBY */}
        {mode === 'standby' && (
          <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-inner">
              <Barcode className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Silakan Pindai Barcode Buku</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Arahkan barcode pada stiker buku ke sensor pemindai atau klik salah satu buku pada panel simulator di bawah.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Sistem mendeteksi otomatis: Peminjaman Buku Baru atau Pengembalian</span>
            </div>
          </div>
        )}

        {/* 2. STATE: SCAN MEMBER (WAITING FOR RFID) */}
        {mode === 'scan_member' && activeBook && (
          <div className="space-y-6">
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={activeBook.coverImage}
                alt={activeBook.title}
                className="w-16 h-24 object-cover rounded-lg shadow-sm flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-sky-700 uppercase bg-sky-100 px-2 py-0.5 rounded-full">
                  Buku Teridentifikasi
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{activeBook.title}</h4>
                <p className="text-xs text-slate-600 font-medium">Penulis: {activeBook.author}</p>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">Kode: {activeBook.kodeEksemplar} • Lokasi: {activeBook.location}</p>
              </div>
            </div>

            <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 animate-pulse">
                <CreditCard className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Tempelkan Kartu Anggota Anda</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Silakan tap kartu RFID perpustakaan pada pemindai MFRC522 untuk melanjutkan peminjaman.
              </p>
            </div>
          </div>
        )}

        {/* 3. STATE: IDENTIFIED (READY TO CONFIRM BORROW) */}
        {mode === 'identified' && activeBook && activeMember && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Detail Buku */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3">
                <img
                  src={activeBook.coverImage}
                  alt={activeBook.title}
                  className="w-16 h-24 object-cover rounded-lg shadow-sm flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                    Siap Dipinjam
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{activeBook.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{activeBook.author}</p>
                  <div className="mt-2 text-[11px] text-slate-600 font-mono">
                    Tenggat: <strong className="text-sky-700">14 Hari ke Depan</strong>
                  </div>
                </div>
              </div>

              {/* Detail Anggota */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 flex gap-3">
                <img
                  src={activeMember.avatar}
                  alt={activeMember.nama}
                  className="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0 border border-sky-300"
                />
                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold text-sky-700 uppercase bg-sky-100 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                    <UserCheck className="w-3 h-3" /> Anggota Valid
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{activeMember.nama}</h4>
                  <p className="text-xs text-slate-500 truncate">{activeMember.role} • NIK/NIP: {activeMember.nikNip}</p>
                  <p className="text-[11px] font-mono text-sky-700 mt-1">UID: {activeMember.rfidUid}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>
                Dengan menekan <strong>Konfirmasi Peminjaman</strong>, transaksi Anda akan tersimpan otomatis dan tercatat dalam sistem sirkulasi Bakorwil III.
              </span>
            </div>
          </div>
        )}

        {/* 4. STATE: RETURN CONFIRMATION */}
        {activeTransaction && activeBook && mode === 'identified' && !activeMember && (
          <div className="space-y-5 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
              <RotateCcw className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">
                Konfirmasi Pengembalian
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{activeBook.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Dipinjam oleh: <strong>{activeTransaction.memberName}</strong> sejak {activeTransaction.tanggalPinjam}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-600 text-left space-y-1">
              <div className="flex justify-between">
                <span>Kode Transaksi:</span>
                <strong className="font-mono">{activeTransaction.transactionCode}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tenggat Pengembalian:</span>
                <strong className="text-slate-800">{activeTransaction.tenggatKembali}</strong>
              </div>
              <div className="flex justify-between">
                <span>Denda / Status:</span>
                <strong className="text-emerald-600">Bebas Denda / Tepat Waktu</strong>
              </div>
            </div>
          </div>
        )}

        {/* 5. STATE: SUCCESS */}
        {mode === 'success' && (
          <div className="text-center py-6 space-y-5 max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Transaksi Berhasil!</h3>
              <p className="text-slate-600 text-sm mt-1">
                Terima kasih telah memanfaatkan fasilitas mandiri Pustaka Nawasena Bakorwil III Malang.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 space-y-2 text-left">
              <div className="flex items-center justify-between font-semibold border-b border-slate-200 pb-2">
                <span>Bukti Struk Digital</span>
                <span className="text-emerald-600 font-bold">LUNAS / TERCATAT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Buku:</span>
                <span className="font-medium truncate max-w-[200px]">{activeBook?.title}</span>
              </div>
              {activeMember && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Peminjam:</span>
                  <span className="font-medium">{activeMember.nama}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. STATE: ERROR */}
        {mode === 'error' && (
          <div className="text-center py-8 space-y-4 max-w-sm mx-auto">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Akses Tidak Dikenali</h3>
              <p className="text-xs text-slate-500 mt-1">
                Kartu RFID atau Barcode tidak terdaftar dalam database perpustakaan.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between">
        {mode !== 'standby' ? (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Batal / Kembali ke Awal
          </button>
        ) : (
          <span className="text-xs text-slate-400">Siap melayani sirkulasi buku</span>
        )}

        <div className="flex items-center gap-3">
          {mode === 'identified' && activeBook && activeMember && (
            <button
              onClick={onConfirmBorrow}
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Konfirmasi Peminjaman</span>
            </button>
          )}

          {mode === 'identified' && activeTransaction && (
            <button
              onClick={onConfirmReturn}
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Konfirmasi Pengembalian</span>
            </button>
          )}

          {mode === 'success' && (
            <button
              onClick={onCancel}
              className="px-6 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
            >
              Transaksi Baru
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

