
// Ambil data dari Google Sheets CSV
async function fetchCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  return text.split("\n").slice(1).map(row => row.split(","));
}

const urls = {
  dataKaryawan: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=0&single=true&output=csv',
  absensi: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=734539946&single=true&output=csv',
  rekrutmen: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=1775223337&single=true&output=csv',
  profil: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=548822971&single=true&output=csv',
  kalender: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR24q7s6aXPhgRXTxy6yoTwEwoIQXh3XxoiU0VXPpZXGh_4wpQJ9DvUhJRWBhuOUX9Vp9F6cRi56ceU/pub?gid=1690322820&single=true&output=csv',
};

async function loadDashboard() {
  const dataKaryawan = await fetchCSV(urls.dataKaryawan);
  document.getElementById("summary").innerText = "Total Karyawan: " + dataKaryawan.length;

  const absensi = await fetchCSV(urls.absensi);
  document.getElementById("top-absen").innerText = "Total Absen Data: " + absensi.length;

  const rekrutmen = await fetchCSV(urls.rekrutmen);
  document.getElementById("rekrutmen-status").innerText = "Pelamar: " + rekrutmen.length;

  const profil = await fetchCSV(urls.profil);
  document.getElementById("profil-search").innerText = "Data Profil: " + profil.length;

  const kalender = await fetchCSV(urls.kalender);
  document.getElementById("kalender-kerja").innerText = "Data Kalender: " + kalender.length;
}

window.onload = loadDashboard;
