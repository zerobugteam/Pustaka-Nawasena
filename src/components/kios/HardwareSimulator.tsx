'use client';

import { IotState, Member, Book } from '@/types';
import { Cpu, Radio, CreditCard, Barcode, Volume2, Sparkles, RefreshCcw } from 'lucide-react';
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

  // Pemetaan warna LED RGB fisik
  const ledStyles: Record<string, string> = {
    biru: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.9)]',
    hijau: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.9)] animate-pulse',
    kuning: 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.9)]',
    cyan: 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.9)]',
    merah: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.9)] animate-ping',
    putih: 'bg-slate-100 shadow-[0_0_15px_rgba(241,245,249,0.9)]',
  };

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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl text-slate-100">
      {/* Header Panel */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
              Simulator Hardware IoT ESP32
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40">
                Connected
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">NodeMCU ESP32 • MFRC522 • DFPlayer Mini • LCD 16x2</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Aktifkan Suara Audio Guidance & Buzzer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">{soundEnabled ? 'Audio On' : 'Audio Mute'}</span>
          </button>

          <button
            onClick={onResetSystem}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            title="Reset State Mesin ke Standby"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Komponen Visual: LCD 16x2 & Indikator LED */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
        {/* LCD 16x2 I2C Display */}
        <div className="md:col-span-3 bg-emerald-950/90 border-2 border-emerald-700/80 rounded-xl p-3 shadow-inner">
          <div className="flex items-center justify-between text-[10px] uppercase font-mono text-emerald-400/80 pb-1 mb-1 border-b border-emerald-800/40">
            <span>LCD 16x2 (I2C: 0x27)</span>
            <span className="animate-pulse">● HD44780 ACTIVE</span>
          </div>
          <div className="bg-emerald-900/60 border border-emerald-700/50 rounded-lg p-2.5 font-mono text-emerald-300 text-sm tracking-wider">
            <div className="lcd-font uppercase font-bold truncate h-6">
              {iotState.lcdMessageLine1 || ' NAWASENA SMART '}
            </div>
            <div className="lcd-font uppercase font-semibold text-emerald-400/90 truncate h-6">
              {iotState.lcdMessageLine2 || 'BAKORWIL III MLG'}
            </div>
          </div>
        </div>

        {/* LED RGB & Buzzer Indicator */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col justify-between">
          <div className="text-[10px] uppercase font-mono text-slate-400 pb-1 border-b border-slate-700">
            Hardware State
          </div>
          <div className="flex items-center justify-around py-2">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full transition-all duration-300 ${ledStyles[iotState.ledColor] || ledStyles.biru}`} />
              <span className="text-[9px] font-mono text-slate-400 capitalize">LED ({iotState.ledColor})</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300">
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-mono text-slate-400">DFPlayer</span>
            </div>
          </div>
          <button
            onClick={testAudio}
            className="w-full py-1 text-[10px] font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded border border-slate-600 transition-colors"
          >
            Tes Suara Sambutan
          </button>
        </div>
      </div>

      {/* Simulator Interaktif: Tap Kartu RFID & Scan Barcode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Virtual RFID Cards */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-sky-400" />
              Simulasi Tap Kartu RFID (MFRC522)
            </span>
            <span className="text-[10px] text-slate-400">Klik kartu untuk men-tap</span>
          </div>

          <div className="space-y-2">
            {members.map((member) => (
              <button
                key={member.id}
                onClick={() => handleCardClick(member)}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-sky-950/60 border border-slate-700 hover:border-sky-500/50 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 border border-slate-600">
                    <img src={member.avatar} alt={member.nama} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white group-hover:text-sky-300 transition-colors">
                      {member.nama}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      UID: <span className="text-sky-400 font-bold">{member.rfidUid}</span> • {member.role}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <span>Tap Kartu</span>
                  <Radio className="w-3 h-3 animate-ping" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Virtual Barcode Scanner */}
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Barcode className="w-3.5 h-3.5 text-emerald-400" />
              Simulasi Pindai Barcode Buku
            </span>
            <span className="text-[10px] text-slate-400">Klik buku untuk scan</span>
          </div>

          <div className="space-y-2 max-h-[168px] overflow-y-auto pr-1">
            {books.slice(0, 3).map((book) => {
              const isBorrowed = book.status === 'dipinjam';
              return (
                <button
                  key={book.id}
                  onClick={() => handleBarcodeClick(book)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 text-left transition-all group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-10 rounded bg-slate-700 overflow-hidden flex-shrink-0">
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-medium text-white group-hover:text-emerald-300 transition-colors truncate">
                        {book.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Barcode: <span className="text-emerald-400 font-bold">{book.barcode}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${
                      isBorrowed ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isBorrowed ? 'Uji Pengembalian' : 'Uji Peminjaman'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

