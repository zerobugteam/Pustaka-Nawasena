'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Magic Password Generator (Persis 03_halaman_register.html)
  const generatePassword = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert('Silakan isi "Nama Lengkap" terlebih dahulu untuk menghasilkan rekomendasi sandi!');
      return;
    }

    let cleanName = trimmedName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    if (cleanName.length > 0) {
      cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
    } else {
      cleanName = 'Nawasena';
    }

    const specialChars = '.,';
    const numbers = '0123456789';
    const randomSpecial = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    const randomNum1 = numbers.charAt(Math.floor(Math.random() * numbers.length));
    const randomNum2 = numbers.charAt(Math.floor(Math.random() * numbers.length));

    let result = cleanName + randomSpecial + randomNum1 + randomNum2;
    while (result.length < 8) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    setPassword(result);
    setConfirmPassword(result);
    setShowPassword(true);
    setShowConfirm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Pendaftaran akun berhasil! Silakan masuk.');
      router.push('/login');
    }, 600);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col items-center justify-center px-4 py-16 sm:py-8 font-sans select-none">
      
      {/* Background Gambar Utama Bakorwil dengan Blur & Overlay Gelap (Persis 03_halaman_register.png) */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/utama.jpg"
          alt="Perpustakaan Bakorwil III Malang"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(5px)',
          }}
        />
      </div>

      {/* Tombol Melayang Pojok Kiri Atas: Kembali ke Beranda */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md text-xs font-semibold shadow-md transition-all border border-white/20"
        title="Kembali ke Beranda"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Beranda</span>
      </Link>

      {/* Auth Card Putih di Tengah */}
      <div
        className="relative z-10 w-full max-w-[380px] bg-white rounded-[16px] px-5 sm:px-7 py-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500"
        style={{
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Logo Bulat Pustaka Nawasena */}
        <div className="flex justify-center mb-2.5">
          <Link href="/" title="Ke Beranda Pustaka">
            <div
              className="relative w-[55px] h-[55px] rounded-full overflow-hidden bg-white p-1 hover:scale-105 transition-transform"
              style={{
                boxShadow: '0 4px 10px rgba(249, 115, 22, 0.25)',
              }}
            >
              <Image
                src="/images/kartu.png"
                alt="Logo Pustaka Nawasena"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Header Title */}
        <div className="text-center mb-3">
          <h1 className="text-[1.2rem] font-extrabold text-[#1e3a8a] tracking-tight leading-snug">
            Pustaka Nawasena
          </h1>
          <p className="text-[0.8rem] text-[#6b7280]">
            Pendaftaran Akun Baru
          </p>
        </div>

        {/* Form Register */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              required
              className="w-full px-3 py-2 rounded-[10px] border border-[#eee] text-[0.85rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email aktif"
              required
              className="w-full px-3 py-2 rounded-[10px] border border-[#eee] text-[0.85rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[0.85rem] font-semibold text-slate-700">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={generatePassword}
                className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-orange-600 hover:text-orange-700 transition-colors cursor-pointer bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200"
              >
                <Sparkles className="w-3 h-3" />
                <span>Rekomendasi Sandi</span>
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 pr-9 rounded-[10px] border border-[#eee] text-[0.85rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            <small className="block text-[0.72rem] text-slate-500 mt-0.5 leading-tight">
              *Minimal 8 karakter (kombinasi huruf kapital, kecil, dan tanda baca . ,)
            </small>
          </div>

          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-700 mb-1">
              Konfirmasi Sandi
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 pr-9 rounded-[10px] border border-[#eee] text-[0.85rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.98] text-white font-bold text-[0.95rem] rounded-[10px] shadow-md transition-all flex items-center justify-center cursor-pointer mt-1"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        {/* Footer Link Masuk */}
        <p className="text-center text-[0.8rem] text-slate-500 mt-3 mb-0">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="font-bold text-[#f97316] hover:underline transition-colors"
          >
            Masuk
          </Link>
        </p>

      </div>
    </div>
  );
}
