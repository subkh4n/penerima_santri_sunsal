import React, { useState } from "react";
import type { NewsItem } from "@/types";
import { Tab } from "@/types";
import { categories, mainNews } from "@/data/constants";

interface BeritaTabProps {
  setActiveTab: (tab: Tab) => void;
}

const BeritaTab: React.FC<BeritaTabProps> = ({ setActiveTab }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsCategory, setNewsCategory] = useState("Semua");

  if (selectedNews) {
    return (
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-white/5 transition-all">
          <button
            onClick={() => setSelectedNews(null)}
            className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span className="material-symbols-outlined text-[24px]">
              arrow_back
            </span>
          </button>
          <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Detail Berita
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-text-main dark:text-white text-[24px]">
                share
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col px-4 pb-12 pt-4 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20 uppercase tracking-wide">
                {selectedNews.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-text-sub">
                <span className="material-symbols-outlined text-[16px]">
                  calendar_month
                </span>
                <span>{selectedNews.date}</span>
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-text-main dark:text-white leading-snug">
              {selectedNews.title}
            </h1>
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
              <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[18px]">
                  person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-text-main dark:text-white">
                  {selectedNews.author}
                </span>
                <span className="text-[10px] text-text-sub">
                  {selectedNews.authorRole}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-56 rounded-xl overflow-hidden shadow-sm mb-6 bg-gray-100 dark:bg-gray-800 relative group">
            <img
              alt="Detail Image"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={selectedNews.image}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl"></div>
          </div>

          <article className="prose prose-sm max-w-none text-text-main dark:text-white leading-relaxed">
            <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
              <strong className="text-text-main dark:text-white">
                Yayasan Sunniyah Salafiyah
              </strong>{" "}
              — Alhamdulillah, puji syukur kita panjatkan ke hadirat Allah SWT.
              Dengan memohon ridho-Nya dan syafaat Rasulullah SAW, kami
              mengumumkan bahwa Penerimaan Santri Baru (PSB) untuk Tahun Ajaran
              2026/2027 telah resmi dibuka mulai hari ini.
            </p>
            <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
              Kami mengundang putra-putri terbaik bangsa untuk bergabung menjadi
              bagian dari keluarga besar Yayasan Sunniyah Salafiyah. Program
              pendidikan kami dirancang secara komprehensif untuk mencetak
              generasi yang tidak hanya unggul dalam ilmu agama, tetapi juga
              memiliki wawasan luas, kemandirian, dan akhlakul karimah yang
              sesuai dengan manhaj Ahlussunnah wal Jamaah.
            </p>

            <div className="my-6 p-4 rounded-xl bg-white dark:bg-gray-800 border-l-4 border-primary shadow-sm">
              <h3 className="text-sm font-bold text-text-main dark:text-white mb-2">
                Poin Penting Pendaftaran
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                  <span className="material-symbols-outlined text-primary text-[16px] fill-1">
                    check_circle
                  </span>
                  <span>
                    Pendaftaran dibuka mulai 12 Mei s.d. 30 Juni 2026.
                  </span>
                </li>
                <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                  <span className="material-symbols-outlined text-primary text-[16px] fill-1">
                    check_circle
                  </span>
                  <span>
                    Tes seleksi meliputi membaca Al-Qur&#39;an dan wawancara.
                  </span>
                </li>
                <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                  <span className="material-symbols-outlined text-primary text-[16px] fill-1">
                    check_circle
                  </span>
                  <span>
                    Tersedia beasiswa bagi santri berprestasi dan yatim/piatu.
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-base font-bold text-text-main dark:text-white mt-6 mb-3">
              Persyaratan Administrasi
            </h3>
            <p className="mb-3 text-sm text-text-sub dark:text-gray-300 text-justify">
              Calon wali santri diharapkan mempersiapkan berkas-berkas berikut
              sebelum melakukan pendaftaran:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-6 text-sm text-text-sub dark:text-gray-400 marker:text-primary">
              <li>Fotokopi Akta Kelahiran (2 lembar).</li>
              <li>Fotokopi Kartu Keluarga (2 lembar).</li>
              <li>Pas foto berwarna ukuran 3x4 (4 lembar).</li>
              <li>Surat Keterangan Sehat dari dokter.</li>
            </ul>

            <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
              Segera daftarkan diri Anda sebelum kuota terpenuhi. Untuk
              informasi lebih lanjut mengenai teknis pendaftaran, biaya
              pendidikan, dan fasilitas asrama, silakan hubungi sekretariat
              panitia PSB atau unduh brosur digital melalui tombol di bawah ini.
            </p>
          </article>
          <div className="h-16"></div>
        </main>

        <div className="sticky bottom-0 z-20 w-full bg-white/95 dark:bg-[#152018]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 p-4 pb-6 max-w-[480px] mx-auto">
          <div className="flex gap-3">
            <button className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-medium rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              <span className="text-sm">Brosur</span>
            </button>
            <button className="flex-[2] bg-primary hover:brightness-105 text-black font-bold rounded-xl h-12 flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
              <span className="material-symbols-outlined text-[20px]">
                app_registration
              </span>
              <span className="text-sm">Daftar Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-white/5 transition-all">
        <button
          onClick={() => setActiveTab(Tab.HOME)}
          className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined text-[24px]">
            arrow_back
          </span>
        </button>
        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Berita
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-text-main dark:text-white text-[24px]">
              notifications
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-24 pt-2">
        <div className="sticky top-[60px] z-10 bg-background-light dark:bg-background-dark pt-2 pb-4 -mx-4 px-4 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none mb-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
              search
            </span>
            <input
              className="w-full h-11 rounded-xl border-none bg-white dark:bg-gray-800 pl-10 pr-4 text-sm text-text-main dark:text-white shadow-sm ring-1 ring-gray-100 dark:ring-white/5 focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400 transition-all"
              placeholder="Cari berita atau pengumuman..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors shadow-sm ${
                  newsCategory === cat
                    ? "bg-primary text-black shadow-primary/20"
                    : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 text-text-sub dark:text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Featured News Card */}
          <article
            onClick={() => setSelectedNews(mainNews)}
            className="group flex flex-col gap-0 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-transparent dark:border-white/5"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                alt="News Image"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={mainNews.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-black text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm uppercase">
                {mainNews.category}
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] text-text-sub">
                <span className="material-symbols-outlined text-[14px]">
                  calendar_today
                </span>
                <span>{mainNews.date}</span>
              </div>
              <h3 className="text-base font-bold text-text-main dark:text-white leading-snug">
                {mainNews.title}
              </h3>
              <p className="text-xs text-text-sub dark:text-gray-400 line-clamp-2 leading-relaxed">
                {mainNews.summary}
              </p>
              <div className="mt-2 pt-3 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-gray-400">
                  Oleh: {mainNews.author}
                </span>
                <button className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </article>

          {/* Side Image Articles */}
          <article
            onClick={() =>
              setSelectedNews({
                ...mainNews,
                title: "Kunjungan Syekh dari Timur Tengah",
                category: "Kegiatan",
                date: "10 Mei 2026",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD3CqIRpasd2a8279pB-1VY3YQ8QIACPXS6Hj7rgh_HJf1A3zdiP8d3mXmyBjrfeW6khtLgnDJ67WBMocaRVDKBMgBREtWOUoTbSuHrUhlzVxsd7Qlf5Kw_frMUkVsG6IrLzJXXYKA2locqdDTy2q8b2b5zzngoxCUqLZQuu8jcNkGa3hh9IxSdPs-0avVtUwb-ZPR16v0OtLh16sgiT2Fy_mWKQEw1NUTsr6oUTBnbBsqQwmjQBBqCrE0u8y3WnGM8Yt2J86L0qeZp",
              })
            }
            className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow items-start cursor-pointer border border-transparent hover:border-primary/20"
          >
            <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
              <img
                alt="News Thumbnail"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3CqIRpasd2a8279pB-1VY3YQ8QIACPXS6Hj7rgh_HJf1A3zdiP8d3mXmyBjrfeW6khtLgnDJ67WBMocaRVDKBMgBREtWOUoTbSuHrUhlzVxsd7Qlf5Kw_frMUkVsG6IrLzJXXYKA2locqdDTy2q8b2b5zzngoxCUqLZQuu8jcNkGa3hh9IxSdPs-0avVtUwb-ZPR16v0OtLh16sgiT2Fy_mWKQEw1NUTsr6oUTBnbBsqQwmjQBBqCrE0u8y3WnGM8Yt2J86L0qeZp"
              />
            </div>
            <div className="flex flex-col flex-1 h-24 justify-between py-0.5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">
                  Kegiatan
                </span>
                <h3 className="text-sm font-bold text-text-main dark:text-white leading-snug line-clamp-2">
                  Kunjungan Syekh dari Timur Tengah di Pondok Pusat
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400">10 Mei 2026</span>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BeritaTab;
