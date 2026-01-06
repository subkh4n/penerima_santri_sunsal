import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#102216" },
  ],
};

export const metadata: Metadata = {
  title: "Yayasan Sunniyah Salafiyah",
  description: "Platform informasi dan layanan Yayasan Sunniyah Salafiyah",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Yayasan Sunniyah Salafiyah",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head></head>
      <body
        className={`${lexend.variable} font-display antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
