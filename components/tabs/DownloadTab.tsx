import React, { useState } from "react";
import { downloadItems } from "@/data/constants";

const DownloadTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col px-4 pb-24 pt-2 animate-fade-in">
      <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
          <div className="text-text-sub flex items-center justify-center pl-4">
            <span className="material-symbols-outlined text-[24px]">
              search
            </span>
          </div>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub text-base px-3"
            placeholder="Cari jenjang pendidikan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {downloadItems
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-transparent dark:border-gray-700/50 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div
                    className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-white/5 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  ></div>
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5">
                  <h3 className="text-base font-bold text-text-main dark:text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-text-sub dark:text-gray-400 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
              <button className="mt-4 flex items-center justify-center w-full h-11 gap-2 bg-primary hover:brightness-105 active:scale-[0.98] text-black text-sm font-bold rounded-xl transition-all shadow-sm">
                <span className="material-symbols-outlined text-[20px] fill-1">
                  download
                </span>
                Download Brosur PDF
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DownloadTab;
