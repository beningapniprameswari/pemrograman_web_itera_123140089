# Aplikasi Manajemen Buku Pribadi

## Deskripsi Singkat
Ini adalah aplikasi React sederhana yang dibuat sebagai Tugas Praktikum untuk mengelola koleksi buku pribadi.

## Fitur Utama
* Tambah Buku Baru: Mencatat buku baru dengan Judul, Penulis, dan Status.
* Edit & Hapus Buku: Memperbarui atau menghapus data buku yang sudah ada.
* Filter Berdasarkan Status: Melihat buku berdasarkan status (Dimiliki, Sedang Dibaca, Ingin Dibeli).
* Pencarian: Mencari buku berdasarkan judul atau penulis.
* Penyimpanan Lokal: Data buku disimpan di localStorage browser sehingga tidak hilang saat browser ditutup.
* Statistik: Halaman terpisah untuk melihat ringkasan statistik koleksi buku.

## Screenshot Aplikasi
<img width="983" height="896" alt="image" src="https://github.com/user-attachments/assets/177c837e-2d42-4320-849a-e42ab93ba890" />
<img width="962" height="535" alt="image" src="https://github.com/user-attachments/assets/eb77d388-fb5c-41de-beb5-872ffba3d91e" />

## Screenshot Hasil Test
<img width="872" height="568" alt="image" src="https://github.com/user-attachments/assets/c6f192f0-246a-4fd3-92b7-2bf32c2fca37" />

## Fitur ES6+ yang Digunakan
- class (Task, Schedule, Storage)
- Arrow function (=>)
- Template literal (${value})
- Destructuring & optional chaining (data?.current_weather)
- LocalStorage API
- fetch() dan async/await
- const & let
- Default parameter function (load(key, fallback = []))

## Teknologi yang Digunakan
* React (v18+)
* React Hooks: useState, useEffect, useContext, useMemo
* *React Router (react-router-dom):* Untuk navigasi multi-halaman (Home & Statistik).
* Context API: Untuk manajemen state global (daftar buku dan fungsi CRUD).
* Custom Hooks:
    * useLocalStorage: Hook kustom untuk menyinkronkan state dengan localStorage.
    * useBookStats: Hook kustom untuk menghitung statistik buku.
* React Testing Library & Jest: Untuk unit testing komponen.
* Penyimpanan: localStorage Browser.


## ⚙️ Cara Menjalankan Aplikasi
1. **Clone repository ke dalam komputer**
   ```bash
   git clone https://github.com/beningapinprameswari/pemrograman_web_itera_123140089.git
2. **Masuk ke folder project**
   ```bash
   cd pemrograman_web_itera_123140089
4. **Buka project di Visual Studio Code**
   code
5. **Jalankan dengan Live Server**
   - Klik kanan pada file index.html
   - Pilih “Open with Live Server”
   - Browser akan otomatis membuka aplikasi
