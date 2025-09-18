import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import SocialBar from "@/components/SocialBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Graha Bumi Ngeling - Hunian Modern Nyaman untuk Keluarga",
  description:
    "Graha Bumi Ngeling adalah perumahan di Ngeling, Jepara dengan lokasi strategis, fasilitas lengkap, desain modern, dan proses KPR mudah. Cari perumahan Ngeling atau perumahan Jepara terbaik di sini.",
  keywords: [
    "perumahan ngeling",
    "perumahan jepara",
    "graha bumi ngeling",
    "perumahan jepara kpr",
    "rumah jepara",
  ],
  openGraph: {
    title: "Graha Bumi Ngeling - Hunian Modern Nyaman untuk Keluarga",
    description:
      "Perumahan di Ngeling, Jepara: lokasi strategis, fasilitas lengkap, desain modern, dan KPR mudah.",
    url: siteUrl,
    siteName: "Graha Bumi Ngeling",
    images: [{ url: "/foto-rumah1.png", width: 1200, height: 630, alt: "Graha Bumi Ngeling" }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Graha Bumi Ngeling - Hunian Modern Nyaman untuk Keluarga",
    description:
      "Perumahan di Ngeling, Jepara: lokasi strategis, fasilitas lengkap, desain modern, dan KPR mudah.",
    images: ["/foto-rumah1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
