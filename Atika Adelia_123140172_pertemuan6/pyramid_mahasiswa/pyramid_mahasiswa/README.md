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

Server akan berjalan di `http://localhost:6543/`. Halaman utama secara otomatis akan mengarah ke tampilan frontend dashboard yang sudah di-styling dengan rapi.

---

## API Endpoints

### 1. Get All Matakuliah

Mendapatkan semua daftar mata kuliah yang tersimpan di database.

* **Method:** `GET`
* **URL:** `http://localhost:6543/api/matakuliah`
* **Request:**

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF101", "nama_mk": "Algoritma dan Pemrograman", "sks": 3, "semester": 1}'

```

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF202", "nama_mk": "Basis Data", "sks": 4, "semester": 3}'

```

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF303", "nama_mk": "Pemrograman Web", "sks": 3, "semester": 5}'

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
    },
    {
      "id": 2,
      "kode_mk": "IF202",
      "nama_mk": "Basis Data",
      "sks": 4,
      "semester": 3
    },
    {
      "id": 3,
      "kode_mk": "IF303",
      "nama_mk": "Pemrograman Web",
      "sks": 3,
      "semester": 5
    },
  ]
}

```

### 2. Create Matakuliah

Menambahkan data mata kuliah baru ke database.

* **Method:** `POST`
* **URL:** `http://localhost:6543/api/matakuliah`
* **Request:**

```bash
curl -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d '{"kode_mk": "IF103", "nama_mk": "Metodologi Penelitian", "sks": 3, "semester": 5}'

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
    },
    {
      "id": 2,
      "kode_mk": "IF202",
      "nama_mk": "Basis Data",
      "sks": 4,
      "semester": 3
    },
    {
      "id": 3,
      "kode_mk": "IF303",
      "nama_mk": "Pemrograman Web",
      "sks": 3,
      "semester": 5
    },
    {
      "id": 4,
      "kode_mk": "IF103",
      "nama_mk": "Metodologi Penelitian",
      "sks": 3,
      "semester": 5
    }
  ]
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
  "matakuliahs": [
    {
      "id": 2,
      "kode_mk": "IF202",
      "nama_mk": "Basis Data",
      "sks": 4,
      "semester": 3
    },
    {
      "id": 3,
      "kode_mk": "IF303",
      "nama_mk": "Pemrograman Web",
      "sks": 3,
      "semester": 5
    },
    {
      "id": 4,
      "kode_mk": "IF103",
      "nama_mk": "Metodologi Penelitian",
      "sks": 3,
      "semester": 5
    }
  ]
}

```

---

## Testing

Pengujian fungsionalitas aplikasi dapat dilakukan melalui dua cara:

1. **Frontend**: Melalui antarmuka grafis di browser pada alamat `http://localhost:6543/`.
2. **Terminal**: Menggunakan perintah `curl` untuk menguji endpoint API secara langsung.