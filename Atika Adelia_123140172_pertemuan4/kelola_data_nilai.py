database_mahasiswa = [
    {
        'nama': 'Atika Adelia',
        'NIM': '123140172',
        'nilai_uts': 90,
        'nilai_uas': 85,
        'nilai_tugas': 100
    },
    {
        'nama': 'Fadzilah Saputri',
        'NIM': '123140149',
        'nilai_uts': 90,
        'nilai_uas': 95,
        'nilai_tugas': 88
    },
    {
        'nama': 'Fadina Mustika',
        'NIM': '123140157',
        'nilai_uts': 60,
        'nilai_uas': 50,
        'nilai_tugas': 65
    },
    {
        'nama': 'Raisya Syifa',
        'NIM': '123140169',
        'nilai_uts': 75,
        'nilai_uas': 80,
        'nilai_tugas': 78
    },
    {
        'nama': 'Nadya Shafwa',
        'NIM': '123140167',
        'nilai_uts': 40,
        'nilai_uas': 55,
        'nilai_tugas': 301
    }
]


def hitung_nilai_akhir(uts, uas, tugas):
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai_akhir):
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_data(data_list):
    
    if not data_list:
        print("Tidak ada data untuk ditampilkan.")
        return

    print("=" * 78)
    print(f"| {'No':<3} | {'Nama Mahasiswa':<20} | {'NIM':<8} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 78)
    
    for i, mhs in enumerate(data_list):
        print(f"| {i+1:<3} | {mhs['nama']:<20} | {mhs['NIM']:<8} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {mhs['nilai_akhir']:<6.2f} | {mhs['grade']:<5} |")
    
    print("=" * 78)

def cari_mahasiswa_ekstrem(data_list):
    if not data_list:
        return None, None 
    
    mahasiswa_tertinggi = data_list[0]
    mahasiswa_terendah = data_list[0]

    for mhs in data_list:
        if mhs['nilai_akhir'] > mahasiswa_tertinggi['nilai_akhir']:
            mahasiswa_tertinggi = mhs
        
        if mhs['nilai_akhir'] < mahasiswa_terendah['nilai_akhir']:
            mahasiswa_terendah = mhs
            
    return mahasiswa_tertinggi, mahasiswa_terendah


def input_nilai_valid(prompt):
    while True:
        try:
            nilai = float(input(prompt))
            if 0 <= nilai <= 100:
                return nilai
            else:
                print("Input tidak valid. Masukkan nilai antara 0 dan 100.")
        except ValueError:
            print("Input tidak valid. Masukkan angka.")

def input_data_baru():
    print("\n--- Input Data Mahasiswa Baru ---")
    nama = input("Nama: ")
    nim = input("NIM: ")
    uts = input_nilai_valid("Nilai UTS: ")
    uas = input_nilai_valid("Nilai UAS: ")
    tugas = input_nilai_valid("Nilai Tugas: ")

    nilai_akhir = hitung_nilai_akhir(uts, uas, tugas)
    grade = tentukan_grade(nilai_akhir)
    
    mahasiswa_baru = {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas,
        'nilai_akhir': nilai_akhir,
        'grade': grade
    }
    return mahasiswa_baru

def filter_berdasarkan_grade(data_list, grade_dicari):
    hasil_filter = []
    
    for mhs in data_list:
        if mhs['grade'] == grade_dicari.upper(): 
            hasil_filter.append(mhs)
            
    return hasil_filter

def hitung_rata_rata_kelas(data_list):
    if not data_list:
        return 0 

    total_nilai = 0
    for mhs in data_list:
        total_nilai = total_nilai + mhs['nilai_akhir']
        
    rata_rata = total_nilai / len(data_list)
    return rata_rata


def proses_data_awal(data_list):
    for mhs in data_list:
        if 'nilai_akhir' not in mhs:
            nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
            mhs['nilai_akhir'] = nilai_akhir
            mhs['grade'] = tentukan_grade(nilai_akhir)


def main_menu():
    proses_data_awal(database_mahasiswa)
    
    while True:
        print("\n--- Sistem Pengelolaan Nilai Mahasiswa PAW RB ---")
        print("1. Tampilkan Semua Data Nilai")
        print("2. Tambah Data Mahasiswa Baru")
        print("3. Filter Mahasiswa Berdasarkan Grade")
        print("4. Tampilkan Rata-Rata Nilai Kelas")
        print("5. Cari Nilai Tertinggi dan Terendah")
        print("0. Keluar Program")
        
        pilihan = input("Masukkan pilihan Anda (0-5): ")
        
        if pilihan == '1':
            print("\n--- Data Lengkap Mahasiswa ---")
            tampilkan_data(database_mahasiswa)
        
        elif pilihan == '2':
            mahasiswa_baru = input_data_baru()
            database_mahasiswa.append(mahasiswa_baru)
            print("Data mahasiswa baru berhasil ditambahkan!")
            
        elif pilihan == '3':
            grade_dicari = input("Masukkan Grade yang ingin difilter (A/B/C/D/E): ")
            hasil_filter = filter_berdasarkan_grade(database_mahasiswa, grade_dicari)
            print(f"\n--- Hasil Filter untuk Grade '{grade_dicari.upper()}' ---")
            tampilkan_data(hasil_filter)
            
        elif pilihan == '4':
            rata_rata = hitung_rata_rata_kelas(database_mahasiswa)
            print(f"\nNilai rata-rata akhir untuk kelas PAW-RB adalah: {rata_rata:.2f}")
            
        elif pilihan == '5':
            tertinggi, terendah = cari_mahasiswa_ekstrem(database_mahasiswa)
            
            if tertinggi and terendah:
                print("\n--- Mahasiswa dengan Nilai Tertinggi ---")
                tampilkan_data([tertinggi]) 
                
                print("\n--- Mahasiswa dengan Nilai Terendah ---")
                tampilkan_data([terendah]) 
            else:
                print("Data masih kosong.")

        elif pilihan == '0':
            print("Terima kasih telah menggunakan layanan ini. Sampai jumpa!")
            break 
            
        else:
            print("Pilihan tidak valid. Silakan masukkan angka 0 sampai 5")

if __name__ == "__main__":
    main_menu()