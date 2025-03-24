import axios from 'axios'
import { Department } from '../types'

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Thay bằng URL backend của bạn
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor để thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API functions
export const loginUser = (credentials: { email: string; password: string }) =>
  api.post<{ id: string; email: string; token: string }>('/auth/login', credentials).then((res) => res.data)

export const fetchDepartments = () =>
  api.get<Department[]>('/departments').then((res) => res.data)

export const createDepartment = (data: { name: string }) =>
  api.post<Department>('/departments', data).then((res) => res.data)

export const updateDepartment = (id: string, data: { name: string }) =>
  api.put<Department>(`/departments/${id}`, data).then((res) => res.data)

export const deleteDepartment = (id: string) =>
  api.delete<void>(`/departments/${id}`).then((res) => res.data)