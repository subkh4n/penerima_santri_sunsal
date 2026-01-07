import {
  InstitutionSchedule,
  WaveData,
  TimelineItem,
  ScheduleItem,
} from "@/types/jadwal";

// Helper to create wave data
const createSpecificWave = (
  gelombang: "1" | "2" | "3",
  regDate: string | null, // Registration date range
  testInfo: string | null // Test date info
): WaveData => {
  if (!regDate || regDate === "---" || regDate === "-----") {
    return {
      gelombang,
      isOpened: false,
      kegiatan: [],
      timeline: [],
    };
  }

  // Determine other dates based on wave (approximate logic since not in image)
  const announceDate =
    gelombang === "1" ? "1 Mei 2025" : gelombang === "2" ? "15 Juni 2025" : "-"; // Placeholder
  const daftarUlangDate =
    gelombang === "1"
      ? "2 - 10 Mei 2025"
      : gelombang === "2"
      ? "16 - 25 Juni 2025"
      : "-"; // Placeholder

  const kegiatan: ScheduleItem[] = [
    {
      id: `daftar-${gelombang}`,
      dateRange: regDate,
      activity: "Pendaftaran Online",
      description: "Via Aplikasi/Website",
    },
  ];

  const timeline: TimelineItem[] = [
    {
      id: `t-daftar-${gelombang}`,
      status: "Akan Datang", // Default status, UI calculates actual status if needed or we hardcode based on current date
      date: regDate,
      title: "Pendaftaran Online",
      description:
        "Pengisian formulir biodata santri dan upload berkas persyaratan.",
    },
  ];

  if (testInfo && testInfo !== "---" && testInfo !== "-----") {
    kegiatan.push({
      id: `tes-${gelombang}`,
      dateRange: testInfo,
      activity: "Tes Seleksi",
      description: "Sesuai Jadwal",
    });
    timeline.push({
      id: `t-tes-${gelombang}`,
      status: "Akan Datang",
      date: testInfo,
      title: "Tes Seleksi Masuk",
      description: "Tes kemampuan dasar, Al-Qur'an, dan wawancara.",
    });
  }

  // Add standard post-test events
  kegiatan.push(
    {
      id: `pengumuman-${gelombang}`,
      dateRange: "Menyesuaikan",
      activity: "Pengumuman",
      description: "Via Website/Aplikasi",
    },
    {
      id: `daftar-ulang-${gelombang}`,
      dateRange: "Menyesuaikan",
      activity: "Daftar Ulang",
      description: "Pembayaran & Pengambilan Seragam",
    }
  );

  timeline.push(
    {
      id: `t-pengumuman-${gelombang}`,
      status: "Akan Datang",
      date: "Menyesuaikan",
      title: "Pengumuman Kelulusan",
      description: "Hasil tes seleksi dapat dilihat melalui aplikasi.",
    },
    {
      id: `t-daftar-ulang-${gelombang}`,
      status: "Akan Datang",
      date: "Menyesuaikan",
      title: "Daftar Ulang",
      description: "Pembayaran biaya masuk dan pengambilan seragam.",
    },
    {
      id: `t-masuk-${gelombang}`,
      status: "Akan Datang",
      date: "15 Juli 2025",
      title: "Awal Masuk Sekolah",
      description: "Hari pertama kegiatan Belajar Mengajar (KBM) dimulai.",
    }
  );

  return {
    gelombang,
    isOpened: true,
    kegiatan,
    timeline,
  };
};

// Data Source from Images
// ==========================================
// PANDUAN MENGUBAH JADWAL:
// Cukup ubah tanggal di dalam objek 'SCHEDULE_SOURCE' di bawah ini.
// Format:
// 'id-lembaga': {
//    1: { reg: "Tanggal Pendaftaran Gel 1", tes: "Tanggal Tes Gel 1" },
//    2: { reg: "Tanggal Pendaftaran Gel 2", tes: "Tanggal Tes Gel 2" }
// }
//
// Tips:
// - Jika tidak ada tes, isi dengan "---"
// - Jika gelombang ditutup, isi tanggal dengan "---" atau biarkan kosong
// ==========================================
const SCHEDULE_SOURCE: Record<
  string,
  {
    1: { reg: string; tes: string };
    2: { reg: string; tes: string };
  }
> = {
  // 1. Pondok Athfal (pass)
  pass: {
    1: { reg: "01 Februari - 25 Maret 2025", tes: "---" },
    2: { reg: "---", tes: "---" },
  },
  // 2. Pondok Putra (ppss)
  ppss: {
    1: { reg: "20 Januari - 19 Februari 2025", tes: "---" },
    2: { reg: "1 Maret - 25 Maret 2025", tes: "---" },
  },
  // 3. SMP Putra Al-azhar (smp-putra)
  "smp-putra": {
    1: {
      reg: "01 Februari - 23 Maret 2025",
      tes: "Online: 13 April 2025, Offline: 20 April 2025",
    },
    2: {
      reg: "21 April - 25 Mei 2025",
      tes: "Online: 29 Mei 2025, Offline: 01 Juni 2025",
    },
  },
  // 4. SMA Putra Al-azhar (sma-putra)
  "sma-putra": {
    1: { reg: "01 Februari - 05 April 2025", tes: "04 Mei 2025" },
    2: { reg: "06 - 31 Mei 2025", tes: "08 Juni 2025" }, // Corrected year typo 2024->2025 if present
  },
  // 5. Pondok Putri Az-zahro' (pp-azzahro)
  "pp-azzahro": {
    1: {
      reg: "18 Januari - 31 Januari 2025",
      tes: "Online: 01 Februari 2025, Offline: 02 Februari 2025",
    },
    2: {
      reg: "03 - 14 Februari 2025",
      tes: "Online: 15 Februari 2025, Offline: 16 Februari 2025",
    },
  },
  // 5 (Second 5). Pondok Putri Nurus Salimin (pp-nurus)
  "pp-nurus": {
    1: { reg: "16 Januari - 14 Februari 2025", tes: "16 Februari 2025" },
    2: { reg: "02 - 31 Maret 2025", tes: "8 April 2025" },
  },
  // 6. SMP Putri Al-azhar (smp-putri)
  "smp-putri": {
    1: { reg: "01 Februari - 19 April 2025", tes: "20 April 2025" },
    2: { reg: "21 April - 21 Juni 2025", tes: "2 Juni 2025" },
  },
  // 7. SMK Putri Al-azhar (smk-putri)
  "smk-putri": {
    1: { reg: "01 Februari - 26 April 2025", tes: "27 April 2025" },
    2: { reg: "27 April - 21 Juni 2025", tes: "22 Juni 2025" },
  },
  // 8. Pondok Tahfidz Putra Ranggeh (pq-ranggeh)
  "pq-ranggeh": {
    1: { reg: "01 Februari - 20 Februari 2025", tes: "21 Februari 2025" },
    2: { reg: "---", tes: "---" },
  },
  // 9. Pondok Tahfidz Putra Besuki (pt-besuki)
  "pt-besuki": {
    1: { reg: "01 Februari - 10 Februari 2025", tes: "11 Februari 2025" },
    2: { reg: "---", tes: "---" },
  },
  // 10. STIT Sunniyah Salafiyah (stit)
  stit: {
    1: { reg: "-----", tes: "-----" },
    2: { reg: "---", tes: "---" },
  },
  // 11. Madrasah Diniyah Putra (md-putra)
  "md-putra": {
    1: { reg: "01 Februari - 27 Maret 2025", tes: "28 Maret 2025" },
    2: { reg: "01 - 09 April 2025", tes: "13 April 2025" },
  },
  // 12. Madrasah Diniyah Putri (md-azzahro) - Assumed mapping
  "md-azzahro": {
    1: { reg: "----", tes: "---" },
    2: { reg: "---", tes: "---" },
  },
  // Extra (pa-autism)
  "pa-autism": {
    1: { reg: "---", tes: "---" },
    2: { reg: "---", tes: "---" },
  },
};

export const JADWAL_PENDAFTARAN: Record<string, InstitutionSchedule> = {};

Object.keys(SCHEDULE_SOURCE).forEach((key) => {
  const source = SCHEDULE_SOURCE[key];
  JADWAL_PENDAFTARAN[key] = {
    id: key,
    waves: {
      "1": createSpecificWave("1", source[1].reg, source[1].tes),
      "2": createSpecificWave("2", source[2].reg, source[2].tes),
      "3": createSpecificWave("3", null, null), // Gelombang 3 Always Closed
    },
  };
});
