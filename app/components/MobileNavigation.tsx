"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { playSound } from "../utils/sound";

export default function MobileNavigation() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    if (mounted) {
      playSound("CLICK");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg animate-slide-up">
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/"
          onClick={handleNavClick}
          className={`flex flex-col items-center justify-center ${
            pathname === "/"
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs mt-1">{t("tournaments")}</span>
        </Link>

        <Link
          href="/matches"
          onClick={handleNavClick}
          className={`flex flex-col items-center justify-center ${
            pathname === "/matches"
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs mt-1">{t("matches")}</span>
        </Link>

        <Link
          href="/standings"
          onClick={handleNavClick}
          className={`flex flex-col items-center justify-center ${
            pathname === "/standings"
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-xs mt-1">{t("standings")}</span>
        </Link>

        <Link
          href="/info"
          onClick={handleNavClick}
          className={`flex flex-col items-center justify-center ${
            pathname === "/info"
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <svg
            className="w-6 h-6"
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
          <span className="text-xs mt-1">{t("support")}</span>
        </Link>
      </div>
    </div>
  );
}
