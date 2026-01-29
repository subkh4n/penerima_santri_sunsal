import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import { Tab } from "./types";
import type { Institution } from "./types";
import {
  HomeTab,
  ProfilTab,
  JadwalTab,
  BiayaTab,
  BeritaTab,
  DownloadTab,
} from "./components/tabs";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getHeaderTitle = (tab: Tab) => {
    switch (tab) {
      case Tab.HOME:
        return "Beranda";
      case Tab.PROFIL:
        return "Profil Lembaga";
      case Tab.JADWAL:
        return "Jadwal Kegiatan";
      case Tab.BIAYA:
        return "Informasi Biaya";
      case Tab.BERITA:
        return "Berita & Kegiatan";
      case Tab.DOWNLOAD:
        return "Pusat Unduhan";
      default:
        return "Beranda";
    }
  };

  const showHeader = !selectedInstitution && activeTab !== Tab.BERITA;
  const showBottomNav = !selectedInstitution && activeTab !== Tab.BERITA;

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[480px] mx-auto shadow-2xl bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        {showHeader && (
          <Header
            onToggleTheme={toggleDarkMode}
            isDarkMode={isDarkMode}
            title={getHeaderTitle(activeTab)}
          />
        )}

        <main
          className={`flex-1 ${
            selectedInstitution || activeTab === Tab.BERITA ? "" : "pb-24"
          }`}
        >
          {activeTab === Tab.HOME && <HomeTab />}

          {activeTab === Tab.PROFIL && (
            <div className="animate-fade-in">
              <ProfilTab
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedInstitution={selectedInstitution}
                setSelectedInstitution={setSelectedInstitution}
              />
            </div>
          )}

          {activeTab === Tab.JADWAL && <JadwalTab />}

          {activeTab === Tab.BIAYA && <BiayaTab />}

          {activeTab === Tab.BERITA && (
            <div className="animate-fade-in">
              <BeritaTab setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === Tab.DOWNLOAD && <DownloadTab />}
        </main>

        {showBottomNav && (
          <BottomNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedInstitution(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
