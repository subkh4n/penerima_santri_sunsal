export interface BiayaRincian {
  nama: string;
  deskripsi: string;
  jumlah: number;
  icon: string;
}

export interface BiayaType {
  totalEstimasi: number;
  rincian: BiayaRincian[];
}

export interface Profil {
  deskripsi: string;
  akreditasi?: string;
  npsn?: string;
}

export interface Pendaftaran {
  tanggalBuka: string;
  tanggalTutup: string;
  persyaratan: string[];
  tahapanSeleksi?: string[];
}

export interface Kontak {
  telepon?: string;
  whatsapp?: string;
  email?: string;
  alamat?: string;
  googleMap?: string;
}

export interface Prodi {
  nama: string;
  deskripsi: string;
  icon?: string;
}

export interface Lembaga {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  type: "ponpes" | "smp" | "sma" | "smk" | "stit" | "madrasah";
  gender?: "putra" | "putri" | "umum";
  icon: string;
  image: string;

  profil: Profil;
  visi?: string;
  misi?: string[];

  biaya: {
    tahunAjaran: string;
    boarding?: BiayaType;
    fullDay?: BiayaType;
  };

  pendaftaran: Pendaftaran;

  fasilitas?: string[];
  programUnggulan?: string[];
  prodi?: Prodi[]; // For MA, SMK, STIT
  kontak?: Kontak;
  galeri?: string[];
}
