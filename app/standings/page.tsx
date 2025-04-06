"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTournament } from "../context/TournamentContext";
import { useLanguage } from "../context/LanguageContext";
import StandingsTable from "../components/StandingsTable";

export default function StandingsPage() {
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
          <div className="w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400 truncate max-w-full">
              {currentTournament.name}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentTournament.isHomeAndAway
                ? t("homeAwayFormat")
                : t("singleGame")}{" "}
              • {currentTournament.teams.length} {t("teams")}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => router.push("/")}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {t("back")}
            </button>
            <button
              onClick={() => router.push("/matches")}
              className="flex-1 sm:flex-none px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {t("viewMatches")}
            </button>
          </div>
        </div>

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
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {t("standings")}
          </h2>
          <StandingsTable />
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <h3 className="font-medium mb-2">{t("tournamentSummary")}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              {t("format")}:{" "}
              {currentTournament.isHomeAndAway
                ? t("homeAwayFormat")
                : t("singleGame")}
            </li>
            <li>
              {t("pointsSystem")}: {t("win")}: 3, {t("draw")}: 1, {t("loss")}: 0
            </li>
            <li>
              {t("teams")}: {currentTournament.teams.length}
            </li>
            <li>
              {t("totalMatches")}:{" "}
              {currentTournament.isHomeAndAway
                ? currentTournament.teams.length *
                  (currentTournament.teams.length - 1)
                : (currentTournament.teams.length *
                    (currentTournament.teams.length - 1)) /
                  2}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
