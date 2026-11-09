'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Book } from '@/types';
import { INITIAL_BOOKS } from '@/data/mockData';
import {
  Search,
  BookOpen,
  MapPin,
  Tag,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  X
} from 'lucide-react';

export default function KatalogPage() {
  const [mounted, setMounted] = useState(false);
  const [books] = useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Kunci scroll halaman ketika popup detail buku terbuka agar paten di posisi tengah
  useEffect(() => {
    if (selectedBook) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBook]);

  const categories = [
    'Semua',
    'Teknologi & IoT',
    'Administrasi Publik',
    'Sejarah & Budaya',
    'Ekonomi',
    'Metodologi Riset',
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.barcode.includes(searchQuery) ||
      book.isbn.includes(searchQuery);

    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FCF9F5] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ======================================================== */}
        {/* SUB-HEADER INFORMASI KOLEKSI PUSTAKA                     */}
        {/* ======================================================== */}
        <div className="bg-white border-t-4 border-orange-500 border-x border-b border-orange-100 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pustaka <span className="text-orange-500 font-bold">Nawasena</span>
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Bakorwil III Malang</span>
            </p>
          </div>

          {/* Counter Jumlah Data */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-600 rounded-xl px-5 py-3 flex flex-col justify-center text-center sm:text-left min-w-[130px] shadow-md shadow-orange-500/20 text-white">
            <div className="text-[11px] font-bold text-orange-100 uppercase tracking-wider">
              Total Koleksi
            </div>
            <div className="text-2xl font-black tracking-tight font-mono leading-none mt-1">
              {filteredBooks.length}{' '}
              <span className="text-xs font-semibold text-orange-200 uppercase tracking-normal">
                Item
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SEARCH & FILTER PANEL                                     */}
        {/* ======================================================== */}
        <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex items-center flex-1 bg-orange-50/30 border border-orange-100 rounded-lg px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
              <Search className="w-4 h-4 text-orange-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan Judul Buku, Penulis, No. ISBN, atau Barcode..."
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => {}}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-wide transition-all rounded-lg shadow-sm shadow-orange-500/10 flex items-center justify-center gap-2 shrink-0"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Cari Koleksi</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOOK GRID CARD LAYOUT                                     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book, idx) => {
            const isAvailable = book.status === 'tersedia';
            return (
              <div
                key={book.id}
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Header Card Status & Kode Eksemplar */}
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded text-[10px]">
                    {book.kodeEksemplar}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      isAvailable
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Tersedia
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-amber-600" /> Dipinjam
                      </>
                    )}
                  </span>
                </div>

                {/* Konten Buku */}
                <div className="p-4 space-y-3">
                  <div className="flex gap-3">
                    {/* Cover Buku */}
                    <div className="relative w-20 h-28 rounded-lg overflow-hidden bg-slate-100 shadow-sm shrink-0 border border-slate-200">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Metadata Singkat */}
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100 inline-block truncate max-w-full">
                        {book.category}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {book.author}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {book.publisher} • {book.year}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50/60 p-2 rounded-lg border border-slate-100">
                    {book.description}
                  </div>
                </div>

                {/* Footer Card */}
                <div className="bg-orange-50/30 border-t border-orange-100 px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[180px]">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="truncate">{book.location}</span>
                  </div>

                  <button
                    onClick={() => setSelectedBook(book)}
                    className="px-3 py-1 bg-white hover:bg-orange-500 hover:text-white text-orange-600 font-bold rounded-lg border border-orange-200 transition-all text-xs shadow-sm"
                  >
                    Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* MODAL DETAIL BUKU (PATEN TEPAT DI TENGAH LAYAR & SMOOTH)  */}
        {/* ======================================================== */}
        {mounted && selectedBook && createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm modal-backdrop-animate select-none"
            onClick={() => setSelectedBook(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 relative border-t-4 border-orange-500 border-x border-b border-orange-100 max-h-[85vh] overflow-y-auto modal-card-animate my-auto"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Header Modal & Tombol Close */}
              <div className="flex justify-between items-start pb-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-md">
                  {selectedBook.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Tutup Popup"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Konten Cover & Detail */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-24 sm:w-28 h-36 sm:h-40 object-cover rounded-xl shadow-md border border-slate-200 shrink-0 mx-auto sm:mx-0"
                />
                <div className="space-y-1.5 min-w-0 flex-1 w-full">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    {selectedBook.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-orange-600 font-semibold">{selectedBook.author}</p>
                  <p className="text-xs text-slate-500">
                    Penerbit: <strong className="text-slate-700">{selectedBook.publisher}</strong> ({selectedBook.year})
                  </p>
                  <div className="pt-2 text-xs font-mono text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>ISBN: <span className="font-bold text-slate-800">{selectedBook.isbn}</span></div>
                    <div>Barcode: <span className="font-bold text-orange-600">{selectedBook.barcode}</span></div>
                    <div>No. Panggil: <span className="font-bold text-slate-800">{selectedBook.callNumber}</span></div>
                  </div>
                </div>
              </div>

              {/* Deskripsi Koleksi */}
              <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Deskripsi Koleksi:</h4>
                <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 text-justify">
                  {selectedBook.description}
                </p>
              </div>

              {/* Lokasi Rak */}
              <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl text-xs sm:text-sm flex justify-between items-center">
                <span className="text-slate-700 font-medium">Lokasi Rak Koleksi:</span>
                <strong className="text-orange-700 font-bold bg-white px-2.5 py-1 rounded-md border border-orange-200 shadow-2xs">
                  {selectedBook.location}
                </strong>
              </div>

              {/* Tombol Tutup Bawah */}
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="px-6 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </div>
  );
}
