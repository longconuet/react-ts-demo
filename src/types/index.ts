export interface User {
  token: string
}

export interface Department {
  id: string
  name: string
  code: string
  description: string
  managerId: string | null
}

export interface Employee {
  id: string
  name: string
  departmentId: string
  positionId: string
}

export interface Position {
  id: string
  name: string
}

export interface PaginatedResponse<T> {
  pageNumber: number
  pageSize: number
  totalCount: number
  data: T[]
}