import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Nawy Real Estate - Apartment Listings',
  description: 'Find your dream apartment with Nawy Real Estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body  suppressHydrationWarning 
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        style={{ backgroundColor: "#f4f4f2" }}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
