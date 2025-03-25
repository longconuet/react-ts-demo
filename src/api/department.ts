import apiClient from './client'
import { Department, PaginatedResponse } from '../types'

interface DepartmentQueryParams {
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const fetchDepartments = (params: DepartmentQueryParams = {}) =>
  apiClient.get<PaginatedResponse<Department>>('/Department', { params }).then((res) => res.data)

export const createDepartment = (data: { name: string }) =>
  apiClient.post<Department>('/Department', data).then((res) => res.data)

export const updateDepartment = (id: string, data: { name: string }) =>
  apiClient.put<Department>(`/Department/${id}`, data).then((res) => res.data)

export const deleteDepartment = (id: string) =>
  apiClient.delete<void>(`/Department/${id}`).then((res) => res.data)