"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLanguage = (lang: "en" | "fa") => {
    setLanguage(lang);
    closeDropdown();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className={language === "fa" ? "ml-1" : "mr-1"}>
          {language === "en" ? "🇬🇧" : "🇮🇷"}
        </span>
        <span className="hidden sm:inline">
          {language === "en" ? t("english") : t("farsi")}
        </span>
        <svg
          className={`w-4 h-4 ${language === "fa" ? "mr-1" : "ml-1"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown}></div>
          <div
            className={`absolute mt-2 py-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700 ${
              language === "fa" ? "right-0" : "left-0"
            }`}
          >
            <button
              onClick={() => switchLanguage("en")}
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                language === "en"
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className={language === "fa" ? "ml-2" : "mr-2"}>🇬🇧</span>{" "}
              {t("english")}
            </button>
            <button
              onClick={() => switchLanguage("fa")}
              className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                language === "fa"
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className={language === "fa" ? "ml-2" : "mr-2"}>🇮🇷</span>{" "}
              {t("farsi")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
