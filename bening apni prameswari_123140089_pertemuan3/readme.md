# Praktikum Pemrograman Aplikasi dan Web RA

## 📚 Aplikasi Manajemen Buku Pribadi

## Deskripsi Aplikasi

Aplikasi Manajemen Buku Pribadi adalah aplikasi berbasis **React** yang digunakan untuk mencatat dan mengelola koleksi buku milik pengguna. Pengguna dapat menambahkan buku baru, mengedit data buku, menghapus buku, melakukan pencarian, memfilter buku berdasarkan status, serta melihat statistik koleksi buku.

Aplikasi ini dirancang untuk membantu pengguna mengetahui buku apa saja yang sudah dimiliki, sedang dibaca, atau ingin dibeli.

---

## Fitur Aplikasi

* Menambahkan buku baru (judul, penulis, status)
* Mengedit data buku
* Menghapus buku
* Pencarian buku berdasarkan judul atau penulis
* Filter buku berdasarkan status (Dimiliki, Sedang Dibaca, Ingin Dibeli)
* Menampilkan statistik jumlah buku
* Penyimpanan data menggunakan **localStorage**
* Navigasi multi-halaman menggunakan **React Router**

---

## Teknologi yang Digunakan

* React JS (Functional Component)
* React Hooks (`useState`, `useEffect`, `useMemo`)
* Context API
* React Router
* React Testing Library
* localStorage

---

## Struktur Folder

```
src/
├── components/
│   ├── BookForm/
│   ├── BookList/
│   ├── BookItem/
│   └── BookFilter/
├── pages/
│   ├── Home/
│   └── Stats/
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── context/
│   └── BookContext.js
├── App.js
└── index.js
```

---

## Cara Menjalankan Aplikasi

### 1. Install Dependencies

```bash
npm install
```

### 2. Jalankan Aplikasi

```bash
npm start
```

Aplikasi akan berjalan di browser pada alamat:

```
http://localhost:3000
```

---

## Screenshot Aplikasi

* Halaman Home (Daftar Buku)
![WhatsApp Image 2025-12-13 at 10 30 38_bbea6536](https://github.com/user-attachments/assets/91d771da-6e63-4abe-bf38-647d83b4cbb7)

* Form Tambah / Edit Buku
<img width="959" height="552" alt="image" src="https://github.com/user-attachments/assets/aba579e9-87fa-46e5-8649-1deb528dcf17" />
<img width="953" height="414" alt="image" src="https://github.com/user-attachments/assets/71b830c9-e196-409c-b7f3-dec818a7bca3" />

* Halaman Statistik Buku
<img width="993" height="364" alt="image" src="https://github.com/user-attachments/assets/33bdee43-814d-4786-afea-7db38e3f986f" />

---

## Penjelasan Penggunaan React

### 1. useState

Digunakan untuk menyimpan state seperti data buku, filter, pencarian, dan form input.

### 2. useEffect

Digunakan untuk menyimpan dan mengambil data dari `localStorage` saat aplikasi dijalankan atau saat data berubah.

### 3. useMemo

Digunakan untuk optimasi performa pada proses filter buku dan perhitungan statistik agar tidak dihitung ulang secara berlebihan.

### 4. Context API

Digunakan untuk mengelola state global buku agar dapat diakses oleh banyak komponen tanpa perlu props drilling.

### 5. Custom Hooks

* `useLocalStorage`: Menyimpan data buku ke localStorage
* `useBookStats`: Menghitung statistik jumlah buku berdasarkan status

---

## Penyimpanan Data (localStorage)

Data buku disimpan secara lokal menggunakan `localStorage` dengan cara:

* Mengambil data dari localStorage saat aplikasi pertama kali dibuka
* Menyimpan ulang data setiap kali terjadi perubahan

Hal ini membuat data tetap tersimpan meskipun browser di-refresh.

---

## Validasi dan Error Handling

* Judul dan penulis buku tidak boleh kosong
* Error akan ditampilkan jika input tidak valid
* Validasi dilakukan sebelum data dikirim atau disimpan

---

## Testing

Aplikasi ini menggunakan **React Testing Library** untuk melakukan unit testing pada komponen utama seperti:

* BookForm
* Validasi input
* Mode tambah dan edit buku

<img width="920" height="405" alt="image" src="https://github.com/user-attachments/assets/31d1318f-463d-43d7-9fc9-a880d8fd22a1" />


---


