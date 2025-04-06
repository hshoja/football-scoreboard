"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function OfflinePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [hasStoredData, setHasStoredData] = useState(false);

  useEffect(() => {
    // Check if we have localStorage data
    const checkStoredData = () => {
      try {
        const tournaments = localStorage.getItem("tournaments");
        setHasStoredData(tournaments !== null && tournaments !== "[]");
      } catch (error) {
        console.error("Error checking localStorage:", error);
        setHasStoredData(false);
      }
    };

    checkStoredData();

    // Try to reconnect periodically
    const checkConnection = () => {
      if (navigator.onLine) {
        // If we're back online, redirect to home
        router.push("/");
      }
    };

    // Set up interval to check connection and update countdown
    const interval = setInterval(() => {
      checkConnection();
      setCountdown((prev) => (prev > 0 ? prev - 1 : 5));
    }, 1000);

    // Check connection status when network status changes
    window.addEventListener("online", checkConnection);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", checkConnection);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-24 h-24 text-gray-400 mb-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <h1 className="text-3xl font-bold mb-4">
        {t("offline") || "You're offline"}
      </h1>
      <p className="text-lg mb-6">
        {t("offlineDesc") || "Check your internet connection and try again."}
      </p>

      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500">
          {t("checkingConnection") || "Checking connection"}: {countdown}
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {t("tryAgain") || "Try Again"}
        </button>
      </div>

      {hasStoredData && (
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {t("availableOffline") || "Available Offline"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("offlineDataDesc") ||
              "Your data is stored locally and can be accessed offline"}
          </p>
          <ul className="grid grid-cols-2 gap-3">
            <li>
              <Link
                href="/"
                className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 mb-2 text-indigo-500"
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
                <span>{t("tournaments") || "Tournaments"}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/matches"
                className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 mb-2 text-indigo-500"
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
                <span>{t("matches") || "Matches"}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/standings"
                className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 mb-2 text-indigo-500"
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
                <span>{t("standings") || "Standings"}</span>
              </Link>
            </li>
            <li>
              <Link
                href="/info"
                className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 mb-2 text-indigo-500"
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
                <span>{t("info") || "Info"}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
