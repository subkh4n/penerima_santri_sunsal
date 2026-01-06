import React from "react";
import { GraduationCap, Phone, Mail, Globe } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-surface-dark p-6 pt-10 pb-28 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex flex-col gap-6">
        {/* Brand Section */}
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-[#e6fcf0] dark:bg-primary/20 flex items-center justify-center text-primary">
            <GraduationCap size={28} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-text-main dark:text-white font-black text-xl leading-tight">
              Yayasan Sunniyah Salafiyah
            </h4>
            <p className="text-sm text-[#61896f] dark:text-gray-400 font-medium">
              Pendidikan Islam Terpadu & Modern
            </p>
          </div>
        </div>

        {/* Contact Icons Section */}
        <div className="flex gap-3 mt-2">
          <a
            className="size-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-black transition-all"
            href="tel:#"
          >
            <Phone size={20} />
          </a>
          <a
            className="size-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-black transition-all"
            href="mailto:#"
          >
            <Mail size={20} />
          </a>
          <a
            className="size-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main dark:text-white hover:bg-primary hover:text-black transition-all"
            href="#"
          >
            <Globe size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-800 w-full my-2"></div>

        {/* Copyright Section */}
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-center text-[13px] text-text-sub dark:text-gray-500 font-medium leading-relaxed">
            © 2026 Yayasan Sunniyah Salafiyah.
          </p>
          <p className="text-center text-[13px] text-text-sub dark:text-gray-500 font-medium">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
