import React from "react";
import {
  ChevronLeft,
  Info,
  ChevronDown,
  CheckCircle2,
  Briefcase,
  Image as ImageIcon,
  FileText,
  GraduationCap,
  Wallet,
  Receipt,
  Camera,
  FolderOpen,
  School,
  Verified,
} from "lucide-react";
import { Lembaga } from "@/types/lembaga";
import { formatCurrency } from "@/lib/lembaga";

interface RequirementsPageProps {
  institution: Lembaga;
  onBack: () => void;
}

const RequirementsPage: React.FC<RequirementsPageProps> = ({
  institution,
  onBack,
}) => {
  const totalCost = institution.biaya?.boarding?.totalEstimasi || 0;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in relative z-50 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-white/5">
        <button
          onClick={onBack}
          className="text-text-main-light dark:text-text-main-dark flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Syarat Pendaftaran
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Info
              size={24}
              className="text-text-main-light dark:text-text-main-dark"
            />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-24 pt-2">
        {/* Lembaga Tujuan */}
        <div className="py-3 sticky top-[60px] z-10 bg-background-light dark:bg-background-dark">
          <label className="block text-text-sub-light dark:text-text-sub-dark text-xs font-semibold uppercase tracking-wider mb-2 ml-1">
            Lembaga Tujuan
          </label>
          <div className="relative group cursor-pointer">
            <div className="flex w-full items-center justify-between bg-card-light dark:bg-card-dark rounded-[12px] p-4 shadow-sm border border-transparent group-hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="text-primary bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                  <School size={24} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-text-main-light dark:text-text-main-dark text-sm font-semibold truncate">
                    {institution.name}
                  </span>
                  <span className="text-text-sub-light dark:text-text-sub-dark text-xs truncate">
                    {institution.desc}
                  </span>
                </div>
              </div>
              <ChevronDown
                size={24}
                className="text-text-sub-light dark:text-text-sub-dark"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-[12px] p-4 flex gap-3 items-start">
          <Info size={20} className="text-blue-500 mt-0.5" />
          <p className="text-blue-800 dark:text-blue-200 text-xs leading-relaxed">
            Pastikan Anda memilih lembaga yang sesuai dengan jenjang pendidikan
            calon santri. Persyaratan berkas wajib dibawa saat validasi data.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          {/* Syarat Umum */}
          <div>
            <h3 className="text-text-main-light dark:text-text-main-dark tracking-tight text-lg font-bold leading-tight pb-3 pl-1 flex items-center gap-2">
              <Verified className="text-primary" size={24} />
              Syarat Umum
            </h3>
            <div className="bg-card-light dark:bg-card-dark rounded-[12px] p-5 shadow-sm">
              <ul className="flex flex-col gap-4">
                {institution.pendaftaran?.persyaratan?.map((syarat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <div className="size-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-text-main-light dark:text-text-main-dark text-sm leading-relaxed">
                      {syarat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Berkas Administrasi */}
          <div>
            <h3 className="text-text-main-light dark:text-text-main-dark tracking-tight text-lg font-bold leading-tight pb-3 pl-1 flex items-center gap-2">
              <FolderOpen className="text-primary" size={24} />
              Berkas Administrasi
            </h3>
            <div className="bg-card-light dark:bg-card-dark rounded-[12px] p-5 shadow-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={20}
                      className="text-text-sub-light dark:text-text-sub-dark"
                    />
                    <div className="flex flex-col">
                      <span className="text-text-main-light dark:text-text-main-dark text-sm font-medium">
                        Fotocopy KK
                      </span>
                      <span className="text-text-sub-light dark:text-text-sub-dark text-xs">
                        Kartu Keluarga (3 Lembar)
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={20}
                      className="text-text-sub-light dark:text-text-sub-dark"
                    />
                    <div className="flex flex-col">
                      <span className="text-text-main-light dark:text-text-main-dark text-sm font-medium">
                        Fotocopy Akta
                      </span>
                      <span className="text-text-sub-light dark:text-text-sub-dark text-xs">
                        Akta Kelahiran (3 Lembar)
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Camera
                      size={20}
                      className="text-text-sub-light dark:text-text-sub-dark"
                    />
                    <div className="flex flex-col">
                      <span className="text-text-main-light dark:text-text-main-dark text-sm font-medium">
                        Pas Foto
                      </span>
                      <span className="text-text-sub-light dark:text-text-sub-dark text-xs">
                        3x4 Hitam Putih (5 Lembar)
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <GraduationCap
                      size={20}
                      className="text-text-sub-light dark:text-text-sub-dark"
                    />
                    <div className="flex flex-col">
                      <span className="text-text-main-light dark:text-text-main-dark text-sm font-medium">
                        Ijazah / SKL
                      </span>
                      <span className="text-text-sub-light dark:text-text-sub-dark text-xs">
                        Legalisir (3 Lembar)
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 size={20} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Estimasi Biaya Awal */}
          <div>
            <h3 className="text-text-main-light dark:text-text-main-dark tracking-tight text-lg font-bold leading-tight pb-3 pl-1 flex items-center gap-2">
              <Wallet size={24} className="text-primary" />
              Estimasi Biaya Awal
            </h3>
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-[12px] p-5 shadow-md text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-green-100 text-xs font-medium uppercase tracking-wide">
                    Total Pembayaran
                  </p>
                  <h4 className="text-2xl font-bold mt-1">
                    {formatCurrency(totalCost)}
                  </h4>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Receipt size={24} className="text-white" />
                </div>
              </div>
              <div className="border-t border-white/20 pt-3">
                <p className="text-green-50 text-xs leading-relaxed">
                  *Biaya mencakup pendaftaran, seragam, kitab awal, dan uang
                  makan bulan pertama.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-6"></div>
      </main>
    </div>
  );
};

export default RequirementsPage;
