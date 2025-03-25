import apiClient from './client'
import { User } from '../types'

export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await apiClient.post<User>('/Auth/login', credentials)
  return response.data
}