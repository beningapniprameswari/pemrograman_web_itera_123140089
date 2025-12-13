# Praktikum Pemrograman Aplikasi dan Web RA

## 🧩 Penjelasan Singkat Aplikasi

Aplikasi **Manajemen Tugas Mahasiswa** adalah aplikasi web berbasis **HTML, CSS, dan JavaScript** yang dirancang untuk membantu mahasiswa mengelola aktivitas akademik mereka secara mandiri. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, menandai status, memfilter, serta menghapus tugas, dengan seluruh data disimpan secara lokal menggunakan **localStorage**.

Aplikasi bersifat **interaktif**, berjalan sepenuhnya di sisi klien (client-side), dan tidak memerlukan koneksi ke server atau database eksternal.

---

## 🖼️ Screenshot Aplikasi

1. **Tampilan Utama Aplikasi** – Menampilkan daftar tugas mahasiswa
<img width="1697" height="943" alt="image" src="https://github.com/user-attachments/assets/85ee72c9-2a98-478a-98be-9b88136b7ad4" />

2. **Form Tambah / Edit Tugas** – Menunjukkan validasi input
<img width="802" height="299" alt="image" src="https://github.com/user-attachments/assets/8fcacc80-c467-4036-8082-379e7db8ca80" />
<img width="731" height="291" alt="image" src="https://github.com/user-attachments/assets/5c96ba2e-edf6-4f80-a2a0-9d22e1d707bd" />

3. **Filter / Statistik Tugas** – Menampilkan tugas berdasarkan status atau mata kuliah
<img width="929" height="474" alt="image" src="https://github.com/user-attachments/assets/03086d2a-afaf-4e3a-8459-19b9b0e26f07" />


---

## ▶️ Cara Menjalankan Aplikasi

### Menggunakan VS Code (Live Server)

1. Buka folder project di **Visual Studio Code**
2. Install extension **Live Server**
3. Klik kanan pada file `index.html`
4. Pilih **Open with Live Server**
5. Aplikasi akan terbuka otomatis di browser

### Tanpa Live Server

* Klik dua kali file `index.html`
* Aplikasi akan terbuka langsung di browser

---

## ✨ Daftar Fitur yang Diimplementasikan

* Menambahkan tugas baru dengan data: **nama tugas, mata kuliah, dan deadline**
* Menyimpan tugas secara lokal menggunakan **localStorage**
* Menandai tugas sebagai **selesai / belum selesai**
* Mengedit tugas melalui **modal edit**
* Menghapus tugas yang tidak diperlukan
* Filter tugas berdasarkan **status (selesai / belum selesai)**
* Pencarian tugas berdasarkan **mata kuliah** dan **nama tugas**
* Sorting tugas (deadline terdekat/terjauh, terbaru/terlama)
* Menampilkan **jumlah tugas yang belum selesai**
* Validasi form saat tambah dan edit tugas

---

## ⚙️ Penjelasan Teknis

### 📦 Penggunaan localStorage

localStorage digunakan untuk menyimpan data tugas mahasiswa dengan key **`tasks`**. Data disimpan dalam bentuk **array of objects** sehingga dapat dengan mudah dimanipulasi (CRUD).

Struktur data tugas:

```javascript
{
  id: string,
  title: string,
  course: string,
  deadline: string (ISO Date),
  done: boolean,
  createdAt: string (ISO Date)
}
```

Menyimpan data ke localStorage:

```javascript
localStorage.setItem('tasks', JSON.stringify(tasks));
```

Mengambil data dari localStorage:

```javascript
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
```

Implementasi tambahan:

* Data dimuat otomatis saat halaman pertama kali dibuka (`loadTasks()`)
* localStorage diperbarui setiap kali terjadi perubahan data (tambah, edit, hapus, toggle status)
* Disertai error handling jika data rusak atau tidak valid

---

### ✅ Validasi Form

Validasi form diimplementasikan menggunakan JavaScript sebelum data disimpan atau diperbarui.

Aturan validasi yang diterapkan:

* **Nama tugas** minimal 3 karakter dan tidak boleh kosong
* **Mata kuliah** wajib diisi
* **Deadline** wajib diisi dan harus berupa tanggal yang valid
* Deadline tidak boleh berada di masa lalu

Contoh kode validasi:

```javascript
if (!title || title.trim().length < 3) {
  return { valid: false, message: 'Nama tugas minimal 3 karakter.' }
}
```

Validasi ini diterapkan pada:

* Form tambah tugas
* Form edit tugas

Jika validasi gagal, pesan error akan ditampilkan kepada pengguna dan data tidak akan disimpan ke localStorage.

---

## 📌 Teknologi yang Digunakan

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Browser localStorage

---
