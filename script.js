async function fetchCSV(url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.trim().split('\n').map(row => row.split(','));
  return rows;
}

const urls = {
  dataKaryawan: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=0&single=true&output=csv',
  absensi: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=734539946&single=true&output=csv',
  rekrutmen: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=1775223337&single=true&output=csv',
  profil: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=548822971&single=true&output=csv',
  kalender: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=1690322820&single=true&output=csv'
};

async function loadDashboard() {
  try {
    const [karyawan, absensi, rekrutmen, profil, kalender] = await Promise.all([
      fetchCSV(urls.dataKaryawan),
      fetchCSV(urls.absensi),
      fetchCSV(urls.rekrutmen),
      fetchCSV(urls.profil),
      fetchCSV(urls.kalender)
    ]);
// GRAFIK GENDER (Bar Chart)
const genderIndex = karyawan[0].indexOf("Jenis Kelamin");
let laki = 0, perempuan = 0;
for (let i = 1; i < karyawan.length; i++) {
  const jk = karyawan[i][genderIndex]?.toLowerCase();
  if (jk === "laki-laki") laki++;
  else if (jk === "perempuan") perempuan++;
}
new Chart(document.getElementById("genderChart"), {
  type: "bar",
  data: {
    labels: ["Laki-laki", "Perempuan"],
    datasets: [{
      label: "Jumlah Karyawan",
      data: [laki, perempuan],
      backgroundColor: ["#36A2EB", "#FF6384"]
    }]
  }
});

// GRAFIK STATUS REKRUTMEN (Pie Chart)
const statusIndex = rekrutmen[0].indexOf("Status");
const statusMap = {};
for (let i = 1; i < rekrutmen.length; i++) {
  const status = rekrutmen[i][statusIndex] || "Tidak Diketahui";
  statusMap[status] = (statusMap[status] || 0) + 1;
}
new Chart(document.getElementById("rekrutmenChart"), {
  type: "pie",
  data: {
    labels: Object.keys(statusMap),
    datasets: [{
      label: "Status Rekrutmen",
      data: Object.values(statusMap),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
    }]
  }
});

    document.getElementById("summary").innerHTML = `<h3>Total Karyawan: ${karyawan.length - 1}</h3>`;
    document.getElementById("top-absen").innerHTML = `<h3>Total Absen (rekap): ${absensi.length - 1}</h3>`;
    document.getElementById("rekrutmen-status").innerHTML = `<h3>Jumlah Pelamar: ${rekrutmen.length - 1}</h3>`;
    document.getElementById("profil-search").innerHTML = `<h3>Data Profil: ${profil.length - 1}</h3>`;
    document.getElementById("kalender-kerja").innerHTML = `<h3>Jadwal Kerja: ${kalender.length - 1} hari</h3>`;
  } catch (error) {
    console.error("Gagal memuat data:", error);
  }
}

window.onload = loadDashboard;
