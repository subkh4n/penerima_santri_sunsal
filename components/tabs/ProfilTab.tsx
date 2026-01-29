import React from "react";
import type { Institution } from "@/types";
import { profilSections } from "@/data/constants";

interface ProfilTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedInstitution: Institution | null;
  setSelectedInstitution: (institution: Institution | null) => void;
}

const ProfilTab: React.FC<ProfilTabProps> = ({
  searchQuery,
  setSearchQuery,
  selectedInstitution,
  setSelectedInstitution,
}) => {
  if (selectedInstitution) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSelectedInstitution(null)}
              aria-label="Go back"
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 active:scale-95 transition-all text-[#111813] dark:text-white"
            >
              <span className="material-symbols-outlined">
                arrow_back_ios_new
              </span>
            </button>
            <h1 className="text-lg font-bold tracking-tight text-[#111813] dark:text-white flex-1 text-center pr-8">
              Detail Lembaga
            </h1>
          </div>
        </header>

        <div className="overflow-y-auto pb-32 no-scrollbar">
          <div className="relative h-64 w-full">
            <div
              className="absolute inset-0 bg-gray-200 dark:bg-gray-800 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3y1p_FBOHWx18imPbP-3HWJR46tQzJa6BS8Sr4okgQEeoNm8Kyp_iCAMbzhv96lHEgEYo50tObDGYR05M_bWvxuZXqlobnWW7SyonaSuuOaEpkAaX_P-AAaqtONu-V57aT6SRyMHsvTGNVxkW7ayArIAwSFDPRrMJUWJsV8m00piOK8Z2TRtqCCv355gPXMQkOP2R61QE-vT5QI_zKd0di2LXzQL028IQPo_X1ER0_Aa7ab4yJqFITKVWgKVl6Y75S9HEjjzphTs6')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-[#052e12] shadow-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-[16px] mr-1 fill-1">
                  verified
                </span>
                Terakreditasi A
              </span>
            </div>
          </div>

          <div className="px-4 -mt-2 relative z-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#111813] dark:text-white leading-tight mb-2">
                {selectedInstitution.name}
              </h2>
              <div className="flex items-center text-sm text-[#61896f] dark:text-gray-400">
                <span className="material-symbols-outlined text-[18px] mr-1">
                  school
                </span>
                <span>{selectedInstitution.desc}</span>
              </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6 pb-2">
              <button className="flex-shrink-0 px-4 py-2 bg-[#111813] dark:bg-primary text-white dark:text-[#052e12] text-sm font-medium rounded-lg transition-colors">
                Tentang
              </button>
              <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">
                Program
              </button>
              <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">
                Fasilitas
              </button>
              <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">
                Kontak
              </button>
            </div>

            <section className="space-y-4 mb-8">
              <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Selayang Pandang
              </h3>
              <div className="p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedInstitution.name} adalah lembaga pendidikan di bawah
                  naungan Yayasan Sunniyah Salafiyah yang memadukan kurikulum
                  nasional dan kepesantrenan. Kami berkomitmen mencetak generasi
                  yang tidak hanya unggul dalam ilmu pengetahuan umum, tetapi
                  juga memiliki kedalaman ilmu agama dan akhlakul karimah.
                </p>
              </div>
            </section>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#102216]/90 backdrop-blur-md border-t border-gray-100 dark:border-white/5 z-50 max-w-[480px] mx-auto">
              <div className="flex gap-3">
                <button className="flex-1 flex flex-col items-center justify-center gap-1 h-12 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <span className="text-xs font-semibold">Download Brosur</span>
                </button>
                <button className="flex-[2] flex items-center justify-center gap-2 h-12 bg-primary hover:brightness-105 active:scale-[0.98] text-[#052e12] font-bold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all">
                  Daftar Sekarang
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pt-2">
      <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
          <div className="text-text-sub flex items-center justify-center pl-4">
            <span className="material-symbols-outlined text-[24px]">
              search
            </span>
          </div>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub text-base px-3"
            placeholder="Cari lembaga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {profilSections.map((section, sIdx) => (
        <div key={sIdx} className="mt-4 first:mt-2">
          <h3 className="text-text-main dark:text-white tracking-tight text-lg font-bold leading-tight pb-3 pl-1">
            {section.title}
          </h3>
          <div className="flex flex-col gap-3">
            {section.items
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.desc.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((item, iIdx) => (
                <div
                  key={iIdx}
                  onClick={() => setSelectedInstitution(item)}
                  className="group flex items-center gap-4 bg-white dark:bg-gray-800/50 px-4 min-h-[72px] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-50 dark:border-gray-700/50 hover:border-primary/30"
                >
                  <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12 group-hover:bg-primary group-hover:text-black transition-colors">
                      <span className="material-symbols-outlined text-[24px]">
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                      <p className="text-text-main dark:text-white text-base font-medium leading-normal truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                      <p className="text-text-sub dark:text-gray-400 text-xs font-normal leading-normal truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[24px]">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <div className="h-6"></div>
    </div>
  );
};

export default ProfilTab;
