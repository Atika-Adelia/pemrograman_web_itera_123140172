
import { Jadwal, ambilData, simpanData, buatElemenJadwal } from './app.js';

const KEY_PENYIMPANAN = 'JADWAL_KULIAH_SAYA';
const form = document.getElementById('form-jadwal');
const listContainer = document.getElementById('jadwal-list');

const inputMatkul = document.getElementById('mata-kuliah');
const inputLokasi = document.getElementById('lokasi');
const inputHari = document.getElementById('hari');
const inputMulai = document.getElementById('jam-mulai');
const inputSelesai = document.getElementById('jam-selesai');
const inputEditId = document.getElementById('edit-id');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');

const muatDanTampilkanJadwal = async () => {
    listContainer.innerHTML = ''; 

    try {
        const daftarJadwal = await ambilData(KEY_PENYIMPANAN);

        daftarJadwal.forEach(jadwal => {
            const elemenJadwal = buatElemenJadwal(jadwal);
            listContainer.appendChild(elemenJadwal);
        });

    } catch (error) {
        console.error('Gagal memuat data:', error);
    }
};

const resetFormDanMode = () => {
    form.reset(); 
    inputEditId.value = '';
    btnSubmit.textContent = 'Tambah Jadwal'; 
    btnCancel.style.display = 'none'; 
}

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const matkul = inputMatkul.value;
    const lokasi = inputLokasi.value; 
    const hari = inputHari.value;
    const mulai = inputMulai.value;
    const selesai = inputSelesai.value;

    const idToEdit = inputEditId.value;

    try {
        let daftarJadwal = await ambilData(KEY_PENYIMPANAN);

        if (idToEdit) {
            daftarJadwal = daftarJadwal.map(jadwal => {
                if (jadwal.id === Number(idToEdit)) {
                    return new Jadwal(Number(idToEdit), matkul, lokasi, hari, mulai, selesai);
                }
                return jadwal;
            });

        } else {
            const idBaru = +new Date(); 
            const jadwalBaru = new Jadwal(idBaru, matkul, lokasi, hari, mulai, selesai);
            daftarJadwal.push(jadwalBaru);
        }

        simpanData(KEY_PENYIMPANAN, daftarJadwal);

        resetFormDanMode();
        muatDanTampilkanJadwal();

    } catch (error) {
        console.error('Gagal menyimpan/update data:', error);
    }
});

listContainer.addEventListener('click', async (event) => {
    
    if (event.target.classList.contains('btn-delete')) {
        const idHapus = Number(event.target.dataset.id);
        try {
            let daftarJadwal = await ambilData(KEY_PENYIMPANAN);
       
            daftarJadwal = daftarJadwal.filter(jadwal => jadwal.id !== idHapus);
            
            simpanData(KEY_PENYIMPANAN, daftarJadwal);
            muatDanTampilkanJadwal();
        } catch (error) {
            console.error('Gagal menghapus data:', error);
        }

    } else if (event.target.classList.contains('btn-edit')) {
        const idEdit = Number(event.target.dataset.id);

        try {
            const daftarJadwal = await ambilData(KEY_PENYIMPANAN);
            const jadwalEdit = daftarJadwal.find(jadwal => jadwal.id === idEdit);

            if (jadwalEdit) {
                inputMatkul.value = jadwalEdit.matkul;
                inputLokasi.value = jadwalEdit.lokasi;
                inputHari.value = jadwalEdit.hari;
                inputMulai.value = jadwalEdit.mulai;
                inputSelesai.value = jadwalEdit.selesai;
                
                inputEditId.value = jadwalEdit.id;

                btnSubmit.textContent = 'Update Jadwal';
                btnCancel.style.display = 'block'; 

                form.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Gagal mengambil data untuk diedit:', error);
        }
    }
});

btnCancel.addEventListener('click', () => {
    resetFormDanMode();
});

document.addEventListener('DOMContentLoaded', muatDanTampilkanJadwal);