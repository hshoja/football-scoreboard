"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTournament } from "../context/TournamentContext";
import { useLanguage } from "../context/LanguageContext";
import MatchList from "../components/MatchList";
import StandingsTable from "../components/StandingsTable";

export default function MatchesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { currentTournament } = useTournament();

  useEffect(() => {
    // If no tournament exists, redirect to home
    if (!currentTournament) {
      router.push("/");
    }
  }, [currentTournament, router]);

  if (!currentTournament) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
              {currentTournament.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentTournament.isHomeAndAway
                ? t("homeAwayFormat")
                : t("singleGame")}{" "}
              • {currentTournament.teams.length} {t("teams")}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => router.push("/")}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {t("back")}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("currentTournamentId");
                window.location.href = "/";
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              {t("close")}
            </button>
          </div>
        </div>

        {/* On mobile: Standings first, then Matches */}
        {/* On desktop: Two-column layout with Matches on left (wider) and Standings on right */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Standings - full width on mobile, 2 cols on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="card lg:sticky lg:top-20">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("standings")}
              </h2>
              <StandingsTable />
            </div>
          </div>

          {/* Matches - full width on mobile, 5 cols on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 text-primary-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("matches")}
              </h2>
              <MatchList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
