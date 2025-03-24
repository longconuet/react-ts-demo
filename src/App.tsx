import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Department from './pages/Department'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App