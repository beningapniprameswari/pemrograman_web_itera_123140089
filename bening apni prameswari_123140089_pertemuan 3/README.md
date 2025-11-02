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
<img width="1870" height="949" alt="image" src= />

<img width="1874" height="956" alt="image" src= />


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
