import { Pendaftaran } from "@/types/lembaga";

// ==========================================
// PANDUAN MENGUBAH PERSYARATAN:
// file ini mengatur data 'persyaratan' dan 'tahapanSeleksi'.
//
// CARA PAKAI:
// 1. Definisikan array persyaratan umum (misal: COMMON_DOCS)
// 2. Gunakan spread operator (...) untuk menggabungkan data umum + data khusus
//    Contoh: [...COMMON_DOCS, "Dokumen Tambahan"]
// ==========================================

// 1. Dokumen Standar (Pondok & Umum)
const COMMON_DOCS = [
  "Fotokopi Akta Kelahiran (3 Lembar)",
  "Fotokopi Kartu Keluarga (3 Lembar)",
  "Fotokopi KTP Orang Tua/Wali (3 Lembar)",
  "Pas Foto 3x4 Berwarna (4 Lembar)",
  "Surat Keterangan Sehat dari Dokter",
];

// 2. Dokumen Standar Sekolah Formal (SMP/SMA/SMK)
const SCHOOL_DOCS = [
  ...COMMON_DOCS,
  "Fotokopi Ijazah/SKL Terlegalisir (3 Lembar)",
  "Fotokopi NISN (Nomor Induk Siswa Nasional)",
  "Fotokopi Rapor Terakhir",
];

// 3. Dokumen Standar Mahasiswa (STIT)
const COLLEGE_DOCS = [
  ...COMMON_DOCS,
  "Fotokopi Ijazah SMA/MA/SMK Terlegalisir (3 Lembar)",
  "Fotokopi KTP Calon Mahasiswa (3 Lembar)",
];

// DATA PERSYARATAN PER LEMBAGA
export const PERSYARATAN_PENDAFTARAN: Record<string, Pendaftaran> = {
  // 1. Pondok Athfal (pass)
  pass: {
    // CONTOH: Mengambil data umum + menambahkan data khusus
    persyaratan: [...COMMON_DOCS, "Buku KIA / Catatan Imunisasi"],
    tahapanSeleksi: ["Observasi Anak", "Wawancara Wali Santri"],
  },

  // 2. Pondok Putra (ppss)
  ppss: {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Membaca Al-Qur'an", "Tes Pengetahuan Dasar Agama"],
  },

  // 3. SMP Putra Al-azhar (smp-putra)
  "smp-putra": {
    persyaratan: [...SCHOOL_DOCS],
    tahapanSeleksi: ["Tes Tulis (Agama & Umum)", "Wawancara", "Tes Mengaji"],
  },

  // 4. SMA Putra Al-azhar (sma-putra)
  "sma-putra": {
    persyaratan: [...SCHOOL_DOCS],
    tahapanSeleksi: ["Tes Tulis", "Tes Baca Kitab/Al-Qur'an", "Wawancara"],
  },

  // 5. Pondok Putri Az-zahro' (pp-azzahro)
  "pp-azzahro": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Al-Qur'an", "Tes Praktik Ibadah"],
  },

  // 6. Pondok Putri Nurus Salimin (pp-nurus)
  "pp-nurus": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Al-Qur'an", "Wawancara"],
  },

  // 7. SMP Putri Al-azhar (smp-putri)
  "smp-putri": {
    persyaratan: [...SCHOOL_DOCS],
    tahapanSeleksi: ["Tes Tulis", "Tes Mengaji", "Wawancara"],
  },

  // 8. SMK Putri Al-azhar (smk-putri)
  "smk-putri": {
    persyaratan: [...SCHOOL_DOCS],
    tahapanSeleksi: [
      "Tes Tulis",
      "Tes Minat & Bakat",
      "Tes Mengaji",
      "Wawancara",
    ],
  },

  // 9. Pondok Tahfidz Putra Ranggeh (pq-ranggeh)
  "pq-ranggeh": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Hafalan Al-Qur'an", "Tes Tajwid", "Wawancara"],
  },

  // 10. Pondok Tahfidz Putra Besuki (pt-besuki)
  "pt-besuki": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Hafalan", "Wawancara"],
  },

  // 11. STIT Sunniyah Salafiyah (stit)
  stit: {
    persyaratan: [...COLLEGE_DOCS],
    tahapanSeleksi: ["Tes TPA", "Tes Pengetahuan Agama", "Wawancara"],
  },

  // 12. Madrasah Diniyah Putra (md-putra)
  "md-putra": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Penempatan Kelas"],
  },

  // 13. Madrasah Diniyah Putri (md-azzahro)
  "md-azzahro": {
    persyaratan: [...COMMON_DOCS],
    tahapanSeleksi: ["Tes Penempatan Kelas"],
  },

  // 14. Pendidikan Autis (pa-autism)
  "pa-autism": {
    persyaratan: [
      "Fotokopi Akta Kelahiran",
      "Fotokopi KK",
      "Riwayat Kesehatan/Terapi Anak",
      "Pas Foto 3x4",
    ],
    tahapanSeleksi: ["Assessment Psikolog", "Observasi Tumbuh Kembang"],
  },
};
