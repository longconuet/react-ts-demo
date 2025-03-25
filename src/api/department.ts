import apiClient from './client'
import { Department, PaginatedResponse } from '../types'

interface DepartmentQueryParams {
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const fetchDepartments = async (params: DepartmentQueryParams = {}) => {
  const response = await apiClient.get<PaginatedResponse<Department>>('/Department', { params })
  return response.data
}

export const createDepartment = async (data: Omit<Department, 'id'>) => {
  const response = await apiClient.post<number>('/Department', data)
  return response.data
}

export const updateDepartment = async (data: Omit<Department, 'code'>) => {
  const response = await apiClient.put<void>(`/Department`, data)
  return response.data
}

export const deleteDepartment = async (id: string) => {
  const response = await apiClient.delete<void>(`/Department/${id}`)
  return response.data
}