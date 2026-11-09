/**
 * ============================================================================
 * NAWASENA SMART LIBRARY - ESP32 FIRMWARE (HTTP REST & CLOUD COMPATIBLE)
 * Bakorwil III Malang - Jawa Timur
 * ============================================================================
 * Hardware:
 * - ESP32 NodeMCU 38-Pin
 * - RFID Reader MFRC522 (SPI)
 * - DFPlayer Mini MP3 Player (UART2: TX=26, RX=25)
 * - LCD 16x2 I2C (SDA=32, SCL=33, Addr 0x27)
 * - Buzzer (GPIO 13)
 * - RGB LED (R=23, G=22, B=21)
 */

#include <SPI.h>
#include <MFRC522.h>
#include "DFRobotDFPlayerMini.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

/* ================= KONFIGURASI WIFI & CLOUD API ================= */
const char* ssid          = "WIFI_PERPUSTAKAAN";
const char* password      = "PASSWORD_WIFI";
const char* cloudApiUrl   = "https://pustaka-nawasena.vercel.app/api/iot/scan";

/* ================= PINOUT HARDWARE ================= */
#define SS_PIN 5
#define RST_PIN 4
#define BUZZER_PIN 13 

const int merah = 23, hijau = 22, biru = 21;

MFRC522 rfid(SS_PIN, RST_PIN);
HardwareSerial mySerial(2);
DFRobotDFPlayerMini dfplayer;
LiquidCrystal_I2C lcd(0x27, 16, 2);

unsigned long lastScanTime = 0;
const unsigned long SCAN_DELAY = 3000;
String lastUID = "";

void setRGB(bool r, bool g, bool b) {
  digitalWrite(merah, r);
  digitalWrite(hijau, g);
  digitalWrite(biru, b);
}

void beep(int ms) {
  digitalWrite(BUZZER_PIN, HIGH);
  delay(ms);
  digitalWrite(BUZZER_PIN, LOW);
}

void playTrack(int track) {
  Serial.print("🔊 Audio Track: "); Serial.println(track);
  dfplayer.play(track);
}

void setup() {
  Serial.begin(115200);
  pinMode(merah, OUTPUT); pinMode(hijau, OUTPUT); pinMode(biru, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  setRGB(1, 1, 1); // Putih saat booting

  Wire.begin(32, 33);
  lcd.init(); lcd.backlight();
  lcd.setCursor(0, 0); lcd.print(" NAWASENA SMART ");
  lcd.setCursor(0, 1); lcd.print("    BOOTING...  ");

  mySerial.begin(9600, SERIAL_8N1, 25, 26);
  if (dfplayer.begin(mySerial)) {
    dfplayer.volume(30);
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi Terhubung!");

  SPI.begin(18, 15, 19, 5);
  rfid.PCD_Init();

  playTrack(1); // Suara Track 1: Selamat Datang
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print(" NAWASENA SMART ");
  lcd.setCursor(0, 1); lcd.print("BAKORWIL III MLG");
  setRGB(0, 0, 1); // Biru (Standby)
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) {
    return;
  }

  String uid = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    uid += (rfid.uid.uidByte[i] < 0x10 ? "0" : "");
    uid += String(rfid.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  if (uid == lastUID && (millis() - lastScanTime < SCAN_DELAY)) {
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
    return;
  }

  lastUID = uid;
  lastScanTime = millis();

  Serial.println("🆔 Kartu Terdeteksi: " + uid);
  beep(150);
  setRGB(1, 0, 1); // Ungu (Memproses)

  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("   MEMPROSES... ");
  lcd.setCursor(0, 1); lcd.print(" MOHON TUNGGU   ");

  // Kirim data ke Cloud Vercel via HTTP POST
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(cloudApiUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"type\":\"rfid\",\"payload\":\"" + uid + "\"}";
    int httpCode = http.POST(jsonPayload);

    if (httpCode == 200) {
      String response = http.getString();
      Serial.println("☁️ Response: " + response);

      setRGB(0, 1, 0); // Hijau (Sukses)
      lcd.clear();
      lcd.setCursor(0, 0); lcd.print(" KARTU VALID!   ");
      lcd.setCursor(0, 1); lcd.print(" SILAHKAN LANJUT");
      playTrack(4); // Audio: Kartu terverifikasi
      delay(2500);
    } else {
      setRGB(1, 0, 0); // Merah (Ditolak)
      lcd.clear();
      lcd.setCursor(0, 0); lcd.print(" TIDAK TERDAFTAR");
      lcd.setCursor(0, 1); lcd.print(" COBA LAGI...   ");
      playTrack(3); // Audio: Akses ditolak
      delay(2500);
    }
    http.end();
  }

  // Kembali ke Standby
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print(" NAWASENA SMART ");
  lcd.setCursor(0, 1); lcd.print("BAKORWIL III MLG");
  setRGB(0, 0, 1); // Biru (Standby)

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

