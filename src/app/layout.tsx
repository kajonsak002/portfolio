import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kajonsak | Full-Stack Developer",
  description: "Personal portfolio showcasing projects, skills, and creative work. Built with Next.js and designed with a modern Bento Grid layout.",
  keywords: ["portfolio", "developer", "full-stack", "react", "nextjs", "thailand"],
  authors: [{ name: "Kajonsak" }],
  openGraph: {
    title: "Kajonsak | Full-Stack Developer",
    description: "Personal portfolio showcasing projects, skills, and creative work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
