import React, { useState } from "react";
import { rincianBiaya } from "@/data/constants";

const BiayaTab: React.FC = () => {
  const [boardingType, setBoardingType] = useState<"Boarding" | "Full Day">(
    "Boarding",
  );
  const [selectedLembaga, setSelectedLembaga] = useState("");

  return (
    <div className="flex flex-col px-4 pb-24 pt-4 animate-fade-in">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-1.5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 flex gap-1 mb-3 transition-colors">
        <button
          onClick={() => setBoardingType("Boarding")}
          className={`flex-1 shadow-sm rounded-[10px] py-3 text-sm font-bold transition-all transform active:scale-95 ${
            boardingType === "Boarding"
              ? "bg-primary text-black"
              : "text-text-sub dark:text-gray-400 hover:bg-white dark:hover:bg-white/5"
          }`}
        >
          Boarding
        </button>
        <button
          onClick={() => setBoardingType("Full Day")}
          className={`flex-1 rounded-[10px] py-3 text-sm font-bold transition-all transform active:scale-95 ${
            boardingType === "Full Day"
              ? "bg-primary text-black"
              : "text-text-sub dark:text-gray-400 hover:bg-white dark:hover:bg-white/5"
          }`}
        >
          Full Day
        </button>
      </div>

      <div className="mb-3 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="material-symbols-outlined text-text-sub text-[20px]">
            domain
          </span>
        </div>
        <select
          value={selectedLembaga}
          onChange={(e) => setSelectedLembaga(e.target.value)}
          className="block w-full appearance-none rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-gray-800 py-3 pl-10 pr-10 text-sm font-medium text-text-main dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">Pilih Lembaga</option>
          <option value="pass">Pondok Athfal Sunniyah Salafiyah</option>
          <option value="ppss">Pondok Putra Sunniyah Salafiyah</option>
          <option value="ppis">Pondok Putri Sunniyah Salafiyah</option>
          <option value="md">Madrasah Diniyah</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="material-symbols-outlined text-text-sub text-[24px]">
            expand_more
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#111813] dark:bg-gray-900 rounded-2xl p-6 shadow-lg mb-6 text-white border border-gray-800 dark:border-white/10">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="relative z-10 text-center">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">
            Total Estimasi
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-sm font-medium text-primary">Rp</span>
            <h3 className="text-4xl font-bold text-white tracking-tight">
              4.250.000
            </h3>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-[16px] text-primary">
              check_circle
            </span>
            <span className="text-xs text-gray-300">
              Termasuk SPP Bulan Pertama
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-text-main dark:text-white font-bold text-lg px-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            receipt_long
          </span>
          Rincian Biaya
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-white/5 transition-colors">
          {rincianBiaya.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700`}
                >
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="text-text-main dark:text-white text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="text-text-sub dark:text-gray-400 text-[11px]">
                    {item.desc}
                  </p>
                </div>
              </div>
              <span className="text-text-main dark:text-white text-sm font-bold">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
        <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-[20px] shrink-0 mt-0.5">
          info
        </span>
        <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
          <span className="font-bold">Catatan:</span> Biaya di atas adalah
          estimasi untuk tahun ajaran 2026/2027. Pembayaran dapat dilakukan
          secara bertahap (angsuran) sesuai ketentuan yayasan.
        </p>
      </div>
      <div className="h-6"></div>
    </div>
  );
};

export default BiayaTab;
