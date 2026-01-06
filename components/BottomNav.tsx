
import React from 'react';
import { Tab } from '../App';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: Tab.HOME, label: 'Home', icon: 'home' },
    { id: Tab.PROFIL, label: 'Profil', icon: 'domain' },
    { id: Tab.BIAYA, label: 'Biaya', icon: 'payments' },
    { id: Tab.BERITA, label: 'Berita', icon: 'newspaper' },
    { id: Tab.DOWNLOAD, label: 'Download', icon: 'download' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a2c20]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 px-2 py-3 pb-6 flex justify-around items-center z-50 max-w-[480px] mx-auto transition-colors duration-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 min-w-[64px] ${
            activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${activeTab === tab.id ? 'fill-1' : ''}`}>
            {tab.icon}
          </span>
          <span className={`text-[10px] ${activeTab === tab.id ? 'font-bold' : 'font-medium'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
