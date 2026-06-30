import axiosInstance from './axiosClient';
import { SavedQuery } from '../types/savedQuery.types';

const savedQueryApi = {
  getAll: async (): Promise<SavedQuery[]> => {
    const { data } = await axiosInstance.get<SavedQuery[]>('/api/saved-queries');
    return data;
  },
  getById: async (id: number): Promise<SavedQuery> => {
    const { data } = await axiosInstance.get<SavedQuery>(`/api/saved-queries/${id}`);
    return data;
  },
  create: async (savedQuery: Omit<SavedQuery, 'id' | 'createdAt' | 'updatedAt'>): Promise<SavedQuery> => {
    const { data } = await axiosInstance.post<SavedQuery>('/api/saved-queries', savedQuery);
    return data;
  },
  update: async (id: number, savedQuery: Partial<SavedQuery>): Promise<SavedQuery> => {
    const { data } = await axiosInstance.put<SavedQuery>(`/api/saved-queries/${id}`, savedQuery);
    return data;
  },
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/saved-queries/${id}`);
  }
};

export default savedQueryApi;