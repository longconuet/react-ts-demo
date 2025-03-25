import { Button, Typography, Menu, MenuProps } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined, TeamOutlined } from '@ant-design/icons'

const { Title } = Typography

interface NavbarProps {
  title: string
  onLogout: () => void
}

function Navbar({ title, onLogout }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/departments',
      icon: <TeamOutlined />,
      label: 'Departments',
      onClick: () => navigate('/departments'),
    },
  ]

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <Menu
          mode="horizontal"
          items={menuItems}
          selectedKeys={[location.pathname]}
          className="border-0 bg-gray-100 shadow-md"
        />
        <Title level={2} className="mr-4 mt-3">{title}</Title>
      </div>
      <Button danger onClick={onLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Navbar