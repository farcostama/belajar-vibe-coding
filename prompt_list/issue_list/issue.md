# Setup Project: ElysiaJS + Drizzle + MySQL dengan Bun

## Tujuan

Membuat project backend baru menggunakan Bun sebagai runtime, ElysiaJS sebagai framework web, dan Drizzle ORM untuk terkoneksi ke database MySQL.

## Tech Stack (Teknologi yang Digunakan)

- **Runtime & Package Manager**: Bun
- **Web Framework**: ElysiaJS
- **ORM**: Drizzle ORM
- **Database**: MySQL

## Langkah-langkah Implementasi High-Level

### 1. Inisialisasi Project

- Inisialisasi project Bun baru di folder ini (misalnya menggunakan template resmi dari Elysia).
- Siapkan struktur direktori awal.

### 2. Instalasi Dependency

- Install dependency utama: **ElysiaJS**.
- Install **Drizzle ORM** (`drizzle-orm`) dan **Drizzle Kit** (`drizzle-kit` sebagai dev dependency).
- Install driver MySQL yang kompatibel dengan Bun (contoh: `mysql2`).

### 3. Konfigurasi Database & ORM

- Buat file `.env` dan definisikan variabel environment untuk string koneksi database MySQL.
- Setup instance koneksi Drizzle ke database MySQL.
- Buat file skema awal (contoh: `schema.ts`) dan definisikan setidaknya satu tabel sederhana untuk menguji konfigurasi.
- Konfigurasikan file `drizzle.config.ts` agar Drizzle Kit dapat mengelola migrasi skema.

### 4. Setup API Dasar (ElysiaJS)

- Inisialisasi server Elysia pada file utama (contoh: `src/index.ts`).
- Buat endpoint sederhana (contoh: `GET /` untuk _health-check_) yang membuktikan server berjalan dan database terkoneksi.

## Catatan Implementasi

- Cukup sampaikan kode dasar (_scaffolding_) untuk setup awal. Tidak perlu membuat alur CRUD yang lengkap ataupun fitur autentikasi.
- Gunakan struktur folder yang rapi, modular, dan standar (misalnya memisahkan area koneksi database, definisi skema, dan rute/routing ke dalam folder terpisah di dalam `src/`).
- Sediakan script command di dalam `package.json` yang memungkinkan project dijalankan dengan mudah (contoh: tambahkan `"dev": "bun run --watch src/index.ts"` agar project bisa di-start menggunakan perintah `bun run dev`).
- Pastikan untuk tidak meng-_hardcode_ kredensial database; gunakan file `.env` dan letakkan dalam `.gitignore`.

## Kriteria Penerimaan (Acceptance Criteria)

- Struktur project sudah terbangun secara rapi dan modular (contoh: terdapat folder `src/` yang memisahkan urusan `db`, `routes`, dll).
- Script `"dev"` sudah tersedia di `package.json` dan perintah `bun run dev` berhasil menjalankan server.
- File konfigurasi rahasia (`.env`) dipastikan aman dan terdaftar di dalam `.gitignore`.
- Aplikasi dapat terkoneksi ke database MySQL dengan sukses pada saat dijalankan.
- Endpoint health-check (contoh: `GET /`) dapat diakses dan mengembalikan status koneksi yang valid.
- File skema database telah terbuat dan migrasi tabel dasar berhasil diterapkan menggunakan Drizzle Kit tanpa adanya error.
