import axiosClient from './axiosClient'
import { QueryRequest, QueryResponse } from '../types/query.types'

export const queryApi = {
  executeQuery: async (request: QueryRequest): Promise<QueryResponse> => {
    const response = await axiosClient.post('/api/query', request)
    return response.data
  },
}