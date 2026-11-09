'use client';

import { useState } from 'react';
import { Book, Member, Transaction } from '@/types';
import { INITIAL_BOOKS, INITIAL_MEMBERS, INITIAL_TRANSACTIONS } from '@/data/mockData';
import {
  BookOpen,
  Users,
  Repeat,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Barcode,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';

export default function AdminPage() {
  const [books] = useState<Book[]>(INITIAL_BOOKS);
  const [members] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'transaksi' | 'buku' | 'anggota'>('transaksi');

  const totalBuku = books.length;
  const dipinjam = books.filter((b) => b.status === 'dipinjam').length;
  const anggotaAktif = members.filter((m) => m.status === 'aktif').length;
  const totalTransaksi = transactions.length;

  const statCards = [
    { label: 'Total Koleksi Buku', value: totalBuku, icon: BookOpen, color: 'text-orange-600 bg-orange-50' },
    { label: 'Buku Sedang Dipinjam', value: dipinjam, icon: Repeat, color: 'text-amber-600 bg-amber-50' },
    { label: 'Anggota Aktif Terdaftar', value: anggotaAktif, icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Total Riwayat Sirkulasi', value: totalTransaksi, icon: Layers, color: 'text-slate-700 bg-slate-100' },
  ];

  return (
    <div className="min-h-screen bg-[#FCF9F5] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Dashboard Khas Nawasena */}
        <div className="bg-white border-t-4 border-orange-500 border-x border-b border-orange-100 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-md text-orange-800 font-bold uppercase tracking-wider text-[10px] mb-1">
              <MapPin className="w-3 h-3 text-orange-500" />
              <span>Sirkulasi & Keanggotaan — Bakorwil III Malang</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Admin & Sirkulasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Monitoring sirkulasi buku real-time, status inventaris eksemplar, dan keanggotaan RFID.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Gateway IoT Aktif
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-white border border-orange-100 rounded-xl p-5 shadow-sm space-y-3 hover:border-orange-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                  <div className={`p-2.5 rounded-xl ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">{card.value}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-orange-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('transaksi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'transaksi'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            Riwayat Transaksi Sirkulasi
          </button>
          <button
            onClick={() => setActiveTab('buku')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'buku'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            Manajemen Buku & Barcode
          </button>
          <button
            onClick={() => setActiveTab('anggota')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'anggota'
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            Daftar Anggota & Kartu RFID
          </button>
        </div>

        {/* TAB 1: TRANSAKSI */}
        {activeTab === 'transaksi' && (
          <div className="bg-white border border-orange-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Daftar Transaksi Peminjaman & Pengembalian</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-orange-50/60 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-orange-100">
                  <tr>
                    <th className="p-4">Kode Transaksi</th>
                    <th className="p-4">Buku</th>
                    <th className="p-4">Anggota</th>
                    <th className="p-4">Tgl Pinjam</th>
                    <th className="p-4">Tenggat</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-orange-600">{trx.transactionCode}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{trx.bookTitle}</div>
                        <div className="font-mono text-slate-400 text-[10px]">{trx.bookBarcode}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900">{trx.memberName}</div>
                        <div className="font-mono text-slate-400 text-[10px]">UID: {trx.memberUid}</div>
                      </td>
                      <td className="p-4 text-slate-600">{trx.tanggalPinjam}</td>
                      <td className="p-4 text-slate-600">{trx.tenggatKembali}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                            trx.status === 'dipinjam'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BUKU */}
        {activeTab === 'buku' && (
          <div className="bg-white border border-orange-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Koleksi Eksemplar & Barcode</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-orange-50/60 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-orange-100">
                  <tr>
                    <th className="p-4">Buku & Pengarang</th>
                    <th className="p-4">Kode Eksemplar</th>
                    <th className="p-4">Barcode Code128</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{b.title}</div>
                        <div className="text-slate-500 text-[11px]">{b.author} • {b.publisher} ({b.year})</div>
                      </td>
                      <td className="p-4 font-mono font-medium text-slate-800">{b.kodeEksemplar}</td>
                      <td className="p-4 font-mono font-bold text-orange-600">{b.barcode}</td>
                      <td className="p-4">{b.category}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                            b.status === 'tersedia'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ANGGOTA */}
        {activeTab === 'anggota' && (
          <div className="bg-white border border-orange-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Daftar Anggota & Kartu RFID</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-orange-50/60 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-orange-100">
                  <tr>
                    <th className="p-4">Anggota</th>
                    <th className="p-4">NIK / NIP</th>
                    <th className="p-4">RFID UID (MFRC522)</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-orange-50/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={m.avatar} alt={m.nama} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900">{m.nama}</div>
                          <div className="text-slate-400 text-[11px]">{m.email}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-700">{m.nikNip}</td>
                      <td className="p-4 font-mono font-bold text-orange-600">{m.rfidUid}</td>
                      <td className="p-4 font-medium text-slate-700">{m.role}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full font-bold text-[10px] uppercase bg-emerald-100 text-emerald-800">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
