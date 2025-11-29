import api from './api';
import { Player } from '../types';

export const playerService = {
  createPlayer: (data: Partial<Player>) => api.post('/players', data),
  getPlayers: (filters?: any) => api.get('/players', { params: filters }),
  getPlayerById: (id: string) => api.get(`/players/${id}`),
  updatePlayer: (id: string, data: Partial<Player>) => api.put(`/players/${id}`, data),
  transferPlayer: (id: string, newTeamId: string) => api.patch(`/players/${id}/transfer`, { newTeamId }),
  deactivatePlayer: (id: string) => api.patch(`/players/${id}/deactivate`),
  reactivatePlayer: (id: string) => api.patch(`/players/${id}/reactivate`)
};
