import api from './api';

export const dashboardService = {
  getDashboard: () => api.get('/dashboard')
};

export const cardService = {
  generateCard: (filters?: any) => api.get('/cards/generate', { params: filters }),
  searchPlayer: (name: string) => api.get('/cards/search', { params: { name } })
};
