# Praktikum Pemrograman Aplikasi dan Web RA
## Dokumentasi API Matakuliah (Pyramid Framework)

## 📝 Deskripsi Proyek
Aplikasi ini adalah RESTful API sederhana yang dibangun menggunakan framework **Pyramid** dan **SQLAlchemy**. Aplikasi ini berfungsi untuk mengelola data mata kuliah (CRUD: Create, Read, Update, Delete).

## Fitur utama:
- Melihat daftar semua mata kuliah.
- Melihat detail satu mata kuliah.
- Menambahkan data mata kuliah baru.
- Mengupdate data mata kuliah.
- Menghapus data mata kuliah.

## ⚙️ Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda.

### 1. Prasyarat
Pastikan Python 3.x sudah terinstall di komputer Anda.

### 2. Membuat Virtual Environment
Buka terminal/CMD di folder proyek, lalu jalankan perintah:

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalasi Dependensi
Install paket project dalam mode editable agar dikenali oleh sistem:

pip install -e .
Perintah ini akan membaca file setup.py dan menginstall library seperti pyramid, sqlalchemy, waitress, dll.

### 4. Konfigurasi Database
Aplikasi ini menggunakan SQLite.

Database akan otomatis dibuat dengan nama file matakuliah.sqlite saat server pertama kali dijalankan.

Tidak perlu konfigurasi manual (username/password) kecuali ingin mengganti ke MySQL/PostgreSQL di development.ini.

## 🚀 Cara Menjalankan Aplikasi

### 1. Inisialisasi Database
Jika Anda telah menambahkan script seeding (isi data otomatis) di __init__.py, tabel akan dibuat otomatis saat server jalan.

### 2. Menjalankan Server
Jalankan perintah berikut untuk menyalakan server development:
```bash
pserve development.ini --reload
Server akan berjalan di: http://localhost:6543
```

## 📚 API Endpoints

Berikut adalah daftar endpoint yang tersedia.

### 1. GET All Matakuliah
Mengambil semua data mata kuliah.
URL: /matakuliah
Method: GET
Response Success (200 OK):

JSON
```bash
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Matematika Diskrit",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF202",
      "nama_mk": "Basis Data",
      "sks": 4,
      "semester": 3
    }
  ]
}
```

### 2. GET One Matakuliah
Mengambil detail satu mata kuliah berdasarkan ID.
URL: /matakuliah/{id}
Method: GET
Contoh: /matakuliah/1
Response Success (200 OK):

JSON
```bash
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Matematika Diskrit",
  "sks": 3,
  "semester": 1
}
```

### 3. POST Add Matakuliah
Menambahkan data mata kuliah baru.
URL: /matakuliah/add
Method: POST
Body (JSON):

JSON
```bash
{
    "kode_mk": "IF305",
    "nama_mk": "Kecerdasan Buatan",
    "sks": 3,
    "semester": 5
}
```
Response Success (201 Created):

JSON
```bash
{
    "status": "success",
    "message": "Data berhasil ditambahkan",
    "data": {
        "id": 3,
        "kode_mk": "IF305",
        "nama_mk": "Kecerdasan Buatan",
        "sks": 3,
        "semester": 5
    }
}
```

### 4. PUT Update Matakuliah
Mengubah data mata kuliah yang sudah ada.
URL: /matakuliah/{id}/edit
Method: PUT
Contoh: /matakuliah/1/edit
Body (JSON):

JSON
```bash
{
    "nama_mk": "Matematika Diskrit (Revisi)",
    "sks": 4
}
```
Response Success (200 OK):

JSON
```bash
{
    "status": "success",
    "message": "Data berhasil diupdate",
    "data": {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Matematika Diskrit (Revisi)",
        "sks": 4,
        "semester": 1
    }
}
```

### 5. DELETE Matakuliah
Menghapus data mata kuliah.
URL: /matakuliah/{id}/delete
Method: DELETE
Contoh: /matakuliah/1/delete
Response Success (200 OK):

JSON
```bash
{
    "status": "success",
    "message": "Data id 1 berhasil dihapus"
}
```

## 🧪 Testing (cURL Commands)
Anda dapat menggunakan terminal (Git Bash atau Command Prompt) untuk melakukan testing cepat.

### 1. Cek Data (GET)
curl -X GET http://localhost:6543/matakuliah

### 2. Tambah Data (POST) (Gunakan Git Bash atau terminal Linux/Mac agar format JSON aman)
curl -X POST http://localhost:6543/matakuliah/add \
-H "Content-Type: application/json" \
-d '{"kode_mk": "IF999", "nama_mk": "Testing API", "sks": 2, "semester": 6}'

### 3. Update Data (PUT)
curl -X PUT http://localhost:6543/matakuliah/1/edit \
-H "Content-Type: application/json" \
-d '{"nama_mk": "Nama Baru Update"}'

### 4. Hapus Data (DELETE)
curl -X DELETE http://localhost:6543/matakuliah/1/delete
