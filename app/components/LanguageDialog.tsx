"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageDialog() {
  const { showLanguageDialog, setLanguage, setShowLanguageDialog, t, dir } =
    useLanguage();

  if (!showLanguageDialog) {
    return null;
  }

  const handleLanguageSelection = (lang: "en" | "fa") => {
    setLanguage(lang);
    setShowLanguageDialog(false); // Close the dialog after selection
  };

  const isRtl = dir === "rtl";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          {t("languageSelect")}
        </h2>

        <p className="mb-6 text-center text-gray-700 dark:text-gray-300">
          {t("languagePrompt")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleLanguageSelection("en")}
            className="py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
            style={{ direction: "ltr" }}
          >
            <span className={isRtl ? "ml-2" : "mr-2"}>🇬🇧</span> {t("english")}
          </button>

          <button
            onClick={() => handleLanguageSelection("fa")}
            className="py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
            style={{ direction: "rtl" }}
          >
            <span className={isRtl ? "ml-2" : "mr-2"}>🇮🇷</span> {t("farsi")}
          </button>
        </div>
      </div>
    </div>
  );
}
