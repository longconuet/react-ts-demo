import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logout: () => void
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
}))