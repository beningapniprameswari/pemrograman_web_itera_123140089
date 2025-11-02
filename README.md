# Aplikasi Manajemen Buku Pribadi

Ini adalah aplikasi React sederhana yang dibuat sebagai Tugas Praktikum untuk mengelola koleksi buku pribadi.

## Fitur Utama

* **Tambah Buku Baru:** Mencatat buku baru dengan Judul, Penulis, dan Status.
* **Edit & Hapus Buku:** Memperbarui atau menghapus data buku yang sudah ada.
* **Filter Berdasarkan Status:** Melihat buku berdasarkan status (Dimiliki, Sedang Dibaca, Ingin Dibeli).
* **Pencarian:** Mencari buku berdasarkan judul atau penulis.
* **Penyimpanan Lokal:** Data buku disimpan di `localStorage` browser sehingga tidak hilang saat browser ditutup.
* **Statistik:** Halaman terpisah untuk melihat ringkasan statistik koleksi buku.

## Teknologi yang Digunakan

* **React (v18+)**
* **React Hooks:** `useState`, `useEffect`, `useContext`, `useMemo`
* **React Router (`react-router-dom`):** Untuk navigasi multi-halaman (Home & Statistik).
* **Context API:** Untuk manajemen state global (daftar buku dan fungsi CRUD).
* **Custom Hooks:**
    * `useLocalStorage`: Hook kustom untuk menyinkronkan state dengan `localStorage`.
    * `useBookStats`: Hook kustom untuk menghitung statistik buku.
* **React Testing Library & Jest:** Untuk unit testing komponen.
* **Penyimpanan:** `localStorage` Browser.

## Struktur Folder

Proyek ini menggunakan struktur folder modular untuk memisahkan *concerns*:

```
src/
├── components/   # Komponen UI Reusable
│   ├── BookFilter/
│   ├── BookForm/
│   ├── BookList/
│   └── BookItem/
├── context/      # React Context untuk Global State
│   └── BookContext.js
├── hooks/        # Custom React Hooks
│   ├── useBookStats.js
│   └── useLocalStorage.js
├── pages/        # Komponen Halaman (dirakit dari components)
│   ├── Home/
│   └── Stats/
├── App.js        # Setup Routing Utama
└── index.js      # Entry point (Render App & Provider)
```

## Instalasi dan Menjalankan Proyek

1.  **Clone repositori:**
    ```bash
    git clone [URL-REPO-ANDA]
    cd manajemen-buku
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan aplikasi (mode development):**
    ```bash
    npm start
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

4.  **Jalankan test:**
    ```bash
    npm test
    ```