import React, { useState, useMemo } from "react";
import { getAllLembaga } from "@/lib/lembaga";
import { jadwalData } from "@/data/jadwal";

const JadwalTab: React.FC = () => {
  const [jadwalLembaga, setJadwalLembaga] = useState<string>("");
  const [jadwalGelombang, setJadwalGelombang] = useState<number>(1);
  const allLembaga = useMemo(() => getAllLembaga(), []);

  return (
    <div className="flex flex-col pb-24 animate-fade-in">
      {/* Institution Selector */}
      <div className="px-4 pt-6 pb-2 flex flex-col items-center">
        <div className="w-full mb-6 max-w-md">
          <label
            className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1"
            htmlFor="jadwal-institution-select"
          >
            Pilih Lembaga
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">
                school
              </span>
            </div>
            <select
              id="jadwal-institution-select"
              value={jadwalLembaga}
              onChange={(e) => setJadwalLembaga(e.target.value)}
              className="block w-full pl-10 pr-10 py-3.5 text-sm font-semibold text-text-main dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
            >
              <option value="">Pilih Lembaga</option>
              {allLembaga.map((lembaga) => (
                <option key={lembaga.id} value={lembaga.id}>
                  {lembaga.shortName}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {jadwalLembaga && (
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium mb-3 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Tahun Ajaran 2026/2027
            </div>
            <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight leading-tight">
              {allLembaga.find((l) => l.id === jadwalLembaga)?.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
              Yayasan Sunniyah Salafiyah
            </p>
          </div>
        )}
      </div>

      {/* Wave Tabs */}
      {jadwalLembaga && (
        <>
          <div className="sticky top-[60px] z-10 bg-surface-light dark:bg-surface-dark pt-2 pb-4 px-4">
            <div className="p-1.5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-1 shadow-sm">
              {[1, 2, 3].map((gel) => (
                <button
                  key={gel}
                  onClick={() => setJadwalGelombang(gel)}
                  className={`relative py-2.5 text-sm font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
                    jadwalGelombang === gel
                      ? "bg-primary text-black shadow-sm ring-1 ring-black/5"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <span>Gelombang {gel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Content */}
          <div className="px-4 pb-28 relative min-h-[400px]">
            {/* Schedule Table */}
            <div className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    calendar_month
                  </span>
                  <h3 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
                    Jadwal Kegiatan
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700">
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[35%]">
                          Tanggal
                        </th>
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Keterangan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {jadwalData
                        .find((g) => g.gelombang === jadwalGelombang)
                        ?.items.map((item, idx) => (
                          <tr
                            key={idx}
                            className={`group transition-colors ${
                              item.status === "berlangsung"
                                ? "bg-green-50/50 dark:bg-green-900/10"
                                : ""
                            } hover:bg-gray-50 dark:hover:bg-gray-700/50`}
                          >
                            <td className="py-4 px-4 align-top">
                              <span
                                className={`text-sm font-bold block ${
                                  item.status === "berlangsung"
                                    ? "text-primary"
                                    : "text-text-main dark:text-white"
                                }`}
                              >
                                {item.tanggal}
                              </span>
                            </td>
                            <td className="py-4 px-4 align-top">
                              <span className="text-sm font-bold text-text-main dark:text-white block mb-0.5">
                                {item.kegiatan}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                {item.lokasi || item.keterangan}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Linimasa Kegiatan
              </h3>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                Gelombang {jadwalGelombang}
              </span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-0">
              {jadwalData
                .find((g) => g.gelombang === jadwalGelombang)
                ?.items.map((item, idx, arr) => (
                  <div
                    key={idx}
                    className={`timeline-item relative flex gap-4 ${
                      idx < arr.length - 1 ? "pb-8" : ""
                    } group`}
                  >
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      {item.status === "selesai" ? (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/10 border-2 border-primary text-primary z-10 shadow-sm">
                          <span className="material-symbols-outlined text-xl">
                            check
                          </span>
                        </div>
                      ) : item.status === "berlangsung" ? (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-black shadow-lg shadow-primary/30 z-10 scale-110 ring-4 ring-white dark:ring-surface-dark">
                          <span className="material-symbols-outlined text-xl animate-pulse">
                            {item.icon}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 z-10">
                          <span className="material-symbols-outlined text-xl">
                            {item.icon}
                          </span>
                        </div>
                      )}
                      {idx < arr.length - 1 && (
                        <div
                          className={`absolute left-5 top-12 bottom-0 w-0.5 -translate-x-1/2 ${
                            item.status === "selesai"
                              ? "bg-primary/50"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        ></div>
                      )}
                    </div>
                    <div
                      className={`flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border ${
                        item.status === "berlangsung"
                          ? "shadow-md border-l-4 border-l-primary border-y border-r border-gray-100 dark:border-gray-700 ring-1 ring-primary/10"
                          : item.status === "selesai"
                            ? "border-gray-200 dark:border-gray-700 opacity-70"
                            : "border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                            item.status === "selesai"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                              : item.status === "berlangsung"
                                ? "bg-primary/20 text-green-800 dark:text-green-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {item.status === "selesai"
                            ? "Selesai"
                            : item.status === "berlangsung"
                              ? "Sedang Berlangsung"
                              : "Akan Datang"}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            item.status === "berlangsung"
                              ? "text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {item.tanggal}
                        </span>
                      </div>
                      <h3
                        className={`text-lg font-bold mb-1 ${
                          item.status === "berlangsung"
                            ? "text-text-main dark:text-white"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {item.kegiatan}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          item.status === "berlangsung"
                            ? "text-gray-600 dark:text-gray-300 mb-3"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {item.keterangan}
                      </p>
                      {item.lokasi && item.status === "berlangsung" && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="material-symbols-outlined text-lg text-primary">
                            location_on
                          </span>
                          <span className="font-medium">{item.lokasi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Fixed Bottom Button */}
          <div className="fixed bottom-20 right-4 left-4 z-30 max-w-[480px] mx-auto">
            <button className="w-full bg-primary hover:bg-[#0fdc52] active:scale-[0.98] transition-all text-black font-bold text-base py-4 px-6 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">how_to_reg</span>
              Daftar Sekarang
            </button>
          </div>
        </>
      )}

      {/* Empty State when no institution selected */}
      {!jadwalLembaga && (
        <div className="flex flex-col items-center justify-center pt-10 text-center px-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-gray-400">
              event_busy
            </span>
          </div>
          <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
            Pilih Lembaga
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-[250px] mx-auto text-sm leading-relaxed">
            Silakan pilih lembaga terlebih dahulu untuk melihat jadwal
            pendaftaran.
          </p>
        </div>
      )}
    </div>
  );
};

export default JadwalTab;
