export interface Coach {
  name: string;
  phone: string;
  category: string;
}

export interface Team {
  _id: string;
  name: string;
  sport: 'Fútbol' | 'Voleibol' | 'Patinaje';
  logo?: string;
  address: string;
  coaches: Coach[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  _id: string;
  name: string;
  documentId: string;
  dateOfBirth: string;
  category: string;
  age: number;
  eps: string;
  phone: string;
  address: string;
  photo?: string;
  teamId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tournament {
  _id: string;
  name: string;
  sport: 'Fútbol' | 'Voleibol' | 'Patinaje';
  type: 'Liga' | 'Copa' | 'Relámpago' | 'Otro';
  categories: string[];
  participatingTeams: Team[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  _id: string;
  tournamentId: string;
  category: string;
  homeTeamId: Team;
  awayTeamId: Team;
  homeScore: number;
  awayScore: number;
  status: 'Programado' | 'En Progreso' | 'Finalizado' | 'Cancelado';
  scheduledDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Standing {
  _id: string;
  tournamentId: string;
  category: string;
  teamId: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
}

export interface Card {
  playerId: string;
  playerName: string;
  playerDocument: string;
  playerPhoto?: string;
  category: string;
  age: number;
  teamName: string;
  teamLogo?: string;
  tournamentName?: string;
}
