import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api'
import { useAuthStore } from '../stores/authStore'
import { Form, Input, Button, Typography, message } from 'antd'

const { Title } = Typography

function Login() {
  const [error, setError] = useState<string | null>(null)
  const { setUser, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data)
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      setError(error.message)
      message.success('Logged in successfully!')
      message.error(error.message)
    },
  })

  const onFinish = (values: { username: string; password: string }) => {
    setError(null)
    loginMutation.mutate(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Title level={2} className="text-center mb-6">Login</Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" className="w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loginMutation.isPending}
              className="w-full"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login