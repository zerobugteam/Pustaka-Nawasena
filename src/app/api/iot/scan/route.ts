import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_BOOKS, INITIAL_MEMBERS } from '@/data/mockData';

// API Endpoint untuk menerima data dari Hardware ESP32 atau IoT Bridge
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, payload } = body; // type: 'rfid' | 'barcode'

    if (!payload) {
      return NextResponse.json({ status: 'error', message: 'Payload kosong' }, { status: 400 });
    }

    if (type === 'barcode') {
      const book = INITIAL_BOOKS.find(
        (b) => b.barcode === payload || b.kodeEksemplar === payload
      );

      if (!book) {
        return NextResponse.json({
          status: 'not_found',
          message: 'Buku tidak ditemukan dalam katalog',
          soundTrack: 3, // Audio: Error / Ditolak
        }, { status: 404 });
      }

      return NextResponse.json({
        status: 'success',
        action: book.status === 'dipinjam' ? 'return_prompt' : 'scan_member_prompt',
        book,
        soundTrack: book.status === 'dipinjam' ? 4 : 6, // Track 6: "Tempelkan kartu anggota"
      });
    }

    if (type === 'rfid') {
      const member = INITIAL_MEMBERS.find(
        (m) => m.rfidUid.toUpperCase() === payload.toUpperCase()
      );

      if (!member) {
        return NextResponse.json({
          status: 'unregistered',
          message: 'Kartu RFID belum terdaftar',
          soundTrack: 3, // Audio: Akses ditolak
        }, { status: 404 });
      }

      return NextResponse.json({
        status: 'success',
        action: 'member_identified',
        member,
        soundTrack: 4, // Track 4: "Kartu terverifikasi"
      });
    }

    return NextResponse.json({ status: 'error', message: 'Tipe scan tidak valid' }, { status: 400 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message: errorMsg }, { status: 500 });
  }
}

