'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transaction, Book, Member } from '@/types';
import { Printer, X, BookOpen } from 'lucide-react';

interface PrintReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  book: Book | null;
  member: Member | null;
}

export default function PrintReceiptModal({
  isOpen,
  onClose,
  transaction,
  book,
  member,
}: PrintReceiptModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !book) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedTime = new Date()
    .toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\./g, ':');

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-[2px] modal-backdrop-animate print:static print:block print:p-0 print:bg-white print:backdrop-blur-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-4 relative border border-slate-200 modal-card-animate print:shadow-none print:border print:border-slate-300 print:rounded-2xl print:max-w-[620px] print:mx-auto print:max-h-none print:overflow-visible print:p-10 print:space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup jendela struk"
          className="absolute right-3 top-3 w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Receipt Header */}
        <div className="text-center space-y-0.5 pb-3 border-b border-dashed border-slate-300 print:pb-5 print:space-y-1.5">
          <BookOpen className="w-6 h-6 mx-auto text-orange-600 mb-1 print:w-10 print:h-10 print:mb-2" aria-hidden="true" />
          <h3 id="receipt-modal-title" className="font-extrabold text-slate-900 text-sm tracking-tight print:text-2xl">
            PUSTAKA NAWASENA
          </h3>
          <p className="text-xs text-slate-600 font-medium print:text-base">Bakorwil III Malang, Jawa Timur</p>
          <p className="text-[11px] text-slate-500 font-semibold tracking-wider print:text-sm">KIOS SIRKULASI MANDIRI</p>
        </div>

        {/* Receipt Metadata */}
        <div className="text-xs text-slate-700 tabular-nums space-y-1 print:text-base print:space-y-2.5">
          <div className="flex justify-between">
            <span className="text-slate-500">No. Trx</span>
            <strong className="text-slate-900">{transaction?.transactionCode || 'TRX-KIOS'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Waktu</span>
            <span>{formattedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="text-emerald-700 font-bold uppercase">Tercatat Sukses</span>
          </div>
        </div>

        {/* Book & Member Info */}
        <div className="border-y border-dashed border-slate-300 py-3 text-xs space-y-2 print:py-5 print:text-base print:space-y-3.5">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide print:text-xs">Judul Buku</span>
            <div className="font-bold text-slate-900 leading-snug print:text-lg print:mt-0.5">{book.title}</div>
            <div className="text-xs text-slate-600 print:text-sm">{book.author}</div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between print:pt-3">
            <span className="text-slate-500">Kode Eksemplar</span>
            <span className="font-semibold text-slate-900 tabular-nums">{book.kodeEksemplar}</span>
          </div>

          {member && (
            <div className="pt-2 border-t border-slate-100 print:pt-3">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide print:text-xs">Peminjam</span>
              <div className="font-semibold text-slate-900 print:text-base print:mt-0.5">{member.nama}</div>
              <div className="text-[11px] text-slate-600 tabular-nums print:text-sm">UID {member.rfidUid} — {member.role}</div>
            </div>
          )}

          {transaction?.tenggatKembali && (
            <div className="pt-2 border-t border-slate-100 flex justify-between text-amber-800 font-bold tabular-nums print:pt-3">
              <span className="uppercase text-[11px] print:text-sm">Tenggat Kembali</span>
              <span>{transaction.tenggatKembali}</span>
            </div>
          )}
        </div>

        {/* Barcode Text */}
        <div className="text-center">
          <div className="text-xs text-slate-700 font-bold tabular-nums print:text-base">Kode Barcode: {book.barcode}</div>
        </div>

        <p className="text-[11px] text-center text-slate-500 leading-snug print:text-sm">
          Harap kembalikan buku sebelum tenggat waktu. Simpan struk ini sebagai bukti transaksi sah.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 min-h-[42px] py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Cetak Struk</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
