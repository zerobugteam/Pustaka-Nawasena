/**
 * NAWASENA IOT BRIDGE GATEWAY (Node.js)
 * Menghubungkan Hardware ESP32 (MQTT Lokal di Gedung Bakorwil)
 * ke Cloud Vercel Serverless API melalui HTTPS Webhook.
 * 
 * Jalankan: node gateway.js
 */

const mqtt = require('mqtt');
const https = require('https');

// Konfigurasi
const MQTT_BROKER = 'mqtt://127.0.0.1:1883';
const VERCEL_API_URL = process.env.VERCEL_API_URL || 'http://localhost:3000/api/iot/scan';

console.log('🚀 Menghubungkan ke MQTT Broker:', MQTT_BROKER);
const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
  console.log('✅ Terhubung ke MQTT Broker!');
  client.subscribe(['rfid/#']);
});

client.on('message', async (topic, payload) => {
  const msg = payload.toString().trim();
  console.log(`📥 Inbound [${topic}]:`, msg);

  if (topic === 'rfid/book') {
    forwardToCloud('barcode', msg);
  } else if (topic === 'rfid/scan' || topic === 'rfid/scan/member') {
    forwardToCloud('rfid', msg);
  }
});

function forwardToCloud(type, payload) {
  const data = JSON.stringify({ type, payload });

  const url = new URL(VERCEL_API_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = (url.protocol === 'https:' ? https : require('http')).request(options, (res) => {
    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => {
      console.log(`☁️ Cloud Vercel Response [${res.statusCode}]:`, body);
      try {
        const json = JSON.parse(body);
        if (json.soundTrack) {
          // Kirim perintah suara balik ke ESP32
          client.publish('rfid/status', json.status === 'success' ? 'valid' : 'error');
        }
      } catch (e) {}
    });
  });

  req.on('error', (e) => {
    console.error('❌ Gagal menghubungi Cloud API:', e.message);
  });

  req.write(data);
  req.end();
}

