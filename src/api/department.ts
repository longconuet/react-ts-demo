import apiClient from './client'
import { Department } from '../types'

interface DepartmentQueryParams {
  name?: string
  page?: number
  limit?: number
}

export const fetchDepartments = (params: DepartmentQueryParams = {}) =>
  apiClient.get<Department[]>('/departments', { params }).then((res) => res.data)

export const createDepartment = (data: { name: string }) =>
  apiClient.post<Department>('/departments', data).then((res) => res.data)

export const updateDepartment = (id: string, data: { name: string }) =>
  apiClient.put<Department>(`/departments/${id}`, data).then((res) => res.data)

export const deleteDepartment = (id: string) =>
  apiClient.delete<void>(`/departments/${id}`).then((res) => res.data)