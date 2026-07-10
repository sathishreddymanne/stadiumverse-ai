import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StadiumProvider } from "@/context/StadiumContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StadiumVerse AI — FIFA World Cup 2026 Smart Stadiums & Tournament Operations",
  description: "GenAI-powered real-time assistant and operations console optimizing wait times, multilingual translation, accessibility navigation, security dispatches, and crowd logistics for the FIFA World Cup 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        <StadiumProvider>
          {children}
        </StadiumProvider>
      </body>
    </html>
  );
}
