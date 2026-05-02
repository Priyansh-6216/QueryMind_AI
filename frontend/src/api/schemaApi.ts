import axiosClient from './axiosClient'
import { SchemaResponse } from '../types/schema.types'

export const schemaApi = {
  getSchema: async (): Promise<SchemaResponse> => {
    const response = await axiosClient.get('/api/schema')
    return response.data
  },
}