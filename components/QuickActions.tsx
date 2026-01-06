import React from "react";

const QuickActions: React.FC = () => {
  return (
    <div className="px-4 -mt-6 relative z-20">
      <div className="flex gap-3 w-full bg-surface-light dark:bg-surface-dark p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <a
          href="https://ppdb.sunsal.net/formulirpendaftar/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-primary text-[#111813] text-base font-bold leading-normal tracking-[0.015em] hover:brightness-105 transition-all shadow-sm flex gap-2 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">
            edit_square
          </span>
          <span className="truncate">Daftar</span>
        </a>
        <a
          href="https://ppdb.sunsal.net/pendaftar/#/access/signin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-gray-100 dark:bg-gray-800 text-text-main dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent dark:border-gray-700 flex gap-2 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          <span className="truncate">Login</span>
        </a>
      </div>
    </div>
  );
};

export default QuickActions;
