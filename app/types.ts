export type Team = {
  id: string;
  name: string;
};

export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: number | null;
  awayGoals: number | null;
};

export type Tournament = {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  isHomeAndAway: boolean;
  createdAt: string;
};

export type TableEntry = {
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};
