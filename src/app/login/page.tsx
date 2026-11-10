'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi login sukses langsung mengarah ke Dashboard Admin
    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 600);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col items-center justify-center px-4 py-16 sm:py-8 font-sans select-none">
      
      {/* Background Gambar Utama Bakorwil dengan Blur & Overlay Gelap (Persis 02_halaman_login.png) */}
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
        <div className="flex justify-center mb-3">
          <Link href="/" title="Ke Beranda Pustaka">
            <div
              className="relative w-[65px] h-[65px] rounded-full overflow-hidden bg-white p-1 hover:scale-105 transition-transform"
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
        <div className="text-center mb-4">
          <h1 className="text-[1.2rem] font-extrabold text-[#1e3a8a] tracking-tight leading-snug">
            Pustaka Nawasena
          </h1>
          <p className="text-[0.8rem] text-[#6b7280]">
            Silakan masuk ke akun Anda
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              autoFocus
              className="w-full px-3 py-2.5 rounded-[10px] border border-[#eee] text-[0.9rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
            />
          </div>

          <div>
            <label className="block text-[0.85rem] font-semibold text-slate-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 pr-10 rounded-[10px] border border-[#eee] text-[0.9rem] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <small className="block text-[0.75rem] text-muted text-slate-500 mt-1 leading-snug">
              *Minimal 8 karakter, kombinasi huruf kapital, dan tanda baca (.,)
            </small>
          </div>

          <div className="text-right text-[0.75rem]">
            <a href="#" className="font-bold text-[#1e3a8a] hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.98] text-white font-bold text-[0.95rem] rounded-[10px] shadow-md transition-all flex items-center justify-center cursor-pointer"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Divider ATAU */}
        <div className="relative flex items-center justify-center my-3.5">
          <div className="border-t border-[#eee] w-full" />
          <span className="bg-white px-2.5 text-[0.75rem] font-bold text-[#ccc] absolute">
            ATAU
          </span>
        </div>

        {/* Google Sign In Button */}
        <div className="mb-2">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="w-full py-2 px-3 border border-[#eee] hover:bg-slate-50 text-slate-800 font-semibold text-[0.85rem] rounded-[10px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-4 h-4"
            />
            <span>Sign In With Google</span>
          </button>
        </div>

        {/* Footer Link Daftar */}
        <p className="text-center text-[0.8rem] text-slate-500 mt-3 mb-0">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="font-bold text-[#f97316] hover:underline transition-colors"
          >
            Daftar
          </Link>
        </p>

      </div>
    </div>
  );
}
