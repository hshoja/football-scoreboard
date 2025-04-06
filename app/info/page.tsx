"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { playSound } from "../utils/sound";

export default function InfoPage() {
  const { t } = useLanguage();

 

  const handleLinkClick = () => {
    playSound("CLICK");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("aboutApp") || "About Football Tournament Manager"}
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {t("dataPrivacy") || "Data Privacy & Storage"}
          </h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 mb-4">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
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
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {t("localStorageInfo") ||
                  "All your tournament data is stored securely on your local device using browser's localStorage. Your data never leaves your device and is not sent to any server."}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("dataSafetyInfo") ||
              "Your tournament data remains private and secure on your device. This means:"}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 ml-2">
            <li>
              {t("offlineAccess") ||
                "You can access your tournaments even when offline"}
            </li>
            <li>{t("noServerStorage") || "No data is sent to our servers"}</li>
            <li>
              {t("deviceLimited") ||
                "Your data is only available on this device/browser"}
            </li>
            <li>
              {t("clearingBrowserData") ||
                "Clearing browser data will also remove your tournament data"}
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            {t("exportFeature") ||
              "We recommend occasionally exporting important tournaments if you wish to preserve them long-term or transfer them to another device."}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {t("support") || "Support & Contact"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("needHelp") ||
              "Need help or have suggestions for improvement? Reach out to us:"}
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            
            </div>

            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                Repository:
              </span>
              <a
                href="https://github.com/hshoja/football-scoreboard"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                https://github.com/hshoja/football-scoreboard
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            {t("appVersion") || "App Version"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Football Tournament Manager</span>{" "}
            v1.0.0
          </p>
        </section>
      </div>

      <div className="flex justify-center">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t("backToHome") || "Back to Home"}
        </Link>
      </div>
    </div>
  );
}
