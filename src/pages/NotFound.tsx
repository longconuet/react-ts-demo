import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import BlankLayout from '../layout/BlankLayout'

function NotFound() {
  const navigate = useNavigate()

  return (
    <BlankLayout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Button
          type="primary"
          size="large"
          className="mt-6"
          onClick={() => navigate('/dashboard')}
        >
          Go Back to Home
        </Button>
      </div>
    </BlankLayout>
  )
}

export default NotFound