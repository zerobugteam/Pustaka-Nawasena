'use client';

import { useState } from 'react';
import { IotState, Member, Book } from '@/types';
import {
  Barcode,
  CreditCard,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronDown,
  ArrowRight,
  Monitor,
  CircleUserRound,
} from 'lucide-react';
import { playBuzzerBeep, playVoicePrompt, DFPLAYER_TRACKS } from '@/utils/soundEffects';

interface HardwareSimulatorProps {
  iotState: IotState;
  members: Member[];
  books: Book[];
  onScanCard: (member: Member) => void;
  onScanBarcode: (book: Book) => void;
  onResetSystem: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export default function HardwareSimulator({
  iotState,
  members,
  books,
  onScanCard,
  onScanBarcode,
  onResetSystem,
  soundEnabled,
  setSoundEnabled,
}: HardwareSimulatorProps) {
  const [showLogs, setShowLogs] = useState(false);

  const ledLabelMap: Record<string, { badgeClass: string; label: string }> = {
    biru: { badgeClass: 'bg-slate-100 text-slate-700', label: 'Siaga' },
    hijau: { badgeClass: 'bg-emerald-50 text-emerald-700', label: 'Siap' },
    kuning: { badgeClass: 'bg-amber-50 text-amber-700', label: 'Pengembalian' },
    cyan: { badgeClass: 'bg-sky-50 text-sky-700', label: 'Tervalidasi' },
    merah: { badgeClass: 'bg-rose-50 text-rose-700', label: 'Galat' },
    putih: { badgeClass: 'bg-slate-100 text-slate-700', label: 'Siaga' },
  };

  const activeLed = ledLabelMap[iotState.ledColor] || ledLabelMap.biru;

  const handleCardClick = (member: Member) => {
    if (soundEnabled) {
      playBuzzerBeep(2400, 150);
    }
    onScanCard(member);
  };

  const handleBarcodeClick = (book: Book) => {
    if (soundEnabled) {
      playBuzzerBeep(1800, 120);
    }
    onScanBarcode(book);
  };

  const testAudio = () => {
    playBuzzerBeep(2200, 100);
    playVoicePrompt(DFPLAYER_TRACKS.BOOT);
  };

  return (
    <section
      aria-label="Panel Uji Simulasi Perangkat Kios"
      className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl w-full max-w-5xl mx-auto space-y-5 sm:space-y-6 transition-all duration-300 ease-out"
    >
      {/* Header Clean */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Simulasi Perangkat Kios
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Uji pemindaian barcode buku dan kartu anggota secara langsung
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={testAudio}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
          >
            Tes Suara
          </button>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 ${
              soundEnabled
                ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{soundEnabled ? 'Suara Aktif' : 'Suara Mati'}</span>
          </button>

          <button
            type="button"
            onClick={onResetSystem}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center gap-1.5 active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Strip Status Ringkas */}
      <div className="bg-slate-50/80 rounded-2xl px-3.5 sm:px-4 py-2.5 flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 min-w-0 max-w-full">
          <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-slate-800 tabular-nums truncate">
            {iotState.lcdMessageLine1 || 'NAWASENA SMART'} — {iotState.lcdMessageLine2 || 'BAKORWIL III MLG'}
          </span>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors duration-300 ${activeLed.badgeClass}`}>
          {activeLed.label}
        </span>
      </div>

      {/* Dua Kolom Clean Tanpa Card Bersarang */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom 1: Pindai Barcode Buku */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Barcode className="w-4 h-4 text-orange-600" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pindai Barcode Buku
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {books.slice(0, 4).map((book) => {
              const isBorrowed = book.status === 'dipinjam';
              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => handleBarcodeClick(book)}
                  className="group w-full flex items-center justify-between gap-3 py-3 px-2 -mx-2 rounded-xl hover:bg-slate-50 active:scale-[0.99] text-left transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-950 truncate transition-colors">
                      {book.title}
                    </div>
                    <div className="text-xs text-slate-400 tabular-nums mt-0.5">
                      {book.barcode}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 transition-all duration-200 ${
                      isBorrowed
                        ? 'bg-amber-50 text-amber-700 group-hover:bg-amber-100'
                        : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                    }`}
                  >
                    <span>{isBorrowed ? 'Kembalikan' : 'Pinjam'}</span>
                    <ArrowRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kolom 2: Tap Kartu Anggota */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-orange-600" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tap Kartu Anggota (RFID)
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {members.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => handleCardClick(member)}
                className="group w-full flex items-center justify-between gap-3 py-3 px-2 -mx-2 rounded-xl hover:bg-slate-50 active:scale-[0.99] text-left transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <CircleUserRound
                    className="w-9 h-9 text-slate-400 shrink-0"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-950 truncate transition-colors">
                      {member.nama}
                    </div>
                    <div className="text-xs text-slate-400 tabular-nums mt-0.5 truncate">
                      UID {member.rfidUid} — {member.role}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-700 shrink-0 transition-all duration-200">
                  <span>Tap</span>
                  <ArrowRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catatan Aktivitas Kios (Collapsible Smooth) */}
      <div className="border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => setShowLogs(!showLogs)}
          aria-expanded={showLogs}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${showLogs ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          <span>Riwayat Aktivitas ({iotState.systemLog.length})</span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            showLogs ? 'grid-rows-[1fr] opacity-100 mt-2.5' : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 text-xs text-slate-500 tabular-nums max-h-36 overflow-y-auto pl-1">
              {iotState.systemLog.map((log, index) => (
                <li key={index} className="leading-relaxed">
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
