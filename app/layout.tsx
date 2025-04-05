import type { Metadata } from "next";
import { Noto_Sans, Vazirmatn } from "next/font/google";
import "./globals.css";
import { TournamentProvider } from "./context/TournamentContext";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageDialog from "./components/LanguageDialog";
import Header from "./components/Header";

// Load Noto Sans for Latin scripts
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

// Load Vazirmatn for Farsi - a modern, high-quality Persian font
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Football Tournament Manager",
  description: "Create and manage football tournaments and scores",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LanguageWrapper>{children}</LanguageWrapper>
    </LanguageProvider>
  );
}

// Helper component to apply direction and render TournamentProvider
function LanguageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="auto" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${notoSans.variable} ${vazirmatn.variable} font-sans antialiased bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen`}
      >
        <TournamentProvider>
          <LanguageDialog />
          <Header />
          <main className="max-w-7xl mx-auto p-4 sm:p-8">{children}</main>
        </TournamentProvider>
      </body>
    </html>
  );
}
