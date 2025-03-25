import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

function PrivateRoute() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute