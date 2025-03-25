import { Button, Typography } from 'antd'

const { Title } = Typography

interface NavbarProps {
  title: string
  onLogout: () => void
}

function Navbar({ title, onLogout }: NavbarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <Title level={2}>{title}</Title>
      <Button danger onClick={onLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Navbar