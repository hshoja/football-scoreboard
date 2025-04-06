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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMobileMenu = () => {
    playSound("CLICK");
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    playSound("CLICK");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
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

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <div className="flex mr-2 rtl:mr-0 rtl:ml-2">
              <SoundControl />
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">
                {mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              </span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop right side */}
          <div className="hidden sm:flex items-center">
            <SoundControl />
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        } border-t border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            onClick={handleNavLinkClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
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
            className={`block px-3 py-2 rounded-md text-base font-medium ${
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
            className={`block px-3 py-2 rounded-md text-base font-medium ${
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
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/info"
                ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="flex items-center">
              <svg
                className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0"
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
        </div>
      </div>
    </header>
  );
}
