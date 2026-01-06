import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import InfoSection from './components/InfoSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

export enum Tab {
  HOME = 'home',
  PROFIL = 'profil',
  BIAYA = 'biaya',
  BERITA = 'berita',
  DOWNLOAD = 'download'
}

interface Institution {
  name: string;
  desc: string;
  icon: string;
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [boardingType, setBoardingType] = useState<'Boarding' | 'Full Day'>('Boarding');
  const [selectedLembaga, setSelectedLembaga] = useState('');
  const [newsCategory, setNewsCategory] = useState('Semua');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getHeaderTitle = (tab: Tab) => {
    switch (tab) {
      case Tab.HOME: return 'Beranda';
      case Tab.PROFIL: return 'Profil Lembaga';
      case Tab.BIAYA: return 'Informasi Biaya';
      case Tab.BERITA: return 'Berita & Kegiatan';
      case Tab.DOWNLOAD: return 'Pusat Unduhan';
      default: return 'Beranda';
    }
  };

  const categories = ['Semua', 'Pengumuman', 'Kegiatan', 'Prestasi', 'Artikel'];

  const profilSections = [
    {
      title: "Pondok Pesantren",
      items: [
        { name: "Pondok Athfal Sunniyah Salafiyah", desc: "Pendidikan Diniyah Anak Usia Dini", icon: "child_care" },
        { name: "Pondok Putra Sunniyah Salafiyah", desc: "Asrama Santri Putra", icon: "mosque" },
        { name: "Pondok Putri Az-zahro'", desc: "Asrama Santri Putri", icon: "woman_2" },
      ]
    },
    {
      title: "Sekolah Formal",
      items: [
        { name: "SMP Putra Al-azhar", desc: "Sekolah Menengah Pertama (Putra)", icon: "school" },
        { name: "SMA Putra Al-azhar", desc: "Sekolah Menengah Atas (Putra)", icon: "history_edu" },
        { name: "SMP Putri Al-azhar", desc: "Sekolah Menengah Pertama (Putri)", icon: "school" },
        { name: "SMK Putri Al-azhar", desc: "Sekolah Menengah Kejuruan (Putri)", icon: "draw" },
      ]
    },
    {
      title: "Madrasah & Kampus",
      items: [
        { name: "Madrasah Sunniyah Salafiyah", desc: "Pendidikan Diniyah", icon: "menu_book" },
        { name: "Madrasah Az-zahro'", desc: "Pendidikan Diniyah Putri", icon: "auto_stories" },
        { name: "STIT Sunniyah Salafiyah", desc: "Sekolah Tinggi Ilmu Tarbiyah", icon: "account_balance" },
      ]
    }
  ];

  const rincianBiaya = [
    { name: "Pendaftaran", desc: "Formulir & Administrasi", amount: "Rp 250.000", icon: "app_registration" },
    { name: "Uang Pangkal", desc: "Pengembangan Gedung", amount: "Rp 2.500.000", icon: "domain" },
    { name: "Seragam", desc: "3 Stel Bahan Kain", amount: "Rp 650.000", icon: "checkroom" },
    { name: "Kitab & Buku", desc: "Paket Semester 1", amount: "Rp 450.000", icon: "menu_book" },
    { name: "SPP Bulan 1", desc: "Syahriah & Makan", amount: "Rp 400.000", icon: "payments" },
  ];

  const downloadItems = [
    {
      name: "Madrasah Ibtidaiyah (MI)",
      desc: "Pendidikan tingkat dasar",
      type: "PDF",
      size: "1.2 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt5zjRM8B-1n4IXNBD-knYgEavErBZ_NFcFnE-j8r8AJpYhw7BdXjrlcGHi9xG9VPtPiiQd7XQ2HQ_x2l3BHAldokKNU0HXJqG28HRntMp7dOXmpvquhDGXXLj8-q5Wi_GcKmD7Bd0Hd0dDy3ZMXvlxxRIqUF5b5qcLXDZm1zbJXVpFJPCSrhycxPupqMLzSh8bbPkl7GJhucUMchnTP4RpfmPt49at2bSlQVJSX2JhAu1t5Kre6zHIStLGg3SeR6o42hQRfbLcF5M"
    },
    {
      name: "Madrasah Tsanawiyah (MTs)",
      desc: "Pendidikan tingkat menengah",
      type: "PDF",
      size: "2.4 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWJo9eFxCdrleK5VookN6PFmDrUoU_v1SQ7kqHcNgtWWnYSoQ2uKUyewuzTi9AnhAZvKt-zIPuDkxvG4fO114ay6-MiblG0BsS21aVjqp_9uQwaZMztL1S55Kbpy3LgnC-PFCMZPoh_rgkEBvY4LqNd2SgaAe3lGYo8f3_05bCWQBAmoFahRSdVFrNltoITRQoQku729kFX5yx9wOQHCvnefxvb7WCRGfxmOZsuGDik-a_ifs7KlJknN9Sk1DIYE2xFoi1l7S7I07X"
    },
    {
      name: "Madrasah Aliyah (MA)",
      desc: "Pendidikan tingkat atas",
      type: "PDF",
      size: "3.1 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD7TwjvuBLANCoPFf9SPtQX1CUqzyywqoc5rO04GyQAqRxwcJljWleLR0DstXThwBrDCu6dDMkUkfWQ_cQRzajrA36GCbCoZh8fcLwVQ1QBzCHzUBGFlar4G2-l4NjHOTfLmei1Nna6-QlfDpZARoYjdcHVogDwpPsiU1Y8b6vcJIiHzFz_6ltoPcZi95WmioBqe_KNiaKoTJAWjFJF422UoLBDEz7e5xS1SNpEQqRpmOoOCirfeGGPTIV_Doy4mQwvuUm9HfUXX6u"
    },
    {
      name: "Pondok Pesantren",
      desc: "Asrama dan Pendidikan Diniyah",
      type: "PDF",
      size: "4.5 MB",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3y1p_FBOHWx18imPbP-3HWJR46tQzJa6BS8Sr4okgQEeoNm8Kyp_iCAMbzhv96lHEgEYo50tObDGYR05M_bWvxuZXqlobnWW7SyonaSuuOaEpkAaX_P-AAaqtONu-V57aT6SRyMHsvTGNVxkW7ayArIAwSFDPRrMJUWJsV8m00piOK8Z2TRtqCCv355gPXMQkOP2R61QE-vT5QI_zKd0di2LXzQL028IQPo_X1ER0_Aa7ab4yJqFITKVWgKVl6Y75S9HEjjzphTs6"
    }
  ];

  const mainNews: NewsItem = {
    id: 'psb-2026',
    category: 'Pengumuman',
    title: 'Penerimaan Santri Baru Tahun Ajaran 2026/2027 Resmi Dibuka',
    date: '12 Mei 2026',
    author: 'Panitia PSB',
    authorRole: 'Admin Yayasan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAFa4uOSZSTNi2bkEThp0X9-S8tGUggUB34NyVuuv3EdCpTrM8e88se-Ng5FFjRcqllT-RSn7UM6ALRs7ie0i_4rU7283dKDl5qMJleynIpawARI-Q8D9TE37dAm-5fG6cpCorfqx4VGD4fhgq1mLHiwZmeZTNz6Pm06gtMh2TGTZmWVrbmkUqYIuvp52iRYTZTf0uTMSq2aD9hbkSczYVUpagGR6hKZpGoHCBKYItOV9KtPlOhdyRX8pEijOB8GdDDW-vLtW8IrFh',
    summary: 'Yayasan Sunniyah Salafiyah kembali membuka kesempatan bagi putra-putri terbaik untuk bergabung. Segera daftarkan diri Anda sebelum kuota terpenuhi.'
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[480px] mx-auto shadow-2xl bg-surface-light dark:bg-surface-dark transition-colors duration-300">
        
        {(!selectedInstitution && !selectedNews) && (
          <Header 
            onToggleTheme={toggleDarkMode} 
            isDarkMode={isDarkMode} 
            title={getHeaderTitle(activeTab)} 
          />
        )}
        
        <main className={`flex-1 ${(selectedInstitution || selectedNews) ? '' : 'pb-24'}`}>
          {activeTab === Tab.HOME && (
            <div className="animate-fade-in">
              <Hero />
              <QuickActions />
              <InfoSection />
              <StatsSection />
              <Footer />
            </div>
          )}

          {activeTab === Tab.PROFIL && (
            <div className="animate-fade-in">
              {selectedInstitution ? (
                <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
                  <header className="sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
                    <div className="flex items-center justify-between px-4 py-3">
                      <button 
                        onClick={() => setSelectedInstitution(null)}
                        aria-label="Go back" 
                        className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 active:scale-95 transition-all text-[#111813] dark:text-white"
                      >
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                      </button>
                      <h1 className="text-lg font-bold tracking-tight text-[#111813] dark:text-white flex-1 text-center pr-8">Detail Lembaga</h1>
                    </div>
                  </header>

                  <div className="overflow-y-auto pb-32 no-scrollbar">
                    <div className="relative h-64 w-full">
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3y1p_FBOHWx18imPbP-3HWJR46tQzJa6BS8Sr4okgQEeoNm8Kyp_iCAMbzhv96lHEgEYo50tObDGYR05M_bWvxuZXqlobnWW7SyonaSuuOaEpkAaX_P-AAaqtONu-V57aT6SRyMHsvTGNVxkW7ayArIAwSFDPRrMJUWJsV8m00piOK8Z2TRtqCCv355gPXMQkOP2R61QE-vT5QI_zKd0di2LXzQL028IQPo_X1ER0_Aa7ab4yJqFITKVWgKVl6Y75S9HEjjzphTs6')` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-[#052e12] shadow-lg backdrop-blur-sm">
                          <span className="material-symbols-outlined text-[16px] mr-1 fill-1">verified</span>
                          Terakreditasi A
                        </span>
                      </div>
                    </div>

                    <div className="px-4 -mt-2 relative z-10">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#111813] dark:text-white leading-tight mb-2">{selectedInstitution.name}</h2>
                        <div className="flex items-center text-sm text-[#61896f] dark:text-gray-400">
                          <span className="material-symbols-outlined text-[18px] mr-1">school</span>
                          <span>{selectedInstitution.desc}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6 pb-2">
                        <button className="flex-shrink-0 px-4 py-2 bg-[#111813] dark:bg-primary text-white dark:text-[#052e12] text-sm font-medium rounded-lg transition-colors">Tentang</button>
                        <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">Program</button>
                        <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">Fasilitas</button>
                        <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors">Kontak</button>
                      </div>

                      <section className="space-y-4 mb-8">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white flex items-center gap-2">
                          <span className="w-1 h-6 bg-primary rounded-full"></span>
                          Selayang Pandang
                        </h3>
                        <div className="p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {selectedInstitution.name} adalah lembaga pendidikan di bawah naungan Yayasan Sunniyah Salafiyah yang memadukan kurikulum nasional dan kepesantrenan. Kami berkomitmen mencetak generasi yang tidak hanya unggul dalam ilmu pengetahuan umum, tetapi juga memiliki kedalaman ilmu agama dan akhlakul karimah.
                          </p>
                        </div>
                      </section>

                      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#102216]/90 backdrop-blur-md border-t border-gray-100 dark:border-white/5 z-50 max-w-[480px] mx-auto">
                        <div className="flex gap-3">
                          <button className="flex-1 flex flex-col items-center justify-center gap-1 h-12 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <span className="text-xs font-semibold">Download Brosur</span>
                          </button>
                          <button className="flex-[2] flex items-center justify-center gap-2 h-12 bg-primary hover:brightness-105 active:scale-[0.98] text-[#052e12] font-bold text-sm rounded-xl shadow-lg shadow-primary/20 transition-all">
                            Daftar Sekarang
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col px-4 pt-2">
                  <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
                    <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
                      <div className="text-text-sub flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined text-[24px]">search</span>
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
                        {section.items.filter(item => 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((item, iIdx) => (
                          <div 
                            key={iIdx} 
                            onClick={() => setSelectedInstitution(item)}
                            className="group flex items-center gap-4 bg-white dark:bg-gray-800/50 px-4 min-h-[72px] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-50 dark:border-gray-700/50 hover:border-primary/30"
                          >
                            <div className="flex items-center gap-4 flex-1 overflow-hidden">
                              <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12 group-hover:bg-primary group-hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
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
                              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
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
                  onClick={() => setBoardingType('Boarding')}
                  className={`flex-1 shadow-sm rounded-[10px] py-3 text-sm font-bold transition-all transform active:scale-95 ${boardingType === 'Boarding' ? 'bg-primary text-black' : 'text-text-sub dark:text-gray-400 hover:bg-white dark:hover:bg-white/5'}`}
                >
                  Boarding
                </button>
                <button 
                  onClick={() => setBoardingType('Full Day')}
                  className={`flex-1 rounded-[10px] py-3 text-sm font-bold transition-all transform active:scale-95 ${boardingType === 'Full Day' ? 'bg-primary text-black' : 'text-text-sub dark:text-gray-400 hover:bg-white dark:hover:bg-white/5'}`}
                >
                  Full Day
                </button>
              </div>

              <div className="mb-3 relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-text-sub text-[20px]">domain</span>
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
                  <span className="material-symbols-outlined text-text-sub text-[24px]">expand_more</span>
                </div>
              </div>

              <div className="relative overflow-hidden bg-[#111813] dark:bg-gray-900 rounded-2xl p-6 shadow-lg mb-6 text-white border border-gray-800 dark:border-white/10">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                <div className="relative z-10 text-center">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">Total Estimasi</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm font-medium text-primary">Rp</span>
                    <h3 className="text-4xl font-bold text-white tracking-tight">4.250.000</h3>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    <span className="text-xs text-gray-300">Termasuk SPP Bulan Pertama</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-text-main dark:text-white font-bold text-lg px-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">receipt_long</span>
                  Rincian Biaya
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-100 dark:border-white/5 transition-colors">
                  {rincianBiaya.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border-b border-gray-100 dark:border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
                             <span className="material-symbols-outlined text-[20px] text-primary">{item.icon}</span>
                        </div>
                        <div>
                          <p className="text-text-main dark:text-white text-sm font-semibold">{item.name}</p>
                          <p className="text-text-sub dark:text-gray-400 text-[11px]">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-text-main dark:text-white text-sm font-bold">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30">
                <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-[20px] shrink-0 mt-0.5">info</span>
                <p className="text-xs text-yellow-800 dark:text-yellow-200 leading-relaxed">
                  <span className="font-bold">Catatan:</span> Biaya di atas adalah estimasi untuk tahun ajaran 2026/2027. Pembayaran dapat dilakukan secara bertahap (angsuran) sesuai ketentuan yayasan.
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
                      <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Detail Berita</h2>
                    <div className="flex w-12 items-center justify-end">
                      <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-text-main dark:text-white text-[24px]">share</span>
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
                          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                          <span>{selectedNews.date}</span>
                        </div>
                      </div>
                      <h1 className="text-xl md:text-2xl font-bold text-text-main dark:text-white leading-snug">
                        {selectedNews.title}
                      </h1>
                      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-4">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[18px]">person</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-text-main dark:text-white">{selectedNews.author}</span>
                          <span className="text-[10px] text-text-sub">{selectedNews.authorRole}</span>
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
                        <strong className="text-text-main dark:text-white">Yayasan Sunniyah Salafiyah</strong> — Alhamdulillah, puji syukur kita panjatkan ke hadirat Allah SWT. Dengan memohon ridho-Nya dan syafaat Rasulullah SAW, kami mengumumkan bahwa Penerimaan Santri Baru (PSB) untuk Tahun Ajaran 2026/2027 telah resmi dibuka mulai hari ini.
                      </p>
                      <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Kami mengundang putra-putri terbaik bangsa untuk bergabung menjadi bagian dari keluarga besar Yayasan Sunniyah Salafiyah. Program pendidikan kami dirancang secara komprehensif untuk mencetak generasi yang tidak hanya unggul dalam ilmu agama, tetapi juga memiliki wawasan luas, kemandirian, dan akhlakul karimah yang sesuai dengan manhaj Ahlussunnah wal Jamaah.
                      </p>
                      
                      <div className="my-6 p-4 rounded-xl bg-white dark:bg-gray-800 border-l-4 border-primary shadow-sm">
                        <h3 className="text-sm font-bold text-text-main dark:text-white mb-2">Poin Penting Pendaftaran</h3>
                        <ul className="space-y-2">
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <span className="material-symbols-outlined text-primary text-[16px] fill-1">check_circle</span>
                            <span>Pendaftaran dibuka mulai 12 Mei s.d. 30 Juni 2026.</span>
                          </li>
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <span className="material-symbols-outlined text-primary text-[16px] fill-1">check_circle</span>
                            <span>Tes seleksi meliputi membaca Al-Qur'an dan wawancara.</span>
                          </li>
                          <li className="flex gap-2 text-xs text-text-sub dark:text-gray-400">
                            <span className="material-symbols-outlined text-primary text-[16px] fill-1">check_circle</span>
                            <span>Tersedia beasiswa bagi santri berprestasi dan yatim/piatu.</span>
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-base font-bold text-text-main dark:text-white mt-6 mb-3">Persyaratan Administrasi</h3>
                      <p className="mb-3 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Calon wali santri diharapkan mempersiapkan berkas-berkas berikut sebelum melakukan pendaftaran:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 mb-6 text-sm text-text-sub dark:text-gray-400 marker:text-primary">
                        <li>Fotokopi Akta Kelahiran (2 lembar).</li>
                        <li>Fotokopi Kartu Keluarga (2 lembar).</li>
                        <li>Pas foto berwarna ukuran 3x4 (4 lembar).</li>
                        <li>Surat Keterangan Sehat dari dokter.</li>
                      </ul>
                      
                      <p className="mb-4 text-sm text-text-sub dark:text-gray-300 text-justify">
                        Segera daftarkan diri Anda sebelum kuota terpenuhi. Untuk informasi lebih lanjut mengenai teknis pendaftaran, biaya pendidikan, dan fasilitas asrama, silakan hubungi sekretariat panitia PSB atau unduh brosur digital melalui tombol di bawah ini.
                      </p>
                    </article>
                    <div className="h-16"></div>
                  </main>

                  <div className="sticky bottom-0 z-20 w-full bg-white/95 dark:bg-[#152018]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 p-4 pb-6 max-w-[480px] mx-auto">
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-medium rounded-xl h-12 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        <span className="text-sm">Brosur</span>
                      </button>
                      <button className="flex-[2] bg-primary hover:brightness-105 text-black font-bold rounded-xl h-12 flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[20px]">app_registration</span>
                        <span className="text-sm">Daftar Sekarang</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
                  <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-white/5 transition-all">
                    <button 
                      onClick={() => setActiveTab(Tab.HOME)}
                      className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Berita</h2>
                    <div className="flex w-12 items-center justify-end">
                      <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-text-main dark:text-white text-[24px]">notifications</span>
                      </button>
                    </div>
                  </header>

                  <main className="flex-1 flex flex-col px-4 pb-24 pt-2">
                    <div className="sticky top-[60px] z-10 bg-background-light dark:bg-background-dark pt-2 pb-4 -mx-4 px-4 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none mb-2">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
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
                                ? 'bg-primary text-black shadow-primary/20' 
                                : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 text-text-sub dark:text-gray-400'
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
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            <span>{mainNews.date}</span>
                          </div>
                          <h3 className="text-base font-bold text-text-main dark:text-white leading-snug">
                              {mainNews.title}
                          </h3>
                          <p className="text-xs text-text-sub dark:text-gray-400 line-clamp-2 leading-relaxed">
                              {mainNews.summary}
                          </p>
                          <div className="mt-2 pt-3 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400">Oleh: {mainNews.author}</span>
                            <button className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                Baca Selengkapnya <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </article>

                      {/* Side Image Articles */}
                      <article 
                        onClick={() => setSelectedNews({ ...mainNews, title: 'Kunjungan Syekh dari Timur Tengah', category: 'Kegiatan', date: '10 Mei 2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3CqIRpasd2a8279pB-1VY3YQ8QIACPXS6Hj7rgh_HJf1A3zdiP8d3mXmyBjrfeW6khtLgnDJ67WBMocaRVDKBMgBREtWOUoTbSuHrUhlzVxsd7Qlf5Kw_frMUkVsG6IrLzJXXYKA2locqdDTy2q8b2b5zzngoxCUqLZQuu8jcNkGa3hh9IxSdPs-0avVtUwb-ZPR16v0OtLh16sgiT2Fy_mWKQEw1NUTsr6oUTBnbBsqQwmjQBBqCrE0u8y3WnGM8Yt2J86L0qeZp' })}
                        className="group flex gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow items-start cursor-pointer border border-transparent hover:border-primary/20"
                      >
                        <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
                          <img alt="News Thumbnail" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3CqIRpasd2a8279pB-1VY3YQ8QIACPXS6Hj7rgh_HJf1A3zdiP8d3mXmyBjrfeW6khtLgnDJ67WBMocaRVDKBMgBREtWOUoTbSuHrUhlzVxsd7Qlf5Kw_frMUkVsG6IrLzJXXYKA2locqdDTy2q8b2b5zzngoxCUqLZQuu8jcNkGa3hh9IxSdPs-0avVtUwb-ZPR16v0OtLh16sgiT2Fy_mWKQEw1NUTsr6oUTBnbBsqQwmjQBBqCrE0u8y3WnGM8Yt2J86L0qeZp" />
                        </div>
                        <div className="flex flex-col flex-1 h-24 justify-between py-0.5">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">Kegiatan</span>
                            <h3 className="text-sm font-bold text-text-main dark:text-white leading-snug line-clamp-2">Kunjungan Syekh dari Timur Tengah di Pondok Pusat</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400">10 Mei 2026</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </main>
                </div>
              )}
            </div>
          )}

          {activeTab === Tab.DOWNLOAD && (
            <div className="flex flex-col px-4 pb-24 pt-2 animate-fade-in">
              <div className="py-3 sticky top-[68px] z-10 bg-surface-light dark:bg-surface-dark transition-colors duration-300">
                <div className="flex w-full h-12 items-stretch rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700">
                  <div className="text-text-sub flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined text-[24px]">search</span>
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
                {downloadItems.filter(item => 
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item, idx) => (
                  <div key={idx} className="group relative flex flex-col p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-transparent dark:border-gray-700/50 transition-all duration-300">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div 
                          className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-white/5 bg-cover bg-center" 
                          style={{ backgroundImage: `url('${item.image}')` }}
                        ></div>
                      </div>
                      <div className="flex flex-col justify-center flex-1 min-w-0 py-0.5">
                        <h3 className="text-base font-bold text-text-main dark:text-white truncate">{item.name}</h3>
                        <p className="text-sm text-text-sub dark:text-gray-400 truncate">{item.desc}</p>
                      </div>
                    </div>
                    <button className="mt-4 flex items-center justify-center w-full h-11 gap-2 bg-primary hover:brightness-105 active:scale-[0.98] text-black text-sm font-bold rounded-xl transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[20px] fill-1">download</span>
                      Download Brosur PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        
        {(!selectedInstitution && !selectedNews) && (
          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSelectedInstitution(null);
              setSelectedNews(null);
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default App;