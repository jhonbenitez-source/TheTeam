import api from './api';
import { Team, Coach } from '../types';

export const teamService = {
  createTeam: (data: Partial<Team>) => api.post('/teams', data),
  getTeams: (includeInactive = false) => api.get('/teams', { params: { includeInactive } }),
  getTeamById: (id: string) => api.get(`/teams/${id}`),
  updateTeam: (id: string, data: Partial<Team>) => api.put(`/teams/${id}`, data),
  addCoach: (id: string, coach: Coach) => api.post(`/teams/${id}/coaches`, coach),
  deactivateTeam: (id: string) => api.patch(`/teams/${id}/deactivate`),
  reactivateTeam: (id: string) => api.patch(`/teams/${id}/reactivate`)
};
