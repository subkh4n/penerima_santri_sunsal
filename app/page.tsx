"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Search,
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Clock,
  Briefcase,
  ChevronDown,
  ScrollText,
  Share2,
  User,
  ChevronRight,
  Info,
  PenSquare,
  BadgeCheck,
  School,
  Eye,
  Building2,
  MapPin,
  MessageCircle,
  Phone,
  Globe,
  Landmark,
  LayoutDashboard,
  Wallet,
  Bell,
  Banknote,
  Newspaper,
  QrCode,
  GraduationCap,
  ArrowBigDownDash,
  Check,
  FileEdit,
  Megaphone,
  ClipboardList,
  CalendarX,
  UserPlus,
} from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import InfoSection from "@/components/InfoSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ChatAssistant from "@/components/ChatAssistant";
import RequirementsPage from "@/components/RequirementsPage";
import { getAllLembaga, getLembagaById, formatCurrency } from "@/lib/lembaga";
import { Lembaga } from "@/types/lembaga";
import { JADWAL_PENDAFTARAN } from "@/data/jadwal-pendaftaran";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

enum Tab {
  HOME = "home",
  PROFIL = "profil",
  JADWAL = "jadwal",
  BIAYA = "biaya",
  BERITA = "berita",
  DOWNLOAD = "download",
}

interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  summary: string;
}

const getIcon = (iconName: string, size: number = 20) => {
  const iconMap: { [key: string]: any } = {
    school: School,
    check_circle: CheckCircle2,
    apartment: Building2,
    domain: Building2,
    receipt_long: ScrollText,
    info: Info,
    visibility: Eye,
    map: MapPin,
    location_on: MapPin,
    chat: MessageCircle,
    call: Phone,
    language: Globe,
    mosque: Landmark,
    dashboard: LayoutDashboard,
    payments: Wallet,
    account_balance_wallet: Wallet,
    money: Banknote,
    newspaper: Newspaper,
    download: Download,
    qr_code: QrCode,
    person: User,
    schedule: Clock,
    calendar_month: Calendar,
    work: Briefcase,
  };

  const IconComponent = iconMap[iconName] || Info;
  return <IconComponent size={size} />;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [boardingType, setBoardingType] = useState<"Boarding" | "Full Day">(
    "Boarding"
  );
  const [selectedLembaga, setSelectedLembaga] = useState("");
  const [newsCategory, setNewsCategory] = useState("Semua");
  const [selectedInstitution, setSelectedInstitution] =
    useState<Lembaga | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showRequirements, setShowRequirements] = useState(false);
  const [jadwalLembaga, setJadwalLembaga] = useState("pass");
  const [jadwalGelombang, setJadwalGelombang] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const tentangRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);
  const fasilitasRef = useRef<HTMLDivElement>(null);
  const kontakRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Sync jadwal selection with profile selection
  useEffect(() => {
    if (selectedLembaga) {
      setJadwalLembaga(selectedLembaga);
    } else if (selectedInstitution) {
      setJadwalLembaga(selectedInstitution.id);
    }
  }, [selectedLembaga, selectedInstitution]);

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

  const categories = ["Semua", "Pengumuman", "Kegiatan", "Prestasi", "Artikel"];

  const allLembaga = getAllLembaga();
  const profilSections = [
    {
      title: "Pondok Pesantren",
      items: allLembaga.filter((l) => l.type === "ponpes"),
    },
    {
      title: "Sekolah Formal & Pondok Pesantren",
      items: allLembaga.filter((l) =>
        ["sd", "smp", "sma", "smk"].includes(l.type)
      ),
    },
    {
      title: "Madrasah & Kampus",
      items: allLembaga.filter((l) => ["madrasah", "stit"].includes(l.type)),
    },
  ];

  // Get selected lembaga data
  const selectedLembagaData = selectedLembaga
    ? getLembagaById(selectedLembaga)
    : null;

  // Get biaya data based on boarding type
  const biayaData =
    selectedLembagaData?.biaya?.[
      boardingType === "Boarding" ? "boarding" : "fullDay"
    ];

  // Get rincian biaya dynamically
  const rincianBiaya =
    biayaData?.rincian?.map((item) => ({
      name: item.nama,
      desc: item.deskripsi,
      amount: formatCurrency(item.jumlah),
      icon: item.icon,
    })) || [];

  // Get total estimasi
  const totalEstimasi = biayaData?.totalEstimasi || 0;

  const downloadItems = getAllLembaga().map((lembaga) => ({
    name: lembaga.name,
    desc: lembaga.desc,
    type: "PDF",
    size: "Brosur Digital",
    image: lembaga.image,
  }));

  const mainNews: NewsItem = {
    id: "psb-2026",
    category: "Pengumuman",
    title: "Penerimaan Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka",
    date: "12 Mei 2026",
    author: "Panitia PSB",
    authorRole: "Admin Yayasan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAFa4uOSZSTNi2bkEThp0X9-S8tGUggUB34NyVuuv3EdCpTrM8e88se-Ng5FFjRcqllT-RSn7UM6ALRs7ie0i_4rU7283dKDl5qMJleynIpawARI-Q8D9TE37dAm-5fG6cpCorfqx4VGD4fhgq1mLHiwZmeZTNz6Pm06gtMh2TGTZmWVrbmkUqYIuvp52iRYTZTf0uTMSq2aD9hbkSczYVUpagGR6hKZpGoHCBKYItOV9KtPlOhdyRX8pEijOB8GdDDW-vLtW8IrFh",
    summary:
      "Yayasan Sunniyah Salafiyah kembali membuka kesempatan bagi putra-putri terbaik untuk bergabung. Segera daftarkan diri Anda sebelum kuota terpenuhi.",
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[480px] mx-auto shadow-2xl bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        {!selectedInstitution && !selectedNews && (
          <>
            <Header
              onToggleTheme={toggleDarkMode}
              isDarkMode={isDarkMode}
              title={getHeaderTitle(activeTab)}
              onBack={
                activeTab !== Tab.HOME
                  ? () => setActiveTab(Tab.HOME)
                  : undefined
              }
            />
            <div className="h-[72px] w-full shrink-0" />
          </>
        )}

        <main
          className={`flex-1 ${
            selectedInstitution || selectedNews ? "" : "pb-24"
          }`}
        >
          {activeTab === Tab.HOME && (
            <div className="animate-fade-in">
              <Hero />
              <QuickActions />
              <InfoSection onViewAllClick={() => setActiveTab(Tab.BERITA)} />
              <StatsSection />
              <Footer />
            </div>
          )}

          {activeTab === Tab.PROFIL && (
            <div className="animate-fade-in">
              {selectedInstitution ? (
                showRequirements ? (
                  <RequirementsPage
                    institution={selectedInstitution}
                    onBack={() => setShowRequirements(false)}
                  />
                ) : (
                  <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
                    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-40 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-300 pointer-events-none">
                      <div className="flex items-center justify-between px-4 py-3 pointer-events-auto">
                        <button
                          onClick={() => setSelectedInstitution(null)}
                          aria-label="Go back"
                          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-white/20 active:scale-95 transition-all text-white backdrop-blur-md shadow-sm"
                        >
                          <ChevronLeft size={28} />
                        </button>
                        <h1 className="text-lg font-bold tracking-tight text-white flex-1 text-center pr-8 drop-shadow-md">
                          Profil Lembaga
                        </h1>
                      </div>
                    </header>

                    <main className="flex-1 overflow-y-auto pb-24 no-scrollbar relative w-full">
                      <div className="relative h-72 w-full shrink-0">
                        <div
                          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${selectedInstitution.image}')`,
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-[#052e12] shadow-lg backdrop-blur-sm">
                            <BadgeCheck
                              size={16}
                              className="mr-1 fill-current"
                            />
                            Terakreditasi{" "}
                            {selectedInstitution.profil.akreditasi || "A"}
                          </span>
                        </div>
                      </div>

                      <div className="px-4 -mt-2 relative z-10">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-[#111813] dark:text-white leading-tight mb-2">
                            {selectedInstitution.name}
                          </h2>
                          <div className="flex items-center text-sm text-[#61896f] dark:text-gray-400">
                            <School size={18} className="mr-1" />
                            <span>{selectedInstitution.desc}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6 pb-2">
                          <button
                            onClick={() => scrollToSection(tentangRef)}
                            className="flex-shrink-0 px-4 py-2 bg-[#111813] dark:bg-primary text-white dark:text-[#052e12] text-sm font-medium rounded-lg transition-colors"
                          >
                            Tentang
                          </button>
                          <button
                            onClick={() => scrollToSection(programRef)}
                            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                          >
                            Program
                          </button>
                          <button
                            onClick={() => scrollToSection(fasilitasRef)}
                            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                          >
                            Fasilitas
                          </button>
                          <button
                            onClick={() => scrollToSection(kontakRef)}
                            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                          >
                            Kontak
                          </button>
                          <button
                            onClick={() => setShowRequirements(true)}
                            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
                          >
                            Persyaratan
                          </button>
                        </div>

                        <section ref={tentangRef} className="space-y-4 mb-8">
                          <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Selayang Pandang
                          </h3>
                          <div className="p-4 bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {selectedInstitution.profil.deskripsi}
                            </p>
                          </div>
                        </section>

                        {selectedInstitution.visi && (
                          <section className="space-y-4 mb-8">
                            <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                              <span className="w-1 h-6 bg-primary rounded-full"></span>
                              Visi & Misi
                            </h3>
                            <div className="grid gap-3">
                              <div className="relative overflow-hidden p-4 rounded-lg bg-[#e8f5e9] dark:bg-[#132e21] border border-primary/20">
                                <span className="absolute -right-4 -top-4 text-primary/10 dark:text-primary/5">
                                  <Eye size={100} className="fill-current" />
                                </span>
                                <h4 className="font-bold text-[#111813] dark:text-white mb-1 relative z-10">
                                  Visi
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 italic relative z-10">
                                  "{selectedInstitution.visi}"
                                </p>
                              </div>
                              {selectedInstitution.misi && (
                                <div className="p-4 bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-gray-100 dark:border-white/5">
                                  <h4 className="font-bold text-[#111813] dark:text-white mb-3">
                                    Misi
                                  </h4>
                                  <ul className="space-y-3">
                                    {selectedInstitution.misi.map(
                                      (misi, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-3"
                                        >
                                          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold mt-0.5">
                                            {idx + 1}
                                          </span>
                                          <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {misi}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </section>
                        )}

                        <section ref={programRef} className="space-y-4 mb-8">
                          <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            {selectedInstitution.prodi
                              ? "Jurusan & Program"
                              : "Program Unggulan"}
                          </h3>
                          {selectedInstitution.prodi ? (
                            <div className="grid grid-cols-2 gap-3">
                              {selectedInstitution.prodi.map((prodi, idx) => (
                                <div
                                  key={idx}
                                  className={`group p-3 bg-white dark:bg-surface-dark rounded-lg border border-gray-100 dark:border-white/5 hover:border-primary/50 transition-all text-center ${
                                    idx ===
                                      selectedInstitution.prodi!.length - 1 &&
                                    idx % 2 === 0
                                      ? "col-span-2"
                                      : ""
                                  }`}
                                >
                                  <div className="w-10 h-10 mx-auto mb-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                                    {getIcon(prodi.icon || "school", 20)}
                                  </div>
                                  <h4 className="font-semibold text-sm text-[#111813] dark:text-white">
                                    {prodi.nama}
                                  </h4>
                                  <p className="text-[10px] text-gray-500 mt-1">
                                    {prodi.deskripsi}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-3">
                              {selectedInstitution.programUnggulan?.map(
                                (prog, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-white dark:bg-surface-dark rounded-lg border border-gray-100 dark:border-white/5 flex items-center gap-3"
                                  >
                                    <CheckCircle2
                                      size={20}
                                      className="text-primary"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {prog}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </section>

                        {selectedInstitution.fasilitas && (
                          <section
                            ref={fasilitasRef}
                            className="space-y-4 mb-8"
                          >
                            <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                              <span className="w-1 h-6 bg-primary rounded-full"></span>
                              Fasilitas
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                              {selectedInstitution.fasilitas.map(
                                (fasilitas, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-white dark:bg-surface-dark rounded-lg border border-gray-100 dark:border-white/5 flex items-center gap-2"
                                  >
                                    <Building2
                                      size={20}
                                      className="text-primary"
                                    />
                                    <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                                      {fasilitas}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </section>
                        )}

                        <section ref={kontakRef} className="space-y-4">
                          <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Kontak & Lokasi
                          </h3>
                          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-white/10">
                            <div className="bg-gray-200 dark:bg-gray-700 h-32 w-full flex items-center justify-center relative">
                              <div
                                className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"
                                style={{
                                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCD7TwjvuBLANCoPFf9SPtQX1CUqzyywqoc5rO04GyQAqRxwcJljWleLR0DstXThwBrDCu6dDMkUkfWQ_cQRzajrA36GCbCoZh8fcLwVQ1QBzCHzUBGFlar4G2-l4NjHOTfLmei1Nna6-QlfDpZARoYjdcHVogDwpPsiU1Y8b6vcJIiHzFz_6ltoPcZi95WmioBqe_KNiaKoTJAWjFJF422UoLBDEz7e5xS1SNpEQqRpmOoOCirfeGGPTIV_Doy4mQwvuUm9HfUXX6u')`,
                                }}
                              ></div>
                              {selectedInstitution.kontak?.googleMap && (
                                <button
                                  onClick={() =>
                                    window.open(
                                      selectedInstitution.kontak?.googleMap,
                                      "_blank"
                                    )
                                  }
                                  className="z-10 bg-white dark:bg-[#111813] text-[#111813] dark:text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                                >
                                  <MapPin size={16} className="text-primary" />
                                  Lihat di Peta
                                </button>
                              )}
                            </div>

                            <div className="p-4 bg-white dark:bg-surface-dark">
                              <div className="flex items-start gap-3 mb-4">
                                <MapPin
                                  size={20}
                                  className="text-gray-400 mt-0.5"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {selectedInstitution.kontak?.alamat ||
                                    "Alamat belum tersedia"}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {selectedInstitution.kontak?.whatsapp && (
                                  <a
                                    href={`https://wa.me/${selectedInstitution.kontak.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold hover:bg-green-100 transition-colors"
                                  >
                                    <MessageCircle size={16} />
                                    WhatsApp
                                  </a>
                                )}
                                {selectedInstitution.kontak?.telepon && (
                                  <a
                                    href={`tel:${selectedInstitution.kontak.telepon}`}
                                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 transition-colors"
                                  >
                                    <Phone size={16} />
                                    Telepon
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </section>
                        <div className="h-6"></div>
                      </div>
                    </main>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#102216]/90 backdrop-blur-md border-t border-gray-100 dark:border-white/5 z-20">
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setActiveTab(Tab.DOWNLOAD);
                            setSelectedInstitution(null);
                          }}
                          className="flex-1 flex flex-col items-center justify-center gap-1 h-12 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-semibold">
                            Download Brosur
                          </span>
                        </button>
                        <a
                          href="https://ppdb.sunsal.net/formulirpendaftar/#/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-[2] flex items-center justify-center gap-2 h-12 bg-primary hover:bg-[#0fd650] active:scale-[0.98] text-[#052e12] font-bold text-sm rounded-lg shadow-lg shadow-primary/20 transition-all"
                        >
                          Daftar Sekarang
                          <ChevronRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col px-4 pt-2">
                  <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
                    <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
                      <div className="text-text-sub flex items-center justify-center pl-4">
                        <Search size={24} />
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
                              item.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                              item.desc
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                          )
                          .map((item, iIdx) => (
                            <div
                              key={iIdx}
                              onClick={() => setSelectedInstitution(item)}
                              className="group flex items-center gap-4 bg-white dark:bg-gray-800/50 px-4 min-h-[72px] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-50 dark:border-gray-700/50 hover:border-primary/30"
                            >
                              <div className="flex items-center gap-4 flex-1 overflow-hidden">
                                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12 group-hover:bg-primary group-hover:text-black transition-colors">
                                  {getIcon(item.icon, 24)}
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
                                <ChevronRight size={24} />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                  <div className="h-6"></div>
                </div>
              )}
            </div>
          )}

          {activeTab === Tab.BIAYA && (
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
                <Select
                  value={selectedLembaga}
                  onValueChange={(value) => setSelectedLembaga(value)}
                >
                  <SelectTrigger className="w-full h-[50px] rounded-xl border-gray-100 dark:border-white/5 bg-white dark:bg-gray-800 text-text-main dark:text-white shadow-sm focus:ring-primary/20">
                    <div className="flex items-center gap-3">
                      <Building2 size={20} className="text-text-sub shrink-0" />
                      <SelectValue placeholder="Pilih Lembaga" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {getAllLembaga().map((lembaga) => (
                      <SelectItem
                        key={lembaga.id}
                        value={lembaga.id}
                        className="cursor-pointer focus:bg-primary/10 focus:text-primary"
                      >
                        {lembaga.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      {totalEstimasi.toLocaleString("id-ID")}
                    </h3>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-xs text-gray-300">
                      Termasuk SPP Bulan Pertama
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-text-main dark:text-white font-bold text-lg px-1 flex items-center gap-2">
                  <ScrollText className="text-primary" />
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
                          {getIcon(item.icon, 20)}
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
                <Info
                  size={20}
                  className="text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5"
                />
                <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                  <span className="font-bold">Catatan:</span> Biaya di atas
                  adalah estimasi untuk tahun ajaran 2026/2027. Pembayaran dapat
                  dilakukan secara bertahap (angsuran) sesuai ketentuan yayasan.
                </p>
              </div>
              <div className="h-6"></div>
            </div>
          )}

          {activeTab === Tab.BERITA && (
            <div className="animate-fade-in">
              {selectedNews ? (
                <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
                  <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-white/5 transition-all">
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                      Detail Berita
                    </h2>
                    <div className="flex w-12 items-center justify-end">
                      <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <Share2
                          size={24}
                          className="text-text-main dark:text-white"
                        />
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
                          <Calendar size={16} />
                          <span>{selectedNews.date}</span>
                        </div>
                      </div>
                      <h1 className="text-xl md:text-2xl font-bold text-text-main dark:text-white leading-snug">
                        {selectedNews.title}
                      </h1>
                      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User
                            size={18}
                            className="text-gray-500 dark:text-gray-400"
                          />
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
                        — Alhamdulillah, puji syukur kita panjatkan ke hadirat
                        Allah SWT. Dengan memohon ridho-Nya dan syafaat
                        Rasulullah SAW, kami mengumumkan bahwa Penerimaan Santri
                        Baru (PSB) untuk Tahun Ajaran 2026/2027 telah resmi
                        dibuka mulai hari ini.
                      </p>
                      <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Kami mengundang putra-putri terbaik bangsa untuk
                        bergabung menjadi bagian dari keluarga besar Yayasan
                        Sunniyah Salafiyah. Program pendidikan kami dirancang
                        secara komprehensif untuk mencetak generasi yang tidak
                        hanya unggul dalam ilmu agama, tetapi juga memiliki
                        wawasan luas, kemandirian, dan akhlakul karimah yang
                        sesuai dengan manhaj Ahlussunnah wal Jamaah.
                      </p>

                      <div className="my-6 p-4 rounded-xl bg-white dark:bg-gray-800 border-l-4 border-primary shadow-sm">
                        <h3 className="text-sm font-bold text-text-main dark:text-white mb-2">
                          Poin Penting Pendaftaran
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <CheckCircle2
                              size={16}
                              className="text-primary fill-current"
                            />
                            <span>
                              Pendaftaran dibuka mulai 12 Mei s.d. 30 Juni 2026.
                            </span>
                          </li>
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <CheckCircle2
                              size={16}
                              className="text-primary fill-current"
                            />
                            <span>
                              Tes seleksi meliputi membaca Al-Qur'an dan
                              wawancara.
                            </span>
                          </li>
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <CheckCircle2
                              size={16}
                              className="text-primary fill-current"
                            />
                            <span>
                              Tersedia beasiswa bagi santri berprestasi dan
                              yatim/piatu.
                            </span>
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-base font-bold text-text-main dark:text-white mt-6 mb-3">
                        Persyaratan Administrasi
                      </h3>
                      <p className="mb-3 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Calon wali santri diharapkan mempersiapkan berkas-berkas
                        berikut sebelum melakukan pendaftaran:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mb-6 text-sm text-text-sub dark:text-gray-400 marker:text-primary">
                        <li>Fotokopi Akta Kelahiran (2 lembar).</li>
                        <li>Fotokopi Kartu Keluarga (2 lembar).</li>
                        <li>Pas foto berwarna ukuran 3x4 (4 lembar).</li>
                        <li>Surat Keterangan Sehat dari dokter.</li>
                      </ul>

                      <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Segera daftarkan diri Anda sebelum kuota terpenuhi.
                        Untuk informasi lebih lanjut mengenai teknis
                        pendaftaran, biaya pendidikan, dan fasilitas asrama,
                        silakan hubungi sekretariat panitia PSB atau unduh
                        brosur digital melalui tombol di bawah ini.
                      </p>
                    </article>
                    <div className="h-16"></div>
                  </main>

                  <div className="sticky bottom-0 z-20 w-full bg-white/95 dark:bg-[#152018]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 p-4 pb-6 max-w-[480px] mx-auto">
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-medium rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Download size={20} />
                        <span className="text-sm">Brosur</span>
                      </button>
                      <button className="flex-[2] bg-primary hover:brightness-105 text-black font-bold rounded-xl h-12 flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                        <PenSquare size={20} />
                        <span className="text-sm">Daftar Sekarang</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
                  <main className="flex-1 flex flex-col px-4 pb-24 pt-2">
                    <div className="sticky top-[60px] z-10 bg-background-light dark:bg-background-dark pt-2 pb-4 -mx-4 px-4 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none mb-2">
                      <div className="relative">
                        <Search
                          size={20}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
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
                            <Calendar size={14} />
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
                              Baca Selengkapnya <ChevronRight size={16} />
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
                            <span className="text-[10px] text-gray-400">
                              10 Mei 2026
                            </span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </main>
                </div>
              )}
            </div>
          )}

          {activeTab === Tab.JADWAL && (
            <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in relative z-50">
              <Header
                onToggleTheme={toggleDarkMode}
                isDarkMode={isDarkMode}
                title="Jadwal Pendaftaran"
                onBack={() => setActiveTab(Tab.HOME)}
              />

              <div className="px-4 pt-6 pb-2 bg-background-light dark:bg-background-dark flex flex-col items-center">
                <div className="w-full mb-6">
                  <label
                    className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1"
                    htmlFor="institution-select"
                  >
                    Pilih Lembaga
                  </label>
                  <div className="relative group">
                    <Select
                      value={jadwalLembaga}
                      onValueChange={(value) => setJadwalLembaga(value)}
                    >
                      <SelectTrigger className="w-full pl-3 pr-4 py-3.5 text-sm font-semibold text-text-main dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <div className="flex items-center gap-3">
                          <School size={20} className="text-gray-400" />
                          <SelectValue placeholder="Pilih Lembaga" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {getAllLembaga().map((lembaga) => (
                          <SelectItem key={lembaga.id} value={lembaga.id}>
                            {lembaga.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Wave Info */}
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-extrabold text-text-main dark:text-white tracking-tight leading-tight mb-2">
                    {getAllLembaga().find((l) => l.id === jadwalLembaga)
                      ?.name || "Pilih Lembaga"}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Tahun Ajaran 2026/2027
                  </div>
                </div>
              </div>

              {jadwalLembaga && (
                <>
                  {/* Wave Selector */}
                  <div className="sticky top-[60px] z-10 bg-background-light dark:bg-background-dark pt-2 pb-4 px-4 transition-colors duration-300">
                    <div className="p-1.5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-1 shadow-sm">
                      {["1", "2", "3"].map((gel) => (
                        <button
                          key={gel}
                          onClick={() => setJadwalGelombang(gel)}
                          className={`relative py-2.5 text-sm font-bold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
                            jadwalGelombang === gel
                              ? "bg-primary text-[#052e12] shadow-sm ring-1 ring-black/5"
                              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 font-medium"
                          }`}
                        >
                          <span>Gelombang {gel}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Content or Empty State */}
                  {JADWAL_PENDAFTARAN[jadwalLembaga]?.waves[
                    jadwalGelombang as "1" | "2" | "3"
                  ]?.isOpened ? (
                    <>
                      {/* Schedule Content */}
                      <div className="px-4 relative">
                        {/* Table */}
                        <div className="mb-8">
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-3">
                              <Calendar className="text-primary" size={20} />
                              <h3 className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
                                Jadwal Kegiatan Gelombang {jadwalGelombang}
                              </h3>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 dark:bg-gray-700/30 border-b border-gray-100 dark:border-gray-700">
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[45%]">
                                      Tanggal
                                    </th>
                                    <th className="py-3 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                      Keterangan
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                  {JADWAL_PENDAFTARAN[jadwalLembaga]?.waves[
                                    jadwalGelombang as "1" | "2" | "3"
                                  ]?.kegiatan.map((item, idx) => (
                                    <tr
                                      key={item.id}
                                      className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                        idx === 0
                                          ? "bg-green-50/50 dark:bg-green-900/10"
                                          : ""
                                      }`}
                                    >
                                      <td className="py-4 px-4 align-top">
                                        <span
                                          className={`text-sm font-bold block ${
                                            idx === 0
                                              ? "text-primary"
                                              : "text-text-main dark:text-white"
                                          }`}
                                        >
                                          {item.dateRange.includes(",") ? (
                                            item.dateRange
                                              .split(",")
                                              .map((datePart, i) => (
                                                <span key={i} className="block">
                                                  {datePart.trim()}
                                                </span>
                                              ))
                                          ) : (
                                            <>{item.dateRange}</>
                                          )}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 align-top">
                                        <span className="text-sm font-bold text-text-main dark:text-white block mb-0.5">
                                          {item.activity}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                                          {item.description}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                          <Info
                            size={20}
                            className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5"
                          />
                          <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                            <span className="font-bold">Info:</span> Jadwal
                            dapat berubah sewaktu-waktu. Selalu pantau informasi
                            terbaru melalui aplikasi atau website resmi.
                          </p>
                        </div>

                        {/* Requirements & Selection Stages */}
                        {getLembagaById(jadwalLembaga)?.pendaftaran && (
                          <div className="mt-6 space-y-4">
                            {/* Requirements */}
                            {getLembagaById(jadwalLembaga)?.pendaftaran
                              ?.persyaratan &&
                              getLembagaById(jadwalLembaga)!.pendaftaran!
                                .persyaratan!.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                    <ClipboardList
                                      className="text-primary"
                                      size={18}
                                    />
                                    Syarat Pendaftaran
                                  </h3>
                                  <ul className="space-y-3">
                                    {getLembagaById(
                                      jadwalLembaga
                                    )?.pendaftaran?.persyaratan?.map(
                                      (req, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                          <span className="leading-relaxed">
                                            {req}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {/* Selection Stages */}
                            {getLembagaById(jadwalLembaga)?.pendaftaran
                              ?.tahapanSeleksi &&
                              getLembagaById(jadwalLembaga)!.pendaftaran!
                                .tahapanSeleksi!.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                                    <UserPlus
                                      className="text-primary"
                                      size={18}
                                    />
                                    Tahapan Seleksi
                                  </h3>
                                  <ul className="space-y-3">
                                    {getLembagaById(
                                      jadwalLembaga
                                    )?.pendaftaran?.tahapanSeleksi?.map(
                                      (step, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                          <div className="w-6 h-6 rounded-full bg-gray-50 dark:bg-gray-700/50 text-xs font-bold flex items-center justify-center text-primary shrink-0 border border-gray-100 dark:border-gray-600">
                                            {i + 1}
                                          </div>
                                          <span className="mt-0.5 leading-relaxed">
                                            {step}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        )}
                      </div>

                      {/* Fixed Bottom Button - Floating Style */}
                      <div className="fixed bottom-24 left-4 right-4 z-50 flex justify-center pointer-events-none">
                        <a
                          href="https://ppdb.sunsal.net/formulirpendaftar/#/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto w-full max-w-md bg-primary hover:bg-[#0fdc52] active:scale-[0.98] transition-all text-black font-bold text-base py-3 px-6 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 ring-1 ring-white/20"
                        >
                          <GraduationCap size={22} className="text-[#052e12]" />
                          <span className="text-[#052e12]">
                            Daftar Sekarang
                          </span>
                        </a>
                      </div>

                      {/* Timeline */}
                      <div className="px-4 pb-28 relative min-h-[400px]">
                        {/* Timeline */}
                        <div className="flex items-center justify-between mb-6 px-1 mt-8">
                          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Linimasa Kegiatan
                          </h3>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                            Gelombang {jadwalGelombang}
                          </span>
                        </div>

                        <div className="relative pb-8">
                          {JADWAL_PENDAFTARAN[jadwalLembaga]?.waves[
                            jadwalGelombang as "1" | "2" | "3"
                          ]?.timeline.map((item, idx, arr) => (
                            <div
                              key={item.id}
                              className={`relative flex gap-4 ${
                                idx !== arr.length - 1 ? "pb-8" : ""
                              } group`}
                            >
                              <div className="flex flex-col items-center flex-shrink-0 relative">
                                {item.status === "Selesai" ? (
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/10 border-2 border-primary text-primary z-10 shadow-sm transition-transform group-hover:scale-110">
                                    <Check
                                      className="text-xl"
                                      size={20}
                                      strokeWidth={3}
                                    />
                                  </div>
                                ) : item.status === "Sedang Berlangsung" ? (
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-[#052e12] shadow-lg shadow-primary/30 z-10 scale-110 ring-4 ring-white dark:ring-background-dark">
                                    <FileEdit
                                      className="text-xl animate-pulse"
                                      size={20}
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 z-10">
                                    {idx === arr.length - 1 ? (
                                      <School className="text-xl" size={20} />
                                    ) : (
                                      <Megaphone
                                        className="text-xl"
                                        size={20}
                                      />
                                    )}
                                  </div>
                                )}

                                {idx !== arr.length - 1 && (
                                  <div
                                    className={`absolute top-[40px] bottom-[-20px] w-0.5 ${
                                      item.status === "Selesai"
                                        ? "bg-primary/30"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                  ></div>
                                )}
                              </div>
                              <div
                                className={`flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border ${
                                  item.status === "Sedang Berlangsung"
                                    ? "border-l-4 border-l-primary border-y border-r border-gray-100 dark:border-gray-700 ring-1 ring-primary/10 shadow-md"
                                    : "border-gray-200 dark:border-gray-700"
                                } ${
                                  item.status === "Selesai" ? "opacity-70" : ""
                                } transition-transform hover:-translate-y-1`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                                      item.status === "Selesai"
                                        ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                        : item.status === "Sedang Berlangsung"
                                        ? "bg-primary/20 text-green-800 dark:text-green-200"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                  <span
                                    className={`text-xs font-bold ${
                                      item.status === "Sedang Berlangsung"
                                        ? "text-primary"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                                  >
                                    {item.date}
                                  </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                  {item.description}
                                </p>
                                {item.location && (
                                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <MapPin
                                      className="text-primary"
                                      size={18}
                                    />
                                    <span className="font-medium">
                                      {item.location}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center pt-20 pb-20 text-center"
                      id="empty-state"
                    >
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <CalendarX className="text-gray-400" size={40} />
                      </div>
                      <h3 className="text-lg font-bold text-text-main dark:text-white mb-2">
                        Belum Ada Jadwal
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-[250px] mx-auto text-sm leading-relaxed">
                        Informasi pendaftaran untuk gelombang ini belum tersedia
                        saat ini.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!jadwalLembaga && (
                <div className="flex flex-col items-center justify-center pt-10 text-center px-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Calendar size={32} className="text-gray-400" />
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
          )}

          {activeTab === Tab.DOWNLOAD && (
            <div className="flex flex-col px-4 pb-24 pt-2 animate-fade-in">
              <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
                <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
                  <div className="text-text-sub flex items-center justify-center pl-4">
                    <Search size={24} />
                  </div>
                  <input
                    className="flex-1 bg-transparent border-none focus:ring-0 text-text-main dark:text-white placeholder:text-text-sub text-base px-3"
                    placeholder="Cari jenjang pendidikan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 min-h-[660px]">
                {downloadItems
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-transparent dark:border-gray-700/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
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
                        <button className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700/50 text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                          <ArrowBigDownDash size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination Controls */}
              {downloadItems.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length > itemsPerPage && (
                <div className="flex justify-center items-center gap-2 mt-6 pb-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-text-main dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      {
                        length: Math.ceil(
                          downloadItems.filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          ).length / itemsPerPage
                        ),
                      },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                          currentPage === page
                            ? "bg-primary text-black shadow-sm"
                            : "bg-white dark:bg-gray-800 text-text-sub dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(
                            downloadItems.filter((item) =>
                              item.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            ).length / itemsPerPage
                          )
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(
                        downloadItems.filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        ).length / itemsPerPage
                      )
                    }
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-text-main dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {!selectedInstitution && !selectedNews && (
          <BottomNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedInstitution(null);
              setSelectedNews(null);
            }}
          />
        )}

        <ChatAssistant />
      </div>
    </div>
  );
}
