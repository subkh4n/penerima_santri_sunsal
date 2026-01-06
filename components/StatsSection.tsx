
import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <div className="px-4 py-8 bg-gray-50 dark:bg-gray-800/30 mt-4 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#1f3528] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-primary text-3xl font-black">2,500+</span>
          <span className="text-text-sub dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">Santri Aktif</span>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#1f3528] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-primary text-3xl font-black">50+</span>
          <span className="text-text-sub dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">Tahun Berdiri</span>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#1f3528] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-primary text-3xl font-black">100+</span>
          <span className="text-text-sub dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">Ustadz & Guru</span>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-[#1f3528] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="text-primary text-3xl font-black">12</span>
          <span className="text-text-sub dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-1">Cabang Institusi</span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
