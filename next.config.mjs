/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,

  // Static export untuk shared hosting (Hostinger)
  output: "export",

  // Disable image optimization untuk static export
  images: {
    unoptimized: true,
  },

  // Trailing slash untuk kompatibilitas routing di shared hosting
  trailingSlash: true,

  // Base path jika deploy di subfolder (kosongkan jika di root domain)
  // basePath: '',

  // Disable webpack config untuk menghindari konflik dengan Turbopack
  webpack: undefined,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Konfigurasi tambahan PWA untuk production
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ["!robots.txt", "!sitemap.xml"],
})(nextConfig);
