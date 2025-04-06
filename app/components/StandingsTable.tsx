"use client";

import { useTournament } from "../context/TournamentContext";
import { useLanguage } from "../context/LanguageContext";
import { TableEntry } from "../types";

export default function StandingsTable() {
  const { calculateTable } = useTournament();
  const { t, formatNumber } = useLanguage();
  const tableEntries = calculateTable();

  if (tableEntries.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 italic">
        {t("noStandingsAvailable")}
      </p>
    );
  }

  return (
    <div>
      {/* Mobile view - accordion-style table without horizontal scrolling */}
      <div className="md:hidden">
        <div className="grid gap-2">
          {tableEntries.map((entry, index) => (
            <details key={entry.teamId} className="group">
              <summary className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer list-none">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center justify-center text-sm font-bold">
                    {formatNumber(index + 1)}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {entry.teamName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t("played")}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {formatNumber(entry.played)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t("goalDifference")}
                    </span>
                    <span
                      className={`${
                        entry.goalDifference > 0
                          ? "text-green-600 dark:text-green-400"
                          : entry.goalDifference < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {entry.goalDifference > 0
                        ? `+${formatNumber(entry.goalDifference)}`
                        : formatNumber(entry.goalDifference)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t("points")}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatNumber(entry.points)}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </summary>

              <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("played")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.played)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("won")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.won)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("drawn")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.drawn)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("lost")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.lost)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("goalsFor")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.goalsFor)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("goalsAgainst")}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {formatNumber(entry.goalsAgainst)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("points")}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {formatNumber(entry.points)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <p className="text-center">{t("tapToExpand")}</p>
        </div>
      </div>

      {/* Desktop view - optimized compact table */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-300 w-8">
                #
              </th>
              <th className="py-2 text-left font-medium text-gray-500 dark:text-gray-300">
                {t("team")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("played")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("won")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("drawn")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("lost")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("goalsFor")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("goalsAgainst")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-7">
                {t("goalDifference")}
              </th>
              <th className="py-2 text-center font-medium text-gray-500 dark:text-gray-300 w-10">
                {t("points")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableEntries.map((entry: TableEntry, index: number) => (
              <tr
                key={entry.teamId}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  index < 3 ? "font-medium" : ""
                }`}
              >
                <td className="py-2 whitespace-nowrap text-gray-900 dark:text-white">
                  {formatNumber(index + 1)}
                </td>
                <td className="py-2 whitespace-nowrap text-gray-900 dark:text-white">
                  {entry.teamName}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.played)}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.won)}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.drawn)}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.lost)}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.goalsFor)}
                </td>
                <td className="py-2 text-center text-gray-900 dark:text-white">
                  {formatNumber(entry.goalsAgainst)}
                </td>
                <td className="py-2 text-center">
                  <span
                    className={`${
                      entry.goalDifference > 0
                        ? "text-green-600 dark:text-green-400"
                        : entry.goalDifference < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {entry.goalDifference > 0
                      ? `+${formatNumber(entry.goalDifference)}`
                      : formatNumber(entry.goalDifference)}
                  </span>
                </td>
                <td className="py-2 text-center font-bold text-gray-900 dark:text-white">
                  {formatNumber(entry.points)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-4">
          <span>
            {t("played")}: {t("playedFull")}
          </span>
          <span>
            {t("won")}: {t("wonFull")}
          </span>
          <span>
            {t("drawn")}: {t("drawnFull")}
          </span>
          <span>
            {t("lost")}: {t("lostFull")}
          </span>
          <span>
            {t("goalsFor")}: {t("goalsForFull")}
          </span>
          <span>
            {t("goalsAgainst")}: {t("goalsAgainstFull")}
          </span>
          <span>
            {t("goalDifference")}: {t("goalDifferenceFull")}
          </span>
          <span>
            {t("points")}: {t("pointsFull")}
          </span>
        </div>
      </div>
    </div>
  );
}
