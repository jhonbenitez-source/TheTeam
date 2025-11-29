import api from './api';
import { Match } from '../types';

export const matchService = {
  createMatch: (data: Partial<Match>) => api.post('/matches', data),
  getMatches: (filters?: any) => api.get('/matches', { params: filters }),
  getMatchById: (id: string) => api.get(`/matches/${id}`),
  updateMatchScore: (id: string, homeScore: number, awayScore: number) => 
    api.put(`/matches/${id}/score`, { homeScore, awayScore }),
  finalizeMatch: (id: string) => api.patch(`/matches/${id}/finalize`),
  getStandings: (tournamentId: string, category: string) => 
    api.get(`/matches/standings/${tournamentId}/${category}`)
};
