# Issue 2: Implementasi Fitur Registrasi User

## Tujuan
Mengimplementasikan fitur registrasi user baru yang memungkinkan penyimpanan data pengguna ke database MySQL menggunakan Drizzle ORM, ElysiaJS, dan Bun.

## Spesifikasi Database
Harap buat/update schema tabel `users` di dalam file `src/db/schema.ts` dengan struktur berikut:
- `id`: integer, auto increment, primary key
- `name`: varchar(255), tidak boleh null (not null)
- `email`: varchar(255), tidak boleh null (not null), unik
- `password`: varchar(255), tidak boleh null (not null). Catatan: Kolom ini akan menyimpan password yang sudah di-hash menggunakan `bcrypt`.
- `created_at`: timestamp, default nilai `current_timestamp`

*Penting:* Setelah memperbarui schema, pastikan untuk men-generate dan menerapkan migrasi ke database menggunakan Drizzle Kit.

## Spesifikasi API
Buat sebuah API endpoint untuk melakukan registrasi user baru dengan ketentuan sebagai berikut:

- **Method & Endpoint**: `POST /api/users`

- **Format Request Body (JSON)**:
```json
{
    "name" : "Eko",
    "email" : "eko@localhost",
    "password" : "rahasia"
}
```

- **Format Response Body (Sukses)**:
```json
{
    "data" : "OK"
}
```

- **Format Response Body (Gagal - Email sudah terdaftar)**:
```json
{
    "error" : "Email sudah terdaftar"
}
```

## Struktur Folder & Penamaan File
Implementasi fitur ini harus dipecah berdasarkan tanggung jawab (separation of concerns) ke dalam struktur folder di dalam `src`:
- **Routes (`src/routes/`)**: Berisi pendefinisian rute (routing) dari framework ElysiaJS.
- **Services (`src/services/`)**: Berisi inti logika bisnis (business logic) dari aplikasi (seperti hashing, query DB, dll).

Gunakan penamaan file dengan format berikut:
- Rute: `src/routes/users-routes.ts`
- Service: `src/services/users-service.ts`

---

## Tahapan Implementasi (Step-by-Step Guide)

Untuk memudahkan pengerjaan, silakan ikuti urutan langkah-langkah di bawah ini:

### Langkah 1: Persiapan Dependency
1. Install library untuk hashing password (misalnya `bcrypt` atau `bcryptjs`). Karena menggunakan Bun, Anda bisa langsung menggunakan fungsi internal `Bun.password` yang mendukung bcrypt secara bawaan jika diinginkan, atau install library eksternal `bun add bcryptjs`.

### Langkah 2: Pembaruan Skema Database
1. Buka file `src/db/schema.ts`.
2. Definisikan tabel `users` sesuai spesifikasi di atas (gunakan tipe data dari `drizzle-orm/mysql-core`).
3. Jalankan command migrasi Drizzle untuk membuat file migrasi (contoh: `bun x drizzle-kit generate`) dan terapkan ke database.

### Langkah 3: Implementasi Service Layer (`users-service.ts`)
1. Buat direktori `src/services` dan file `users-service.ts`.
2. Buat fungsi logika registrasi (misalnya `registerUser(payload)`).
3. Di dalam fungsi tersebut:
   - **Cek Email**: Lakukan query ke database menggunakan Drizzle untuk mencari apakah email dari payload sudah ada. Jika sudah ada, lempar (throw) error "Email sudah terdaftar".
   - **Hash Password**: Gunakan `bcrypt` untuk melakukan hashing pada plain password.
   - **Simpan Data**: Lakukan operasi `insert` ke tabel `users` menggunakan Drizzle dengan data: name, email, dan hashed password.
   - **Return**: Kembalikan string `"OK"` jika berhasil.

### Langkah 4: Implementasi Route Layer (`users-routes.ts`)
1. Buat direktori `src/routes` dan file `users-routes.ts`.
2. Import module Elysia dan inisialisasi instance baru khusus untuk rute user.
3. Definisikan route `POST /api/users`.
4. (Opsional tapi disarankan) Tambahkan validasi body menggunakan bawaan Elysia TypeBox (`t.Object`) untuk memastikan request body memiliki `name`, `email`, dan `password` berbentuk string.
5. Di dalam handler route tersebut:
   - Panggil fungsi dari service layer (contoh: `registerUser`).
   - Tangkap (catch) error yang dilempar dari service. Jika pesan error adalah "Email sudah terdaftar", kembalikan response dengan format error sesuai spesifikasi (dan set status code ke 400 Bad Request).
   - Jika berhasil, kembalikan response objek `{ data: "OK" }`.

### Langkah 5: Integrasi Rute ke App Utama
1. Buka file utama `src/index.ts`.
2. Import route dari `users-routes.ts`.
3. Pasangkan (register) route tersebut ke instance utama aplikasi Elysia dengan `.use()`.

### Langkah 6: Verifikasi
1. Jalankan aplikasi menggunakan script `bun run dev`.
2. Lakukan *hit* ke API menggunakan Postman atau `curl`.
3. Uji skenario berhasil (memasukkan user baru). Cek apakah password tersimpan dalam bentuk hash di database.
4. Uji skenario gagal (memasukkan user dengan email yang sama) dan pastikan mendapatkan response error yang tepat.
