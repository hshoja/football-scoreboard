"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import SoundControl from "./SoundControl";
import { playSound } from "../utils/sound";

export default function Header() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavLinkClick = () => {
    if (mounted) {
      playSound("CLICK");
    }
  };

  // Prevent hydration errors with conditional rendering
  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-base sm:text-lg md:text-xl font-bold text-primary-600 dark:text-primary-400 flex items-center">
                  <span className="mr-2">⚽</span>
                  <span>Football Tournament Manager</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              onClick={handleNavLinkClick}
            >
              <span className="text-base sm:text-lg md:text-xl font-bold text-primary-600 dark:text-primary-400 flex items-center">
                <span className={language === "fa" ? "ml-2" : "mr-2"}>⚽</span>
                <span className="truncate max-w-[150px] sm:max-w-none">
                  <span className="sm:hidden">{t("appNameShort")}</span>
                  <span className="hidden sm:inline">{t("appName")}</span>
                </span>
              </span>
            </Link>

            {/* Desktop navigation - hidden on mobile */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-4 rtl:space-x-reverse">
              <Link
                href="/"
                onClick={handleNavLinkClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/"
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("tournaments")}
              </Link>
              <Link
                href="/matches"
                onClick={handleNavLinkClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/matches"
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("matches")}
              </Link>
              <Link
                href="/standings"
                onClick={handleNavLinkClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/standings"
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("standings")}
              </Link>
              <Link
                href="/info"
                onClick={handleNavLinkClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/info"
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t("support") || "Info"}
                </span>
              </Link>
            </nav>
          </div>

          {/* Controls (common for both mobile and desktop) */}
          <div className="flex items-center gap-2">
            <SoundControl />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
