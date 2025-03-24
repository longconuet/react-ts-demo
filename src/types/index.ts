export interface User {
    id: string
    email: string
    token: string
  }
  
  export interface Department {
    id: string
    name: string
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