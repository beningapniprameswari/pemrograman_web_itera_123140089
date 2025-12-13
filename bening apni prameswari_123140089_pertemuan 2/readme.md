# Praktikum Pemrograman Aplikasi dan Web RA

## 🧩 Penjelasan Singkat Aplikasi

**Aplikasi Personal Dashboard Mahasiswa** adalah aplikasi web sederhana berbasis **HTML, CSS, dan JavaScript (ES6+)** yang berfungsi sebagai dashboard pribadi untuk membantu mahasiswa mengelola aktivitas akademik sehari-hari.

Aplikasi ini menampilkan:

* Daftar tugas (to-do list)
* Jadwal kuliah
* Statistik progres tugas
* Informasi cuaca terkini (Bandar Lampung)
* Fitur dark mode

Seluruh data disimpan secara lokal menggunakan **localStorage**, sehingga data tetap tersimpan meskipun halaman direfresh atau browser ditutup.

---

## 🖼️ Screenshot Aplikasi

1. **Tampilan Dashboard Utama** (header, statistik, progress bar)
<img width="1582" height="767" alt="image" src="https://github.com/user-attachments/assets/b7ac4751-faf2-4478-9687-9db867a6ff98" />

2. **Daftar Tugas & Filter** (tugas aktif / selesai)
<img width="876" height="561" alt="image" src="https://github.com/user-attachments/assets/8bc26a74-cbcd-4368-95b3-8f078319437c" />

3. **Jadwal Kuliah & Dark Mode**
<img width="1548" height="690" alt="image" src="https://github.com/user-attachments/assets/930bed9d-77dc-480f-b0e6-c362f63a7fa6" />

---

## ▶️ Cara Menjalankan Aplikasi

### Menggunakan VS Code (Live Server)

1. Buka folder project di **Visual Studio Code**
2. Install extension **Live Server**
3. Klik kanan file `index.html`
4. Pilih **Open with Live Server**
5. Aplikasi akan terbuka otomatis di browser

### Tanpa Live Server

* Klik dua kali file `index.html`
* Aplikasi akan langsung terbuka di browser

---

## ✨ Fitur Utama Aplikasi

* Menambahkan, mengedit, dan menghapus **tugas**
* Menandai tugas sebagai **selesai / aktif**
* Filter tugas (semua, aktif, selesai)
* Menampilkan **statistik tugas** dan progress bar
* Menambahkan, mengedit, dan menghapus **jadwal kuliah**
* Penyimpanan data lokal menggunakan **localStorage**
* Dark mode (tersimpan di localStorage)
* Menampilkan **informasi cuaca** menggunakan API

---

## ⚙️ Fitur ES6+ yang Diimplementasikan

Aplikasi ini telah memenuhi seluruh persyaratan penggunaan fitur **ES6+**, yaitu:

### ✅ let dan const

Digunakan secara konsisten untuk deklarasi variabel agar lebih aman dan terkontrol.

### ✅ Arrow Functions

Digunakan pada banyak bagian kode, contohnya:

```javascript
const $ = id => document.getElementById(id);
const saveAll = () => { ... }
const renderStats = () => { ... }
```

### ✅ Template Literals

Digunakan untuk rendering HTML secara dinamis:

```javascript
`<div class="title">${t.name}</div>`
```

### ✅ Fungsi Asinkron (Async / Await)

Digunakan untuk mengambil data cuaca dari API Open-Meteo:

```javascript
const loadWeatherBandarLampung = async () => { ... }
```

### ✅ Classes

Digunakan untuk struktur data dan pengelolaan penyimpanan:

* `Storage` → mengelola localStorage
* `Task` → merepresentasikan data tugas
* `Schedule` → merepresentasikan data jadwal kuliah

---

## 📦 Penggunaan localStorage

localStorage digunakan untuk menyimpan:

* Data tugas (`tasks`)
* Data jadwal kuliah (`schedules`)
* Pengaturan dark mode (`darkMode`)

Data disimpan dalam format JSON dan dimuat kembali saat halaman pertama kali dibuka.

---

## 🎨 UI & UX

* Tampilan modern berbasis **card layout**
* Responsif untuk berbagai ukuran layar
* Warna konsisten dengan tema maroon
* Dark mode untuk kenyamanan pengguna

---

