'use client';

import { Transaction, Book, Member } from '@/types';
import { Printer, CheckCircle2, X, BookOpen, Calendar, User, Barcode } from 'lucide-react';

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
  if (!isOpen || !book) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 relative border border-slate-200 print:shadow-none print:border-none print:max-w-full">
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Receipt Header */}
        <div className="text-center space-y-1 pb-3 border-b border-dashed border-slate-300">
          <div className="w-10 h-10 mx-auto rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">PUSTAKA NAWASENA</h3>
          <p className="text-[10px] text-slate-500 font-medium">Bakorwil III Malang — Jawa Timur</p>
          <p className="text-[9px] text-slate-400 font-mono">KIOS SIRKULASI MANDIRI • IOT ENABLED</p>
        </div>

        {/* Receipt Metadata */}
        <div className="text-[11px] font-mono text-slate-600 space-y-1.5 py-1">
          <div className="flex justify-between">
            <span className="text-slate-400">No. Trx:</span>
            <strong className="text-slate-800">{transaction?.transactionCode || 'TRX-ONLINE-001'}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Waktu:</span>
            <span>{new Date().toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-700 font-bold uppercase">TERCATAT SUKSES</span>
          </div>
        </div>

        {/* Book & Member Info */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] space-y-2">
          <div>
            <span className="text-[10px] text-slate-400 font-mono">JUDUL BUKU:</span>
            <div className="font-bold text-slate-900 leading-snug">{book.title}</div>
            <div className="text-[10px] text-slate-500">{book.author}</div>
          </div>

          <div className="pt-1.5 border-t border-slate-200 flex justify-between">
            <span className="text-slate-400 font-mono text-[10px]">KODE EKS:</span>
            <span className="font-mono font-semibold text-slate-800">{book.kodeEksemplar}</span>
          </div>

          {member && (
            <div className="pt-1.5 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-mono">PEMINJAM:</span>
              <div className="font-semibold text-slate-900">{member.nama}</div>
              <div className="text-[10px] font-mono text-slate-500">UID: {member.rfidUid} • {member.role}</div>
            </div>
          )}

          <div className="pt-1.5 border-t border-slate-200 flex justify-between text-rose-700 font-bold">
            <span className="font-mono text-[10px]">TENGGAT KEMBALI:</span>
            <span>
              {transaction?.tenggatKembali || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            </span>
          </div>
        </div>

        {/* Barcode Graphic Simulation */}
        <div className="text-center pt-1 pb-2">
          <div className="font-mono text-xl tracking-[0.25em] text-slate-800 font-bold select-none">
            ||||| | |||| || |||||| | ||
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1">{book.barcode}</div>
        </div>

        <p className="text-[9px] text-center text-slate-400 leading-tight">
          Harap kembalikan buku sebelum tenggat waktu. Simpan struk digital ini sebagai bukti peminjaman sah.
        </p>

        {/* Action Buttons (Hidden on Print) */}
        <div className="flex gap-2 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Struk</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

