import apiClient from './client'
import { User } from '../types'

export const loginUser = (credentials: { username: string; password: string }) =>
  apiClient.post<User>('/Auth/login', credentials).then((res) => res.data)