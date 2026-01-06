import React from "react";

interface HeaderProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  onToggleTheme,
  isDarkMode,
  title,
}) => {
  return (
    <div className="flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 shadow-sm transition-colors duration-300 rounded-t-none">
      {/* Spacer to keep title centered since menu button is removed */}
      <div className="size-10 shrink-0"></div>

      <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center capitalize">
        {title}
      </h2>

      <div className="flex items-center justify-end gap-1">
        <button
          onClick={onToggleTheme}
          className="flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-transparent text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "22px" }}
          >
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <button
          className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 w-10 bg-transparent text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "24px" }}
          >
            notifications
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
