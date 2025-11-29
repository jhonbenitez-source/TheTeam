import api from './api';
import { Tournament } from '../types';

export const tournamentService = {
  createTournament: (data: Partial<Tournament>) => api.post('/tournaments', data),
  getTournaments: (filters?: any) => api.get('/tournaments', { params: filters }),
  getTournamentById: (id: string) => api.get(`/tournaments/${id}`),
  updateTournament: (id: string, data: Partial<Tournament>) => api.put(`/tournaments/${id}`, data),
  deactivateTournament: (id: string) => api.patch(`/tournaments/${id}/deactivate`)
};
