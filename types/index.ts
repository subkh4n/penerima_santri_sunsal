export enum Tab {
  HOME = "home",
  PROFIL = "profil",
  JADWAL = "jadwal",
  BIAYA = "biaya",
  BERITA = "berita",
  DOWNLOAD = "download",
}

export interface Institution {
  name: string;
  desc: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  summary: string;
}

export interface JadwalItem {
  tanggal: string;
  kegiatan: string;
  keterangan: string;
  status: "selesai" | "berlangsung" | "akan-datang";
  lokasi?: string;
  icon: string;
}

export interface JadwalGelombang {
  gelombang: number;
  items: JadwalItem[];
}

export interface ProfilSection {
  title: string;
  items: Institution[];
}

export interface BiayaItem {
  name: string;
  desc: string;
  amount: string;
  icon: string;
}

export interface DownloadItem {
  name: string;
  desc: string;
  type: string;
  size: string;
  image: string;
}
