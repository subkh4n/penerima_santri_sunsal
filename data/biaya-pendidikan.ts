import { BiayaType, Lembaga } from "@/types/lembaga";

// Interface helper for the data file structure
interface BiayaLembaga {
  tahunAjaran: string;
  boarding?: BiayaType;
  fullDay?: BiayaType;
}

// Helper to create cost item
const createBiayaItem = (
  nama: string,
  jumlah: number,
  deskripsi: string,
  icon: string = "payments"
) => ({
  nama,
  jumlah,
  deskripsi,
  icon,
});

// ==========================================
// PANDUAN MENGUBAH BIAYA:
// Ubah nominal atau rincian di bawah ini.
// 'boarding' = Santri Mukim (Asrama)
// 'fullDay' = Santri Tidak Mukim (Pulang Pergi)
// ==========================================

export const BIAYA_PENDIDIKAN: Record<string, BiayaLembaga> = {
  // 1. Pondok Athfal (pass)
  pass: {
    tahunAjaran: "2026-2027",
    boarding: {
      totalEstimasi: 3500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2000000, "Biaya pendaftaran awal"),
        createBiayaItem(
          "Perlengkapan",
          500000,
          "Tas, alat tulis, dan buku",
          "backpack"
        ),
        createBiayaItem("Kegiatan", 600000, "Kegiatan setahun", "celebration"),
        createBiayaItem("SPP", 400000, "Bulan pertama", "school"),
      ],
    },
    fullDay: {
      totalEstimasi: 2500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 1500000, "Biaya pendaftaran awal"),
        createBiayaItem(
          "Perlengkapan",
          700000,
          "Seragam & Perlengkapan",
          "backpack"
        ),
        createBiayaItem("Kegiatan", 0, "Termasuk di SPP", "celebration"),
        createBiayaItem("SPP", 300000, "Bulan pertama", "school"),
      ],
    },
  },

  // 2. Pondok Putra (ppss)
  ppss: {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 4200000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2500000, "Pengembangan institusi"),
        createBiayaItem(
          "Perlengkapan",
          800000,
          "Seragam & Lemari",
          "checkroom"
        ),
        createBiayaItem("Kegiatan", 400000, "Kegiatan pondok", "celebration"),
        createBiayaItem("SPP", 500000, "Bulan pertama + Kitab", "school"),
      ],
    },
  },

  // 3. SMP Putra Al-azhar (smp-putra)
  "smp-putra": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 4200000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2500000, "Uang Gedung"),
        createBiayaItem("Perlengkapan", 800000, "Seragam sekolah", "backpack"),
        createBiayaItem("Kegiatan", 500000, "OSIS & Ekstra", "sports_soccer"),
        createBiayaItem("SPP", 400000, "Bulan pertama", "school"),
      ],
    },
  },

  // 4. SMA Putra Al-azhar (sma-putra)
  "sma-putra": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 5000000,
      rincian: [
        createBiayaItem("Uang Pangkal", 3000000, "Uang Gedung"),
        createBiayaItem("Perlengkapan", 1000000, "Seragam sekolah", "backpack"),
        createBiayaItem("Kegiatan", 500000, "OSIS & Ekstra", "groups"),
        createBiayaItem("SPP", 500000, "Bulan pertama", "school"),
      ],
    },
  },

  // 5. Pondok Putri Az-zahro' (pp-azzahro)
  "pp-azzahro": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 3800000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2000000, "Administrasi awal"),
        createBiayaItem(
          "Perlengkapan",
          950000,
          "Seragam & Lemari",
          "checkroom"
        ),
        createBiayaItem("Kegiatan", 500000, "Kegiatan pondok", "celebration"),
        createBiayaItem("SPP", 350000, "Bulan pertama", "school"),
      ],
    },
  },

  // 6. Pondok Putri Nurus Salimin (pp-nurus)
  "pp-nurus": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 3500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 1800000, "Infaq Pembangunan"),
        createBiayaItem("Perlengkapan", 800000, "Seragam lengkap", "checkroom"),
        createBiayaItem("Kegiatan", 600000, "Kitab & Kegiatan", "menu_book"),
        createBiayaItem("SPP", 300000, "Bulan pertama", "school"),
      ],
    },
  },

  // 7. SMP Putri Al-azhar (smp-putri)
  "smp-putri": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 4200000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2500000, "Uang Gedung"),
        createBiayaItem("Perlengkapan", 900000, "Seragam sekolah", "backpack"),
        createBiayaItem("Kegiatan", 400000, "OSIS & Ekstra", "event"),
        createBiayaItem("SPP", 400000, "Bulan pertama", "school"),
      ],
    },
  },

  // 8. SMK Putri Al-azhar (smk-putri)
  "smk-putri": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 4500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 2800000, "Uang Gedung"),
        createBiayaItem(
          "Perlengkapan",
          950000,
          "Seragam & Wearpack",
          "backpack"
        ),
        createBiayaItem("Kegiatan", 300000, "Praktikum", "science"),
        createBiayaItem("SPP", 450000, "Bulan pertama", "school"),
      ],
    },
  },

  // 9. Pondok Tahfidz Putra Ranggeh (pq-ranggeh)
  // DATA SESUAI GAMBAR USER
  "pq-ranggeh": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 7325000,
      rincian: [
        createBiayaItem(
          "Uang Pangkal",
          5000000,
          "Infaq Pengembangan",
          "payments"
        ),
        createBiayaItem("Perlengkapan", 425000, "Almari/Box", "backpack"),
        createBiayaItem(
          "Kegiatan",
          950000,
          "Kegiatan Satu Tahun",
          "celebration"
        ),
        createBiayaItem(
          "SPP",
          950000,
          "Makan & Syahriah (Bulan Pertama)",
          "school"
        ),
      ],
    },
  },

  // 10. Pondok Tahfidz Putra Besuki (pt-besuki)
  "pt-besuki": {
    tahunAjaran: "2025-2026",
    boarding: {
      totalEstimasi: 3000000,
      rincian: [
        createBiayaItem("Uang Pangkal", 1500000, "Administrasi"),
        createBiayaItem("Perlengkapan", 400000, "Fasilitas", "backpack"),
        createBiayaItem("Kegiatan", 300000, "Program Tahfidz", "menu_book"),
        createBiayaItem("SPP", 800000, "Bulan pertama", "school"),
      ],
    },
  },

  // 11. STIT Sunniyah Salafiyah (stit)
  stit: {
    tahunAjaran: "2025-2026",
    fullDay: {
      totalEstimasi: 3500000,
      rincian: [
        createBiayaItem("DPP", 2000000, "Dana Pengembangan Pendidikan"),
        createBiayaItem(
          "SPP Semester 1",
          1000000,
          "Biaya per semester",
          "school"
        ),
        createBiayaItem("Jas Almamater", 500000, "Jas & KTM", "checkroom"),
      ],
    },
  },

  // 12. Madrasah Diniyah Putra (md-putra)
  "md-putra": {
    tahunAjaran: "2025-2026",
    fullDay: {
      totalEstimasi: 500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 200000, "Pendaftaran"),
        createBiayaItem("Perlengkapan", 300000, "Kitab & Kartu", "backpack"),
        createBiayaItem("Kegiatan", 0, "-", "celebration"),
        createBiayaItem("SPP", 0, "Gratis (Ikut Pondok)", "school"),
      ],
    },
  },

  // 13. Madrasah Diniyah Putri (md-azzahro)
  "md-azzahro": {
    tahunAjaran: "2025-2026",
    fullDay: {
      totalEstimasi: 500000,
      rincian: [
        createBiayaItem("Uang Pangkal", 200000, "Pendaftaran"),
        createBiayaItem("Perlengkapan", 300000, "Kitab", "backpack"),
        createBiayaItem("Kegiatan", 0, "-", "celebration"),
        createBiayaItem("SPP", 0, "-", "school"),
      ],
    },
  },

  // 14. Pendidikan Autis (pa-autism)
  "pa-autism": {
    tahunAjaran: "2025-2026",
    fullDay: {
      totalEstimasi: 4000000,
      rincian: [
        createBiayaItem(
          "Uang Pangkal",
          1000000,
          "Assessment Awal",
          "psychology"
        ),
        createBiayaItem("Perlengkapan", 1500000, "Media & Sarana", "toys"),
        createBiayaItem("Kegiatan", 0, "Termasuk di SPP", "celebration"),
        createBiayaItem("SPP", 1500000, "Bulan pertama", "school"),
      ],
    },
  },
};
