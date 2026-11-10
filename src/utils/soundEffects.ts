// Web Audio API Synthesizer for Buzzer + SpeechSynthesis for DFPlayer Audio

export function playBuzzerBeep(frequency = 2400, durationMs = 150) {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + durationMs / 1000);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + durationMs / 1000);
  } catch {
    // Ignore audio context error if user hasn't interacted with page
  }
}

export function playVoicePrompt(text: string) {
  if (typeof window === 'undefined') return;
  try {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Hentikan suara sebelumnya

    const spokenText = text.replace(/\bRFID\b/gi, 'R, F, I, D');
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;

    // Cari suara bahasa Indonesia jika tersedia
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis errors
  }
}

export const DFPLAYER_TRACKS = {
  BOOT: 'Selamat datang di Sistem Perpustakaan Cerdas Nawasena, Bakorwil Tiga Malang.',
  SCAN_MEMBER: 'Silakan tempelkan kartu anggota Anda pada pemindai R, F, I, D.',
  MEMBER_VALID: 'Kartu anggota terverifikasi. Silakan periksa detail transaksi pada layar.',
  ERROR_REJECTED: 'Mohon maaf, akses ditolak atau kartu tidak terdaftar. Silakan coba lagi.',
  SUCCESS_BORROW: 'Peminjaman buku berhasil diselesaikan. Terima kasih telah menggunakan Pustaka Nawasena.',
  SUCCESS_RETURN: 'Buku berhasil dikembalikan. Terima kasih telah mematuhi tenggat waktu perpustakaan.',
  ADMIN_MODE: 'Mode registrasi kartu anggota baru aktif.',
};

