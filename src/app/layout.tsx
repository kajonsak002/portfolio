import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
