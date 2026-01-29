import type { ProfilSection, BiayaItem, DownloadItem, NewsItem } from "@/types";

export const categories = [
  "Semua",
  "Pengumuman",
  "Kegiatan",
  "Prestasi",
  "Artikel",
];

export const profilSections: ProfilSection[] = [
  {
    title: "Pondok Pesantren",
    items: [
      {
        name: "Pondok Athfal Sunniyah Salafiyah",
        desc: "Pendidikan Diniyah Anak Usia Dini",
        icon: "child_care",
      },
      {
        name: "Pondok Putra Sunniyah Salafiyah",
        desc: "Asrama Santri Putra",
        icon: "mosque",
      },
      {
        name: "Pondok Putri Az-zahro'",
        desc: "Asrama Santri Putri",
        icon: "woman_2",
      },
    ],
  },
  {
    title: "Sekolah Formal",
    items: [
      {
        name: "SMP Putra Al-azhar",
        desc: "Sekolah Menengah Pertama (Putra)",
        icon: "school",
      },
      {
        name: "SMA Putra Al-azhar",
        desc: "Sekolah Menengah Atas (Putra)",
        icon: "history_edu",
      },
      {
        name: "SMP Putri Al-azhar",
        desc: "Sekolah Menengah Pertama (Putri)",
        icon: "school",
      },
      {
        name: "SMK Putri Al-azhar",
        desc: "Sekolah Menengah Kejuruan (Putri)",
        icon: "draw",
      },
    ],
  },
  {
    title: "Madrasah & Kampus",
    items: [
      {
        name: "Madrasah Sunniyah Salafiyah",
        desc: "Pendidikan Diniyah",
        icon: "menu_book",
      },
      {
        name: "Madrasah Az-zahro'",
        desc: "Pendidikan Diniyah Putri",
        icon: "auto_stories",
      },
      {
        name: "STIT Sunniyah Salafiyah",
        desc: "Sekolah Tinggi Ilmu Tarbiyah",
        icon: "account_balance",
      },
    ],
  },
];

export const rincianBiaya: BiayaItem[] = [
  {
    name: "Pendaftaran",
    desc: "Formulir & Administrasi",
    amount: "Rp 250.000",
    icon: "app_registration",
  },
  {
    name: "Uang Pangkal",
    desc: "Pengembangan Gedung",
    amount: "Rp 2.500.000",
    icon: "domain",
  },
  {
    name: "Seragam",
    desc: "3 Stel Bahan Kain",
    amount: "Rp 650.000",
    icon: "checkroom",
  },
  {
    name: "Kitab & Buku",
    desc: "Paket Semester 1",
    amount: "Rp 450.000",
    icon: "menu_book",
  },
  {
    name: "SPP Bulan 1",
    desc: "Syahriah & Makan",
    amount: "Rp 400.000",
    icon: "payments",
  },
];

export const downloadItems: DownloadItem[] = [
  {
    name: "Madrasah Ibtidaiyah (MI)",
    desc: "Pendidikan tingkat dasar",
    type: "PDF",
    size: "1.2 MB",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAt5zjRM8B-1n4IXNBD-knYgEavErBZ_NFcFnE-j8r8AJpYhw7BdXjrlcGHi9xG9VPtPiiQd7XQ2HQ_x2l3BHAldokKNU0HXJqG28HRntMp7dOXmpvquhDGXXLj8-q5Wi_GcKmD7Bd0Hd0dDy3ZMXvlxxRIqUF5b5qcLXDZm1zbJXVpFJPCSrhycxPupqMLzSh8bbPkl7GJhucUMchnTP4RpfmPt49at2bSlQVJSX2JhAu1t5Kre6zHIStLGg3SeR6o42hQRfbLcF5M",
  },
  {
    name: "Madrasah Tsanawiyah (MTs)",
    desc: "Pendidikan tingkat menengah",
    type: "PDF",
    size: "2.4 MB",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWJo9eFxCdrleK5VookN6PFmDrUoU_v1SQ7kqHcNgtWWnYSoQ2uKUyewuzTi9AnhAZvKt-zIPuDkxvG4fO114ay6-MiblG0BsS21aVjqp_9uQwaZMztL1S55Kbpy3LgnC-PFCMZPoh_rgkEBvY4LqNd2SgaAe3lGYo8f3_05bCWQBAmoFahRSdVFrNltoITRQoQku729kFX5yx9wOQHCvnefxvb7WCRGfxmOZsuGDik-a_ifs7KlJknN9Sk1DIYE2xFoi1l7S7I07X",
  },
  {
    name: "Madrasah Aliyah (MA)",
    desc: "Pendidikan tingkat atas",
    type: "PDF",
    size: "3.1 MB",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCD7TwjvuBLANCoPFf9SPtQX1CUqzyywqoc5rO04GyQAqRxwcJljWleLR0DstXThwBrDCu6dDMkUkfWQ_cQRzajrA36GCbCoZh8fcLwVQ1QBzCHzUBGFlar4G2-l4NjHOTfLmei1Nna6-QlfDpZARoYjdcHVogDwpPsiU1Y8b6vcJIiHzFz_6ltoPcZi95WmioBqe_KNiaKoTJAWjFJF422UoLBDEz7e5xS1SNpEQqRpmOoOCirfeGGPTIV_Doy4mQwvuUm9HfUXX6u",
  },
  {
    name: "Pondok Pesantren",
    desc: "Asrama dan Pendidikan Diniyah",
    type: "PDF",
    size: "4.5 MB",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3y1p_FBOHWx18imPbP-3HWJR46tQzJa6BS8Sr4okgQEeoNm8Kyp_iCAMbzhv96lHEgEYo50tObDGYR05M_bWvxuZXqlobnWW7SyonaSuuOaEpkAaX_P-AAaqtONu-V57aT6SRyMHsvTGNVxkW7ayArIAwSFDPRrMJUWJsV8m00piOK8Z2TRtqCCv355gPXMQkOP2R61QE-vT5QI_zKd0di2LXzQL028IQPo_X1ER0_Aa7ab4yJqFITKVWgKVl6Y75S9HEjjzphTs6",
  },
];

export const mainNews: NewsItem = {
  id: "psb-2026",
  category: "Pengumuman",
  title: "Penerimaan Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka",
  date: "12 Mei 2026",
  author: "Panitia PSB",
  authorRole: "Admin Yayasan",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBAFa4uOSZSTNi2bkEThp0X9-S8tGUggUB34NyVuuv3EdCpTrM8e88se-Ng5FFjRcqllT-RSn7UM6ALRs7ie0i_4rU7283dKDl5qMJleynIpawARI-Q8D9TE37dAm-5fG6cpCorfqx4VGD4fhgq1mLHiwZmeZTNz6Pm06gtMh2TGTZmWVrbmkUqYIuvp52iRYTZTf0uTMSq2aD9hbkSczYVUpagGR6hKZpGoHCBKYItOV9KtPlOhdyRX8pEijOB8GdDDW-vLtW8IrFh",
  summary:
    "Yayasan Sunniyah Salafiyah kembali membuka kesempatan bagi putra-putri terbaik untuk bergabung. Segera daftarkan diri Anda sebelum kuota terpenuhi.",
};
