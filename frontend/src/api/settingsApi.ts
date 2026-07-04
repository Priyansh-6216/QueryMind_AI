import axios from 'axios';
import { DatabaseConnectionDto } from '../types/settings.types';

const API_URL = 'http://localhost:8080/api/connection';

export const settingsApi = {
  getActiveConnection: async (): Promise<DatabaseConnectionDto | null> => {
    const response = await axios.get(API_URL);
    if (response.status === 204) return null;
    return response.data;
  },

  testConnection: async (dto: DatabaseConnectionDto): Promise<string> => {
    const response = await axios.post(`${API_URL}/test`, dto);
    return response.data;
  },

  saveConnection: async (dto: DatabaseConnectionDto): Promise<string> => {
    const response = await axios.post(`${API_URL}/save`, dto);
    return response.data;
  },

  resetConnection: async (): Promise<string> => {
    const response = await axios.delete(API_URL);
    return response.data;
  }
};
