import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Department from './pages/Department'
import PrivateRoute from './routes/PrivateRoute'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departments" element={<Department />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App