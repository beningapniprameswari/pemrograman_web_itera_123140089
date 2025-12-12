import os
from abc import ABC, abstractmethod

# =====================================================
# BAGIAN 1: ABSTRACT CLASS & INHERITANCE 
# =====================================================

class LibraryItem(ABC):
    """
    Kelas dasar (abstract class) untuk semua item di perpustakaan.
    Setiap item memiliki judul dan ID unik.
    """

    def __init__(self, title, item_id):
        self._title = title          # atribut protected (judul item)
        self._item_id = item_id      # atribut protected (ID item)

    @property
    def title(self):
        """Mengembalikan judul item."""
        return self._title

    @property
    def item_id(self):
        """Mengembalikan ID item."""
        return self._item_id

    @abstractmethod
    def display_details(self):
        """Method abstrak yang harus diimplementasikan oleh subclass."""
        pass  


class Book(LibraryItem):
    """
    Kelas turunan untuk item bertipe Buku.
    Menyimpan informasi tentang judul, ID, dan penulis.
    """

    def __init__(self, title, item_id, author):
        super().__init__(title, item_id)
        self._author = author  # atribut protected (penulis buku)

    def display_details(self):
        """Menampilkan detail lengkap untuk Buku."""
        print("--- BUKU ---")
        print(f"  ID     : {self.item_id}")
        print(f"  Judul  : {self.title}")
        print(f"  Penulis: {self._author}")
        print("-" * 20)

    def __str__(self):
        """Representasi string untuk objek Buku."""
        return f"[{self.item_id}] Buku: {self.title} oleh {self._author}"


class Magazine(LibraryItem):
    """
    Kelas turunan untuk item bertipe Majalah.
    Menyimpan informasi tentang judul, ID, dan nomor edisi.
    """

    def __init__(self, title, item_id, issue_number):
        super().__init__(title, item_id)
        self._issue_number = issue_number  # atribut protected (nomor edisi majalah)

    def display_details(self):
        """Menampilkan detail lengkap untuk Majalah."""
        print("--- MAJALAH ---")
        print(f"  ID    : {self.item_id}")
        print(f"  Judul : {self.title}")
        print(f"  Edisi : {self._issue_number}")
        print("-" * 20)

    def __str__(self):
        """Representasi string untuk objek Majalah."""
        return f"[{self.item_id}] Majalah: {self.title} (Edisi {self._issue_number})"


# =====================================================
# BAGIAN 2: CLASS PENGELOLA (LIBRARY) & FUNGSIONALITAS
# =====================================================

class Library:
    """
    Kelas untuk mengelola koleksi item perpustakaan.
    Dapat menambah, menampilkan, dan mencari item.
    """

    def __init__(self):
        self._items = []           # daftar semua item di perpustakaan
        self._id_counter = 100     # penghitung ID otomatis

    def _generate_id(self):
        """Membuat ID baru secara otomatis untuk setiap item."""
        self._id_counter += 1
        return f"LIB-{self._id_counter}"

    def add_item(self):
        """Menambahkan item baru ke perpustakaan melalui input pengguna."""
        print("\n== Tambah Item Baru ==")
        tipe = input("Tipe item (1: Buku, 2: Majalah): ")
        title = input("Judul: ")
        
        item_id = self._generate_id()

        # Pilihan tipe item
        if tipe == '1':
            author = input("Penulis: ")
            item = Book(title, item_id, author)
        elif tipe == '2':
            issue = input("Nomor Edisi: ")
            item = Magazine(title, item_id, issue)
        else:
            print("Tipe tidak valid.")
            return

        self._items.append(item)
        print(f"\nBerhasil! Item '{title}' (ID: {item_id}) telah ditambahkan.")

    def display_available_items(self):
        """Menampilkan semua item yang ada di perpustakaan."""
        print("\n== Daftar Semua Item di Perpustakaan ==")
        if not self._items:
            print("Perpustakaan masih kosong.")
            return
            
        for item in self._items:
            item.display_details()  # Polymorphism: panggil sesuai jenis item

    def find_item(self):
        """Mencari item berdasarkan judul atau ID."""
        print("\n== Cari Item ==")
        search_term = input("Masukkan Judul atau ID item: ").lower()
        
        found_items = []

        # Cari item berdasarkan kata kunci
        for item in self._items:
            if (search_term in item.title.lower()) or (search_term == item.item_id.lower()):
                found_items.append(item)

        if not found_items:
            print(f"Item dengan kata kunci '{search_term}' tidak ditemukan.")
            return
            
        print(f"\nMenampilkan {len(found_items)} item yang ditemukan:")
        for item in found_items:
            print(item)  # menggunakan __str__() untuk menampilkan hasil dengan rapi


# =====================================================
# BAGIAN 3: PROGRAM UTAMA 
# =====================================================

def clear_screen():
    """Membersihkan layar terminal (berbeda untuk Windows & Linux/Mac)."""
    os.system('cls' if os.name == 'nt' else 'clear')


def main():
    """Fungsi utama untuk menjalankan program perpustakaan."""
    my_library = Library()
    
    # Tambahkan beberapa data contoh (default)
    my_library._items.append(Book("Laskar Pelangi", "LIB-101", "Andrea Hirata"))
    my_library._items.append(Book("Cantik Itu Luka", "LIB-102", "Eka Kurniawan"))
    my_library._items.append(Book("Bumi Manusia", "LIB-103", "Pramoedya Ananta Toer"))

    # Menu utama
    while True:
        clear_screen()
        print("========================================")
        print("   Sistem Manajemen Perpustakaan 📚")
        print("========================================")
        print("1. Tampilkan Semua Item")
        print("2. Tambah Item Baru")
        print("3. Cari Item")
        print("4. Keluar")
        print("----------------------------------------")
        
        pilihan = input("Masukkan pilihan Anda (1-4): ")

        # Pilihan menu
        if pilihan == '1':
            my_library.display_available_items()
        elif pilihan == '2':
            my_library.add_item()
        elif pilihan == '3':
            my_library.find_item()
        elif pilihan == '4':
            print("\nTerima kasih telah menggunakan sistem manajemen ini. Sampai jumpa!")
            break
        else:
            print("\nPilihan tidak valid. Silahkan coba lagi.")
            
        input("\nTekan Enter untuk kembali ke menu...")


# Menjalankan program utama
if __name__ == "__main__":
    main()
