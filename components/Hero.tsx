
import React from 'react';

const Hero: React.FC = () => {
  const heroImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAj9ZKFmprOVGMDeQSjGLjesyfYuTjkS0C5RNtS1_xsXIBqs9jclKTkbCA8DXEu9Zq90awNqST-lU9DJ5FTR1p8LacTIJAmfS1-YHBiOdRtohHHMXmcfgTQYQAn8nsHTCxNeUWbUkzlZ7PQQGYdKSb3KL3k1fIg1oB09_ClHoKYgh45MQqbtPGAQcwZpCMrr8AsOIgxL5IlA0lWZ3l_Mm__SF9PSvzNJ-4ee5__9pbzW9Fd2GCf3fo4_uKInviP0Scbq8WulEIIVLAi";

  return (
    <div className="@container">
      <div className="@[480px]:p-4 px-0 pb-4">
        <div 
          className="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-end p-6 pb-10 relative overflow-hidden @[480px]:rounded-xl"
          style={{ backgroundImage: `linear-gradient(to top, rgba(16, 34, 22, 0.9) 0%, rgba(16, 34, 22, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%), url("${heroImageUrl}")` }}
        >
          <div className="flex flex-col gap-3 text-center z-10 w-full animate-fade-in">
            <div className="inline-flex items-center justify-center self-center bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1 mb-2">
              <span className="text-primary text-xs font-bold tracking-wider uppercase">Tahun Ajaran 2026-2027</span>
            </div>
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
              YAYASAN SUNNIYAH SALAFIYAH
            </h1>
            <p className="text-gray-200 text-sm font-normal leading-relaxed max-w-[32ch] mx-auto">
              Membentuk Generasi Qur'ani yang Berakhlaqul Karimah, Cerdas, dan Mandiri.
            </p>
          </div>
          <button className="z-10 flex min-w-[84px] w-full max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all group">
            <span className="material-symbols-outlined mr-2 text-[20px] group-hover:scale-110 transition-transform">assignment_turned_in</span>
            <span className="truncate">Hasil Seleksi Penerimaan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
