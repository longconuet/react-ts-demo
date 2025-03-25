import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => {
    localStorage.setItem('token', user.token)
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, isAuthenticated: false })
  },
  initializeAuth: () => {
    const token = localStorage.getItem('token')
    if (token) {
      set({ isAuthenticated: true }) // Khôi phục isAuthenticated nếu có token
      // Nếu backend cung cấp API để lấy thông tin user từ token, có thể gọi API ở đây
    }
  },
}))

// Gọi initializeAuth ngay khi store được tạo
useAuthStore.getState().initializeAuth()