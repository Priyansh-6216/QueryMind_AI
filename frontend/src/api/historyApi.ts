import axiosClient from './axiosClient'
import { QueryHistoryDto } from '../types/history.types'

export const historyApi = {
  getHistory: async (): Promise<QueryHistoryDto[]> => {
    const response = await axiosClient.get('/api/history')
    return response.data
  },

  deleteHistory: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/history/${id}`)
  },
}