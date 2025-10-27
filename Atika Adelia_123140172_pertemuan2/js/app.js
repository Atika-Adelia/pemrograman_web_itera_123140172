export class Jadwal {
  constructor(id, matkul, lokasi, hari, mulai, selesai) {
      this.id = id;
      this.matkul = matkul;
      this.lokasi = lokasi; 
      this.hari = hari;
      this.mulai = mulai;
      this.selesai = selesai;
  }
}

export const ambilData = (key) => {
  return new Promise((resolve, reject) => {
      try {
          const dataString = localStorage.getItem(key);
          const data = JSON.parse(dataString) || [];
          resolve(data);
      } catch (error) {
          reject(error);
      }
  });
};


export const simpanData = (key, data) => {
  try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
  } catch (error) {
      console.error("Gagal menyimpan data:", error);
      return false;
  }
};


export const buatElemenJadwal = (jadwal) => {
  const item = document.createElement('div');
  item.classList.add('jadwal-item');

  item.innerHTML = `
      <div class="jadwal-info">
          <h3>${jadwal.matkul}</h3>
          <p><strong>Lokasi:</strong> ${jadwal.lokasi}</p>
          <p>${jadwal.hari}, ${jadwal.mulai} - ${jadwal.selesai}</p>
      </div>
      <div class="jadwal-actions">
          <button class="btn-edit" data-id="${jadwal.id}">Edit</button>
          <button class="btn-delete" data-id="${jadwal.id}">Hapus</button>
      </div>
  `;
  return item;
};