# Aplikasi Manajemen Tugas Mahasiswa

## Deskripsi Singkat
Aplikasi ini dibuat untuk membantu mahasiswa mengelola aktivitas akademik seperti tugas kuliah.  
Pengguna dapat menambahkan, mengedit, menandai selesai, dan menghapus tugas dengan mudah.  
Semua data tersimpan **lokal di browser** menggunakan `localStorage`, sehingga data tidak hilang meskipun halaman direfresh.

## Screenshot Tampilan WEB

### 1. Tampilan Awal & Tambah Tugas
<img width="1323" height="618" alt="image" src="https://github.com/user-attachments/assets/0f6f99b7-1e0d-4181-9407-b6d83b693a0b" />

### 2. Tugas Tersimpan & Filter
<img width="1344" height="903" alt="image" src="https://github.com/user-attachments/assets/454b4ff3-7645-4d0a-a583-736bb3706915" />

### 3. Edit & Hapus Tugas
<img width="1175" height="588" alt="image" src="https://github.com/user-attachments/assets/17ff4326-c77e-472a-9771-0dee7310bfa1" />

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

## Daftar Fitur yang Telah Diimplementasikan
1. Menambahkan tugas baru (nama tugas, mata kuliah, deadline)
2. Menandai tugas sebagai selesai/belum selesai
3. Mengedit tugas yang sudah ada
4. Menghapus tugas yang tidak diperlukan
5. Filter dan pencarian tugas berdasarkan mata kuliah
6. Menampilkan jumlah tugas belum selesai
7. Validasi input form

## Penjelasan Teknis
1. Penyimpanan Data Menggunakan localStorage
   Aplikasi ini menggunakan localStorage untuk menyimpan data tugas agar tetap ada meskipun halaman direfresh.

    // Simpan data ke localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Ambil data dari localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];


