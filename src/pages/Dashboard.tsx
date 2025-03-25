import { useAuthStore } from '../stores/authStore'
import Layout from '../layout/Layout'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

function Dashboard() {
  const { logout, user } = useAuthStore()

  return (
    <Layout title="Dashboard" onLogout={logout}>
      <Title level={3}>Welcome to the Dashboard</Title>
      <Paragraph>
        Hello! This is your dashboard. You can navigate to other pages from here.
      </Paragraph>
    </Layout>
  )
}

export default Dashboard