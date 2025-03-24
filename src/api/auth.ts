import apiClient from './client'
import { User } from '../types'

export const loginUser = (credentials: { email: string; password: string }) =>
  apiClient.post<User>('/auth/login', credentials).then((res) => res.data)