"use client";

import { useState } from "react";
import { useTournament } from "../context/TournamentContext";
import { useLanguage } from "../context/LanguageContext";
import { Match } from "../types";

export default function MatchList() {
  const { currentTournament, updateMatchResult, getTeamById } = useTournament();
  const { t } = useLanguage();
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [homeGoals, setHomeGoals] = useState<number>(0);
  const [awayGoals, setAwayGoals] = useState<number>(0);

  if (!currentTournament) {
    return <p>{t("noTournamentFound")}</p>;
  }

  const startEditingMatch = (match: Match) => {
    setEditingMatch(match.id);
    setHomeGoals(match.homeGoals || 0);
    setAwayGoals(match.awayGoals || 0);
  };

  const saveMatchResult = (matchId: string) => {
    updateMatchResult(matchId, homeGoals, awayGoals);
    setEditingMatch(null);
  };

  const getMatchStatus = (match: Match) => {
    if (match.homeGoals !== null && match.awayGoals !== null) {
      return "completed";
    }
    return "pending";
  };

  const incrementGoals = (isHome: boolean) => {
    if (isHome) {
      setHomeGoals((prev) => Math.min(prev + 1, 99));
    } else {
      setAwayGoals((prev) => Math.min(prev + 1, 99));
    }
  };

  const decrementGoals = (isHome: boolean) => {
    if (isHome) {
      setHomeGoals((prev) => Math.max(prev - 1, 0));
    } else {
      setAwayGoals((prev) => Math.max(prev - 1, 0));
    }
  };

  // Group matches by status (pending first, then completed)
  const groupedMatches = [...currentTournament.matches].sort((a, b) => {
    const aStatus = getMatchStatus(a);
    const bStatus = getMatchStatus(b);
    if (aStatus === bStatus) return 0;
    return aStatus === "pending" ? -1 : 1;
  });

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 gap-4 mb-6">
        {groupedMatches.map((match) => {
          const homeTeam = getTeamById(match.homeTeamId);
          const awayTeam = getTeamById(match.awayTeamId);
          const isEditing = editingMatch === match.id;
          const status = getMatchStatus(match);

          if (!homeTeam || !awayTeam) {
            return null;
          }

          return (
            <div
              key={match.id}
              className={`border rounded-lg p-4 ${
                status === "completed"
                  ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  : "bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-900"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-6">
                  {/* Home Team */}
                  <div className="flex-1 sm:flex-none text-right">
                    <span className="font-medium">{homeTeam.name}</span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <div className="flex flex-col">
                          <button
                            onClick={() => incrementGoals(true)}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 rounded-t border border-blue-200 dark:border-blue-800"
                          >
                            ▲
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center font-bold border-x border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-700">
                            {homeGoals}
                          </div>
                          <button
                            onClick={() => decrementGoals(true)}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 rounded-b border border-blue-200 dark:border-blue-800"
                          >
                            ▼
                          </button>
                        </div>
                        <span className="mx-1 text-xl">-</span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => incrementGoals(false)}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 rounded-t border border-blue-200 dark:border-blue-800"
                          >
                            ▲
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center font-bold border-x border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-700">
                            {awayGoals}
                          </div>
                          <button
                            onClick={() => decrementGoals(false)}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 rounded-b border border-blue-200 dark:border-blue-800"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`text-lg font-bold ${
                          status === "completed"
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {match.homeGoals !== null && match.awayGoals !== null
                          ? `${match.homeGoals} - ${match.awayGoals}`
                          : "vs"}
                      </span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 sm:flex-none text-left">
                    <span className="font-medium">{awayTeam.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {status === "completed" ? t("completed") : t("pending")}
                  </span>

                  {isEditing ? (
                    <button
                      onClick={() => saveMatchResult(match.id)}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      {t("saveResult")}
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditingMatch(match)}
                      className={`ml-2 px-4 py-2 ${
                        status === "completed"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      } text-white rounded-md transition-colors whitespace-nowrap`}
                    >
                      {status === "completed"
                        ? t("editResult")
                        : t("enterResult")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
