data_mahasiswa = [
    {
        "Nama": "Bening Apni Prameswari",
        "NIM": "123140089",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 94
    },
    {
        "Nama": "Risya Syifa Saleh",
        "NIM": "123140169",
        "nilai_uts": 70,
        "nilai_uas": 75,
        "nilai_tugas": 82
    },
    {
        "Nama": "Muhamad Arif Ardani",
        "NIM": "123140186",
        "nilai_uts": 90,
        "nilai_uas": 88,
        "nilai_tugas": 82
    },
    {
        "Nama": "Raditya Alrasyid Nugroho",
        "NIM": "123140125",
        "nilai_uts": 85,
        "nilai_uas": 70,
        "nilai_tugas": 89
    },
    {
        "Nama": "Najlatika",
        "NIM": "123140078",
        "nilai_uts": 43,
        "nilai_uas": 50,
        "nilai_tugas": 90
    }
]

# Menghitung nilai akhir berdasarkan bobot UTS, UAS, dan Tugas
def hitung_nilai_akhir(uts, uas, tugas):
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

# Menentukan grade huruf berdasarkan nilai akhir
def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

# Mengolah semua data mahasiswa (mengisi nilai akhir dan grade)
def proses_data_mahasiswa(data):
    for mhs in data:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])

# Menampilkan data dalam bentuk tabel yang rapi
def tampilkan_data(data, header="Data Nilai Mahasiswa"):
    if not data:  # Jika data kosong
        print("Tidak ada data untuk ditampilkan.")
        return

    print("\n" + "=" * 88)
    print(f"{header.center(88)}")  # Judul tabel
    print("=" * 88)
   
    # Header kolom tabel
    print(f"| {'No':<3} | {'NIM':<10} | {'Nama Mahasiswa':<28} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 88)
    
    # Menampilkan tiap baris data mahasiswa
    for i, mhs in enumerate(data, 1):
        print(f"| {i:<3} | {mhs['NIM']:<10} | {mhs['Nama']:<28} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5} |")
    
    print("-" * 88)

# Mencari mahasiswa dengan nilai akhir tertinggi
def cari_nilai_tertinggi(data):
    if not data:
        return None
    return max(data, key=lambda mhs: mhs['nilai_akhir'])

# Mencari mahasiswa dengan nilai akhir terendah
def cari_nilai_terendah(data):
    if not data:
        return None
    return min(data, key=lambda mhs: mhs['nilai_akhir'])

# Menghitung rata-rata nilai akhir seluruh kelas
def hitung_rata_rata_kelas(data):
    if not data:
        return 0
    total_nilai = sum(mhs['nilai_akhir'] for mhs in data)
    return total_nilai / len(data)

# Menambah data mahasiswa baru lewat input
def input_data_baru(data):
    print("\n--- Tambah Data Mahasiswa Baru ---")
    try:
        # Mengambil input dari pengguna
        Nama = input("Nama: ")
        nim = input("NIM: ")
        nilai_uts = float(input("Nilai UTS: "))
        nilai_uas = float(input("Nilai UAS: "))
        nilai_tugas = float(input("Nilai Tugas: "))

        # Menghitung nilai akhir dan grade
        nilai_akhir = hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas)
        grade = tentukan_grade(nilai_akhir)

        # Menyimpan data mahasiswa baru
        mahasiswa_baru = {
            "Nama": Nama,
            "NIM": nim,
            "nilai_uts": nilai_uts,
            "nilai_uas": nilai_uas,
            "nilai_tugas": nilai_tugas,
            "nilai_akhir": nilai_akhir,
            "grade": grade
        }
        data.append(mahasiswa_baru)
        print(f"Data untuk {Nama} berhasil ditambahkan.")

    except ValueError:
        print("Input nilai tidak valid! Harap memasukkan angka.")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

# Menampilkan mahasiswa berdasarkan grade tertentu
def filter_mahasiswa_by_grade(data):
    if not data:
        print("Data masih kosong.")
        return

    grade_dicari = input("Masukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()

    if grade_dicari not in ["A", "B", "C", "D", "E"]:
        print("Grade tidak valid.")
        return

    # Menyaring mahasiswa yang grade-nya sesuai
    hasil_filter = [mhs for mhs in data if mhs['grade'] == grade_dicari]
    
    tampilkan_data(hasil_filter, header=f"Data Mahasiswa dengan Grade '{grade_dicari}'")

# Fungsi utama program
def main():
    proses_data_mahasiswa(data_mahasiswa)  # Hitung nilai akhir & grade di awal

    while True:
        # Menu utama
        print("\n===== Program Pengelolaan Data Nilai Mahasiswa =====")
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Tambah Data Mahasiswa Baru")
        print("3. Tampilkan Nilai Akhir Tertinggi")
        print("4. Tampilkan Nilai Akhir Terendah")
        print("5. Filter Mahasiswa Berdasarkan Grade")
        print("6. Tampilkan Rata-rata Nilai Kelas")
        print("0. Keluar")
        
        try:
            pilihan = int(input("Masukkan pilihan Anda (0-6): "))

            if pilihan == 1:
                tampilkan_data(data_mahasiswa)
            
            elif pilihan == 2:
                input_data_baru(data_mahasiswa)
            
            elif pilihan == 3:
                tertinggi = cari_nilai_tertinggi(data_mahasiswa)
                if tertinggi:
                    print(f"\nNilai tertinggi dimiliki oleh: {tertinggi['Nama']} ({tertinggi['NIM']})")
                    print(f"Nilai Akhir: {tertinggi['nilai_akhir']:.2f} (Grade: {tertinggi['grade']})")
            
            elif pilihan == 4:
                terendah = cari_nilai_terendah(data_mahasiswa)
                if terendah:
                    print(f"\nNilai terendah dimiliki oleh: {terendah['Nama']} ({terendah['NIM']})")
                    print(f"Nilai Akhir: {terendah['nilai_akhir']:.2f} (Grade: {terendah['grade']})")
            
            elif pilihan == 5:
                filter_mahasiswa_by_grade(data_mahasiswa)
            
            elif pilihan == 6:
                rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
                print(f"\nRata-rata nilai akhir seluruh kelas adalah: {rata_rata:.2f}")

            elif pilihan == 0:
                print("Terima kasih telah menggunakan program ini. Sampai jumpa!")
                break
            
            else:
                print("Pilihan tidak valid. Harap memasukkan angka 0-6.")

        except ValueError:
            print("Input tidak valid. Harap memasukkan angka.")

# Menjalankan program
if __name__ == "__main__":
    main()
