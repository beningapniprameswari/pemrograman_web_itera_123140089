# 📚 Sistem Manajemen Perpustakaan Sederhana

Program ini dibuat untuk memenuhi tugas praktikum **Pemrograman Berorientasi Objek (OOP)** menggunakan bahasa **Python**.  
Program ini menerapkan konsep **Abstract Class**, **Inheritance**, **Encapsulation**, dan **Polymorphism** dengan contoh sederhana dan mudah dipahami.

---

## 🧩 Deskripsi Program

Program ini mensimulasikan **sistem manajemen perpustakaan sederhana**, di mana pengguna dapat:
- Menampilkan daftar semua item (buku dan majalah)
- Menambahkan item baru ke dalam koleksi
- Mencari item berdasarkan **judul** atau **ID**

Terdapat beberapa class utama dalam program:

1. **LibraryItem (Abstract Class)**  
   Dasar untuk semua jenis item di perpustakaan.  
   Mewajibkan subclass untuk mengimplementasikan method `display_details()`.

2. **Book (Subclass dari LibraryItem)**  
   Mewakili buku dengan atribut tambahan `author` (penulis).  
   Mengimplementasikan method `display_details()` dan `__str__()`.

3. **Magazine (Subclass dari LibraryItem)**  
   Mewakili majalah dengan atribut tambahan `issue_number` (nomor edisi).  
   Mengimplementasikan method `display_details()` dan `__str__()`.

4. **Library (Class Pengelola)**  
   Menyimpan daftar item dan memiliki fitur untuk menambah, menampilkan, serta mencari item.

---

## ⚙️ Fitur Program

| No | Fitur | Deskripsi |
|----|--------|------------|
| 1 | **Tampilkan Semua Item** | Menampilkan daftar semua item (buku & majalah) |
| 2 | **Tambah Item Baru** | Menambahkan item baru melalui input pengguna |
| 3 | **Cari Item** | Mencari item berdasarkan judul atau ID |
| 4 | **Keluar** | Mengakhiri program |

---

## 💻 Cara Menjalankan Program

1. Pastikan **Python 3.x** sudah terinstal di komputer kamu.  
2. Simpan file program dengan nama `perpustakaan.py`.  
3. Jalankan melalui terminal atau command prompt:

   ```bash
   python perpustakaan.py

## 🖼️ Screenshot Hasil Program

