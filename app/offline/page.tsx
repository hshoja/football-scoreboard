"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function OfflinePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
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

      <div className="mt-10 border-t border-gray-200 pt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {t("availableOffline") || "Available Offline"}
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          <li className="border border-gray-200 rounded p-3 text-center hover:bg-gray-50">
            <Link href="/matches" className="block w-full h-full">
              {t("matches") || "Matches"}
            </Link>
          </li>
          <li className="border border-gray-200 rounded p-3 text-center hover:bg-gray-50">
            <Link href="/teams" className="block w-full h-full">
              {t("teams") || "Teams"}
            </Link>
          </li>
          <li className="border border-gray-200 rounded p-3 text-center hover:bg-gray-50">
            <Link href="/standings" className="block w-full h-full">
              {t("standings") || "Standings"}
            </Link>
          </li>
          <li className="border border-gray-200 rounded p-3 text-center hover:bg-gray-50">
            <Link href="/" className="block w-full h-full">
              {t("home") || "Home"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
