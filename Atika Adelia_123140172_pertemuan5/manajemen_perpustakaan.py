from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, id_item, title):
        self._id_item = id_item 
        self._title = title
        
    @property
    def id_item(self):
        return self._id_item

    @property
    def title(self):
        return self._title
    
    @abstractmethod #abstrakmethod
    def display_info(self):
        pass

class Book(LibraryItem):
    def __init__(self, id_item, title, author):
        super().__init__(id_item, title)
        self._author = author #enkapsulasi

    
    def display_info(self):
        print(f"[BUKU]   | ID: {self.id_item} | Judul: {self.title} | Penulis: {self._author}")

class Magazine(LibraryItem):
    def __init__(self, id_item, title, issue_number): #inheritance
        super().__init__(id_item, title)
        self._issue_number = issue_number #enkapsulasi
    
    def display_info(self):
        print(f"[MAJALAH]| ID: {self.id_item} | Judul: {self.title} | Edisi: {self._issue_number}")


class Library:
    def __init__(self):
        self._items = [] 

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self._items.append(item)
            print(f"INFO: Item '{item.title}' berhasil ditambahkan")
        else:
            print("ERROR: Hanya objek dari LibraryItem yang bisa ditambahkan.")

    def display_items(self):
        if not self._items:
            print("Perpustakaan masih kosong")
            return

        print("\n--------------------------- Daftar Item di Perpustakaan ---------------------------")
        for item in self._items:
            item.display_info()
        print("----------------------------------------------------------------------------------")

    def search_item(self, query):
        found_items = []
        query_lower = query.lower()
        
        for item in self._items:
            if query == item.id_item or query_lower in item.title.lower():
                found_items.append(item)
                
        if not found_items:
            print(f"Hasil pencarian: Tidak ada item yang cocok dengan '{query}'.")
        else:
            print(f"\n--- Hasil Pencarian untuk '{query}' ---")
            for item in found_items:
                item.display_info() #polimorfisme
            print("----------------------------------------------------------------------------------")

def main():
    my_library = Library()
    print("Sistem Manajemen Perpustakaan Sederhana")
    print("Selamat datang!")

    my_library.add_item(Book("B001", "Dasar Pemrograman Python", "Guido van Rossum"))
    my_library.add_item(Magazine("M001", "National Geographic", "Vol. 150, No. 2"))

    while True:
        print("\n=== MENU UTAMA ===")
        print("1. Tambah Item Baru")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item")
        print("4. Keluar")
        
        choice = input("Silakan pilih opsi (1-4): ")
        
        if choice == '1':
            print("\n--- Tambah Item Baru ---")
            print("Pilih tipe item:")
            print("  1. Buku")
            print("  2. Majalah")
            tipe_item = input("Masukkan pilihan (1 atau 2): ")

            id_item = input("Masukkan ID Item (cth: B002): ")
            title = input("Masukkan Judul: ")
            
            if tipe_item == '1':
                author = input("Masukkan Nama Penulis: ")
                new_item = Book(id_item, title, author)
                my_library.add_item(new_item)
            elif tipe_item == '2':
                issue = input("Masukkan Edisi/Nomor Terbit (cth: Vol. 10): ")
                new_item = Magazine(id_item, title, issue)
                my_library.add_item(new_item)
            else:
                print("ERROR: Tipe item tidak valid. Item gagal ditambahkan.")
        
        elif choice == '2':
            my_library.display_items()
            
        elif choice == '3':
            print("\n--- Cari Item ---")
            query = input("Masukkan ID atau kata kunci Judul yang ingin dicari: ")
            if not query:
                print("ERROR: Kata kunci tidak boleh kosong")
            else:
                my_library.search_item(query)
                
        elif choice == '4':
            print("\nTerima kasih telah menggunakan layanan kami!")
            break
            
        else:
            # Pilihan tidak valid
            print(f"ERROR: Pilihan '{choice}' tidak ada di menu. Silakan coba lagi ya :D")

if __name__ == "__main__":
    main()