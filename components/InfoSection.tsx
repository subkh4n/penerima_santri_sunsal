
import React from 'react';

const InfoSection: React.FC = () => {
  const infoCards = [
    {
      title: "Jadwal Pendaftaran",
      desc: "Simak jadwal lengkap gelombang pendaftaran tahun ajaran baru agar tidak tertinggal.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkg3FAum8-Hjnf_ZB1SwpIwqVZVnYNnA5syejUaitg-_w48h7wjYq2LhlaaQyX4zIltqhDacEXsJYT4zJDyQDnOuPBqYuqXt0-TEOoLTHrg0n6hUN50B3fXWwmNjh4tGEGPIouN-8-tv_ke3K6whZqejSg2XKijTAjgwADdohBtChkCDlfLU_AXsmP0g80zNBp75U6ejxwf9ZUNmRndP5FqfFJX9xrKoQjTdj7vtaqzZGTU6X1y7Bg95nhvlqV7FzuqCf9NonOwOu9",
      icon: "calendar_month",
      fullWidth: true
    },
    {
      title: "Informasi Pendaftaran",
      desc: "Syarat berkas, biaya administrasi, dan alur pendaftaran santri baru.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjy74odUUVdeiVEcUXqTEt3wftbITfQo3Z_WMRGcuRRN8j8yw1RVVZ_nz7hS0YHBLIVTXGldwKkcdOQzTCL3jcMiybYgANHZXKp4dJs3z175ONwzweTwfl49prXqgEoFaZO-Kb0sdN7yF1TDO6A0QX9jHqaDcfeisIkcu51d22YbZA3-WqonJbTPOp_VJmSTGxpYXoO_bvWuPnb7XUvOqFcmYJn-gNN3kcJCcgJI5WuFt2tkOD9775EMcgueknNAZfIFcTk9WIz_AW",
      icon: "info"
    },
    {
      title: "Peraturan Santri",
      desc: "Buku saku tata tertib dan disiplin yang wajib dipatuhi oleh seluruh santri.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXMfROxql0Jj3QHg4-EVotQuSxngqNSTG5NIineT1EdTYwqC-GyXL4PY4ukEEkOuOUJ7AQTZoOBD5hu-e-KkfyPOxrcPFeZicASX7iWRR4xb6CGan0A7_l82Te3aXXH26ZdP_GLYxXdZ9F_yaElEKfNehUUDnpp7SX1kZdYw6KmbE_am2HS0OoqkD6SNf07gGXFmTWpiaUKdbru0dVK5-kpwcEOh3OpeIOrVUsCytaAVWI3evRXQv8UKCfOV11FvKeUH4_gxe5cMhw",
      icon: "gavel"
    }
  ];

  return (
    <div className="pt-8 pb-4">
      <div className="px-4 pb-2 flex justify-between items-end">
        <h2 className="text-text-main dark:text-white tracking-tight text-[22px] font-bold leading-tight">Informasi Penting</h2>
        <a className="text-primary text-sm font-medium hover:underline mb-1" href="#">Lihat Semua</a>
      </div>

      <div className="flex flex-col gap-4 p-4 pt-2">
        {infoCards.map((card, idx) => (
          card.fullWidth ? (
            <div key={idx} className="group flex flex-col rounded-xl bg-white dark:bg-[#1f3528] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
              <div 
                className="h-32 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundImage: `url("${card.image}")` }}
              ></div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 rounded-lg p-2 text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight">{card.title}</h3>
                    <p className="text-text-sub dark:text-gray-400 text-sm font-normal leading-relaxed mt-1 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <button className="w-full mt-1 flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-gray-50 dark:bg-gray-800/50 text-text-main dark:text-white text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Baca Selengkapnya
                </button>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1f3528] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
              <div className="flex flex-col justify-between flex-1 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">{card.icon}</span>
                    <p className="text-text-main dark:text-white text-base font-bold leading-tight">{card.title}</p>
                  </div>
                  <p className="text-text-sub dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">{card.desc}</p>
                </div>
                <button className="flex items-center gap-1 text-primary text-sm font-bold mt-2 hover:underline w-fit">
                  <span>Baca Selengkapnya</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              <div 
                className="w-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0" 
                style={{ backgroundImage: `url("${card.image}")` }}
              ></div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
