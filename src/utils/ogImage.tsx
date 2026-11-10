import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const OG_ALT = 'Pustaka Nawasena Bakorwil III Malang';
export const OG_SIZE = { width: 1200, height: 630 };

function loadBase64Png(relativePath: string): string {
  const buffer = readFileSync(join(process.cwd(), relativePath));
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export function createNawasenaOgImage() {
  const logoNawasena = loadBase64Png('public/images/kartu.png');
  const logoBakorwil = loadBase64Png('public/images/bakorwil.png');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 58%, #451a03 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Bar: Logos & Institution Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <img
              src={logoNawasena}
              alt="Logo Pustaka Nawasena"
              width={64}
              height={64}
              style={{
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                padding: '4px',
                objectFit: 'contain',
              }}
            />
            <img
              src={logoBakorwil}
              alt="Logo Bakorwil III Malang"
              width={64}
              height={64}
              style={{
                objectFit: 'contain',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '4px',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#fb923c',
                  textTransform: 'uppercase',
                }}
              >
                BAKORWIL III MALANG
              </span>
              <span
                style={{
                  fontSize: '15px',
                  color: '#cbd5e1',
                  marginTop: '2px',
                }}
              >
                Pemerintah Provinsi Jawa Timur
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(249, 115, 22, 0.16)',
              border: '1px solid rgba(251, 146, 60, 0.4)',
              color: '#fdba74',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            Perpustakaan Cerdas IoT
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '960px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '68px',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: '#ffffff',
            }}
          >
            Pustaka Nawasena
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#e2e8f0',
            }}
          >
            Katalog Koleksi Khusus, Layanan Riset Kebijakan, dan Kios Sirkulasi Mandiri Berbasis RFID &amp; Barcode.
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.25)',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#94a3b8',
          }}
        >
          <span>pustaka-nawasena.vercel.app</span>
          <span style={{ color: '#fb923c', fontWeight: 700 }}>
            Jl. Simpang Ijen No. 2, Kota Malang
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
