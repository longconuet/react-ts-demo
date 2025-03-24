import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api'
import { useAuthStore } from '../stores/authStore'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuthStore()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data)
      navigate('/departments')
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login