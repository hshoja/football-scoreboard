"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTournament } from "./context/TournamentContext";
import { useLanguage } from "./context/LanguageContext";
import { playSound } from "./utils/sound";
import { Team, Tournament } from "./types";

// Add types for the TournamentForm props
interface TournamentFormProps {
  tournamentName: string;
  setTournamentName: (name: string) => void;
  isHomeAndAway: boolean;
  setIsHomeAndAway: (value: boolean) => void;
  teamInput: string;
  setTeamInput: (input: string) => void;
  teams: Team[];
  handleAddTeam: () => void;
  handleRemoveTeam: (id: string) => void;
  handleCreateTournament: (e: React.FormEvent) => void;
  error: string;
  t: (key: string) => string;
}

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();
  const { tournaments, loadTournament, createTournament, deleteTournament } =
    useTournament();
  const [showNewTournamentForm, setShowNewTournamentForm] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [teamInput, setTeamInput] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [isHomeAndAway, setIsHomeAndAway] = useState(false);
  const [error, setError] = useState("");

  const handleAddTeam = () => {
    if (!teamInput.trim()) {
      setError("Team name cannot be empty");
      return;
    }

    if (
      teams.some(
        (team) => team.name.toLowerCase() === teamInput.trim().toLowerCase()
      )
    ) {
      setError("Team already exists");
      return;
    }

    playSound("CLICK");
    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamInput.trim(),
    };

    setTeams([...teams, newTeam]);
    setTeamInput("");
    setError("");
  };

  const handleRemoveTeam = (id: string) => {
    playSound("CLICK");
    setTeams(teams.filter((team) => team.id !== id));
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tournamentName.trim()) {
      setError("Tournament name is required");
      return;
    }

    if (teams.length < 2) {
      setError("At least 2 teams are required");
      return;
    }

    playSound("GAME_START");
    createTournament(tournamentName.trim(), teams, isHomeAndAway);
    router.push("/matches");
  };

  const handleSelectTournament = (tournamentId: string) => {
    playSound("CLICK");
    loadTournament(tournamentId);
    router.push("/matches");
  };

  const handleDeleteTournament = (
    event: React.MouseEvent,
    tournamentId: string
  ) => {
    event.stopPropagation();
    playSound("CLICK");
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      deleteTournament(tournamentId);
    }
  };

  const toggleNewTournamentForm = () => {
    playSound("CLICK");
    setShowNewTournamentForm(!showNewTournamentForm);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTournamentStatus = (tournament: Tournament) => {
    const completedMatches = tournament.matches.filter(
      (match) => match.homeGoals !== null && match.awayGoals !== null
    ).length;

    const totalMatches = tournament.matches.length;

    if (completedMatches === 0) return t("notStarted");
    if (completedMatches < totalMatches)
      return `${t("inProgress")} (${completedMatches}/${totalMatches})`;
    return t("tournamentCompleted");
  };

  const getTournamentStatusClass = (status: string) => {
    if (status === t("tournamentCompleted")) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    } else if (status.startsWith(t("inProgress"))) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    } else {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  // Function to get the tournament winner
  const getTournamentWinner = (tournament: Tournament) => {
    // Calculate if all matches have results
    const completedMatches = tournament.matches.filter(
      (match) => match.homeGoals !== null && match.awayGoals !== null
    ).length;
    const totalMatches = tournament.matches.length;

    // Only calculate winner if tournament is completed
    if (completedMatches !== totalMatches) {
      return null;
    }

    // Calculate scores for each team
    const table: {
      [key: string]: {
        teamId: string;
        teamName: string;
        points: number;
        goalDiff: number;
        goalsFor: number;
      };
    } = {};

    // Initialize table
    tournament.teams.forEach((team) => {
      table[team.id] = {
        teamId: team.id,
        teamName: team.name,
        points: 0,
        goalDiff: 0,
        goalsFor: 0,
      };
    });

    // Calculate results
    tournament.matches.forEach((match) => {
      if (match.homeGoals !== null && match.awayGoals !== null) {
        const homeTeam = table[match.homeTeamId];
        const awayTeam = table[match.awayTeamId];

        // Update goals
        homeTeam.goalsFor += match.homeGoals;
        homeTeam.goalDiff += match.homeGoals - match.awayGoals;
        awayTeam.goalsFor += match.awayGoals;
        awayTeam.goalDiff += match.awayGoals - match.homeGoals;

        // Update points
        if (match.homeGoals > match.awayGoals) {
          // Home team wins
          homeTeam.points += 3;
        } else if (match.homeGoals < match.awayGoals) {
          // Away team wins
          awayTeam.points += 3;
        } else {
          // Draw
          homeTeam.points += 1;
          awayTeam.points += 1;
        }
      }
    });

    // Find the winner (team with most points)
    return Object.values(table).sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (a.goalDiff !== b.goalDiff) {
        return b.goalDiff - a.goalDiff;
      }
      return b.goalsFor - a.goalsFor;
    })[0];
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Tournament List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
            <h2 className="text-xl font-semibold">{t("yourTournaments")}</h2>
            <button
              onClick={toggleNewTournamentForm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              {showNewTournamentForm ? t("cancel") : t("createTournament")}
            </button>
          </div>

          {tournaments.length === 0 ? (
            <div className="text-center p-6 sm:p-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {t("noTournaments")}
              </p>
              {!showNewTournamentForm && (
                <button
                  onClick={() => {
                    playSound("CLICK");
                    setShowNewTournamentForm(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t("createFirstTournament")}
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {tournaments.map((tournament) => {
                const status = getTournamentStatus(tournament);
                const statusClass = getTournamentStatusClass(status);

                return (
                  <div
                    key={tournament.id}
                    onClick={() => handleSelectTournament(tournament.id)}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg mr-1">
                            {tournament.name}
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}
                            >
                              {status}
                            </span>

                            {/* Show winner badge if tournament is completed */}
                            {status === t("tournamentCompleted") && (
                              <div className="inline-flex items-center px-2 py-0.5 bg-amber-100 border border-amber-200 rounded-full text-xs font-medium dark:bg-amber-900/30 dark:border-amber-800">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400 flex-shrink-0"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743-.356l1.108-.328 1.1.324a6.73 6.73 0 0 0 2.742.358 6.753 6.753 0 0 0 6.138-5.6.75.75 0 0 0-.584-.86 44.945 44.945 0 0 0-3.071-.543v-.858a48.544 48.544 0 0 0-10.653 0Zm1.5 1.114a47.03 47.03 0 0 1 7.653 0v2.646c0 3.394-2.185 6.333-5.373 7.335-3.187-1-5.374-3.94-5.374-7.335V3.735Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-amber-800 dark:text-amber-300 truncate max-w-[120px] sm:max-w-none">
                                  <span className="mr-0.5 hidden sm:inline">
                                    {t("winner")}:
                                  </span>
                                  {getTournamentWinner(tournament)?.teamName}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <p>
                            {t("created")}: {formatDate(tournament.createdAt)}
                          </p>
                          <p>
                            {t("teams")}: {tournament.teams.length}
                          </p>
                          <p>
                            {t("format")}:{" "}
                            {tournament.isHomeAndAway
                              ? t("homeAndAway")
                              : t("singleGame")}
                          </p>
                          <p>
                            {t("matches")}: {tournament.matches.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto">
                        <button
                          onClick={() => handleSelectTournament(tournament.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors sm:hidden"
                        >
                          {t("open")}
                        </button>
                        <button
                          onClick={(e) =>
                            handleDeleteTournament(e, tournament.id)
                          }
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* New Tournament Form - Desktop */}
        {showNewTournamentForm && (
          <div className="hidden sm:block bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 sm:mb-6">
              {t("createTournament")}
            </h2>

            {/* Tournament form content for desktop */}
            <TournamentForm
              tournamentName={tournamentName}
              setTournamentName={setTournamentName}
              isHomeAndAway={isHomeAndAway}
              setIsHomeAndAway={setIsHomeAndAway}
              teamInput={teamInput}
              setTeamInput={setTeamInput}
              teams={teams}
              handleAddTeam={handleAddTeam}
              handleRemoveTeam={handleRemoveTeam}
              handleCreateTournament={handleCreateTournament}
              error={error}
              t={t}
            />
          </div>
        )}

        {/* New Tournament Form - Mobile Modal */}
        {showNewTournamentForm && (
          <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-t-xl w-full max-h-[85vh] overflow-y-auto animate-slide-up flex flex-col">
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center z-10">
                <h2 className="text-xl font-semibold">
                  {t("createTournament")}
                </h2>
                <button
                  onClick={() => setShowNewTournamentForm(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full"
                  aria-label="Close"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 flex-grow overflow-y-auto">
                {/* Tournament form content for mobile - without the submit button */}
                <form
                  onSubmit={handleCreateTournament}
                  className="space-y-5 pb-20"
                >
                  <div>
                    <label
                      htmlFor="tournamentNameMobile"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t("tournamentName")}
                    </label>
                    <input
                      type="text"
                      id="tournamentNameMobile"
                      value={tournamentName}
                      onChange={(e) => setTournamentName(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder={t("tournamentName")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("tournamentFormat")}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isHomeAndAwayMobile"
                        checked={isHomeAndAway}
                        onChange={(e) => setIsHomeAndAway(e.target.checked)}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isHomeAndAwayMobile"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {t("homeAndAway")}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("addTeams")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={teamInput}
                        onChange={(e) => setTeamInput(e.target.value)}
                        className="flex-1 px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        placeholder={t("enterTeamName")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTeam();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddTeam}
                        className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {t("add")}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t("teams")} ({teams.length})
                    </h3>
                    {teams.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {t("noTeamsAdded")}
                      </p>
                    ) : (
                      <ul className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2 dark:border-gray-600">
                        {teams.map((team) => (
                          <li
                            key={team.id}
                            className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                          >
                            <span>{team.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTeam(team.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              {t("remove")}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </form>
              </div>

              {/* Fixed bottom action button */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 z-10">
                <button
                  onClick={handleCreateTournament}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t("createTournament")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Add proper types to the TournamentForm component
function TournamentForm({
  tournamentName,
  setTournamentName,
  isHomeAndAway,
  setIsHomeAndAway,
  teamInput,
  setTeamInput,
  teams,
  handleAddTeam,
  handleRemoveTeam,
  handleCreateTournament,
  error,
  t,
}: TournamentFormProps) {
  return (
    <form onSubmit={handleCreateTournament} className="space-y-5">
      <div>
        <label
          htmlFor="tournamentName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {t("tournamentName")}
        </label>
        <input
          type="text"
          id="tournamentName"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder={t("tournamentName")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("tournamentFormat")}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isHomeAndAway"
            checked={isHomeAndAway}
            onChange={(e) => setIsHomeAndAway(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isHomeAndAway"
            className="text-sm text-gray-700 dark:text-gray-300"
          >
            {t("homeAndAway")}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("addTeams")}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder={t("enterTeamName")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTeam();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTeam}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("add")}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t("teams")} ({teams.length})
        </h3>
        {teams.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            {t("noTeamsAdded")}
          </p>
        ) : (
          <ul className="space-y-1 max-h-60 overflow-y-auto border rounded-md p-2 dark:border-gray-600">
            {teams.map((team) => (
              <li
                key={team.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <span>{team.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTeam(team.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  {t("remove")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        {t("createTournament")}
      </button>
    </form>
  );
}
