Minta maaf ya, saya mengerti maksud kamu. Kamu ingin **satu blok kode utuh** yang tidak terpotong-potong agar tinggal *copy-paste* sekali jalan ke file `README.md`.

Berikut adalah kode lengkapnya dalam satu blok:

```markdown
# Manajemen Matakuliah - API & Frontend

## Deskripsi Proyek
Aplikasi ini adalah sistem manajemen data mata kuliah sederhana yang dibangun menggunakan **Pyramid Web Framework** dan **SQLAlchemy**. Aplikasi ini menyediakan layanan RESTful API untuk operasi CRUD (Create, Read, Update, Delete) dan memiliki tampilan frontend modern berbasis HTML statis dengan font **Poppins** yang tersimpan di direktori `static/`.

## Cara Instalasi

### 1. Membuat Virtual Environment
Buka terminal di folder proyek Anda dan jalankan perintah:
```bash
python3 -m venv venv
source venv/bin/activate

```

### 2. Instalasi Dependensi

Instal package yang dibutuhkan termasuk Pyramid dan SQLAlchemy:

```bash
pip install -e .

```

### 3. Konfigurasi Database

Inisialisasi database menggunakan Alembic yang tersimpan di folder `alembic/` untuk membuat tabel berdasarkan model yang telah didefinisikan di folder `models/`:

```bash
alembic -c development.ini upgrade head

```

## Cara Menjalankan

### 1. Menjalankan Migrasi

Jika terdapat perubahan struktur pada file model (`mymodel.py`), jalankan perintah migrasi berikut:

```bash
alembic -c development.ini revision --autogenerate -m "inisialisasi matakuliah"
alembic -c development.ini upgrade head

```

### 2. Menjalankan Server

Jalankan server aplikasi menggunakan file konfigurasi utama `development.ini`:

```bash
pserve development.ini

```

Server akan berjalan di `http://localhost:6543/`. Halaman utama secara otomatis akan mengarah ke tampilan frontend dashboard yang sudah di-styling.

---

## API Endpoints

### 1. Get All Matakuliah

Mendapatkan semua daftar mata kuliah yang tersimpan di database.

* **Method:** `GET`
* **URL:** `http://localhost:6543/api/matakuliah`
* **Request:**

```bash
curl -X GET http://localhost:6543/api/matakuliah

```

* **Response:**

```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    }
  ]
}

```

### 2. Create Matakuliah

Menambahkan data mata kuliah baru ke database.

* **Method:** `POST`
* **URL:** `http://localhost:6543/api/matakuliah`
* **Request:**

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF202", "nama_mk": "Basis Data", "sks": 4, "semester": 3}'

```

* **Response:**

```json
{
  "status": "success",
  "data": {
    "id": 2,
    "kode_mk": "IF202",
    "nama_mk": "Basis Data",
    "sks": 4,
    "semester": 3
  }
}

```

### 3. Delete Matakuliah

Menghapus data mata kuliah berdasarkan ID.

* **Method:** `DELETE`
* **URL:** `http://localhost:6543/api/matakuliah/{id}`
* **Request:**

```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1

```

* **Response:**

```json
{
  "status": "deleted",
  "message": "Matakuliah ID 1 berhasil dihapus"
}

```

---

## Testing

Pengujian fungsionalitas aplikasi dapat dilakukan melalui dua cara:

1. **Frontend**: Melalui antarmuka grafis di browser pada alamat `http://localhost:6543/`.
2. **Terminal**: Menggunakan perintah `curl` untuk menguji endpoint API secara langsung.

```



Sudah saya satukan semua ya. Apakah ada lagi yang bisa saya bantu buatkan sebelum kamu kumpul tugasnya?

```