"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Tournament, Team, Match, TableEntry } from "../types";

type TournamentContextType = {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  createTournament: (
    name: string,
    teams: Team[],
    isHomeAndAway: boolean
  ) => void;
  loadTournament: (tournamentId: string) => void;
  updateMatchResult: (
    matchId: string,
    homeGoals: number,
    awayGoals: number
  ) => void;
  getTeamById: (teamId: string) => Team | undefined;
  calculateTable: () => TableEntry[];
  deleteTournament: (tournamentId: string) => void;
};

const defaultContext: TournamentContextType = {
  tournaments: [],
  currentTournament: null,
  createTournament: () => {},
  loadTournament: () => {},
  updateMatchResult: () => {},
  getTeamById: () => undefined,
  calculateTable: () => [],
  deleteTournament: () => {},
};

const TournamentContext = createContext<TournamentContextType>(defaultContext);

export const useTournament = () => useContext(TournamentContext);

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [currentTournament, setCurrentTournament] = useState<Tournament | null>(
    null
  );

  // Load tournaments from localStorage on initial render
  useEffect(() => {
    const savedTournaments = localStorage.getItem("tournaments");
    if (savedTournaments) {
      setTournaments(JSON.parse(savedTournaments));
    }

    const currentId = localStorage.getItem("currentTournamentId");
    if (currentId) {
      const saved = JSON.parse(savedTournaments || "[]");
      const current = saved.find((t: Tournament) => t.id === currentId);
      if (current) {
        setCurrentTournament(current);
      }
    }
  }, []);

  // Save tournaments to localStorage whenever they change
  useEffect(() => {
    if (tournaments.length > 0) {
      localStorage.setItem("tournaments", JSON.stringify(tournaments));
    }
  }, [tournaments]);

  // Save current tournament ID to localStorage
  useEffect(() => {
    if (currentTournament) {
      localStorage.setItem("currentTournamentId", currentTournament.id);
    } else {
      localStorage.removeItem("currentTournamentId");
    }
  }, [currentTournament]);

  const createTournament = (
    name: string,
    teams: Team[],
    isHomeAndAway: boolean
  ) => {
    const matches: Match[] = [];

    // Create all possible team pairs
    const teamPairs: { homeTeam: Team; awayTeam: Team }[] = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams.length; j++) {
        if (i !== j) {
          teamPairs.push({
            homeTeam: teams[i],
            awayTeam: teams[j],
          });
        }
      }
    }

    // If it's not home and away, we only need half of the pairs
    const pairsToUse = isHomeAndAway
      ? teamPairs
      : teamPairs.filter((pair, index, array) => {
          // Only keep one of the home/away pairs
          const reverseIndex = array.findIndex(
            (p) =>
              p.homeTeam.id === pair.awayTeam.id &&
              p.awayTeam.id === pair.homeTeam.id
          );
          return index < reverseIndex;
        });

    // Shuffle the pairs to create a random fixture order
    const shuffledPairs = shuffleArray(pairsToUse);

    // Create matches from the pairs
    shuffledPairs.forEach((pair, index) => {
      const match: Match = {
        id: `${Date.now()}-${index}`,
        homeTeamId: pair.homeTeam.id,
        awayTeamId: pair.awayTeam.id,
        homeGoals: null,
        awayGoals: null,
      };
      matches.push(match);
    });

    const newTournament: Tournament = {
      id: Date.now().toString(),
      name,
      teams,
      matches,
      isHomeAndAway,
      createdAt: new Date().toISOString(),
    };

    setTournaments((prev) => [...prev, newTournament]);
    setCurrentTournament(newTournament);
  };

  const loadTournament = (tournamentId: string) => {
    const tournament = tournaments.find((t) => t.id === tournamentId);
    if (tournament) {
      setCurrentTournament(tournament);
    }
  };

  const updateMatchResult = (
    matchId: string,
    homeGoals: number,
    awayGoals: number
  ) => {
    if (!currentTournament) return;

    const updatedMatches = currentTournament.matches.map((match) =>
      match.id === matchId ? { ...match, homeGoals, awayGoals } : match
    );

    const updatedTournament = {
      ...currentTournament,
      matches: updatedMatches,
    };

    setCurrentTournament(updatedTournament);

    // Update the tournament in the tournaments list
    setTournaments((prev) =>
      prev.map((t) => (t.id === currentTournament.id ? updatedTournament : t))
    );
  };

  const deleteTournament = (tournamentId: string) => {
    setTournaments((prev) => prev.filter((t) => t.id !== tournamentId));

    if (currentTournament && currentTournament.id === tournamentId) {
      setCurrentTournament(null);
    }
  };

  const getTeamById = (teamId: string): Team | undefined => {
    return currentTournament?.teams.find((team) => team.id === teamId);
  };

  const calculateTable = (): TableEntry[] => {
    if (!currentTournament) return [];

    const table: { [key: string]: TableEntry } = {};

    // Initialize table entries for all teams
    currentTournament.teams.forEach((team) => {
      table[team.id] = {
        teamId: team.id,
        teamName: team.name,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    });

    // Calculate stats from matches
    currentTournament.matches.forEach((match) => {
      if (match.homeGoals !== null && match.awayGoals !== null) {
        const homeTeam = table[match.homeTeamId];
        const awayTeam = table[match.awayTeamId];

        // Update played matches
        homeTeam.played += 1;
        awayTeam.played += 1;

        // Update goals
        homeTeam.goalsFor += match.homeGoals;
        homeTeam.goalsAgainst += match.awayGoals;
        awayTeam.goalsFor += match.awayGoals;
        awayTeam.goalsAgainst += match.homeGoals;

        // Update wins, draws, losses and points
        if (match.homeGoals > match.awayGoals) {
          // Home team wins
          homeTeam.won += 1;
          homeTeam.points += 3;
          awayTeam.lost += 1;
        } else if (match.homeGoals < match.awayGoals) {
          // Away team wins
          awayTeam.won += 1;
          awayTeam.points += 3;
          homeTeam.lost += 1;
        } else {
          // Draw
          homeTeam.drawn += 1;
          homeTeam.points += 1;
          awayTeam.drawn += 1;
          awayTeam.points += 1;
        }
      }
    });

    // Calculate goal difference
    Object.values(table).forEach((entry) => {
      entry.goalDifference = entry.goalsFor - entry.goalsAgainst;
    });

    // Sort table by points, then goal difference, then goals scored
    return Object.values(table).sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      if (a.goalDifference !== b.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      return b.goalsFor - a.goalsFor;
    });
  };

  const value = {
    tournaments,
    currentTournament,
    createTournament,
    loadTournament,
    updateMatchResult,
    getTeamById,
    calculateTable,
    deleteTournament,
  };

  return (
    <TournamentContext.Provider value={value}>
      {children}
    </TournamentContext.Provider>
  );
};
